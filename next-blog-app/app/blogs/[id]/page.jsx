
"use client";
import { assets, blog_data } from "@/Assets/assets";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
const page = ({params}) => {
  const [data, setData] = useState(null);

  const fetchData = async (id) => {
    try {
      const response = await axios.get("/api/blog", {
        params: {
          id: id,
        },
      });
      if (response.data.blog) {
        setData(response.data.blog);
      } else {
        console.log("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchData(params.id);
    }
  }, [params.id]);
  return data ? (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href={"/"}>
            <Image
              src={assets.logo}
              width={100}
              alt=""
              className="w-[130px] sm:w-auto"
            />
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
            Getting started <Image src={assets.arrow} alt="" />
          </button>
        </div>
        <div className="text-center my-24">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>
          <Image
            className="mx-auto mt-6 border-white rounded-full"
            src={data.authorImg}
            width={60}
            height={60}
            alt=""
          />
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            {data.author}
          </p>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          className="border-4 border-white"
          src={data.image}
          width={1280}
          height={720}
          alt=""
        />
        <h1 className="my-8 text-[26px] font-semibold">Introduction :</h1>
        <p className="mt-10 text-lg">{data.description}</p>
        <h3 className="my-5 text-[18px] font-semibold">
          Step 1: Self-Reflection and Goal Settings
        </h3>
        <p className="my-3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae
          quibusdam nemo accusantium aperiam, veniam dolor nam, nobis,
          repellendus sed quam rerum ipsum? Incidunt aliquid sunt eum ad
          recusandae dignissimos libero.
        </p>
        <h3 className="my-5 text-[18px] font-semibold">
          Step 2: Self-Reflection and Goal Settings
        </h3>
        <p className="my-3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae
          quibusdam nemo accusantium aperiam, veniam dolor nam, nobis,
          repellendus sed quam rerum ipsum? Incidunt aliquid sunt eum ad
          recusandae dignissimos libero.
        </p>
        <h3 className="my-5 text-[18px] font-semibold">
          Step 3: Self-Reflection and Goal Settings
        </h3>
        <p className="my-3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae
          quibusdam nemo accusantium aperiam, veniam dolor nam, nobis,
          repellendus sed quam rerum ipsum? Incidunt aliquid sunt eum ad
          recusandae dignissimos libero.
        </p>
        <h3 className="my-5 text-[18px] font-semibold">Conculsion</h3>
        <p className="my-3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae
          quibusdam nemo accusantium aperiam, veniam dolor nam, nobis,
          repellendus sed quam rerum ipsum? Incidunt aliquid sunt eum ad
          recusandae dignissimos libero.
        </p>
        <div className="my-24">
          <p className="text-black font fontt-semibold my-4">
            {" "}
            Share this article in social media{" "}
          </p>
          <div className="flex">
            <Image src={assets.facebook_icon} alt="" width={50} />
            <Image src={assets.twitter_icon} alt="" width={50} />
            <Image src={assets.googleplus_icon} alt="" width={50} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <></>
  );
}

export default page
