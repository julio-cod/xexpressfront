import * as React from 'react';
//import { useState} from "react";
import './Menu.css';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import CardMedia from '@mui/material/CardMedia';
//import Card from '@mui/material/Card';
//import { CardActionArea } from '@mui/material';
import Clientes from '../../pages/clientes/Clientes';


//const drawerWidth = 240;

function DrawersMenuUser(props) {
  const { window } = props;
  //const [mobileOpen, setMobileOpen] = React.useState(false);
  //const [spacing, setSpacing] = useState(0);
  /*const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };*/

  //const [openAdministracion, setOpenAdministracion] = React.useState(false);
  //const [openAdministracionTest, setOpenAdministracionTest] = React.useState(false);
  //const [openConfiguracion, setOpenConfiguracion] = React.useState(false);
  //const [userAdmin, setUserAdmin] = useState(false);
/*
const handleClickAdministracion = () => {
    setOpenAdministracion(!openAdministracion);
  };

  const handleClickConfiguracion = () => {
    setOpenConfiguracion(!openConfiguracion);
  };

  const handleClickAdministracionTest = () => {
    setOpenAdministracion(!openAdministracion);
  };*/

  //const [data, setData] = useState([]);
  //const rows = data;



  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
    <div >
       <Navigation />
       <h1 className="container text-secondary">Sistema X-Express</h1>
    </div>
    
    
    <Routes>
          <Route path="/Clientes" element={<Clientes />} />
        </Routes>
    </div>
  );
}

DrawersMenuUser.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawersMenuUser;
