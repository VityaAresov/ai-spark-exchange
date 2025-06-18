
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  rating: number;
  reviews: number;
  type: string;
  vendor: string;
  user_id: string;
  demo_url: string;
  integration: string;
  created_at: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, userRole } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('"INFO"')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        toast({
          title: "Error",
          description: "Failed to load product details.",
          variant: "destructive"
        });
      } else {
        setProduct(data);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast({
        title: "Error",
        description: "Failed to load product details.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const canEditProduct = () => {
    if (!user || !product) return false;
    return product.user_id === user.id || userRole === 'admin';
  };

  const handleDelete = async () => {
    if (!product || !window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    setDeleting(true);
    
    try {
      const { error } = await supabase
        .from('"INFO"')
        .delete()
        .eq('id', product.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete product.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success",
          description: "Product deleted successfully.",
        });
        navigate('/catalog');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product.",
        variant: "destructive"
      });
    } finally {
      setDeleting(false);
    }
  };

  const formatPrice = (price: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price / 100);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link to="/catalog" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Catalog
        </Link>
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Product not found</h3>
          <p className="text-gray-500">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/catalog" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardContent className="p-6">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-gray-500">Product Preview</span>
              </div>
              {product.demo_url && (
                <Button variant="outline" className="w-full" asChild>
                  <a href={product.demo_url} target="_blank" rel="noopener noreferrer">
                    View Demo
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex gap-2">
                {canEditProduct() && (
                  <>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/edit-product/${product.id}`}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Link>
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={handleDelete}
                      disabled={deleting}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {deleting ? 'Deleting...' : 'Delete'}
                    </Button>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary" className="text-lg font-semibold px-3 py-1">
                {formatPrice(product.price, product.currency)}
              </Badge>
              <Badge variant="outline">{product.category}</Badge>
              {product.rating && (
                <div className="text-sm text-gray-500">
                  ⭐ {product.rating.toFixed(1)} ({product.reviews} reviews)
                </div>
              )}
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="space-y-3">
              {product.vendor && (
                <div>
                  <span className="font-medium text-gray-700">Vendor: </span>
                  <span className="text-gray-600">{product.vendor}</span>
                </div>
              )}
              {product.integration && (
                <div>
                  <span className="font-medium text-gray-700">Integration: </span>
                  <span className="text-gray-600">{product.integration}</span>
                </div>
              )}
              <div>
                <span className="font-medium text-gray-700">Type: </span>
                <span className="text-gray-600">{product.type}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Added: </span>
                <span className="text-gray-600">
                  {new Date(product.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
              Purchase Agent - {formatPrice(product.price, product.currency)}
            </Button>
            <Button variant="outline" className="w-full" size="lg">
              Try Free Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
