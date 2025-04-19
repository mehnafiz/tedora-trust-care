
import emailjs from '@emailjs/browser';

// Initialize EmailJS in the component that uses this service

export interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
}

export interface EmployeeFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  availability: string;
  message: string;
}

// Helper function to format the current date and time
const formatDateTime = () => {
  const now = new Date();
  return now.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
};

// Construct HTML email template for customer form
const createCustomerEmailTemplate = (data: CustomerFormData): Record<string, string> => {
  return {
    to_email: 'tedora.care@gmail.com',
    from_name: data.name,
    from_email: data.email,
    phone: data.phone,
    service_type: data.serviceType,
    message: data.message,
    form_type: 'Service Request',
    submission_time: formatDateTime(),
    subject: `[New Submission] Service Request from ${data.name}`
  };
};

// Construct HTML email template for employee form
const createEmployeeEmailTemplate = (data: EmployeeFormData): Record<string, string> => {
  return {
    to_email: 'tedora.care@gmail.com',
    from_name: data.name,
    from_email: data.email,
    phone: data.phone,
    position: data.position,
    experience: data.experience,
    availability: data.availability, 
    message: data.message,
    form_type: 'Job Application',
    submission_time: formatDateTime(),
    subject: `[New Submission] Job Application from ${data.name}`
  };
};

// Send customer form email
export const sendCustomerFormEmail = async (data: CustomerFormData): Promise<boolean> => {
  try {
    const templateParams = createCustomerEmailTemplate(data);
    
    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
      process.env.NEXT_PUBLIC_EMAILJS_CUSTOMER_TEMPLATE_ID || '',
      templateParams
    );
    
    console.log('Customer form email sent successfully:', response);
    return response.status === 200;
  } catch (error) {
    console.error('Error sending customer form email:', error);
    return false;
  }
};

// Send employee form email
export const sendEmployeeFormEmail = async (data: EmployeeFormData): Promise<boolean> => {
  try {
    const templateParams = createEmployeeEmailTemplate(data);
    
    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
      process.env.NEXT_PUBLIC_EMAILJS_EMPLOYEE_TEMPLATE_ID || '',
      templateParams
    );
    
    console.log('Employee form email sent successfully:', response);
    return response.status === 200;
  } catch (error) {
    console.error('Error sending employee form email:', error);
    return false;
  }
};
