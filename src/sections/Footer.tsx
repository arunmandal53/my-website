import { Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-border/50">
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo & Copyright */}
            <div className="text-center md:text-left">
              <a
                href="#"
                className="text-2xl font-bold font-['Space_Grotesk'] text-foreground hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                }}
              >
                AKM
              </a>
              <p className="text-sm text-muted-foreground mt-2">
                © {new Date().getFullYear()} Arun Kumar Mandal. All rights reserved.
              </p>
            </div>

            {/* Made with love */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-red-400 animate-pulse" />
              <span>in Nepal</span>
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="p-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group"
            >
              <ArrowUp className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
