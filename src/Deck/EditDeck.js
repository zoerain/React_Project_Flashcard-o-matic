import React, { useState, useEffect } from "react";
import { readDeck, updateDeck } from "../utils/api/index";
import { useParams, Link, useHistory } from "react-router-dom";

//Component to edit a deck
function EditDeck() {
  const initialDeckState = { id: '', name: '', description: '' };
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
  const handleCancel = async () => {
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
      <form onSubmit={submitHandler}>
        <h1>Edit Deck</h1>
        <div className="form-group">
          <label>Name</label>
          <input
            onChange={changeHandler}
            id="name"
            name="name"
            type="text"
            className="form-control"
            value={deck.name}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            onChange={changeHandler}
            id="description"
            name="description"
            type="text"
            className="form-control"
            value={deck.description}
          />
        </div>

        <button
          className="btn btn-secondary mx-1"
          onClick={handleCancel}
        >Cancel</button>

        <button 
          type="submit"
          className="btn btn-primary mx-1"
          >Submit</button>

      </form>
    </div>
  );
}

export default EditDeck;
