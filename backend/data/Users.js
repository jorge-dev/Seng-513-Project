import bcrypt from "bcryptjs";
const users = [
  {
    name: "John Doe",
    username: "johndoe",
    password: bcrypt.hashSync("password", 10),
  },
  {
    name: "Admin",
    username: "admin",
    password: bcrypt.hashSync("password", 10),
    isAdmin: true,
  },
];

export default users;
