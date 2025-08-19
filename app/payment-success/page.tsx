'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { decryptData } from '../utils/tools';
import { Button } from '@material-tailwind/react';


export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const productId = searchParams.get('productId');
    const userId = searchParams.get('userId');
    const [status, setStatus] = useState('processing');

    // Systems 
    const router = useRouter()

    useEffect(() => {
        if (!productId && !userId) {
            setStatus('failed');
            return;
        }

        // สร้างฟังก์ชันสำหรับเช็คสถานะ
        const checkStatus = async () => {
            const payload = { productId: productId, userId: userId };
            try {

                const token = decryptData(localStorage.getItem("Token") || "");

                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_API}/api/pay/check-befor-pay`,
                    payload,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}` // สมมติว่า HeaderMultiAPI ทำแบบนี้
                        }
                    }
                );
                if (res.status === 200) {
                    console.log(res.data);
                    let statusText = "processing"
                    if (res.data.status === 1) {
                        statusText = "success"
                    }
                    else if (!res.data ) {
                        statusText = "failed"
                    }
                    setStatus(statusText)
                }

            } catch (error) {
                console.error("Failed to check status:", error);
                setStatus("failed")
            }
        };

        // เริ่มการเช็คทุกๆ 2 วินาที
        const intervalId = setInterval(checkStatus, 2000);

        // อย่าลืมเคลียร์ Interval เมื่อออกจากหน้านี้
        return () => clearInterval(intervalId);
    }, [productId]);

    const handleClick = ()=> {
        if(!productId) alert('ส่งข้อมูลไม่ครบ')
            router.push(`/user/buycourse/${productId}`)

    }

    if (status === 'processing') {
        return <div className='text-3xl'>⏳ กำลังตรวจสอบการชำระเงิน...</div>;
    }

    if (status === 'success') {
        return (
            <div className=' flex flex-col justify-center '>
                <h1 className='text-3xl'>✅ การชำระเงินสำเร็จ !</h1>
                <Button color="indigo" className='py-3 mt-4' onClick={handleClick}>กลับหน้าคอร์สเรียน</Button>

            </div>
        )
    }

    return  (
                  <div className=' flex flex-col justify-center '>
                <h1 className='text-3xl'>❌ เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง</h1>
                <Button color="indigo" className='py-3 mt-4' onClick={handleClick}>กลับหน้าคอร์สเรียน</Button>

            </div>
    )
}