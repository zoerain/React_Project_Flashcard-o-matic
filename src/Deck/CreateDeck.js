import React, { useState } from "react";
import { createDeck } from "../utils/api/index";
import { Link, useHistory } from "react-router-dom";
import CardForm from "./CardForm";
 
//Create a new deck component
function CreateDeck() {
  const history = useHistory();

  const initialState = {
    name: "",
    description: "",
  };

  const [newDeck, setNewDeck] = useState(initialState);

  //Handler to submit the create deck form
  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await createDeck(newDeck);
    setNewDeck(initialState);
    history.push("/");
    return response;
  };

  //Handler to track form input changes
  const changeHandler = ({ target }) => {
    setNewDeck({
      ...newDeck,
      [target.name]: target.value,
    });
  };

  //Handler for form cancel button
  const cancelHandler = async () => {
    history.push("/");
  };

  return (
    <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Create Deck
        </li>
      </ol>
      <form onSubmit={(event) => submitHandler(event)}>
        <h1>Create Deck</h1>
        <div className="form-group">
          <label>Name</label>
          <input
            id="name"
            name="name"
            onChange={changeHandler}
            required
            type="text"
            value={newDeck.name}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            id="description"
            name="description"
            onChange={changeHandler}
            type="text"
            value={newDeck.description}
            className="form-control"
          />
        </div>
        <button
          onClick={() => cancelHandler()}
          className="btn btn-secondary mx-1"
        >
          Cancel
        </button>
        <button className="btn btn-primary mx-1" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
