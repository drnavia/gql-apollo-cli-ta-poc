import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { ACTUALIZAR_PAIS } from '../../mutations';
import { withRouter } from 'react-router-dom';

class FormEditarPais extends Component {

    state = {
        pais: this.props.pais,
        estados: this.props.pais.estados,
        localidades: this.props.pais.estados.localidades
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

    leerNombLocalidad = i => e => {
        const nuevoNombLocalidad = this.state.localidades.map((nomblocalidad, index) =>{
            if(i !== index) return nomblocalidad;
            return {
                ...nomblocalidad,
                nomblocalidad: e.target.value
            };
        });
        this.setState({ localidades: nuevoNombLocalidad })
    }
    leerCodLocalidad = i => e => {
        const nuevoCodLocalidad = this.state.localidades.map((codlocalidad, index) =>{
            if(i !== index) return codlocalidad;
            return {
                ...codlocalidad,
                codlocalidad: e.target.value
            };
        });
        this.setState({ localidades: nuevoCodLocalidad });
    }

    render() {
        const {codpais, nombpais, prefpais, continente} = this.state.pais;
        const {estados} = this.state;

        return (
            <Mutation
                mutation={ACTUALIZAR_PAIS}
                onCompleted={ () => this.props.refetch().then(() => {
                    this.props.history.push('/paises')
                })}
            >
            {actualizarPais => (
                <form 
                    className="col-md-8 m-3" 
                    onSubmit={e => {
                        e.preventDefault();

                        const {id, codpais, nombpais, prefpais, continente} = this.state.pais;
                        const { estados } = this.state;

                        const input = {
                            id,
                            codpais,
                            nombpais,
                            prefpais: Number(prefpais),
                            continente,
                            estados
                        }

                        actualizarPais({
                            variables: {input}
                        });
                    }}
                >
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Código País</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={codpais}
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
                            <label>Nombre Pais</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={nombpais}
                                placeholder={`Nombre de Pais`}
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
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Prefijo Telefónico</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue={prefpais}
                                placeholder={`Prefijo Telefónico`}
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
                                value={continente}
                                onChange={e => {
                                    this.setState({
                                        pais: {
                                            ...this.state.pais,
                                            continente: e.target.value
                                        }
                                    })
                                }}
                            >
                                <option value="">Elegir...</option>
                                <option value="AFRICA">AFRICA</option>
                                <option value="AMERICA">AMERICA</option>
                                <option value="ASIA">ASIA</option>
                                <option value="EUROPA">EUROPA</option>
                                <option value="OCEANIA">OCEANIA</option>
                            </select>
                        </div>
                    </div>
                    <h5 className="text-center font-weight-normal mt-4">Editar Estados</h5>
                    <div className="form-row">
                        
                        {estados.map((input, index) => (
                            <div key={index} className="form-group col-md-12 mt-2">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder={`Código Estado`}
                                        className="form-control"
                                        onChange={this.leerCodEstado(index)}
                                        defaultValue={input.codestado}
                                    />
                                    <input
                                        type="text"
                                        placeholder={`Nombre Estado`}
                                        className="form-control"
                                        onChange={this.leerNombEstado(index)}
                                        defaultValue={input.nombestado}
                                    />

                                    <div className="input-group-append">
                                        <button
                                            className="btn btn-danger"
                                            type="button"
                                            onClick={this.quitarEstado(index)}
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
                                className="btn btn-warning mt-2"
                            >
                                + Agregar Estado</button>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-success float-right mt-2">Guardar Cambios</button>
                </form>
            )}
            </Mutation>
        )
    }
}

export default withRouter(FormEditarPais);
