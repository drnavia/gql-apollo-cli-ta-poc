import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { OBTENER_PAIS } from '../../queries';

class VerPais extends Component {
    state = {  }
    render() {
        // Tomar el ID del contacto a editar
        const { id } = this.props.match.params;

        return (
            <Fragment>
                <h4 className="text-center font-weight-bold">Detalle Pais</h4>
                <div className="row justify-content-center">
                    <Query query={OBTENER_PAIS} variables={{id}}>
                        {({ loading, error, data, refetch }) => {
                            if(loading) return 'Cargando...';
                            if(error) return `Error! ${error.message}`;

                            return (
                                <FormPais
                                    pais={data.obtenerPais}
                                    refetch={refetch}
                                />
                            )
                        }}
                    </Query>
                </div>
            </Fragment>
        );
    }
};
class FormPais extends Component {

    state = {
        pais: this.props.pais,
        estados: this.props.pais.estados,
    }
    
    render() {
        const {codpais, nombpais, prefpais, continente} = this.state.pais;
        const {estados} = this.state;

        return (
            <Fragment>
                <div className="list-group-item col-md-8 m-3">
                    <div className="form-row">
                        <div className="form-group col-md-4 mt-2">
                            <label>Cód. País:</label> <span className="font-weight-bold">{codpais}</span>
                        </div>
                        <div className="form-group col-md-8 mt-2">
                            <label>Pais: </label> <span className="font-weight-bold">{nombpais}</span>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4 mt-2">
                            <label>Pref. Telefónico:</label> <span className="font-weight-bold">{prefpais}</span>
                        </div>
                        <div className="form-group col-md-8 mt-2">
                            <label>Continente: </label> <span className="font-weight-bold">{continente}</span>
                        </div>
                    </div>
                </div>
                
                <div className="list-group-item col-md-8 m-3">
                    <h5 className="text-center">Detalle Estados</h5>
                    {estados.map((estado, index) => (
                        <div key={index} className="form-row">
                            
                            <div className="form-group col-md-4 mt-2">
                                <span className="font-weight-bold">[{index + 1}] </span>
                                <label>Cód. Estado: </label> <span className="font-weight-bold">{estado.codestado}</span>
                            </div>
                            <div className="form-group col-md-8 mt-2">
                                <label>Estado: </label> <span className="font-weight-bold">{estado.nombestado}</span>
                            </div>

                            <div>
                                <div className="col-md-12 mb-2">
                                    {estado.localidades.map((localidad, idx) => 
                                        <div key={idx} className="col-md-12">
                                            <span><b>{idx +1}) </b> {localidad.codlocalidad} - {localidad.nomblocalidad}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </Fragment>
        )
    }
}
export default VerPais;

