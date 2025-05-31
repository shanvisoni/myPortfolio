import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Github, CheckCircle, AlertCircle, Send } from 'lucide-react';
const formspreeId =  import.meta.env.VITE_FORMSPREE_ID;
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Using Formspree - Replace 'YOUR_FORM_ID' with your actual Formspree form ID
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus('success');
        setShowModal(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Have a project in mind? Let's work together to create something amazing.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">Let's Connect</h2>
                <p className="text-gray-400 leading-relaxed text-lg mb-8">
                  Ready to bring your ideas to life? Drop me a message and let's discuss how we can work together to create something extraordinary.
                </p>
              </div>
              
              <div className="space-y-6">
                <a 
                  href="mailto:shanvisoni7388@gmail.com" 
                  className="flex items-center space-x-4 text-gray-300 hover:text-purple-400 transition-all duration-300 group p-4 rounded-xl hover:bg-slate-800/30"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Mail className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Email</p>
                    <p className="text-gray-400">shanvisoni7388@gmail.com</p>
                  </div>
                </a>
                
                <a 
                  href="tel:+917388994402" 
                  className="flex items-center space-x-4 text-gray-300 hover:text-purple-400 transition-all duration-300 group p-4 rounded-xl hover:bg-slate-800/30"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Phone className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Phone</p>
                    <p className="text-gray-400">+91-7388994402</p>
                  </div>
                </a>
              </div>
              
              <div className="pt-8">
                <h3 className="text-xl font-semibold mb-4 text-white">Follow Me</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.linkedin.com/in/shanvi-soni-b80474258/" 
                    className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://github.com/shanvisoni" 
                    className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/25"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl backdrop-blur-sm border border-slate-700/50 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 text-white">Send Message</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      required
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      rows="6"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project or just say hello..."
                      required
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                    ></textarea>
                  </div>
                </div>
                
                <button
                  onClick={handleSubmit}
                  disabled={status === 'sending'}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {status === 'sending' ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
                
                {status === 'error' && (
                  <div className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-3 rounded-lg">
                    <AlertCircle className="w-5 h-5" />
                    <span>Failed to send message. Please try again.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Message Sent!</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Thank you for reaching out! I've received your message and will get back to you within 24 hours.
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;