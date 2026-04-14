import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Coffee, Rocket, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Code2, label: "Lines of Code", value: "100K+" },
  { icon: Coffee, label: "Cups of Coffee", value: "∞" },
  { icon: Rocket, label: "Projects Shipped", value: "15+" },
  { icon: Zap, label: "Technologies", value: "20+" },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const aboutContent = sectionRef.current?.querySelector(".about-content");
      const statCards = sectionRef.current?.querySelectorAll(".stat-card");

      if (aboutContent) {
        gsap.from(aboutContent, {
          scrollTrigger: {
            trigger: aboutContent,
            start: "top 80%",
            invalidateOnRefresh: true,
          },
          y: 60,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
        });
      }

      if (statCards) {
        gsap.from(statCards, {
          scrollTrigger: {
            trigger: sectionRef.current?.querySelector(".stat-grid"),
            start: "top 85%",
            invalidateOnRefresh: true,
          },
          y: 40,
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding !pb-8 md:!pb-12 relative"
    >
      <div className="max-w-6xl mx-auto">
        <div className="font-code text-primary text-sm mb-2">
          {"// 01. About Me"}
        </div>

        <h2 className="text-3xl md:text-4xl font-bold font-code mb-12">
          <span className="text-primary">{">"}</span> whoami
          <span className="text-primary animate-pulse">_</span>
        </h2>

        {/* CONTENT */}
        <div className="about-content grid md:grid-cols-2 gap-12 items-start mb-16">
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed text-lg">
              I'm a passionate{" "}
              <span className="text-primary">Full Stack Developer</span> based
              in Cape Town, South Africa. At 22, I've already built a strong
              foundation in modern web technologies and love turning complex
              problems into elegant solutions.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              My journey in programming started with curiosity and has evolved
              into a deep commitment to crafting{" "}
              <span className="text-cyan">performant</span>,{" "}
              <span className="text-accent">accessible</span>, and{" "}
              <span className="text-orange">beautiful</span> web applications.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies,
              contributing to open-source projects, or enjoying a good cup of
              coffee while brainstorming the next big idea.
            </p>
          </div>

          {/* CODE BLOCK */}
          <div className="code-block">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-destructive/80" />
              <div className="w-3 h-3 rounded-full bg-yellow/80" />
              <div className="w-3 h-3 rounded-full bg-primary/80" />
              <span className="ml-3 text-xs text-muted-foreground font-code">
                about.json
              </span>
            </div>

            <pre className="text-sm font-code space-y-1">
              <div>{"{"}</div>
              <div className="ml-4">
                <span className="text-cyan">"name"</span>:{" "}
                <span className="text-primary">"Mogamat Smith"</span>,
              </div>
              <div className="ml-4">
                <span className="text-cyan">"location"</span>:{" "}
                <span className="text-primary">"Cape Town, SA"</span>,
              </div>
              <div className="ml-4">
                <span className="text-cyan">"education"</span>:{" "}
                <span className="text-primary">"Software Development"</span>,
              </div>
              <div className="ml-4">
                <span className="text-cyan">"interests"</span>: [
              </div>
              <div className="ml-8">
                <span className="text-primary">"Web Dev"</span>,
              </div>
              <div className="ml-8">
                <span className="text-primary">"Data Analyst"</span>,
              </div>
              <div className="ml-8">
                <span className="text-primary">"Backend Dev"</span>
              </div>
              <div className="ml-4">],</div>
              <div className="ml-4">
                <span className="text-cyan">"hireable"</span>:{" "}
                <span className="text-accent">true</span>
              </div>
              <div>{"}"}</div>
            </pre>
          </div>
        </div>

        {/* STATS */}
        <div className="stat-grid grid grid-cols-2 md:grid-cols-4 gap-4 pt-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-card w-full max-w-[250px] mx-auto glass rounded-xl p-6 text-center hover:box-glow transition-all duration-500 group"
            >
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-2xl md:text-3xl font-bold font-code text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground font-code">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;