export function createAd(data, token) {
  if (!token) throw 'Not authenticated.'

  if (Date.now() > token.expiresAt) {
    throw 'Your TikTok session expired. Please reconnect.'
  }

  if (data.music === 'invalid') {
    throw 'Invalid music selected.'
  }

  return { success: true }
}

export const validateMusicId = async (musicId) => {
  await new Promise((res) => setTimeout(res, 800))

  const APPROVED_MUSIC_IDS = [
    'music_101',
    'music_202',
  ]

  if (!APPROVED_MUSIC_IDS.includes(musicId)) {
    throw new Error('This music ID is not approved for ads.')
  }

  return {
    id: musicId,
    status: 'approved'
  }
}
