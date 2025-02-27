// import {
//     Dialog,
//     DialogHeader,
//     DialogBody,
//     DialogFooter,
//     Button,
//     Typography,
//     Card,
//     CardBody,
//   } from "@material-tailwind/react";
//   import { AiOutlineStop } from "react-icons/ai";
//   import { FaExclamationTriangle } from "react-icons/fa"; // เพิ่มไอคอนที่ต้องการใช้
//   import Image from "next/image";
  
//   interface AddEditModalReviewProps {
//     open: boolean;
//     handleModal: () => void;
//     image: string;
//   }
  
//   const ModalOrder: React.FC<AddEditModalReviewProps> = ({
//     open,
//     handleModal,
//     image,
//   }) => {
//     return (
//       <Dialog open={open} handler={handleModal}>
//         <DialogHeader
//           className="py-3 px-3 justify-center text-lg opacity-80"
//           style={{ backgroundColor: "#f4f2ff" }}
//         >
//           <Typography variant="h5">ดูข้อมูล</Typography>
//         </DialogHeader>
//         <DialogBody divider className="overflow-auto ">
//           <div>
//             <Card className="shadow-lg relative flex justify-center items-center">
//               <CardBody className="flex flex-col items-center justify-center gap-4">
//                 {image ? (
//                   <Image
//                     src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${image}`}
//                     alt={`ไม่มีใบเสร็จ`}
//                     width={500}
//                     height={500}
//                     className="rounded-md object-contain max-w-full h-auto"
//                   />
//                 ) : (
//                   <div className="flex flex-col items-center gap-2 2xl:gap-5">
//                     <FaExclamationTriangle className="text-red-500 text-5xl 2xl:text-[400px]" />
//                     <Typography className="text-center text-red-500  2xl:text-[50px] text-lg font-semibold">
//                       ยังไม่ชำระ
//                     </Typography>
//                   </div>
//                 )}
//               </CardBody>
//             </Card>
//           </div>
//         </DialogBody>
//         <DialogFooter>
//           <Button
//             color="red"
//             size="sm"
//             onClick={handleModal}
//             className="flex mr-1 text-sm"
//           >
//             <span className="text-lg mr-2">
//               <AiOutlineStop />
//             </span>
//             ยกเลิก
//           </Button>
//         </DialogFooter>
//       </Dialog>
//     );
//   };
  
//   export default ModalOrder;
  