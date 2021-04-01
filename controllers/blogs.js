const blogsRouter = require('express').Router()
const Note = require('../models/note')

app.get('/api/blogs', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
    response.status(201).json(result)
    })
})

module.exports = blogsRouter