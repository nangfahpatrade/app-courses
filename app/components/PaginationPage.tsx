import React from 'react'

interface PaginationProps {
    Pagination: (pageNumber: number) => void;
    pageStart : number;
    pageEnd : number;

  }

const PaginationPage : React.FC<PaginationProps> = ({Pagination, pageStart, pageEnd }) => {
  return (
    <div className="text-gray-700 mt-2 flex flex-row gap-2 justify-center items-center">
    <button
      onClick={() => Pagination(1)}
      className=" bg-white shadow-md border border-gray-100 hover:bg-gray-100 px-4 py-1 rounded-lg text-sm"
    >
      ก่อนหน้า
    </button>
    <p className='text-sm text-gray-700'>
      หน้า {pageStart} / {pageEnd}
    </p>
    <button
      onClick={() => Pagination(2)}
      className="bg-white shadow-md border border-gray-100 hover:bg-gray-100 px-4 py-1 rounded-lg text-sm"
    >
      ถัดไป
    </button>
  </div>
  )
}

export default PaginationPage