
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { sendCustomerFormEmail, sendEmployeeFormEmail } from '@/utils/emailService';

const customerFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  serviceType: z.string().min(1, "Please select a service type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const employeeFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  experience: z.string().min(1, "Please enter your experience"),
  position: z.string().min(1, "Please select a position"),
  availability: z.string().min(1, "Please enter your availability"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const Forms = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("customer");
  const [isSubmittingCustomer, setIsSubmittingCustomer] = useState(false);
  const [isSubmittingEmployee, setIsSubmittingEmployee] = useState(false);

  const customerForm = useForm({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      message: "",
    },
  });

  const employeeForm = useForm({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      experience: "",
      position: "",
      availability: "",
      message: "",
    },
  });

  const onCustomerSubmit = async (data: z.infer<typeof customerFormSchema>) => {
    setIsSubmittingCustomer(true);
    try {
      const success = await sendCustomerFormEmail(data);
      
      if (success) {
        toast({
          title: "Form submitted successfully!",
          description: "We'll get back to you soon.",
        });
        customerForm.reset();
      } else {
        toast({
          title: "Submission failed",
          description: "Please try again or contact us directly.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      toast({
        title: "Submission error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingCustomer(false);
    }
  };

  const onEmployeeSubmit = async (data: z.infer<typeof employeeFormSchema>) => {
    setIsSubmittingEmployee(true);
    try {
      const success = await sendEmployeeFormEmail(data);
      
      if (success) {
        toast({
          title: "Application submitted successfully!",
          description: "We'll review your application and contact you soon.",
        });
        employeeForm.reset();
      } else {
        toast({
          title: "Submission failed",
          description: "Please try again or contact us directly.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      toast({
        title: "Submission error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingEmployee(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-tedora-cream/30">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="section-title relative inline-block">
          Join Our Community
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-tedora-sage to-tedora-peach"></div>
        </h1>
        
        <p className="text-center max-w-2xl mx-auto mb-10 text-gray-600">
          Fill out the form below to request our services or join our team. We'll get back to you as soon as possible.
          You can also contact us directly at <a href="mailto:tedora.care@gmail.com" className="text-tedora-sage hover:underline">tedora.care@gmail.com</a>.
        </p>

        <Tabs defaultValue="customer" className="max-w-2xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="customer">Request Service</TabsTrigger>
            <TabsTrigger value="employee">Join Our Team</TabsTrigger>
          </TabsList>

          <TabsContent value="customer" className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-tedora-sage/20">
              <Form {...customerForm}>
                <form onSubmit={customerForm.handleSubmit(onCustomerSubmit)} className="space-y-6">
                  <FormField
                    control={customerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={customerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={customerForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+880 XXX XXX XXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={customerForm.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Type</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="">Select a service</option>
                            <option value="babysitting">Babysitting</option>
                            <option value="elderly">Elderly Care</option>
                            <option value="fullday">Full-day Care</option>
                            <option value="overnight">Overnight Care</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={customerForm.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Details</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please provide any additional information..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-tedora-sage hover:bg-tedora-sage/90"
                    disabled={isSubmittingCustomer}
                  >
                    {isSubmittingCustomer ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>Submit Request</>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </TabsContent>

          <TabsContent value="employee" className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-tedora-sage/20">
              <Form {...employeeForm}>
                <form onSubmit={employeeForm.handleSubmit(onEmployeeSubmit)} className="space-y-6">
                  <FormField
                    control={employeeForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={employeeForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={employeeForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+880 XXX XXX XXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={employeeForm.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="">Select a position</option>
                            <option value="babysitter">Babysitter</option>
                            <option value="elderlycare">Elderly Caregiver</option>
                            <option value="nurse">Nurse</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={employeeForm.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Years of experience" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={employeeForm.control}
                    name="availability"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Availability</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="">Select availability</option>
                            <option value="fulltime">Full Time</option>
                            <option value="parttime">Part Time</option>
                            <option value="weekend">Weekends Only</option>
                            <option value="flexible">Flexible</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={employeeForm.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tell us about yourself</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Share your experience and why you'd like to join our team..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-tedora-sage hover:bg-tedora-sage/90"
                    disabled={isSubmittingEmployee}
                  >
                    {isSubmittingEmployee ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>Submit Application</>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Forms;
