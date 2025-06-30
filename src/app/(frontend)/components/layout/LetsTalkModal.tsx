"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone: string;
}

interface FormErrors {
  [key: string]: string;
}

const LetsTalkModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'NAME IS REQUIRED!';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'EMAIL IS REQUIRED!';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'INVALID EMAIL FORMAT!';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'SUBJECT IS REQUIRED!';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'MESSAGE IS REQUIRED!';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          phone: '',
        });
        // Auto-close modal after successful submission
        setTimeout(() => {
          setIsOpen(false);
          setSubmitStatus('idle');
        }, 2000);
      } else {
        const errorData = await response.json();
        console.error('Submission error:', errorData);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Network error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setSubmitStatus('idle');
    setErrors({});
  };

  return (
    <div>
			<button
				onClick={() => setIsOpen(true)}
				className="hidden md:block border border-black text-black hover:bg-black hover:text-white px-4 py-2 rounded-md transition cursor-pointer"
			>
				Let&apos;s Talk
			</button>
			{isOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-sandstorm-yellow border-4 border-black shadow-[12px_12px_0px_0px_#000] max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-turquoise-green border-b-4 border-black p-6 flex justify-between items-center">
              <h2 className="font-display text-2xl font-extrabold uppercase text-black">
								LET&apos;S CREATE SOMETHING
              </h2>
              <button
                onClick={closeModal}
                className="bg-orange-red border-2 border-black p-2 transition-colors shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
              >
                <X size={20} className="font-black text-black" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="bg-turquoise-green border-4 border-black p-4 mb-6 shadow-[4px_4px_0px_0px_#000]">
                  <p className="font-black text-black text-lg uppercase">
                    MESSAGE SENT! WE&apos;LL BE IN TOUCH!
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-orange-red border-4 border-black p-4 mb-6 shadow-[4px_4px_0px_0px_#000]">
                  <p className="font-black text-lg uppercase">
                    ERROR! TRY AGAIN!
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
								<div className='flex flex-row items-start justify-center gap-6'>
									<div className='flex-1'>
										<label htmlFor="name" className="block text-lg text-black font-black uppercase mb-2 tracking-wide">
											NAME *
										</label>
										<input
											id='name'
											type="text"
											name="name"
											value={formData.name}
											onChange={handleInputChange}
											className={`w-full p-4 border-4 border-black font-bold text-black text-lg bg-white shadow-[4px_4px_0px_0px_#000] focus:shadow-[6px_6px_0px_0px_#000] focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all outline-none ${
												errors.name ? 'bg-orange-red/10' : ''
											}`}
											placeholder="YOUR FULL NAME"
											maxLength={100}
										/>
										{errors.name && (
											<p className="text-orange-red font-black text-sm mt-2 uppercase">
												{errors.name}
											</p>
										)}
									</div>

									{/* Email Field */}
									<div className='flex-1'>
										<label className="block text-lg text-black font-black uppercase mb-2 tracking-wide">
											EMAIL *
										</label>
										<input
											type="email"
											name="email"
											value={formData.email}
											onChange={handleInputChange}
											className={`w-full p-4 border-4 border-black font-bold text-black text-lg bg-white shadow-[4px_4px_0px_0px_#000] focus:shadow-[6px_6px_0px_0px_#000] focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all outline-none ${
												errors.email ? 'bg-orange-red/10' : ''
											}`}
											placeholder="YOUR@EMAIL.COM"
										/>
										{errors.email && (
											<p className="text-orange-red font-black text-sm mt-2 uppercase">
												{errors.email}
											</p>
										)}
									</div>
								</div>

                {/* Subject Field */}
                <div>
                  <label className="block text-lg text-black font-black uppercase mb-2 tracking-wide">
                    SUBJECT *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full p-4 border-4 border-black font-bold text-black text-lg bg-white shadow-[4px_4px_0px_0px_#000] focus:shadow-[6px_6px_0px_0px_#000] focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all outline-none ${
                      errors.subject ? 'bg-orange-red/10' : ''
                    }`}
                    placeholder="WHAT'S THIS ABOUT?"
                    maxLength={200}
                  />
                  {errors.subject && (
                    <p className="text-orange-red font-black text-sm mt-2 uppercase">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-lg text-black font-black uppercase mb-2 tracking-wide">
                    MESSAGE *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full p-4 border-4 border-black font-bold text-black text-lg bg-white shadow-[4px_4px_0px_0px_#000] focus:shadow-[6px_6px_0px_0px_#000] focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all outline-none resize-none ${
                      errors.message ? 'bg-orange-red/10' : ''
                    }`}
                    placeholder="TELL US EVERYTHING!"
                    maxLength={2000}
                  />
                  <div className="flex justify-between items-center mt-2">
                    {errors.message && (
                      <p className="text-orange-red font-black text-sm uppercase">
                        {errors.message}
                      </p>
                    )}
                    <p className="text-black font-black text-sm uppercase ml-auto">
                      {formData.message.length}/2000
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 bg-white border-4 border-black p-4 font-black text-black text-lg uppercase shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all hover:bg-gray-400"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-turquoise-green border-4 border-black p-4 font-black text-black text-lg uppercase shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all disabled:cursor-not-allowed disabled:hover:shadow-[4px_4px_0px_0px_#000] disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? 'SENDING...' : 'SEND IT!'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LetsTalkModal