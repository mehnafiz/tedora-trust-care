
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  sendCustomerFormEmail, 
  sendEmployeeFormEmail,
  CustomerFormData,
  EmployeeFormData
} from "../utils/emailService";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Zod schemas for form validation
const customerFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  serviceType: z.string().min(1, "Please select a service type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().optional(), // Honeypot field for spam protection
});

const employeeFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  position: z.string().min(1, "Please select a position"),
  experience: z.string().min(1, "Please enter your experience"),
  availability: z.string().min(1, "Please select your availability"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().optional(), // Honeypot field for spam protection
});

const Forms = () => {
  const { toast } = useToast();
  const [isSubmittingCustomer, setIsSubmittingCustomer] = useState(false);
  const [isSubmittingEmployee, setIsSubmittingEmployee] = useState(false);
  const [showCustomerSuccess, setShowCustomerSuccess] = useState(false);
  const [showEmployeeSuccess, setShowEmployeeSuccess] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);

  // Customer form initialization
  const customerForm = useForm({
    resolver: zodResolver(customerFormSchema),
    defaultValues: { 
      name: "", 
      email: "", 
      phone: "", 
      serviceType: "", 
      message: "",
      honeypot: "",
    },
  });

  // Employee form initialization
  const employeeForm = useForm({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: { 
      name: "", 
      email: "", 
      phone: "", 
      position: "", 
      experience: "", 
      availability: "", 
      message: "",
      honeypot: "", 
    },
  });

  // Check if rate limit is exceeded
  const checkRateLimit = () => {
    // Increment submission count
    const newCount = submissionCount + 1;
    setSubmissionCount(newCount);
    
    // Rate limiting logic (max 3 submissions per hour)
    if (newCount > 3) {
      toast({
        title: "Too many submissions",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  // Customer form submit handler
  const onCustomerSubmit = async (data) => {
    try {
      // Check honeypot field (if filled, likely a bot)
      if (data.honeypot) {
        console.log("Spam submission detected");
        toast({ 
          title: "Success!", 
          description: "Your request has been submitted." 
        });
        return;
      }

      // Check rate limit
      if (!checkRateLimit()) return;

      setIsSubmittingCustomer(true);
      
      // Extract form data (exclude honeypot)
      const { honeypot, ...formData } = data;
      
      // Send email
      const success = await sendCustomerFormEmail(formData as CustomerFormData);
      
      if (success) {
        toast({ 
          title: "Thank you!", 
          description: "We've received your submission." 
        });
        customerForm.reset();
        setShowCustomerSuccess(true);
        setTimeout(() => setShowCustomerSuccess(false), 5000);
        
        // Scroll to top for confirmation message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        toast({ 
          title: "Error", 
          description: "Submission failed. Please try again or contact us directly.", 
          variant: "destructive" 
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({ 
        title: "Error", 
        description: "Submission failed. Please try again or contact us directly.", 
        variant: "destructive" 
      });
    } finally {
      setIsSubmittingCustomer(false);
    }
  };

  // Employee form submit handler
  const onEmployeeSubmit = async (data) => {
    try {
      // Check honeypot field (if filled, likely a bot)
      if (data.honeypot) {
        console.log("Spam submission detected");
        toast({ 
          title: "Success!", 
          description: "Your application has been submitted." 
        });
        return;
      }

      // Check rate limit
      if (!checkRateLimit()) return;

      setIsSubmittingEmployee(true);
      
      // Extract form data (exclude honeypot)
      const { honeypot, ...formData } = data;
      
      // Send email
      const success = await sendEmployeeFormEmail(formData as EmployeeFormData);
      
      if (success) {
        toast({ 
          title: "Thank you!", 
          description: "We've received your application." 
        });
        employeeForm.reset();
        setShowEmployeeSuccess(true);
        setTimeout(() => setShowEmployeeSuccess(false), 5000);
        
        // Scroll to top for confirmation message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        toast({ 
          title: "Error", 
          description: "Submission failed. Please try again or contact us directly.", 
          variant: "destructive" 
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({ 
        title: "Error", 
        description: "Submission failed. Please try again or contact us directly.", 
        variant: "destructive" 
      });
    } finally {
      setIsSubmittingEmployee(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-tedora-cream/30">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="section-title relative inline-block text-3xl font-bold font-playfair text-tedora-sage mb-8">
          Join Our Community
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-tedora-sage to-tedora-peach"></div>
        </h1>
        
        <p className="text-center max-w-2xl mx-auto mb-10 text-gray-600">
          Fill out the form below to request our services or join our team. We'll get back to you as soon as possible.
          You can also contact us directly at <a href="mailto:tedora.care@gmail.com" className="text-tedora-sage hover:underline">tedora.care@gmail.com</a>.
        </p>

        {/* Success alerts */}
        {showCustomerSuccess && (
          <Alert className="mb-6 bg-green-50 border-tedora-sage">
            <CheckCircle className="h-5 w-5 text-tedora-sage" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Your service request has been submitted. We'll contact you shortly.
            </AlertDescription>
          </Alert>
        )}
        
        {showEmployeeSuccess && (
          <Alert className="mb-6 bg-green-50 border-tedora-sage">
            <CheckCircle className="h-5 w-5 text-tedora-sage" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Your application has been submitted. Our team will review it and get back to you soon.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="customer" className="max-w-2xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="customer">Request Service</TabsTrigger>
            <TabsTrigger value="employee">Join Our Team</TabsTrigger>
          </TabsList>

          <TabsContent value="customer">
            <CustomerForm 
              form={customerForm} 
              onSubmit={onCustomerSubmit} 
              isSubmitting={isSubmittingCustomer} 
            />
          </TabsContent>

          <TabsContent value="employee">
            <EmployeeForm 
              form={employeeForm} 
              onSubmit={onEmployeeSubmit} 
              isSubmitting={isSubmittingEmployee} 
            />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

// Customer Form Component
const CustomerForm = ({ form, onSubmit, isSubmitting }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg border border-tedora-sage/20">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="serviceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Type</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="companionship">Companionship Care</SelectItem>
                  <SelectItem value="personalcare">Personal Care</SelectItem>
                  <SelectItem value="specializedcare">Specialized Care</SelectItem>
                  <SelectItem value="respitecare">Respite Care</SelectItem>
                  <SelectItem value="overnightcare">Overnight Care</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Details</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Please provide any additional information about your needs" 
                  className="min-h-[120px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Honeypot field - hidden from users but bots will fill it out */}
        <div className="hidden">
          <FormField
            control={form.control}
            name="honeypot"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Leave this empty</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" className="w-full bg-tedora-sage hover:bg-tedora-sage/90" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
            </>
          ) : (
            <>Submit Request</>
          )}
        </Button>
      </form>
    </Form>
  </div>
);

// Employee Form Component
const EmployeeForm = ({ form, onSubmit, isSubmitting }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg border border-tedora-sage/20">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a position" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="caregiver">Caregiver</SelectItem>
                  <SelectItem value="nurse">Nurse</SelectItem>
                  <SelectItem value="coordinator">Care Coordinator</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                  <SelectItem value="administrative">Administrative</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experience</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="entry">Entry level (0-1 years)</SelectItem>
                  <SelectItem value="junior">Junior (1-3 years)</SelectItem>
                  <SelectItem value="midlevel">Mid-level (3-5 years)</SelectItem>
                  <SelectItem value="senior">Senior (5+ years)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="availability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Availability</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your availability" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="fulltime">Full-time</SelectItem>
                  <SelectItem value="parttime">Part-time</SelectItem>
                  <SelectItem value="weekends">Weekends only</SelectItem>
                  <SelectItem value="evenings">Evenings</SelectItem>
                  <SelectItem value="overnight">Overnight</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Personal Message</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us a bit about yourself and why you're interested in joining our team" 
                  className="min-h-[120px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Honeypot field - hidden from users but bots will fill it out */}
        <div className="hidden">
          <FormField
            control={form.control}
            name="honeypot"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Leave this empty</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" className="w-full bg-tedora-sage hover:bg-tedora-sage/90" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
            </>
          ) : (
            <>Submit Application</>
          )}
        </Button>
      </form>
    </Form>
  </div>
);

export default Forms;
