import { productSchema } from "@/lib/validators/productSchema";
import { writeFile } from "node:fs/promises";
import { NextRequest } from "next/server";
import path from "node:path";
import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { unlinkSync } from "node:fs";
import { desc } from "drizzle-orm";

export async function POST (request: NextRequest){
    const data = await request.formData();

    let validateData;

    try {
        validateData = productSchema.parse({
            name: data.get('name'),
            description: data.get("description"),
            image: data.get("image"),
            price: Number(data.get("price"))
        })
    } catch (error) {
        return Response.json({ message: error }, {status: 400});
    }

    const fileName = `${Date.now()}.${validateData.image.name.split(".").slice(-1)}`; // choco.png

    try {
        const buffer = Buffer.from(await validateData.image.arrayBuffer());
        await writeFile(path.join(process.cwd(), "public/assets", fileName), buffer);
    } catch (error) {
        return Response.json({ message: 'failed to save the file to fs' }, {status: 500})
    }

    try {
        await db.insert(products).values({ ...validateData, image: fileName });
    } catch (error) {
        // todo: remove stored image from fs
        unlinkSync(`public/assets/${fileName}`);
        return Response.json({ message: 'failed to store product into database' }, {status: 500})
    }

    return Response.json({ message: "OK" }, { status: 201 });

}


export async function GET() {
    try {
        const allProducts = await db
          .select()
          .from(products)
          .orderBy(desc(products.id));
        
        return Response.json(allProducts);
    } catch (error) {
        return Response.json({message: 'failed to fetch products'}, {status: 500});
    }
}