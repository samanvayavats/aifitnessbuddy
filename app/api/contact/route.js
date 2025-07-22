import dbConnect from "@/lib/dbconnect";
import { Contact } from "@/models/contact.model.js";
import { NextResponse } from "next/server";

export async function POST(request) {

    try {
        dbConnect()
        const body = await request.json()
        // console.log("body " ,body)

        const email = body.formData.email
        const name = body.formData.name
        const message = body.formData.message

        if ( !email || !name || !message) {
            return NextResponse.json({
                message: "all the fields are required"
            }, { status: 401 })
        }

        const user = await Contact.create({
            name : name,
            email : email,
            message :message
        })

        const isUserCreated = await Contact.findById(user._id)

        if (!isUserCreated) {
            return NextResponse.json({
                message: "Request Failed"
            }, { status: 500 })
        }

        return NextResponse.json({
            message: "All request has been recieved "
        }, { status: 200 })
  
    } catch (error) {
    console.log("something went wrong in contacting us" ,error)
    } 

}