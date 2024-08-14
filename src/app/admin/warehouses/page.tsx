'use client'

import { Button } from '@/components/ui/button';
import { getAllWarehouse } from '@/http/api';
import { useNewWarehouse } from '@/store/warehouse/warehouse-store';
import { Product } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { columns } from './_components/columns';
import { DataTable } from "../_components/data-table";
import WarehouseSheet from './_components/warehouse-sheet';

const page = () => {

  const {onOpen} = useNewWarehouse();
  const { data: warehouses, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["warehouses"],
    queryFn: getAllWarehouse,
  });


  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className=" text-2xl font-bold tracking-tight">Warehouses</h3>
        <Button size={"sm"} onClick={onOpen}>
          Add Warehouses
        </Button>
        <WarehouseSheet />
      </div>
      {isError && <span className='text-red-500'>Something went wrong.</span>}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="size-10 animate-spin" />
        </div>
      ) : (
        <DataTable columns={columns} data={warehouses || []} />
      )}
    </>
  );
}

export default page