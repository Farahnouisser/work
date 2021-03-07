/* eslint-disable */
import './App.css';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { Suspense } from 'react'
import { BrowserRouter,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
//import Product from './Components/Products/Product'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  }}))


  const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  )

  // Template
const Template = React.lazy(() => import('./Layouts.js/Template'));


  
// Pages
const Login = React.lazy(() => import('./Pages/SignIn'));


function App() {
  return (
    <div>

<BrowserRouter>


<React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route path="/" name="Home" render={props => <Template {...props}/>} />

            </Switch>
          </React.Suspense>


  </BrowserRouter>
    </div>
  );
}

export default App;
