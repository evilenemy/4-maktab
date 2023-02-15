const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    default: "\\uploads\\user\\user.jpg",
  },
});

// static signup method
userSchema.statics.signup = async function (login, password, email, req) {
  if (!login || !password) {
    throw Error("All fields must be filled");
  }

  const exists =
    (await this.findOne({ email })) || (await this.findOne({ login }));
  let user;

  if (exists) {
    throw Error("Email or login already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  if (login.split(" | ")[1] == process.env.SECRET_PASSWORD) {
    if (req.files) {
      user = await this.create({
        login: login.split(" | ")[0],
        password: hash,
        email: email ? email : null,
        role: "admin",
        imagePath:
          "\\uploads\\user\\" +
          new Date().getTime() +
          " - " +
          req.files.image.name,
      });
    }
    if (!req.files) {
      user = await this.create({
        login: login.split(" | ")[0],
        password: hash,
        email: email ? email : null,
        role: "admin",
        imagePath: "\\uploads\\user\\user.jpg",
      });
    }
  } else {
    if (req.files) {
      user = await this.create({
        login: login.split(" | ")[0],
        password: hash,
        email: email ? email : null,
        role: "user",
        imagePath:
          "\\uploads\\user\\" +
          new Date().getTime() +
          " - " +
          req.files.image.name,
      });
    }
    if (!req.files) {
      user = await this.create({
        login: login.split(" | ")[0],
        password: hash,
        email: email ? email : null,
        role: "user",
        imagePath: "\\uploads\\user\\user.jpg",
      });
    }
  }

  return user;
};

// static login method
userSchema.statics.login = async function (login, password) {
  if (!login || !password) {
    throw Error("All fields must be filled");
  }

  const user =
    (await this.findOne({ login })) || (await this.findOne({ email: login }));
  if (!user) {
    throw Error("User not found");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
