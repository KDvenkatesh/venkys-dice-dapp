import React, { useState } from "react";
import "./index.css";

export default function DiceGame() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [diceNumber, setDiceNumber] = useState(1);
  const [rolls, setRolls] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [result, setResult] = useState<"win" | "lose" | "">("");

  const maxRolls = 6;
  const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

  // Connect Petra Wallet
  const connectWallet = async () => {
    try {
      const response = await window.aptos.connect();
      setWalletAddress(response.address);
    } catch {
      alert("Failed to connect wallet");
    }
  };

  // Reset game state to play again
  const resetGame = () => {
    setRolls([]);
    setFinalScore(null);
    setResult("");
    setDiceNumber(1);
    setIsRolling(false);
  };

  // Disconnect wallet and reset
  const disconnectWallet = async () => {
    try {
      await window.aptos.disconnect();
    } catch {}
    setWalletAddress(null);
    resetGame();
  };

  // Send reward (real logic using aptos_account::transfer)
  const sendReward = async (playerAddress: string) => {
    try {
      const tx = await window.aptos.signAndSubmitTransaction({
        type: "entry_function_payload",
        function: "0x1::aptos_account::transfer",
        arguments: [playerAddress, "100000"], // 0.0001 APT in Octas
        type_arguments: [],
      });
      alert("🎉 Reward 0.0001 APT sent! Transaction hash: " + tx.hash);
    } catch (e: any) {
      alert("Failed to send reward: " + (e.message || e));
    }
  };

  // Roll Dice Logic
  const rollDice = async () => {
    if (!walletAddress || isRolling || rolls.length >= maxRolls) return;

    setIsRolling(true);
    const value = Math.floor(Math.random() * 6) + 1;
    setDiceNumber(value);

    const newRolls = [...rolls, value];
    setRolls(newRolls);

    if (newRolls.length === maxRolls) {
      const total = newRolls.reduce((sum, val) => sum + val, 0);
      setFinalScore(total);

      if (total >= 25) {
        setResult("win");
        await sendReward(walletAddress);
      } else {
        setResult("lose");
      }
    }

    setIsRolling(false);
  };

  const liveScore = rolls.reduce((sum, val) => sum + val, 0);

  return (
    <div className="app-container">
      <h1>🎲 Simple Dice Game</h1>
      {walletAddress ? (
        <>
          <p>Connected: {walletAddress}</p>

          <div className="dice-wrapper">
            <div className="dice">{diceFaces[diceNumber - 1]}</div>
          </div>

          <p>🎲 Rolls: {rolls.join(", ")}</p>

          <p className="score-text">🔢 Current Score: {liveScore}</p>

          {rolls.length < maxRolls ? (
            <button onClick={rollDice} disabled={isRolling} className="roll-btn">
              Roll Dice ({rolls.length}/{maxRolls})
            </button>
          ) : (
            <>
              <p>Game Over! Your score: {finalScore}</p>
              <p className={result === "win" ? "success-text" : "fail-text"}>
                {result === "win" ? "🎉 You Win!" : "😢 You Lose."}
              </p>
              <button onClick={resetGame} className="roll-btn">
                Play Again
              </button>
              <button onClick={disconnectWallet} className="roll-btn" style={{ marginTop: "10px" }}>
                Disconnect Wallet
              </button>
            </>
          )}
        </>
      ) : (
        <button onClick={connectWallet} className="roll-btn">
          Connect Petra Wallet
        </button>
      )}
    </div>
  );
}
