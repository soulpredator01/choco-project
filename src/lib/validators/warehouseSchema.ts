import { z } from "zod";

export const warehouseSchema = z.object({
    name: z.string({message: 'warehouse name should be a string'}).min(2),
    pincode: z.string({message: "pincode should be a string"}).length(6)
})