import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaDice, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const scenarios = {
  // Define possible scenarios for different conditions
  inBattleFriend: [
    "Bless or Guidance {names}.",
    "Give {names} a potion.",
    "Help {names} with a task.",
    "Share a secret with {names}.",
  ],
  inBattleFoe: [
    "Attack {names} with a ranged weapon.",
    "Attack {names} with a melee weapon.",
    "Cast a spell on {names}.",
    "Only target {names} until its die.",
    "Target only {names} for 2 turns.",
  ],
  outOfBattleFriend: [
    "Share a meal with {names}.",
    "Tell a story to {names}.",
    "Give {names} a gift.",
    "Help {names} with a chore.",
  ],
  outOfBattleFoe: [
    "Spy on {names}.",
    "Steal from {names}.",
    "Spread a rumor about {names}.",
    "Challenge {names} to a duel.",
  ],
};

const RollOfFate: React.FC = () => {
  // State variables to manage names, input, rolling status, result, scenario, and condition
  const [names, setNames] = useState<string[]>([]);
  const [inputName, setInputName] = useState<string>("");
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [scenario, setScenario] = useState<string | null>(null);
  type ConditionType = keyof typeof scenarios;
  const [condition, setCondition] = useState<ConditionType>("inBattleFriend");
  const [, setSelectedName] = useState<string | null>(null);

  const addName = () => {
    // Add a name to the list if it's not already present and limit to 5 names
    if (inputName && !names.includes(inputName)) {
      if (names.length < 5) {
        setNames([...names, inputName]);
        setInputName("");
      } else {
        toast.error("You can only add up to 5 names.", {
          style: {
            background: "#433D8B",
            color: "#fff",
          },
        });
      }
    }
  };

  const removeName = (nameToRemove: string) => {
    // Remove a name from the list
    setNames(names.filter((name) => name !== nameToRemove));
  };

  const rollDice = () => {
    // Roll the dice and determine the outcome and scenario
    if (names.length === 0) {
      toast.error("Please add at least one name.", {
        style: {
          background: "#433D8B",
          color: "#fff",
        },
      });
      return;
    }

    setRolling(true);
    setTimeout(() => {
      // Calculate the dice outcome and select a scenario
      const outcome = Math.floor(Math.random() * 20) + 1;
      const selectedNames = names.sort(() => 0.5 - Math.random()).slice(0, 3);
      const selectedNamesString =
        selectedNames.length > 1
          ? `either ${selectedNames
              .slice(0, -1)
              .join(", ")}, or ${selectedNames.slice(-1)}`
          : selectedNames[0];
      const selectedScenario = scenarios[condition][
        Math.floor(Math.random() * scenarios[condition].length)
      ].replace("{names}", selectedNamesString);

      setResult(outcome);
      setSelectedName(selectedNamesString);
      setScenario(selectedScenario);
      setRolling(false);
    }, 2000);
  };

  return (
    <div className="justify-center flex flex-col items-center max-w-xs">
      {/* Input field to add names */}
      <div className="flex mb-4 w-full">
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="Enter a name"
          className="p-2 border border-gray-300 rounded-l flex-grow"
        />
        <button
          onClick={addName}
          className="bg-primary text-white p-2 rounded-r"
        >
          Add
        </button>
      </div>
      {/* Display added names with remove option */}
      <div className="justify-center mb-4 flex flex-wrap w-full">
        {names.map((name, index) => (
          <div
            key={index}
            className="inline-flex items-center bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm mr-2 mb-2"
          >
            {name}
            <FaTimes
              className="ml-2 cursor-pointer"
              onClick={() => removeName(name)}
            />
          </div>
        ))}
      </div>
      {/* Dropdown to select condition */}
      <div className="mb-4 w-full">
        <label
          htmlFor="condition-select"
          className="block text-sm font-medium text-gray-700"
        >
          Condition
        </label>
        <select
          id="condition-select"
          value={condition}
          onChange={(e) => setCondition(e.target.value as ConditionType)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        >
          <option value="inBattleFriend">In Battle (Friend)</option>
          <option value="inBattleFoe">In Battle (Foe)</option>
          <option value="outOfBattleFriend">Out of Battle (Friend)</option>
          <option value="outOfBattleFoe">Out of Battle (Foe)</option>
        </select>
      </div>
      {/* Button to roll the dice */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={rollDice}
        className="bg-primary text-white p-4 rounded-full shadow-lg flex items-center justify-center"
      >
        <FaDice className="text-2xl" />
        <span className="ml-2">Roll of Fate</span>
      </motion.button>
      {/* Display the result and scenario */}
      {result !== null && !rolling && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 text-2xl font-bold text-gray-900 text-center"
        >
          <p>The dice has spoken! ({result})</p>
          {scenario && <p className="mt-2 text-lg">{scenario}</p>}
        </motion.div>
      )}
      {/* Display rolling status */}
      {rolling && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 text-2xl font-bold text-gray-900"
        >
          Rolling...
        </motion.div>
      )}
    </div>
  );
};

export default RollOfFate;
