/* eslint-disable */
import {DashboardRounded} from '@material-ui/icons'



export default [

{
    text:'Dashboard',
    route:'/',
    icon:DashboardRounded
},

{
    text:'Users',
    icon:DashboardRounded,
    items :[
        {
            text:'Dashboard',
            route:'/home',
            icon:DashboardRounded
        }

    ]
},
{
    text:'Users',
    icon:DashboardRounded,
    items :[
        {
            text:'Dashboard',
            route:'/',
            icon:DashboardRounded
        }

    ]
}

];