
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ResultsView from '@/components/results/ResultsView';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Results = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Classification Results</h1>
                <p className="text-muted-foreground">
                  Analysis of urban area in San Francisco, CA
                </p>
              </div>
              <div className="flex space-x-3 mt-4 sm:mt-0">
                <Link
                  to="/upload"
                  className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium border hover:bg-accent transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  New Analysis
                </Link>
              </div>
            </div>
          </div>
          
          <ResultsView />
          
          <div className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-background border rounded-xl p-5 shadow-subtle">
                <h3 className="font-medium mb-2">Understanding the Results</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn how to interpret your land classification results and what each category represents.
                </p>
                <a href="#" className="text-primary text-sm font-medium inline-flex items-center">
                  Read Guide
                  <ArrowRight className="ml-1 h-3 w-3" />
                </a>
              </div>
              <div className="bg-background border rounded-xl p-5 shadow-subtle">
                <h3 className="font-medium mb-2">Time Series Analysis</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Compare multiple analyses over time to detect changes in land use and cover.
                </p>
                <a href="#" className="text-primary text-sm font-medium inline-flex items-center">
                  Try Time Series
                  <ArrowRight className="ml-1 h-3 w-3" />
                </a>
              </div>
              <div className="bg-background border rounded-xl p-5 shadow-subtle">
                <h3 className="font-medium mb-2">Export to GIS Software</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn how to export your results to common GIS software for further analysis.
                </p>
                <a href="#" className="text-primary text-sm font-medium inline-flex items-center">
                  View Tutorial
                  <ArrowRight className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Results;
