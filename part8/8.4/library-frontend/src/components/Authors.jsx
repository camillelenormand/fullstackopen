
import { useQuery } from "@apollo/client"
import { ALL_PERSONS } from "../queries"

const Authors = (props) => {
  const { data, loading, error } = useQuery(ALL_PERSONS);

  if (loading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  if (!props.show) {
    return null
  }

  const authors = data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
