const Slide = require("../models/fileModel");

const getAllSlides = async (req, res) => {
  const slides = await Slide.find({}).sort({ createdAt: -1 });

  res.status(200).send(slides);
};

const getSlide = async (req, res) => {
  const { id } = req.params;

  const slide = await Slide.findById(id);

  res.status(200).json(slide);
};

module.exports = {
  getAllSlides,
  getSlide,
};
