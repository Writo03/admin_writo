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

module.exports = { loginUser}
