import bcrypt from "bcryptjs";
const users = [
  {
    name: "John Doe",
    username: "johndoe",
    email: "johnDoe@email.com",
    password: bcrypt.hashSync("password", 10),
  },
  {
    name: "Admin",
    username: "admin",
    email: "admin@email.com",
    password: bcrypt.hashSync("password", 10),
    isAdmin: true,
  },
];

export default users;
