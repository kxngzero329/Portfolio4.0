import { Terminal, Code2, UserCircle, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-8 px-4">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Terminal className="w-5 h-5 text-primary" />
        <span className="font-code text-sm font-bold text-foreground">MS</span>
      </div>
      <span className="font-code text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Mogamat Smith. All rights reserved.
      </span>
      <div className="flex gap-4">
        <a href="https://github.com/kxngzero329" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
          <Code2 className="w-5 h-5" />
        </a>
        <a href="https://www.linkedin.com/in/suhair-smith-kxngzero329/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
          <UserCircle className="w-5 h-5" />
        </a>
        <a href="mailto:suhairsmith17@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
          <Mail className="w-5 h-5" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
