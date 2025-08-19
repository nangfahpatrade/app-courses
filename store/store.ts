

import { atom } from 'recoil';

interface Course {
  title: string;
  dec: string;
  image: string;
  price: number;
  price_sale: number;
  id:any
}


export const BuyCourseStore = atom<Course | null>({
  key: 'bycourseKey',
  default: null,
});

export const userIdState = atom<string | null>({
  key: 'userIdState',
  default: null,
});

// สร้าง atom สำหรับ number
export const numberState = atom<string | null>({
  key: 'numberState',
  default: null,
});
