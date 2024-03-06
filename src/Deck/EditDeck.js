import React, { useState, useEffect } from "react";
import { readDeck, updateDeck } from "../utils/api/index";
import { useParams, Link, useHistory } from "react-router-dom";
import CardForm from "./CardForm";

//Component to edit a deck
function EditDeck() {
  const initialDeckState = { name: "", description: "" };
  const [deck, setDeck] = useState(initialDeckState);
  const { deckId } = useParams();
  const history = useHistory();

  //Get deck data
  useEffect(() => {
    async function loadDeck() {
      const abortController = new AbortController();
      try {
        const deck = await readDeck(deckId, abortController.signal);
        setDeck(deck);
      } catch (error) {
        console.error("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    }
    loadDeck();
  }, [deckId]);

  //Handler for submitting edit deck form
  const submitHandler = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const result = await updateDeck({ ...deck }, abortController.signal);
    history.push(`/decks/${deckId}`);
    return result;
  };

  //Handler for input changes
  const changeHandler = ({ target }) => {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  };

  //Handler for canceling edit form
  const cancelHandler = async () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active">Edit Deck</li>
        </ol>
      </nav>
      <CardForm />
    </div>
  );
}

export default EditDeck;
