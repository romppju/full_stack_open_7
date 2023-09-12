import { useState, useEffect, useRef } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Menu from './components/Menu'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import {
  commentBlog,
  createBlog,
  deleteBlog,
  initializeBlogs,
  likeBlog,
} from './reducers/blogReducer'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import { initializeUsers } from './reducers/usersReducer'
import BlogInfo from './components/BlogInfo'
import { Button, Form } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()

  const blogState = useSelector((state) => state.blogs)
  const blogs = [...blogState]

  const users = useSelector((state) => state.users)

  const loggedUser = useSelector((state) => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const userMatch = useMatch('/users/:id')
  const matchedUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const matchedBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(
        setNotification({
          success: false,
          message: 'invalid username or password',
        })
      )
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
    blogService.setToken(null)
  }

  const handleCreateClick = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(newBlog))
      dispatch(setNotification({ success: true, message: 'New blog added' }))
    } catch (exception) {
      dispatch(
        setNotification({ success: false, message: 'failed to add new blog' })
      )
    }
  }

  const handleComment = async (obj) => {
    try {
      dispatch(commentBlog(obj.id, obj.comment))
    } catch (exception) {
      dispatch(
        setNotification({ success: false, message: 'commenting failed' })
      )
    }
  }

  const handleLike = async (blog) => {
    try {
      dispatch(likeBlog(blog))
      dispatch(initializeBlogs())
    } catch (exception) {
      dispatch(setNotification({ success: false, message: 'update failed' }))
    }
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove "${blog.title}"?`)) {
      try {
        dispatch(deleteBlog(blog.id))
      } catch (exception) {
        dispatch(setNotification({ success: false, message: 'removal failed' }))
      }
    }
  }

  if (loggedUser === null) {
    return (
      <div className="container">
        <h2>Log in to application</h2>
        <Notification />
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <div>
              <Form.Label>username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                name="Username"
                id="username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              <Form.Label>password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                name="Password"
                id="password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <Button id="loginButton" type="submit">
              login
            </Button>
          </Form.Group>
        </Form>
      </div>
    )
  } else {
    return (
      <div className="container">
        <h2>Blogs</h2>
        <Notification />
        <Menu user={loggedUser} handleClick={handleLogout} />
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm createBlog={handleCreateClick} />
        </Togglable>
        <Routes>
          <Route
            path="/"
            element={
              <BlogList
                blogs={blogs}
                handleLike={handleLike}
                handleRemove={handleRemove}
                user={loggedUser}
              />
            }
          />
          <Route path="/users" element={<UserList users={users} />} />
          <Route path="/users/:id" element={<User user={matchedUser} />} />
          <Route
            path="/blogs/:id"
            element={
              <BlogInfo
                blog={matchedBlog}
                handleLikeClick={handleLike}
                handleComment={handleComment}
              />
            }
          />
        </Routes>
      </div>
    )
  }
}

export default App
