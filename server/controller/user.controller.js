const UserModel = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await UserModel.findOne({ email })

    if (!user) {
      return res.status(404).send("User with this email not found")
    }

    if(!user.mentor){
      return res.status(400).send("Only mentor can login")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).send("Password do not match with the email")
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    )

    const cookieOptions = {
      http: true,
      secure: true,
    }
    return response.cookie("token", token, cookieOptions).status(200).json({
      message: "Login successfully",
      token: token,
      success: true,
    })
  } catch (error) {
    console.log("error while login user", error)
    res.status(500).send("Internal server error while loging user");
  }
}

const checkLogin = async (req, res) => {
  try {
    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")
    if(!token){
      return res.status(401).send("Unauthorized request")
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const user = await UserModel.findById(decodedToken.id)

    if(!user){
      return res.status(401).send("invalid access token")
    }

    return res.status(200).json({
      message : "User is logged in"
    })
  } catch (error) {
    console.log("error while checking user authentication", error)
    res.status(500).send("Internal server error while checking user authentication");
  }
}

module.exports = { loginUser, checkLogin}
