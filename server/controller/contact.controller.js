const contactModel = require("../models/contact.model.js")
const Doubt =require("../models/doubt.model.js")
const getContactRequests = async (req,res) => {
    try {
        if(!req.user.isAdmin && !req.user.mentor_access?.includes("CONTACT")){
            return res.status(400).send("Only admin or mentor with access to contact can access contact requests")
        }

        const requests = await contactModel.find({}).sort({createdAt : -1})

        if(!requests.length){
            return res.status(404).send("No requests found")
        }

        return res.status(200).json({
            message : "Requests fetched successfully",
            requests
        })

    } catch (error) {
        console.log("error while fetching requests", error)
        return res.status(500).send("Internal server error while fetching requests")
    }
}

const getDoubtRequests = async (req,res) => {
    try {
        if(!req.user.isAdmin && !req.user.mentor_access?.includes("CONTACT")){
            return res.status(400).send("Only admin or mentor with access to contact can access contact requests")
        }

        const requests = await Doubt.find({}).populate('user');

        // console.log(requests)

        if(!requests.length){
            return res.status(404).send("No requests found")
        }

        return res.status(200).json({
            message : "Requests fetched successfully",
            requests
        })

    } catch (error) {
        console.log("error while fetching requests", error)
        return res.status(500).send("Internal server error while fetching requests")
    }
}


module.exports = {
    getContactRequests,
    getDoubtRequests
}