import { db } from "@/lib/db/db";
import { warehouses } from "@/lib/db/schema";
import { warehouseSchema } from "@/lib/validators/warehouseSchema";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const data = await request.json();

    let validateData;

    try {
        validateData = await warehouseSchema.parse(data)
    } catch (error) {
        return Response.json({ message: error }, { status: 400 });
    }


    try {
        await db.insert(warehouses).values(validateData);
        return Response.json({ message: "OK" }, { status: 201 });
    } catch (error) {
        return Response.json({ message: "failed to store the warehouse" }, { status: 500 });
    }
}

export async function GET(){
    try {
        const allWarehouses = await db
          .select({
            id: warehouses.id,
            name: warehouses.name,
            pincode: warehouses.pincode,
          })
          .from(warehouses);
        return Response.json(allWarehouses);
    } catch (error) {
        return Response.json({message: 'failed to fetch all warehouses'}, {status: 500});
    }
}