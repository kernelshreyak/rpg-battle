import { useEffect, useState } from "react"
import heartIcon from "../../assets/icons/heart.svg";
import swordIcon from "../../assets/icons/sword.svg";
import shieldIcon from "../../assets/icons/shield.svg";
import magicIcon from "../../assets/icons/magic.svg";

import {utils} from "../../utils";

export default function Player({playerName="CPU",playerColor="blue",onPlayerAction}) {
    const [playerHP,setPlayerHP] = useState(50); //health points
    const [playerAttack,setPlayerAttack] = useState(0);
    const [playerDefence,setPlayerDefence] = useState(0);
    const [playerMP,setPlayerMP] = useState(0); // mana points

    const [playerInventory,setPlayerInventory] = useState([]);
    const [showInventory,setShowInventory] = useState(false);

    const toggleInventory = () => {
        setShowInventory(!showInventory);
    }

    useEffect(() => {
        const totalPoints = 10;
        const attackPower = utils.getRandomInt(2,8);
        setPlayerAttack(attackPower);
        setPlayerDefence(totalPoints - attackPower);

    },[playerAttack,playerDefence])

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
                <button className="btn btn-primary" onClick={() => {
                    onPlayerAction(playerName + " attacked")
                }}>Attack</button>
                <button className="btn btn-warning" onClick={() => {
                    onPlayerAction(playerName + " defended")
                }}>Defend</button>
            </div>
            <div className="playeroptions">
                <button className="btn btn-success" onClick={toggleInventory}> {showInventory ? "Close" : "Open"} Inventory</button>
            </div>

            {
                showInventory && (
                    <div className="inventory card">
                        {
                            playerInventory.length == 0 ? (
                                <b>Inventory is empty</b>
                            )
                            : (
                                playerInventory.map((item) => (
                                    <div key={item} className="inventory-item">
                                        Item
                                    </div>
                                ))
                            )
                        }
                    </div>
                )
            }
        </div>
        
    )
}