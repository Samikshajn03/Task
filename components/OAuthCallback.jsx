import { toast } from 'react-toastify'
import { exchangeCodeForToken } from '../src/api/oauth'

const OAuthCallback = ({ onSuccess }) => {
  const code = new URLSearchParams(window.location.search).get('code')

   if (!code) {
        toast.error('Authorization code not found')
        return
      }
  try {
    const token = exchangeCodeForToken(code)
    localStorage.setItem('token', token.accessToken)

    toast.success('TikTok Ads account connected successfully!')
    onSuccess(token.accessToken)
  } catch (err) {
    toast.error(err.message)
  }

  return <p>Connecting TikTok Ads account...</p>
}

export default OAuthCallback
