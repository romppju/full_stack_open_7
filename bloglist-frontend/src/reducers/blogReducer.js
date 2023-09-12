import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      return state.concat(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    replaceBlog(state, action) {
      const replaced = action.payload
      return state.map((blog) => (blog.id === replaced.id ? replaced : blog))
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
  },
})

export const { appendBlog, setBlogs, replaceBlog, removeBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogObject)
      dispatch(appendBlog(newBlog))
    } catch (error) {
      dispatch(
        setNotification({ success: false, message: 'failed to add new blog' })
      )
    }
  }
}

export const likeBlog = (blogObject) => {
  const toLike = { ...blogObject, likes: blogObject.likes + 1 }
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blogObject.id, toLike)
    dispatch(replaceBlog(updatedBlog))
  }
}

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.comment(id, comment)
    dispatch(replaceBlog(updatedBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export default blogSlice.reducer
