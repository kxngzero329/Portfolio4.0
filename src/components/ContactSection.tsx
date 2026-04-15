import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Mail, MapPin, Phone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const websiteTypes = [
  "Portfolio / Personal",
  "E-Commerce / Online Store",
  "Management System",
  "Website + Full Admin System",
  "Educational Platform",
  "Business / Corporate",
  "Blog / Content",
  "SaaS / Web App",
  "Landing Page",
  "Other",
];

type ToastState = {
  show: boolean;
  type: "success" | "error";
  message: string;
};

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [Website, setWebsite] = useState(false);
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: "success",
    message: "",
  });

  const [formData, setFormData] = useState({
    Name: "",
    Surname: "",
    Email: "",
    Phone: "",
    Message: "",
    Type: "",
    Pages: "",
    Budget: "",
    Timeline: "",
    Features: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-content", {
        scrollTrigger: {
          trigger: ".contact-content",
          start: "top 80%",
          invalidateOnRefresh: true,
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ show: true, type, message });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  useEffect(() => {
    if (toast.show) {
      gsap.fromTo(
        ".toast", 
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [toast.show]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://formspree.io/f/mlgadojw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Name: formData.Name,
          Surname: formData.Surname,
          Email: formData.Email,
          Phone: formData.Phone,
          Message: formData.Message,
          Website,
          Type: formData.Type,
          Pages: formData.Pages,
          Budget: formData.Budget,
          Timeline: formData.Timeline,
          Features: formData.Features,
        }),
      });

      if (res.ok) {
        setFormData({
          Name: "",
          Surname: "",
          Email: "",
          Phone: "",
          Message: "",
          Type: "",
          Pages: "",
          Budget: "",
          Timeline: "",
          Features: "",
        });

        setWebsite(false);

        showToast("success", "Message sent successfully! I'll be in touch soon.");
      } else {
        showToast("error", "Message failed to send. Try again. If the issue persists, contact me directly at suhairsmith17@gmail.com or +27 74 786 2736.");
      }
    } catch (err) {
      showToast("error", "Network error detected. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground font-code text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding relative"
    >
      {toast.show && (
        <div
          className={`toast fixed top-6 right-6 z-50 px-5 py-3 rounded-lg border font-code text-sm shadow-lg backdrop-blur-md ${
            toast.type === "success"
              ? "border-primary/40 bg-black/80 text-primary"
              : "border-red-500/40 bg-black/80 text-red-400"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="font-code text-primary text-sm mb-2">
          {"// Contact"}
        </div>

        <h2 className="text-3xl md:text-4xl font-bold font-code mb-16">
          <span className="text-primary">{">"}</span> Get In Touch
          <span className="text-primary animate-pulse">_</span>
        </h2>

        <div className="contact-content grid md:grid-cols-5 gap-12">
          {/* INFO */}
          <div className="md:col-span-2 space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              Have a project in mind? Let's build something amazing together.
              Drop me a message and I'll get back to you as soon as possible.
            </p>

            <div className="space-y-4">
              {[
                { icon: Mail, label: "suhairsmith17@gmail.com" },
                { icon: Phone, label: "+27 74 786 2736" },
                { icon: MapPin, label: "Cape Town, South Africa" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <item.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-code">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="md:col-span-3 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className={inputClass}
                value={formData.Name}
                onChange={(e) =>
                  setFormData({ ...formData, Name: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className={inputClass}
                value={formData.Surname}
                onChange={(e) =>
                  setFormData({ ...formData, Surname: e.target.value })
                }
                required
              />

              <input
                type="email"
                placeholder="Your Email"
                className={inputClass}
                value={formData.Email}
                onChange={(e) =>
                  setFormData({ ...formData, Email: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Your Phone Number"
                className={inputClass}
                value={formData.Phone}
                onChange={(e) =>
                  setFormData({ ...formData, Phone: e.target.value })
                }
                required
              />
            </div>

            <textarea
              placeholder="Your Message"
              rows={4}
              className={inputClass + " resize-none"}
              value={formData.Message}
              onChange={(e) =>
                setFormData({ ...formData, Message: e.target.value })
              }
              required
            />

            {/* website toggle btn */}
            <div className="glass rounded-lg p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${
                    Website ? "bg-primary" : "bg-secondary"
                  }`}
                  onClick={() => setWebsite(!Website)}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-foreground transition-transform duration-300 ${
                      Website ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </div>

                <span className="text-sm font-code text-muted-foreground">
                  I need a website built
                </span>
              </label>

              {Website && (
                <div className="mt-4 space-y-4 animate-fade-in">
                  <select
                    className={inputClass}
                    value={formData.Type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        Type: e.target.value,
                      })
                    }
                  >
                    <option value="">What type of website?</option>
                    {websiteTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Estimated pages (e.g., 5-10)"
                      className={inputClass}
                      value={formData.Pages}
                      onChange={(e) =>
                        setFormData({ ...formData, Pages: e.target.value })
                      }
                      required
                    />

                    <input
                      type="text"
                      placeholder="Budget range (e.g., R5k-R15k)"
                      className={inputClass}
                      value={formData.Budget}
                      onChange={(e) =>
                        setFormData({ ...formData, Budget: e.target.value })
                      }
                      required
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Timeline (e.g., 2 weeks)"
                    className={inputClass}
                    value={formData.Timeline}
                    onChange={(e) =>
                      setFormData({ ...formData, Timeline: e.target.value })
                    }
                    required
                  />

                  <textarea
                    placeholder="Key features you need"
                    rows={3}
                    className={inputClass + " resize-none"}
                    value={formData.Features}
                    onChange={(e) =>
                      setFormData({ ...formData, Features: e.target.value })
                    }
                    required
                  />
                </div>
              )}
            </div>

            {/* submit btn */}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:shadow-[0_0_30px_hsl(160_100%_50%/0.3)] transition-all duration-300 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;