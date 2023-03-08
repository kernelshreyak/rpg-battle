import { useState } from "react"
import heartIcon from "../../assets/icons/heart.svg";
import swordIcon from "../../assets/icons/sword.svg";
import shieldIcon from "../../assets/icons/shield.svg";
import magicIcon from "../../assets/icons/magic.svg";

export default function Player({playerName="CPU",playerColor="blue"}) {
    const [playerHP,setPlayerHP] = useState(50); //health points
    const [playerAttack,setPlayerAttack] = useState(0);
    const [playerDefence,setPlayerDefence] = useState(0);
    const [playerMP,setPlayerMP] = useState(0); // mana points
    return (
        <div className="card mb-5">
            <span style={{
                color: playerColor
            }}>Player: {playerName}</span>
            
            <div className="playerstats">
                <div className="player-statbox">
                    <img src={heartIcon} /> {playerHP}
                </div>
                <div className="player-statbox">
                    <img src={swordIcon} /> {playerAttack}
                </div>
                <div className="player-statbox">
                    <img src={shieldIcon} /> {playerDefence}
                </div>
                <div className="player-statbox">
                    <img src={magicIcon} /> {playerMP}
                </div>
            </div>

            <div className="playeroptions">
                <button className="btn btn-primary">Attack</button>
                <button className="btn btn-warning">Defend</button>
            </div>
        </div>
    )
}