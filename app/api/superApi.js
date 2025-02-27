import axios from "axios";

export const getCustomer = async (id, searchQuery) => {
  try {
    // let token = localStorage.getItem("Token")
    const data = {
      id: searchQuery || null,
      page: 1,
      status: 1,
    };
    console.log(data);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/api/admin`,
      data
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addCustomer = async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/api/login/register`,
      data,
      {
        ...HeaderAPI(localStorage.getItem("Token")),
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editCustomer = async (data) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_APP_API}/api/login/register`,
      data,
      {
        ...HeaderAPI(localStorage.getItem("Token")),
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCustomer = async (id) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_API}/api/login/register/${id}`,
      {
        ...HeaderAPI(localStorage.getItem("Token")),
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
