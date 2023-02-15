require("dotenv").config();

const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const adminAuth = require("./middlewares/adminAuth");
const Slide = require("./models/fileModel");
const User = require("./models/userModel");
const slideRouter = require("./routes/slide");
const userRouter = require("./routes/user");

const app = express();
const port = process.env.PORT;

// middlewares
app.use(fileUpload());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});
app.use("/uploads/user", express.static("uploads/user"));
app.use("/uploads/images", express.static("uploads/images"));
app.use("/uploads/files", express.static("uploads/files"));

// routes
app.use("/slides", slideRouter);
app.use("/users", userRouter);

// ~~~~~~~~~~~ slide ~~~~~~~~~~~~
app.post("/slides", async (req, res) => {
  const { title, body } = req.body;
  const imagesArray = [];
  try {
    const file = req.files.file;
    const images = req.files.images;
    const fileName = `${new Date().getTime()} - ${file.name}`;
    file.mv(__dirname + "\\uploads\\files\\" + fileName, (err) => {
      if (err) {
        console.log(err);
        return err;
      }
    });
    const file__ = {
      name: fileName.split(" - ")[1],
      path: "\\uploads\\files\\" + fileName,
      size: `${
        Number(file.size) / 1024 > 0 && Number(file.size) / 1024 < 1024
          ? Math.floor(Number(file.size) / 1024) +
            "," +
            String(Number(file.size) % 1024).slice(0, 1) +
            "kb"
          : Number(file.size) / 1024 >= 1024
          ? Math.floor(Number(file.size) / 1024 / 1024) +
            "," +
            String(Math.floor(Number(file.size) / 1024) % 1024).slice(0, 1) +
            "mb"
          : file.size + "b"
      }`,
    };
    for (const image of images) {
      const imageName = `${new Date().getTime()} - ${image.name}`;
      image.mv(__dirname + "\\uploads\\images\\" + imageName, (err) => {
        if (err) {
          console.log(err);
          return err;
        }
      });
      imagesArray.push({
        name: imageName.split(" - ")[1],
        path: "\\uploads\\images\\" + imageName,
        size: `${
          Number(image.size) / 1024 > 0 && Number(image.size) / 1024 < 1024
            ? Math.floor(Number(image.size) / 1024) +
              "," +
              String(Number(image.size) % 1024).slice(0, 1) +
              "kb"
            : Number(image.size) / 1024 >= 1024
            ? Math.floor(Number(image.size) / 1024 / 1024) +
              "," +
              String(Math.floor(Number(image.size) / 1024) % 1024).slice(0, 1) +
              "mb"
            : image.size + "b"
        }`,
      });
    }
    const file_ = await Slide.create({
      title,
      body,
      file: file__,
      images: imagesArray,
    });
    res.send(file_);
  } catch (err) {
    res.send({ error: err.message });
  }
});

app.delete("/slides/:id", async (req, res) => {
  const { id } = req.params;
  const slide = await Slide.findById(id);

  try {
    fs.rm(__dirname + slide.file.path, (err) => {
      if (err) return err;
    });

    for (let image of slide.images) {
      fs.rm(__dirname + image.path, (err) => {
        if (err) return err;
      });
    }

    const deleteSlide = await Slide.findByIdAndDelete(id);

    res.status(200).json(deleteSlide);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.put("/slides/:id", async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  const imagesArray = [];
  try {
    const slide = await Slide.findById(id);
    fs.rm(__dirname + slide.file.path, (err) => {
      if (err) return err;
    });

    for (let image of slide.images) {
      fs.rm(__dirname + image.path, (err) => {
        if (err) return err;
      });
    }
    const file = req.files.file;
    const images = req.files.images;
    const fileName = `${new Date().getTime()} - ${file.name}`;
    file.mv(__dirname + "\\uploads\\files\\" + fileName, (err) => {
      if (err) {
        console.log(err);
        return err;
      }
    });
    const file__ = {
      name: fileName.split(" - ")[1],
      path: "\\uploads\\files\\" + fileName,
      size: `${
        Number(file.size) / 1024 > 0 && Number(file.size) / 1024 < 1024
          ? Math.floor(Number(file.size) / 1024) +
            "," +
            String(Number(file.size) % 1024).slice(0, 1) +
            "kb"
          : Number(file.size) / 1024 >= 1024
          ? Math.floor(Number(file.size) / 1024 / 1024) +
            "," +
            String(Math.floor(Number(file.size) / 1024) % 1024).slice(0, 1) +
            "mb"
          : file.size + "b"
      }`,
    };
    for (const image of images) {
      const imageName = `${new Date().getTime()} - ${image.name}`;
      image.mv(__dirname + "\\uploads\\images\\" + imageName, (err) => {
        if (err) {
          console.log(err);
          return err;
        }
      });
      imagesArray.push({
        name: imageName.split(" - ")[1],
        path: "\\uploads\\images\\" + imageName,
        size: `${
          Number(image.size) / 1024 > 0 && Number(image.size) / 1024 < 1024
            ? Math.floor(Number(image.size) / 1024) +
              "," +
              String(Number(image.size) % 1024).slice(0, 1) +
              "kb"
            : Number(image.size) / 1024 >= 1024
            ? Math.floor(Number(image.size) / 1024 / 1024) +
              "," +
              String(Math.floor(Number(image.size) / 1024) % 1024).slice(0, 1) +
              "mb"
            : image.size + "b"
        }`,
      });
    }
    const updateSlide = await Slide.findByIdAndUpdate(id, {
      title,
      body,
      file: file__,
      images: imagesArray,
    });
    res.send(updateSlide);
  } catch (err) {
    res.send({ error: err.message });
  }
});

// ~~~~~~~~~~~~ user ~~~~~~~~~~~~~
app.post("/user/signup", async (req, res) => {
  const { login, password, email } = req.body;

  const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
  };
  try {
    const user = await User.signup(login, password, email, req);
    if (req.files) {
      const img = req.files.image;
      const imgName = `${user._id} - ${img.name}`;
      img.mv(__dirname + "\\uploads\\user\\" + imgName, (err) => {
        if (err) return err;
      });
      await User.findByIdAndUpdate(user._id, {
        login: user.login,
        email: user.email,
        password: user.password,
        role: user.role,
        imagePath: "\\uploads\\user\\" + imgName,
      });
    } else {
      await User.findByIdAndUpdate(user._id, {
        ogin: user.login,
        email: user.email,
        password: user.password,
        role: user.role,
        imagePath: "\\uploads\\user\\user.jpeg",
      });
    }

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ login: user.login, user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { login, password, lastPassword, email, role } = req.body;

  try {
    const user_ = await User.findById(id);

    const match = await bcrypt.compare(password, user_.password);

    if (!match) {
      throw Error("Incorrect password");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(lastPassword, salt);

    if (req.files) {
      const image = req.files.image;
      const imgName = new Date().getTime() + " - " + image.name;

      image.mv(__dirname + "\\uploads\\user\\" + imgName, (err) => {
        if (err) throw err;
      });

      if (user_.imagePath != "\\uploads\\user\\user.jpeg") {
        fs.rm(__dirname + user_.imagePath, (err) => {
          if (err) throw err;
        });
      }
      const user = await User.findByIdAndUpdate(id, {
        login,
        password: hash,
        email,
        role,
        imagePath: `\\uploads\\user\\${imgName}`,
      });

      res.status(200).json(user);
    }
    if (!req.files) {
      const user_ = await User.findById(id);

      if (user_.imagePath != "\\uploads\\user\\user.jpeg") {
        fs.rm(__dirname + user_.imagePath, (err) => {
          if (err) return err;
        });
      }

      const user = await User.findByIdAndUpdate(id, {
        login,
        password: hash,
        email,
        role,
        imagePath: "\\uploads\\user\\user.jpeg",
      });
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/admin/:id", async (req, res) => {
  const { id } = req.params;
  const { login, password, email, role } = req.body;

  if (req.user && req.user.role == "admin") {
    try {
      const user_ = await User.findById(id);

      const match = await User.find({ login });
      const matchEmail = await User.find({ email });

      if (
        (user_.login != login && match) ||
        (matchEmail && user_.email != email)
      ) {
        throw Error("Login or email already in use");
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      if (req.files) {
        const image = req.files.image;
        const imgName = new Date().getTime() + " - " + image.name;

        image.mv(__dirname + "\\uploads\\user\\" + imgName, (err) => {
          if (err) return err;
        });

        if (user_.imagePath != "\\uploads\\user\\user.jpeg") {
          fs.rm(__dirname + user_.imagePath, (err) => {
            if (err) throw err;
          });
        }
        const user = await User.findByIdAndUpdate(id, {
          login,
          password: hash,
          email,
          role,
          imagePath: `\\uploads\\user\\${imgName}`,
        });

        res.status(200).json(user);
      }
      if (!req.files) {
        const user = await User.findByIdAndUpdate(id, {
          login,
          password: hash,
          email,
          role,
        });

        res.status(200).json(user);
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  } else {
    res.status(400).json({ error: "You are not a admin" });
  }
});

app.use("/user", adminAuth);

app.delete("/user/:id", async (req, res) => {
  try {
    if (req.user) {
      if (req.user.role == "admin") {
        const { id } = req.params;

        const user_ = await User.findById(id);

        if (user_.imagePath != "\\uploads\\user\\user.jpeg") {
          fs.rm(__dirname + user_.imagePath, (err) => {
            if (err) return err;
          });
        }

        const user = await User.findByIdAndDelete(id);
        res.status(200).json(user);
      }
    } else {
      res.status(400).json({ error: "You are not a admin" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => {
    if (res) {
      app.listen(port, () =>
        console.log(`connected to db && listening on port ${port}!`)
      );
    }
  })
  .catch((err) => console.log(err));
