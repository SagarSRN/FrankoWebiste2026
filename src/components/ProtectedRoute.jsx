import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()

  if (loading) {
    return <div className="pt-40 text-center text-ink/50 text-sm">Checking session…</div>
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}