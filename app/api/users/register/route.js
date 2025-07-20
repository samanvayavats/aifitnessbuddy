import dbConnect from "@/lib/dbconnect";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(request) {
    await dbConnect()
    // console.log("body : ",request.json())
    const body = await request.json()
    console.log("body " , body)
    const {email} = body


    if (!email) {
        return NextResponse.json({
            message: "email is required"
        }, { status: 401 })
    }

    const userIsExisted = await User.findOne({ email })

    if (userIsExisted) {
        return NextResponse.json({
            message: "user already exites"
        }, { status: 401 })
    }

    const user = await User.create({
        email: email
    })

    const isUserRegistered = await User.findById(user?._id)

    if (!isUserRegistered) {
        return NextResponse.json({
            message: "user registeraion fails "
        }, { status: 500 })
    }

    return NextResponse.json({
        message: "user registed succesfullly"
    }, { status: 201 })

}