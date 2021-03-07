/* eslint-disable */
import React , {useState, useEffect}from 'react';
import clsx from 'clsx';
import { makeStyles , useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Listitems from './SidebarListitem'
import ListItemGroup from './Listitemgroups'
import axios from 'axios'
//redux
import { fetchMenu } from '../redux/sidebar/sidebarActions'




const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));



 function SideBar({ open ,handleDrawerClose , classes}) {
    const theme = useTheme();
    const ListItemClasses = useStyles();
    const [items, setItems] = useState([])

 useEffect(()=>{

  axios.get('https://api.mocki.io/v1/b1233ced').then(
    res =>{
      console.log('heyyyy',res.data)
      setItems(res.data)
    }
  ).catch(err=>{
    console.log(err)
  })
 },[])
 console.log('bitcheees',items)


    let itemsList = items.map((item,index)=>{
      // we will return item group
    if (item.items){
      return <ListItemGroup 
      key={index}
      nestedItem={ListItemClasses.nested} 
      text={item.text} 
      icon={item.icon} 
      items={item.items}/>


}
  

// otherwise we will just return a list item
return <Listitems 
key={index}
text ={item.text} 
icon={item.icon} 
route={item.route}/>
    })
    console.log(itemsList)
    
    
 return (
    <>
 <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          
<div className={classes.toolbarIcon}>

  <IconButton onClick={handleDrawerClose}>
    <ChevronLeftIcon />
  
  </IconButton>
 
</div>
<Divider />
<List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={ListItemClasses.root}
    >
  {itemsList}
</List>
<Divider />

</Drawer>
</>
    );
  }


  const mapStateToProps = state => {
    return {
      userData: state.user
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      fetchMenu: () => dispatch(fetchMenu())
    }
  }

export default SideBar