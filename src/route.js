import React from 'react';


const Home = React.lazy(() => import('./Pages/Home'));
const Voip = React.lazy(() => import('./Layouts.js/Voip'));
const Product = React.lazy(() => import('./Components/Products/Product'));
//const ProductTable = React.lazy(() => import('./Components/Product/ProductTable'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Home', component: Home },
  { path: '/voip', name: 'Voip', component: Voip },
  { path: '/product', name: 'Voip', component: Product },
  
];

export default routes;