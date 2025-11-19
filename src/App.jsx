import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  FileText, 
  MapPin, 
  ExternalLink, 
  Code, 
  Database, 
  Cloud, 
  Cpu, 
  BookOpen,
  Terminal,
  Award,
  Briefcase,
  GraduationCap,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

// --- Components ---

const Section = ({ id, title, icon: Icon, children, className = "" }) => (
  <section id={id} className={`py-16 md:py-24 px-4 md:px-8 max-w-6xl mx-auto ${className}`}>
    <div className="flex items-center gap-3 mb-10">
      {Icon && <Icon className="w-8 h-8 text-blue-500" />}
      <h2 className="text-3xl md:text-4xl font-bold text-slate-100">{title}</h2>
      <div className="h-1 bg-blue-500 flex-grow ml-4 rounded-full opacity-20"></div>
    </div>
    {children}
  </section>
);

const Card = ({ title, subtitle, date, children, tags = [] }) => (
  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 group">
    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
      <div>
        <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">{title}</h3>
        {subtitle && <div className="text-blue-400 font-medium">{subtitle}</div>}
      </div>
      {date && <div className="text-sm text-slate-400 font-mono bg-slate-900/50 px-3 py-1 rounded-full whitespace-nowrap">{date}</div>}
    </div>
    <div className="text-slate-300 leading-relaxed mb-4">
      {children}
    </div>
    {tags.length > 0 && (
      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag, i) => (
          <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20">
            {tag}
          </span>
        ))}
      </div>
    )}
  </div>
);

const SkillCategory = ({ title, skills, icon: Icon }) => (
  <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50 hover:border-slate-600 transition-colors">
    <div className="flex items-center gap-3 mb-4 text-blue-400">
      <Icon className="w-6 h-6" />
      <h3 className="font-bold text-lg">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span key={index} className="bg-slate-900 text-slate-300 px-3 py-1.5 rounded text-sm border border-slate-800 hover:border-blue-500/30 hover:text-blue-200 transition-colors cursor-default">
          {skill}
        </span>
      ))}
    </div>
  </div>
);

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Smooth scrolling
  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'education'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
  ];

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-blue-500/30 selection:text-blue-100">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="text-xl font-bold text-blue-500 cursor-pointer flex items-center gap-2" 
              onClick={() => scrollToSection('home')}
            >
              <Terminal className="w-6 h-6" />
              <span>AS</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === link.id ? 'text-blue-400' : 'text-slate-400 hover:text-slate-100'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Mobile Nav Toggle */}
            <button 
              className="md:hidden text-slate-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`block w-full text-left py-2 px-4 rounded-lg ${
                  activeSection === link.id ? 'bg-blue-500/10 text-blue-400' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 md:px-8 max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 min-h-screen md:min-h-[80vh]">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Available for Full-time Roles
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
            Adwaith <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Santhosh</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl">
            Machine Learning Engineer & Data Scientist specializing in RAG Architectures, LLMs, and Agentic AI Systems.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a href="mailto:adwaithsanthosh1@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/25">
              <Mail size={20} />
              Contact Me
            </a>
            <a href="https://www.linkedin.com/in/adwaith-s-928a241a2/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-slate-200 rounded-lg font-medium hover:bg-slate-700 transition-all border border-slate-700">
              <Linkedin size={20} />
              LinkedIn
            </a>
            <button onClick={() => alert("Resume would be downloaded here in a real deployment")} className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-slate-200 rounded-lg font-medium hover:bg-slate-700 transition-all border border-slate-700">
              <FileText size={20} />
              Resume
            </button>
          </div>

          <div className="flex items-center gap-4 text-slate-500 pt-8 text-sm">
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              College Park, MD
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-600"></div>
            <div>+1 240-476-4046</div>
          </div>
        </div>

        {/* Abstract visual decoration instead of photo for privacy/aesthetic */}
        <div className="flex-1 flex justify-center relative">
           <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl opacity-30"></div>
           <div className="relative bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl max-w-sm w-full rotate-3 hover:rotate-0 transition-all duration-500">
              <div className="space-y-4 font-mono text-sm">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-blue-400">class MLEngineer:</div>
                <div className="pl-4 text-slate-300">
                  def __init__(self):<br/>
                  &nbsp;&nbsp;self.degree = "MS Data Science"<br/>
                  &nbsp;&nbsp;self.gpa = 4.0<br/>
                  &nbsp;&nbsp;self.skills = ["NLP", "RAG", "AWS"]
                </div>
                <div className="pl-4 text-slate-300">
                  def solve_problem(self, data):<br/>
                  &nbsp;&nbsp;return AI.optimize(data)
                </div>
                <div className="text-slate-500 text-xs pt-4 border-t border-slate-800">
                  {'>'} Initializing Adwaith_Santhosh... <span className="animate-pulse">_</span>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* About Section */}
      <Section id="about" title="About Me" icon={BookOpen} className="bg-slate-900/30">
        <div className="prose prose-lg prose-invert text-slate-300 max-w-none">
          <p>
            I am a graduate student at the <strong>University of Maryland, College Park</strong> pursuing an M.S. in Data Science with a 
            perfect <strong>4.0 GPA</strong>. My expertise lies at the intersection of Machine Learning, Generative AI, and scalable cloud architecture.
          </p>
          <p>
            Currently, I work on developing Agentic Multimodal Conversation systems and researching bot analysis models for public health. 
            My professional background includes impactful roles at <strong>CertbuddyAI</strong>, <strong>GOML</strong>, and <strong>TCS</strong>, 
            where I've engineered RAG pipelines, optimized recommender systems, and reduced model latency significantly.
          </p>
          <p>
            I am passionate about building AI systems that are not just accurate but also efficient and deployable in real-world scenarios.
          </p>
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience" title="Work Experience" icon={Briefcase}>
        <div className="space-y-8">
          <Card 
            title="Machine Learning Engineer Intern" 
            subtitle="CertbuddyAI Inc | Dallas, TX" 
            date="June 2025 - Present"
            tags={['Agentic AI', 'RAG', 'OpenSearch', 'Multimodal']}
          >
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li>Developed an <strong>Agentic AI system</strong> with probabilistic and deterministic pipelines, enabling dynamic reasoning and fact-checked responses.</li>
              <li>Built an <strong>OpenSearch vector DB based RAG engine</strong> with dynamic data partitions and S3 integration for indexing/retrieving images, tables, and content.</li>
            </ul>
          </Card>

          <Card 
            title="Graduate Research Assistant" 
            subtitle="University of Maryland | College Park, MD" 
            date="Oct 2024 - Present"
            tags={['GNN', 'Bot Analysis', 'Public Health', 'Multimodal ML']}
          >
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li>Leveraged a <strong>GNN-based model</strong> to predict bot vs. human activity on Twitter for public health analysis.</li>
              <li>Developed a multimodal framework integrating text and image analysis for sentiment and hate-speech classification in social media memes.</li>
            </ul>
          </Card>

          <Card 
            title="Machine Learning Engineer" 
            subtitle="GOML (AWS GenAI Partner) | Coimbatore, India" 
            date="Feb 2024 - Aug 2024"
            tags={['AWS Bedrock', 'Claude 3.5', 'QdrantDB', 'FastAPI']}
          >
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li>Developed a RAG-based chatbot retrieving data from S3 using QdrantDB and Claude 3.5 Sonnet, achieving <strong>95% accuracy</strong> and reducing retrieval time by 40%.</li>
              <li>Designed system architecture using AWS (RDS, Lambda, ECR, EC2) reducing latency by 35%.</li>
            </ul>
          </Card>

          <Card 
            title="Machine Learning Engineer" 
            subtitle="Tata Consultancy Services | Chennai, India" 
            date="July 2021 - Sep 2023"
            tags={['Azure ML', 'Recommender Systems', 'LightFM']}
          >
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li>Deployed a Deep Learning session-based recommender in Azure ML, achieving <strong>&lt;10 ms latency</strong>.</li>
              <li>Optimized hybrid recommendation models for a US retailer, reducing runtime from 7 hours to 2.5 hours (65% improvement).</li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" title="Key Projects" icon={Code} className="bg-slate-900/30">
        <div className="grid md:grid-cols-2 gap-6">
          <Card 
            title="Breast Cancer Prediction" 
            subtitle="Machine Learning Analysis"
            tags={['Random Forest', 'SVM', 'Logistic Regression', 'Healthcare']}
          >
            Developed and evaluated ML models to predict patient survival using clinical data from 1,900+ cases, achieving <strong>85% accuracy</strong>. focused on feature importance and clinical attribute analysis.
          </Card>

          <Card 
            title="Optimized k-NN on MNIST" 
            subtitle="Algorithm Optimization"
            tags={['Python', 'Computer Vision', 'Optimization']}
          >
            Optimized k-NN algorithm on the MNIST dataset (6 classes) to achieve <strong>~99.7% accuracy</strong> with <strong>21x faster inference</strong> speeds through smart sample selection and metric tuning techniques.
          </Card>

           <Card 
            title="AI RAG Chatbot for Food Security" 
            subtitle="Hackathon Winner - CAFB"
            tags={['RAG', 'AWS', 'GenAI', 'Social Good']}
          >
            Built and deployed an AI RAG chatbot on AWS capable of creating and ingesting documents to assist with food security logistics. Winner of the CAFB Food Security Hackathon.
          </Card>
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" title="Technical Skills" icon={Cpu}>
        <div className="grid md:grid-cols-2 gap-6">
          <SkillCategory 
            title="Programming & Languages" 
            icon={Code}
            skills={['Python (Advanced)', 'Java', 'C/C++', 'C#', 'JavaScript', 'SQL', 'NoSQL']}
          />
          <SkillCategory 
            title="Machine Learning & AI" 
            icon={Cpu}
            skills={['Deep Learning', 'NLP', 'LLMs (LangChain, Hugging Face)', 'Computer Vision', 'RAG', 'GNN', 'Reinforcement Learning', 'Scikit-learn', 'PyTorch', 'TensorFlow']}
          />
          <SkillCategory 
            title="Cloud & DevOps" 
            icon={Cloud}
            skills={['AWS (EC2, S3, Lambda, Bedrock)', 'Azure ML', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD Pipelines', 'MLflow']}
          />
          <SkillCategory 
            title="Data & Tools" 
            icon={Database}
            skills={['PostgreSQL', 'MongoDB', 'Pinecone', 'Qdrant', 'OpenSearch', 'Spark (PySpark)', 'Pandas', 'FastAPI', 'Flask', 'Tableau']}
          />
        </div>
      </Section>

      {/* Education & Research */}
      <Section id="education" title="Education & Research" icon={GraduationCap} className="bg-slate-900/30">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Award className="text-blue-500" size={20} />
              Education
            </h3>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-bold text-blue-400">University of Maryland</h4>
                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">2024 - 2026</span>
              </div>
              <p className="text-slate-300 font-medium">Master of Science, Data Science</p>
              <p className="text-slate-400 text-sm mt-1">College Park, MD</p>
              <div className="mt-4">
                <div className="text-sm text-slate-300 mb-1"><strong>GPA:</strong> 4.0 (Top 5 percentile)</div>
                <div className="text-sm text-slate-400">
                  <strong>Coursework:</strong> Adv. ML, Deep Learning, NLP, Big Data Analytics, Probability & Statistics
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="text-blue-500" size={20} />
              Publications
            </h3>
            <div className="space-y-4">
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-blue-500/40 transition-colors">
                <p className="font-medium text-slate-200 text-sm leading-relaxed">
                  "A Decade of Discourse: Exploring Sentiments and Trends around Immigration on Social Media (2014-2024)."
                </p>
                <p className="text-xs text-slate-500 mt-2 italic">Big Data & Society</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-blue-500/40 transition-colors">
                <p className="font-medium text-slate-200 text-sm leading-relaxed">
                  "Developing an AI-powered Question-and-Answer Chatbot with English-Spanish Capabilities for New Mothers."
                </p>
                <p className="text-xs text-slate-500 mt-2 italic">Big Data & Society</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-200 mb-6">Let's Work Together</h2>
          <div className="flex justify-center gap-6 mb-8">
            <a href="mailto:adwaithsanthosh1@gmail.com" className="text-slate-400 hover:text-blue-400 transition-colors">
              <Mail size={24} />
            </a>
            <a href="https://www.linkedin.com/in/adwaith-s-928a241a2/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">
              <Linkedin size={24} />
            </a>
          </div>
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Adwaith Santhosh. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}