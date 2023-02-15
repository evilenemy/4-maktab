const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchemas = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  file: {
    type: Object,
    required: false,
  },
  images: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Files", fileSchemas);
