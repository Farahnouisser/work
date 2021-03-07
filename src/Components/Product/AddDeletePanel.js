import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const styles = theme => ({
  root: {
    display: "flex",
    "& > *": {
      marginLeft: theme.spacing(1)
    }
  },
  button: {
    flex: 1,
    maxWidth: "100px",
    margin: "0 10px 0 0"
  }
});

const AddDeletePanel = ({ classes }) => (
  <div className={classes.root}>
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      startIcon={<AddCircleIcon />}
    >
      Add
    </Button>
    <Button
      variant="contained"
      color="secondary"
      className={classes.button}
      disabled
      startIcon={<DeleteIcon />}
    >
      Delete
    </Button>
  </div>
);

export default withStyles(styles)(AddDeletePanel);