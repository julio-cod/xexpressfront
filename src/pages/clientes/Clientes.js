import * as React from 'react';
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import './Clientes.css'
import {Link, useNavigate } from 'react-router-dom';
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
import { ApiControladorCliente } from '../../servicios/ApiRest';
import { ApiListaClientes } from '../../servicios/ApiRest';
import { ApiBuscarClienteByNombre } from '../../servicios/ApiRest';
import { ApiRegistroCliente } from '../../servicios/ApiRest';
import { ApiEditarCliente } from '../../servicios/ApiRest'
import { ApiEliminarCliente } from '../../servicios/ApiRest'
import { ApiControladorDireccion } from '../../servicios/ApiRest';
import { ApiListaDirecciones } from '../../servicios/ApiRest';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../components/Loading/Loading';

const columns = [
    { id: 'id', label: 'Id', minWidth: 90 },
    { id: 'nombre', label: 'Nombre', minWidth: 100 },
    { id: 'dni', label: 'DNI', minWidth: 100 },
    { id: 'telefono', label: 'Telefono', minWidth: 100 },
    { id: 'sexo', label: 'Sexo', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
];

const columnsDirecciones = [
    { id: 'id', label: 'Id', minWidth: 90 },
    //{ id: 'idcliente', label: 'IdCliente', minWidth: 100 },
    { id: 'direccion', label: 'Direccion', minWidth: 100 },
    { id: 'provincia', label: 'Provincia', minWidth: 100 },
];

export default function Clientes() {
    const navigate = useNavigate();
    const baseUrlListaClientes = ApiRestBase + ApiControladorCliente + ApiListaClientes;
    const baseUrlRegistrarCliente = ApiRestBase  + ApiControladorCliente + ApiRegistroCliente;
    const baseUrlEditarCliente = ApiRestBase  + ApiControladorCliente + ApiEditarCliente;
    const baseUrlEliminarCliente = ApiRestBase  + ApiControladorCliente + ApiEliminarCliente;
    const baseUrlBuscarClientesByNombre = ApiRestBase  + ApiControladorCliente + ApiBuscarClienteByNombre;
    const baseUrlListaDirecciones = ApiRestBase  + ApiControladorDireccion + ApiListaDirecciones;
    
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const rows = data;
    const [dataDirecciones, setDataDirecciones] = useState([]);
    const rowsDirecciones = dataDirecciones;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalElimnar, setModalEliminar] = useState(false);
    const [modalDirecciones, setModalDirecciones] = useState(false);

    const [sexoClienteSeleccionado, setSexoClienteSeleccionado] = useState('');
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState('');
    const [clienteSeleccionado, setClienteSeleccionado] = useState({
        id: '',
        nombre: '',
        dni: '',
        telefono: '',
        sexo: '',
        email: ''
    })

    const [direccionSeleccionada, setDireccionSeleccionada] = useState({
        id: '',
        idcliente: '',
        direccion: '',
        provincia: ''
    })

    const sexoCliente = [
        {
            id: '1',
            value: 'M',
            label: 'M',
        },
        {
            id: '2',
            value: 'F',
            label: 'F',
        }
    ];

    const listaProvincias = [
        {
            id: '1',
            value: '1',
            label: 'Santo Doming',
        },
        {
            id: '2',
            value: '2',
            label: 'La Romana',
        }
    ];

    const [clienteDigitadoBusc, setClienteDigitadoBusc] = useState({
        cliente: ''
    })

    useEffect(() => {
        if (clienteSeleccionado.sexo !== '') {
            setSexoClienteSeleccionado(clienteSeleccionado.sexo );
        }

    }, [clienteSeleccionado.sexo])

    

    const abrirCerrarModelInsertar = () => {
        setModalInsertar(!modalInsertar);
    }

    const abrirCerrarModelEditar = () => {
        setModalEditar(!modalEditar);
    }

    const abrirCerrarModelEliminar = () => {
        setModalEliminar(!modalElimnar);
    }

    const abrirCerrarModelDirecciones = () => {
        setModalDirecciones(!modalDirecciones);
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setClienteSeleccionado({
            ...clienteSeleccionado,
            [name]: value
        })

    }

    const handleChangeClienteDigitadoBusc = e => {
        const { name, value } = e.target;
        setClienteDigitadoBusc({
            ...clienteDigitadoBusc,
            [name]: value
        })
        if(e.target.value === ''){
            setData([]);
        }

    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            CargarClientesByNombre();
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const CargarClientes = async () => {
        await axios.get(baseUrlListaClientes)
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
        CargarClientes();
    }, [])

    const CargarClientesByNombre = async () => {
        if(clienteDigitadoBusc.cliente !== '' || clienteDigitadoBusc.cliente !== undefined){
            await axios.get(baseUrlBuscarClientesByNombre +"/"+ clienteDigitadoBusc.cliente)
            .then(response => {
                console.log(response.data.data);
                setData(response.data.data);

            }).catch(error => {
                console.log(error);
                if (error.response.status === 401) {
                    alert("No estas autorizado para esta seccion");
                    navigate('/');
                }
                else {
                    var Resp = "Error al tratar de buscar cliente";
                notifyError(Resp);
                }
            })
        }
        else{
            var Resp = "Digite el cliente";
            notifyError(Resp);
        }
        
    }



    const RegistrarCliente = async () => {
        delete clienteSeleccionado.id;
        await axios.post(baseUrlRegistrarCliente, clienteSeleccionado)
            .then(response => {
                setData(data.concat(response.data.data));
                abrirCerrarModelInsertar();
                var Resp = "Cliente Guardado con exito!";
                notifySuccess(Resp);
                CargarClientes();
            }).catch(error => {
                console.log(error);
                var Resp = "Error al tratar de Guardar Cliente";
                notifyError(Resp);
            })
    }

    const EditarCliente = async () => {
        await axios.post(baseUrlEditarCliente, clienteSeleccionado)
            .then(response => {
                //setData(data.concat(response.data.data));
                var dataAuxiliar = data;
                dataAuxiliar.map(cliente => {
                    if (cliente.id === clienteSeleccionado.id) {
                        cliente.nombre = clienteSeleccionado.nombre;
                        cliente.dni = clienteSeleccionado.dni;
                        cliente.telefono = clienteSeleccionado.telefono;
                        cliente.sexo = clienteSeleccionado.sexo;
                        cliente.email = clienteSeleccionado.email;
                        var Resp = "Cliente editado con exito!";
                        notifySuccess(Resp);
                        CargarClientes();
                    }
                })
                abrirCerrarModelEditar();
            }).catch(error => {
                console.log(error);
                var Resp = "Error al tratar de Guardar Cliente";
                notifyError(Resp);
            })
    }

    const EliminarCliente = async () => {
        await axios.post(baseUrlEliminarCliente +"/"+ clienteSeleccionado.id)
            .then(response => {
                setData(data.filter(usuario => usuario.id !== response.data.data))
                var Resp = "Cliente Eliminado";
                notifySuccess(Resp);
                CargarClientes();
                abrirCerrarModelEliminar();
            }).catch(error => {
                var Resp = "Error al tratar de eliminar el cliente";
                console.log(error);
                notifyError(Resp);

            })
    }

    const seleccionarCliente= (cliente, caso) => {
        setClienteSeleccionado(cliente);
        (caso === "Editar") ? abrirCerrarModelEditar() : abrirCerrarModelEliminar();
    }


    const GoDireccionesPersonalizadas = async (row) => {
        navigate('/DrawersMenuUserAdmin/DireccionesPersonalizadas/' + row.id + "/" + row.nombre);
    
    }

    


    const notifySuccess = (mensaje) => toast.success(mensaje, {
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
            <h2>Lista de Clientes</h2>
            {" "}
            <button onClick={()=> abrirCerrarModelInsertar()} className="btn btn-success">Agregar Nuevo</button>
            <br /><br />
            <div  className="d-flex" style={{width: '40%', maxWidth:'40%'}}>
                <label style={{fontWeight: 'bold'}}>Busqueda: </label>
                
                <input type="text" className="form-control" style={{marginLeft: '2%'}} name="cliente" placeholder="Nombre cliente" onChange={handleChangeClienteDigitadoBusc} value={clienteDigitadoBusc && clienteDigitadoBusc.cliente} onKeyDown={handleKeyDown} />
                
                <button className="btn btn-primary" style={{marginLeft: '2%'}} onClick={() => CargarClientesByNombre()}>Buscar</button>
                
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
                                            <button className="btn btn-success" onClick={() => GoDireccionesPersonalizadas(row)}>Direcciones</button>
                                            {" "}
                                            <button className="btn btn-primary" onClick={() => seleccionarCliente(row, "Editar")}>Editar</button>
                                            {" "}
                                            <button className="btn btn-danger" onClick={() => seleccionarCliente(row, "Eliminar")}>Eliminar</button>
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

            <div >
            
            <Modal show={modalInsertar} className="contenedorModalCliente" >
                    <Modal.Header>Registrar Cliente</Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label>Id: </label>
                            <br />
                            <input type="text" className="form-control" name="id" readOnly  />
                            <br />
                            <label>Nombre: </label>
                            <br />
                            <input type="text" className="form-control" name="nombre" onChange={handleChange}  />
                            <br />
                            <label>DNI: </label>
                            <br />
                            <input type="text" className="form-control" name="dni" onChange={handleChange}  />
                            <br />
                            <label>telefono: </label>
                            <br />
                            <input type="text" className="form-control" name="telefono" onChange={handleChange}  />
                            <br />
                            <label>Sexo: </label>
                            <br />
                            <div  >
                                <Select className="contenedorSelectModalCliente" sx={{ width: '30%' }}
                                    name="sexo"
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={sexoClienteSeleccionado}
                                    label="sexo"
                                    onChange={handleChange}
                                >{sexoCliente.map((sexoCliente) => (
                                    <MenuItem key={sexoCliente.id} value={sexoCliente.value}>{sexoCliente.label}</MenuItem>
                                ))}
                                </Select>
                            </div>
                            <br />
                            <label>email: </label>
                            <br />
                            <input type="text" className="form-control" name="email" onChange={handleChange}  />
                            <br />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={() => RegistrarCliente()}>Guardar</button>{" "}
                        <button className="btn btn-danger" onClick={() => abrirCerrarModelInsertar()}>Cancelar</button>
                    </Modal.Footer>
                </Modal>

                <Modal show={modalEditar} className="contenedorModalCliente" >
                    <Modal.Header>Editar Cliente</Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label>Id: </label>
                            <br />
                            <input type="text" className="form-control" name="id" readOnly value={clienteSeleccionado && clienteSeleccionado.id} />
                            <br />
                            <label>Nombre: </label>
                            <br />
                            <input type="text" className="form-control" name="nombre"  onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.nombre} />
                            <br />
                            <label>DNI: </label>
                            <br />
                            <input type="text" className="form-control" name="dni"  onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.dni} />
                            <br />
                            <label>telefono: </label>
                            <br />
                            <input type="text" className="form-control" name="telefono" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.telefono} />
                            <br />
                            <label>Sexo: </label>
                            <br />
                            <div  >
                                <Select className="contenedorSelectModalCliente" sx={{ width: '30%' }}
                                    name="sexo"
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={sexoClienteSeleccionado}
                                    label="sexo"
                                    onChange={handleChange}
                                >{sexoCliente.map((sexoCliente) => (
                                    <MenuItem key={sexoCliente.id} value={sexoCliente.value}>{sexoCliente.label}</MenuItem>
                                ))}
                                </Select>
                            </div>
                            <br />
                            <label>email: </label>
                            <br />
                            <input type="text" className="form-control" name="email" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.email} />
                            <br />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={() => EditarCliente()}>Guardar</button>{" "}
                        <button className="btn btn-danger" onClick={() => abrirCerrarModelEditar()}>Cancelar</button>
                    </Modal.Footer>
                </Modal>

                <Modal show={modalElimnar} className="contenedorModal">
                    <Modal.Body>
                        Seguro que desa eliminar este Cliente: {clienteSeleccionado && clienteSeleccionado.nombre} ?
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-danger" onClick={() => EliminarCliente()}>Si</button>{" "}
                        <button className="btn btn-secondary" onClick={() => abrirCerrarModelEliminar()}>No</button>
                    </Modal.Footer>
                </Modal>
            </div>

        </div>
    );
    
}