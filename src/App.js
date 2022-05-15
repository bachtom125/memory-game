import "./App.css";
import React from "react";
import { useState } from "react";

const cardImages = [
  { src: "/img/helmet-1.png" },
  { src: "/img/potion-1.png" },
  { src: "/img/ring-1.png" },
  { src: "/img/scroll-1.png" },
  { src: "/img/shield-1.png" },
  { src: "/img/sword-1.png" },
];

function App() {
  // shuffle the cards
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [canFlip, setCanFlip] = useState(true);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => {
        return { ...card, id: Math.random(), state: false, hidden: false };
      });
    setCards(shuffledCards);
    setTurns(0);
    console.log(cards, turns);
  };

  const checkMatch = (cardsArr) => {
    const openCards = cardsArr.filter((card) => card.state);
    if (openCards.length < 2) return;
    setCanFlip(false);
    const [card1, card2] = openCards;
    setTimeout(() => {
      setCards(() => {
        return cardsArr.map((card) => {
          if (card.id === card1.id || card.id === card2.id) {
            return {
              ...card,
              state: !card.state,
              hidden: card1.src === card2.src,
            };
          }
          return card;
        });
      });
      setCanFlip(true);
    }, 1000);
  };

  const handleFlip = (c) => {
    if (!canFlip) return;
    const newArr = cards.map((card) => {
      if (card.id === c.id) {
        if (!card.state) setTurns(turns + 1);
        return { ...card, state: true };
      }
      return card;
    });
    setCards(newArr);

    checkMatch(newArr);
  };

  const checkWin = () => {
    const done = cards.filter((card) => {
      return card.hidden;
    });

    if (done.length == 12) return true;
    return false;
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <div
            className={`flip-card ${card.state && "flip"}`}
            key={card.id}
            onClick={() => handleFlip(card)}
          >
            {!card.hidden && (
              <div className="flip-card-inner">
                <div className="front">
                  <img src="../img/cover.png" alt="card-front" />
                </div>

                <div className="back">
                  <img src={card.src} alt="card-back" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {checkWin() ? (
        <div>
          <div>You won! </div>
          <div>You made {turns} moves in total!</div>
        </div>
      ) : (
        <div style={{ textAlign: "center", width: "100%" }}>
          Your turn: {turns}
        </div>
      )}
    </div>
  );
}
// This is to make the file different for me to test the git commands
export default App;
