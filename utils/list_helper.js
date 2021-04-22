const _ = require('lodash')

const dummy = (/*blogs*/) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  return blogs.reduce((sum, nextBlog) => sum + nextBlog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const favorite = blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  })
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const blog = _.head(_(blogs)
    .countBy(blogs, (blog) => {return blog.author})
    .entries()
    .maxBy(_.last))

  return {
    author: blog.user.name,
    blogs: blog.user.blogs.length
  }
}

const mostLikes = (blogs) => {
  const likes = _(blogs)
    .groupBy('author')
    .map((objs, key) => ({
      'author': key,
      'likes': _.sumBy(objs, 'likes')
    }))
    .orderBy('likes')
    .value()

  return likes[0]
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}