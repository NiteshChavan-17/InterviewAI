import React, { useState,useEffect } from 'react'
import { Code2, MessageCircle, Map, ChevronDown } from 'lucide-react'
import '../style/interview.css'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'



const NAV_ITEMS = [
  { id: 'technical', label: 'Technical Questions', icon: Code2 },
  { id: 'behavioral', label: 'Behavioral Questions', icon: MessageCircle },
  { id: 'roadmap', label: 'Road Map', icon: Map }
]

// Circular match score gauge
const MatchScoreRing = ({ score }) => {
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  let statusText = 'Needs preparation'
  if (score >= 80) statusText = 'Strong match for this role'
  else if (score >= 60) statusText = 'Good match for this role'

  return (
    <div className="match-score-block">
      <p className="sidebar-label">Match Score</p>
      <div className="match-score-ring">
        <svg width="110" height="110" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} className="ring-bg" />
          <circle
            cx="50" cy="50" r={radius}
            className="ring-fg"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="match-score-value">
          <span>{score}</span>
          <small>%</small>
        </div>
      </div>
      <p className="match-score-status">{statusText}</p>
    </div>
  )
}

// Accordion question card
const QuestionAccordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="question-list">
      {items.map((q, i) => {
        const isOpen = openIndex === i
        return (
          <div className={`question-card ${isOpen ? 'open' : ''}`} key={i}>
            <button
              className="question-header"
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
            >
              <span className="q-number">Q{i + 1}</span>
              <span className="q-text">{q.question}</span>
              <ChevronDown size={18} className="q-chevron" />
            </button>

            {isOpen && (
              <div className="question-body">
                <span className="tag tag-intention">Intention</span>
                <p className="question-meta">{q.intention}</p>

                <span className="tag tag-answer">Model Answer</span>
                <p className="question-answer">{q.answer}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

const Interview = () => {
  const [activeTab, setActiveTab] = useState('technical')
  const {report, getReportbyId} = useInterview();
  const {interviewId} = useParams();

  useEffect(()=> {
    if(interviewId) {
      getReportbyId({InterviewId :interviewId});
    }
  },[interviewId])

  if (!report) {
    return (
      <main className="interview loading-screen">
        <div className="interview-loading">Loading your report...</div>
      </main>
    )
  }

  const renderContent = () => {
    if (activeTab === 'technical') {
      return (
        <>
          <div className="content-header">
            <h2>Technical Questions</h2>
            <span className="count-badge">{report.technicalQuestions.length} questions</span>
          </div>
          <QuestionAccordion items={report.technicalQuestions} />
        </>
      )
    }

    if (activeTab === 'behavioral') {
      return (
        <>
          <div className="content-header">
            <h2>Behavioral Questions</h2>
            <span className="count-badge">{report.behavioralQuestions.length} questions</span>
          </div>
          <QuestionAccordion items={report.behavioralQuestions} />
        </>
      )
    }

    if (activeTab === 'roadmap') {
      return (
        <>
          <div className="content-header">
            <h2>Preparation Road Map</h2>
            <span className="count-badge">{report.preparationPlan.length}-day plan</span>
          </div>

          <div className="roadmap-timeline">
            {report.preparationPlan.map((day) => (
              <div className="roadmap-item" key={day.day}>
                <div className="roadmap-dot" />
                <div className="roadmap-content">
                  <span className="day-badge">Day {day.day}</span>
                  <h3>{day.focus}</h3>
                  <ul>
                    {day.tasks.map((task, i) => (
                      <li key={i}>{task}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </>
      )
    }

    return null
  }

  return (
    <main className="interview">
      <div className="interview-panel">

        {/* Left sidebar */}
        <aside className="interview-sidebar-left">
          <p className="sidebar-label">Sections</p>
          <nav>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Center content */}
        <section className="interview-main">
          {renderContent()}
        </section>

        {/* Right sidebar */}
        <aside className="interview-sidebar-right">
          <MatchScoreRing score={report.matchScore} />

          <p className="sidebar-label">Skill Gaps</p>
          <div className="skill-chip-group">
            {report.skillGaps.map((gap, i) => (
              <span className={`skill-chip severity-${gap.severity}`} key={i}>
                {gap.skill}
              </span>
            ))}
          </div>
        </aside>

      </div>
    </main>
  )
}

export default Interview
