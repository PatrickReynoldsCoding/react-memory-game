import { useEffect, useState } from "react";
import "./App.css";

//components
import Card from "./components/Card";

const cardImages = [
  { src: "/img/helmet-1.png" },
  { src: "/img/potion-1.png" },
  { src: "/img/ring-1.png" },
  { src: "/img/scroll-1.png" },
  { src: "/img/shield-1.png" },
  { src: "/img/sword-1.png" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };

  // remember choice
  const handleChoice = (card) => {
    choice1 ? setChoice2(card) : setChoice1(card);
    reviewChoices(choice1, choice2);
    console.log(choice1, choice2);
  };

  //review choices
  const reviewChoices = (choice1, choice2) => {
    if (choice1 && choice2 != null) {
      matchChecker(choice1, choice2);
      clearChoices();
    }
  };

  //match checker
  const matchChecker = (choice1, choice2) => {
    if (choice1.src == choice2.src) {
      console.log("match");
    } else {
      console.log("no match");
    }
  };

  // clear choices
  const clearChoices = (choice1, choice2) => {
    if (choice1 && choice1 !== null) {
      setChoice1(null);
      setChoice2(null);
    }
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Card key={card.id} handleChoice={handleChoice} card={card} />
        ))}
      </div>
    </div>
  );
}

export default App;
