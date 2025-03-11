
import { useEffect, useRef } from 'react';
import { Map, BarChart4, Globe, Code } from 'lucide-react';

const Features = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('opacity-0');
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elementsRef.current.forEach(el => {
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      elementsRef.current.forEach(el => {
        if (el) observerRef.current?.unobserve(el);
      });
    };
  }, []);

  const features = [
    {
      icon: <Map size={28} className="text-earth-500" />,
      title: 'Land Cover Detection',
      description: 'Accurately identifies urban areas, water bodies, vegetation, and barren land using advanced AI algorithms.',
      ref: (el: HTMLDivElement) => (elementsRef.current[0] = el)
    },
    {
      icon: <BarChart4 size={28} className="text-earth-500" />,
      title: 'Statistical Analysis',
      description: 'Get detailed area-wise percentages and metrics of different land cover types for informed decision making.',
      ref: (el: HTMLDivElement) => (elementsRef.current[1] = el)
    },
    {
      icon: <Globe size={28} className="text-earth-500" />,
      title: 'Interactive Mapping',
      description: 'Select any area of interest directly from our interactive map interface for immediate analysis.',
      ref: (el: HTMLDivElement) => (elementsRef.current[2] = el)
    },
    {
      icon: <Code size={28} className="text-earth-500" />,
      title: 'API Access',
      description: 'Integrate our classification capabilities directly into your own applications with our comprehensive API.',
      ref: (el: HTMLDivElement) => (elementsRef.current[3] = el)
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform offers cutting-edge capabilities for land cover analysis,
            built with precision and ease of use in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              ref={feature.ref}
              className="opacity-0 bg-background rounded-xl p-6 shadow-subtle flex flex-col h-full transition-all duration-300 hover:shadow-elevated"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-earth-100 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
