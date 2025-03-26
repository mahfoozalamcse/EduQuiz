
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth, UserRole } from '@/context/AuthContext';
import { Navbar } from '@/components/layout/Navbar';

// Form schema
const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  role: z.enum(['student', 'teacher', 'admin'] as const),
});

// Demo credentials
const demoCredentials = [
  { role: 'student', email: 'student@example.com', password: 'password' },
  { role: 'teacher', email: 'teacher@example.com', password: 'password' },
  { role: 'admin', email: 'admin@example.com', password: 'password' },
];

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      role: 'student',
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await login(values.email, values.password, values.role as UserRole);
      // Redirect to the appropriate dashboard based on role
      navigate(`/${values.role}/dashboard`);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fill demo credentials
  const fillDemoCredentials = (role: UserRole) => {
    const credentials = demoCredentials.find(cred => cred.role === role);
    if (credentials) {
      form.setValue('email', credentials.email);
      form.setValue('password', credentials.password);
      form.setValue('role', role);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <Navbar />
      <div className="container mx-auto p-4 flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-fade-in [--animation-delay:200ms]">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground mt-2">
              Enter your credentials to sign in to your account
            </p>
          </div>
          
          <Card className="w-full animate-fade-in [--animation-delay:400ms]">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Access your EduQuiz account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sign in as</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="teacher">Teacher</SelectItem>
                            <SelectItem value="admin">Administrator</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </Button>
                </form>
              </Form>
              
              <div className="mt-4 pt-4 border-t">
                <div className="text-sm text-center text-muted-foreground mb-2">
                  Demo accounts
                </div>
                <div className="flex justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fillDemoCredentials('student')}
                  >
                    Student
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fillDemoCredentials('teacher')}
                  >
                    Teacher
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fillDemoCredentials('admin')}
                  >
                    Admin
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <div className="text-sm text-muted-foreground text-center w-full">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:underline">
                  Create one
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
