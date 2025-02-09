import { useState } from "react"

const Card = ({ title }) => {
  const [hasLiked, setHasLiked] = useState(false);
  return (
    <div className="card">
      <h2>{title}</h2>
      <button onClick={() => setHasLiked(!hasLiked)}>
        {hasLiked ? '❤️' : '🤍'}
      </button>
    </div>
  )
}

const App = () => {
  return (
    <div className="card-container">
        <Card title="Lord Of The Rings" rating={5} isGood={true} />
        <Card title="Avatar" />
        <Card title="Star Wars" />
        <Card title="Lion King" />
    </div>
  )
}

export default App
