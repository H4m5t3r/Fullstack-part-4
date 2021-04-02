const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const notes = await Blog.find({})
  response.json(notes)
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
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter