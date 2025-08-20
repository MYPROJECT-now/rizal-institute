'use client'
import React, { useEffect, useState } from 'react'
import { useAuth, useSignIn } from '@clerk/nextjs'
import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const ForgotPasswordPage: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [successfulCreation, setSuccessfulCreation] = useState(false)
  const [secondFactor, setSecondFactor] = useState(false)
  const [error, setError] = useState('')

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
    <div>
      <h1>Forgot Password?</h1>
      <form onSubmit={!successfulCreation ? create : reset}>
        {!successfulCreation && (
          <>
            <label htmlFor="email">Provide your email address</label>
            <input
              type="email" 
              placeholder="e.g john@doe.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-gray-300 rounded px-3 py-1 focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
            />

            <Button>Send password reset code</Button>
            {error && <p>{error}</p>}
          </>
        )}

        {successfulCreation && (
          <>
            <label htmlFor="password">Enter your new password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <label htmlFor="password">
              Enter the password reset code that was sent to your email
            </label>
            <input type="code" value={code} onChange={(e) => setCode(e.target.value)} />

            <button>Reset</button>
            {error && <p>{error}</p>}
          </>
        )}

        {secondFactor && <p>2FA is required, but this UI does not handle that</p>}
      </form>
    </div>
  )
}

export default ForgotPasswordPage