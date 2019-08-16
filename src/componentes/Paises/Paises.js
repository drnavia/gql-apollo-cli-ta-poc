import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import { OBTENER_PAISES } from '../../queries';
import { ELIMINAR_PAIS } from '../../mutations';

import Exito from '../Alertas/Exito';
import Paginador from '../Paginador';

class Paises extends Component {

    limite = 5;
    
    state = {
        paginador : {
            offset: 0,
            actual: 1
        },
        alerta: {
            mostrar: false,
            mensaje: ''
        }
    }

    paginaAnterior = () => {
        this.setState({
            paginador: {
                offset: this.state.paginador.offset - this.limite,
                actual: this.state.paginador.actual - 1
            }
        })
    }
    paginaSiguiente = () => {
        this.setState({
            paginador: {
                offset: this.state.paginador.offset + this.limite,
                actual: this.state.paginador.actual + 1
            }
        })
    }

    render() {
        const {alerta: {mostrar, mensaje}} = this.state;
        const alerta = (mostrar) ? <Exito mensaje={mensaje} /> : '';

        return(
            <Query query={OBTENER_PAISES} pollInterval={1000} variables={{limite: this.limite, offset: this.state.paginador.offset}}>
                {({ loading, error, data, startPolling, stopPolling }) => {
                    if(loading) return "Cargando...";
                    if(error) return `Error: ${error.message}`;

                    return (
                        <Fragment>
                            <h4 className="text-center font-weight-bold mt-4">Listado de Paises</h4>
                            {alerta}

                            <table className="table">
                                <thead className="bg-success text-light">
                                    <tr>
                                        <th scope="col">Código de País</th>
                                        <th scope="col">Nombre de País</th>
                                        <th scope="col">Prefíjo Telefónico</th>
                                        <th scope="col">Continente</th>
                                        <th scope="col">Ver</th>
                                        <th scope="col">Editar</th>
                                        <th scope="col">Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.obtenerPaises.map(item => {
                                        const {id} = item;
                                        return (
                                            <tr key={id}>
                                                <td>{item.codpais}</td>
                                                <td className="font-weight-bold">{item.nombpais}</td>
                                                <td>{item.prefpais}</td>
                                                <td>{item.continente}</td>
                                                <td>
                                                    <Link to={`/paises/ver/${item.id}`} className="btn btn-success d-block d-md-inline-block">
                                                        Ver
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link to={`/paises/editar/${item.id}`} className="btn btn-warning d-block d-md-inline-block">
                                                        Editar
                                                    </Link>
                                                </td>
                                                <td>
                                                <Mutation 
                                                        mutation={ELIMINAR_PAIS}
                                                        onCompleted={(data) => {
                                                            //console.log(data)
                                                            this.setState({
                                                                alerta: {
                                                                    mostrar: true,
                                                                    mensaje: data.eliminarPais
                                                                }
                                                            }, () => {
                                                                setTimeout(() => {
                                                                    this.setState({
                                                                        alerta: {
                                                                            mostrar: false,
                                                                            mensaje: ''
                                                                        }
                                                                    })
                                                                }, 3000);
                                                            })
                                                        }}
                                                    >
                                                        {eliminarPais => (
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger d-block d-md-inline-block mr-2"
                                                                onClick={ () => {
                                                                    if(window.confirm('Seguro que deseas eliminar este pais')) {
                                                                        eliminarPais({
                                                                            variables: {id}
                                                                        })
                                                                    }
                                                                }}
                                                            >
                                                                &times; Eliminar
                                                            </button>
                                                        )}
                                                    </Mutation>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <Paginador
                                actual={this.state.paginador.actual}
                                total={data.totalPaises}
                                limite={this.limite}
                                paginaAnterior={this.paginaAnterior}
                                paginaSiguiente={this.paginaSiguiente}
                            />
                        </Fragment>
                    )
                }}
            </Query>
        )
    }
}    

export default Paises;
