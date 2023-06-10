import React/*, { Component }*/ from "react";
import { useState, useEffect, useContext } from "react";
import { Link, /*useLocation,*/ useNavigate } from "react-router-dom";
//import Badge from '@mui/material/Badge';
//import axios from 'axios';
//import Login from '../login/Login';
//import { ApiRestBase } from '../../components/servicios/ApiRest';
//import { ApiControladorUsuarios } from '../../components/servicios/ApiRest';
import './Menu.css';
import Modal from 'react-bootstrap/Modal';

export default function Navigation() {
    const navigate = useNavigate();

    const [modalAcercaDe, setModalAcercaDe] = useState(false);

    const abrirCerrarModelAcercaDe = () => {
        setModalAcercaDe(!modalAcercaDe);
    }


    const cerrarSesion = () => {
     
        
        navigate('/login');

    }



    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                <Link className="navbar-brand" to="/DrawersMenuUserAdmin/Home">X-Express</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item" >
                                
                            </li>

                        </ul>
                        <form className="d-flex">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                               <li className="nav-item">
                                    <Link className="nav-link active" onClick={() => abrirCerrarModelAcercaDe()}>Ayuda</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/">Usuario:</Link>
                                </li>
                            </ul>
                        </form>
                        <div className="btnSesion">
                            <div className="nav-link active">
                                <button className="btn btn-outline-success" type="submit" onClick={() => cerrarSesion()}>{false ? "Cerrar Sesion" : "Iniciar Sesion"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div>
            <Modal show={modalAcercaDe} className="contenedorModal">
                    <Modal.Header>Soporte de ayuda</Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                        <label>Canales de ayuda: </label>
                            <br />
                            <label>Soporte Tec.: (809) 000-0000 Ext. 5000 </label>
                            <br/>
                            <a target="_blank" rel="noreferrer" href="http://soportetecnico">Reportar via Ticket</a>
                            
                            <br />
                            <br />
                            <label>Version: v1 </label>
                            <br />
                            <label>Fecha: 16/05/2023 </label>
                            <br />
                            
                            
                            
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <label  style={{ marginRight: 100 }}>Copyright © {new Date().getFullYear()}</label>
                        <button className="btn btn-primary" onClick={() => abrirCerrarModelAcercaDe()}>Cerrar</button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
