import mongoose from "mongoose"

const dbConnect = async () => {
    try {
        await mongoose.connect(`${process.env.DB_STRING}peronalFitnessAiBuddyBackend`)
        console.log("the backend has been connected")
    } catch (error) {
        throw new Error("something went wrong in connecting with the database", error)
    }

}

export default dbConnect