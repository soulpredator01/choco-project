import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, {params}: {params: {id: string}}){
    const id = params.id;

    try {
        const product = await db.select().from(products).where(eq(products.id, Number(id))).limit(1);
        
        if(!product.length) return Response.json({message: 'product not found.'}, {status: 400});

        return Response.json(product[0]);
    } catch (error) {
        return Response.json({message: 'failed to fetch products'}, {status: 500});
    }
}