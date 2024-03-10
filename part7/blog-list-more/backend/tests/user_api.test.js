const User = require("../models/user");

const supertest = require("supertest");
const helper = require("./test_helper.test");
const app = require("../app");

const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    for (let user of helper.initialUsers) {
      const userObject = new User(user);
      await userObject.save();
    }

    console.log("users saved");
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const username = usersAtEnd.map((u) => u.username);
    expect(username).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "user1",
      name: "User One",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username must be unique");
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails with proper statuscode and message if username is too short", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "ro",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "Username must be at least 3 characters long",
    );
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails with proper statuscode and message if password is too short", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "admin",
      name: "Superuser",
      password: "s",
    };
    console.log("newUser: ", newUser);

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "Password must be at least 3 characters long.",
    );
    const usersAtEnd = await helper.usersInDb();
    console.log("usersAtEnd: ", usersAtEnd);
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});
