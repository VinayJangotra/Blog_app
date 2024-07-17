import { connectDB } from "@/lib/config/db";
import { writeFile } from "fs/promises";
import { Buffer } from "buffer";
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server");

// Connecting to the database
const LoadDB = async () => {
  try {
	await connectDB();
  } catch (error) {
	console.error("Failed to connect to the database:", error);
  }
};
LoadDB();

export async function GET(request) {
  console.log("Blog get hitted");
  return NextResponse.json({
	msg: "Api is working",
  });
}

// Adding the image to the folder
export async function POST(request) {
  try {
	const formData = await request.formData();
	const timeStamp = Date.now();
	const image = formData.get('image');
	const imageByteData = await image.arrayBuffer();
	const buffer = Buffer.from(imageByteData);
	const path = `./public/${timeStamp}-${image.name}`;
	
	await writeFile(path, buffer);
	
	const imgUrl = `/${timeStamp}-${image.name}`;
    // Getting the data from the user
	const blogData = {
    title: `${formData.get("title")}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")}`,
    author: `${formData.get("author")}`,
    image: `${imgUrl}`,
    authorImg: `${formData.get("authorImg")}`
  };
	await BlogModel.create(blogData);
    console.log("Blog saved successfully");
	return NextResponse.json({
	  success: true,
      msg:"Blog added"
	});
  } catch (error) {
	console.error("Failed to save blog", error);
	return NextResponse.json({
	  error: "Failed to save the blog",
	}, { status: 500 });
  }
}

