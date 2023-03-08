export type InventoryItem = {
    itemId: number;
    itemName: string;
    attackPower: number;
    defencePower: number;
    magicPower: number;
    hpBoost: number;
    equipped: boolean;
}

export type GamePlayer = {
    playerId: number;
    playerName: string;
    hp: number;
    attack: number;
    defence: number;
    mp: number;
    inventory: InventoryItem[]
}

