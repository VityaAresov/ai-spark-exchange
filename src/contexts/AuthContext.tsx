
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userRole: string | null;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshUserRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  const refreshUserRole = async () => {
    if (!session?.user) {
      setUserRole(null);
      return;
    }

    try {
      console.log('Fetching user role for user:', session.user.id);
      const { data, error } = await supabase.rpc('get_my_role');
      if (error) {
        console.error('Error fetching user role:', error);
        setUserRole(null);
      } else {
        console.log('User role fetched:', data);
        setUserRole(data);
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      setUserRole(null);
    }
  };

  useEffect(() => {
    console.log('AuthProvider: Setting up auth state...');
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email || 'no user');
        
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Defer role fetching to avoid deadlock
        if (session?.user) {
          setTimeout(() => {
            refreshUserRole();
          }, 100);
        } else {
          setUserRole(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting initial session:', error);
      } else {
        console.log('Initial session:', session?.user?.email || 'no session');
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (session?.user) {
        setTimeout(() => {
          refreshUserRole();
        }, 100);
      }
    });

    return () => {
      console.log('AuthProvider: Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log('Attempting sign in for:', email);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Sign in error:', error);
      } else {
        console.log('Sign in successful');
      }
      
      return { error };
    } catch (err) {
      console.error('Sign in exception:', err);
      return { error: err };
    }
  };

  const signUp = async (email: string, password: string) => {
    console.log('Attempting sign up for:', email);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) {
        console.error('Sign up error:', error);
      } else {
        console.log('Sign up successful');
      }
      
      return { error };
    } catch (err) {
      console.error('Sign up exception:', err);
      return { error: err };
    }
  };

  const signInWithGoogle = async () => {
    console.log('Attempting Google sign in...');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) {
        console.error('Google sign in error:', error);
      } else {
        console.log('Google sign in initiated');
      }
      
      return { error };
    } catch (err) {
      console.error('Google sign in exception:', err);
      return { error: err };
    }
  };

  const signOut = async () => {
    console.log('Signing out...');
    try {
      await supabase.auth.signOut();
      console.log('Sign out successful');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const value = {
    user,
    session,
    loading,
    userRole,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    refreshUserRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
