export interface CategoryResponse {
  message: string;
  count: number;
  categories: Category[];
}

export interface Category {
  _id: string;
  name: string;
  image: string;
  subcategories: Subcategory[];
  subcategoryCount: number;
}

export interface Subcategory {
  _id: string;
  name: string;
  category: Category2;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Category2 {
  _id: string;
  name: string;
}