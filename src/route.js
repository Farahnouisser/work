import React from 'react';


const Home = React.lazy(() => import('./Pages/Home'));
const Voip = React.lazy(() => import('./Layouts.js/Voip'));
const Grid = React.lazy(() => import('./Components/Prod/Grid'));
//const ProductTable = React.lazy(() => import('./Components/Product/ProductTable'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Home', component: Home },
  { path: '/voip', name: 'Voip', component: Voip },
  { path: '/product', name: 'Voip', component: Grid },
  
];

export default routes;