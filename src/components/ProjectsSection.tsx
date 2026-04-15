import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Code2, Folder } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Astrielle E-Commerce Store",
    desc: "A full-featured online clothing store with user authentication, product management, and simulated payment integration.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Supabase"],
    color: "primary",
    live: "https://astrielle.netlify.app/",
  },
  {
    title: "PodHut Podcast Platform",
    desc: "A modern podcast hosting and streaming platform with personalized recommendations and user-friendly interface.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Supabase"],
    color: "cyan",
    live: "https://podhut.netlify.app/",
  },
  {
    title: "Modern Tech Solutions",
    desc: "An HR management system for a tech company, featuring employee profiles, project tracking, performance analytics and employee payroll.",
    tech: ["React", "TypeScript", "Tailwind CSS", "REST API", "Supabase"],
    color: "accent",
    live: "https://moderntechs.netlify.app/",
  },
  {
    title: "BrewCraft E-Commerce Store",
    desc: "A full-featured online store for a fictional craft brewery, featuring product listings, shopping cart, and simulated checkout process.",
    tech: ["PHP", "MySQL", "CSS", "JavaScript"],
    color: "orange",
    live: "https://brewcraft.wuaze.com/",
  },
];

const glowMap: Record<string, string> = {
  primary: "hover:shadow-[0_0_30px_hsl(160_100%_50%/0.15)]",
  cyan: "hover:shadow-[0_0_30px_hsl(185_100%_50%/0.15)]",
  accent: "hover:shadow-[0_0_30px_hsl(270_80%_65%/0.15)]",
  orange: "hover:shadow-[0_0_30px_hsl(30_100%_55%/0.15)]",
};

const dotColor: Record<string, string> = {
  primary: "bg-primary",
  cyan: "bg-cyan",
  accent: "bg-accent",
  orange: "bg-orange",
};

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      if (cards.length) {
        gsap.set(cards, { y: 60, opacity: 0 });
        ScrollTrigger.create({
          trigger: ".projects-grid",
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="font-mono text-primary text-sm tracking-wider">
            {"// Projects"}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4 text-foreground">
            Projects & <span className="text-primary">Demos</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            A showcase of my work, featuring a variety of projects that demonstrate my skills and creativity.
          </p>
        </div>

        <div className="projects-grid grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className={`project-card glass rounded-xl overflow-hidden transition-all duration-500 group ${glowMap[project.color]}`}
            >
              {/* Header bar */}
              <div className="flex items-center gap-2 px-6 py-3 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-yellow/60" />
                <div className={`w-3 h-3 rounded-full ${dotColor[project.color]}/60`} />
                <Folder className="w-4 h-4 text-muted-foreground ml-2" />
                <span className="text-xs text-muted-foreground font-code">{project.title.toLowerCase().replace(/ /g, "-")}/</span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span key={t} className="px-3 py-1 text-xs font-code bg-secondary text-secondary-foreground rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href={project.live} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors font-code">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
