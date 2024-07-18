import { connectDB } from "@/lib/config/db";
import { writeFile } from "fs/promises";
import { Buffer } from "buffer";
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server");
const fs = require('fs')

// Connecting to the database
const LoadDB = async () => {
  try {
	await connectDB();
  } catch (error) {
	console.error("Failed to connect to the database:", error);
  }
};
LoadDB();
// Get all blogs


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
    // Getting the blog data for the uploadation of blogs
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

export async function GET(request) {
  const blogId= request.nextUrl.searchParams.get("id");
  if(blogId){
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json({blog});
  }
  const blogs = await BlogModel.find({});
  return NextResponse.json({
    blogs,
  });
}

// Creating an Api endpoint to delete the blog
export async function DELETE(request) {
  // Getting the blog id from the frontend as the user
  const blogId = request.nextUrl.searchParams.get("id");
  try {
    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return NextResponse.json(
        {
          error: "Blog not found",
        },
        { status: 404 }
      );
    }

    fs.unlink(`./public${blog.image}`, (err) => {
      if (err) {
        console.error("Failed to delete image file", err);
      }
    });

    await BlogModel.findByIdAndDelete(blogId);

    return NextResponse.json({
      success: true,
      msg: "Blog deleted",
    });
  } catch (error) {
    console.error("Failed to delete blog", error);
    return NextResponse.json(
      {
        error: "Failed to delete the blog",
      },
      { status: 500 }
    );
  }
}