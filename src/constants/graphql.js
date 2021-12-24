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
    query transactions($profile_Id:Float,$offset:Int,$first:Int){
        transactions(profile_Id:$profile_Id,offset: $offset,first:$first) {
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
export const DEPOSIT_FOR_HOME_PAGE = gql`
    query transactions($offset:Int,$first:Int,$kindId:Float){
        transactions(offset: $offset,first:$first,kind_Id:$kindId) {
            totalSum
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
export const PROFILE_FOR_CONFIRM_USER = gql`
    query confirmUserProfile{
      me{
        profile{
          id
          firstName
          lastName
          fatherName
          idNumber
          nationalCode
          birthDate
          birthPlace{
            name
          }
          city{
            name
          }
          postalCode
          address
          homePhone
          officePhone
          mobile1
          mobile2
          email
          accountNumber
          sheba
          cardNumber
          images{
            image
          }
        }
      }
    }
`

export const PROFITS_FOR_HOME_PAGE = gql`
    query transactions($offset:Int,$first:Int,$kindId:Float){
        transactions(offset: $offset,first:$first,kind_Id:$kindId) {
            totalSum
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

export const GET_TRANSACTION = gql`
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
export const GET_PROVINCE = gql`
    query getProvince {
        provinces {
            value:id
            text:name
        }
    }

`
export const GET_CITIES = gql`
    query getCity($provinceID: Float) {
        cities(province_Id: $provinceID) {
            edges {
                node {
                    text:name
                    value:id
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
                profile{
                    firstName
                    lastName
                }
                lastLogin
            }
            token
        }
    }
`

export const CREATE_PROFILE_OLD = gql`
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
export const CREATE_PROFILE = gql`
    mutation createProfile(
        $username:String!
        $password:String!
        $firstName :String
        $lastName :String
        $fatherName :String
        $birthPlaceId :Int
        $nationalCode :String
        $idNumber :String
        $birthDate :String
        $accountNumber :String
        $sheba :String
        $cardNumber :String
        $bankId :Int
        $address :String
        $cityId :Int
        $postalCode :String
        $tel :String
        $homePhone :String
        $officePhone :String
        $mobile1 :String
        $mobile2 :String
        $email :String
        $description :String
        $file: Upload!
    ){
        createProfile(
            input: {
                user: {
                    email: $email
                    username: $username
                    password: $password
                }
                firstName: $firstName
                lastName: $lastName
                fatherName: $fatherName
                birthPlaceId: $birthPlaceId
                nationalCode: $nationalCode
                idNumber: $idNumber
                birthDate: $birthDate
                accountNumber: $accountNumber
                sheba: $sheba
                cardNumber: $cardNumber
                bankId: $bankId
                address: $address
                cityId: $cityId
                postalCode: $postalCode
                tel: $tel
                homePhone: $homePhone
                officePhone: $officePhone
                mobile1: $mobile1
                mobile2: $mobile2
                email: $email
                images: [{
                    image: $file
                    kindId: 1
                }]
                description: $description

            }
        ){
            profile{
                id
            }
        }
    }
`
export const CREATE_TRANSACTION = gql`
    mutation (
        $profileId: Int!
        $effectiveDate: Date!
        $amount: Float!
        $kindId: Int!
        $file: Upload!
    ) {
        createTransaction(
            input: {
                kindId: $kindId
                profileId: $profileId
                effectiveDate: $effectiveDate
                amount: $amount
                images: [{ description: "hi transaction 1234 ", image: $file}]
            }
        ) {
            transaction {
                id
                amount
                effectiveDate
                kind {
                    title
                }
                images {
                    id
                    description
                    image
                }
            }
        }
    }

`

export const CREATE_TRANSACTION_OLD = gql`
    mutation createTransaction($input: CreateTransactionInput!) {
        createTransaction(input:$input){
            transaction {
                id
                images{
                    image
                }
            }
        }
    }
`
export const CREATE_TRANSACTION_temp = gql`
    mutation createTransaction($input: CreateTransactionInput!,$file:Upload!) {
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
