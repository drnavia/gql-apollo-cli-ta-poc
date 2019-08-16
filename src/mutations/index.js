import gql from 'graphql-tag';

export const NUEVO_PAIS = gql`
    mutation crearPais($input: PaisInput) {
        crearPais(input: $input) {
            id
            codpais
            nombpais
            prefpais
            continente
            estados {
                id
                nombestado
                codestado
            }
        }
    }
`;

export const ACTUALIZAR_PAIS = gql`
    mutation actualizarPais($input: PaisInput) {
        actualizarPais(input: $input) {
            id
            codpais
            nombpais
            prefpais
            continente
            estados {
                id
                nombestado
                codestado
                localidades {
                    id
                    nomblocalidad
                    codlocalidad
                }
            }
        }
    }
`;

export const ELIMINAR_PAIS = gql`
    mutation eliminarPais($id: ID!) {
    	eliminarPais(id: $id)
    }
`;
