const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper.test");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log("cleared");

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
    console.log("blogs saved");
  }
});

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

describe("getting blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  ///////////////////////////////////////////////////////////////////////////////////////

  test("return all blogs", async () => {
    const response = await api.get("/api/blogs");
    console.log("fetching response");
    console.log("response length: ", response.body.length);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  ///////////////////////////////////////////////////////////////////////////////////////

  test('One of the title of the blogs must be "TDD harms architecture"', async () => {
    const response = await api.get("/api/blogs");

    const titles = response.body.map((r) => r.title);
    expect(titles).toContainEqual("TDD harms architecture");
  });

  ///////////////////////////////////////////////////////////////////////////////////////

  test('unique identifier property of the blog posts is named "id"', async () => {
    const response = await api.get("/api/blogs");

    const ids = response.body.map((r) => r.id);

    expect(ids).toBeDefined();
  });
});

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

describe("creating a new blog", () => {
  let headers;

  beforeEach(async () => {
    const response = await api
      .post("/api/login")
      .send({
        username: "camillelenormand@fake.com",
        password: process.env.PASSWORD,
      });

    console.log(response.body);

    headers = {
      Authorization: `Bearer ${response.body.token}`,
    };
    console.log(response.body);
  });

  test("a valid blog can be added by an authenticated user", async () => {
    const newBlog = {
      title: "Responsive Web Design",
      author: "Ethan Marcotte",
      url: "https://alistapart.com/article/responsive-web-design/",
      likes: 10,
      user: "64da010dd906ae93ddc49d43",
    };

    console.log("newBlog: ", newBlog);

    await api
      .post("/api/blogs")
      .set(headers)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    console.log("blogsAtEnd: ", blogsAtEnd);
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((r) => r.title);
    console.log("titles: ", titles);
    expect(titles).toContainEqual("Responsive Web Design");
  });

  ///////////////////////////////////////////////////////////////////////////////////////

  test("blog created by an auth user without a title is not added", async () => {
    const newBlog = {
      author: "Ethan Marcotte",
      url: "https://alistapart.com/article/responsive-web-design/",
    };

    await api
      .post("/api/blogs")
      .set(headers)
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
    expect(response.body).not.toContainEqual(newBlog);
  });

  ///////////////////////////////////////////////////////////////////////////////////////

  test("blog without an URL is not added", async () => {
    const newBlog = {
      title: "Responsive Web Design",
      author: "Ethan Marcotte",
      likes: 10,
    };

    await api
      .post("/api/blogs")
      .set(headers)
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
    expect(response.body).not.toContainEqual(newBlog);
  });

  ///////////////////////////////////////////////////////////////////////////////////////

  test("blog without any likes will have a 0 default value", async () => {
    const newBlog = {
      title: "Responsive Web Design",
      author: "Ethan Marcotte",
      url: "https://alistapart.com/article/responsive-web-design/",
    };

    await api
      .post("/api/blogs")
      .set(headers)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    console.log(response.body);

    const likes = response.body.map((r) => r.likes).slice(-1);

    console.log(likes);

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(likes).toEqual([0]);
  });

  /////////////////////////////////////////////////////////////////////////////////////

  test("deletion succeeds with status code 204 if id is valid", async () => {
    const newBlog = {
      title: "Responsive Web Design",
      author: "Ethan Marcotte",
      url: "https://alistapart.com/article/responsive-web-design/",
    };

    const response = await api
      .post("/api/blogs")
      .set(headers)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    console.log("response: ", response.body);

    const res = await api
      .delete(`/api/blogs/${response.body.id}`)
      .set(headers)
      .expect(204);

    console.log("res: ", res);

    const blogsAtEnd = await helper.blogsInDb();
    console.log("blogsAtEnd: ", blogsAtEnd);

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).not.toContain(newBlog.title);
  });
});

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

describe("getting a single blog", () => {
  test("succeed in finding a blog", async () => {
    const blogsAtStart = await helper.blogsInDb();
    console.log("blogsAtStart: ", blogsAtStart);

    const blogToView = blogsAtStart[0];
    console.log("blogToView: ", blogToView);

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(resultBlog.body).toEqual(blogToView);
  });

  ///////////////////////////////////////////////////////////////////////////////////////

  test("fails with statuscode 404 if blog does not exist", async () => {
    const validNonExistingId = helper.nonExistingId;
    console.log("validNonExistingId: ", validNonExistingId);

    await api.get(`/api/blogs/${validNonExistingId}`).expect(404);
  });

  ///////////////////////////////////////////////////////////////////////////////////////

  test("fails with statuscode 400 if id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";

    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
});

///////////////////////////////////////////////////////////////////////////////////////
//// PUT /api/blogs
///////////////////////////////////////////////////////////////////////////////////////

describe("updating a blog", () => {
  test("updating a blog", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart.find(
      (blog) => blog.title === "TDD harms architecture",
    );
    console.log("blogToUpdate: ", blogToUpdate);

    const newBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: 9,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

///////////////////////////////////////////////////////////////////////////////////////

afterAll(async () => {
  await mongoose.connection.close();
}, 100000);
