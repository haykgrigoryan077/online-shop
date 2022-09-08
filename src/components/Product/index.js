import React, { useContext, useState } from "react";
import { deleteData, ShopDataContext } from "../../context";
import Popup from "../Popup";
import "./style.css";

const Product = () => {
  const context = useContext(ShopDataContext);
  console.log(context);
  const [isOpenId, setIsOpenId] = useState(null);

  const togglePopup = (id) => {
    setIsOpenId(id);
  };

  return (
    <div className="contentWrapper">
      <div className="popup">
        {isOpenId && <Popup togglePopup={togglePopup} id={isOpenId} />}
      </div>
      <div className="cardsWrapper">
        {context.state.shopData &&
          context.state.shopData.map((value, index) => {
            return (
              <div className="productWrapper" key={index + "product"}>
                <div className="buttons">
                  <button
                    className="deleteButton"
                    onClick={() => {
                      deleteData(value.id, context.dispatch);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="editButton"
                    onClick={() => {
                      togglePopup(value.id);
                    }}
                  >
                    Edit
                  </button>
                </div>
                <div className="productName">
                  <h2>{value.title}</h2>
                  <h4>{value.category}</h4>
                </div>
                <div className="productImage">
                  <img src={value.image} className="productImage" alt="img" />
                </div>
                <div className="productPrice">
                  <h2>{value.price + "$"}</h2>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Product;
