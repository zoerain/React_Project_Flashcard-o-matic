import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import CardForm from "./CardForm";

function AddCard() {
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState({ front: "", back: "", deckId: "" });

  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    const deckInfo = async () => {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(() => response);
      console.log(readDeck(deckId, abortController.signal));
    };
    deckInfo();

    return () => abortController.abort();
  }, [deckId]);

  const changeForm = ({ target }) => {
    setCard({ ...card, [target.name]: target.value });
  };

  const submitForm = (event) => {
    event.preventDefault();
    setCard({ ...card, deckId: deckId });
    createCard(deckId, card);
    console.log("'submitForm' saved");
    setCard({ front: "", back: "", deckId: "" });
  };
  return (
    <div className="col-9 mx-auto">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}> Home </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}/cards/new`}>Add Card </Link>
          </li>
        </ol>
      </nav>
      <div className="row pl-3 pb-2">
        <h1>{deck.name}: Add Card</h1>
      </div>
      <CardForm
        submitForm={submitForm}
        changeForm={changeForm}
        card={card}
        deckId={deckId}
      />
    </div>
  );
}

export default AddCard;
