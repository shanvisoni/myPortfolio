import React, { useState, useEffect } from 'react';
import { ChevronDown, Mail, Phone, Github, Linkedin, ExternalLink, Code, Database, Wrench, Award, MapPin, Calendar, Star, MessageCircle, Users, ShoppingCart } from 'lucide-react';
import myPhoto from './assets/myPhoto.jpg';
import ContactFormSolutions from './contactForm';
// Import JSON data files
import skillsData from './data/skills.json';
import projectsData from './data/projects.json';
import achievementsData from './data/achievements.json';
import personalData from './data/personalInfo.json';

const PortfolioLook = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to get icon component from string
  const getIconComponent = (iconName) => {
    const icons = {
      Code: Code,
      Database: Database,
      Wrench: Wrench,
      Award: Award,
      Users: Users,
      ShoppingCart: ShoppingCart
    };
    const IconComponent = icons[iconName] || Code;
    return <IconComponent className="w-6 h-6" />;
  };

  // Helper function to get color classes
  const getColorClasses = (color) => {
    const colorMap = {
      purple: {
        bg: 'from-purple-900/30 to-slate-900/30',
        border: 'border-purple-500/20',
        text: 'text-purple-400',
        icon: 'text-purple-400',
        star: 'fill-purple-400 text-purple-400'
      },
      blue: {
        bg: 'from-blue-900/30 to-slate-900/30',
        border: 'border-blue-500/20',
        text: 'text-blue-400',
        icon: 'text-blue-400',
        star: 'fill-blue-400 text-blue-400'
      },
      green: {
        bg: 'from-green-900/30 to-slate-900/30',
        border: 'border-green-500/20',
        text: 'text-green-400',
        icon: 'text-green-400',
        star: 'fill-green-400 text-green-400'
      },
      pink: {
        bg: 'from-pink-900/30 to-slate-900/30',
        border: 'border-pink-500/20',
        text: 'text-pink-400',
        icon: 'text-pink-400',
        star: 'fill-pink-400 text-pink-400'
      }
    };
    return colorMap[color] || colorMap.purple;
  };

  const ScrollToSection = ({ sectionId, children, className = "" }) => {
    const handleClick = () => {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    };
    return (
      <button onClick={handleClick} className={className}>
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${
        isScrolled ? 'bg-slate-900/90 backdrop-blur-md py-4 shadow-lg shadow-purple-500/10' : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            {personalData.personalInfo.name}
          </div>
          <div className="hidden md:flex space-x-8">
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <ScrollToSection 
                key={item}
                sectionId={item.toLowerCase()}
                className="hover:text-purple-400 transition-all duration-300 relative group transform hover:scale-110"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-500"></span>
              </ScrollToSection>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
       <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/20 to-slate-900"></div>
        
        {/* Animated background shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="text-center z-10 px-6 animate-fadeInUp">
          <div className="mb-8 relative group">
            {/* Profile Image Container with enhanced animations */}
            <div className="w-56 h-56 mx-auto relative">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-spin-slow p-1 opacity-80">
                <div className="w-full h-full rounded-full bg-slate-900"></div>
              </div>
              
              {/* Main profile container */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1 group-hover:scale-105 transition-transform duration-500">
                <div className="w-full h-full rounded-full bg-slate-800 overflow-hidden relative">
                  {/* Profile Image */}
                  <img 
                    src={myPhoto}
                    alt={personalData.personalInfo.name}
                    className="w-full h-full object-cover rounded-full hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      // Fallback to initials if image fails to load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback initials (hidden by default) */}
                  <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" style={{display: 'none'}}>
                    {personalData.personalInfo.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
              </div>
              
              {/* Floating elements around profile */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce flex items-center justify-center">
                <Code className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-bounce delay-300 flex items-center justify-center">
                <Database className="w-4 h-4 text-white" />
              </div>
              <div className="absolute top-8 -left-8 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-8 -right-8 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse delay-500"></div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-textShimmer">
            {personalData.personalInfo.name}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-200 animate-fadeInUp delay-300">{personalData.personalInfo.title}</p>
          <p className="text-lg mb-12 max-w-2xl mx-auto text-gray-300 leading-relaxed animate-fadeInUp delay-500">
            {personalData.personalInfo.tagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fadeInUp delay-700">
            <ScrollToSection 
              sectionId="projects"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 shadow-lg hover:shadow-purple-500/50 relative overflow-hidden group"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </ScrollToSection>
            <ScrollToSection 
              sectionId="contact"
              className="px-8 py-4 border-2 border-purple-400 rounded-full hover:bg-purple-400 hover:text-slate-900 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 hover:shadow-lg hover:shadow-purple-400/50"
            >
              Let's Connect
            </ScrollToSection>
          </div>
          <ScrollToSection 
            sectionId="about"
            className="animate-bounce hover:animate-pulse transition-all duration-300"
          >
            <ChevronDown className="w-8 h-8 mx-auto text-purple-400 hover:text-pink-400 transition-colors duration-300" />
          </ScrollToSection>
        </div>
      </section>


       <section id="about" className="py-24 px-6 relative">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-fadeInUp">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fadeInLeft">
              {personalData.summary.map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-300 leading-relaxed hover:text-white transition-colors duration-300">
                  {paragraph}
                </p>
              ))}
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors duration-300">
                  <MapPin className="w-5 h-5 animate-pulse" />
                  <span>{personalData.personalInfo.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors duration-300">
                  <Calendar className="w-5 h-5 animate-pulse delay-300" />
                  <span>Expected Graduation: {personalData.education.expectedGraduation}</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-8 rounded-2xl backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 animate-fadeInRight hover:transform hover:scale-105">
              <h3 className="text-2xl font-bold mb-6 text-purple-400">Current Role</h3>
              <div className="space-y-4">
                <h4 className="text-xl font-semibold">{personalData.currentRole.position}</h4>
                <p className="text-purple-300">{personalData.currentRole.company} | {personalData.currentRole.type}</p>
                <p className="text-gray-300">{personalData.currentRole.startDate} - {personalData.currentRole.endDate}</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  {personalData.currentRole.responsibilities.map((responsibility, index) => (
                    <li key={index} className="hover:text-gray-300 transition-colors duration-300">• {responsibility}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillsData.skillCategories.map((category) => {
              const colors = getColorClasses(category.color);
              const IconComponent = getIconComponent(category.icon);
              
              return (
                <div key={category.id} className={`bg-gradient-to-br ${colors.bg} p-6 rounded-2xl backdrop-blur-sm border ${colors.border} hover:transform hover:scale-105 transition-all duration-300`}>
                  <div className={`w-8 h-8 ${colors.icon} mb-4`}>
                    {IconComponent}
                  </div>
                  <h3 className={`text-xl font-bold mb-4 ${colors.text}`}>{category.title}</h3>
                  <div className="space-y-2">
                    {category.skills.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-300">{skill.name}</span>
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < skill.level ? colors.star : 'text-gray-600'}`} 
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {projectsData.projects.map((project, index) => (
              <div key={project.id} className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${project.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {getIconComponent(project.icon)}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-purple-400 mb-3">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {project.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-slate-700/50 px-2 py-1 rounded-full text-gray-300">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-purple-400 mb-3">Tech Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, idx) => (
                      <span key={idx} className="text-xs bg-purple-900/30 text-purple-300 px-2 py-1 rounded-full border border-purple-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
  <a 
    href={project.demoUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors duration-300 group"
  >
    <span>View Project</span>
    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
  </a>
  <span className={`text-xs px-2 py-1 rounded-full ${
    project.status === 'Completed' 
      ? 'bg-green-900/30 text-green-400' 
      : 'bg-yellow-900/30 text-yellow-400'
  }`}>
    {project.status}
  </span>
</div>

              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Achievements Section */}
      <section className="py-24 px-6 bg-slate-900/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Achievements & Certifications
          </h2>
          <div className="space-y-6">
            {achievementsData.achievements.map((achievement) => (
              <div key={achievement.id} className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 p-6 rounded-2xl backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:translateX-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{achievement.title}</h3>
                    <p className="text-gray-400 mb-1">{achievement.description}</p>
                    <p className="text-sm text-purple-400">{achievement.organization}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs bg-purple-900/30 text-purple-300 px-2 py-1 rounded-full">
                        {achievement.type}
                      </span>
                      <span className="text-xs bg-slate-700/50 text-gray-300 px-2 py-1 rounded-full">
                        {achievement.category}
                      </span>
                    </div>
                  </div>
                  <div className="text-purple-400 font-bold text-lg">
                    {achievement.year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {/* <section id="contact" className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">Get In Touch</h3>
                <p className="text-gray-400 leading-relaxed mb-8">
                  I'm always open to discussing new opportunities, collaborations, or just having a chat about technology and development. Feel free to reach out!
                </p>
              </div>
              <div className="space-y-6">
                <a href={`mailto:${personalData.personalInfo.email}`} className="flex items-center space-x-4 text-gray-300 hover:text-purple-400 transition-colors duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-sm text-gray-400">{personalData.personalInfo.email}</p>
                  </div>
                </a>
                <a href={`tel:${personalData.personalInfo.phone}`} className="flex items-center space-x-4 text-gray-300 hover:text-purple-400 transition-colors duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-sm text-gray-400">{personalData.personalInfo.phone}</p>
                  </div>
                </a>
              </div>
              <div className="flex space-x-6 pt-8">
                <a href={personalData.personalInfo.linkedin} className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href={personalData.personalInfo.github} className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/25">
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl backdrop-blur-sm border border-slate-700/50">
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-300"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-300"
                  />
                </div>
                <div>
                  <textarea
                    rows="6"
                    placeholder="Your Message"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-300 resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section> */}

       <section id="contact" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <ContactFormSolutions />
        </div>
      </section>

    </div>
  );
};

export default PortfolioLook;






