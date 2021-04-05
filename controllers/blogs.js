const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', (request, response) => {
  if (!request.body.title && !request.body.url) {
    response.status(400).end()
  } else if (!request.body.likes) {
    const blog = new Blog({
      ...request.body,
      likes: 0
    })
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  } else {
    const blog = new Blog(request.body)
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  }
  //Det jag började på under fredagen, måste refaktorera så att
  //den använder async-systemet utan .then() och istället bara
  //response.status(201).json(blog)
  // const body = request.body

  // const user = await

  // const newBlog = new Blog({
  //   title: body.title,
  //   author: body.author,
  //   url: body.url,
  //   likes: body.likes,
  //   user: user._id
  // })

  // if (!body.title && !body.url) {
  //   response.status(400).end()
  // } else if (!body.likes) {
  //   const blog = new Blog({
  //     ...body,
  //     likes: 0
  //   })
  //   blog.save()
  //   response.status(201).json(blog)
  // } else {
  //   const blog = new Blog(body)
  //   blog.save()
  //   response.status(201).json(blog)
  // }
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