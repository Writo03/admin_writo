const UserModel = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const loginUser = async (req, res) => {
  console.log("I am received")
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
    return res.cookie("token", token, cookieOptions).status(200).json({
      message: "Login successfully",
      token: token,
      success: true,
      data : user
    })
  } catch (error) {
    console.log("error while login user", error)
    res.status(500).send("Internal server error while loging user");
  }
}

const registerMentor = async (req, res) =>{
  try {
    const {name, email, password} = req.body
    const newPassword = await bcrypt.hash(password, 10)
    const user = await UserModel.create({
      name,
      email,
      password : newPassword,
      mentor : true
    })
    return res.status(200).json({
      message : "User registered successfully",
      user,
    })
  } catch (error) {
    console.log("error : ", error)
  }
}

const checkLogin = async (req, res) => {
  return res.status(200).json({
    message : "User is logged in",
    data : req.user
  })
}

const addAdmin = async (req, res) => {
  try {
    const {email} = req.body
    if(!req.user || !req.user.isAdmin){
      return res.status(400).send("Only admin can add admin")
    }

    const user = await UserModel.findOne({email})

    if(!user){
      return res.status(404).send("User not found")
    }

    user.isAdmin = true
    await user.save({validateBeforeSave : false})

    return res.status(200).json({
      message : "Adming added successfully",
    })

  } catch (error) {
    console.log("error while adding admin", error)
    res.status(500).send("Internal server error while adding admin");
  }
}

const addMentor = async (req, res)=> {
  try {
    const {email, access} = req.body
    if(!req.user || !req.user.isAdmin){
      return res.status(400).send("Only admin can add mentor")
    }

    const user = await UserModel.findOne({email})
    if(!user){
      return res.status(404).send("User not found")
    }
    user.mentor = true
    user.mentor_access = access
    await user.save({validateBeforeSave : false})
    return res.status(200).json({
      message : "Mentor added successfully",
    })

  } catch (error) {
    console.log("error while adding mentor", error)
    res.status(500).send("Internal server error while adding mentor");
  }
}

module.exports = { loginUser, checkLogin, addAdmin, registerMentor, addMentor}
