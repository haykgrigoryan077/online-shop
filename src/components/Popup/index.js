import React, { useContext, useState } from "react";
import { editData, ShopDataContext } from "../../context";
import "./style.css";

const Popup = ({ togglePopup, id }) => {
  const context = useContext(ShopDataContext);
  console.log(context);
  const [inputsState, setInputsState] = useState({
    title: context.state.shopData.find(i => i.id === id).title,
    price: context.state.shopData.find(i => i.id === id).price,
  });

  const handleInput = (e) => {
    setInputsState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const editProductData = () => {
    editData(id, inputsState, context.dispatch);
  };

  return (
    <div className="popupwrapper">
      <div className="popupStyles">
        <button
          className="closePopup"
          onClick={() => {
            togglePopup(null);
          }}
        >
          X
        </button>
        <form className="inputs">
          <input
            type="text"
            placeholder="title..."
            name="title"
            value={inputsState.title}
            onChange={handleInput}
          />
          <input
            type="number"
            placeholder="price"
            name="price"
            value={inputsState.price}
            onChange={handleInput}
          />
          <button
            className="editbutton"
            onClick={(e) => {
              e.preventDefault();
              togglePopup();
              editProductData();
              console.log(context);
            }}
          >
            Submit Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
