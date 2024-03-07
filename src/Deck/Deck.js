import React, { useState, useEffect } from "react";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";
import { useParams, useHistory, Link } from "react-router-dom";

function Deck() {
  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState({});
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    async function loadData() {
      const abortController = new AbortController();
      try {
        const decks = await readDeck(deckId, abortController.signal);
        setDeck(decks);
        setCards(decks.cards);
      } catch (error) {
        console.error("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    }
    loadData();
  }, []);

  //Handler to delete a card
  const deleteCardHandler = async (card) => {
    if (
      window.confirm(`Delete this card? You will not be able to recover it`)
    ) {
      const abortController = new AbortController();
      try {
        history.go(0);
        return await deleteCard(card.id, abortController.signal);
      } catch (error) {
        console.error("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    }
  };

  //Handler to delete a deck
  const deleteDeckHandler = async (deck) => {
    const confirm = window.confirm(
      `Delete this deck? You will not be able to recover it`
    );
    if (confirm) {
      await deleteDeck(deck.id);
      history.push("/");
    }
  };

  const addCardHandler = async () => {
    history.push(`/decks/${deckId}/cards/new`)
  };

  const editCardHandler = async (card) => {
    history.push(`/decks/${deckId}/cards/${card.id}/edit`)
  };

  const studyHandler = async () => {
    history.push(`/decks/${deckId}/study`)
  };

  const editDeckHandler = async () => {
    history.push(`/decks/${deckId}/edit`)
  };

  if (cards.length > 0) {
    return (
      <div>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">{deck.name}</li>
        </ol>

        <div className="card">
          <div className="card-body">
            <h2 className="card-title">{deck.name}</h2>
            <p>{deck.description}</p>

            <button
              className="btn btn-secondary mx-1"
              onClick={() => editDeckHandler()}
            >Edit</button>

            <button
              className="btn btn-primary mx-1"
              onClick={() => studyHandler()}
            >Study</button>

            <button
              onClick={() => addCardHandler()}
              className="btn btn-primary mx-1"
            >Add Cards</button>
            <button
              onClick={() => deleteDeckHandler(deck)}
              className="btn btn-danger mx-1"
            >Delete</button>

          </div>
        </div>
        <h1>Cards</h1>
        {cards.map((card) => {
          return (
            <div className="card-deck" key={card.id}>
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col">{card.front}</div>
                    <div className="col">{card.back}</div>
                  </div>
                  <div className="container row">
                    
                    <button
                      className="btn btn-secondary mx-1"
                      onClick={() => editCardHandler(card)}
                    >Edit</button>

                    <button
                      className="btn btn-danger mx-1"
                      onClick={() => deleteCardHandler(card)}
                    >Delete</button>

                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        <h3>This deck is empty</h3>
        <div>
          <Link
            to={`/decks/${deckId}/cards/new`}
            className="btn btn-secondary mx-2"
          >
            Add Cards
          </Link>
        </div>
      </div>
    );
  }
}

export default Deck;
