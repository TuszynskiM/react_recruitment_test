import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, List, Typography } from "@material-ui/core";

import { fetchCart } from "actions";
import CartOptions from "components/CartOptions";
import { getFormatedAmount } from "utils/getFormatedAmount";
import CustomListItem from "components/CustomListItem";
import Loader from "components/shared/Loader";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const { cart, loading, toPay } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  return (
    <>
      {loading ? (
        <Loader isLoading={loading} />
      ) : (
        <React.StrictMode>
          <div className="container">
            <h3>Lista produktów</h3>
            <List>
              {cart.map((item) => (
                <CustomListItem
                  key={item.pid}
                  name={`${item.name}, cena: ${getFormatedAmount(item.price)}`}
                >
                  <CartOptions
                    min={item.min}
                    max={item.max}
                    isBlocked={item.isBlocked}
                    pid={item.pid}
                    price={getFormatedAmount(item.price)}
                  />
                </CustomListItem>
              ))}
            </List>
            <Typography style={{ fontWeight: "bold", marginTop: 24 }}>
              {`Razem do zapłaty: ${getFormatedAmount(toPay)}`}
            </Typography>
          </div>
        </React.StrictMode>
      )}
    </>
  );
};

export { App };
