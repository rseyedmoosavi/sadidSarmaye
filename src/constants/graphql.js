import gql from 'graphql-tag'


export const PERSON_SEPORDE = gql`
    query personSeporde{
        me{
            profile{
                seporde:transactions(kind_Id:1){
                    totalSum
                    totalCount
                }
                marjoo:transactions(kind_Id:2){
                    totalSum
                    totalCount
                }
                vSood:transactions(kind_Id:3){
                    totalSum
                    totalCount
                }
                bSood:transactions(kind_Id:4){
                    totalSum
                    totalCount
                }
                bSoodm:transactions(kind_Id:4){
                    totalSum
                    totalCount
                }
            }
        }
        transactionKinds{
            id
            title
        }
    }
`

export const SEPORDE = gql`
    query Seporde{
        ashkhas{
            edges{
                node{
                    seporde
                }
            }
        }
    }
`
export const DASHBOARD = gql`
    query Dashboard{
        me{
            firstName
            lastName
            users{
                edges{
                    node{
                        seporde
                    }
                }
            }
        }
    }
`

export const LOGIN = gql`
    # 2
    mutation LoginToSite($username: String!, $password: String!) {
        login(
            username: $username,
            password: $password,
        ){
            user {
                id
                firstName
                lastName
                lastLogin
            }
            token
        }
    }
`