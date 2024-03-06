import React from "react";

function CardForm({ submitHandler, changeHandler, cancelHandler, deck }) {
    return (
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <label>Front</label>
                <textarea
                    onChange={changeHandler}
                    id="front"
                    name="back"
                    type="text"
                    className="form-control"
                    value={deck.front}
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
                    value={deck.back}
                    />
            </div>

            <button onClick={cancelHandler} className="btn btn-secondary mx-1">
                Cancel
            </button>

            <button onClick={submitHandler} className="btin btn=primary mx-1" type="submit">
                Save
            </button>
        </form>
    )
}


export default CardForm;