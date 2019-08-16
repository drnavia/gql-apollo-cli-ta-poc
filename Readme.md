<img src="http://drnavia.com/logos/POC-GraphQL-2019.png"></img>

## Frontend p/GraphQL - [Dockerizado]
![Branch stable](https://img.shields.io/badge/branch-master-blue.svg)
![version](https://img.shields.io/badge/graphql-v14.x-E10098.svg)
![version](https://img.shields.io/badge/apollo-v2.x-024561.svg)
![version](https://img.shields.io/badge/docker%20compose-build-309CEC.svg)<br>
Despliegue el Frontend utilizando Node, Express y Apollo Server (conectada a una base de datos MongoDB, utilizando Mongoose como ORM). La API permite interactuar con el **listado de Países con Estados y Localidades**.<br>

## Pre-requisitos
Debes tener instalado:
+ Git
+ Docker
+ Docker Compose

## Despliegar la API
1. Clonar el repo:
```bash
git clone https://github.com/drnavia/poc-gql-apollo-cli.git
```
2. Construir la imagen del contenedor con Docker Compose:
```bash
docker-compose -f dc-gql-apollocli.yml build
```
3. Levantar el contenedor de la API:
```bash
docker-compose -f dc-gql-apollocli.yml up -d
```
4. Verificar que el contenedor se encuentre levantado:
```bash
docker-compose -f dc-gql-apollocli.yml ps
```
5. Ingresar a la siguiente URL para comprobar que el Frontend este levantado:<br>
[http://localhost:3003](http://localhost:3003)

## Interactuar con el Frontend
La aplicación tiene implementada las funcionalidades de consultas y mutaciones de GraphQL.

### Listado de países
Para visualizar el listado de países ingresar a la siguiente URL:
[http://localhost:3003/paises](http://localhost:3003/paises)

En esta vista tienen acceso a:
* Ver la información de cada País
* Editar la información de cada País
* Eliminar el registro de algún País

La vista tiene implementada una paginación.


<br><br>
**[ DrN ]**