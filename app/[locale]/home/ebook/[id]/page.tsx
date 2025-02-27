"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Card, Button } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

interface ProjectDetail {
  id: number;
  title: string;
  dec: string;
  image_title: string;
  link: string;
}

export default function ProjectDetailPage() {
  const { id } = useParams(); // ดึงค่า id จาก URL
  const [ebook, setEbook] = useState<ProjectDetail | null>(null);

  console.log(id);

  useEffect(() => {
    const fetchEbooksDetail = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/api/ebook/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );
        console.log(res);
        if (res.status === 200) {
          setEbook(res.data);
        } else {
          toast.error("Failed to fetch project details");
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
        toast.error("Error fetching project details");
      }
    };

    fetchEbooksDetail();
  }, [id]);

  if (!ebook) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Typography variant="h4" className="text-center text-gray-800">
          Loading...
        </Typography>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer autoClose={2000} theme="colored" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* รูปภาพ */}
        <div className="w-full">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${ebook?.image_title}`}
            alt={ebook?.title}
            width={800}
            height={600}
            className="rounded-lg object-cover"
            priority
          />
        </div>

        {/* ข้อมูลโครงการ */}
        <div className="w-full">
          <Typography variant="h4" className="font-bold text-red-600 mb-2">
            {ebook.title}
          </Typography>
          <div className="border-t border-b py-2 my-2">
            <Typography>
              <strong> รายละเอียด Ebook :</strong>
            </Typography>
          </div>
          <Typography>{ebook?.dec}</Typography>

          <Typography variant="h5" className="text-gray-800 mt-3 mb-2">
          ลิงค์ :
        </Typography>
          <a
            href={ebook.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 "
          >
            {ebook.link}
          </a>
        </div>
      </div>

      {/* รายละเอียดสินค้า */}
      {/* <div className="mt-8">
        <Typography variant="h5" className="text-gray-800 mb-2">
          ลิงค์ :
        </Typography>
          <a
            href={ebook.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 "
          >
            {ebook.link}
          </a>
      </div> */}
    </div>
  );
}
