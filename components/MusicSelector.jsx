import React, { useState, useEffect } from 'react'
import { validateMusicId } from '../src/api/tiktockApi'

const MusicSelector = ({ objective, onSelect }) => {
  const [option, setOption] = useState('')
  const [musicId, setMusicId] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    setOption('')
    setMusicId('')
    setError(null)
    onSelect(null)
  }, [objective])

  const validateMusic = async (id) => {
    if (!id) return

    setLoading(true)
    setError(null)

    try {
      const res = await validateMusicId(id)
      onSelect(res.id)
    } catch (err) {
      setError(err.message || 'Invalid music ID')
      onSelect(null)
    } finally {
      setLoading(false)
    }
  }

  const handleNoMusic = () => {
    setOption('none')

    if (objective === 'Conversions') {
      setError('Music is required for conversion campaigns.')
      onSelect(null)
      return
    }

    setError(null)
    onSelect(null)
  }

  return (
    <div className="music-section">
      <h4>Music</h4>

      
      <label>
        <input
          type="radio"
          name="music"
          onChange={() => {
            setOption('existing')
            setMusicId('')
            setError(null)
            onSelect(null)
          }}
        />
        Existing Music ID
      </label>

      {option === 'existing' && (
        <input
        className='input'
          placeholder="Enter Existing Music ID"
          value={musicId}
          onChange={(e) => setMusicId(e.target.value)}
          onBlur={() => validateMusic(musicId)}
        />
      )}

      
      <label>
        <input
          type="radio"
          name="music"
          onChange={() => {
            setOption('upload')
            setMusicId('')
            setError(null)
            onSelect(null)
          }}
        />
        Upload / Custom Music
      </label>

      {option === 'upload' && (
        <input
        className='input'
          placeholder="Enter Custom Music Name"
          value={musicId}
          onChange={(e) => setMusicId(e.target.value)}
          onBlur={() => {
            const generatedId = `uploaded_${musicId || 'music'}`
            validateMusic(generatedId)
          }}
        />
      )}

      <label>
        <input
          type="radio"
          name="music"
          onChange={handleNoMusic}
        />
        No Music
      </label>

      {loading && <p>Validating music...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default MusicSelector
