"use client";

import BlogTableItem from "@/components/AdminComponents/BlogTableItem";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const Page = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
 const [blogs,setBlogs]=useState([]);
 const fetchBlogs= async()=>{
    try {
      const response = await axios.get("/api/blog");
      if(response.data.blogs){
        setBlogs(response.data.blogs);
      }else{
        console.log("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
 }
 const deleteBlogs=async(mongoId)=>{
    try {
      const response = await axios.delete("/api/blog",{
        params:{
          id:mongoId
        }
      });
      toast.success("Blog Deleted Successfully");
      fetchBlogs();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  
 }
 useEffect(()=>{
    fetchBlogs(); 
 },[]);
  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Blogs</h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        {isClient && (
          <table className="w-full text-sm text-gray-500">
            <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
              <tr>
                <th className="hidden sm:block px-5 py-3" scope="col">
                  Author name
                </th>
                <th className="px-5 py-3" scope="col">
                  Blog Title
                </th>
                <th className="px-5 py-3" scope="col">
                  Date
                </th>
                <th className="px-5 py-3" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog,index) => (
                <BlogTableItem
                  key={index}
                  mongoId={blog._id}
                  author={blog.author}
                  title={blog.title}
                  authorImg={blog.authorImg}
                  date={blog.date}
                  deleteBlogs={deleteBlogs}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Page;
