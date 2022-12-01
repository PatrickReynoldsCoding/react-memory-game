import { useEffect, useState } from "react";
import "./App.css";

//components
import Card from "./components/Card";

const cardImages = [
  { src: "/img/helmet-1.png", matched: true },
  { src: "/img/potion-1.png", matched: true },
  { src: "/img/ring-1.png", matched: true },
  { src: "/img/scroll-1.png", matched: true },
  { src: "/img/shield-1.png", matched: true },
  { src: "/img/sword-1.png", matched: true },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);
  const [cardEnabler, setCardEnabler] = useState(true);

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoice1(null);
    setChoice2(null);
    setCards(shuffledCards);
    setTurns(0);
    setTimeout(() => gameStartCardFlipper(), 5000);
  };

  // remember choice
  const handleChoice = (card) => {
    choice1 ? setChoice2(card) : setChoice1(card);
  };

  //review choices
  useEffect(() => {
    reviewChoices(choice1, choice2);
  }, [choice1, choice2]);

  const reviewChoices = (choice1, choice2) => {
    if (choice1 && choice2) {
      matchChecker(choice1, choice2);
      setTimeout(() => clearChoices(choice1, choice2), 1000);

      setTurns(turns + 1);
      // console.log(choice1, choice2, turns);
    }
  };

  //match checker
  const matchChecker = (choice1, choice2) => {
    if (choice1 && choice2) {
      setCardEnabler(false);
      if (choice1.src === choice2.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choice1.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
      }
    }
  };

  console.log(cards);

  // clear choices
  const clearChoices = (choice1, choice2) => {
    if (choice1 && choice2 !== null) {
      setChoice1(null);
      setChoice2(null);
      setCardEnabler(true);
    }
  };

  // starting game card flipper
  const gameStartCardFlipper = () => {
    setCards((prevCards) => {
      return prevCards.map((card) => {
        return { ...card, matched: false };
      });
    });
  };

  // starts first game automatically

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            handleChoice={handleChoice}
            card={card}
            flipped={card === choice1 || card === choice2 || card.matched}
            enabled={cardEnabler}
          />
        ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
  );
}

export default App;
