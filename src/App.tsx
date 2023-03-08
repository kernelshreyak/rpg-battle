import { useEffect, useState } from 'react'
import './App.css'
import Player from './components/player/Player'
import { GamePlayer, InventoryItem } from './types';
import { utils } from './utils';
import _ from 'lodash';

function initPlayers(index: number): GamePlayer {
  return {
      playerId: index,
      playerName: index == 1 ? "CPU" : "You",
      hp: 50,
      mp: 0,
      attack: utils.getRandomInt(2,5),
      defence: utils.getRandomInt(2,5),
      inventory: []
  };
}

function App() {
  const [player1,setPlayer1] = useState(initPlayers(1)); //CPU player
  const [player2,setPlayer2] = useState(initPlayers(2)); //main player
  let itemsTmp: InventoryItem[] = [];
  const [allItems,setAllItems] = useState(itemsTmp);
  const [playerTurn,setPlayerTurn] = useState(1);

  function initAllItems() {
    let allItemsArr: InventoryItem[];
    const itemTypes = ['Weapon','Armour','Potion'];
    const weaponTypes = ['Sword','Spear','Gun'];
    const armourTypes = ['Shield','Helmet','Umbrella'];
    const potionTypes = ['Health Potion','Power Potion'];
    allItemsArr = [];
    for (let i = 0;i < 50;i++) {
      const itemType = utils.getRandomArrayItem(itemTypes);
      let itemName = "";
      let attackPower = 0;
      let defencePower = 0;
      let magicPower = 0;
      let hpBoost = 0;
      const itemLevel = utils.getRandomInt(1,10);
      if(itemType == 'Weapon') {
        itemName = utils.getRandomArrayItem(weaponTypes) + " Lv" + itemLevel*2;
        attackPower =  utils.getRandomInt(10,20) + itemLevel;
      }
      else if(itemType == 'Armour') {
        itemName = utils.getRandomArrayItem(armourTypes) + " Lv" + itemLevel*2;
        defencePower =  utils.getRandomInt(10,20);
      }
      else if(itemType == 'Potion') {
        const potion = utils.getRandomArrayItem(potionTypes);
        const potionStrength = utils.getRandomInt(10,50) + itemLevel*2;
        itemName = potion + " Lv" + itemLevel*2; 
        if(potion == 'Health Potion') {
          hpBoost = potionStrength + itemLevel*2;
        }
        else{
          defencePower =  potionStrength + itemLevel*2;
          attackPower =  potionStrength + itemLevel*2;
        }
      }
    
      allItemsArr.push({
        itemId: i + 1,
        itemName: itemName,
        attackPower: attackPower,
        magicPower: magicPower,
        defencePower: defencePower,
        equipped: false,
        hpBoost: hpBoost
      });
    }
  
    setAllItems(allItemsArr);
  }

  useEffect(() => {
    initAllItems();
  },[])

  const onPlayerAction = (player: GamePlayer,event: string,itemUsed: InventoryItem) => {
    // main game mechanics logic
    if (event == "new-item") {
      const item = getItemDropRandom();

      player.inventory.push(item);
      player.defence += item.defencePower;
      player.attack += item.attackPower;
      player.hp += item.hpBoost;
      player.mp += item.magicPower;
      player.playerId == 1 ? setPlayer1({...player}) : setPlayer2({...player})
    }
    else if (event == "remove-item") {
      const item = {...itemUsed};
      console.log("item to remove: ",item)
      player = {...player};
      _.remove(player.inventory,(p) => p.itemId == item.itemId);
      player.defence -= item.defencePower;
      player.attack -= item.attackPower;
      player.hp -= item.hpBoost;
      player.mp -= item.magicPower;
      player.playerId == 1 ? setPlayer1({...player}) : setPlayer2({...player})
    }
    else if(event == "attacked") {
      const opponent: GamePlayer = player.playerId == 1 ? {...player2} : {...player1};
      const attacker: GamePlayer = {...player};
      if(player.attack >= opponent.defence) {
        opponent.hp -= player.attack - opponent.defence; //deal damage
        opponent.defence = 0; //armour destroyed
      }
      else {
        // attack only damages armour
        opponent.defence -= player.attack;
      }
      player.attack -= utils.getRandomInt(1,itemUsed.attackPower);

      if (player.playerId == 1) {
        setPlayer1(attacker);
        setPlayer2(opponent);
      }
      else {
        setPlayer1(opponent);
        setPlayer2(attacker);
      }
    }

    player.playerId == 1 ? setPlayerTurn(2) : setPlayerTurn(1)
  }

  function getItemDropRandom(): InventoryItem  {
    const item = allItems.pop();
    if (!item) {
      throw new Error("Item cannot be fetched");
    }
    return item;
  }

  function resetGame() {
    location.reload();
  }

  return (
    <div className="App">
        <h1 style={{
          marginBottom: 100
        }}>RPG Battle</h1>
        <button className='btn btn-warning' onClick={resetGame}>Reset Game</button> <br /> <br />
        { player1.hp >0 && <Player activeTurn={playerTurn == 1} player={player1} onPlayerAction={onPlayerAction} /> }
        { player2.hp >0 &&<Player activeTurn={playerTurn == 2}  player={player2} onPlayerAction={onPlayerAction} /> }
          
    </div>
    
  )
}

export default App
