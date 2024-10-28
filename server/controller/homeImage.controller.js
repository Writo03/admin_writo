const homeImageModel = require("../models/homeImage.model.js")
const cloudinary = require("../utils/cloudinary.js")

const addImage = async (req, res) => {
  try {
    const { redirection = "", priority } = req.body
    const localPath = req.file?.path

    if (!req.user.isAdmin && !req.user.mentor_access?.includes("HOMEIMAGE")) {
      return res
        .status(400)
        .send(
          "Only admin or mentor with access to home image can access home image"
        )
    }

    if (!priority) {
      return res.status(404).send("Priority is required")
    }
    if (!localPath) {
      return res.status(404).send("Image is required")
    }

    const imgUrl = await cloudinary.uploadOnCloudinary(localPath)

    if (!imgUrl) {
      return res.status(404).send("Error while uploading image")
    }

    const homeImage = await homeImageModel.create({
      image: imgUrl,
      redirection,
      priority,
    })

    return res.status(200).json({
      message: "Home image added successfully",
      homeImage,
    })
  } catch (error) {
    console.log("error while adding home image", error)
    return res.status(500).send("Internal server error while adding home image")
  }
}

const adjustPriority = async (req, res) => {
  try {
    const { imageId } = req.params
    const { priority } = req.body

    if (!req.user.isAdmin && !req.user.mentor_access?.includes("HOMEIMAGE")) {
      return res
        .status(400)
        .send(
          "Only admin or mentor with access to home image can access home image"
        )
    }

    const image = await homeImageModel.findByIdAndUpdate(
      imageId,
      {
        $set: {
          priority,
        },
      },
      { new: true }
    )

    if (!image) {
      return res.status(404).send("Image not found")
    }

    return res.status(200).json({
      message: "Priority adjusted successfully",
      image,
    })
  } catch (error) {
    console.log("error while adjusting priority", error)
    return res
      .status(500)
      .send("Internal server error while adjusting priority")
  }
}

const deleteImage = async (req, res) => {
  try {
    const { imageId } = req.params

    if (!req.user.isAdmin && !req.user.mentor_access?.includes("HOMEIMAGE")) {
      return res
        .status(400)
        .send(
          "Only admin or mentor with access to home image can access home image"
        )
    }

    const image = await homeImageModel.findById(imageId)

    if (!image) {
      return res.status(404).send("Image not found")
    }
    cloudinary.deleteFromCloudinary(image.image)

    return res.status(200).json({
      message: "Image deleted successfully",
    })
  } catch (error) {
    console.log("error while deleting image", error)
  }
}

const getHomeImgaes = async (req, res) => {
  try {
    if (!req.user.isAdmin && !req.user.mentor_access?.includes("HOMEIMAGE")) {
      return res
        .status(400)
        .send(
          "Only admin or mentor with access to home image can access home image"
        )
    }

    const images = await homeImageModel.find({}).sort({ priority: 1 })
    if (!images) {
      return res.status(404).send("Images not found")
    }

    return res.status(200).json({
      message: "images fetched successfully",
      images,
    })
  } catch (error) {
    console.log("error while fetching images", error)
    return res.status(500).send("Internal server error while fetching images")
  }
}

module.exports = { addImage, adjustPriority, deleteImage, getHomeImgaes }
