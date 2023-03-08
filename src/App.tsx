import './App.css'
import Player from './components/player/Player'

function App() {

  return (
    <div className="App">
        <h1 style={{
          marginBottom: 100
        }}>RPG Battle</h1>
        <Player />
        <Player playerName='You' />
    </div>
    
  )
}

export default App
