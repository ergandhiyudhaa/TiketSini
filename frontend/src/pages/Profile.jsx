import { useEffect, useState } from 'react'
import { ArrowLeft, Check, Lock, Mail, Save, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { updateProfile } from '../services/profileService'
import './Profile.css'

function Profile() {
  const { user, loading: authLoading, setUser } = useAuth()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        password_confirmation: '',
      })
    }
  }, [user])

  function handleChange(event) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setSaving(true)
    setMessage('')
    setError('')

    try {
      const payload = {
        name: form.name,
        email: form.email,
      }

      if (form.password) {
        payload.password = form.password
        payload.password_confirmation = form.password_confirmation
      }

      const response = await updateProfile(payload)

      if (response.user) {
        setUser(response.user)
        localStorage.setItem(
          'tiketsini_auth_user',
          JSON.stringify(response.user),
        )
      }

      setForm((current) => ({
        ...current,
        password: '',
        password_confirmation: '',
      }))

      setMessage('Profile updated successfully.')
    } catch (err) {
      const validationErrors = err?.errors

      if (validationErrors) {
        const firstError = Object.values(validationErrors).flat()[0]
        setError(firstError || 'Unable to update your profile.')
      } else {
        setError(err?.message || 'Unable to update your profile.')
      }
    } finally {
      setSaving(false)
    }
  }

  if (authLoading) {
    return (
      <main className="profile-page">
        <div className="profile-container profile-loading">
          Loading profile...
        </div>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="profile-page">
        <div className="profile-container profile-empty">
          <h1>Profile</h1>
          <p>Please login to manage your profile.</p>
          <Link to="/login" className="profile-button">
            Login
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="profile-page">
      <div className="profile-container">
        <Link to="/dashboard" className="profile-back">
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        <section className="profile-header">
          <div className="profile-avatar">
            {(user.name || 'U').charAt(0).toUpperCase()}
          </div>

          <div>
            <span className="profile-label">MY PROFILE</span>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
        </section>

        <section className="profile-card">
          <div className="profile-card-heading">
            <div>
              <span className="profile-label">ACCOUNT INFORMATION</span>
              <h2>Edit your profile</h2>
            </div>
          </div>

          {message && (
            <div className="profile-alert profile-alert-success">
              <Check size={18} />
              {message}
            </div>
          )}

          {error && (
            <div className="profile-alert profile-alert-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="profile-form-grid">
              <label className="profile-field">
                <span>Name</span>
                <div className="profile-input-wrap">
                  <User size={18} />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                  />
                </div>
              </label>

              <label className="profile-field">
                <span>Email</span>
                <div className="profile-input-wrap">
                  <Mail size={18} />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>
              </label>

              <label className="profile-field">
                <span>New Password</span>
                <div className="profile-input-wrap">
                  <Lock size={18} />
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current password"
                    autoComplete="new-password"
                  />
                </div>
              </label>

              <label className="profile-field">
                <span>Confirm New Password</span>
                <div className="profile-input-wrap">
                  <Lock size={18} />
                  <input
                    type="password"
                    name="password_confirmation"
                    value={form.password_confirmation}
                    onChange={handleChange}
                    placeholder="Repeat your new password"
                    autoComplete="new-password"
                  />
                </div>
              </label>
            </div>

            <div className="profile-form-footer">
              <p>
                Password changes are optional. Leave both password fields
                empty if you only want to update your personal information.
              </p>

              <button
                type="submit"
                className="profile-save-button"
                disabled={saving}
              >
                <Save size={17} />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}

export default Profile
