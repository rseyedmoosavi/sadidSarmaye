import gql from 'graphql-tag'

export const PROFILE_FOR_DROPDOWN = gql`
query profile{
    profiles {
        edges {
            node {
                firstName
                lastName
                codeMeli
                presenter
            }
        }
    }
}
`
export const PROFILE=gql`
    query profile($id:Float!){
        profiles(id:$id) {
            edges {
                node {
                    firstName
                    lastName
                    codeMeli
                    presenter
                    adress
                    shomareKart
                    shomareHesab
                    description
                    tel
                    mobile1
                }
            }
        }
    }
`
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
