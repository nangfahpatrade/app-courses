"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { button, Button, Card, Typography } from "@material-tailwind/react";
import ReactPlayer from "react-player";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { IoPlaySkipBackOutline } from "react-icons/io5";
import Image from "next/image";
import { authToken } from "@/app/utils/tools";
import Swal from "sweetalert2";

interface PageProps {
  params: {
    id: string;
  };
}

interface ProductData {
  product_id: number;
  product_title: string;
  // titles: Title[];
}

interface ProductTitle {
  title_id: number;
  title: string;
  videos: ProductVideos[];
}

interface ProductVideos {
  video_id: number;
}

const Study: React.FC<PageProps> = ({ params }) => {
  const [data, setData] = useState<ProductData | null>(null); // Update state to hold a single object

  // นาย
  const [dataTitle, setDataTitle] = useState<ProductTitle[]>([]);
  const [dataVideo, setDataVideo] = useState<ProductVideos[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedVideoId, setSelectedVideoId] = useState<any | null>(null);

  // State Active
  const [activeTitle, setActiveTitle] = useState<any | null>(null);
  const [activeVideo, setActiveVideo] = useState<any | null>(null);

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";

  const decryptData = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const userId = decryptData(localStorage.getItem("Id") || "");

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/users/product/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${await authToken()}`,
          },
        }
      );
      if (res.status === 200) {
        setData({
          product_id: res.data[0].product_id,
          product_title: res.data[0].product_title,
        });
        setDataTitle(res.data[0].titles);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data from server.");
    }
  };

  const handleClick = (id: any) => {
    const newData = dataTitle
      .filter((item) => item.title_id === id)
      .map((item) => item.videos);
    const flatVideos = newData.flat();
    setDataVideo(flatVideos);
    setActiveTitle(id);
  };

  const handleChangePage = (page: number) => {
    setPageNumber(page);
  };

  const handlePlayClick = (id: number) => {
    setSelectedVideoId(id);
    setActiveVideo(id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const videoRef = useRef<ReactPlayer>(null);

  const seekTo = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.seekTo(seconds);
    }
  };

  // console.log(data?.titles)

  return (
    <div className="  container mx-auto py-8 px-4 ">
      <ToastContainer autoClose={2000} theme="colored" />

      <h1>{data?.product_title}</h1>

      <div className="flex flex-col lg:flex-row gap-4 mt-6">
        <div className="w-full lg:w-2/3 ">
          <ShowVideo id={selectedVideoId} />
        </div>
        <div className="w-full lg:w-1/3">
          <div className="bg-white shadow-lg rounded-md border border-gray-200 ">
            <h2 className="py-2  px-4 bg-gray-300 text-gray-900 rounded-t-md">
              หัวข้อหลัก{" "}
            </h2>
            <ul className="py-2 px-4 mb-8">
              {dataTitle?.map((item: any, index: any) => (
                <li
                  onClick={() => handleClick(item.title_id)}
                  key={item.title_id}
                  className={`pt-3 pb-3 px-4 hover:bg-gray-200  rounded-md cursor-pointer ${activeTitle == item.title_id && "bg-gray-300"
                    }`}
                >
                  {index + 1}. {item.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full mt-5 text-left flex flex-row justify-center lg:justify-start gap-3 ">
            <Link
              href="/user/mycourse"
              className="bg-indigo-900 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
            >
              คอร์สเรียนของฉัน
            </Link>

            <Link
              href="/user/shopcourse"
              className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-md"
            >
              ซื้อคอร์สเรียนใหม่
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center lg:justify-start gap-6 mt-5">
        <button
          className={`text-lg ${pageNumber === 1 && "border-b-4 border-indigo-900"
            }`}
          onClick={() => handleChangePage(1)}
        >
          คลิปวีดีโอ
        </button>
        <button
          className={`text-lg ${pageNumber === 2 && "border-b-4 border-indigo-900"
            }`}
          onClick={() => handleChangePage(2)}
        >
          ตอบคำถาม
        </button>
      </div>

      <div className="mt-5 ">
        {pageNumber === 1 ? (
          <VideoSection
            dataVideo={dataVideo}
            onPlayClick={handlePlayClick}
            activeVideo={activeVideo}
          />
        ) : (
          <QuestionSection
            product_id={data?.product_id}
            activeTitle={activeTitle}
            userId={userId}
          />
        )}
      </div>
    </div>
  );
};

export default Study;

// Components โชว์รายการวีดีโอ
export const VideoSection = ({
  dataVideo,
  onPlayClick,
  activeVideo,
}: {
  dataVideo: any[];
  onPlayClick: (id: number) => void;
  activeVideo: any;
}) => {
  return (
    <div className="bg-white w-full lg:w-2/3 rounded-md py-6 px-8">
      <ul className="flex flex-col gap-2">
        {dataVideo?.map((item: any, index: any) => (
          <li
            className={`hover:bg-gray-200 pt-3 py-3 px-4 flex flex-row justify-between items-center rounded-md ${activeVideo === item.video_id && "bg-gray-300"
              } `}
            key={item.video_id}
          >
            {" "}
            คลิปวีดีโอที่ {index + 1}

            <button
              className={`bg-red-800 hover:bg-red-700 text-white px-3 rounded-md flex flex-row gap-2 justify-center items-center `}
              onClick={() => onPlayClick(item.video_id)}
            >
              <IoPlaySkipBackOutline /> เล่น
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ShowVideo = ({ id }: { id: number }) => {
  const [videoData, setVideoData] = useState<any>(null);

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";

  const decryptData = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const fetchData = async () => {
    try {
      if (id) {
        Swal.fire({
          title: "กำลังโหลดข้อมูล...",
          text: "กรุณารอสักครู่",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
      }


      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/users/product/video/${id}`,
        {
          headers: {
            Authorization: `Bearer ${await authToken()}`,
          },
          responseType: "blob",
        }
      );

      Swal.close()

      const videoBlob = new Blob([res.data], { type: "video/mp4" });
      const videoUrl = URL.createObjectURL(videoBlob);
      setVideoData(videoUrl); // สร้าง URL จาก blob และเก็บลง state
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div>
      {/* <p>Video ID: {id} </p>
      <p>Video path: {videoData} </p> */}
      {videoData ? (
        <video
          controls
          className="w-full custom-video "
          controlsList="nodownload"
          key={videoData}
          onContextMenu={(e) => e.preventDefault()}
        >
          <source src={videoData} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="bg-black lg:h-[400px] rounded-sm">
          <h2 className="text-xl text-gray-400 text-center pt-8">
            กรุณาเลือกคอร์สเรียนที่ต้องการ
          </h2>
        </div>
      )}
    </div>
  );
};

// Components คำถามตอบ
export const QuestionSection = ({
  product_id,
  activeTitle,
  userId,
}: {
  product_id: any;
  activeTitle: number;
  userId: any;
}) => {
  const [data, setData] = useState<any | []>([]);
  const [dataAllNew, setDataAllNew] = useState<any | []>([]);
  const [showImage, setShowImage] = useState<string>("");
  const [sendData, setSendData] = useState<any>({
    product_id: product_id,
    products_title_id: activeTitle,
    new_question_id: null,
  });

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";
  const decryptData = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const fetchData = async (
    new_question_id: any,
    products_id: number,
    products_title_id: number
  ) => {
    try {
      const data = {
        products_id: products_id,
        products_title_id: products_title_id,
        new_question_id: new_question_id,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/question/list`,
        data,
        {
          headers: {
            Authorization: `Bearer ${await authToken()}`,
          },
        }
      );

      console.log(res.data.data);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataAllNewQuestion = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/question/new/${userId}/${activeTitle}`,
        {
          headers: {
            Authorization: `Bearer ${await authToken()}`,
          },
        }
      );
      console.log(res.data);
      setDataAllNew(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequest = async () => {
    try {
      const data = {
        status: 0,
        users_id: userId,
        products_id: product_id,
        products_title_id: activeTitle,
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/question/new/add`,
        data,
        {
          headers: {
            Authorization: `Bearer ${await authToken()}`,
          },
        }
      );

      if (res.status === 200) {
        fetchDataAllNewQuestion();
        toast.success(res.data.message);
      } else {
        toast.error("มีข้อผิดพลาดเกิดขึ้น");
      }
    } catch (err) {
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response.data.message);
    }
  };

  const handleShowImage = (image: string) => {
    setShowImage(image);
  };

  const handleChangeQuestion = async (
    id: number,
    products_id: number,
    products_title_id: number
  ) => {
    const new_question_id = id;
    setSendData({
      product_id: products_id,
      products_title_id: products_title_id,
      new_question_id: id,
    });
    fetchData(new_question_id, products_id, products_title_id);
  };

  const handleDefaleQuestion = async () => {
    setSendData({
      product_id: product_id,
      products_title_id: activeTitle,
      new_question_id: null,
    });
    //  fetchData(sendData.new_question_id, sendData.product_id, sendData.products_title_id);
  };

  useEffect(() => {
    fetchData(sendData.new_question_id, sendData.product_id, activeTitle);
    fetchDataAllNewQuestion();
  }, [activeTitle, sendData]);
  return (
    <div className="bg-white px-8 py-8 shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full lg:w-2/4 bg-gray-100 px-6 py-4 rounded-md shadow-lg border border-gray-200 h-96 md:h-full overflow-y-scroll">
          <ul className="flex flex-col gap-4">
            {data.map((item: any, index: number) => (
              <li className="flex flex-row justify-between" key={item.id}>
                ข้อที่ {index + 1} : {item.question}
                <div className="flex gap-2">
                  <button
                    disabled={!item.image_question}
                    onClick={() => handleShowImage(item.image_question)}
                    className={`${item.image_question ? "bg-indigo-900" : "bg-gray-300"
                      } text-gray-300 px-2 rounded-md text-sm`}
                  >
                    คำถาม
                  </button>
                  <button
                    disabled={!item.image_answer}
                    onClick={() => handleShowImage(item.image_answer)}
                    className={`${item.image_answer ? "bg-indigo-900" : "bg-gray-300"
                      } text-gray-300 px-2 rounded-md text-sm`}
                  >
                    เฉลย
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-1/4">
          <div className="bg-gray-100 shadow-md rounded-md">
            <h2 className="bg-gray-300 text-gray-900 px-8 py-2 rounded-t-md">
              รูปเฉลย
            </h2>

            <div className=" px-4 py-4">
              {showImage ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${showImage}`}
                  width={700}
                  height={700}
                  alt=""
                />
              ) : (
                <p>ไม่มีข้อมูล ...</p>
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/4">
          <div className="flex flex-row gap-2 justify-center lg:justify-start">
            <Button
              onClick={handleDefaleQuestion}
              variant="outlined"
              className="text-sm"
            >
              คำถามเริ่มต้น
            </Button>
            <Button onClick={handleRequest} className="text-sm">
              ขอคำถามชุดใหม่
            </Button>
          </div>

          <div className=" ">
            {dataAllNew.map((item: any, index: any) => (
              <div className="bg-gray-100 shadow-md rounded-md mt-4 border-l-4 border-gray-300 border-t border-t-gray-300" key={item.id}>
                <div className=" px-4 py-4 flex flex-row md:flex-col  justify-start  gap-3">
                  <div className="w-1/3 md:w-full">
                    <h3 className="text-base">รายการที่ {index + 1}</h3>
                  </div>

                  <div className="flex flex-col md:flex-row  items-center justify-between gap-2 w-2/3 md:w-full ">
                    <section className="w-full">
                      <p
                        className={`rounded-md px-4 py-1.5 text-center ${item.status === 0
                          ? "text-red-800 bg-red-100"
                          : "text-green-800 bg-green-100"
                          }`}
                      >
                        {item.status === 0 ? "รอดำเนินการ" : "เสร็จแล้ว"}
                      </p>
                    </section>

                    <section className="w-full">
                      {item.status === 0 ? (
                        <p className="text-sm text-gray-700">รอดำเนินการ</p>
                      ) : (
                        <button
                          className="bg-indigo-800 text-white px-2 py-1.5 rounded-md text-sm w-full"
                          onClick={() =>
                            handleChangeQuestion(
                              item.id,
                              item.products_id,
                              item.products_title_id
                            )
                          }
                        >
                          ดูคำถาม
                        </button>
                      )}
                    </section>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
