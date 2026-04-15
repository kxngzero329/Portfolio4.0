import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Dylan Pearson",
    role: "CEO, NexWebSA",
    text: "Mogamat delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and clean code practices are remarkable.",
    rating: 5,
  },
  {
    name: "Nasheema Charles",
    role: "Business Owner, NGTraders",
    text: "Working with Mogamat was a fantastic experience. He understood our requirements perfectly and delivered ahead of schedule with outstanding quality.",
    rating: 5,
  },
  {
    name: "Geraldine Erasmus",
    role: "Business Owner, Beauty By Geraldine",
    text: "His full-stack expertise and eye for design made our project a success. Mogamat is the kind of developer every team needs. Highly recommended!",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-container", {
        scrollTrigger: { trigger: ".testimonial-container", start: "top 80%" },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const next = () => setActive((p) => (p + 1) % testimonials.length);
  const prev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={sectionRef} className="section-padding relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="font-mono text-primary text-sm tracking-wider">
            {"// Reviews"}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4 text-foreground">
            Reviews & <span className="text-primary">Testimonials</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Hear from my clients about their experience working with me.
          </p>
        </div>

        <div className="testimonial-container glass rounded-2xl p-8 md:p-12 relative box-glow">
          <Quote className="w-10 h-10 text-primary/20 absolute top-6 left-6" />

          <div className="relative overflow-hidden">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`transition-all duration-500 ${
                  i === active
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 absolute top-0 left-0 translate-x-8"
                }`}
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow text-yellow" />
                  ))}
                </div>
                <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">
                  "{t.text}"
                </p>
                <div>
                  <p className="font-bold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground font-code">{t.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === active ? "bg-primary w-6" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prev} className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors text-muted-foreground">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={next} className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors text-muted-foreground">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
