import * as React from 'react';
//import { useState } from "react";
//import DrawersMenuUserAdmin from '../menu/DrawersMenuUserAdmin';
//import Login from '../login/Login';
import Navigation from '../../components/menu/Navigation';
//import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import imagenHome from '../../assets/images/homeImage.jpg';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
//import Grid from '@mui/material/Grid';
//import Paper from '@mui/material/Paper';

export default function Home() {

    //const [spacing, setSpacing] = useState(2);
    return (
        <div >
          <div >
      
       <h1 className="container text-secondary">Sistema de Gestion X-Express</h1>
    </div>
       
        <div className="container">
        <Card >
          <CardActionArea >
            <CardMedia
              component="img"
              width="50%"
              height="10%"
              image={imagenHome}
              alt="imagenlogoAsistencia"
            />
          </CardActionArea>
        </Card>
            </div>
        
        </div>
    );
}