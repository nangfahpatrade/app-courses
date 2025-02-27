'use client'
import React, { useState } from "react";
import { Card, Button, Input } from "@material-tailwind/react";
import Select from "react-select";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { toast } from "react-toastify";
import RichTextEditor from "./richTextEditor";

interface Category {
  id: number;
  name: string;
}

interface FormData {
  id: number;
  category_id: string;
  image: string | null;
  videoFile: File | null;
  videoUrl: string;
  dec: string;
  title: string;
  lesson: string;
  regularPrice: number;
  discountPrice: number;
  youtube: string
}

interface LearningADDProps {
  categories: Category[];
  onFormSubmit: (formData: FormData, statusEdit: number) => void;
  onResetForm: () => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  statusEdit: number;
  setLearningAdd: (value: number) => void;
}

const LearningADD: React.FC<LearningADDProps> = ({
  categories,
  onFormSubmit,
  onResetForm,
  formData,
  setFormData,
  statusEdit,
  setLearningAdd,
}) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  const handleCategoryChange = (selectedOption: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      category_id: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = 1200;
          canvas.height = 800;
          ctx.drawImage(img, 0, 0, 1200, 800);
          const resizedImage = canvas.toDataURL("image/jpeg");
          setFormData((prevFormData) => ({
            ...prevFormData,
            image: resizedImage,
          }));
        }
      };
      img.onerror = () => {
        toast.error("Invalid image file.");
        event.target.value = ""; // Reset input value
      };
    } else {
      toast.error("Please upload a valid image file.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    onFormSubmit({ ...formData, dec: content }, statusEdit);
  };

  return (
    <div>
      <Card className="flex overflow-auto">
        <form
          className="flex flex-col w-full px-5 mt-5 gap-4"
          onSubmit={handleSubmit}
        >
          <div>
            <Input
              label="สร้างคอร์สเรียน"
              crossOrigin="anonymous"
              color="gray"
              value={formData.title}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  title: e.target.value,
                }))
              }
              style={{ backgroundColor: "#f5f5f5" }}
            />
          </div>
          <div className="flex flex-col gap-2 xl:flex-row md:justify-between">
            <div className="w-full lg:w-1/3 ">
              <Input
                label="ราคาปกติ"
                type="number"
                min={0}
                crossOrigin="anonymous"
                color="gray"
                value={formData?.regularPrice?.toString()}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    regularPrice: parseFloat(e.target.value),
                  }))
                }
                style={{ backgroundColor: "#f5f5f5" }}
              />
            </div>
            <div className="w-full lg:w-1/3 ">
              <Input
                label="ราคาลดแล้ว"
                type="number"
                min={0}
                color="gray"
                crossOrigin="anonymous"
                value={formData.discountPrice?.toString()}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    discountPrice: parseFloat(e.target.value),
                  }))
                }
                style={{ backgroundColor: "#f5f5f5" }}
              />
            </div>
            <div className="w-full lg:w-1/3 flex  justify-center">
              <Select
                options={categories.map((category) => ({
                  value: category.id?.toString(),
                  label: category.name,
                }))}
                onChange={handleCategoryChange}
                value={
                  categories
                    .map((category) => ({
                      value: category.id?.toString(),
                      label: category.name,
                    }))
                    .find((option) => option.value === formData.category_id) ||
                  null
                }
                placeholder="เลือกหมวดหมู่"
                isClearable
                className="z-20 w-full"
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    borderRadius: "8px", // ปรับความมนของกรอบ
                    borderWidth: state.isFocused ? "" : "1px",
                    backgroundColor: "#f4f2ff",
                    borderColor: state.isFocused ? "#673AB7" : "#673AB7", // เปลี่ยนสีขอบเมื่อถูกเลือก
                    boxShadow: state.isFocused
                      ? "0 0 0 1px #673AB7"
                      : provided.boxShadow, // เปลี่ยนสีเงาขอบเมื่อถูกเลือก
                    "&:hover": {
                      borderColor: state.isFocused
                        ? "#673AB7"
                        : provided.borderColor, // เปลี่ยนสีขอบเมื่อ hover
                    },
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: "#673AB7", // เปลี่ยนสีของ placeholder เป็นสีม่วง
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: "#673AB7", // เปลี่ยนสีของตัวเลือกที่ถูกเลือกเป็นสีม่วง
                  }),
                  menu: (provided) => ({
                    ...provided,
                    borderRadius: "8px", // ปรับความมนของเมนู dropdown
                    color: "#673AB7",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                      ? "#8d80d0"
                      : state.isFocused
                      ? "#e6e0f3" // กำหนดสีของพื้นหลังเมื่อ hover
                      : "#ffffff", // สีพื้นหลังปกติ
                    color: state.isSelected ? "#ffffff" : provided.color,
                    "&:hover": {
                      backgroundColor: "#e6e0f3", // กำหนดสีของพื้นหลังเมื่อ hover
                      color: "#673AB7", // สีข้อความเมื่อ hover
                    },
                  }),
                }}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-1/3">
              <Input
                label="Uploadรูปหน้าปก"
                type="file"
                crossOrigin="anonymous"
                accept="image/*"
                color="gray"
                id="imageInput"
                onChange={handleImageUpload}
                style={{ backgroundColor: "#f5f5f5" }}
              />
            </div>
            <div className="w-1/3">
              <Input
                label="Link จาก iframe"
                type="text"
                crossOrigin="anonymous"
                color="gray"
                value={formData.youtube}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  youtube: e.target.value,
                }))
              }
                style={{ backgroundColor: "#f5f5f5" }}
              />
            </div>
          </div>

          <div className=" relative z-10">
            <RichTextEditor
              value={formData.dec}
              onEditorChange={setEditorState}
            />
          </div>
          <div className="flex flex-col gap-3 md:flex-row  mb-3 justify-end">
            <div className="md:w-[100px]">
              <Button
                size="sm"
                className="bg-gray-500 text-sm w-full rounded-lg text-white hover:bg-gray-700 whitespace-nowrap"
                onClick={() => setLearningAdd(0)}
              >
                ออก
              </Button>
            </div>
            <div className="md:w-[100px]">
              <Button
                color="purple"
                variant="outlined"
                size="sm"
                className="w-full text-sm rounded-lg"
                onClick={onResetForm}
              >
                สร้างใหม่
              </Button>
            </div>
            <div className="md:w-[100px]">
              <Button
                size="sm"
                className="w-full text-sm rounded-lg"
                type="submit"
                style={{ backgroundColor: "#8d80d0" }}
              >
                บันทึก
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LearningADD;
