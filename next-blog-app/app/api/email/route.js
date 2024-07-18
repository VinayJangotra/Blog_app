
import { connectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";
import axios from "axios";
const LoadDB = async ()=>{
    try{
        await connectDB();
    }catch(error){
        console.error("Failed to connect to the database:",error);
    }

}
LoadDB();
export async function POST(request){
    const formData= await request.formData();
    const emailData={
        email:`${formData.get("email")}`,
    }
    await EmailModel.create(emailData);
    return NextResponse.json({
        success:true,
        msg:"Email added"
    })
}