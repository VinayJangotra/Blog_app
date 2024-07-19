import { connectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Ensure the database is connected before handling requests
const LoadDB = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};
LoadDB();

export async function POST(request) {
  try {
    const formData = await request.formData();
    const emailData = {
      email: `${formData.get("email")}`,
    };
    await EmailModel.create(emailData);
    return NextResponse.json({
      success: true,
      msg: "Email added",
    });
  } catch (error) {
    console.error("Error adding email:", error);
    return NextResponse.json({
      success: false,
      msg: "Failed to add email",
    });
  }
}

export async function GET(request) {
  try {
    const emails = await EmailModel.find({});
    return NextResponse.json({ emails });
  } catch (error) {
    console.error("Error fetching emails:", error);
    return NextResponse.json({
      success: false,
      msg: "Failed to fetch emails",
    });
  }
}
// Delete email by id
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");

  // Validate and convert id to ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, msg: "Invalid ID format" });
  }

  try {
    await EmailModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, msg: "Email Deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, msg: "Error deleting email" });
  }
}