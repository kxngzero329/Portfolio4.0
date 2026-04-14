import { useEffect, useRef, lazy, Suspense } from "react";
import gsap from "gsap";
import { ChevronDown, Code2, UserCircle, Mail } from "lucide-react";

const CodeScene3D = lazy(() => import("./CodeScene3D"));


const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(titleRef.current, { y: 60, opacity: 0, duration: 1 })
        .from(subtitleRef.current, { y: 40, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(ctaRef.current, { y: 30, opacity: 0, duration: 0.6 }, "-=0.4");

      // Floating particles
      gsap.utils.toArray<HTMLElement>(".particle").forEach((p) => {
        gsap.to(p, {
          y: "random(-30, 30)",
          x: "random(-20, 20)",
          duration: "random(3, 6)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden"
    >
      {/* Background particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="particle absolute w-1 h-1 rounded-full bg-primary/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(160 100% 50% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(160 100% 50% / 0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <p className="font-code text-primary text-sm mb-4 tracking-wider">
            {"// Welcome to my portfolio"}
          </p>
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-code leading-tight mb-6"
          >
            <span className="text-foreground">Hi, I'm</span>
            <br />
            <span className="gradient-text">Mogamat</span>
            <br />
            <span className="gradient-text">Smith</span>
            <span className="text-primary animate-pulse">_</span>
          </h1>
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-muted-foreground max-w-lg mb-8"
          >
            A 22-year-old <span className="text-primary">Full Stack Developer</span> crafting
            elegant digital experiences with clean code and creative solutions.
          </p>
          <div ref={ctaRef} className="flex flex-wrap gap-4 items-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:shadow-[0_0_30px_hsl(160_100%_50%/0.3)] transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Mail className="w-4 h-4" />
              Get In Touch
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/30 text-primary font-semibold text-sm hover:bg-primary/10 transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Projects
            </a>
            <div className="flex gap-3 ml-2">
              <a href="https://github.com/kxngzero329" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Code2 className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/suhair-smith-kxngzero329/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <UserCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right - 3D Scene */}
        <div className="hidden lg:block">
          <Suspense fallback={<div className="w-full h-[600px] flex items-center justify-center text-muted-foreground font-code text-sm">Loading 3D scene...</div>}>
            <CodeScene3D />
          </Suspense>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="font-code text-xs">scroll down</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
