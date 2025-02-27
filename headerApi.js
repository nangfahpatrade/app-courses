export const HeaderAPI = (Token) => {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    };
  };

export const HeaderMultiAPI = (Token) => {
    return {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${Token}`,
      },
    };
  };
  