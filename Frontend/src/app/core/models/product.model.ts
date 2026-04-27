export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stockQuantity: number;
  imageUrl?: string;
  isActive: boolean;
  brandName: string;
  categoryName: string;
  packagingTypeName: string;
  brandId: number;
  categoryId: number;
  packagingTypeId: number;
}

export interface ProductCreateDto {
  name: string;
  description?: string;
  price: number;
  stockQuantity: number;
  imageUrl?: string;
  brandId: number;
  categoryId: number;
  packagingTypeId: number;
}