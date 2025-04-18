import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import emailjs from '@emailjs/browser';

// Initialize EmailJS (Replace with your actual credentials)
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_USER_ID);

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
  const [isSubmittingCustomer, setIsSubmittingCustomer] = useState(false);
  const [isSubmittingEmployee, setIsSubmittingEmployee] = useState(false);

  // Customer form initialization
  const customerForm = useForm({
    resolver: zodResolver(customerFormSchema),
    defaultValues: { name: "", email: "", phone: "", serviceType: "", message: "" },
  });

  // Employee form initialization
  const employeeForm = useForm({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: { name: "", email: "", phone: "", experience: "", position: "", availability: "", message: "" },
  });

  // Email sending function
  const sendEmail = async (templateParams, templateId) => {
    try {
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        templateId,
        templateParams
      );
      return response.status === 200;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  };

  // Customer form submit handler
  const onCustomerSubmit = async (data) => {
    setIsSubmittingCustomer(true);
    const templateParams = {
      to_email: 'tedora.care@gmail.com',
      from_name: data.name,
      from_email: data.email,
      phone: data.phone,
      service_type: data.serviceType,
      message: data.message,
      type: 'Service Request'
    };

    const success = await sendEmail(templateParams, process.env.NEXT_PUBLIC_EMAILJS_CUSTOMER_TEMPLATE_ID);
    
    if (success) {
      toast({ title: "Success!", description: "Your request has been submitted." });
      customerForm.reset();
    } else {
      toast({ title: "Error", description: "Failed to submit. Please try again.", variant: "destructive" });
    }
    setIsSubmittingCustomer(false);
  };

  // Employee form submit handler
  const onEmployeeSubmit = async (data) => {
    setIsSubmittingEmployee(true);
    const templateParams = {
      to_email: 'tedora.care@gmail.com',
      from_name: data.name,
      from_email: data.email,
      phone: data.phone,
      position: data.position,
      experience: data.experience,
      availability: data.availability,
      message: data.message,
      type: 'Job Application'
    };

    const success = await sendEmail(templateParams, process.env.NEXT_PUBLIC_EMAILJS_EMPLOYEE_TEMPLATE_ID);
    
    if (success) {
      toast({ title: "Success!", description: "Application submitted successfully!" });
      employeeForm.reset();
    } else {
      toast({ title: "Error", description: "Submission failed. Please try again.", variant: "destructive" });
    }
    setIsSubmittingEmployee(false);
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

        <Tabs defaultValue="customer" className="max-w-2xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="customer">Request Service</TabsTrigger>
            <TabsTrigger value="employee">Join Our Team</TabsTrigger>
          </TabsList>

          <TabsContent value="customer">
            <CustomerForm form={customerForm} onSubmit={onCustomerSubmit} isSubmitting={isSubmittingCustomer} />
          </TabsContent>

          <TabsContent value="employee">
            <EmployeeForm form={employeeForm} onSubmit={onEmployeeSubmit} isSubmitting={isSubmittingEmployee} />
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
        {/* Form fields remain the same as before */}
        {/* ... (keep all your existing Customer Form fields) ... */}
        
        <Button type="submit" className="w-full bg-tedora-sage hover:bg-tedora-sage/90" disabled={isSubmitting}>
          {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : <>Submit Request</>}
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
        {/* Form fields remain the same as before */}
        {/* ... (keep all your existing Employee Form fields) ... */}
        
        <Button type="submit" className="w-full bg-tedora-sage hover:bg-tedora-sage/90" disabled={isSubmitting}>
          {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : <>Submit Application</>}
        </Button>
      </form>
    </Form>
  </div>
);

export default Forms;
