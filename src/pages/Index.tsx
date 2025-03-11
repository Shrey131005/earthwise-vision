
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Process from '@/components/home/Process';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Process />
        
        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted By Researchers Worldwide</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See how our platform is helping professionals in environmental monitoring and urban planning.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-background rounded-xl p-6 shadow-subtle">
                <div className="mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4e7a3e" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground italic mb-5">
                  "This platform has revolutionized how we monitor deforestation in the Amazon. The accuracy of classification and ease of use is unmatched."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-earth-300 to-earth-500 flex items-center justify-center text-white font-medium">
                    DR
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Dr. Ramirez</p>
                    <p className="text-xs text-muted-foreground">Environmental Scientist</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-background rounded-xl p-6 shadow-subtle">
                <div className="mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4e7a3e" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground italic mb-5">
                  "The statistical analysis tools save me hours of work each week. I can quickly assess urban growth patterns and generate reports for stakeholders."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-water-300 to-water-500 flex items-center justify-center text-white font-medium">
                    JC
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">James Chen</p>
                    <p className="text-xs text-muted-foreground">Urban Planner</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-background rounded-xl p-6 shadow-subtle">
                <div className="mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4e7a3e" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground italic mb-5">
                  "The API integration allowed us to build our climate monitoring dashboard with real-time land cover data. It's been seamless."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-stone-300 to-stone-500 flex items-center justify-center text-white font-medium">
                    SD
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Sarah Davis</p>
                    <p className="text-xs text-muted-foreground">Software Engineer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578344172836-376ef253d809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-r from-earth-600/90 to-earth-900/90"></div>
              
              <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Analyze Your Region?
                </h2>
                <p className="text-white/80 max-w-2xl mb-8">
                  Start classifying land cover today and unlock valuable insights for your environmental research or urban planning projects.
                </p>
                <a 
                  href="/upload" 
                  className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium bg-white text-earth-900 shadow hover:bg-white/90 transition-colors"
                >
                  Get Started Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
