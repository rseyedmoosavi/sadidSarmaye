import gql from 'graphql-tag'



export const TEST=gql`
    query Test{
        ashkhas {
            edges {
                node {
                    Fname
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