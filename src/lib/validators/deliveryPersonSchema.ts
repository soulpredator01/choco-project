import { z } from "zod";

export const deliveryPersonSchema = z.object({
  name: z.string({ message: "Delivery Person name should be a string" }).min(4),
  phone: z
    .string({ message: "phone should be a string" })
    .length(13, "Phone Number should be include +91"),
  warehouseId: z.number({message: 'warehouse id should be a number'}).min(1)
});
