import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingDown, TrendingUp, Globe, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    icon: Calendar,
    value: '9+',
    label: 'Years Experience',
    color: 'text-primary',
  },
  {
    icon: TrendingDown,
    value: '40%',
    label: 'Cost Reduction',
    color: 'text-accent',
  },
  {
    icon: TrendingUp,
    value: '30%',
    label: 'Performance Gain',
    color: 'text-green-400',
  },
  {
    icon: Globe,
    value: 'Global',
    label: 'Remote Collaboration',
    color: 'text-purple-400',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Bio text word stagger
      const bioWords = bioRef.current?.querySelectorAll('.word');
      if (bioWords) {
        gsap.fromTo(
          bioWords,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.02,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bioRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Stats cards animation
      const statCards = statsRef.current?.querySelectorAll('.stat-card');
      if (statCards) {
        gsap.fromTo(
          statCards,
          { opacity: 0, scale: 0.8, rotateY: -15 },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const bioText =
    "Based in Nepal and working globally, I am a Lead Engineer and Architect specializing in AI-driven ecosystems. My journey spans from developing core AI R&D at Ten Orbits to leading high-impact projects for the US Embassy and the United Nations. I don't just write code; I engineer solutions that reduce cloud costs by 40%, optimize server loads by 30%, and handle thousands of concurrent users with ease. My passion lies in the intersection of Agentic AI, Geospatial Intelligence, and scalable cloud architecture.";

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <span className="text-sm font-medium text-primary tracking-wide uppercase mb-4 block">
              About Me
            </span>
            <h2
              ref={headingRef}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Space_Grotesk']"
            >
              Behind the <span className="text-primary">Code</span>
            </h2>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Bio Text */}
            <div>
              <p
                ref={bioRef}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                {bioText.split(' ').map((word, i) => (
                  <span key={i} className="word inline-block mr-[0.3em]">
                    {word}
                  </span>
                ))}
              </p>
            </div>

            {/* Stats Grid */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 gap-4"
              style={{ perspective: '1000px' }}
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="stat-card group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-500 hover:scale-105"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <stat.icon
                      className={`w-8 h-8 ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                    />
                    <div
                      className={`text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] ${stat.color} mb-1`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
