// Admin types
export type EditingCategory = {
  isNew: boolean;
  id?: number;
  name?: string;
  slug?: string;
  description?: string;
  sortOrder?: number;
  imageUrl?: string;
};

export type EditingProduct = {
  isNew: boolean;
  id?: number;
  name?: string;
  slug?: string;
  material?: string;
  shortDesc?: string;
  description?: string;
  categoryId?: number | string;
  imageUrl?: string;
  sizes?: Array<{ id?: number; productId?: number; label?: string; priceMin?: string; priceMax?: string; moq?: number; inStock?: boolean }>;
};

// Search result type
export type SearchResultProduct = {
  id: number;
  slug: string;
  name: string;
  categoryName: string;
  priceMin: number | null;
  imageUrl: string | null;
};

// Category display type
export type CategoryDisplay = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  _count: {
    products: number;
  };
};
