import React, { Component } from 'react';

class Paginador extends Component {
    state = {
        paginador: {
            paginas: Math.ceil( Number(this.props.total) / this.props.limite) 
        }
    }
    render() {

        // Boton Anterior
        const {actual} = this.props;
        const btnAnterior = (actual > 1) ? <button onClick={this.props.paginaAnterior} type="button" className="btn btn-success mr-2">&laquo; Anterior</button> : '';

        // Boton Siguiente
        const {paginas} = this.state.paginador;
        const btnSiguiente = (actual !== paginas) ? <button onClick={this.props.paginaSiguiente} type="button" className="btn btn-success">Siguiente &raquo;</button> : '';

        return( 
            <div className="mt-3 d-flex justify-content-center">
                {btnAnterior}
                {btnSiguiente}
            </div>
        );
    }
};

export default Paginador;