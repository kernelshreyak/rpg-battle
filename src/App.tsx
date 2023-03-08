import { useState } from 'react'
import './App.css'
import Player from './components/player/Player'
import { gameEvent } from './types';

function App() {
  const [gameEvents,setGameEvents] = useState(["Game started"]); 
  const onPlayerAction = (event: string,data: any) => {
    setGameEvents([...gameEvents,event]);
  }
  return (
    <div className="App">
        <h1 style={{
          marginBottom: 100
        }}>RPG Battle</h1>

        <div className='alert'><b>Game logs</b> <br />
        <div id='logsbox' className='eventlogs'>
          {
            gameEvents.map((logItem) => (
              <div key={logItem}>{logItem}</div>
            ))
          }
        </div>
        </div>

        <Player onPlayerAction={onPlayerAction} />
        <Player playerName='You' onPlayerAction={onPlayerAction} />
    </div>
    
  )
}

export default App
