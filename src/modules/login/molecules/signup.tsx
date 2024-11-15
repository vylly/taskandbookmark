'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ISingUpFormInput, SignUpSchema } from "@/services/auth/signup-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import { signup } from "@/services/auth/api";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod";
import { cn } from "@/lib/utils";
import toast from 'react-hot-toast';

export function Signup() {
  const [isPristine, setIsPristine] = useState(true)
  const [passwordMissmatch, setPasswordMissmatch] = useState(false)
  const [comfirmPassword, setComfirmPassword] = useState('')
  const router = useRouter();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
  })

  const onSubmit = async (data: ISingUpFormInput) => {
    setIsPristine(false)
    if(!handleComfirmPassword(data.password)){
      setPasswordMissmatch(true)
      return
    }
    const res = await signup(data)
    if(!res['access_token']) {
      toast.error(res.message)
      return
    }
    toast.remove()
    router.push('/dashboard')
  };

  const handleComfirmPassword = (pass: string) => {
    return comfirmPassword === pass
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
            <CardDescription>
              Create a new account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} type="email"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name & way of loggin in.
                  </FormDescription>
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
                    <Input placeholder="Enter password" {...field} type="password"/>
                  </FormControl>
                  <FormDescription>
                    Choose a strong password 1small + 1capital letter + one number + one special character
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-1">
              <Label htmlFor="comfirmPassword" className={cn(!isPristine && passwordMissmatch && 'text-destructive')}>Comfirm password</Label>
              <Input id="comfirmPassword" placeholder="Comfirm password" type="password" value={comfirmPassword} onChange={(e) => {
                setComfirmPassword(e.target.value)
                setIsPristine(true)
                setPasswordMissmatch(false)
                }}/>
              {(!isPristine && passwordMissmatch) && (
                <p className="text-[0.8rem] font-medium text-destructive">Password missmatch</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Create your account</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

