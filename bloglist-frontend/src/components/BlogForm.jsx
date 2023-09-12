import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <div>
            <Form.Label>title:</Form.Label>
            <Form.Control
              type="text"
              name="Title"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              placeholder="blog title"
              id="title"
            />
          </div>
          <div>
            <Form.Label>author:</Form.Label>
            <Form.Control
              type="text"
              name="Author"
              value={newAuthor}
              onChange={(event) => setNewAuthor(event.target.value)}
              placeholder="blog author"
              id="author"
            />
          </div>
          <div>
            <Form.Label>url:</Form.Label>
            <Form.Control
              type="text"
              name="Url"
              value={newUrl}
              onChange={(event) => setNewUrl(event.target.value)}
              placeholder="blog url"
              id="url"
            />
          </div>
          <Button id="createButton" type="submit">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
