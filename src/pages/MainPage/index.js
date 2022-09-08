import React, { useContext, useEffect } from "react";
import Header from "../../components/Header";
import Product from "../../components/Product";
import { getData, ShopDataContext } from "../../context";
import "./style.css";

const MainPage = () => {
  const context = useContext(ShopDataContext);
  console.log(context);
  useEffect(() => {
    getData(context.dispatch);
  }, [context.dispatch]);

  return (
    <div className="pageWrapper">
      <Header />
      <Product />
    </div>
  );
};

export default MainPage;
