import { db } from "@/lib/db/db";
import { deliveryPersons, warehouses } from "@/lib/db/schema";
import { deliveryPersonSchema } from "@/lib/validators/deliveryPersonSchema";
import { desc, eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST (request: NextRequest) {
    const data = await request.json();

    let validateData;

    try {
        validateData = await deliveryPersonSchema.parse(data);
    } catch (error) {
        return Response.json({ message: error }, { status: 400 });
    }

    try {
        await db.insert(deliveryPersons).values(validateData);
        return Response.json({ message: 'OK' }, { status: 201 });
    } catch (error) {
        return Response.json({ message: 'failed to store the delivery person into the database' }, { status: 500 });
    }
}

export async function GET(){
    try {
        const allDeliveryPerson = await db
          .select({
            id: deliveryPersons.id,
            name: deliveryPersons.name,
            phone: deliveryPersons.phone,
            warehouse: warehouses.name,
          })
          .from(deliveryPersons)
          .leftJoin(warehouses, eq(deliveryPersons.warehouseId, warehouses.id)).orderBy(desc(deliveryPersons.id));

        return Response.json(allDeliveryPerson);
    } catch (error) {
        return Response.json({message: 'failed to fetch the delivery persons'}, {status: 500});
    }
}