const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blogs')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
}) 

describe('when there is initially some notes saved', () => {
    test('blogs are returned as json', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('check if blog is valid', async () => {
        const response = await api.get('/api/blogs')
        if (response.body) {
            expect(response.body[0].id).toBeDefined()
        }
        else {
            expect(response.body[0].id).toBeUndefined()
        }
    })

    describe('addition of a new blog', () => {
        test('blogs can be created via POST', async () => {
            const newBlog = {
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                likes: 12
            }
        
            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
        
            const response = await api.get('/api/blogs')
            const contents = response.body.map((r) => r.title)
        
            expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
            expect(contents).toContain(
                'Canonical string reduction'
            )
        })
    })

    describe('deletion of a blog', () => {
        test('succeeds with status code 204 if id is valid', async() => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)

            const blogsAtEnd = await helper.blogsInDb()
            console.log(blogsAtEnd)

            expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

            const contents = blogsAtEnd.map(r => r.title)

            expect(contents).not.toContain(blogToDelete.title)
        })
    })

    describe('updating a blog', () => {
        test('blogs can be updated', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToUpdate = blogsAtStart[0]

            const updateBlog = {
                title: 'React patterns',
                author: 'Michael Chan',
                url: 'https://reactpatterns.com/',
                likes: 10,
            }

            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(updateBlog)

            const blogUpdated = await helper.blogsInDb()
            expect(blogUpdated[0].likes).toBe(updateBlog.likes)
        })
    })
})


afterAll(async () => {
    await mongoose.connection.close()
}) 