import React, { useRef, useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Code2,
  Database,
  Smartphone,
  Cloud,
  GitBranch,
  Cpu,
  Layers,
  Server,
  Box,
  Wrench,
  Bot,
  Linkedin,
  Github,
  Mail,
  GraduationCap,
  MapPin,
  Calendar,
  ExternalLink,
  Trophy,
  ArrowUp,
} from 'lucide-react';

// Particle Background Component
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    }> = [];

    const colors = ['#00f5ff', '#8b5cf6', '#e879f9', '#06b6d4'];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = 0.6;
        ctx.fill();

        // Draw connections
        particles.slice(index + 1).forEach((otherParticle) => {
          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) +
              Math.pow(particle.y - otherParticle.y, 2)
          );

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = 0.1;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background:
          'radial-gradient(ellipse at center, #1a0b2e 0%, #16213e 50%, #0f3460 100%)',
      }}
    />
  );
};

// Typewriter Effect Component
const TypewriterText = ({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse text-cyan-400">|</span>
    </span>
  );
};

// Navigation Component
const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
  };

  return (
    <motion.nav
      style={{ opacity: navOpacity }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-black/20 backdrop-blur-md rounded-full px-6 py-3 border border-cyan-500/30"
    >
      <div className="flex space-x-6">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              activeSection === item.id
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/30'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </motion.nav>
  );
};

// Hero Section
const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <motion.section
      id="hero"
      style={{ y }}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" // increased padding-top
    >
      {/* Profile Image */}
      <motion.img
        src="/dp.jpg" // <-- replace with your actual image path
        alt="Aniruddha Biswas Atanu"
        className="w-40 h-40 rounded-full border-4 border-cyan-500 shadow-lg mb-6 object-cover"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      />

      <div className="text-center z-10 max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
            ANIRUDDHA BISWAS ATANU
          </h1>
          <div className="text-2xl md:text-4xl text-gray-300 font-light">
            <TypewriterText
              text="Backend Engineer & AI Innovator"
              className="text-white"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-40"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105">
            View My Work
          </button>
          <button className="px-8 py-4 border-2 border-cyan-500 rounded-full text-cyan-400 font-semibold hover:bg-cyan-500 hover:text-white transition-all duration-300 transform hover:scale-105">
            Get In Touch
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
};

// About Section
const AboutSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const skillCategories = [
    {
      category: 'Languages',
      skills: 'Java, Python, C++, C, JavaScript, SQL',
    },
    {
      category: 'Backend',
      skills: 'Spring Boot, Microservices, PostgreSQL, MongoDB, Redis, Kafka, RabbitMQ, OpenFeign, Resilience4J, Maven',
    },
    {
      category: 'DevOps & Cloud',
      skills: 'Docker, AWS/GCP, GitHub Actions, Git',
    },
    {
      category: 'Frontend',
      skills: 'React, TailwindCSS, Android',
    },
  ];

  return (
    <section id="about" className="min-h-screen py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-6">
            About Me
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Code is my canvas, problem-solving is my obsession—I engineer
            solutions that aim to tackle the world’s biggest challenges.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/20"
          >
            <div className="flex items-center mb-6">
              <GraduationCap className="w-8 h-8 text-cyan-400 mr-4" />
              <h3 className="text-2xl font-semibold text-white">Education</h3>
            </div>
            <p className="text-gray-300 mb-4">
              <strong className="text-cyan-400">Truman State University</strong>
              <br />
              Bachelor of Science in Computer Science
              <br />
              GPA: 4.0/4.0
            </p>
            <div className="flex items-center text-gray-400">
              <MapPin className="w-4 h-4 mr-2" />
              <span>Kirksville, Missouri</span>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-white mb-3">
                Relevant Coursework
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {[
                  'OOP & Design',
                  'Data Structures & Algorithm',
                  'Systems Programming (Linux)',
                  'Database Systems',
                  'Computer Architecture & Organization',
                  'Embedded System',
                  'Software Engineering',
                  'Artificial Intelligence',
                ].map((course, index) => (
                  <motion.div
                    key={course}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="flex items-center text-gray-300"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mr-2 flex-shrink-0"></div>
                    <span className="text-xs leading-tight">{course}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">
              Technical Skills
            </h3>
            <div className="space-y-4">
              {skillCategories.map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="p-4 bg-white/5 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
                >
                  <h4 className="text-cyan-400 font-semibold mb-2">
                    {category.category}:
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {category.skills}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Experience Section
const ExperienceSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'LNA Bikes',
      period: 'July 2025 – October 2025',
      description:
        'Architected and built the full stack and deployed it on AWS EKS for scalable production use.',
      skills: ['Node', 'React', 'MongoDB', 'AWS'],
      color: 'cyan',
    },
    {
      title: 'Backend Engineer',
      company: 'Kababesh Grill',
      period: 'July 2025 – October 2025',
      description:
        'Built comprehensive online food ordering platform with real-time order tracking and payment integration.',
      skills: ['Java', 'Spring Boot', 'MySQL', 'Docker'],
      color: 'purple',
    },
    {
      title: 'Research Assistant',
      company: 'Truman State University',
      period: 'June 2024 – August 2024',
      description:
        'Developing interactive exergame with gesture detection using computer vision and machine learning algorithms.',
      skills: ['Python', 'OpenCV', 'TensorFlow', 'Computer Vision'],
      color: 'pink',
    },
  ];

  return (
    <section id="experience" className="min-h-screen py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-6">
            Experience
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 h-full rounded-full"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative mb-12 ${
                index % 2 === 0 ? 'pr-1/2' : 'pl-1/2 ml-auto'
              }`}
            >
              <div
                className={`absolute top-6 w-4 h-4 bg-${
                  exp.color
                }-500 rounded-full border-4 border-gray-900 ${
                  index % 2 === 0 ? 'right-[-2.5rem]' : 'left-[-2.5rem]'
                }`}
              ></div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <Calendar className="w-5 h-5 text-cyan-400 mr-2" />
                  <span className="text-cyan-400 font-semibold">
                    {exp.period}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {exp.title}
                </h3>
                <h4 className="text-xl text-purple-400 mb-4">{exp.company}</h4>
                <p className="text-gray-300 mb-6">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full text-cyan-300 text-sm border border-cyan-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Section
const ProjectsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const projects = [
    {
      title: 'GreenPulse',
      description:
        'AI-powered agriculture monitoring system with real-time crop health analysis and predictive farming insights.',
      image:
        'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg',
      tech: ['Android','Java', 'TensorFlow', 'Gemini Api', 'k8s','Docker'],
      github: 'https://github.com/SteveRogersBD/Truhacks25',
      demo: '#',
    },
    {
      title: 'Atomica',
      description:
        'Interactive chemistry learning platform featuring 3D periodic table visualization and molecular modeling.',
      image:
        'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg',
      tech: ['Java', 'Android', 'SpringBoot', 'PostGreSQL','K8s','Docker'],
      github: 'https://github.com/SteveRogersBD/AtomicaApp',
      demo: '#',
    },
    {
      title: 'The Third Eye',
      description:
        'AI-based home security system with facial recognition, object detection, and real-time threat assessment.',
      image: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg',
      tech: ['Python', 'OpenCV', 'Deep Learning', 'Raspberry Pi'],
      github: 'https://github.com/SteveRogersBD/PickHacks2024',
      demo: '#',
    },
  ];

  return (
    <section id="projects" className="min-h-screen py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-6">
            Featured Projects
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group perspective-1000"
            >
              <div className="relative bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/30 transition-all duration-500 transform hover:scale-105 hover:rotate-y-12">
                <div
                  className="h-48 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${project.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full text-cyan-300 text-xs border border-cyan-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-3">
                    <a
                      href={project.github}
                      className="flex items-center px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white text-sm transition-colors duration-300"
                    >
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      className="flex items-center px-3 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-lg text-white text-sm transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Achievements Section
const AchievementsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const achievements = [
    {
      title: 'TigerHacks',
      position: 'Third Prize',
      year: '2025',
      description: 'Third place winner at University of Missouri hackathon',
    },
    {
      title: 'Build for Everyone with Gemini',
      position: 'Champion',
      year: '2024',
      description:
        "First place in Build for Everyone with Gemini-focused competition",
    },
    {
      title: 'Truhack 2024',
      position: 'Champion',
      year: '2024',
      description: "Winner of Truman State University's premier hackathon",
    },
    {
      title: 'TigerHacks',
      position: 'Most Voted Project',
      year: '2024',
      description: 'Community favorite at University of Missouri hackathon',
    },
    {
      title: 'PickHacks',
      position: 'Most Voted Project',
      year: '2024',
      description: 'Top community choice at Missouri S&T hackathon',
    },
  ];

  return (
    <section
      id="achievements"
      className="min-h-screen py-20 px-4 relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-6">
            Achievements
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Trophy className="w-12 h-12 text-yellow-400 mr-4" />
                </motion.div>
                <div>
                  <span className="text-yellow-400 text-sm font-medium">
                    {achievement.year}
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {achievement.position}
                  </h3>
                </div>
              </div>
              <h4 className="text-2xl font-semibold text-cyan-400 mb-3">
                {achievement.title}
              </h4>
              <p className="text-gray-300">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Email.js implementation would go here
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300">
            Ready to collaborate or discuss opportunities? Let's connect!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.form
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-cyan-400 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors duration-300"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-cyan-400 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors duration-300"
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-cyan-400 font-medium mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors duration-300 resize-none"
                placeholder="Tell me about your project or just say hello!"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105"
            >
              Send Message
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Let's Connect
            </h3>
            <p className="text-gray-300 mb-8">
              I'm always interested in new opportunities, collaborations, and
              innovative projects. Whether you have a question about my work or
              want to discuss a potential partnership, don't hesitate to reach
              out!
            </p>

            <div className="space-y-6">
              <a
                href="mailto:cd43641@truman.edu"
                className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 group"
              >
                <Mail className="w-6 h-6 text-cyan-400 mr-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-white">Email</span>
              </a>

              <a
                href="https://github.com/SteveRogersBD"
                className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 group"
              >
                <Github className="w-6 h-6 text-cyan-400 mr-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-white">Github</span>
              </a>

              <a
                href="https://www.linkedin.com/in/aniruddha-biswas-atanu-16b708228"
                className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 group"
              >
                <Linkedin className="w-6 h-6 text-cyan-400 mr-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-white">
                  LinkedIn
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Back to Top Button
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsVisible(latest > 1000);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-110 z-50"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// Main App Component
function App() {
  return (
    <div className="bg-gray-900 text-white overflow-x-hidden">
      <ParticleBackground />
      <Navigation />
      <div className="h-20 md:h-24" />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <AchievementsSection />
      <ContactSection />
      <BackToTopButton />
    </div>
  );
}

export default App;
