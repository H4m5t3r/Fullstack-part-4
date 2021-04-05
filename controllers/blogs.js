const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 } )

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user._id,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  await Blog.findByIdAndUpdate(request.params.id, updatedBlog)
  response.json(updatedBlog)
})

module.exports = blogsRouter