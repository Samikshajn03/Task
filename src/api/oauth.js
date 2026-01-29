export function exchangeCodeForToken(code) {
  if (code !== 'mock_code') {
    throw new Error('Invalid authorization code.')
  }

  return {
    accessToken: 'mock_access_token',
    expiresAt: Date.now() + 60 * 60 * 1000,
  }
}
