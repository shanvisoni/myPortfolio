import React, { useState, useEffect } from 'react';
import { ChevronDown, Mail, Phone, Github, Linkedin, ExternalLink, Code, Database, Wrench, Award, MapPin, Calendar, Star, MessageCircle, Users, ShoppingCart, Briefcase, Globe, CheckSquare, BookOpen, Menu, X, Palette, Sparkles, Moon } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme configurations
  const themes = {
    dark: {
      primary: 'from-gray-700 to-gray-900',
      secondary: 'from-gray-300 to-gray-500',
      accent: 'gray-300',
      bg: 'from-gray-900 via-slate-900 to-gray-900',
      name: 'Dark'
    },
    purple: {
      primary: 'from-purple-600 to-pink-600',
      secondary: 'from-purple-400 to-pink-400',
      accent: 'purple-400',
      bg: 'from-slate-900 via-purple-900 to-slate-900',
      name: 'Purple'
    },
    blue: {
      primary: 'from-blue-600 to-cyan-600',
      secondary: 'from-blue-400 to-cyan-400',
      accent: 'blue-400',
      bg: 'from-slate-900 via-blue-900 to-slate-900',
      name: 'Blue'
    },
    green: {
      primary: 'from-green-600 to-teal-600',
      secondary: 'from-green-400 to-teal-400',
      accent: 'green-400',
      bg: 'from-slate-900 via-green-900 to-slate-900',
      name: 'Green'
    },
    orange: {
      primary: 'from-orange-600 to-red-600',
      secondary: 'from-orange-400 to-red-400',
      accent: 'orange-400',
      bg: 'from-slate-900 via-orange-900 to-slate-900',
      name: 'Orange'
    }
  };

  const currentThemeConfig = themes[currentTheme];

  // Helper function to get icon component from string
  const getIconComponent = (iconName) => {
    const icons = {
      Code: Code,
      Database: Database,
      Wrench: Wrench,
      Award: Award,
      Users: Users,
      ShoppingCart: ShoppingCart,
      BookOpen: BookOpen,
      CheckSquare: CheckSquare,
      Briefcase: Briefcase,
      Globe: Globe
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
      },
      teal: {
        bg: 'from-teal-900/30 to-slate-900/30',
        border: 'border-teal-500/20',
        text: 'text-teal-400',
        icon: 'text-teal-400',
        star: 'fill-teal-400 text-teal-400'
      },
      orange: {
        bg: 'from-orange-900/30 to-slate-900/30',
        border: 'border-orange-500/20',
        text: 'text-orange-400',
        icon: 'text-orange-400',
        star: 'fill-orange-400 text-orange-400'
      },
      indigo: {
        bg: 'from-indigo-900/30 to-slate-900/30',
        border: 'border-indigo-500/20',
        text: 'text-indigo-400',
        icon: 'text-indigo-400',
        star: 'fill-indigo-400 text-indigo-400'
      }
    };
    return colorMap[color] || colorMap.purple;
  };

  const ScrollToSection = ({ sectionId, children, className = "", closeMobileMenu = false }) => {
    const handleClick = () => {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
      if (closeMobileMenu) {
        setIsMobileMenuOpen(false);
      }
    };
    return (
      <button onClick={handleClick} className={className}>
        {children}
      </button>
    );
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentThemeConfig.bg} text-white relative overflow-hidden ${currentTheme === 'dark' ? 'dark-theme-active' : ''}`}>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 dynamic-bg opacity-20"></div>
      
      {/* Particle Effects */}
      <div className="particles">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${
        isScrolled ? 'bg-slate-900/90 backdrop-blur-md py-4 shadow-lg shadow-purple-500/10' : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className={`text-2xl font-bold bg-gradient-to-r ${currentThemeConfig.secondary} bg-clip-text text-transparent animate-pulse`}>
            {personalData.personalInfo.name}
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
              <ScrollToSection 
                key={item}
                sectionId={item.toLowerCase()}
                className={`hover:text-${currentThemeConfig.accent} transition-all duration-300 relative group transform hover:scale-110`}
              >
                {item}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${currentThemeConfig.secondary} group-hover:w-full transition-all duration-500`}></span>
              </ScrollToSection>
            ))}
            
            {/* Theme Switcher */}
            <div className="relative group">
              <button className="p-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
                <Palette className="w-5 h-5" />
              </button>
              <div className="absolute right-0 top-full mt-2 bg-slate-800/95 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl">
                <div className="text-center mb-3">
                  <span className="text-sm font-semibold text-gray-300">Choose Theme</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(themes).map((theme) => (
                    <button
                      key={theme}
                      onClick={() => setCurrentTheme(theme)}
                      className={`flex flex-col items-center space-y-2 p-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                        currentTheme === theme 
                          ? 'bg-slate-700/50 ring-2 ring-white/30' 
                          : 'bg-slate-700/30 hover:bg-slate-700/50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${
                        themes[theme].primary
                      } transition-all duration-300 hover:scale-110 flex items-center justify-center`}>
                        {theme === 'dark' && <Moon className="w-4 h-4 text-white" />}
                      </div>
                      <span className="text-xs text-gray-300 font-medium">
                        {themes[theme].name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-md border-t border-slate-700/50 shadow-lg">
            <div className="container mx-auto px-6 py-4 space-y-4">
              {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
                <ScrollToSection 
                  key={item}
                  sectionId={item.toLowerCase()}
                  closeMobileMenu={true}
                  className="block w-full text-left py-3 px-4 rounded-lg hover:bg-purple-900/30 hover:text-purple-400 transition-all duration-300"
                >
                  {item}
                </ScrollToSection>
              ))}
              
              {/* Mobile Theme Switcher */}
              <div className="pt-4 border-t border-slate-700/50">
                <div className="text-sm font-semibold text-gray-300 mb-3">Choose Theme</div>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(themes).map((theme) => (
                    <button
                      key={theme}
                      onClick={() => {
                        setCurrentTheme(theme);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-300 ${
                        currentTheme === theme 
                          ? 'bg-slate-700/50 ring-1 ring-white/30' 
                          : 'bg-slate-700/30 hover:bg-slate-700/50'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${
                        themes[theme].primary
                      } transition-all duration-300 flex items-center justify-center`}>
                        {theme === 'dark' && <Moon className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-xs text-gray-300">
                        {themes[theme].name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
       <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/20 to-slate-900"></div>
        
        {/* Enhanced Animated background shapes */}
        <div className="absolute inset-0">
          <div className={`absolute top-20 left-20 w-72 h-72 bg-${currentThemeConfig.accent}/10 rounded-full blur-3xl morphing-shape animate-pulse`}></div>
          <div className={`absolute bottom-20 right-20 w-96 h-96 bg-${currentThemeConfig.accent}/10 rounded-full blur-3xl morphing-shape animate-pulse`} style={{animationDelay: '2s'}}></div>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-${currentThemeConfig.accent}/10 rounded-full blur-3xl morphing-shape animate-pulse`} style={{animationDelay: '4s'}}></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-purple-400/30 rotate-45 animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-pink-400/30 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-400/30 rotate-45 animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="text-center z-10 px-6 animate-fadeInUp">
          <div className="mb-8 relative group">
            {/* Profile Image Container with enhanced animations */}
            <div className="w-56 h-56 mx-auto relative">
              {/* Outer rotating ring */}
              <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${currentThemeConfig.primary} animate-spin-slow p-1 opacity-80 glow-effect`}>
                <div className="w-full h-full rounded-full bg-slate-900"></div>
              </div>
              
              {/* Main profile container */}
              <div className={`absolute inset-2 rounded-full bg-gradient-to-r ${currentThemeConfig.primary} p-1 group-hover:scale-105 transition-transform duration-500 interactive-card`}>
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
                  <div className={`absolute inset-0 flex items-center justify-center text-6xl font-bold bg-gradient-to-r ${currentThemeConfig.secondary} bg-clip-text text-transparent`} style={{display: 'none'}}>
                    {personalData.personalInfo.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
              </div>
              
              {/* Enhanced floating elements around profile */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce flex items-center justify-center glow-effect">
                <Code className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-bounce delay-300 flex items-center justify-center glow-effect">
                <Database className="w-4 h-4 text-white" />
              </div>
              <div className="absolute top-8 -left-8 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse morphing-shape"></div>
              <div className="absolute bottom-8 -right-8 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse delay-500 morphing-shape"></div>
              
              {/* Sparkle effects */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-yellow-300 rounded-full animate-ping"></div>
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-300 rounded-full animate-ping delay-1000"></div>
            </div>
          </div>
          
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r ${currentThemeConfig.secondary} bg-clip-text text-transparent animate-textShimmer`}>
            {personalData.personalInfo.name}
          </h1>
          <p className={`text-xl md:text-2xl mb-8 text-${currentThemeConfig.accent} animate-fadeInUp delay-300`}>{personalData.personalInfo.title}</p>
          <p className="text-lg mb-12 max-w-2xl mx-auto text-gray-300 leading-relaxed animate-fadeInUp delay-500">
            {personalData.personalInfo.tagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fadeInUp delay-700">
            <ScrollToSection 
              sectionId="projects"
              className={`px-8 py-4 bg-gradient-to-r ${currentThemeConfig.primary} rounded-full hover:scale-110 hover:-translate-y-2 shadow-lg hover:shadow-purple-500/50 relative overflow-hidden group btn-magic wave-effect`}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>View My Work</span>
              </span>
            </ScrollToSection>
            <ScrollToSection 
              sectionId="contact"
              className={`px-8 py-4 border-2 border-${currentThemeConfig.accent} rounded-full hover:bg-${currentThemeConfig.accent} hover:text-slate-900 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 hover:shadow-lg hover:shadow-purple-400/50 interactive-card`}
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
        <div className="container mx-auto max-w-6xl">
          <h2 className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r ${currentThemeConfig.secondary} bg-clip-text text-transparent animate-fadeInUp`}>
            About Me
          </h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fadeInLeft">
              <div className="space-y-6">
                <p className="text-xl text-gray-300 leading-relaxed">
                  Hello! I'm <span className="text-purple-400 font-semibold">Shanvi Soni</span>, a passionate and driven Computer Science student at SAGE University, Bhopal, with a deep love for creating innovative web solutions.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Currently maintaining a CGPA of <span className="text-purple-400 font-semibold">8.38</span>, I combine academic excellence with hands-on industry experience. My journey in technology began with curiosity and has evolved into a passion for building meaningful applications that solve real-world problems.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  I specialize in the <span className="text-purple-400 font-semibold">MERN stack</span> and have experience working with modern technologies including React.js, Node.js, PostgreSQL, and AI APIs. My approach to development is user-centric, always focusing on creating intuitive and scalable solutions.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="bg-gradient-to-br from-purple-900/20 to-slate-900/20 p-6 rounded-xl backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-3">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <span className="text-purple-400 font-semibold">Location</span>
                  </div>
                  <p className="text-gray-300">{personalData.personalInfo.location}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-900/20 to-slate-900/20 p-6 rounded-xl backdrop-blur-sm border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-3">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    <span className="text-blue-400 font-semibold">Graduation</span>
                  </div>
                  <p className="text-gray-300">{personalData.education.expectedGraduation}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-8 animate-fadeInRight">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 transition-all duration-500">
                <h3 className="text-2xl font-bold mb-6 text-purple-400">What I Do</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Full-Stack Development</h4>
                      <p className="text-gray-400">Building end-to-end web applications with modern technologies and best practices.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Problem Solving</h4>
                      <p className="text-gray-400">Solving complex challenges with 400+ LeetCode problems and strong algorithmic thinking.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Continuous Learning</h4>
                      <p className="text-gray-400">Always exploring new technologies and staying updated with industry trends.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 p-6 rounded-xl backdrop-blur-sm border border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-300">
                <h4 className="text-lg font-semibold text-indigo-400 mb-4">Fun Facts</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    <span>Love building projects that make a difference</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    <span>Passionate about clean code and user experience</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    <span>Always excited to learn new technologies</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="py-24 px-6 bg-slate-900/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-fadeInUp">
            Work Experience
          </h2>
          <div className="space-y-8">
            {/* Current Role */}
            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-8 rounded-2xl backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:transform hover:scale-105">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{personalData.currentRole.position}</h3>
                    <p className="text-purple-300 text-lg">{personalData.currentRole.company}</p>
                    <p className="text-gray-400">{personalData.currentRole.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-purple-400 font-semibold">{personalData.currentRole.startDate} - {personalData.currentRole.endDate}</p>
                  <span className="inline-block px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm mt-2">
                    Current
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-purple-400 mb-3">Key Responsibilities:</h4>
                <ul className="space-y-2">
                  {personalData.currentRole.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start space-x-3 text-gray-300 hover:text-white transition-colors duration-300">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Previous Roles */}
            {personalData.previousRoles && personalData.previousRoles.map((role, roleIndex) => {
              const gradients = [
                { bg: "from-blue-900/20 to-cyan-900/20", border: "border-blue-500/20 hover:border-blue-400/40", icon: "from-blue-500 to-cyan-500", text: "text-blue-300", date: "text-blue-400", badge: "bg-blue-900/30 text-blue-400", title: "text-blue-400", bullet: "bg-blue-400" },
                { bg: "from-indigo-900/20 to-purple-900/20", border: "border-indigo-500/20 hover:border-indigo-400/40", icon: "from-indigo-500 to-purple-500", text: "text-indigo-300", date: "text-indigo-400", badge: "bg-indigo-900/30 text-indigo-400", title: "text-indigo-400", bullet: "bg-indigo-400" }
              ];
              const gradient = gradients[roleIndex % gradients.length];
              
              return (
                <div key={roleIndex} className={`bg-gradient-to-r ${gradient.bg} p-8 rounded-2xl backdrop-blur-sm border ${gradient.border} transition-all duration-500 hover:transform hover:scale-105`}>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${gradient.icon} rounded-2xl flex items-center justify-center`}>
                        <Code className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{role.position}</h3>
                        <p className={`${gradient.text} text-lg`}>{role.company}</p>
                        <p className="text-gray-400">{role.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`${gradient.date} font-semibold`}>{role.startDate} - {role.endDate}</p>
                      <span className={`inline-block px-3 py-1 ${gradient.badge} rounded-full text-sm mt-2`}>
                        Completed
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className={`text-lg font-semibold ${gradient.title} mb-3`}>Key Responsibilities:</h4>
                    <ul className="space-y-2">
                      {role.responsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-start space-x-3 text-gray-300 hover:text-white transition-colors duration-300">
                          <div className={`w-2 h-2 ${gradient.bullet} rounded-full mt-2 flex-shrink-0`}></div>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
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
                      <div key={index} className="flex items-center">
                        <div className={`w-2 h-2 ${colors.bullet} rounded-full mr-3 flex-shrink-0`}></div>
                        <span className="text-gray-300 hover:text-white transition-colors duration-300">{skill.name}</span>
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
          <div className="grid md:grid-cols-2 gap-6">
            {achievementsData.achievements.map((achievement) => (
              <div key={achievement.id} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-2xl backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors duration-300">{achievement.title}</h3>
                      <p className="text-sm text-purple-400">{achievement.organization}</p>
                    </div>
                  </div>
                  <div className="text-purple-400 font-bold text-lg">
                    {achievement.year}
                  </div>
                </div>
                <p className="text-gray-400 mb-4 leading-relaxed">{achievement.description}</p>
                <div className="flex gap-2 mb-4">
                  <span className="text-xs bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full">
                    {achievement.type}
                  </span>
                  <span className="text-xs bg-slate-700/50 text-gray-300 px-3 py-1 rounded-full">
                    {achievement.category}
                  </span>
                </div>
                {achievement.link && (
                  <a 
                    href={achievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors duration-300 group"
                  >
                    <span className="text-sm">View Profile</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                )}
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

      {/* Footer */}
      <footer className="bg-slate-900/80 backdrop-blur-sm border-t border-slate-700/50 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center space-y-6">
            {/* Social Links */}
            <div className="flex justify-center space-x-6">
              <a 
                href={personalData.personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 group"
                title="LinkedIn"
              >
                <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a 
                href={personalData.personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/25 group"
                title="GitHub"
              >
                <Github className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a 
                href={personalData.personalInfo.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/25 group"
                title="LeetCode"
              >
                <Code className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a 
                href={`mailto:${personalData.personalInfo.email}`}
                className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 group"
                title="Email"
              >
                <Mail className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
            
            {/* Copyright */}
            <p className="text-sm text-gray-500 text-center">
              © 2025 {personalData.personalInfo.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default PortfolioLook;






