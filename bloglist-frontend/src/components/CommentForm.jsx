import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const CommentForm = ({ createComment, blog }) => {
  const [newComment, setComment] = useState('')

  const addComment = (event) => {
    event.preventDefault()
    createComment({
      comment: newComment,
      id: blog.id,
    })

    setComment('')
  }

  return (
    <Form onSubmit={addComment}>
      <Form.Group>
        <Form.Control
          type="text"
          name="comment"
          value={newComment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="new comment"
          id="comment"
        ></Form.Control>
        <Button id="commentButton" type="submit">
          add comment
        </Button>
      </Form.Group>
    </Form>
  )
}

export default CommentForm
