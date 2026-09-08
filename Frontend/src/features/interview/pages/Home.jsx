import React, {useState, useRef, useEffect} from 'react'
import '../style/home.css'
import { UploadCloud } from 'lucide-react'
import { Briefcase, User, Sparkles, FileText, X } from 'lucide-react'
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router'

const Home = () => {

    const {loading,generateReport, reports, getReports} = useInterview();
    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription,setSelfDescription] = useState("");
    const resumeInputRef = useRef();

    const navigate = useNavigate()

    useEffect(() => {
        getReports();
    }, []);

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({jobDescription,selfDescription,resumeFile});
        navigate(`/interview/${data._id}`);
    }

    if(loading) {
        return (
            <main className='loading-screen'>
                <h1>Loading your Interview plan...</h1>
            </main>
        )
    }

  return (
    <main className='home'>
        <div className="home-header">
            <h1>Create Your Custom <span className='accent-text'>Interview Plan</span></h1>
            <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
        </div>

        <div className="interview-input-group">
            <div className="left">
                <div className="section-title">
                    <Briefcase size={16} className="icon-pink" />
                    <label htmlFor="jobDescription">Target Job Description</label>
                    <span className="required-badge">Required</span>
                </div>
                <textarea onChange={(e)=>setJobDescription(e.target.value)} name="jobDescription" id="jobDescription" placeholder='Enter the job description here...'></textarea>
            </div>

            <div className="right">
                <div className="input-group">
                    <p>
                        <User size={16} className="icon-purple" />
                        Resume <small className='highlight'>(Use resume and self description for best results)</small>
                    </p>
                    <label className='file-label' htmlFor="resume">
                        <UploadCloud size={20} className="upload-icon" />
                        <br></br>
                        <span className="upload-text">Upload Resume</span>
                        <p className="upload-hint">PDF or DOCX (Max 3MB)</p>
                    </label>
                    <input ref={resumeInputRef} hidden type='file' name='resume' id='resume' accept='.pdf'/>


                    <label htmlFor="selfDescription" className='self-desc'>Self Description</label>
                    <textarea onChange={(e)=>setSelfDescription(e.target.value)} name="selfDescription" id="selfDescription" placeholder='Describe yourself in few sentences'></textarea>

                    <div className="info-note">
                        Both your <strong>Resume</strong> and <strong>Self Description</strong> are required to generate a personalized plan.
                    </div>
                </div>

                <button className='button primary-button' onClick={handleGenerateReport}>
                    <Sparkles size={16} />
                    Generate Interview Report
                </button>
            </div>
        </div>

        {reports.length>0 && (
            <section className='recent-reports'>
                <h2>My Recent Interview Plans</h2>

                <ul className='report-list'>
                    {reports.map(report=> (
                        <li key={report._id} className='report-item' onClick={()=>navigate(`/interview/${report._id}`)}>
                            <h3>{report.title || 'Untitled Position'}</h3>
                            <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            </section>
        )}
    </main>
  )
}

export default Home
