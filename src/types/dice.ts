export type ConditionType = 'inBattleFriend' | 'inBattleFoe' | 'outOfBattleFriend' | 'outOfBattleFoe';

export interface RollResult {
  roll: number;
  modifiers: string[];  // Changed from modifier: string | null
  modifierTotal: number;  // Added to store the total of all modifiers
  total: number;
}

export interface Scenario {
  [key: string]: string[];
}

export interface DiceState {
  names: string[];
  condition: ConditionType;
  diceCount: number;
  diceSides: number;
  modifiers: string[];
  customRollResults: RollResult[];
  rolling: boolean;
  result: number | null;
  scenario: string | null;
  activeTab: 'fate' | 'custom';
  inputName: string;
  modifier: string;
}

export interface DiceStore extends DiceState {
  addName: (name: string) => void;
  removeName: (name: string) => void;
  setCondition: (condition: ConditionType) => void;
  addModifier: (modifier: string) => void;
  removeModifier: (index: number) => void;
  rollDice: () => void;
  rollCustomDice: () => void;
  setDiceCount: (count: number) => void;
  setDiceSides: (sides: number) => void;
  setActiveTab: (tab: 'fate' | 'custom') => void;
  setInputName: (name: string) => void;
  setModifier: (modifier: string) => void;
}