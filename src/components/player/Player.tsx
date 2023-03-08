import { useState } from "react"

export default function Player({playerName="CPU",playerColor="blue"}) {
    const [playerHP,setPlayerHP] = useState(50);
    return (
        <div className="card mb-5">
            <span style={{
                color: playerColor
            }}>Player: {playerName}</span>
            <h3>HP: {playerHP}</h3>
        </div>
    )
}