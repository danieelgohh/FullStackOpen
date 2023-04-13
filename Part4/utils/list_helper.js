const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
  console.log(blogs[0])
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}


module.exports = {
  dummy,
  totalLikes
}