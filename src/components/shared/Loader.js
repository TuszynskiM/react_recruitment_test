import React from "react";
import { Box, CircularProgress } from "@material-ui/core";
import PropTypes from "prop-types";

function Loader({ isLoading }) {
  return isLoading ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress size={80} />
    </Box>
  ) : null;
}

Loader.propTypes = {
  isLoading: PropTypes.bool,
};

export default React.memo(Loader);
