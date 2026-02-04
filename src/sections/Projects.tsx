import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'US Embassy Nepal Event Platform',
    description:
      'High-traffic event management system handling thousands of concurrent registrations with automated email workflows and real-time analytics.',
    image: '/project-embassy.png',
    tags: ['Django', 'AWS', 'PostgreSQL', 'React'],
    link: 'https://usembassynepal.events/',
    github: null,
  },
  {
    title: 'Bipad portal',
    description:
      'BIPAD: Building Information Platform Against Disaster, a comprehensive disaster management system integrating GIS data and real-time alerts.',
    image: '/project-bipadportal.png',
    tags: ['Django', 'PostGIS', 'Geoserver', 'Maplibre'],
    link: 'https://bipadportal.gov.np/',
    github: null,
  },
  {
    title: 'Shikshya.org',
    description:
      'Shikshya.org is an e-learning platform that acts as an aggregator platform, offering a wide range of online courses and certifications.',
    image: '/project-shikshya.png',
    tags: ['React', 'Django', 'Nginx', 'Streaming'],
    link: "https://shikshya.org/",
    github: null,
  },
  {
    title: 'Riskchanges Platform',
    description:
      'An open-source Spatial Decision Support tool for the analysis of Dynamic Multi-Hazard risk.',
    image: '/project-riskchanges.png',
    tags: ['React', 'Django', 'Docker', 'PostGIS', 'GDAL'],
    link: "https://riskchanges.org/",
    github: null,
  },
  {
    title: 'Tagme App',
    description:
      'TagMe is a digital advocacy campaign and event management platform.',
    image: '/project-tagme.png',
    tags: ['React', 'Django', 'Flutter', 'Mapbox'],
    link: "https://tagme.yilab.org.np/",
    github: null,
  },
  {
    title: 'HeatAI',
    description:
      'HeatAI is an AI-powered platform for analyzing and predicting heat-related data.',
    image: '/project-heatai.png',
    tags: ['React', 'Django', 'Flutter', 'Mapbox'],
    link: "https://heatai.org/",
    github: null,
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

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

      // Project cards animation
      const cards = projectsRef.current?.querySelectorAll('.project-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, rotateX: -10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: projectsRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div ref={headingRef} className="text-center mb-16">
            <span className="text-sm font-medium text-primary tracking-wide uppercase mb-4 block">
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] mb-4">
              Featured <span className="text-primary">Creations</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A selection of projects that showcase my expertise in AI,
              full-stack development, and cloud architecture.
            </p>
          </div>

          {/* Projects Grid */}
          <div
            ref={projectsRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{ perspective: '1000px' }}
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card group"
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div
                  className={`relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden transition-all duration-500 ${
                    hoveredProject === index
                      ? 'border-primary/50 scale-[1.02]'
                      : hoveredProject !== null
                      ? 'opacity-60'
                      : ''
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold font-['Space_Grotesk'] mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 text-xs bg-secondary/50 text-secondary-foreground rounded border border-border/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      {project.link && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          asChild
                        >
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Visit
                          </a>
                        </Button>
                      )}
                      {project.github && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-1"
                          asChild
                        >
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
