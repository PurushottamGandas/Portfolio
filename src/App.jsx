import {
  ArrowRight,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Database,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Layers3,
  Mail,
  Menu,
  Moon,
  Rocket,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Sun,
  TestTube2,
  Wrench,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { portfolio } from "./data/portfolioData";
import logo from "./assets/logo-black-background.png";

const iconMap = {
  ai: BrainCircuit,
  automation: Bot,
  backend: ServerCog,
  briefcase: BriefcaseBusiness,
  code: Code2,
  database: Database,
  devops: Wrench,
  layers: Layers3,
  mail: Mail,
  rocket: Rocket,
  shield: ShieldCheck,
  testing: TestTube2,
};

function Section({ id, eyebrow, title, intro, children, className = "" }) {
  return (
    <section id={id} className={`scroll-mt-24 px-5 py-20 sm:px-8 ${className}`}>
      <motion.div
        className="mx-auto max-w-6xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-cyan">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-bold text-heading sm:text-4xl">{title}</h2>
          {intro ? <p className="mt-4 text-base leading-8 text-copy">{intro}</p> : null}
        </div>
        {children}
      </motion.div>
    </section>
  );
}

function GlassCard({ children, className = "" }) {
  return (
    <motion.div
      className={`premium-card rounded-2xl border border-line/[0.12] bg-card/[0.92] p-6 shadow-card backdrop-blur-xl transition duration-300 hover:border-cyan/40 ${className}`}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}

function useTheme() {
  const getInitialTheme = () => {
    if (typeof window === "undefined") {
      return { theme: "dark", saved: false };
    }

    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      return { theme: savedTheme, saved: true };
    }

    return {
      theme: window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark",
      saved: false,
    };
  };

  const [themeState, setThemeState] = useState(getInitialTheme);
  const { theme, saved } = themeState;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (saved) {
      return undefined;
    }

    const media = window.matchMedia("(prefers-color-scheme: light)");
    const updateTheme = (event) => {
      setThemeState({ theme: event.matches ? "light" : "dark", saved: false });
    };

    media.addEventListener("change", updateTheme);
    return () => media.removeEventListener("change", updateTheme);
  }, [saved]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    window.localStorage.setItem("portfolio-theme", nextTheme);
    setThemeState({ theme: nextTheme, saved: true });
  };

  return [theme, toggleTheme];
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const links = portfolio.navLinks;
  const isLight = theme === "light";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/[0.10] bg-ink/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="flex items-center gap-3 font-semibold text-heading">
          <img
            src={logo}
            alt="Purushottam Gandas logo"
            className="h-10 w-10 rounded-xl border border-line/[0.10] bg-ink object-cover shadow-sm"
          />
          <span className="hidden sm:inline">Purushottam Gandas</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded-full border border-line/[0.12] bg-surface/[0.90] text-heading shadow-sm transition hover:border-cyan/50 hover:text-cyan"
          >
            {isLight ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <a href="#contact" className="rounded-full bg-heading px-5 py-2 text-sm font-semibold text-ink transition hover:bg-cyan">
            Discuss Opportunities
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-line/[0.10] text-heading md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-line/[0.10] bg-ink px-5 py-5 md:hidden">
          <div className="mx-auto grid max-w-6xl gap-4">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="nav-link">
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center gap-3 rounded-xl border border-line/[0.12] bg-surface/[0.90] px-4 py-3 text-sm font-semibold text-heading"
            >
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
              {isLight ? "Dark theme" : "Light theme"}
            </button>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-xl bg-heading px-4 py-3 text-sm font-semibold text-ink"
            >
              Discuss Opportunities
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden px-5 pb-20 pt-32 sm:px-8 lg:pt-36">
      <div className="absolute inset-0 -z-10 bg-mesh" />
      <div className="ambient-grid absolute inset-0 -z-10" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-2 text-sm font-medium text-cyan shadow-glow">
            <Sparkles size={16} />
            {portfolio.hero.badge}
          </div>
          <h1 className="max-w-4xl text-4xl font-black leading-tight text-heading sm:text-6xl lg:text-7xl">
            {portfolio.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-copy sm:text-xl">
            {portfolio.hero.description}
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#projects" className="btn-primary">
              View Projects <ArrowRight size={18} />
            </a>
            <a href={portfolio.resumeUrl} className="btn-secondary" download>
              Download Resume <Download size={18} />
            </a>
            <a href="#contact" className="btn-ghost">
              Contact Me <Mail size={18} />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="rounded-[2rem] border border-line/[0.10] bg-panel/70 p-5 shadow-glow backdrop-blur-xl">
            <div className="rounded-3xl border border-line/[0.10] bg-ink/80 p-5">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-coral" />
                <span className="h-3 w-3 rounded-full bg-gold" />
                <span className="h-3 w-3 rounded-full bg-mint" />
              </div>
              <div className="space-y-4 font-mono text-sm text-copy">
                <p><span className="text-cyan">const</span> developer = "Purushottam Gandas";</p>
                <p><span className="text-cyan">focus</span>: ["AI Automation", "Full Stack", "Support Systems"]</p>
                <p><span className="text-cyan">builds</span>: workflowRouting + OCR + dashboards;</p>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {portfolio.hero.stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-line/[0.12] bg-surface/[0.90] p-4">
                    <p className="text-2xl font-bold text-heading">{stat.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" eyebrow="About Me" title={portfolio.about.title} intro={portfolio.about.intro}>
      <div className="grid gap-5 md:grid-cols-3">
        {portfolio.about.highlights.map((item) => (
          <GlassCard key={item}>
            <CheckCircle2 className="mb-4 text-mint" />
            <p className="leading-7 text-copy">{item}</p>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Technology Stack" intro="A practical toolkit for shipping production web apps, automation systems, AI features, and reliable support workflows.">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {portfolio.skills.map((group) => {
          const Icon = iconMap[group.icon] || Code2;
          return (
            <GlassCard key={group.title}>
              <div className="mb-5 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-cyan/[0.12] text-cyan">
                  <Icon size={22} />
                </span>
                <h3 className="text-xl font-bold text-heading">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span key={skill} className="rounded-full border border-line/[0.10] bg-chip/[0.85] px-3 py-1.5 text-sm font-medium text-copy">
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Built For Real Business Workflows" intro="Experience themes aligned with developer, full stack, AI automation, and application support roles.">
      <div className="grid gap-5 lg:grid-cols-3">
        {portfolio.experience.map((item) => {
          const Icon = iconMap[item.icon] || BriefcaseBusiness;
          return (
            <GlassCard key={item.title}>
              <Icon className="mb-5 text-gold" size={30} />
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">{item.kicker}</p>
              <h3 className="mt-3 text-xl font-bold text-heading">{item.title}</h3>
              <p className="mt-4 leading-7 text-copy">{item.description}</p>
            </GlassCard>
          );
        })}
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects" eyebrow="Featured Projects" title="Product-Style Engineering Case Studies" intro="Selected projects focused on automation, AI-assisted operations, OCR intelligence, testing, and analytics.">
      <div className="grid gap-5 lg:grid-cols-2">
        {portfolio.projects.map((project, index) => {
          const Icon = iconMap[project.icon] || Rocket;
          return (
            <GlassCard key={project.title} className={index === 0 ? "lg:col-span-2" : ""}>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-coral/[0.12] text-coral">
                    <Icon size={24} />
                  </span>
                  <h3 className="mt-5 text-2xl font-bold text-heading">{project.title}</h3>
                  <p className="mt-4 leading-7 text-copy">{project.description}</p>
                </div>
                <ExternalLink className="shrink-0 text-muted" />
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-chip/[0.85] px-3 py-1.5 text-xs font-medium text-copy">
                    {tag}
                  </span>
                ))}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </Section>
  );
}

function Services() {
  return (
    <Section id="services" eyebrow="Services" title="What I Can Build" intro="Practical solutions for teams that need cleaner operations, faster web delivery, and automation that reduces manual work.">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {portfolio.services.map((service) => {
          const Icon = iconMap[service.icon] || Sparkles;
          return (
            <GlassCard key={service.title}>
              <Icon className="mb-5 text-mint" size={28} />
              <h3 className="text-lg font-bold text-heading">{service.title}</h3>
              <p className="mt-3 leading-7 text-copy">{service.description}</p>
            </GlassCard>
          );
        })}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Lets Build Something Useful" intro="Open to Software Developer, Full Stack Developer, AI Automation Engineer, and Application Support opportunities.">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <GlassCard>
          <h3 className="text-2xl font-bold text-heading">Ready for the next role</h3>
          <p className="mt-4 leading-8 text-copy">
            I can help build reliable full-stack applications, automate repetitive business workflows, and support production systems with a practical engineering mindset.
          </p>
          <div className="mt-8 grid gap-3">
            <a className="contact-link" href={`mailto:${portfolio.contact.email}`}>
              <Mail size={18} /> {portfolio.contact.email}
            </a>
            <a className="contact-link" href={portfolio.contact.github} target="_blank" rel="noreferrer">
              <Github size={18} /> GitHub
            </a>
            <a className="contact-link" href={portfolio.contact.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={18} /> LinkedIn
            </a>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="grid gap-4 sm:grid-cols-2">
            {portfolio.contactCards.map((card) => (
              <div key={card.label} className="rounded-2xl border border-line/[0.12] bg-surface/[0.90] p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-muted">{card.label}</p>
                <p className="mt-3 font-semibold text-heading">{card.value}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line/[0.10] px-5 py-8 text-center text-sm text-muted sm:px-8">
      <p>© {new Date().getFullYear()} Purushottam Gandas.</p>
    </footer>
  );
}

export default function App() {
  return (
    <div className="theme-shell min-h-screen bg-ink text-copy">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
