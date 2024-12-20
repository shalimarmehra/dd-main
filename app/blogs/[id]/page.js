"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image"; // Added Next Image import

const Page = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    try {
      const response = await axios.get("/api/blog", {
        params: {
          id: id,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlogData();
    }
  }, [id]);

  return (
    <div>
      {data && (
        <div>
          <h3>{data.category}</h3>
          <h1>{data.title}</h1>
          <h4>{data.description}</h4>
          <p>{data.date}</p>
          <p>{data.author}</p>
          <Image
            src={`/${data.image}`}
            alt="Post Image"
            width={400}
            height={400}
            priority={true}
            style={{ display: "block", maxWidth: "100%", height: "auto" }}
          />
          <p>{data.content}</p>
        </div>
      )}
    </div>
  );
};
export default Page;