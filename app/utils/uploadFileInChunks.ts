import axios from "axios";

async function uploadFileInChunks(file : File) { 
  const chunkSize = 10 * 1024 * 1024; // 10 MB ต่อส่วน
  const totalParts = Math.ceil(file.size / chunkSize);
  const partsArray = [];

  // ขั้นตอนที่ 1: Initiate Upload
  const initiateRes = await axios.post(`${process.env.NEXT_PUBLIC_API}/api/product/upload/initiate`, {
    fileName: file.name,
    fileType: file.type,
  });
  const { uploadId, key } = initiateRes.data;

  // ขั้นตอนที่ 2: Upload Parts
  for (let i = 0; i < totalParts; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);

    const partRes = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/api/product/upload/part?partNumber=${i + 1}&uploadId=${uploadId}&key=${key}`,
      chunk,
      {
        headers: {
          "Content-Type": "application/octet-stream",
        },
      }
    );
    partsArray.push({
      PartNumber: i + 1,
      ETag: partRes.data.ETag,
    });
  }

  // ขั้นตอนที่ 3: Complete Upload
  const completeRes = await axios.post(`${process.env.NEXT_PUBLIC_API}/api/product/upload/complete`, {
    uploadId: uploadId,
    key: key,
    parts: partsArray,
  });
  

  console.log("Upload completed! Location:", completeRes.data);
  return completeRes.data
}

export default uploadFileInChunks