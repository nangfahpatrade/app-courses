import { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
  Typography,
  Select,
  Option,
  Card,
  CardBody,
  Textarea,
} from "@material-tailwind/react";
import { AiOutlineStop } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Image from "next/image";

interface ReviewFormData {
  id: number;
  title: string;
  image_title: string;
  dec: string;
  coverFile: File | null;
  albumFiles: File[];
  type: number;
}

interface ReviewImage {
  id: number;
  image: string;
}

interface AddEditModalReviewProps {
  open: boolean;
  handleModalAdd: () => void;
  formData: ReviewFormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  handleAddReview: () => void;
  dataEdit: ReviewFormData | null;
  setFormData: React.Dispatch<React.SetStateAction<ReviewFormData>>;
  setCoverFile: React.Dispatch<React.SetStateAction<File | null>>;
  coverFile: File | null;
  setAlbumFiles: React.Dispatch<React.SetStateAction<File[]>>;
  albumFiles: File[];
  initialReviewImages: ReviewImage[];
  handleRemoveImage: (
    index: number,
    imageId: number | null,
    imageName: string | null
  ) => void;
}

const AddEditModalReview: React.FC<AddEditModalReviewProps> = ({
  open,
  handleModalAdd,
  formData,
  handleChange,
  handleAddReview,
  dataEdit,
  setFormData,
  setCoverFile,
  setAlbumFiles,
  initialReviewImages,
  handleRemoveImage,
}) => {
  const [reviewImages, setReviewImages] =
    useState<ReviewImage[]>(initialReviewImages);

  useEffect(() => {
    // รีเซ็ตค่าของ formData, coverFile, และ albumFiles ก่อน
    setFormData({
      id: 0,
      title: "",
      image_title: "",
      dec: "",
      coverFile: null,
      albumFiles: [],
      type: 0,
    });
    setCoverFile(null);
    setAlbumFiles([]);
    setReviewImages([]);

    if (dataEdit) {
      setFormData({
        id: dataEdit.id,
        title: dataEdit.title,
        image_title: dataEdit.image_title,
        dec: dataEdit.dec,
        coverFile: null,
        albumFiles: [],
        type: dataEdit.type,
      });
      setReviewImages(initialReviewImages);
    }
  }, [dataEdit, setFormData, setCoverFile, setAlbumFiles, initialReviewImages]);

  const handleSelectChange = (name: string, value: string | undefined) => {
    if (value !== undefined) {
      handleChange({
        target: {
          name,
          value,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCoverFile(e.target.files[0]);
    }
  };

  const handleAlbumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAlbumFiles((prevFiles) => [...prevFiles, ...newFiles]);
      const newImages = newFiles.map((file) => ({
        id: 0,
        image: URL.createObjectURL(file),
      }));
      setReviewImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleRemoveImageWrapper = (index: number) => {
    const image = reviewImages[index];
    const imageId = image.id;
    const imageName = image.image; // Assuming 'image' is the name here
    handleRemoveImage(index, imageId !== 0 ? imageId : null, imageName);
  };

  const handleSave = async () => {
    await handleAddReview();
    setReviewImages([]);
    setAlbumFiles([]);
  };

  return (
    <Dialog
      open={open}
      size={dataEdit ? "xl" : "lg"}
      handler={handleModalAdd}
      className="h-auto"
    >
      <DialogHeader
        className="py-3 px-3 justify-center text-lg  opacity-80"
        style={{ backgroundColor: "#f4f2ff" }}
      >
        <Typography variant="h5">
          {dataEdit ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}
        </Typography>
      </DialogHeader>
      <DialogBody divider className="overflow-auto">


        <div className={`flex flex-col md:flex-row gap-4`}>
          <section className={`${dataEdit ? "w-full md:w-7/12" : "w-full"}  `}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-2/3">
                <label htmlFor="" className="text-xs">หัวข้อ</label>
                <Input
                  name="title"
                  value={formData?.title}
                  onChange={handleChange}
                  label="หัวข้อ"
                  color="deep-purple"
                  style={{ backgroundColor: "#f4f2ff" }}
                  crossOrigin
                />
              </div>
              <div className="w-full md:w-1/3">
                <label htmlFor="" className="text-xs">ประเภท</label>
                <Select
                  name="type"
                  label="เลือกประเภท"
                  color="deep-purple"
                  style={{ backgroundColor: "#f4f2ff" }}
                  value={formData.type?.toString() || "0"}
                  onChange={(value) => handleSelectChange("type", value)}
                >
                  <Option value="0" className="custom-option">สัมมนา</Option>
                  <Option value="1" className="custom-option">รีวิว</Option>
                </Select>
              </div>
            </div>

            <div className="mt-1">
              <label htmlFor="" className="text-xs">รายละเอียด</label>
              <Textarea
                name="dec"
                value={formData.dec}
                onChange={handleChange}
                label="รายละเอียด"
                color="deep-purple"
                style={{ backgroundColor: "#f4f2ff" }}


              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-2">
              <div className="w-full">
                <label htmlFor="" className="text-xs">รูปหน้าปก ได้ 1 รูป</label>
                <Input
                  type="file"
                  onChange={handleCoverChange}
                  label="เลือกรูปปก"
                  color="deep-purple"
                  style={{ backgroundColor: "#f4f2ff" }}
                  crossOrigin
                />
              </div>
              <div className="w-full">
                <label htmlFor="" className="text-xs">รูปในอัลบั้ม ได้หลายรูป</label>
                <Input
                  type="file"
                  multiple
                  label="เลือกอัลบั้ม"
                  color="deep-purple"
                  style={{ backgroundColor: "#f4f2ff" }}
                  onChange={handleAlbumChange}
                  crossOrigin
                />
              </div>
            </div>
          </section>

          {dataEdit && (
            <section className={`${dataEdit ? "w-full md:w-5/12" : "w-full"} `}>
              <div className="w-full  h-[400px] flex flex-col gap-4 overflow-auto p-4 border border-gray-300 rounded-md shadow-sm">
                <Typography variant="h6" className="text-center">
                  {formData.type == 1 ? "ภาพรีวิว" : "ภาพสัมมนา"}
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4 ">
                  {reviewImages?.map((imageObj, index) => (
                    <Card key={index} className="shadow-lg relative ">
                      <CardBody className="p-2">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${imageObj.image}`}
                          alt={`Review Image ${index + 1}`}
                          width={400}
                          height={400}
                          className="rounded-md object-cover"
                        />
                        <button
                          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-200"
                          onClick={() => handleRemoveImageWrapper(index)}
                        >
                          <MdDelete size={24} color="red" />
                        </button>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          )}
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
          <span className="text-lg mr-2">
            <AiOutlineStop />
          </span>
          ยกเลิก
        </Button>
        <Button
          size="sm"
          onClick={handleSave}
          className="text-sm  md:w-[100px]"
          style={{ backgroundColor: "#8d80d0" }}
        >

          บันทึก
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddEditModalReview;
