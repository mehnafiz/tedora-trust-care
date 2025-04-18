
import emailjs from 'emailjs-com';

// Initialize EmailJS with your user ID
// Replace with your actual EmailJS user ID when setting up
emailjs.init("YOUR_USER_ID");

interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
}

interface EmployeeFormData {
  name: string;
  email: string;
  phone: string;
  experience: string;
  position: string;
  availability: string;
  message: string;
}

export const sendCustomerFormEmail = async (data: CustomerFormData): Promise<boolean> => {
  try {
    const templateParams = {
      to_email: "tedora.care@gmail.com",
      from_name: data.name,
      from_email: data.email,
      phone: data.phone,
      service_type: data.serviceType,
      message: data.message,
      form_type: "Customer Service Request"
    };
    
    await emailjs.send(
      'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
      'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
      templateParams
    );
    
    return true;
  } catch (error) {
    console.error('Error sending customer form email:', error);
    return false;
  }
};

export const sendEmployeeFormEmail = async (data: EmployeeFormData): Promise<boolean> => {
  try {
    const templateParams = {
      to_email: "tedora.care@gmail.com",
      from_name: data.name,
      from_email: data.email,
      phone: data.phone,
      position: data.position,
      experience: data.experience,
      availability: data.availability,
      message: data.message,
      form_type: "Employee Application"
    };
    
    await emailjs.send(
      'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
      'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
      templateParams
    );
    
    return true;
  } catch (error) {
    console.error('Error sending employee form email:', error);
    return false;
  }
};
