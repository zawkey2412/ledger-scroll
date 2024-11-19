import { create } from "zustand";
import { DiceStore, ConditionType } from "../types/dice";
import toast from "react-hot-toast";

const scenarios: Record<ConditionType, string[]> = {
  inBattleFriend: [
    "Provide healing to {names}.",
    "Cast a protective spell on {names}.",
    "Assist {names} in their attack.",
    "Distract the enemy for {names}.",
  ],
  inBattleFoe: [
    "Launch a surprise attack on {names}.",
    "Engage {names} in close combat.",
    "Use a spell to hinder {names}.",
    "Focus all attacks on {names} for the next turn.",
    "Set a trap for {names}.",
  ],
  outOfBattleFriend: [
    "Share valuable information with {names}.",
    "Offer {names} a rare item.",
    "Help {names} with a difficult task.",
    "Plan a strategy with {names}.",
  ],
  outOfBattleFoe: [
    "Gather intelligence on {names}.",
    "Sabotage {names}'s plans.",
    "Spread false information about {names}.",
    "Challenge {names} to a contest of skill.",
  ],
};

const useDiceStore = create<DiceStore>((set, get) => ({
  names: [],
  condition: "inBattleFriend",
  diceCount: 1,
  diceSides: 20,
  modifiers: [],
  customRollResults: [],
  rolling: false,
  result: null,
  scenario: null,
  activeTab: "fate",
  inputName: "",
  modifier: "",

  addName: (name) => {
    const { names } = get();
    if (name && !names.includes(name)) {
      if (names.length < 5) {
        set({ names: [...names, name] });
      } else {
        toast.error("You can only add up to 5 names.", {
          style: { background: "#433D8B", color: "#fff" },
        });
      }
    }
  },

  removeName: (name) => {
    const { names } = get();
    set({ names: names.filter((n) => n !== name) });
  },

  setCondition: (condition) => set({ condition }),

  addModifier: (modifier) => {
    if (modifier.trim()) {
      set((state) => ({ modifiers: [...state.modifiers, modifier.trim()] }));
    }
  },

  removeModifier: (index) => {
    set((state) => ({
      modifiers: state.modifiers.filter((_, i) => i !== index),
    }));
  },

  rollDice: () => {
    const { names } = get();
    if (names.length === 0) {
      toast.error("Please add at least one name.", {
        style: { background: "#433D8B", color: "#fff" },
      });
      return;
    }

    set({ rolling: true });
    setTimeout(() => {
      const outcome = Math.floor(Math.random() * 20) + 1;
      const selectedNames = [...names]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      const selectedNamesString =
        selectedNames.length > 1
          ? `either ${selectedNames
              .slice(0, -1)
              .join(", ")}, or ${selectedNames.slice(-1)}`
          : selectedNames[0];

      const { condition } = get();
      const selectedScenario = scenarios[condition][
        Math.floor(Math.random() * scenarios[condition].length)
      ].replace("{names}", selectedNamesString);

      set({
        result: outcome,
        scenario: selectedScenario,
        rolling: false,
      });
    }, 2000);
  },

  rollCustomDice: () => {
    const { diceCount, diceSides, modifiers } = get();
    const calculateModifierValue = (modifierStr: string): number => {
      const match = modifierStr.match(/([+-]\d+)/);
      return match ? parseInt(match[0]) : 0;
    };

    const results = Array.from({ length: diceCount }, () => {
      const roll = Math.floor(Math.random() * diceSides) + 1;
      const appliedModifiers = modifiers.length > 0 ? [...modifiers] : [];
      const modifierTotal = appliedModifiers.reduce(
        (sum, mod) => sum + calculateModifierValue(mod),
        0
      );

      return {
        roll,
        modifiers: appliedModifiers,
        modifierTotal,
        total: roll + modifierTotal,
      };
    });

    set({ customRollResults: results });
    const grandTotal = results.reduce((sum, result) => sum + result.total, 0);
    toast.success(`Grand Total: ${grandTotal}`, {
      style: { background: "#433D8B", color: "#fff" },
    });
  },

  setDiceCount: (count) => set({ diceCount: count }),
  setDiceSides: (sides) => set({ diceSides: sides }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setInputName: (name) => set({ inputName: name }),
  setModifier: (modifier) => set({ modifier }),
}));

export default useDiceStore;
