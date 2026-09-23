import { useState } from 'react'
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

import './Register.css'

function Register() {
  const navigate = useNavigate()
  const location = useLocation()

  const { register } = useAuth()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] =
    useState(false)

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

    if (form.password !== form.password_confirmation) {
      setError('Passwords do not match.')
      return
    }

    setError('')
    setSubmitting(true)

    try {
      await register(form)
      navigate(redirectTo, { replace: true })
    } catch (requestError) {
      const validationErrors =
        requestError?.data?.errors

      const firstValidationError =
        validationErrors
          ? Object.values(validationErrors)
              .flat()
              .find(Boolean)
          : null

      setError(
        firstValidationError ||
          requestError?.message ||
          'Unable to create your account.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="register-page">
      <div className="register-shell">
        <section className="register-form-panel">
          <div className="register-form-wrapper">
            <div className="register-heading">
              <span className="register-mobile-logo">
                Tiket<span>Sini</span>
              </span>

              <span className="register-eyebrow">
                JOIN TIKETSINI
              </span>

              <h1>Create your account.</h1>

              <p>
                One account for every event,
                experience, and ticket.
              </p>
            </div>

            {error && (
              <div className="register-error">
                {error}
              </div>
            )}

            <form
              className="register-form"
              onSubmit={handleSubmit}
            >
              <label>
                <span>Full name</span>

                <div className="register-input">
                  <UserRound size={18} />

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    autoComplete="name"
                    required
                  />
                </div>
              </label>

              <label>
                <span>Email address</span>

                <div className="register-input">
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

                <div className="register-input">
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
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                    minLength={8}
                    required
                  />

                  <button
                    type="button"
                    className="register-password-toggle"
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

              <label>
                <span>Confirm password</span>

                <div className="register-input">
                  <LockKeyhole size={18} />

                  <input
                    type={
                      showConfirmation
                        ? 'text'
                        : 'password'
                    }
                    name="password_confirmation"
                    value={
                      form.password_confirmation
                    }
                    onChange={handleChange}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                  />

                  <button
                    type="button"
                    className="register-password-toggle"
                    onClick={() =>
                      setShowConfirmation(
                        (current) => !current,
                      )
                    }
                    aria-label={
                      showConfirmation
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    {showConfirmation ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </label>

              <button
                className="register-submit"
                type="submit"
                disabled={submitting}
              >
                {submitting
                  ? 'Creating account...'
                  : 'Create account'}

                {!submitting && (
                  <ArrowRight size={18} />
                )}
              </button>
            </form>

            <p className="register-switch">
              Already have an account?{' '}
              <Link
                to="/login"
                state={{
                  from: redirectTo,
                }}
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>

        <section className="register-visual">
          <div className="register-shape register-shape-one" />
          <div className="register-shape register-shape-two" />

          <div className="register-visual-content">
            <span>MAKE IT YOURS</span>

            <h2>
              More events.
              <br />
              More stories.
              <br />
              More reasons
              <br />
              to go.
            </h2>

            <div className="register-visual-note">
              <strong>TiketSini</strong>
              <p>
                Find something worth showing up for.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Register
