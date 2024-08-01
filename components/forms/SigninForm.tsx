"use client";

import { useState } from "react";
import Link from "next/link";
import { login } from '../../utils/auth';
import { useRouter } from 'next/navigation';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Toaster,toast } from 'react-hot-toast';

export function SigninForm() {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      if (res.success) {
        localStorage.setItem('authToken', res.token);
        localStorage.setItem('userId', res.userId);
        toast.success('Login successful');
        router.push(`/profile/${res.userId}`);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error, 'res111');
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };
 

  return (
    <div className="w-full max-w-md">
       <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
            <CardDescription>
              Enter your details to sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="text"
                placeholder="username or email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <button type="submit" className="w-full">
              Sign In
            </button>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Don't have an account?
          <Link className="underline ml-2" href="signup">
            Sign Up
          </Link>
        </div>
      </form>
      <Toaster/>
    </div>
  );
}
