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
  handleAddCustomer: () => void;
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
  handleAddCustomer,
  dataEdit,
  setFormData,
}) => {
  useEffect(() => {
    if (dataEdit) {
      setFormData({
        username: dataEdit.username,
        password: "", // Password should be set by the user explicitly
        name: dataEdit.name,
      });
    }
  }, [dataEdit, setFormData]);

  const inputFields = useMemo(
    () =>
      ["Username", "Password", "Name"].map((field) => (
        <Input
          key={field}
          type={field === "Password" ? "password" : "text"}
          label={field}
          name={field.toLowerCase()}
          maxLength={50}
          color="blue-gray"
          style={{ backgroundColor: "#F4F4F4" }}
          crossOrigin="anonymous"
          value={
            formData[field.toLowerCase() as "username" | "password" | "name"]
          }
          onChange={handleChange}
        />
      )),
    [formData, handleChange]
  );

  return (
    <Dialog open={open} size="xs" handler={handleModalAdd}>
      <DialogHeader className="bg-blue-700 py-3 px-3 justify-center text-lg text-white opacity-80">
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
          className="flex mr-1 text-base"
        >
          <span className="text-xl mr-2">
            <AiOutlineStop />
          </span>
          ยกเลิก
        </Button>
        <Button
          size="sm"
          variant="gradient"
          color="green"
          onClick={handleAddCustomer}
          className="flex text-base mr-1"
        >
          <span className="mr-2 text-xl">
            <FaRegSave />
          </span>
          บันทึก
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddEditModal;
