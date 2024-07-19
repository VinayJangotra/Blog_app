"use client";

import SubscriptionTableItem from "@/components/AdminComponents/SubscriptionTableItem";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Page = () => {
  const [emails, setEmails] = useState([]);

  const fetchEmail = async () => {
    try {
      const response = await axios.get("/api/email");
      if (response.data.emails) {
        setEmails(response.data.emails);
      } else {
        console.log("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

 

  useEffect(() => {
    fetchEmail();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt sm:pl-16">
      <h1>All subscription</h1>
      <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email Subscription
              </th>
              <th scope="col" className="hidden sm:block px-6 py-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {emails.map((item, index) => (
              <SubscriptionTableItem
                key={index}
                email={item.email}
                mongoId={item._id}
                date={item.date}
              
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
