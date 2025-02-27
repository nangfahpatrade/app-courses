import { Button, Dialog, DialogBody, DialogFooter } from '@material-tailwind/react';
import Image from 'next/image';
import React from 'react'

interface ModalImageProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalData: { image: string };
  }

const ModalImage: React.FC<ModalImageProps> = ({isModalOpen,
    setIsModalOpen,
    modalData,}) => {
  return (
    <div>
      <Dialog
        open={isModalOpen}
        handler={setIsModalOpen}
        className="bg-gray-200 "
        size="sm"
      >
        <DialogBody divider>
          {modalData.image && (
            <div className="w-full flex justify-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${modalData.image}`}
                alt=""
                width={400}
                height={400}
                className=" rounded-md"
              />
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
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
  )
}

export default ModalImage