import gql from "graphql-tag";

export const OBTENER_PAIS = gql`
    query obtenerPais($id: ID){
        obtenerPais(id: $id){
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

export const OBTENER_PAISES = gql`
    query obtenerPaises($limite: Int, $offset: Int){
        obtenerPaises(limite: $limite, offset: $offset){
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
        totalPaises
    }
`;
