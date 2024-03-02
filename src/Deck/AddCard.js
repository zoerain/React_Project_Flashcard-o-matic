import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";


//Add a card to a deck component
function AddCard() {
  const initialState = {
    front: '',
    back: '',
  };
  const [newCard, setNewCard] = useState(initialState);
  const [deck, setDeck] = useState({});
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    async function loadData() {
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
    loadData();
  }, []);

  //Input change handler
  const changeHandler = ({ target }) => {
    setNewCard({
      ...newCard,
      [target.name]: target.value,
    });
  }

  //Handler for submitting new card
  const submitHandler = async (event) => {
    event.preventDefault();
    await createCard(deckId, newCard);
    setNewCard(initialState);
    history.go(0);
  };

  const completeHandler = async () => {
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
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>

      <form onSubmit={submitHandler}>
        <h2>{deck.name}: Add Card</h2>
        <div className="form-group">
          <label>Front</label>
          <textarea
            onChange={changeHandler}
            id="front"
            name="front"
            type="text"
            className="form-control"
            value={newCard.front}
          />
        </div>
        <div className="form-group">
          <label>Back</label>
          <textarea
            onChange={changeHandler}
            id="back"
            name="back"
            type="text"
            className="form-control"
            value={newCard.back}
          />
        </div>

        <button
          onClick={completeHandler}
          className="btn btn-secondary mx-1"
        >Done</button>

        <button className="btn btn-primary mx-1" type="submit"
        >Save</button>
      </form>
    </div>
  );
}

export default AddCard;
