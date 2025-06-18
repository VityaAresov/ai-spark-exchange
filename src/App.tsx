
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./components/LandingPage";
import Login from "./pages/Login";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import AddProduct from "./pages/AddProduct";
import AgentDetails from "./pages/AgentDetails";
import Dashboard from "./pages/Dashboard";
import DeveloperDashboard from "./pages/DeveloperDashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/marketplace" element={<Catalog />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/add-product" 
                element={
                  <ProtectedRoute allowedRoles={['seller', 'admin']}>
                    <AddProduct />
                  </ProtectedRoute>
                } 
              />
              <Route path="/agent/:id" element={<AgentDetails />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/developer" element={<DeveloperDashboard />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
