import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { FaUserCircle } from "react-icons/fa";
import { NavLink, useLocation } from 'react-router-dom';

export const MainListItems = () => {
  const location = useLocation()
  return (

    <React.Fragment>
      <NavLink to={'/dashboard'}>

        <ListItemButton sx={{
          backgroundColor: location.pathname === '/dashboard' ? '#DD781E' : 'inherit',
          '&:hover': {
            backgroundColor: '#DD781E',
            color: "#fff"
          },
          '&.Mui-selected': {
            backgroundColor: '#DD781E',
            color: "#fff",
            '&:hover': {
              backgroundColor: '#DD781E',
              color: "#fff"
            },
          },
        }}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </NavLink>
      <NavLink to={'/rides'}>
        <ListItemButton sx={{
          backgroundColor: location.pathname === '/rides' ? '#DD781E' : 'inherit',
          '&:hover': {
            backgroundColor: '#DD781E',
            color: "#fff"
          },
          '&.Mui-selected': {
            backgroundColor: '#DD781E',
            color: "#fff",
            '&:hover': {
              backgroundColor: '#DD781E',
              color: "#fff"
            },
          },
        }}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Ride Management" />
        </ListItemButton>
      </NavLink>
      <NavLink to={'/drivers'}>
        <ListItemButton sx={{
          backgroundColor: location.pathname === '/drivers' ? '#DD781E' : 'inherit',
          '&:hover': {
            backgroundColor: '#DD781E',
            color: "#fff"
          },
          '&.Mui-selected': {
            backgroundColor: '#DD781E',
            color: "#fff",
            '&:hover': {
              backgroundColor: '#DD781E',
              color: "#fff"
            },
          },
        }}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Drivers" />
        </ListItemButton>
      </NavLink>
      <NavLink to={'/packages-detail'}>
        <ListItemButton sx={{
          backgroundColor: location.pathname === '/packages-detail' ? '#DD781E' : 'inherit',
          '&:hover': {
            backgroundColor: '#DD781E',
            color: "#fff"
          },
          '&.Mui-selected': {
            backgroundColor: '#DD781E',
            color: "#fff",
            '&:hover': {
              backgroundColor: '#DD781E',
              color: "#fff"
            },
          },
        }}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Packages Detail" />
        </ListItemButton>
      </NavLink>
      <NavLink to={'/co-admin'}>
        <ListItemButton sx={{
        backgroundColor: location.pathname === '/co-admin' ? '#DD781E' : 'inherit',
        '&:hover': {
          backgroundColor: '#DD781E',
          color: "#fff"
        },
        '&.Mui-selected': {
          backgroundColor: '#DD781E',
          color: "#fff",
          '&:hover': {
            backgroundColor: '#DD781E',
            color: "#fff"
          },
        },
      }}>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Co-Admins" />
        </ListItemButton>
      </NavLink>
    </React.Fragment>
  )
};

export const secondaryListItems = (
  <>
  </>
  // <React.Fragment>
  //   <ListSubheader component="div" inset>
  //     Saved reports
  //   </ListSubheader>
  //   <ListItemButton>
  //     <ListItemIcon>
  //       <AssignmentIcon />
  //     </ListItemIcon>
  //     <ListItemText primary="Current month" />
  //   </ListItemButton>
  //   <ListItemButton>
  //     <ListItemIcon>
  //       <AssignmentIcon />
  //     </ListItemIcon>
  //     <ListItemText primary="Last quarter" />
  //   </ListItemButton>
  //   <ListItemButton>
  //     <ListItemIcon>
  //       <AssignmentIcon />
  //     </ListItemIcon>
  //     <ListItemText primary="Year-end sale" />
  //   </ListItemButton>
  // </React.Fragment>
);
