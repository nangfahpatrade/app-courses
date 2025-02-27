import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import React from "react";

interface ModalHowToPayProps {
  open: boolean;
  handleOpen: () => void;
}

const ModalHowToPay: React.FC<ModalHowToPayProps> = ({ open, handleOpen }) => {
  return (
    <Dialog open={open} handler={handleOpen} size="sm">
      <DialogHeader>วิธีการชำระเงิน</DialogHeader>
      <DialogBody>
        <div>
          <b>ขั้นตอนที่ 1</b>
          <p>คลิกที่ปุ่ม ทำรายการซื้อ</p>
        </div>

        <div className="mt-4">
          <b>ขั้นตอนที่ 2</b>
          <p>คลิกที่ปุ่ม ทำรายการซื้อ</p>
        </div>

        <div className="mt-4">
          <b>ขั้นตอนที่ 3</b>
          <p>สแกนบาร์โคด และชำระเงินให้ถูกต้อง และแนบสลิปมาให้ระบบตรวจสอบ</p>
        </div>

        <div className="mt-4">
          <b>ขั้นตอนที่ 4</b>
          <p>เมื่อระบบตรวจแล้วไม่มีข้อผิดพลาด จะพบกับเมนู ไปที่คอร์สเรียนของคุณ</p>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="gradient"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>ออก</span>
        </Button>
   
      </DialogFooter>
    </Dialog>
  );
};

export default ModalHowToPay;
