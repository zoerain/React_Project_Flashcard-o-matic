import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api/index";
import { useParams, Link, useHistory } from "react-router-dom";

//Component to study cards in a deck
function Study() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [front, isFront] = useState(true);
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { deckId } = useParams();

  //Get Deck Data
 useEffect(() => {
   async function loadDeck() {
     try {
       const abortController = new AbortController();
       const deckData = await readDeck(deckId, abortController.signal);
       setDeck(deckData);
       setCards(deckData.cards);
       setLoading(false); 
     } catch (error) {
       console.error("Error loading deck:", error);
     }
   }
   loadDeck();
 }, [deckId]);


  //Flip the card
  const cardFlip = () => {
    if (!front) {
      isFront(true);
    } else {
      isFront(false);
    }
  };


  //Get the next card
  const nextCard = (index, total) => {
    console.log(index);
    if (index < total) {
      setCurrentIndex(currentIndex + 1);
      isFront(true);
    } else {
      if (
        window.confirm(
          `Restart cards? Click 'cancel' to return to the home page`
        )
      ) {
        setCurrentIndex(1);
        isFront(true);
      } else {
        history.push("/");
      }
    }
  };

  const nextButton = (cards, index) => {
    if (front) {
      return null;
    } else {
      return (
        <button
          onClick={() => nextCard(index + 1, cards.length)}
          className="btn btn-primary mx-1"
        >
          Next
        </button>
      );
    }
  };


//Component to display when deck has 3 or more cards
  const enoughCards = () => {
   return (
     <div>
       <h1 className="text-center">Currently Studying: {deck.name} </h1>
       <div className="card">
         {cards.map((card, index) => {
           if (index === currentIndex - 1) {
             return (
               <div className="card-body" key={card.id}>
                 <div className="card-title">
                   {`Card ${index + 1} of ${cards.length}`}
                 </div>
                 <div className="card-text">
                   {front ? card.front : card.back}
                 </div>
                 <button onClick={cardFlip} className="btn btn-secondary mx-1">
                   Flip
                 </button>
                 {nextButton(cards, index)}
               </div>
             );
           }
         })}
       </div>
     </div>
   );
  };

//Component to display when deck has less than 3 cards
  const notEnoughCards = () => {
    return (
      <div>
        <h2>Not enough cards.</h2>
        <p>
          You need at least 3 cards to study. There are {cards.length} cards in
          this deck.
        </p>
        <Link
          className="btn btn-primary mx-1"
          to={`/decks/${deck.id}/cards/new`}
        >
          Add Cards
        </Link>
      </div>
    );
  };

  return (
    <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active">Study</li>
      </ol>
      <div>
        <h2>{`${deck.name}: Study`}</h2>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {cards && cards.length >= 3 ? enoughCards() : notEnoughCards()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Study;
