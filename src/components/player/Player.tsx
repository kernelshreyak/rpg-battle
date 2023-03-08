import { useState } from "react"
import heartIcon from "../../assets/icons/heart.svg";
import swordIcon from "../../assets/icons/sword.svg";
import shieldIcon from "../../assets/icons/shield.svg";
import magicIcon from "../../assets/icons/magic.svg";
import deleteIcon from "../../assets/icons/delete.svg";

import { GamePlayer, InventoryItem } from '../../types';

interface PlayerProps {
    player: GamePlayer,
    onPlayerAction: (player: GamePlayer,event: string,itemUsed: InventoryItem) => void
    activeTurn: boolean
}
export default function Player(props: PlayerProps) {
    const [showInventory,setShowInventory] = useState(false);

    const toggleInventory = () => {
        setShowInventory(!showInventory);
    }
    return ( 
        <div data-disabled={!props.activeTurn} className="playercard card mb-5" style={{
            backgroundColor: props.activeTurn ? "#f4f4a9": "white"
        }}>
            <span style={{
                color: "blue"
            }}>Player: {props.player.playerName}</span>
            
            <div className="playerstats">
                <div className="player-statbox">
                    <img src={heartIcon} /> {props.player.hp}
                </div>
                <div className="player-statbox">
                    <img src={swordIcon} /> {props.player.attack}
                </div>
                <div className="player-statbox">
                    <img src={shieldIcon} /> {props.player.defence}
                </div>
                <div className="player-statbox">
                    <img src={magicIcon} /> {props.player.mp}
                </div>
            </div>

            <div className="playeroptions">
                <button disabled={props.player.inventory.length == 0 || !props.activeTurn} className="btn btn-primary" onClick={() => {
                    props.onPlayerAction(props.player,"attacked",props.player.inventory[0])
                }}>Attack</button>
            </div>
            <div className="playeroptions">
                <button className="btn btn-success" onClick={toggleInventory}> {showInventory ? "Close" : "Open"} Inventory</button>
                <button disabled={props.player.inventory.length >= 5 || !props.activeTurn} className="btn btn-secondary" onClick={() => {
                    props.onPlayerAction(props.player,"new-item",props.player.inventory[0])
                }}>New Item</button>
            </div>

            {
                showInventory && (
                    <div className="inventory card">
                        {
                            props.player.inventory.length == 0 ? (
                                <b>Inventory is empty</b>
                            )
                            : (
                                props.player.inventory.length > 0 && props.player.inventory.map((item) => (
                                    <div key={item.itemId} className="inventory-item">
                                        {item.itemName}
                                        <img style={{cursor:"pointer"}} onClick={() => {
                                            props.onPlayerAction(props.player,"remove-item",item)
                                        }} src={deleteIcon} width={30} height={30} />
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