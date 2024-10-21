const c = require("cloudinary")
const fs = require("fs")
const cloudinary = c.v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = async (file) => {
  try {
    if (!file) return null

    const response = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
      format: "webp",
      transformation: {
        quality: "auto:best",
      },
    })

    fs.unlinkSync(file)

    return response.secure_url
  } catch (error) {
    fs.unlinkSync(file)
    console.log("error while uploading on cloudinary", error)
    return null
  }
}

const deleteFromCloudinary = async (imgUrl) => {
  try {
    if (!imgUrl) return null
    let imgArray = imgUrl.split("/")
    // let folder = imgArray[imgArray.length - 2]
    let publicId = imgArray[imgArray.length - 1].split(".")[0]
    // let publicId = `${folder}/${id}`
    let response = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    })

    return response
  } catch (error) {
    return null
  }
}

module.exports = { uploadOnCloudinary, deleteFromCloudinary }
