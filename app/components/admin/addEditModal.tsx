"use client";
import { useEffect, useMemo } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { AiOutlineStop } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";

interface Customer {
  id: number;
  username: string;
  name: string;
  address: string;
}

interface AddCustomerModalProps {
  open: boolean;
  handleModalAdd: () => void;
  formData: { username: string; password: string; name: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddCategory: () => void;
  dataEdit: Customer | null;
  setFormData: React.Dispatch<
    React.SetStateAction<{ username: string; password: string; name: string }>
  >;
}

const AddEditModal: React.FC<AddCustomerModalProps> = ({
  open,
  handleModalAdd,
  formData,
  handleChange,
  handleAddCategory,
  dataEdit,
  setFormData,
}) => {
  useEffect(() => {
    if (dataEdit) {
      setFormData({
        username: dataEdit.username,
        password: "",
        name: dataEdit.name,
      });
    }
  }, [dataEdit, setFormData]);

  const inputFields = useMemo(
    () =>
      ["Name"].map((field) => (
        <Input
          key={field}
          type={field === "Password" ? "password" : "text"}
          label={field}
          name={field.toLowerCase()}
          maxLength={50}
          color="deep-purple"
          style={{ backgroundColor: "#f4f2ff" }}
          crossOrigin="anonymous"
          value={
            formData[field.toLowerCase() as "username" | "password" | "name"]
          }
          onChange={handleChange}
          className="text-purple-800"
        />
      )),
    [formData, handleChange]
  );

  return (
    <Dialog open={open} size="xs" handler={handleModalAdd}>
      <DialogHeader
        className="py-3 px-3 justify-center text-lg  opacity-80"
        style={{ backgroundColor: "#f4f2ff" }}
      >
        <Typography variant="h5">
          {dataEdit ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}
        </Typography>
      </DialogHeader>
      <DialogBody divider className="overflow-auto">
        <div className="w-full flex flex-col justify-center gap-4">
          {inputFields}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          size="sm"
          onClick={handleModalAdd}
          className="flex mr-1 text-sm"
        >
          <span  className="text-lg mr-2">
            <AiOutlineStop />
          </span>
          ยกเลิก
        </Button>
        <Button
          size="sm"
          onClick={handleAddCategory}
          className="text-sm md:w-[100px]"
          style={{ backgroundColor: "#8d80d0" }}
        >
          บันทึก
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddEditModal;
