import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import BudgetTable from "./Grid";
import AddDeletePanel from "./AddDeletePanel";

const styles = theme => ({
  root: {
    display: "grid",
    gridTemplateRows: "15px 250px auto",
    gridRowGap: "20px"
  },
  accountsLabel: {
    marginTop: "10px"
  }
});

const Accounts = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Typography className={classes.accountsLabel}>Product Mangement</Typography>
      <BudgetTable />
    </div>
  );
};

export default withStyles(styles)(Accounts);