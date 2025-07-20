import dbConnect from "@/lib/dbconnect";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";
import axios from 'axios';

const sendToOpenRouter = async (history) => {
    try {
        const res = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'deepseek/deepseek-chat-v3-0324:free',
                messages: history,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.API_KEY_FOR_AI_REQUEST}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return res.data.choices[0].message.content;
    } catch (err) {
        console.error('AI Error:', err);
        throw err;
    }
};


export async function POST(request) {
    try {
        await dbConnect();
        const form = await request.formData()

        const email = form.get('email')
        const input = form.get('input')
        const file = form.get('file')

        if (!input) {
            return NextResponse.json({
                message: "the input is required"
            }, { status: 401 })
        }

        let result = '';
        if (file) {
            const buffer = Buffer.from(await file.arrayBuffer());

            result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );

                streamifier.createReadStream(buffer).pipe(uploadStream);
            });
        }

        const responseToAddIntheHistoryFormUser = {};

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({
                message: "Invalid User"
            }, { status: 401 })
        }

        responseToAddIntheHistoryFormUser.role = 'user';
        responseToAddIntheHistoryFormUser.image = result?.url || '';
        responseToAddIntheHistoryFormUser.content = input;

        
        user.history.push(responseToAddIntheHistoryFormUser);

        
        const aiReply = await sendToOpenRouter(user.history);

        user.history.push({
            image :"",
            role: 'assistant',
            content: aiReply
        });

        await user.save();

        return NextResponse.json({
            message: "New message sent to the AI"
        }, { status: 200 });


    } catch (error) {

        return NextResponse.json({
            message: "somthing went wrong to communicate wit ai ",

        }, { status: 500 }, { error: error })
    }
}


export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ message: "The email is required" }, { status: 401 });
    }

    const user = await User.findOne({ email }).select('-email');

    if (!user) {
      return NextResponse.json({ message: "Invalid user" }, { status: 401 });
    }

    return NextResponse.json({
      message: "All the frontend data",
      user: user
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      message: "Cannot fetch data",
      error: error.message
    }, { status: 500 });
  }
}
