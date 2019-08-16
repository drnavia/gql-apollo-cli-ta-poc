import React, { Component, Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache} from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Importar Componentes
import Header from './componentes/Layout/Header';

import Paises from './componentes/Paises/Paises';
import EditarPais from './componentes/Paises/EditarPais';
import VerPais from './componentes/Paises/VerPais';
import NuevoPais from './componentes/Paises/NuevoPais';

const client = new ApolloClient({
    uri: "http://localhost:8008/graphql",
    cache: new InMemoryCache({
        addTypename: false
    }),
    onError: ({networkError, graphQLErrors}) => {
        console.log('graphQLErrors', graphQLErrors);
        console.log('networkError', networkError);
    }
});

class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Fragment>
                    <Header />
                    <div className="container">
                        <Switch>
                            <Route exact path="/paises" component={Paises} />
                            <Route exact path="/paises/ver/:id" component={VerPais} />
                            <Route exact path="/paises/editar/:id" component={EditarPais} />
                            <Route exact path="/paises/nuevo" component={NuevoPais} />
                        </Switch>
                    </div>
                </Fragment>
            </Router>
        </ApolloProvider>
    );
  }
}

export default App;