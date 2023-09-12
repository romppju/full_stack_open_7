import CommentForm from './CommentForm'
import { Button } from 'react-bootstrap'

const BlogInfo = ({ blog, handleLikeClick, handleComment }) => {
  if (!blog) {
    return null
  }

  return (
    <div>
      <p>{blog.url}</p>
      <p className="likes">
        likes {blog.likes}
        <Button onClick={() => handleLikeClick(blog)} className="likeButton">
          like
        </Button>
      </p>
      <p>added by {blog.user.username}</p>
      <div>
        <h3>comments</h3>
        <CommentForm createComment={handleComment} blog={blog}></CommentForm>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BlogInfo
