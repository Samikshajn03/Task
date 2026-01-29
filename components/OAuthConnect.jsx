import React from 'react'
import Button from './Button'

const OAuthConnect = () => {

    const handleConnect=()=>{
        window.location.href ='/oauth-callback?code=mock_code'
    }

  return (
    <div>
        <div className='connect-button'>
            <Button
             text="Connect TikTok Ads Account "
             onClick={handleConnect }
             />
        </div>
    </div>
  )
}

export default OAuthConnect