import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Brain,
  Cloud,
  Code2,
  Database,
  MapPin,
  GitBranch,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    name: 'AI & ML',
    icon: Brain,
    color: 'from-blue-500 to-cyan-400',
    skills: [
      'LangChain',
      'LlamaIndex',
      'GraphRAG',
      'OpenAI API',
      'Anthropic',
      'Gemini',
      'Hugging Face',
      'TensorFlow',
      'PyTorch',
      'OpenCV',
      'NLP',
      'Fine-tuning LLMs',
    ],
  },
  {
    name: 'Cloud & DevOps',
    icon: Cloud,
    color: 'from-orange-500 to-red-400',
    skills: [
      'AWS',
      'Docker',
      'Kubernetes',
      'CI/CD',
      'Kafka',
      'Redis',
      'Serverless',
      'Linux Admin',
    ],
  },
  {
    name: 'Web & Full-Stack',
    icon: Code2,
    color: 'from-green-500 to-emerald-400',
    skills: [
      'Python',
      'JavaScript',
      'TypeScript',
      'Golang',
      'React.js',
      'Next.js',
      'Django',
      'FastAPI',
      'Laravel',
    ],
  },
  {
    name: 'Databases',
    icon: Database,
    color: 'from-purple-500 to-pink-400',
    skills: [
      'PostgreSQL',
      'MongoDB',
      'Neo4j',
      'Milvus',
      'Faiss',
      'Pinecone',
      'MySQL',
      'Redis',
    ],
  },
  {
    name: 'Geospatial',
    icon: MapPin,
    color: 'from-teal-500 to-cyan-400',
    skills: [
      'Mapbox',
      'MapLibre',
      'PostGIS',
      'GeoDjango',
      'GeoPandas',
      'QGIS',
      'ArcGIS',
      'GeoServer',
    ],
  },
  {
    name: 'Tools',
    icon: GitBranch,
    color: 'from-yellow-500 to-amber-400',
    skills: [
      'Git/GitHub',
      'Jira',
      'Slack',
      'Asana',
      'Agile/Scrum',
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

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

      // Category cards animation
      const cards = categoriesRef.current?.querySelectorAll('.skill-category');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, rotateX: -10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: 'top 75%',
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
      id="skills"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div ref={headingRef} className="text-center mb-16">
            <span className="text-sm font-medium text-primary tracking-wide uppercase mb-4 block">
              Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] mb-4">
              Technical <span className="text-primary">Arsenal</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit built over 9+ years of engineering
              experience, spanning AI, cloud infrastructure, and full-stack
              development.
            </p>
          </div>

          {/* Skills Grid */}
          <div
            ref={categoriesRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{ perspective: '1000px' }}
          >
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="skill-category group relative"
                onMouseEnter={() => setHoveredCategory(category.name)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div
                  className={`relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 overflow-hidden transition-all duration-500 ${
                    hoveredCategory === category.name
                      ? 'border-primary/50 scale-[1.02]'
                      : hoveredCategory
                      ? 'opacity-60'
                      : ''
                  }`}
                >
                  {/* Gradient background on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-br ${category.color}`}
                    >
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold font-['Space_Grotesk']">
                      {category.name}
                    </h3>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 text-sm bg-secondary/50 text-secondary-foreground rounded-full border border-border/30 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
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
