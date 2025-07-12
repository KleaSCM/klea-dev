"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Mail, 
  Send, 
  CheckCircle, 
  AlertCircle,
  User,
  MessageSquare,
  Phone
} from "lucide-react";

// TypeScript declarations for global tracking functions
declare global {
  interface Window {
    trackFormSubmission?: (formType: string) => void;
    trackContactForm: (action: 'submit' | 'error') => void;
  }
}

// Form validation interface
interface FormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

// Contact form component with validation and submission
const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (optional)
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Handle form submission with enhanced error handling
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        
        // Track successful form submission
        if (typeof window !== 'undefined') {
          if (window.trackFormSubmission) {
            window.trackFormSubmission('contact_form_success');
          }
          if (window.trackContactForm) {
            window.trackContactForm('submit');
          }
        }
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
          });
          setSubmitStatus('idle');
        }, 3000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Something went wrong. Please try again.');
        
        // Track form error
        if (typeof window !== 'undefined') {
          if (window.trackFormSubmission) {
            window.trackFormSubmission('contact_form_error');
          }
          if (window.trackContactForm) {
            window.trackContactForm('error');
          }
        }
      }

    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="card p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <h4 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
          Get In Touch
        </h4>
      </div>

      {/* Success/Error messages */}
      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-green-700 dark:text-green-300">
              Thank you! Your message has been sent successfully. I'll get back to you soon!
            </span>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700 dark:text-red-300">
              {errorMessage || 'Something went wrong. Please try again or contact me directly.'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Email row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 dark:bg-slate-800/50 transition-colors ${
                errors.name 
                  ? 'border-red-300 dark:border-red-600' 
                  : 'border-slate-200 dark:border-slate-700'
              }`}
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 dark:bg-slate-800/50 transition-colors ${
                errors.email 
                  ? 'border-red-300 dark:border-red-600' 
                  : 'border-slate-200 dark:border-slate-700'
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Phone and Subject row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Phone (Optional)
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 dark:bg-slate-800/50 transition-colors ${
                errors.phone 
                  ? 'border-red-300 dark:border-red-600' 
                  : 'border-slate-200 dark:border-slate-700'
              }`}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Subject *
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 dark:bg-slate-800/50 transition-colors ${
                errors.subject 
                  ? 'border-red-300 dark:border-red-600' 
                  : 'border-slate-200 dark:border-slate-700'
              }`}
              placeholder="Project inquiry, collaboration, etc."
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.subject}
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Message *
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={6}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 dark:bg-slate-800/50 transition-colors resize-none ${
              errors.message 
                ? 'border-red-300 dark:border-red-600' 
                : 'border-slate-200 dark:border-slate-700'
            }`}
            placeholder="Tell me about your project, requirements, or how I can help you..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send Message
            </>
          )}
        </motion.button>
      </form>

      {/* Contact info */}
      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
        <h5 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">
          Alternative Contact Methods
        </h5>
        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>klea@example.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>+1 (555) 123-4567</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactForm; 