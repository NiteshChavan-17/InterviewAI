import React from 'react'
import '../style/home.css'

const Home = () => {
  return (
    <main className='home'>
        <div className="interview-input-group">
            <div className="left">
                <label htmlFor="JobDescription">Job Description</label>
                <textarea name="jobDescription" id="jobDescription" placeholder='Enter the job description here...'></textarea>
            </div>

            <div className="right">
                <div className="input-group">
                    <p>Resume <small className='highlight'>(Use resume and self description for best results)</small></p>
                    <label className='file-label' htmlFor="resume">Upload Resume</label>
                    <input hidden type='file' name='resume' id='resume' accept='.pdf'/>
                </div>

                <div className="input-group">
                    <label htmlFor="selfDescription">Self Description</label>
                    <textarea name="selfDescription" id="selfDescription" placeholder='Describe yourself in few sentences'></textarea>
                </div>

                <button className='button primary-button'>Generate Interview Report</button>
            </div>
        </div>
    </main>
  )
}

export default Home