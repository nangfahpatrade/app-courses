// SubCoursePath.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { userIdState, numberState } from "@/store/store"; 

interface SubCoursePathProps {
  data: any; 
}

const SubCoursePath: React.FC<SubCoursePathProps> = ({ data }) => {
  const router = useRouter();
  const [, setUserId] = useRecoilState(userIdState);
  const [, setNumber] = useRecoilState(numberState);

  // Combined function to handle redirects with a parameter
  const handleRedirect = (number: number) => {
    const userId = data?.product_id; 
    if (userId) {
      // Store the userId and number in Recoil
      setUserId(userId);
      setNumber(number.toString());
      
      // Navigate to the login page
      router.push(`/login`);
    } else {
      console.error("Product ID is missing");
    }
  };

  return (
    <div className="bg-gray-100 shadow p-4 rounded">
      {data?.products_price === 0 ? (
        <button
          className="bg-green-500 text-white px-4 py-2 mt-3 rounded-md w-full"
          onClick={() => handleRedirect(0)}
        >
          ดูคอร์สเรียนนี้
        </button>
      ) : (
        <button
          className="bg-[#184785] text-white px-4 py-2 mt-3 rounded-md w-full"
          onClick={() => handleRedirect(1)}
        >
          ซื้อคอร์สเรียนนี้
        </button>
      )}
    </div>
  );
};

export default SubCoursePath;
