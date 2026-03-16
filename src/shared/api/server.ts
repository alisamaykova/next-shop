const API_URL = "https://front-school-strapi.ktsdev.ru/api";

export async function fetchProducts(
  page: number = 1,
  pageSize: number = 9,
  search: string = "",
  categories: string[] = [],
  minPrice?: number | null,
  maxPrice?: number | null,
  minRating?: number | null,
) {
  const params = new URLSearchParams();

  params.append("populate[0]", "images");
  params.append("populate[1]", "productCategory");
  params.append("pagination[page]", page.toString());
  params.append("pagination[pageSize]", pageSize.toString());

  if (search) {
    params.append("filters[title][$containsi]", search);
  }

  if (categories.length > 0) {
    categories.forEach((cat, index) => {
      params.append(`filters[productCategory][id][$in][${index}]`, cat);
    });
  }

  if (minPrice !== undefined && minPrice !== null) {
    params.append("filters[price][$gte]", minPrice.toString());
  }
  if (maxPrice !== undefined && maxPrice !== null) {
    params.append("filters[price][$lte]", maxPrice.toString());
  }
  if (minRating !== undefined && minRating !== null) {
    params.append("filters[rating][$gte]", minRating.toString());
  }

  const url = `${API_URL}/products?${params.toString()}`;
  console.log("Fetching URL:", url);

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  return res.json();
}
export async function fetchCategories() {
  const res = await fetch(`${API_URL}/product-categories`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status}`);
  }

  const data = await res.json();
  return data.data.map((cat: any) => ({
    key: String(cat.id),
    value: cat.title,
  }));
}

export async function fetchProductById(documentId: string) {
  const params = new URLSearchParams();
  params.append("populate[0]", "images");
  params.append("populate[1]", "productCategory");

  const res = await fetch(`${API_URL}/products/${documentId}?${params}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status}`);
  }

  const data = await res.json();
  return data.data;
}

export async function fetchProductsByCategory(
  categoryId: number,
  excludeProductId?: number,
  limit: number = 3,
) {
  const params = new URLSearchParams();

  params.append("populate[0]", "images");
  params.append("populate[1]", "productCategory");
  params.append("filters[productCategory][id][$eq]", categoryId.toString());
  params.append("pagination[pageSize]", limit.toString());

  if (excludeProductId) {
    params.append("filters[id][$ne]", excludeProductId.toString());
  }

  const res = await fetch(`${API_URL}/products?${params}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch related products: ${res.status}`);
  }

  const data = await res.json();
  return data.data;
}
