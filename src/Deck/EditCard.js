import React, { useState, useEffect } from "react";
import { readCard, readDeck, updateCard } from "../utils/api/index";
import { useParams, Link, useHistory } from "react-router-dom";
import CardForm from "./CardForm";

function EditCard() {
  const initialCardState = { id: '', front: '', back: '', deckId: '' };
  const initialDeckState = { id: '', name: '', description: '' };

  const [card, setCard] = useState(initialDeckState);
  const [deck, setDeck] = useState(initialCardState);

  const { cardId, deckId } = useParams();
  const history = useHistory();

  //Get Card Data
  useEffect(() => {
    async function loadCardData() {
      const abortController = new AbortController();
      try {
        const cardData = await readCard(cardId, abortController.signal);
        setCard(cardData);
      } catch (error) {
        console.error("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    }
    loadCardData();
  }, [cardId]);

  //Get Deck Data
  useEffect(() => {
    async function loadDeckData() {
      const abortController = new AbortController();
      try {
        const deckData = await readDeck(deckId, abortController.signal);
        setDeck(deckData);
      } catch (error) {
        console.error("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    }
    loadDeckData();
  }, [deckId]);

  //Handler for submitting edit card form
  const submitHandler = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const result = await updateCard({ ...card }, abortController.signal);
    history.push(`/decks/${deckId}`);
    return result;
  };

  //Handler for canceling the form
  const cancelHandler = async ()  => {
    history.push(`/decks/${deckId}`);
  };

  //Handler for input changes
  const changeHandler = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  };

  const completeHandler = async () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>
              {deck.name}
            </Link>
          </li>
          <li className="breadcrumb-item active">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <CardForm />
    </div>
  );
}

export default EditCard;
