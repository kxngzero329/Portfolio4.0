import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Frontend",
    color: "primary",
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Next.js", level: 88 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML/CSS", level: 98 },
    ],
  },
  {
    title: "Backend",
    color: "cyan",
    skills: [
      { name: "Node.js", level: 92 },
      { name: "Python", level: 84 },
      { name: "PostgreSQL", level: 95 },
      { name: "REST APIs", level: 92 },
      { name: "MySQL Workbench", level: 88 },
    ],
  },
  {
    title: "Tools & DevOps",
    color: "accent",
    skills: [
      { name: "Git", level: 92 },
      { name: "Docker", level: 82 },
      { name: "AWS", level: 78 },
      { name: "Netlify/Vercel", level: 97 },
      { name: "CI/CD", level: 86 },
    ],
  },
  {
    title: "Design & Other",
    color: "orange",
    skills: [
      { name: "Figma", level: 85 },
      { name: "Photoshop", level: 90 },
      { name: "Firebase", level: 95 },
      { name: "MongoDB", level: 81 },
      { name: "Supabase", level: 95 },
    ],
  },
];

const colorMap: Record<string, string> = {
  primary: "bg-primary",
  cyan: "bg-cyan",
  accent: "bg-accent",
  orange: "bg-orange",
};

const borderColorMap: Record<string, string> = {
  primary: "border-primary/30",
  cyan: "border-cyan/30",
  accent: "border-accent/30",
  orange: "border-orange/30",
};

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const categories = gsap.utils.toArray<HTMLElement>(".skill-category");
      if (categories.length) {
        gsap.set(categories, { y: 50, opacity: 0 });
        ScrollTrigger.create({
          trigger: ".skills-grid",
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(categories, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.2,
              ease: "power3.out",
            });
          },
        });
      }

      const bars = gsap.utils.toArray<HTMLElement>(".skill-bar-fill");
      if (bars.length) {
        gsap.set(bars, { scaleX: 0, transformOrigin: "left" });
        ScrollTrigger.create({
          trigger: ".skills-grid",
          start: "top 75%",
          once: true,
          onEnter: () => {
            gsap.to(bars, {
              scaleX: 1,
              duration: 1,
              stagger: 0.05,
              ease: "power3.out",
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <div className="font-code text-primary text-sm mb-2">{"// 03. Skills"}</div>
        <h2 className="text-3xl md:text-4xl font-bold font-code mb-16">
          <span className="text-primary">{">"}</span> cat skills.md<span className="text-primary animate-pulse">_</span>
        </h2>

        <div className="skills-grid grid md:grid-cols-2 gap-6">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className={`skill-category glass rounded-xl p-6 border ${borderColorMap[cat.color]} hover:box-glow transition-all duration-500`}
            >
              <h3 className="font-code font-bold text-lg mb-6 text-foreground">
                <span className="text-primary">{"#"}</span> {cat.title}
              </h3>
              <div className="space-y-4">
                {cat.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-code text-muted-foreground">{skill.name}</span>
                      <span className="font-code text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`skill-bar-fill h-full rounded-full ${colorMap[cat.color]}`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
