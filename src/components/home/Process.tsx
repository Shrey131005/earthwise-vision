
import { useEffect, useRef } from 'react';
import { Upload, Cpu, Download } from 'lucide-react';

const Process = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

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

    if (containerRef.current) {
      observerRef.current.observe(containerRef.current);
    }

    stepsRef.current.forEach(el => {
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      if (containerRef.current) {
        observerRef.current?.unobserve(containerRef.current);
      }
      stepsRef.current.forEach(el => {
        if (el) observerRef.current?.unobserve(el);
      });
    };
  }, []);

  const steps = [
    {
      icon: <Upload size={32} />,
      title: "Upload",
      description: "Upload a satellite image or select an area of interest directly from our interactive map.",
      ref: (el: HTMLDivElement) => (stepsRef.current[0] = el)
    },
    {
      icon: <Cpu size={32} />,
      title: "Process",
      description: "Our AI algorithms analyze the imagery using advanced machine learning models to identify different land cover types.",
      ref: (el: HTMLDivElement) => (stepsRef.current[1] = el)
    },
    {
      icon: <Download size={32} />,
      title: "Download",
      description: "View and download the classified image along with detailed statistical analysis of the land cover distribution.",
      ref: (el: HTMLDivElement) => (stepsRef.current[2] = el)
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div 
        ref={containerRef} 
        className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 opacity-0"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A simple three-step process to get accurate land cover classification results
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={step.ref}
                className="opacity-0 flex flex-col items-center text-center transition-all duration-300"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 rounded-full glassmorphism flex items-center justify-center mb-4 border border-border shadow-subtle">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
