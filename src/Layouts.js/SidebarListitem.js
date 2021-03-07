

/* eslint-disable */
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import {Link} from 'react-router-dom'
import { asyncComponent } from 'react-async-component';

export const MaterialIconAsync = ({ icon }) => {
  let iconName = icon.replace(/Icon$/, '')
  return React.createElement(asyncComponent({
      resolve: () => import(
          /* webpackMode: "eager" */
          `@material-ui/icons/${iconName}`)
  }))
}



export default function SidebarListitem(props) {

  
  let { text , route , icon, nestedItem}=props;
  return (
      <ListItem 
      className={nestedItem}
       component ={Link}
       to={route}
        button>
        <ListItemIcon>
          <MaterialIconAsync icon= {icon}></MaterialIconAsync>
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
  
  );
}