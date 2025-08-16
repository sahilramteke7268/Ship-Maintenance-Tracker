import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp } from '../context/AppContext';
import { Ship, Lock, Mail, Eye, EyeOff, Waves, Anchor } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
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

  const demoCredentials = [
    { role: 'Admin', email: 'admin@entnt.in', password: 'admin123', color: 'bg-red-500' },
    { role: 'Inspector', email: 'inspector@entnt.in', password: 'inspect123', color: 'bg-blue-500' },
    { role: 'Engineer', email: 'engineer@entnt.in', password: 'engine123', color: 'bg-green-500' }
  ];

  const fillCredentials = (credential) => {
    setEmail(credential.email);
    setPassword(credential.password);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        />
        
        {/* Floating Ships */}
        <div className="absolute top-20 left-10 opacity-10 animate-pulse">
          <Ship className="w-12 h-12 text-white transform rotate-12" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10 animate-pulse" style={{ animationDelay: '1000ms' }}>
          <Anchor className="w-8 h-8 text-white transform -rotate-12" />
        </div>
        <div className="absolute top-40 right-20 opacity-10 animate-pulse" style={{ animationDelay: '500ms' }}>
          <Waves className="w-10 h-10 text-white" />
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1000ms' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '500ms' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="relative mx-auto w-20 h-20 mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl shadow-2xl transform rotate-6"></div>
              <div className="relative w-full h-full bg-white rounded-2xl flex items-center justify-center shadow-xl">
                <Ship className="w-10 h-10 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent mb-3">
              Maintenance Tracker
            </h1>
            <p className="text-blue-200 font-medium text-lg">Ship Management System</p>
          </div>

          {/* Login Card */}
          <Card className="border-0 shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center text-white mb-2">
                Welcome Back
              </CardTitle>
              <p className="text-blue-200 text-center text-sm">Sign in to your account</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-medium">Email Address</Label>
                  <div className="relative group">
                    <Mail className={`absolute left-4 top-4 h-5 w-5 transition-colors ${
                      focusedField === 'email' ? 'text-cyan-400' : 'text-blue-300'
                    }`} />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="pl-12 py-4 rounded-xl border-0 bg-white/10 backdrop-blur-sm text-white placeholder:text-blue-200 focus:bg-white/20 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-0 transition-all duration-300 shadow-lg hover:shadow-xl"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white font-medium">Password</Label>
                  <div className="relative group">
                    <Lock className={`absolute left-4 top-4 h-5 w-5 transition-colors ${
                      focusedField === 'password' ? 'text-cyan-400' : 'text-blue-300'
                    }`} />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      className="pl-12 pr-12 py-4 rounded-xl border-0 bg-white/10 backdrop-blur-sm text-white placeholder:text-blue-200 focus:bg-white/20 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-0 transition-all duration-300 shadow-lg hover:shadow-xl"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-4 text-blue-300 hover:text-cyan-400 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl py-4 mt-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-8 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <p className="text-white font-semibold mb-4 text-center">Quick Demo Access</p>
                <div className="space-y-3">
                  {demoCredentials.map((credential, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all cursor-pointer group" 
                      onClick={() => fillCredentials(credential)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${credential.color}`}></div>
                        <div>
                          <p className="text-white font-medium text-sm">{credential.role}</p>
                          <p className="text-blue-200 text-xs">{credential.email}</p>
                        </div>
                      </div>
                      <span className="text-cyan-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to use
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-blue-300 text-xs text-center mt-3">
                  Click on any role above to auto-fill credentials
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-blue-300 text-sm">
              Secure • Reliable • Professional
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
