/* eslint-disable */
import { makeStyles , useTheme  } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
// routes config
import routes from '../route'



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        NETPLANET
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));


  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)



export default function Main() {
    const classes = useStyles();
    const theme = useTheme();
  
 return (
    <>

<main className={classes.content}>
<div className={classes.appBarSpacer} />
<Container maxWidth="lg" className={classes.container}>
  <Grid container spacing={3}>

  <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                  
                      <route.component {...props} />
                
                  )} />
              )
            })}
            <Redirect from="/" to="/" />
          </Switch>
        </Suspense>


    {/* Chart */}
  
    {/* Recent Deposits */}

    {/* Recent Orders */}

  </Grid>
  <Box pt={4}>
    <Copyright />
  </Box>
</Container>
</main>
</>
  );
}