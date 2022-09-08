import React, { useReducer } from "react";
import axios from "axios";
import baseUrl from "../api";

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_SHOP_DATA":
      return {
        ...state,
        loading: true,
        shopData: [],
      };
    case "GET_SHOP_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        shopData: action.payload,
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        loading: false,
        shopData: [
          ...state.shopData.filter(
            (product) => product.id !== action.payload.id
          ),
        ],
      };
    case "EDIT_PRODUCT_DATA":
      const newData = [...state.shopData]
      const index = newData.findIndex(i => i.id === action.payload.id)
      newData[index] = {...newData[index], ...action.payload.data}
      console.log(newData, 'newData');
      return {
        ...state,
        shopData: newData
      }
    default:
      return { ...state };
  }
};

const ShopDataContext = React.createContext();

export const getData = (dispatch) => {
  dispatch({ type: "GET_SHOP_DATA" });
  axios.get(baseUrl).then((res) => {
    console.log(res.data);
    dispatch({
      type: "GET_SHOP_DATA_SUCCESS",
      payload: res.data,
    });
  });
};

export const deleteData = (id, dispatch) => {
  dispatch({
    type: "DELETE_PRODUCT",
    payload: {
      id: id,
    },
  });
};

export const editData = (id, data, dispatch) => {
  dispatch({
    type: "EDIT_PRODUCT_DATA",
    payload: {
      id: id,
      data: data
    }
  })
}

const ShopDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    shopData: [],
  });
  return (
    <ShopDataContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopDataContext.Provider>
  );
};

export { ShopDataProvider, ShopDataContext };
