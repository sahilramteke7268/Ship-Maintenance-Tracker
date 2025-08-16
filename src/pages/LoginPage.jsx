
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp } from '../context/AppContext';
import { Ship, Lock, Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = state.users.find(
        u => u.email === email && u.password === password
      );

      if (user) {
        dispatch({ type: 'SET_CURRENT_USER', payload: user });
        dispatch({ type: 'SET_AUTHENTICATED', payload: true });
        toast({
          title: 'Welcome back!',
          description: `Logged in as ${user.role}`,
        });
        navigate('/');
      } else {
        toast({
          title: 'Login failed',
          description: 'Invalid credentials. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred during login.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-100 via-sky-200 to-fuchsia-100">
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-white shadow rounded-2xl flex items-center justify-center mb-4">
          <Ship className="w-8 h-8 text-sky-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Maintenance Tracker</h1>
        <p className="text-gray-500 font-medium">Maintenance Management</p>
      </div>
      <Card className="border-0 shadow-xl bg-white/95">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-sky-700">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-sky-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="pl-12 py-3 rounded-lg border border-sky-200 focus:border-sky-500 bg-white transition-all shadow-sm focus:shadow-md outline-none"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-sky-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="pl-12 py-3 rounded-lg border border-sky-200 focus:border-sky-500 bg-white transition-all shadow-sm focus:shadow-md outline-none"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-700 transition-colors text-white font-semibold rounded-lg py-3 mt-2 shadow"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-6 p-4 bg-sky-50 rounded-md">
            <p className="text-sm font-medium text-sky-800 mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-xs text-sky-700">
              <p><strong>Admin:</strong> admin@entnt.in / admin123</p>
              <p><strong>Inspector:</strong> inspector@entnt.in / inspect123</p>
              <p><strong>Engineer:</strong> engineer@entnt.in / engine123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

};

export default LoginPage;
