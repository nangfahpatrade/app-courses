"use client";
import {
  Card,
  Button,
  Input,
  ThemeProvider,
  Textarea,
  Typography,
  IconButton,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Select from "react-select";
import axios from "axios";
import { HeaderAPI } from "@/headerApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useCallback, useRef, useReducer } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { MdDelete, MdEdit, MdOutlineContentPasteSearch } from "react-icons/md";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaClipboardQuestion } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import CryptoJS from "crypto-js";

const MySwal = withReactContent(Swal);

interface Product {
  id: number;
  title: string;
}

interface Chapter {
  id: number;
  title: string;
}

interface Question {
  products_id: number;
  title: string;
  count: string;
}

interface ListData {
  id: number;
  question: string;
  index: number;
}

interface ListData1 {
  id: number;
  image_answer: string;
  image_question: string;
  index: number;
  products_id: number;
  products_title_id: number;
  question: string;
}

interface ResponseData {
  data: Question[];
  totalPages: number;
}

interface ResponseData1 {
  data: ListData1[];
  totalPages: number;
  index: Number;
}

interface ChapterOption extends Chapter {
  value: number;
  label: string;
}

const handleAxiosError = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error) && error.response) {
    toast.error(error.response.data.message || defaultMessage);
  } else {
    toast.error(defaultMessage);
  }
};

const HomeWorkPage: React.FC = () => {
  const initialState = {
    products: [] as Product[],
    chapters: [] as Chapter[],
    statusEdit: 0,
    data: { data: [], totalPages: 1 } as ResponseData,
    dataList: { data: [], totalPages: 1, index: 0 } as ResponseData1,
    searchQuery: "",
    searchList: "",
    hideSearch: true,
    page: 1,
    pageList: 1,
    formData: {
      id: 0,
      product_id: 0,
      questNumber: 0,
      products_title_id: 0,
      question: "",
      questionImage: null as File | null,
      solutionImage: null as File | null,
      questionImageName: "",
      solutionImageName: "",
    },
    formList: {
      product_id: 0,
      count: "",
      title: "",
    },
    selectedCourseTitle: "",
    selectedChapter: null as number | null,
  };

  type State = typeof initialState;

  type Action =
    | { type: "SET_PRODUCTS"; payload: Product[] }
    | { type: "SET_CHAPTERS"; payload: Chapter[] }
    | { type: "SET_STATUS_EDIT"; payload: number }
    | { type: "SET_DATA"; payload: ResponseData }
    | { type: "SET_DATA_LIST"; payload: ResponseData1 }
    | { type: "SET_SEARCH_QUERY"; payload: string }
    | { type: "SET_SEARCH_LIST"; payload: string }
    | { type: "SET_HIDE_SEARCH"; payload: boolean }
    | { type: "SET_PAGE"; payload: number }
    | { type: "SET_PAGE_LIST"; payload: number }
    | { type: "SET_FORM_DATA"; payload: Partial<State["formData"]> }
    | { type: "SET_FORM_LIST"; payload: Partial<State["formList"]> }
    | { type: "SET_SELECTED_COURSE_TITLE"; payload: string }
    | { type: "RESET_FORM" }
    | { type: "RESET_FORM1" }
    | { type: "RESET_FORM_LIST" }
    | { type: "RESET_FORM_DATA" }
    | { type: "RESET_QUESTION" }
    | { type: "RESET_STATUS_EDIT" }
    | { type: "RESET_SELECTED_COURSE_TITLE" }
    | { type: "SET_SELECTED_CHAPTER"; payload: number | null }
    | { type: "RESET_SELECTED_CHAPTER" }
    | { type: "RESET_IMAGES" };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "SET_PRODUCTS":
        return { ...state, products: action.payload };
      case "SET_CHAPTERS":
        return { ...state, chapters: action.payload };
      case "SET_STATUS_EDIT":
        return { ...state, statusEdit: action.payload };
      case "SET_DATA":
        return { ...state, data: action.payload };
      case "SET_DATA_LIST":
        return { ...state, dataList: action.payload };
      case "SET_SEARCH_QUERY":
        return { ...state, searchQuery: action.payload };
      case "SET_SEARCH_LIST":
        return { ...state, searchList: action.payload };
      case "SET_HIDE_SEARCH":
        return { ...state, hideSearch: action.payload };
      case "SET_PAGE":
        return { ...state, page: action.payload };
      case "SET_PAGE_LIST":
        return { ...state, pageList: action.payload };
      case "SET_FORM_DATA":
        return { ...state, formData: { ...state.formData, ...action.payload } };
      case "SET_FORM_LIST":
        return { ...state, formList: { ...state.formList, ...action.payload } };
      case "RESET_FORM_LIST":
        return { ...state, dataList: initialState.dataList };
      case "RESET_FORM_DATA":
        return { ...state, formData: initialState.formData };
      case "SET_SELECTED_COURSE_TITLE":
        return { ...state, selectedCourseTitle: action.payload };
      case "RESET_SELECTED_COURSE_TITLE":
        return { ...state, selectedCourseTitle: "" };
      case "SET_SELECTED_CHAPTER":
        return { ...state, selectedChapter: action.payload };
      case "RESET_SELECTED_CHAPTER":
        return { ...state, selectedChapter: null };
      case "RESET_FORM":
        return {
          ...state,
          formData: initialState.formData,
          hideSearch: true,
          dataList: initialState.dataList,
          selectedChapter: null,
        };
      case "RESET_QUESTION":
        return {
          ...state,
          formData: {
            ...state.formData,
            question: initialState.formData.question,
          },
        };
      case "RESET_STATUS_EDIT":
        return { ...state, statusEdit: 0 };
      case "RESET_IMAGES":
        return {
          ...state,
          formData: {
            ...state.formData,
            questionImage: initialState.formData.questionImage,
            solutionImage: initialState.formData.solutionImage,
          },
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ListData1 | null>(null);
  const [indexQuestion, setIndexQuestion] = useState(0);

  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "your_secret_key";

  const decryptData = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const {
    products,
    chapters,
    statusEdit,
    data,
    dataList,
    searchQuery,
    searchList,
    hideSearch,
    page,
    pageList,
    formData,
    formList,
  } = state;

  const dragItem = useRef<number | null>(null);
  const dragItemOver = useRef<number | null>(null);

  const handleSort = async () => {
    if (dragItem.current !== null && dragItemOver.current !== null) {
      const _dataList = [...dataList.data];
      const draggedItemContent = _dataList.splice(dragItem.current, 1)[0];
      _dataList.splice(dragItemOver.current, 0, draggedItemContent);
      dragItem.current = null;
      dragItemOver.current = null;
      dispatch({
        type: "SET_DATA_LIST",
        payload: { ...dataList, data: _dataList },
      });

      try {
        const data = {
          arrData: _dataList,
          page: pageList,
        };
        console.log(data);
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/question/list/change`,
          data,
          {
            ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
          }
        );

        if (res.status === 200) {
          toast.success(res.data.message);
          fetchList1();
        } else {
          toast.error("Failed to update data");
        }
      } catch (err) {
        const error = err as { response: { data: { message: string } } };
        toast.error(error.response.data.message);
      }
    }
  };

  const fetchProduct = useCallback(async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/product`,
        { full: true },
        {
          ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
        }
      );
      console.log(res.data);
      if (res.status === 200) {
        dispatch({ type: "SET_PRODUCTS", payload: res.data.data });
      } else {
        toast.error("Error fetching products");
      }
    } catch (err) {
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response.data.message);
    }
  }, []);

  const fetchChapters = useCallback(async (id: number) => {
    try {
      console.log(id);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/question/select/courses/${id}`,
        {
          ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
        }
      );
      console.log(res);
      if (res.status === 200) {
        dispatch({ type: "SET_CHAPTERS", payload: res.data.data });
      } else {
        toast.error("Error fetching chapters");
      }
    } catch (err) {
      const error = err as { response: { data: { message: string } } };
      toast.error(error.response.data.message);
    }
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const [select1, setSelect1] = useState<any>(null);

  const handleCategoryChange = (selectedOption: any) => {
    const selectedProductId = selectedOption?.value || 0;
    dispatch({
      type: "SET_FORM_DATA",
      payload: { product_id: selectedProductId },
    });
    dispatch({ type: "RESET_SELECTED_COURSE_TITLE" });
    dispatch({ type: "RESET_FORM_LIST" });
    dispatch({ type: "RESET_SELECTED_CHAPTER" });
    setSelect1(null);
    setSelect2(null);
    // fetchCheckNum(selectedProductId);
    fetchChapters(selectedProductId);
    setSelect1(selectedOption);
  };

  const [select2, setSelect2] = useState<any>(null);

  const handleChapterChange = (selectedOption: any) => {
    console.log(selectedOption);
    const selectedChapterId = selectedOption?.value || null;
    dispatch({
      type: "SET_SELECTED_CHAPTER",
      payload: selectedChapterId,
    });
    dispatch({
      type: "SET_FORM_DATA",
      payload: { products_title_id: selectedChapterId },
    });
    setSelect2(selectedOption);
    handleSendList();
  };

  const convertFileToBase64 = (file: File | null): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve("");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async () => {
    const questionImageBase64 = formData.questionImage
      ? await convertFileToBase64(formData.questionImage)
      : formData.questionImageName;
    const solutionImageBase64 = formData.solutionImage
      ? await convertFileToBase64(formData.solutionImage)
      : formData.solutionImageName;

    const data = {
      id: formData.id,
      index: dataList?.index || formData?.questNumber,
      products_id: formData.product_id,
      products_title_id: formData.products_title_id,
      question: formData.question,
      image_question: questionImageBase64,
      image_answer: solutionImageBase64,
      // new_question_id : null || id 
    };

    try {
      console.log(data);
      const res =
        statusEdit === 0
          ? await axios.post(
              `${process.env.NEXT_PUBLIC_API}/api/question/add`,
              data,
              {
                ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
              }
            )
          : await axios.put(
              `${process.env.NEXT_PUBLIC_API}/api/question/list`,
              data,
              {
                ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
              }
            );
      console.log(res.data);
      if (res.status === 200) {
        toast.success(res.data.message);
        if (statusEdit === 0) {
          // โหมดสร้างใหม่
          fetchQuestion();
          fetchList1();
          dispatch({ type: "RESET_QUESTION" });
          // dispatch({ type: "RESET_FORM" });
          // dispatch({ type: "RESET_SELECTED_COURSE_TITLE" });
          const questionImage = document.getElementById(
            "questionImage"
          ) as HTMLInputElement;
          const solutionImage = document.getElementById(
            "solutionImage"
          ) as HTMLInputElement;

          if (questionImage) {
            questionImage.value = "";
          }

          if (solutionImage) {
            solutionImage.value = "";
          }
          dispatch({ type: "RESET_IMAGES" }); // รีเซ็ตค่า questionImage และ solutionImage
        } else {
          // โหมดแก้ไข
          fetchQuestion();
          // dispatch({ type: "RESET_FORM" });
          // dispatch({ type: "RESET_SELECTED_COURSE_TITLE" });
          fetchList1();
          // dispatch({ type: "RESET_STATUS_EDIT" });
          const questionImage = document.getElementById(
            "questionImage"
          ) as HTMLInputElement;
          const solutionImage = document.getElementById(
            "solutionImage"
          ) as HTMLInputElement;

          if (questionImage) {
            questionImage.value = "";
          }

          if (solutionImage) {
            solutionImage.value = "";
          }
        }
      } else {
        toast.error("Form submission failed!");
      }
    } catch (err) {
      console.log(err);
      const error = err as { response: { data: string } };
      toast.error(error?.response?.data);
    }
  };

  const fetchQuestion = useCallback(async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/question`,
        { search: searchQuery, page, full: false },
        {
          ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
        }
      );
      if (res.status === 200) {
        dispatch({ type: "SET_DATA", payload: res.data });
      } else {
        toast.error("Error fetching questions");
      }
    } catch (err) {
      handleAxiosError(err, "Form submission failed");
    }
  }, [page, searchQuery]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion, page]);

  const fetchList1 = useCallback(async () => {
    const requestData = {
      products_id: select1?.value,
      products_title_id: select2?.value,
      page: pageList,
      search: searchList,
      full: false,
    };
    // console.log(requestData);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/question/list`,
        requestData,
        {
          ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
        }
      );
      console.log(res.data);
      if (res.status === 200) {
        dispatch({ type: "SET_DATA_LIST", payload: res.data });
        dispatch({ type: "SET_HIDE_SEARCH", payload: false });
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.error(error);
      toast.error("error");
    }
  }, [pageList, select1, select2, searchList]);

  useEffect(() => {
    if (select1 && select2) {
      fetchList1();
    }
  }, [pageList, fetchList1, select1, select2, searchList]);

  const handleSendList = async () => {
    dispatch({ type: "SET_SELECTED_COURSE_TITLE", payload: select1 });
    dispatch({ type: "SET_PAGE_LIST", payload: 1 });
    await fetchList1();
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
    dispatch({ type: "RESET_STATUS_EDIT" });
    dispatch({ type: "RESET_SELECTED_COURSE_TITLE" });
    dispatch({ type: "RESET_SELECTED_CHAPTER" });
    setSelect1(null);
    setSelect2(null);
    setIndexQuestion(0);

    const questionImage = document.getElementById(
      "questionImage"
    ) as HTMLInputElement;
    const solutionImage = document.getElementById(
      "solutionImage"
    ) as HTMLInputElement;

    if (questionImage) {
      questionImage.value = "";
    }

    if (solutionImage) {
      solutionImage.value = "";
    }
  };

  const handleEdit = (data: any) => {
    setIndexQuestion(data?.index);
    dispatch({
      type: "SET_FORM_DATA",
      payload: {
        id: data.id,
        question: data.question,
        product_id: select1?.value,
        products_title_id: select2?.value,
        questionImage: null,
        solutionImage: null,
        questionImageName: data.image_question,
        solutionImageName: data.image_answer,
      },
    });
    dispatch({ type: "SET_STATUS_EDIT", payload: 1 });
  };

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "คุณจะไม่สามารถย้อนกลับได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8d80d0",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่, ลบเลย!",
      cancelButtonText: "ยกเลิก",
      background: "#f9f9f9",
      width: "350px",
      padding: "1em",
      backdrop: `
        rgba(0,0,0,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log(id);
          const res = await axios.delete(
            `${process.env.NEXT_PUBLIC_API}/api/question/list/${id}`,
            {
              ...HeaderAPI(decryptData(localStorage.getItem("Token") || "")),
            }
          );
          if (res.status === 200) {
            fetchList1();
            Swal.fire({
              text: "ข้อมูลของคุณถูกลบแล้ว.",
              icon: "success",
              width: "400px",
              background: "#f9f9f9",
              timer: 1000,
              timerProgressBar: true,
              backdrop: `
              rgba(0,0,0,0.4)
              url("/images/nyan-cat.gif")
              left top
              no-repeat
            `,
            });
          } else {
            toast.error("เกิดข้อผิดพลาด");
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const handleModal = (item: ListData1) => {
    console.log(item);
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-3 overflow-auto container mx-auto py-4">
      <ToastContainer autoClose={2000} theme="colored" />
      <div className="w-full lg:w-5/12">
        <div className="flex flex-col gap-3">
          <Card className="flex shadow-none overflow-auto p-3">
            <div className="flex flex-col gap-5  w-full justify-center lg:justify-start">
              <div className="flex flex-col sm:flex-row gap-5 lg:gap-20 items-center justify-center">
                <div className="flex items-center gap-3 whitespace-nowrap text-center ">
                  <div className="text-xl">
                    <FaClipboardQuestion />
                  </div>
                  <Typography className="font-semibold">
                    {statusEdit === 0 ? "สร้างการบ้านใหม่" : "แก้ไขการบ้าน"}
                  </Typography>
                </div>

                <div className="w-full ">
                  <Typography className="font-semibold">
                    หัวข้อที่ :{" "}
                    {indexQuestion || dataList?.index.toLocaleString()}
                  </Typography>
                </div>
              </div>
              <div className="flex w-full flex-col justify-between sm:flex-row gap-3 ">
                <div className="w-full lg:w-6/12 ">
                  {/* <Select
                      options={products.map((product) => ({
                        value: product.id,
                        label: product.title,
                      }))}
                      onChange={handleCategoryChange}
                      value={
                        products
                          .map((product) => ({
                            value: product.id,
                            label: product.title,
                          }))
                          .find(
                            (option) => option.value === formData.product_id
                          ) || null
                      }
                      placeholder="เลือกคอร์ดเรียน"
                      isClearable
                      isDisabled={statusEdit === 1}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          borderRadius: "8px",
                        }),
                        menu: (provided) => ({
                          ...provided,
                          borderRadius: "8px",
                          zIndex: 9999, // เพิ่ม zIndex ให้กับเมนู
                        }),
                        menuList: (provided) => ({
                          ...provided,
                          maxHeight:
                            window.innerWidth < 1524
                              ? "150px"
                              : window.innerWidth < 1650
                              ? "165px"
                              : "150px",
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          borderRadius: state.isFocused ? "8px" : "0px",
                        }),
                      }}
                    /> */}
                  <Select
                    options={products.map((product) => ({
                      value: product.id,
                      label: product.title,
                    }))}
                    onChange={handleCategoryChange}
                    value={
                      products
                        .map((product) => ({
                          value: product.id,
                          label: product.title,
                        }))
                        .find(
                          (option) => option.value === formData.product_id
                        ) || null
                    }
                    placeholder="เลือกคอร์ดเรียน"
                    isClearable
                    isDisabled={statusEdit === 1}
                    menuPortalTarget={document.body} // เพิ่มบรรทัดนี้
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
                <div className="w-full lg:w-6/12">
                  <Select
                    options={chapters?.map((chapter) => ({
                      value: chapter.id,
                      label: chapter.title,
                    }))}
                    onChange={handleChapterChange}
                    value={
                      chapters
                        ?.map((chapter) => ({
                          value: chapter.id,
                          label: chapter.title,
                        }))
                        .find(
                          (option) => option.value === state.selectedChapter
                        ) || null
                    }
                    placeholder="เลือกบทที่"
                    isClearable
                    isDisabled={statusEdit === 1}
                    menuPortalTarget={document.body}
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
            </div>
          </Card>
          <Card className="flex shadow-none overflow-auto p-3 py-5">
            <div className="flex flex-col gap-5  w-full justify-center lg:justify-start">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full ">
                  <Input
                    type="file"
                    label="รูปคำถาม"
                    id="questionImage"
                    color="gray"
                    onChange={(e) =>
                      dispatch({
                        type: "SET_FORM_DATA",
                        payload: { questionImage: e.target.files?.[0] || null },
                      })
                    }
                    crossOrigin="anonymous"
                    style={{ backgroundColor: "#f5f5f5" }}
                  />
                </div>
                <div className="w-full ">
                  <Input
                    type="file"
                    label="รูปเฉลย"
                    id="solutionImage"
                    color="gray"
                    onChange={(e) =>
                      dispatch({
                        type: "SET_FORM_DATA",
                        payload: { solutionImage: e.target.files?.[0] || null },
                      })
                    }
                    crossOrigin="anonymous"
                    style={{ backgroundColor: "#f5f5f5" }}
                  />
                </div>
              </div>
              <div className="w-full gap-3">
                <Textarea
                  label="สร้างคำถาม"
                  color="gray"
                  className="h-[306px]"
                  value={formData.question}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FORM_DATA",
                      payload: { question: e.target.value },
                    })
                  }
                  style={{ backgroundColor: "#f5f5f5" }}
                />
              </div>

              <div className="w-full flex flex-col sm:flex-row justify-end gap-3">
                <div className="md:w-[100px]">
                  <Button
                    color="purple"
                    variant="outlined"
                    size="sm"
                    className="w-full"
                    onClick={resetForm}
                  >
                    สร้างใหม่
                  </Button>
                </div>
                <div className="md:w-[100px]">
                  <Button
                    color="purple"
                    size="sm"
                    className="w-full"
                    onClick={handleSubmit}
                    style={{ backgroundColor: "#8d80d0" }}
                  >
                    {statusEdit === 0 ? "บันทึก" : "อัพเดท"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="w-full lg:w-7/12">
        <Card className="flex overflow-auto">
          <div className="w-full justify-center py-5 items-center p-3">
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <Input
                  label="ค้นหาคำถาม"
                  crossOrigin="anonymous"
                  color="gray"
                  disabled={hideSearch}
                  icon={<FaSearch className=" text-deep-purple-300" />}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_SEARCH_LIST",
                      payload: e.target.value,
                    })
                  }
                  onClick={() =>
                    dispatch({ type: "SET_PAGE_LIST", payload: 1 })
                  }
                  style={{ backgroundColor: "#f5f5f5" }}
                />
              </div>
              <div className="flex flex-col gap-1 ps-5">
                <div>
                  <Typography className="font-bold">
                    คอร์สเรียน : <span>{select1?.label}</span>
                  </Typography>
                </div>
                <div>
                  <Typography className="font-bold">
                    บทเรียน : <span>{select2?.label}</span>
                  </Typography>
                </div>
              </div>
            </div>

            <div className="overflow-auto lg:h-[100%]">
              <table className="w-full min-w-max mt-2 ">
                <thead>
                  <tr>
                    <th className="border-b   p-4 w-1 whitespace-nowrap">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className=" text-sm leading-none opacity-70 "
                      >
                        ลำดับ
                      </Typography>
                    </th>
                    {/* <th className="border-b  p-4 w-1 whitespace-nowrap">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className=" text-sm leading-none opacity-70 "
                      >
                        id
                      </Typography>
                    </th> */}
                    <th className="border-b  p-4 whitespace-nowrap">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className=" leading-none opacity-70 text-sm"
                      >
                        คำถาม
                      </Typography>
                    </th>
                    <th className="border-b  p-4 w-1 whitespace-nowrap">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className=" leading-none opacity-70"
                      >
                        ดู/แก้ไข/ลบ
                      </Typography>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataList.data.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center pt-5">
                        <Typography>...ไม่พบข้อมูล...</Typography>
                      </td>
                    </tr>
                  ) : (
                    dataList.data.map((item, index) => (
                      <tr
                        key={index}
                        style={{ marginTop: "3px" }}
                        // draggable
                        // onDragStart={() => (dragItem.current = index)}
                        // onDragEnter={() => (dragItemOver.current = index)}
                        // onDragEnd={handleSort}
                        // onDragOver={(e) => e.preventDefault()}
                        className="hover:bg-purple-100/20"
                      >
                        <td className="py-2 border-b">
                          <div className="flex items-center justify-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className=" text-xs "
                            >
                              {index+1}
                            </Typography>
                          </div>
                        </td>
                        {/* <td className="py-2 border-b">
                          <div className="flex items-center justify-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className=" text-xs"
                            >
                              {item?.id}
                            </Typography>
                          </div>
                        </td> */}
                        <td className="border-b">
                          <div className="relative flex items-center justify-center mt-2 tooltip">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className=" text-xs ps-4 overflow-hidden text-ellipsis whitespace-nowrap max-w-[190px]"
                            >
                              {item.question}
                            </Typography>
                            <div className="tooltip-text text-sm">
                              {item.question}
                            </div>
                          </div>
                        </td>
                        <td className="border-b">
                          <div className="flex justify-center mt-2 gap-2">
                            <MdOutlineContentPasteSearch
                              className="h-5 w-5 text-purple-500 cursor-pointer"
                              onClick={() => handleModal(item)}
                            />

                            <MdEdit
                              className="h-5 w-5 text-purple-500 cursor-pointer"
                              onClick={() => handleEdit(item)}
                            />

                            <MdDelete
                              className="h-5 w-5 text-purple-500 last:cursor-pointer"
                              onClick={() => handleDelete(item.id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <div className="flex justify-between gap-2 mt-6 px-2 items-center ">
                <Typography className="text-red-800 ">หมายเหตุ</Typography>
                <div className="flex items-center gap-2">
                  <button
                    className={` text-gray-400 text-2xl whitespace-nowrap rounded-md border border-gray-300 shadow-md ${
                      pageList == 1 ? "" : "hover:text-black"
                    } `}
                    disabled={pageList === 1}
                    onClick={() =>
                      dispatch({
                        type: "SET_PAGE_LIST",
                        payload: Math.max(pageList - 1, 1),
                      })
                    }
                  >
                    <IoIosArrowBack />
                  </button>
                  <span style={{ whiteSpace: "nowrap" }} className="text-sm">
                    หน้าที่ {pageList} / {dataList.totalPages || 1}
                  </span>
                  <button
                    className={`text-gray-400 text-2xl whitespace-nowrap rounded-md border border-gray-300 shadow-md ${
                      Number(data?.totalPages) - Number(pageList) < 0
                        ? ""
                        : "hover:text-black"
                    }`}
                    disabled={pageList >= (dataList.totalPages || 1)}
                    onClick={() =>
                      dispatch({
                        type: "SET_PAGE_LIST",
                        payload: pageList + 1,
                      })
                    }
                  >
                    <IoIosArrowForward />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Dialog
        open={isModalOpen}
        handler={setIsModalOpen}
        className="bg-gray-200"
      >
        <DialogBody divider>
          <div className="flex w-full h-[400px]  gap-3">
            <div className="w-1/2">
              <Card className="p-4 w-full h-full items-center overflow-auto">
                <Typography>คำถาม</Typography>
                <div className="flex w-full h-auto mt-2 ">
                  {selectedItem?.image_question &&
                    selectedItem.image_question !== "" && (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${selectedItem.image_question}`}
                        alt="Question"
                        width={500}
                        height={500}
                        className="flex w-full object-cover"
                      />
                    )}
                </div>
              </Card>
            </div>
            <div className="w-1/2">
              <Card className="p-4 w-full h-full items-center overflow-auto">
                <Typography>เฉลย</Typography>
                <div className="flex w-full h-auto mt-2 ">
                  {selectedItem?.image_answer &&
                    selectedItem.image_answer !== "" && (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${selectedItem.image_answer}`}
                        alt="Answer"
                        width={500}
                        height={500}
                        className="flex w-full object-cover"
                      />
                    )}
                </div>
              </Card>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            // variant="text"
            size="sm"
            color="red"
            onClick={() => setIsModalOpen(false)}
            className="mr-1 text-sm"
          >
            <span>ปิด</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default HomeWorkPage;
