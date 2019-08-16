import React from 'react';
import { Link } from 'react-router-dom';
import logo from './img/GraphQL.png';

const Header = () => (

    <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
        <div className="container">
            <Link to="/"><img src={logo} alt="GraphQL"/> </Link>
            <Link to="/paises" className="navbar-brand text-light font-weight-normal">
                &nbsp;{'/países'}
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navegacion" aria-controls="navegacion" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navegacion">
                <ul className="navbar-nav ml-auto text-right">
                    <li className="nav-item dropdown mr-md-2 mb-2 mb-md-0">
                        <button
                            className="nav-link dropdown-toggle btn btn-block btn-success"
                            data-toggle="dropdown"
                        >Paises</button>
                        <div className="dropdown-menu" aria-labelledby="navegacion">
                            <Link to="/paises" className="dropdown-item">
                                Ver Paises
                            </Link>
                            <Link to="/paises/nuevo" className="dropdown-item">
                                Nuevo País
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export default Header;
