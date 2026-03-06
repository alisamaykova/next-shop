import { call } from "./call";

import type { Product } from "@/shared/types/Product";

export const getProductById = async (documentId: string) => {
  return await call<{ data: Product }>({
    endpoint: `/products/${documentId}`,
    method: "GET",
    params: {
      populate: ["images", "productCategory"],
    },
    withAuth: false,
  });
};
