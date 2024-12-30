/* eslint-disable no-undef */
const { NextResponse } = require("next/server");
const { ConnectDB } = require("@/lib/config/db");
import BlogModel from "@/lib/models/BlogModel";
import { writeFile as fsWriteFile } from "fs/promises";
const fs = require("fs");

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

// API endpoint to  get all blogs
export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  } else {
    const blogs = await BlogModel.find({}); 
    return NextResponse.json({ blogs });
  }
}

// API endpoint to Upload Blogs
export async function POST(request) {
  // Handle POST request
  const formData = await request.formData(); // Get form data
  const timestamp = new Date().getTime(); // Get current timestamp in milliseconds

  const image = formData.get("image"); // Get image from form data
  const imageByteData = await image.arrayBuffer(); // Convert to byte data
  const buffer = Buffer.from(imageByteData); // Convert to buffer
  const path = `public/${timestamp}_${image.name}`; // Path to save image
  await fsWriteFile(path, buffer); // Save image to path
  const imgURL = `${timestamp}_${image.name}`; // Image URL to save in database

  const blogData = {
    category: `${formData.get(`category`)}`,
    title: `${formData.get(`title`)}`,
    description: `${formData.get(`description`)}`,
    date: `${formData.get(`date`)}`,
    author: `${formData.get(`author`)}`,
    image: `${imgURL}`,
    content: `${formData.get(`content`)}`,
  };

  await BlogModel.create(blogData); // Save blog data to database
  console.log("Blog data saved to database"); // Log message to console

  return NextResponse.json({ success: true, msg: "Blog Added" });
}

// Creating API endpoint to Delete blog
export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");
  const blog = await BlogModel.findById(id);
  fs.unlink(`public/${blog.image}`, (err) => {
    if (err) {
      console.error("Error deleting image:", err);
    }
  });
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({ success: true, msg: "Blog Deleted" });
}