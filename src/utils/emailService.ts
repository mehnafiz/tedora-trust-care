
import emailjs from '@emailjs/browser';

// Initialize EmailJS service
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '');

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
      import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
      import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID || '',
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
      import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
      import.meta.env.VITE_EMAILJS_EMPLOYEE_TEMPLATE_ID || '',
      templateParams
    );
    
    console.log('Employee form email sent successfully:', response);
    return response.status === 200;
  } catch (error) {
    console.error('Error sending employee form email:', error);
    return false;
  }
};

// New function for Formspree submission
export const sendFormspreeSubmission = async (data: {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
}): Promise<boolean> => {
  try {
    const response = await fetch('https://formspree.io/f/xknddpjk', { // Replace with your Formspree form ID
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        serviceType: data.serviceType,
        message: data.message,
        _redirect: `https://wa.me/${data.phone}?text=*Thanks, ${data.name}!*%0AWe'll contact you shortly.`,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error sending Formspree submission:', error);
    return false;
  }
};
