import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box, Typography, IconButton, makeStyles } from "@material-ui/core";
import { AddBox, IndeterminateCheckBox } from "@material-ui/icons";
import PropTypes from "prop-types";
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
  const [added, setAdded] = useState(0);
  const quantity = useDebounce(cartQty);

  const dispatch = useDispatch();

  useEffect(() => {
    const amountToCount = (cartQty - added) * parseFloat(price);
    if (!isMount.current) {
      isMount.current = true;
      return onSetAmount(amountToCount);
    }

    const body = { pid, quantity };
    checkCartQty(body).then((resp) => {
      resp.isError ? onSetCartQty(min) : onSetAmount(amountToCount);
    });
  }, [quantity]);

  const onSetAmount = useCallback((amount) => {
    onSetAdded(cartQty);
    dispatch(setAmountToPay(amount));
  }, []);

  const onSetCartQty = useCallback((value) => {
    setCartQty(value);
  }, []);

  const onSetAdded = useCallback((value) => {
    setAdded(value);
  }, []);

  const handleAdd = useCallback(() => {
    setCartQty((prevState) => prevState + 1);
  }, []);

  const handleRemove = useCallback(() => {
    setCartQty((prevState) => prevState - 1);
  }, []);

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

export default React.memo(CartOptions);
