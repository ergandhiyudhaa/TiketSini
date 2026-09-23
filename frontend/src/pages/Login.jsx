import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'

import { useAuth } from '../context/useAuth'

import './Login.css'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const { login } = useAuth()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const redirectTo =
    location.state?.from || '/dashboard'

  function handleChange(event) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))

    if (error) {
      setError('')
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setError('')
    setSubmitting(true)

    try {
      await login(form)
      navigate(redirectTo, { replace: true })
    } catch (requestError) {
      const validationMessage =
        requestError?.data?.errors?.email?.[0] ||
        requestError?.data?.errors?.password?.[0]

      setError(
        validationMessage ||
          requestError?.message ||
          'Unable to sign in. Please check your credentials.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <section className="auth-visual">
          <div className="auth-visual-orb auth-visual-orb-one" />
          <div className="auth-visual-orb auth-visual-orb-two" />

          <div className="auth-visual-content">
            <span className="auth-kicker">
              TIKETSINI
            </span>

            <h1>
              Your next
              <br />
              experience
              <br />
              starts here.
            </h1>

            <p>
              Discover events, grab your tickets,
              and make memories worth keeping.
            </p>

            <div className="auth-visual-ticket">
              <div>
                <span>LIVE EVENT</span>
                <strong>Ready when you are.</strong>
              </div>

              <ArrowRight size={20} />
            </div>
          </div>
        </section>

        <section className="auth-form-panel">
          <div className="auth-form-wrapper">
            <div className="auth-form-heading">
              <span className="auth-mobile-logo">
                Tiket<span>Sini</span>
              </span>

              <span className="auth-eyebrow">
                WELCOME BACK
              </span>

              <h2>Sign in</h2>

              <p>
                Continue your journey with TiketSini.
              </p>
            </div>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >
              <label>
                <span>Email address</span>

                <div className="auth-input">
                  <Mail size={18} />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </label>

              <label>
                <span>Password</span>

                <div className="auth-input">
                  <LockKeyhole size={18} />

                  <input
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current,
                      )
                    }
                    aria-label={
                      showPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </label>

              <button
                className="auth-submit"
                type="submit"
                disabled={submitting}
              >
                {submitting
                  ? 'Signing in...'
                  : 'Sign in'}

                {!submitting && (
                  <ArrowRight size={18} />
                )}
              </button>
            </form>

            <p className="auth-switch">
              Don't have an account?{' '}
              <Link
                to="/register"
                state={{
                  from: redirectTo,
                }}
              >
                Create one
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Login
