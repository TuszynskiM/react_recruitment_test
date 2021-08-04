import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, IconButton, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { AddBox, IndeterminateCheckBox } from "@material-ui/icons";
import { useDispatch } from "react-redux";

import useDebounce from "hooks/useDebounce";
import { checkCartQty } from "api";
import { setAmountToPay } from "state";

const styles = makeStyles({
  shoppingCartContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

const CartOptions = ({ min, max, isBlocked, pid, price }) => {
  const classes = styles();

  const isMount = useRef(false);
  const [cartQty, setCartQty] = useState(min);
  const [qtyAdded, setQtyAdded] = useState(0);
  const cartDebounceValue = useDebounce(cartQty);

  const dispatch = useDispatch();

  useEffect(() => {
    const amountToCount = (cartQty - qtyAdded) * parseFloat(price);
    if (isMount.current) {
      const body = {
        pid,
        quantity: cartDebounceValue,
      };
      checkCartQty(body).then((resp) => {
        if (resp.isError) {
          setCartQty(min);
        } else {
          setQtyAdded(cartQty);
          dispatch(setAmountToPay(amountToCount));
        }
      });
    } else {
      setQtyAdded(cartQty);
      dispatch(setAmountToPay(amountToCount));
      isMount.current = true;
    }
  }, [cartDebounceValue]);

  const handleAdd = () => {
    setCartQty((prevState) => prevState + 1);
  };

  const handleRemove = () => {
    setCartQty((prevState) => prevState - 1);
  };

  return (
    <Box className={classes.shoppingCartContainer}>
      <IconButton disabled={isBlocked || cartQty <= min} onClick={handleRemove}>
        <IndeterminateCheckBox />
      </IconButton>
      <Typography>{`Obecnie masz ${cartQty} sztuk produktu`}</Typography>
      <IconButton disabled={isBlocked || cartQty >= max} onClick={handleAdd}>
        <AddBox />
      </IconButton>
    </Box>
  );
};

CartOptions.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  isBlocked: PropTypes.bool,
  pid: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default CartOptions;
