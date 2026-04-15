import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Sparkles, Rocket, ShoppingCart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Starter",
    price: "R1,500",
    prefix: "From",
    description: "Perfect for establishing your online presence with a clean, professional website.",
    icon: Sparkles,
    features: [
      "1–3 page responsive website",
      "Mobile & desktop optimized",
      "Contact form & WhatsApp integration",
      "Fast turnaround & deployment",
      "SEO-friendly foundation",
    ],
    popular: false,
  },
  {
    name: "Growth",
    price: "R3,500",
    prefix: "From",
    description: "A robust, multi-page website designed to scale with your business.",
    icon: Rocket,
    features: [
      "4–6 page professional website",
      "Mobile & desktop optimized",
      "Contact form, WhatsApp & email setup",
      "Custom features & integrations",
      "Performance & SEO optimization",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "E-Commerce",
    price: "R6,000",
    prefix: "From",
    description: "A complete online store with payment processing and a full management dashboard.",
    icon: ShoppingCart,
    features: [
      "Full e-commerce storefront",
      "Online payments, cash & more",
      "Admin management panel",
      "Mobile & desktop optimized",
      "Contact form, WhatsApp & email setup",
      "Custom features available",
    ],
    popular: false,
  },
];

const PricingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="font-mono text-primary text-sm tracking-wider">
            {"// Pricing"}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4 text-foreground">
            Packages & <span className="text-primary">Pricing</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Transparent pricing tailored to your needs. Every package is fully customizable. Let's build something great together.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                ref={(el) => { cardsRef.current[i] = el; }}
                className={`relative rounded-2xl p-[1px] transition-transform duration-300 hover:-translate-y-2 ${
                  plan.popular
                    ? "bg-gradient-to-b from-primary/60 via-primary/20 to-transparent"
                    : "bg-border/40"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full tracking-wider uppercase">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="rounded-2xl bg-card h-full flex flex-col p-6 md:p-8">
                  {/* Icon & Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      plan.popular ? "bg-primary/20" : "bg-secondary"
                    }`}>
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-muted-foreground text-sm">{plan.prefix} </span>
                    <span className="text-3xl md:text-4xl font-bold text-foreground">{plan.price}</span>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="#contact"
                    className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-300 block ${
                      plan.popular
                        ? "bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:brightness-110"
                        : "border border-border text-foreground hover:border-primary/50 hover:text-primary"
                    }`}
                  >
                    Get Started
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="text-center text-muted-foreground text-xs mt-10">
          All packages are customizable. Additional features and complexity may affect final pricing.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
