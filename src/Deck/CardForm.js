import React from "react";
import { Link } from "react-router-dom";

function CardForm({ submitForm, changeForm, card, deckId }) {
  return (
    <form id="cardForm" onSubmit={submitForm}>
      <div>
        <label>Front</label>
        <textarea
          name="front"
          value={card.front}
          onChange={changeForm}
          id="front"
          className="form-control mb-3"
          placeholder="Front side of card"
          rows={2}
        />

        <label>Back</label>
        <textarea
          name="back"
          value={card.back}
          onChange={changeForm}
          id="back"
          className="form-control mb-3"
          placeholder="Back side of card"
          rows={2}
        />
        <Link
          to={`/decks/${deckId}`}
          className="btn btn-secondary mr-2"
          name="cancel"
        >
          Done
        </Link>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  );
}

export default CardForm;
