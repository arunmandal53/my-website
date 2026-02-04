import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Neural network background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Node class for neural network
    class Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      canvasWidth: number;
      canvasHeight: number;

      constructor(canvasW: number, canvasH: number) {
        this.canvasWidth = canvasW;
        this.canvasHeight = canvasH;
        this.x = Math.random() * this.canvasWidth;
        this.y = Math.random() * this.canvasHeight;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > this.canvasWidth) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvasHeight) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(214, 50%, 45%, 0.6)';
        ctx.fill();
      }
    }

    const nodes: Node[] = [];
    const nodeCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node(canvas.width, canvas.height));
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach((other) => {
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `hsla(214, 50%, 45%, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // Update and draw nodes
      nodes.forEach((node) => {
        node.update();
        node.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Name character decode animation
      tl.fromTo(
        nameRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2 }
      );

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      );

      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      );

      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.3'
      );

      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9, rotateY: -15 },
        { opacity: 1, scale: 1, rotateY: 0, duration: 1.2 },
        '-=1'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Neural Network Canvas Background */}
      <canvas ref={canvasRef} className="neural-canvas" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium tracking-wide uppercase">
                Hello, I'm
              </span>
            </div>

            <h1
              ref={nameRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Space_Grotesk'] leading-tight"
              style={{
                transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              Arun Kumar{' '}
              <span className="text-primary">Mandal</span>
            </h1>

            <p
              ref={titleRef}
              className="text-xl sm:text-2xl text-muted-foreground font-['Space_Grotesk']"
            >
              Senior AI-Focused Software Engineer
            </p>

            <p
              ref={descRef}
              className="text-base text-muted-foreground max-w-lg leading-relaxed"
            >
              I architect intelligent systems that bridge the gap between complex
              data and human experience. With 9+ years of expertise in AI, LLMs,
              and Geospatial solutions, I turn visionary ideas into scalable
              reality.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                className="magnetic-btn animate-pulse-glow"
                onClick={scrollToAbout}
              >
                Explore My Work
                <ArrowDown className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  document
                    .querySelector('#contact')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Get In Touch
              </Button>
            </div>
          </div>

          {/* Right: Profile Image */}
          <div
            ref={imageRef}
            className="relative flex justify-center lg:justify-end"
            style={{
              transform: `translate(${-mousePos.x * 0.3}px, ${-mousePos.y * 0.3}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-110 animate-pulse" />

              {/* Image container */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-primary/30 animate-float">
                <img
                  src="/profile.jpg"
                  alt="Arun Kumar Mandal"
                  className="w-full h-full object-cover"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-card border border-border px-4 py-2 rounded-full shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                <span className="text-sm font-medium text-primary">9+ Years</span>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-card border border-border px-4 py-2 rounded-full shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <span className="text-sm font-medium text-accent">AI Expert</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
