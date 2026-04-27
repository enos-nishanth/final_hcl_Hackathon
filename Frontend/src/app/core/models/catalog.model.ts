export interface CatalogItem {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface CatalogCreateDto {
  name: string;
  description?: string;
}