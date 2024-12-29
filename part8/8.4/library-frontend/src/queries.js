import { gql } from "@apollo/client"

const ALL_PERSONS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export {
  ALL_PERSONS
} 