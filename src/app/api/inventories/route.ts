import { db } from "@/lib/db/db";
import { inventories, products, warehouses } from "@/lib/db/schema";
import { inventoriesSchema } from "@/lib/validators/inventoriesSchema";
import { desc, eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    
    const data = await request.json();

    let validateData;

    try {
        validateData = await inventoriesSchema.parse(data);
    } catch (error) {
        return Response.json({message: error}, {status: 400});
    }

    try {
        await db.insert(inventories).values(validateData);
        return Response.json({message: 'OK'}, {status: 201});
    } catch (error) {
        // todo: check database status code, and if it is duplicate value code then send the message to the client.
        return Response.json({message: 'failed to store the inventory into the database'}, {status: 500});
    }
}


export async function GET(){
    try {
        const allInventories = await db.select({
            id: inventories.id,
            sku: inventories.sku,
            warehouses: {
                name: warehouses.name,
                pincode: warehouses.pincode,
            },
            products: products.name
        }).from(inventories)
        .leftJoin(warehouses, eq(inventories.warehouseId, warehouses.id))
        .leftJoin(products, eq(inventories.id, products.id))
        .orderBy(desc(inventories.id));
        return Response.json(allInventories);
    } catch (error) {
        return Response.json({message: 'failed to fetch inventories'}, {status: 500})
    }
}