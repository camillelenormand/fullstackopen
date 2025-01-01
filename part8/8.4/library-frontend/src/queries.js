import { gql } from "@apollo/client";

const ALL_PERSONS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author
    published
  }
}`;

export { ALL_PERSONS, ALL_BOOKS };
