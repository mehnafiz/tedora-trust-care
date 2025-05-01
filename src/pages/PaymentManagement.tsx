import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCard,
  Smartphone,
  User,
  Calendar,
  CheckCircle2,
  PlusCircle,
  Wallet,
  Clock,
  Shield,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PaymentManagement = () => {
  const [activeTab, setActiveTab] = useState("payment-methods");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleAddPayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Payment Method Added",
        description: "Your new payment method has been added successfully.",
      });
      setActiveTab("subscription");
    }, 1000);
  };

  const handleUpdateSubscription = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Subscription Updated",
        description: "Your subscription has been updated successfully.",
      });
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="payment-methods" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Payment Methods</span>
            </TabsTrigger>
            <TabsTrigger value="subscription" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              <span>Subscription</span>
            </TabsTrigger>
            <TabsTrigger value="transaction-history" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Transaction History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payment-methods">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Add and manage your payment methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Existing payment methods */}
                  <div className="bg-gray-50 rounded-lg p-4 border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-white">
                        <CreditCard className="h-5 w-5 text-tedora-sage" />
                      </div>
                      <div>
                        <h3 className="font-medium">Visa ending in 4242</h3>
                        <p className="text-sm text-gray-500">Expires 12/2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-tedora-sage/20 text-tedora-sage py-1 px-2 rounded-full">Default</span>
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">Remove</Button>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-gray-100">
                        <Smartphone className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">bKash - 01712345678</h3>
                        <p className="text-sm text-gray-500">Mobile Banking</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">Remove</Button>
                    </div>
                  </div>
                </div>

                {/* Add new payment method form */}
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Add New Payment Method</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="card-name">Cardholder Name</Label>
                      <Input id="card-name" placeholder="Name on card" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiration Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" type="password" />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
                    <Shield className="h-4 w-4" />
                    <span>Your payment information is securely encrypted</span>
                  </div>
                  
                  <Button 
                    className="mt-6 bg-tedora-sage hover:bg-tedora-sage/90"
                    onClick={handleAddPayment}
                    disabled={loading}
                  >
                    {loading ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Payment Method
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>
                  Manage your subscription and billing cycle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-tedora-sage/10 border border-tedora-sage/20 rounded-lg p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-tedora-sage text-white py-1 px-4 rounded-bl-lg">
                    Current Plan
                  </div>
                  <h3 className="text-xl font-bold text-tedora-sage mb-2">Premium Family Care</h3>
                  <p className="text-gray-600">Your subscription renews on June 15, 2023</p>
                  
                  <div className="mt-6">
                    <p className="text-3xl font-bold">৳4,999<span className="text-sm font-normal text-gray-500">/month</span></p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-tedora-sage" />
                        <span>Priority booking for high-demand time slots</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-tedora-sage" />
                        <span>10% discount on all services</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-tedora-sage" />
                        <span>Free cancellation up to 2 hours before service</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-tedora-sage" />
                        <span>24/7 priority support</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Change Subscription</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="plan">Select Plan</Label>
                      <Select defaultValue="premium">
                        <SelectTrigger>
                          <SelectValue placeholder="Select plan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic Care (৳2,999/month)</SelectItem>
                          <SelectItem value="premium">Premium Family Care (৳4,999/month)</SelectItem>
                          <SelectItem value="unlimited">Unlimited Care (৳9,999/month)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="billing-cycle">Billing Cycle</Label>
                      <Select defaultValue="monthly">
                        <SelectTrigger>
                          <SelectValue placeholder="Select billing cycle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly (5% off)</SelectItem>
                          <SelectItem value="annually">Annually (15% off)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="payment-method">Payment Method</Label>
                      <Select defaultValue="visa">
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="visa">Visa ending in 4242</SelectItem>
                          <SelectItem value="bkash">bKash - 01712345678</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button 
                    className="mt-6 bg-tedora-sage hover:bg-tedora-sage/90"
                    onClick={handleUpdateSubscription}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Update Subscription"}
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-gray-50 flex justify-between">
                <div className="text-sm text-gray-500">
                  Need help with your subscription? 
                  <Button variant="link" className="p-0 h-auto text-tedora-sage">Contact Support</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="transaction-history">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>
                  Review your past payments and subscriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Transaction list */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 bg-gray-50 p-2 rounded-lg text-sm font-medium text-gray-600">
                    <div>Date</div>
                    <div>Description</div>
                    <div>Payment Method</div>
                    <div className="text-right">Amount</div>
                  </div>
                  
                  {/* Transaction items */}
                  <div className="grid grid-cols-1 md:grid-cols-4 border-b pb-4">
                    <div className="text-gray-600">May 15, 2023</div>
                    <div className="font-medium">Premium Family Care - Monthly</div>
                    <div className="text-gray-600">Visa ending in 4242</div>
                    <div className="text-right font-semibold">৳4,999</div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 border-b pb-4">
                    <div className="text-gray-600">Apr 15, 2023</div>
                    <div className="font-medium">Premium Family Care - Monthly</div>
                    <div className="text-gray-600">Visa ending in 4242</div>
                    <div className="text-right font-semibold">৳4,999</div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 border-b pb-4">
                    <div className="text-gray-600">Mar 15, 2023</div>
                    <div className="font-medium">Basic Care - Monthly</div>
                    <div className="text-gray-600">Visa ending in 4242</div>
                    <div className="text-right font-semibold">৳2,999</div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 border-b pb-4">
                    <div className="text-gray-600">Feb 15, 2023</div>
                    <div className="font-medium">Basic Care - Monthly</div>
                    <div className="text-gray-600">bKash - 01712345678</div>
                    <div className="text-right font-semibold">৳2,999</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-4">
                <Button variant="outline" className="text-tedora-sage border-tedora-sage hover:bg-tedora-sage/10">
                  Export Transactions
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PaymentManagement;
