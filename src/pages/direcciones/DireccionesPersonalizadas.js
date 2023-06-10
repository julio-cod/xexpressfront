import * as React from 'react';
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import './Direcciones.css'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Modal from 'react-bootstrap/Modal';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { ApiRestBase } from '../../servicios/ApiRest';
import { ApiControladorDireccion } from '../../servicios/ApiRest';
import { ApiBuscarDireccionesByIdCliente } from '../../servicios/ApiRest';
import { ApiRegistroDireccion } from '../../servicios/ApiRest';
import { ApiEditarDireccion } from '../../servicios/ApiRest';
import { ApiEliminarDireccion } from '../../servicios/ApiRest';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../components/Loading/Loading';
import { useParams } from 'react-router-dom';

const columns = [
    { id: 'id', label: 'Id', minWidth: 90 },
    //{ id: 'idcliente', label: 'IdCliente', minWidth: 100 },
    { id: 'direccion', label: 'Direccion', minWidth: 100 },
    { id: 'provincia', label: 'Provincia', minWidth: 100 },
];

export default function DireccionesPersonalizadas() {
    let {idclienteparam,nombreparam} = useParams();
    const baseUrlListaDireccionesByIdCliente = ApiRestBase  + ApiControladorDireccion + ApiBuscarDireccionesByIdCliente;
    const baseUrlRegistrarDireccion = ApiRestBase  + ApiControladorDireccion + ApiRegistroDireccion;
    const baseUrlEditarDireccion = ApiRestBase  + ApiControladorDireccion + ApiEditarDireccion;
    const baseUrlEliminarDireccion = ApiRestBase  + ApiControladorDireccion + ApiEliminarDireccion;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const rows = data;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [modalDirecciones, setModalDirecciones] = useState(false);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalElimnar, setModalEliminar] = useState(false);
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState('');
    const [direccionSeleccionada, setDireccionSeleccionada] = useState({
        id: '',
        idcliente: idclienteparam,
        direccion: '',
        provincia: ''
    })


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setDireccionSeleccionada({
            ...direccionSeleccionada,
            [name]: value
        })
        
    }

    const abrirCerrarModelInsertar = () => {
        setModalInsertar(!modalInsertar);
    }

    const abrirCerrarModelEditar = () => {
        setModalEditar(!modalEditar);
    }

    const abrirCerrarModelEliminar = () => {
        setModalEliminar(!modalElimnar);
    }

    const listaProvincias = [
        {
            id: '1',
            value: 'Santo Domingo',
            label: 'Santo Domingo',
        },
        {
            id: '2',
            value: 'La Romana',
            label: 'La Romana',
        }
    ];

    useEffect(() => {
        if (direccionSeleccionada.provincia !== '') {
            setProvinciaSeleccionada(direccionSeleccionada.provincia );
        }

    }, [direccionSeleccionada.provincia])

  
    const CargarDirecciones = async () => {
        await axios.get(baseUrlListaDireccionesByIdCliente+"/"+idclienteparam)
            .then(response => {
                //console.log(response.data);
                setData(response.data.data);

            }).catch(error => {
                console.log(error);
                //alert(error.response.status);
                //alert(validCode.test(error));
                if (error.response.status === 401) {
                    alert("No estas autorizado para esta seccion");
                 
                }
                else {
                    alert(error);
                }
                //alert(error);
            })
    
    }

    useEffect(() => {
        CargarDirecciones();
    }, [data.length])

    const seleccionarDireccion= (cliente, caso) => {
        setDireccionSeleccionada(cliente);
        (caso === "Editar") ? abrirCerrarModelEditar() : abrirCerrarModelEliminar();
    }

    const RegistrarDireccion = async () => {
        delete direccionSeleccionada.id;
        console.log(direccionSeleccionada);
        await axios.post(baseUrlRegistrarDireccion, direccionSeleccionada)
            .then(response => {
                setData(data.concat(response.data.data));
                var Resp = "Direccion Guardado con exito!";
                notifySuccess(Resp);
                CargarDirecciones();
                abrirCerrarModelInsertar();
            }).catch(error => {
                console.log(error);
                var Resp = "Error al tratar de Guardar Direccion";
                notifyError(Resp);
            })
    }

    const EditarDireccion = async () => {
        await axios.post(baseUrlEditarDireccion, direccionSeleccionada)
            .then(response => {
                var dataAuxiliar = data;
                dataAuxiliar.map(direccion => {
                    if (direccion.id === direccionSeleccionada.id) {
                        direccion.idcliente = direccionSeleccionada.idcliente;
                        direccion.direccion = direccionSeleccionada.direccion;
                        direccion.provincia = direccionSeleccionada.provincia;
                        var Resp = "Direccion editado con exito!";
                        notifySuccess(Resp);
                        CargarDirecciones();
                    }
                })
                abrirCerrarModelEditar();
            }).catch(error => {
                console.log(error);
                var Resp = "Error al tratar de Guardar Direccion";
                notifyError(Resp);
            })
    }

    const EliminarDireccion = async () => {
        await axios.post(baseUrlEliminarDireccion +"/"+ direccionSeleccionada.id)
            .then(response => {
                setData(data.filter(usuario => usuario.id !== response.data.data))
                var Resp = "Direccion Eliminado";
                notifySuccess(Resp);
                CargarDirecciones();
                abrirCerrarModelEliminar();
            }).catch(error => {
                var Resp = "Error al tratar de eliminar el Direccion";
                console.log(error);
                notifyError(Resp);

            })
    }

 

    const notifySuccess = (mensaje) => toast.success( mensaje, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const notifyError = (mensaje) => toast.error(mensaje, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

 

    return (
        <div >
        <ToastContainer />
        <h2>Direcciones del Cliente: {nombreparam}</h2>
        <div className="form-group">
        <br />
        <button className="btn btn-primary" onClick={() => abrirCerrarModelInsertar()}>Nuevo</button>{" "}

        <Modal show={modalInsertar} className="contenedorModalCliente" >
                    <Modal.Header>Registrar Direccion</Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                        <br />
        <label>Direccion: </label>
        <br />
        <input type="text" className="form-control" name="direccion" onChange={handleChange}  />
        <br />
        <label>Provincia: </label>
        <br />
        <div  >
            <Select className="contenedorSelectModalDireccion" sx={{ width: '30%' }}
                name="provincia"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={provinciaSeleccionada}
                label="provincia"
                onChange={handleChange}
            >{listaProvincias.map((listaProvincias) => (
                <MenuItem key={listaProvincias.id} value={listaProvincias.value}>{listaProvincias.label}</MenuItem>
            ))}
            </Select>
        </div>
                            <br />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={() => RegistrarDireccion()}>Guardar</button>{" "}
                        <button className="btn btn-danger" onClick={() => abrirCerrarModelInsertar()}>Cancelar</button>
                    </Modal.Footer>
                </Modal>

    </div>
            {" "}
            <br />
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 640 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                        <td>
                                            <button className="btn btn-primary" onClick={() => seleccionarDireccion(row, "Editar")}>Editar</button>
                                            {" "}
                                            <button className="btn btn-danger" onClick={() => seleccionarDireccion(row, "Eliminar")}>Eliminar</button>
                                        </td>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <div>
            <Modal show={modalEditar} className="contenedorModalDireccion" >
                    <Modal.Header>Editar Direccion</Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label>Id: </label>
                            <br />
                            <input type="text" className="form-control" name="id" readOnly value={direccionSeleccionada && direccionSeleccionada.id} />
                            <br />
                            <label>Direccion: </label>
                            <br />
                            <input type="text" className="form-control" name="direccion"  onChange={handleChange} value={direccionSeleccionada && direccionSeleccionada.direccion} />
                            <br />
                            <label>Provincia: </label>
                            <br />
                            <div  >
                                <Select className="contenedorSelectModalDireccion" sx={{ width: '30%' }}
                                    name="provincia"
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={provinciaSeleccionada}
                                    label="provincia"
                                    onChange={handleChange}
                                >{listaProvincias.map((listaProvincias) => (
                                    <MenuItem key={listaProvincias.id} value={listaProvincias.value}>{listaProvincias.label}</MenuItem>
                                ))}
                                </Select>
                            </div>
                            <br />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={() => EditarDireccion()}>Guardar</button>{" "}
                        <button className="btn btn-danger" onClick={() => abrirCerrarModelEditar()}>Cancelar</button>
                    </Modal.Footer>
                </Modal>

                <Modal show={modalElimnar} className="contenedorModal">
                    <Modal.Body>
                        Seguro que desa eliminar esta direccion: {direccionSeleccionada && direccionSeleccionada.direccion} ?
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-danger" onClick={() => EliminarDireccion()}>Si</button>{" "}
                        <button className="btn btn-secondary" onClick={() => abrirCerrarModelEliminar()}>No</button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}