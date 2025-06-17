
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, CreditCard } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentName: string;
  price: string;
}

const PaymentModal = ({ isOpen, onClose, agentName, price }: PaymentModalProps) => {
  const [email, setEmail] = useState('');

  const handleContactSupport = () => {
    const subject = encodeURIComponent(`Test Access Request: ${agentName}`);
    const body = encodeURIComponent(`Hi,\n\nI'm interested in testing the ${agentName} agent (${price}). Please provide test access.\n\nEmail: ${email}\n\nThank you!`);
    window.open(`mailto:support@example.com?subject=${subject}&body=${body}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment in Development
          </DialogTitle>
          <DialogDescription>
            We're working on integrating payments. For now, contact us for test access.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold">{agentName}</h3>
            <p className="text-blue-600 font-medium">{price}</p>
          </div>
          
          <div>
            <Label htmlFor="email">Your Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleContactSupport}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={!email}
            >
              <Mail className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 text-center">
            Thank you for your interest! Our team will get back to you within 24 hours.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
