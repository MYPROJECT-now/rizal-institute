"use client"

import React, { useEffect, useState } from 'react'
import { useAuth, useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import {
    Dialog,
    DialogContent,
    DialogTitle,
  } from "@/components/ui/dialog"
import { useResetPasswordModal } from '@/src/store/LANDING_PAGE/landing_page'
import { Button } from '@/components/ui/button'

  
  
export const ResetPass = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [successfulCreation, setSuccessfulCreation] = useState(false)
    const [secondFactor, setSecondFactor] = useState(false)
    const [error, setError] = useState('')
    const { isOpen, close } = useResetPasswordModal();
  
    const router = useRouter()
    const { isSignedIn } = useAuth()
    const { isLoaded, signIn, setActive } = useSignIn()
  
    useEffect(() => {
      if (isSignedIn) {
        router.push('/')
      }
    }, [isSignedIn, router])
  
    if (!isLoaded) {
      return null
    }
  
    async function create(e: React.FormEvent) {
      e.preventDefault()
      await signIn
        ?.create({
          strategy: 'reset_password_email_code',
          identifier: email,
        })
        .then(() => {
          setSuccessfulCreation(true)
          setError('')
        })
        .catch((err) => {
          console.error('error', err.errors[0].longMessage)
          setError(err.errors[0].longMessage)
        })
    }
  
    async function reset(e: React.FormEvent) {
      e.preventDefault()
      await signIn
        ?.attemptFirstFactor({
          strategy: 'reset_password_email_code',
          code,
          password,
        })
        .then((result) => {
          if (result.status === 'needs_second_factor') {
            setSecondFactor(true)
            setError('')
          } else if (result.status === 'complete') {
            setActive({ session: result.createdSessionId })
            setError('')
          } else {
            console.log(result)
          }
        })
        .catch((err) => {
          console.error('error', err.errors[0].longMessage)
          setError(err.errors[0].longMessage)
        })
    }

    
    return (
<Dialog open={isOpen} onOpenChange={close}>
  <DialogContent className="w-[500px] p-8 gap-10">
    <DialogTitle className="text-lg font-bold text-center">
      Reset Password
    </DialogTitle>
    <div className="flex flex-col gap-4">
      <form onSubmit={!successfulCreation ? create : reset} className="flex flex-col gap-4">
        {!successfulCreation && (
          <>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm text-gray-600">
                Provide your email address
              </label>
              <input
                type="email"
                placeholder="e.g john@doe.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dGreen"
              />
            </div>
            <Button
              type="submit"
              variant="confirmButton"
              // className="py-2 px-4 bg-lGreen text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lGreen"
              className="py-2 px-4 rounded-lg"
              disabled={!email}
            >
              Send password reset code
            </Button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </>
        )}

        {successfulCreation && (
          <>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm text-gray-600">
                Enter your new password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dGreen"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm text-gray-600">
                Enter the password reset code that was sent to your email
              </label>
              <input
                type="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dGreen"
              />
            </div>
            <Button
              type="submit"
              variant="confirmButton"
              // className="py-2 px-4 bg-lGreen text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-lGreen"
              className="py-2 px-4 rounded-lg"
              disabled={!password || !code}
            >
              Reset
            </Button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </>
        )}

        {secondFactor && (
          <p className="text-sm text-gray-600">
            2FA is required, but this UI does not handle that
          </p>
        )}
      </form>
    </div>
  </DialogContent>
</Dialog>
    )
  }