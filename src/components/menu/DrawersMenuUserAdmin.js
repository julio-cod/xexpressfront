import * as React from 'react';
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import './Menu.css';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import GroupIcon from '@mui/icons-material/Group';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Navigation from './Navigation';
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Home from '../../pages/home/home';
import Clientes from '../../pages/clientes/Clientes';
import Direcciones from '../../pages/direcciones/Direcciones';
import DireccionesPersonalizadas from '../../pages/direcciones/DireccionesPersonalizadas';

const drawerWidth = 240;

function DrawersMenuUserAdmin(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigate = useNavigate();
  const [openAdministracion, setOpenAdministracion] = React.useState(true);
  const [openConfiguracion, setOpenConfiguracion] = React.useState(false);



  const handleClickAdministracion = () => {
    setOpenAdministracion(!openAdministracion);
  };

  const handleClickConfiguracion = () => {
    setOpenConfiguracion(!openConfiguracion);
  };



  const drawer = (
    <div>
      <Divider />
      <List className="drawer">
        {['Dashboard'].map((text, index) => (
          <ul key={text} className="navbar-nav">
            <li key={text} className="nav-item">
              <Link key={text} className="nav-link text-dark" to={text} >
                <ListItem button key={text}  >
                  <ListItemIcon>
                    {text === 'Dashboard' ? <DashboardIcon /> : ""}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            </li>
          </ul>
        ))}
      </List>
      <Divider />
      <Divider />
      <ListItemButton onClick={handleClickAdministracion}>
        <ListItemIcon>
          <HowToRegIcon />
        </ListItemIcon>
        <ListItemText primary="Gestion Clientes" />
        {openAdministracion ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openAdministracion} timeout="auto" unmountOnExit  >
        <List component="div" disablePadding key={1} >
          <Link className="nav-link text-dark" to="/DrawersMenuUserAdmin/Clientes"   >
            <ListItemButton sx={{ pl: 4, m: -1 }}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary={"Clientes"} />
            </ListItemButton></Link>
          <Link className="nav-link text-dark" to="/DrawersMenuUserAdmin/Direcciones"   >
            <ListItemButton sx={{ pl: 4, m: -1 }}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Direcciones"} />
            </ListItemButton></Link>
        </List>
      </Collapse>

    </div>

  );



  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        className="bg-dark"
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <div className="container">
            <Navigation />
            {/*<MenuNav/>*/}
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Routes>
        <Route path="/*" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Clientes" element={<Clientes />} />
          <Route path="/Direcciones" element={<Direcciones />} />
          <Route path="/DireccionesPersonalizadas/:idclienteparam/:nombreparam" element={<DireccionesPersonalizadas />} />
        </Routes>
      </Box>

    </Box>
    
  );
}

DrawersMenuUserAdmin.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawersMenuUserAdmin;


