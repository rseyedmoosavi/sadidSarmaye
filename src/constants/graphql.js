import gql from 'graphql-tag'

export const GET_ALL_PRESENTER = gql`
    query getAllPresenter{
        profiles{
            edges{
                node{
                    firstName
                    lastName
                    id
                }
            }
        }
    }
`

export const PROFILE_FOR_DROPDOWN = gql`
    query profile{
        profiles {
            edges {
                node {
                    id
                    firstName
                    lastName
                    codeMeli
                    presenter
                    #                transactions(kind_Id:1){
                    #                    totalSum
                    #                }
                }
            }
        }
    }
`
export const PROFILE = gql`
    query profile($id:Float){
        profiles(id:$id) {
            edges {
                node {
                    id
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

export const USER_TRANSACTIONS = gql`
    query transactions($profile_Id:Float,$offset:Int){
        transactions(profile_Id:$profile_Id,offset: $offset) {
            totalCount
            pageInfo{
                hasNextPage
                endCursor
            }
            edges {
                node {
                    profile{
                        firstName
                        lastName
                    }
                    amount
                    effectiveDate
                    id
                    kind {
                        id
                    }

                }

            }

        }
    }
`
export const GET_TRANSACTION=gql`
    query getTransaction($id:Float){
        transactions(id:$id){
            edges{
                node{
                    profile{
                        id
                        firstName
                        lastName
                    }
                    amount
                    effectiveDate
                    kind{
                        id
                        title
                    }
                    description
                }
            }
        }
    }
`
export const TRANSACTION_SEARCH = gql`
    query transactions($profile_Id: Float, $effectiveDate_Lte: Date, $effectiveDate_Gte: Date, $kind_Id: Float) {
        transactions(profile_Id: $profile_Id, effectiveDate_Lte: $effectiveDate_Lte, effectiveDate_Gte: $effectiveDate_Gte, kind_Id: $kind_Id) {
            edges {
                node {
                    profile {
                        firstName
                        lastName
                    }
                    amount
                    effectiveDate
                    id
                    kind {
                        id
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

export const CREATE_PROFILE = gql`
    mutation createProfile($input: CreateProfileInput!){
        createProfile(
            input:$input
        ){
            profile{
                id
            }
        }
    }
`
export const CREATE_TRANSACTION = gql`
    mutation createTransaction($input: CreateTransactionInput!) {
        createTransaction(input:$input){
            transaction {
                profile {
                    firstName
                }
            }
        }
    }
`

export const UPDATE_TRANSACTION = gql`
    mutation updateTransaction($input:UpdateTransactionInput!){
        updateTransaction(input:$input)
        {
            transaction{
                id
            }
        }
    }
`

export const UPDATE_PROFILE = gql`
    mutation updateProfile($input:  UpdateProfileInput!){
        updateProfile(
            input:$input
        ){
            profile{
                id
            }
        }
    }
`
