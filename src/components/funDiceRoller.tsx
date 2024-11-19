import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import useDiceStore from "../store/useDiceStore";
import { ConditionType } from "../types/dice";
import CTAButton from "./CTAButton";

const buttonBase = "transition-all duration-200 rounded-md font-medium";
const inputBase =
  "p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

const tabVariants = {
  inactive: { backgroundColor: "rgb(229 231 235)", color: "rgb(75 85 99)" },
  active: {
    backgroundColor: "#17153B",
    color: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
};

const contentVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

const resultVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

const containerStyle =
  "bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow";
const chipStyle =
  "inline-flex items-center bg-white text-black px-3 py-1 rounded-full text-xs shadow-md";
const removeButtonStyle = "ml-2 font-bold text-red-500 hover:text-red-700";

const FunDiceRoller: React.FC = () => {
  const store = useDiceStore();

  return (
    <div className="justify-center flex flex-col items-center w-full max-w-full px-2">
      {/* Tab Navigation */}
      <div className="flex w-full max-w-sm mb-6 bg-gray-200 rounded-lg p-1">
        {["fate", "custom"].map((tab) => (
          <motion.button
            key={tab}
            onClick={() => store.setActiveTab(tab as "fate" | "custom")}
            className={`${buttonBase} flex-1 py-2 px-4`}
            variants={tabVariants}
            animate={store.activeTab === tab ? "active" : "inactive"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab === "fate" ? "Roll of Fate" : "Custom Roller"}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {store.activeTab === "fate" ? (
          <motion.div
            key="fate"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-sm"
          >
            <motion.div className={containerStyle}>
              <div className="flex flex-col gap-4">
                {/* Input field to add names */}
                <div className="flex mb-4 w-full">
                  <input
                    type="text"
                    value={store.inputName}
                    onChange={(e) => store.setInputName(e.target.value)}
                    placeholder="Enter a name"
                    className={`${inputBase} rounded-l w-full`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        store.addName(store.inputName);
                      }
                    }}
                  />
                  <button
                    onClick={() => store.addName(store.inputName)}
                    className="bg-primary hover:bg-accent text-white px-4 py-2 rounded-r whitespace-nowrap"
                  >
                    Add
                  </button>
                </div>
                {/* Display added names with remove option */}
                <div className="justify-center mb-4 flex flex-wrap w-full max-w-sm gap-2">
                  {store.names.map((name, index) => (
                    <div key={index} className={chipStyle}>
                      {name}
                      <button
                        onClick={() => store.removeName(name)}
                        className={removeButtonStyle}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
                {/* Dropdown to select condition */}
                <div className="mb-4 w-full max-w-sm">
                  <label
                    htmlFor="condition-select"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Condition
                  </label>
                  <select
                    id="condition-select"
                    value={store.condition}
                    onChange={(e) =>
                      store.setCondition(e.target.value as ConditionType)
                    }
                    className={`${inputBase} mt-1 block w-full shadow-sm`}
                  >
                    <option value="inBattleFriend">In Battle (Friend)</option>
                    <option value="inBattleFoe">In Battle (Foe)</option>
                    <option value="outOfBattleFriend">
                      Out of Battle (Friend)
                    </option>
                    <option value="outOfBattleFoe">Out of Battle (Foe)</option>
                  </select>
                </div>
                {/* Button to roll the dice */}
                <CTAButton
                  to="#"
                  text="Roll of Fate"
                  fromColor="bg-primary"
                  toColor="bg-secondary"
                  hoverFromColor="hover:bg-accent"
                  hoverToColor="hover:bg-highlight"
                  onClick={store.rollDice}
                />
                {/* Display the result and scenario */}
                {store.result !== null && !store.rolling && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-4 text-2xl font-bold text-gray-900 text-center"
                  >
                    <p>The dice has spoken! ({store.result})</p>
                    {store.scenario && (
                      <p className="mt-2 text-lg">{store.scenario}</p>
                    )}
                  </motion.div>
                )}
                {/* Display rolling status */}
                {store.rolling && (
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
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="custom"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-sm"
          >
            <motion.div className={containerStyle}>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-center justify-center">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={store.diceCount}
                    onChange={(e) =>
                      store.setDiceCount(
                        Math.min(
                          100,
                          Math.max(1, parseInt(e.target.value) || 1)
                        )
                      )
                    }
                    className={`${inputBase} w-20 text-center`}
                    placeholder="Count"
                  />
                  <span className="flex items-center font-bold text-xl">d</span>
                  <input
                    type="number"
                    min="2"
                    max="100"
                    value={store.diceSides}
                    onChange={(e) =>
                      store.setDiceSides(
                        Math.min(
                          100,
                          Math.max(2, parseInt(e.target.value) || 2)
                        )
                      )
                    }
                    className={`${inputBase} w-20 text-center`}
                    placeholder="Sides"
                  />
                </div>

                {/* Modifier Input */}
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex w-full">
                    <input
                      type="text"
                      value={store.modifier}
                      onChange={(e) => store.setModifier(e.target.value)}
                      className={`${inputBase} rounded-l flex-1 min-w-0`}
                      placeholder="Add modifier (e.g., +2 STR)"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          store.addModifier(store.modifier);
                        }
                      }}
                    />
                    <button
                      onClick={() => store.addModifier(store.modifier)}
                      className="bg-secondary hover:bg-accent text-white px-4 py-2 rounded-r whitespace-nowrap shrink-0"
                    >
                      Add
                    </button>
                  </div>

                  {/* Modifiers Display */}
                  {store.modifiers.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {store.modifiers.map((mod, index) => (
                        <div key={index} className={chipStyle}>
                          {mod}
                          <button
                            onClick={() => store.removeModifier(index)}
                            className={removeButtonStyle}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Roll Button */}
                <CTAButton
                  to="#"
                  text="Roll Dice"
                  fromColor="bg-primary"
                  toColor="bg-secondary"
                  hoverFromColor="hover:bg-accent"
                  hoverToColor="hover:bg-highlight"
                  onClick={store.rollCustomDice}
                />

                {/* Results Display */}
                <AnimatePresence>
                  {store.customRollResults.length > 0 && (
                    <motion.div
                      variants={resultVariants}
                      initial="hidden"
                      animate="visible"
                      className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200"
                    >
                      <h4 className="font-bold mb-3 text-gray-700">Results:</h4>
                      <div className="flex flex-col gap-2">
                        {store.customRollResults.map((result, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-3 rounded-md shadow-sm flex items-center gap-2 flex-wrap"
                          >
                            <span className="font-mono font-medium">
                              d{store.diceSides}: {result.roll}
                            </span>
                            {result.modifiers.length > 0 && (
                              <>
                                <span className="text-accent">+</span>
                                <div className="flex gap-1 items-center">
                                  {result.modifiers.join(", ")}
                                </div>
                                <span className="text-accent">=</span>
                                <span className="font-mono font-bold text-primary">
                                  {result.total}
                                </span>
                                <span className="text-xs text-gray-500 ml-2">
                                  ({result.roll} + {result.modifierTotal})
                                </span>
                              </>
                            )}
                          </motion.div>
                        ))}
                        {store.customRollResults.length > 1 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              delay: 0.2 * store.customRollResults.length,
                            }}
                            className="border-t border-gray-200 pt-3 mt-2 flex items-center justify-between"
                          >
                            <span className="font-bold text-gray-700">
                              Total:
                            </span>
                            <span className="font-mono font-bold text-lg text-primary">
                              {store.customRollResults.reduce(
                                (sum, result) => sum + result.total,
                                0
                              )}
                            </span>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FunDiceRoller;
