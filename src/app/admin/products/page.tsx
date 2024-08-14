'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { DataTable } from "../_components/data-table";
import { columns } from './_components/columns';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@/http/api';
import { Product } from '@/types';
import ProductSheet from "./_components/product-sheet"
import { useNewProduct } from '@/store/product/product-store';
import { Loader2 } from 'lucide-react';

const page = () => {

  const {onOpen} = useNewProduct();
  const { data: products, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });


  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className=" text-2xl font-bold tracking-tight">Products</h3>
        <Button size={"sm"} onClick={onOpen}>
          Add Products
        </Button>
        <ProductSheet />
      </div>
      {isError && <span className='text-red-500'>Something went wrong.</span>}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="size-10 animate-spin" />
        </div>
      ) : (
        <DataTable columns={columns} data={products || []} />
      )}
    </>
  );
}

export default page