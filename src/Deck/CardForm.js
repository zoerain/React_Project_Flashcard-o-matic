import React from "react";

function CardForm({ submitHandler, changeHandler, completeHandler, card }) {
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
                    value={card.front}
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
                    value={card.back}
                    />
            </div>

            <button onClick={completeHandler} className="btn btn-secondary mx-1">
                Done
            </button>

            <button className="btin btn=primary mx-1" type="submit">
                Save
            </button>
        </form>
    )
}


export default CardForm;