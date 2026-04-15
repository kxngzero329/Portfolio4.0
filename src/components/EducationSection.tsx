import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Briefcase } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    type: "education",
    title: "Frontend Development Certificate",
    org: "Codespace Academy",
    period: "Jan 2023 - Dec 2023",
    desc: "Completed an intensive program focused on modern frontend technologies, including React, TypeScript, and UI/UX design principles.",
  },
  {
    type: "education",
    title: "Microsoft MSITA Certification",
    org: "College of Cape Town",
    period: "Jan 2024 - Dec 2024",
    desc: "Successfully completed the Microsoft MSITA course, gaining expertise in front and backend development with technologies such as C#, .NET, and Photoshop.",
  },
  {
    type: "education",
    title: "Full Stack Web Development Certificate",
    org: "Lifechoices Academy",
    period: "April 2025 - Sept 2025",
    desc: "Completed a comprehensive full stack web development program covering both frontend and backend technologies, including React, Node.js, Express, MySQL and Supabase.",
  },
  {
    type: "experience",
    title: "Intern Web Developer & Freelancer",
    org: "Lifechoices Studio",
    period: "Sep 2025 - Present",
    desc: "Currently working as an intern web developer and freelancing on the side, contributing to real-world projects and gaining hands-on experience in frontend and backend development using a variety of technologies.",
  },
];

const EducationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".timeline-item", {
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 80%",
          invalidateOnRefresh: true,
        },
        x: (i) => (i % 2 === 0 ? -40 : 40),
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        clearProps: "x",
      });

      gsap.from(".timeline-line", {
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 80%",
          invalidateOnRefresh: true,
        },
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="section-padding relative overflow-x-clip"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="font-mono text-primary text-sm tracking-wider">
            {"// Education"}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4 text-foreground">
            Education & <span className="text-primary">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            A timeline of my educational background and professional experience.
          </p>
        </div>

        <div className="timeline-container relative">
          {/* Center line */}
          <div className="timeline-line absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-cyan to-accent" />

          <div className="space-y-12">
            {timelineData.map((item, i) => (
              <div
                key={i}
                className={`timeline-item relative flex items-start gap-6 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary box-glow z-10 mt-1" />

                {/* Content */}
                <div
                  className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                    i % 2 === 0
                      ? "md:pr-8 md:text-right"
                      : "md:pl-8"
                  }`}
                >
                  <div className="glass rounded-xl p-6 hover:box-glow transition-all duration-500">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {item.type === "education" ? (
                        <GraduationCap className="w-4 h-4 text-cyan" />
                      ) : (
                        <Briefcase className="w-4 h-4 text-orange" />
                      )}
                      <span className="font-code text-xs text-primary">
                        {item.period}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {item.title}
                    </h3>

                    <p className="text-sm text-accent font-code mb-2">
                      {item.org}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Spacer */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;