
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { GraduationCap, BookOpen, Award, Box, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  useEffect(() => {
    // Animation sequence for staggered entry
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const { user } = useAuth();
  
  const getDashboardLink = () => {
    if (!user) return '/login';
    
    switch(user.role) {
      case 'student':
        return '/student/dashboard';
      case 'teacher':
        return '/teacher/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/login';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 lg:pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 animate-fade-in">
              <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-primary/10 text-primary">
                Educational Platform
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-in [--animation-delay:200ms]">
              Elevate your learning experience with <span className="text-primary">ClassPulse </span>

              Library powerd by <span className="text-primary">ABESIT - Student</span> 
              
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8 animate-fade-in [--animation-delay:400ms]">
              An intuitive platform for computer science education with interactive quizzes, 
              performance tracking, and intelligent attendance management.
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in [--animation-delay:600ms]">
              <Link to={getDashboardLink()}>
                <Button size="lg" className="rounded-full">
                  {user ? 'Go to Dashboard' : 'Get Started'} 
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="rounded-full">
                  Learn more
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-on-scroll opacity-0">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Learning Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers a range of features designed to enhance the learning experience 
              for students, teachers, and administrators.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-sm animate-on-scroll opacity-0 [--animation-delay:200ms]">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Interactive Quizzes</h3>
                <p className="text-muted-foreground">
                  Engage with subject-specific quizzes designed to test and enhance your knowledge.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm animate-on-scroll opacity-0 [--animation-delay:400ms]">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Performance Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor your progress with detailed analytics and performance metrics.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm animate-on-scroll opacity-0 [--animation-delay:600ms]">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Box className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Automated Attendance</h3>
                <p className="text-muted-foreground">
                  Attendance is automatically marked when you achieve a score of 60% or higher.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm animate-on-scroll opacity-0 [--animation-delay:800ms]">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
                <p className="text-muted-foreground">
                  Tailored experiences for students, teachers, and administrators.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center justify-between animate-on-scroll opacity-0">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl font-bold mb-2">Ready to enhance your learning?</h2>
              <p className="text-muted-foreground max-w-lg">
                Join ClassPulse today powerd by ABESIT institute and experience a new way of learning with interactive quizzes, 
                performance tracking, and more.
              </p>
            </div>
            <Link to="/register">
              <Button size="lg" className="whitespace-nowrap">
                Sign up now
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © 2023 ClassPulse. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
