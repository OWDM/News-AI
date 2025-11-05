'use client';

import { useState } from 'react';
import { MagicCard } from './MagicCard';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
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
            <p className="text-sm font-medium mb-3 animate-contact-label" style={{ color: 'var(--navbar-indicator)' }}>
              [Contact]
            </p>
            <h2 className="text-5xl font-bold mb-4 animate-contact-heading" style={{ color: 'var(--foreground)' }}>
              Drop Me a Message
            </h2>
            <p className="text-sm leading-relaxed animate-contact-description" style={{ color: 'var(--navbar-white-icon)' }}>
              Have questions or feedback? I&apos;d love to hear from you. Fill out the form and I&apos;ll get back to you as soon as possible.
            </p>
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

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="group w-full rounded-full pl-6 pr-1 py-1 flex items-center justify-between relative isolate"
                    style={{
                      backgroundColor: 'var(--navbar-indicator)',
                      transition: 'all 0.3s ease',
                      overflow: 'visible',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--sec)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--navbar-indicator)';
                    }}
                  >
                    {/* Button text */}
                    <span className="text-base font-medium text-[#101010] transition-colors duration-300 pointer-events-none">
                      Send Message
                    </span>

                    {/* White circle with animated arrow */}
                    <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 relative ml-4 pointer-events-none">
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
