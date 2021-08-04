import React from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemText, Divider } from "@material-ui/core";

const CustomListItem = ({ name, children }) => (
  <>
    <ListItem>
      <ListItemText>{name}</ListItemText>
      {children}
    </ListItem>
    <Divider />
  </>
);

CustomListItem.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default React.memo(CustomListItem);
