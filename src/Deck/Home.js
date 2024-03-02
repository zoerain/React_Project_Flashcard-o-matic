import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api/index";

//Home screen component
function Home() {

  const [decks, setDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function loadData() {
      const abortController = new AbortController();
      try {
        const decks = await listDecks(abortController.signal);
        setDecks(decks);
      } catch (error) {
        if (error.name !== 'AbortError') {
            throw error;
        }
      }
      return () => {
        abortController.abort();
      };
    }
    loadData();
  }, []);

  //Delete handler
  const handleDelete = async (deck) => {
   const confirm = window.confirm("Delete this deck? You will not be able to recover it.");
   if (confirm) {
     await deleteDeck(deck.id);
     history.go(0);
   }
  }

  
  return (
    <div className="container">
      <Link className="btn btn-secondary mb-2" to="/decks/new">
        Create Deck
      </Link>
      <div className="card-deck">
        {decks.map((deck) => {
          return (
            <div className="card" key={deck.id} style={{ width: "30rem" }}>
              <div className="card-body justify-content-between">
                <h4 className="card-title">{`${deck.name}`}</h4>
                <div className="card-subtitle mb-2 text-muted">
                  {`${deck.cards.length} cards`}
                </div>
                <div className="card-text">{`${deck.description}`}</div>

                <Link
                  to={`/decks/${deck.id}`}
                  className="btn btn-secondary mt-4 mx-1"
                >View</Link>

                <Link
                  to={`/decks/${deck.id}/study`}
                  className="btn btn-primary mt-4 mx-1"
                >Study</Link>

                <button
                  type="button"
                  onClick={() => handleDelete(deck)}
                  className="btn btn-danger mt-4 mx-1"
                >Delete</button>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
