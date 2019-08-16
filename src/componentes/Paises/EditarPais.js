import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { OBTENER_PAIS } from '../../queries';

import FormEditarPais from './FormEditarPais';

class EditarPais extends Component {
    state = {  }
    render() {
        // Tomar el ID del Pais a editar
        const { id } = this.props.match.params;

        return (
            <Fragment>
                <h4 className="text-center font-weight-bold">Editar Pais</h4>
                <div className="row justify-content-center">
                    <Query query={OBTENER_PAIS} variables={{id}}>
                        {({ loading, error, data, refetch }) => {
                            if(loading) return 'Cargando...';
                            if(error) return `Error! ${error.message}`;

                            return (
                                <FormEditarPais
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
}

export default EditarPais;
