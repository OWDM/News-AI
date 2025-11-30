'use client';

import { useState, useEffect } from 'react';
import { MagicCard } from './MagicCard';
import { TextAnimate } from '@/registry/magicui/text-animate';

export default function Contact() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Prevent hydration mismatch by only enabling animations after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset success message after 5 seconds
  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.error || !response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      // Success - reset form
      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus('success');
    } catch (error: any) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text */}
          <div>
            {mounted && (
              <>
                <TextAnimate
                  animation="blurInUp"
                  by="word"
                  duration={0.5}
                  className="text-sm font-medium mb-3"
                  style={{ color: 'var(--navbar-indicator)' }}
                >
                  [Contact]
                </TextAnimate>
                <TextAnimate
                  animation="blurInUp"
                  by="word"
                  once
                  className="text-5xl font-bold mb-4"
                  style={{ color: 'var(--foreground)' }}
                >
                  Drop Me a Message
                </TextAnimate>
                <TextAnimate
                  animation="blurIn"
                  as="p"
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--navbar-white-icon)' }}
                >
                  Have questions or feedback? I&apos;d love to hear from you. Fill out the form and I&apos;ll get back to you as soon as possible.
                </TextAnimate>
              </>
            )}
          </div>

          {/* Right Side - Form */}
          <div className="animate-contact-form">
            <MagicCard
              gradientSize={300}
              gradientColor="#262626"
              gradientOpacity={0.6}
              gradientFrom="#a476ff"
              gradientTo="#A9FF5B"
              className="rounded-2xl"
            >
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-0 transition-all duration-300"
                      style={{
                        backgroundColor: 'var(--background)',
                        borderColor: 'var(--border-color)',
                        color: 'var(--foreground)',
                      }}
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-0 transition-all duration-300"
                      style={{
                        backgroundColor: 'var(--background)',
                        borderColor: 'var(--border-color)',
                        color: 'var(--foreground)',
                      }}
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-0 resize-none transition-all duration-300"
                      style={{
                        backgroundColor: 'var(--background)',
                        borderColor: 'var(--border-color)',
                        color: 'var(--foreground)',
                      }}
                      placeholder="Your message..."
                    />
                  </div>

                  {/* Success Message */}
                  {submitStatus === 'success' && (
                    <div className="p-4 rounded-lg animate-fadeIn" style={{ backgroundColor: 'rgba(169, 255, 91, 0.1)', border: '1px solid var(--navbar-indicator)' }}>
                      <p className="text-sm font-medium" style={{ color: 'var(--navbar-indicator)' }}>
                        Message sent successfully! I&apos;ll get back to you soon.
                      </p>
                    </div>
                  )}

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <div className="p-4 rounded-lg animate-fadeIn" style={{ backgroundColor: 'rgba(255, 68, 68, 0.1)', border: '1px solid #ff4444' }}>
                      <p className="text-sm font-medium" style={{ color: '#ff6666' }}>
                        {errorMessage}
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="contact-send-button group w-full rounded-full pl-6 pr-1 py-1 flex items-center justify-between relative isolate"
                    style={{
                      backgroundColor: isSubmitting ? 'var(--border-color)' : 'var(--navbar-indicator)',
                      transition: 'all 0.3s ease',
                      overflow: 'visible',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      opacity: isSubmitting ? 0.6 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.backgroundColor = 'var(--sec)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.backgroundColor = 'var(--navbar-indicator)';
                      }
                    }}
                  >
                    {/* Button text */}
                    <span className="text-base font-medium text-[#101010] transition-colors duration-300 pointer-events-none">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </span>

                    {/* White circle with animated arrow or spinner */}
                    <div className="button-circle w-11 h-11 bg-white rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 relative ml-4 pointer-events-none">
                      {isSubmitting ? (
                        // Spinner
                        <svg className="w-4 h-4 animate-spin" style={{ color: '#101010' }} fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <>
                          {/* First arrow - moves up-right and fades out on hover */}
                          <svg
                            className="w-4 h-4 transition-all duration-200 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-0"
                            style={{ color: '#101010' }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 17L17 7M17 7H7M17 7v10"
                            />
                          </svg>

                          {/* Second arrow - positioned bottom-left, moves to center and fades in on hover */}
                          <svg
                            className="w-4 h-4 absolute transition-all duration-200 -translate-x-2 translate-y-2 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                            style={{ color: 'var(--sec)' }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 17L17 7M17 7H7M17 7v10"
                            />
                          </svg>
                        </>
                      )}
                    </div>
                  </button>
                </form>
              </div>
            </MagicCard>
          </div>
        </div>
      </div>
    </div>
  );
}
