import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
type ApiErrorData = {
    message: string
}

export const ErrorAlert = (error: unknown) => {
    console.log(error);


    if (axios.isAxiosError(error) && error.response) {
        const data = error.response.data as ApiErrorData;
        toast.error(data.message || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    } else {
        toast.error("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
    }

}