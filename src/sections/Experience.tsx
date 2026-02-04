import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: 'Lead Engineer',
    company: 'Techco Lab Pvt. Ltd.',
    period: '07/2024 – Present',
    location: 'Nepal',
    achievements: [
      {
        label: 'AI Architecture',
        description:
          'Architected Agentic AI pipelines and RAG systems using LangChain and LlamaIndex; integrated vector databases (Milvus/Faiss) for domain-specific chatbots.',
      },
      {
        label: 'Team Leadership',
        description:
          'Directed software development teams, conducting code reviews and establishing Git workflows.',
      },
      {
        label: 'Infrastructure',
        description:
          'Managed AWS infrastructure, implementing Docker/Kubernetes for containerization and load testing.',
      },
      {
        label: 'High-Traffic Delivery',
        description:
          'Delivered US Embassy Nepal Event Management Platform, handling thousands of concurrent registrations.',
      },
    ],
  },
  {
    title: 'Lead Full Stack Developer',
    company: 'Youth Innovation Lab',
    period: '06/2020 – 07/2024',
    location: 'Nepal',
    achievements: [
      {
        label: 'System Optimization',
        description:
          "Overhauled Nepal's Integrated Disaster Information Management System, reducing server load by 30%.",
      },
      {
        label: 'Cost Reduction',
        description:
          'Refactored Riskchanges project, improving performance by 45% and cutting cloud costs by 40%.',
      },
      {
        label: 'AI Implementation',
        description:
          'Developed AI-based heatwave forecasting web app for early warning systems.',
      },
      {
        label: 'E-Learning',
        description:
          'Built video-heavy e-learning platform, reducing bandwidth costs by 60%.',
      },
      {
        label: 'Business Growth',
        description:
          'Managed project lifecycles, increasing departmental revenue by 60%.',
      },
    ],
  },
  {
    title: 'Freelance Consultant (AI & Web)',
    company: 'United Nations (ESCAP)',
    period: '02/2024 – 05/2024',
    location: 'Remote',
    achievements: [
      {
        label: 'Platform Migration',
        description:
          "Delivered technical consulting for NDRRMA's Moodle e-learning platform migration, ensuring data integrity and platform stability.",
      },
    ],
  },
  {
    title: 'Software Engineer (AI R&D Unit)',
    company: 'Ten Orbits Pvt. Ltd.',
    period: '07/2019 – 05/2020',
    location: 'Nepal',
    achievements: [
      {
        label: 'Image Search',
        description:
          'Developed Reverse Image Search Engine using CNNs and OpenCV.',
      },
      {
        label: 'Face Recognition',
        description:
          'Built scalable Face Recognition module with high accuracy rates.',
      },
      {
        label: 'AR Development',
        description:
          'Created AR mobile application for enhanced user engagement.',
      },
    ],
  },
  {
    title: 'Software Engineer (Web Development)',
    company: 'Otonomis Pvt. Ltd.',
    period: '07/2018 – 07/2019',
    location: 'Nepal',
    achievements: [
      {
        label: 'Fleet Management',
        description:
          'Led team to build GPS vehicle tracking and fleet management application with real-time data visualization.',
      },
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

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

      // Timeline line draw animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1,
          },
        }
      );

      // Experience cards animation
      const cards = timelineRef.current?.querySelectorAll('.experience-card');
      if (cards) {
        cards.forEach((card, index) => {
          const isLeft = index % 2 === 0;
          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: isLeft ? -50 : 50,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }

      // Timeline nodes animation
      const nodes = timelineRef.current?.querySelectorAll('.timeline-node');
      if (nodes) {
        gsap.fromTo(
          nodes,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.2,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: timelineRef.current,
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
      id="experience"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div ref={headingRef} className="text-center mb-16">
            <span className="text-sm font-medium text-primary tracking-wide uppercase mb-4 block">
              Career Path
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Space_Grotesk']">
              Professional <span className="text-primary">Journey</span>
            </h2>
          </div>

          {/* Timeline */}
          <div ref={timelineRef} className="relative">
            {/* Center Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border">
              <div
                ref={lineRef}
                className="absolute inset-x-0 top-0 bg-gradient-to-b from-primary via-accent to-primary origin-top"
                style={{ height: '100%' }}
              />
            </div>

            {/* Experience Cards */}
            <div className="space-y-12">
              {experiences.map((exp, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div
                    key={index}
                    className={`relative flex items-start gap-8 ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline Node */}
                    <div className="timeline-node absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10 shadow-lg shadow-primary/30" />

                    {/* Content */}
                    <div
                      className={`experience-card ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                        isLeft ? 'md:pr-8' : 'md:pl-8'
                      }`}
                    >
                      <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all duration-500 group">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Briefcase className="w-4 h-4 text-primary" />
                              <span className="text-sm text-muted-foreground">
                                {exp.period}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold font-['Space_Grotesk'] group-hover:text-primary transition-colors">
                              {exp.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {exp.company}
                            </p>
                          </div>
                        </div>

                        {/* Achievements */}
                        <div className="space-y-3">
                          {exp.achievements.map((achievement, achIndex) => (
                            <div
                              key={achIndex}
                              className="text-sm"
                            >
                              <span className="font-medium text-foreground">
                                {achievement.label}:
                              </span>{' '}
                              <span className="text-muted-foreground">
                                {achievement.description}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Empty space for alternating layout */}
                    <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
