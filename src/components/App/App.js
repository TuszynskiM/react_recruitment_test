import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCart } from "actions";
import CartOptions from "components/CartOptions/CartOptions";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from "@material-ui/core";
import { getFormatedAmount } from "utils/getFormatedAmount";

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
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress size={80} />
        </Box>
      ) : (
        <div className="container">
          <h3>Lista produktów</h3>
          <List>
            {cart.map((item) => (
              <React.Fragment key={item.pid}>
                <ListItem>
                  <ListItemText>
                    {`${item.name}, cena: ${getFormatedAmount(item.price)}`}
                  </ListItemText>
                  <CartOptions
                    min={item.min}
                    max={item.max}
                    isBlocked={item.isBlocked}
                    pid={item.pid}
                    price={getFormatedAmount(item.price)}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          <Typography style={{ fontWeight: "bold", marginTop: 24 }}>
            {`Razem do zapłaty: ${getFormatedAmount(toPay)}`}
          </Typography>
        </div>
      )}
    </>
  );
};

export { App };
