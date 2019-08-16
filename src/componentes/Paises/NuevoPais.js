import React, { Component, Fragment } from 'react';

import { Mutation } from 'react-apollo';
import { NUEVO_PAIS } from '../../mutations';

class NuevoPais extends Component {
    state = {
        pais: {
            codpais:    '',
            nombpais:   '',
            prefpais:   '',
            continente: ''
        },
        error: false,
        estados: []
    }

    leerNombEstado = i => e => {
        const nuevoNombEstado = this.state.estados.map((nombestado, index) =>{
            if(i !== index) return nombestado;
            return {
                ...nombestado,
                nombestado: e.target.value
            };
        });
        this.setState({ estados: nuevoNombEstado })
    }
    leerCodEstado = i => e => {
        const nuevoCodEstado = this.state.estados.map((codestado, index) =>{
            if(i !== index) return codestado;
            return {
                ...codestado,
                codestado: e.target.value
            };
        });
        this.setState({ estados: nuevoCodEstado });
    }

    nuevoEstado = () => {
        this.setState({
            estados: this.state.estados.concat([ {nombestado:''} ])
        })
    }

    quitarEstado = i => () => {
        this.setState({
            estados: this.state.estados.filter((estado, index) => i !== index)
        });
    }

    render() {
        const { error } = this.state;
        let respuesta = (error) ? <p className="alert alert-danger p-3 text-center">Todos los campos son Obligatorios</p> : '';

        return (
            <Fragment>
                <h4 className="text-center font-weight-bold">Nuevo Pais</h4>
                { respuesta }
                <div className="row justify-content-center">
                    <Mutation
                        mutation={NUEVO_PAIS}
                        onCompleted={ () => this.props.history.push('/paises') }
                    >
                    {crearPais => (
                        <form
                            className="col-md-8 m-3"
                            onSubmit={e => {
                                e.preventDefault();

                                const {codpais, nombpais, prefpais, continente} = this.state.pais;

                                const { estados } = this.state;

                                if(codpais === '' || nombpais === '' || prefpais === '' || continente === '') {
                                    this.setState({
                                        error: true
                                    });
                                    return;
                                }

                                this.setState({
                                    error: false
                                });

                                const input = {
                                    codpais,
                                    nombpais,
                                    prefpais: Number(prefpais),
                                    continente,
                                    estados
                                };

                                crearPais({
                                    variables: {input}
                                })
                            }}
                        >
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Código País</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Código País"
                                        onChange={e => {
                                            this.setState({
                                                pais: {
                                                    ...this.state.pais,
                                                    codpais: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Nombre País</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre País"
                                        onChange={e => {
                                            this.setState({
                                                pais: {
                                                    ...this.state.pais,
                                                    nombpais: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-row mt-2">
                                <div className="form-group col-md-6">
                                    <label>Prefijo Telefónico</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Prefijo Telefónico"
                                        onChange={e => {
                                            this.setState({
                                                pais: {
                                                    ...this.state.pais,
                                                    prefpais: e.target.value
                                                }
                                            })
                                        }}
                                        />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Continente</label>
                                    <select
                                        className="form-control"
                                        onChange={e => {
                                                this.setState({
                                                    pais: {
                                                        ...this.state.pais,
                                                        continente: e.target.value
                                                    }
                                                })
                                            }}
                                    >
                                        <option value="">Elegir Continente...</option>
                                        <option value="AFRICA">AFRICA</option>
                                        <option value="AMERICA">AMERICA</option>
                                        <option value="ASIA">ASIA</option>
                                        <option value="EUROPA">EUROPA</option>
                                        <option value="OCEANIA">OCEANIA</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row mt-4">
                                {this.state.estados.map((input, index) => (
                                    <div key={index} className="form-group col-md-12">
                                        <label className="font-weight-bold">Nuevo Estado {index + 1}:</label>
                                        <div className="input-group">
                                            <input
                                                onChange={this.leerNombEstado(index)}
                                                type="text"
                                                placeholder="Nombre Estado"
                                                className="form-control"
                                            />
                                            <input
                                                onChange={this.leerCodEstado(index)}
                                                type="text"
                                                placeholder="Código Estado"
                                                className="form-control"
                                            />
                                            <div className="input-group-append">
                                                <button
                                                    onClick={this.quitarEstado(index)}
                                                    type="button"
                                                    className="btn btn-danger"
                                                >
                                                    &times; Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="form-group d-flex justify-content-center col-md-12">
                                    <button
                                        onClick={this.nuevoEstado}
                                        type="button"
                                        className="btn btn-warning"
                                    >
                                        + Agregar Estado
                                    </button>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success float-right">
                                Agregar Pais
                            </button>
                        </form>
                    )}
                    </Mutation>
                </div>
            </Fragment>
        );
    }
}

export default NuevoPais;
