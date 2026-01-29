import React, { useState } from 'react'
import ErrorBanner from './ErrorBanner';
import MusicSelector from './MusicSelector';
import { createAd } from '../src/api/tiktockApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.css';

const AdForm = ({token}) => {
    const[campaign, setCampaign]= useState('');
    const[error,setError]= useState(null);
    const[objective, setObjective]=useState('');
    const[adText, setAdText]= useState('');
    const[cta, setCta]= useState('');
    const[music, setMusic]= useState(null);
    const [success, setSuccess] = useState(false)

   const handleSubmit = async () => {
  setError(null);
  setSuccess(false);

  if (campaign.length < 3) {
    setError("Campaign name must be at least 3 characters.");
    return;
  }

  if (adText.length === 0 || adText.length > 100) {
    setError("Ad Text length must be between 1 to 100 characters.");
    return;
  }

  try {
    await createAd(
      { campaign, objective, adText, cta, music },
      token
    );
    toast.success("Ad Form submited Successfully!!");
    setTimeout(() => {
  window.location.href = '/'
}, 5000)
  } catch (err) {
    setError(err?.message || "Something went wrong");
  }
};



  return (
    <div className='form'>
         {error && <ErrorBanner message={error} />}
        <div className='heading'>
            Ad Form
        </div>
        <div className='fields'>
            <div className='individual-field'>
            <label>Campaign Name:</label>
            <input 
            className='input'
            placeholder='Campaign Name'
            value={campaign}
            onChange={(e) =>setCampaign(e.target.value)} />
            </div>

            <div className='individual-field'>
                <label>Objective:</label>
            <select 
            className='input'
            value={objective} 
            onChange={(e)=> setObjective(e.target.value)}>
            <option>Traffic</option>
            <option>Conversions</option>
             </select></div>


             <div className='individual-field'>
                <label>Ad Text:</label>
             <textarea
             className='input'
             placeholder='Ad Text'
             value={adText}
             onChange={(e)=>setAdText(e.target.value)}
             /></div>


             <div className='individual-field'>
                 <label>CTA:</label>
            <select 
            className='input'
             value={cta} 
             onChange={(e) => setCta(e.target.value)}>
            <option value="">Select CTA</option>
            <option>Learn More</option>
            <option>Shop Now</option>
             </select>
             </div>

            <MusicSelector objective={objective} onSelect={setMusic} />

            <button onClick={handleSubmit} disabled={success}>Submit Ad</button>


        </div>
        <ToastContainer />
    </div>
  )
}

export default AdForm