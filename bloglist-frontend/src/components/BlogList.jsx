import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'

const BlogList = ({ blogs, handleRemove }) => {
  return (
    <Table striped>
      <tbody>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td style={{ textAlign: 'right' }}>
                <Button onClick={() => handleRemove(blog)}>remove</Button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  )
}

export default BlogList
