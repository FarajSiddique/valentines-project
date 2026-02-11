import { useState, useEffect, useCallback } from 'react'
import './App.css'

function FallingHeart({ style }) {
  return (
    <div className="falling-heart" style={style}>
      &#10084;
    </div>
  )
}

function App() {
  const [noCount, setNoCount] = useState(0)
  const [accepted, setAccepted] = useState(false)
  const [hearts, setHearts] = useState([])
  const [showEnvelope, setShowEnvelope] = useState(true)
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const noMessages = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You're breaking my heart!",
    "I'm gonna cry...",
    "Please? 🥺",
    "Pretty please?",
    "Don't do this to me!",
    "I refuse to accept!",
    "You're kidding right?",
  ]

  const spawnHearts = useCallback(() => {
    const newHearts = Array.from({ length: 50 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
      size: 15 + Math.random() * 25,
      opacity: 0.5 + Math.random() * 0.5,
    }))
    setHearts(newHearts)
  }, [])

  useEffect(() => {
    const bgHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 8,
      size: 10 + Math.random() * 18,
      opacity: 0.15 + Math.random() * 0.2,
    }))
    setHearts(bgHearts)
  }, [])

  const handleYes = () => {
    setAccepted(true)
    spawnHearts()
  }

  const handleOpenEnvelope = () => {
    setEnvelopeOpen(true)
    setTimeout(() => {
      setShowEnvelope(false)
      setShowContent(true)
    }, 1200)
  }

  const yesScale = 1 + noCount * 0.2
  const noText = noMessages[Math.min(noCount, noMessages.length - 1)]

  if (showEnvelope && !showContent) {
    return (
      <div className="app envelope-screen">
        {hearts.map((h) => (
          <FallingHeart
            key={h.id}
            style={{
              left: `${h.left}%`,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.duration}s`,
              fontSize: `${h.size}px`,
              opacity: h.opacity,
            }}
          />
        ))}
        <div className="envelope-container" onClick={!envelopeOpen ? handleOpenEnvelope : undefined}>
          <div className={`envelope ${envelopeOpen ? 'open' : ''}`}>
            <div className="envelope-top" />
            <div className="envelope-body">
              <div className="envelope-letter">
                <p className="letter-heart">&#10084;</p>
                <p className="letter-text">For Mandy</p>
              </div>
            </div>
          </div>
          {!envelopeOpen && <p className="tap-text">Tap to open</p>}
        </div>
      </div>
    )
  }

  if (accepted) {
    return (
      <div className="app celebration">
        {hearts.map((h) => (
          <FallingHeart
            key={h.id}
            style={{
              left: `${h.left}%`,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.duration}s`,
              fontSize: `${h.size}px`,
              opacity: h.opacity,
            }}
          />
        ))}
        <div className="celebration-content">
          <div className="big-heart-pulse">&#10084;</div>
          <h1 className="celebration-title">Yaaay!!</h1>
          <p className="celebration-text">
            I knew you'd say yes, Mandy!
          </p>
          <p className="celebration-subtext">
            Happy Valentine's Day, my love
          </p>
          <div className="heart-divider">
            &#10084; &#10084; &#10084;
          </div>
          <p className="celebration-footer">
            You just made me the happiest person ever
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="app proposal">
      {hearts.map((h) => (
        <FallingHeart
          key={h.id}
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
          }}
        />
      ))}
      <div className="proposal-content fade-in">
        <div className="rose-decoration top-rose">&#127801;</div>
        <h1 className="proposal-title">Hey Mandy,</h1>
        <div className="heart-icon pulse">&#10084;</div>
        <h2 className="proposal-question">Will you be my Valentine?</h2>
        <div className="buttons-container">
          <button
            className="btn btn-yes"
            style={{ transform: `scale(${yesScale})` }}
            onClick={handleYes}
          >
            Yes!
          </button>
          <button
            className="btn btn-no"
            onClick={() => setNoCount(noCount + 1)}
          >
            {noText}
          </button>
        </div>
        <div className="rose-decoration bottom-rose">&#127801;</div>
      </div>
    </div>
  )
}

export default App
