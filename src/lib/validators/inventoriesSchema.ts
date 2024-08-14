import { z } from "zod";

export const inventoriesSchema = z.object({
    sku: z.string({message: "SKU should be a string"}).length(8, "SKU should be a 8 char long"),
    warehouseId: z.number({message: "Warehouse Id should be a number"}),
    productId: z.number({message: "Product Id should be a number"}),
})