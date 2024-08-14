'use client'

import { Button } from '@/components/ui/button';
import { getAllInventories } from '@/http/api';
import { useNewInventory } from '@/store/inventories/inventory-store';
import { Inventory } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { DataTable } from "../_components/data-table";
import { columns } from './_components/columns';
import InventorySheet from './_components/inventories-sheet';

const Inventories = () => {

  const { onOpen } = useNewInventory();
  const { data: inventories, isLoading, isError } = useQuery<Inventory[]>({
    queryKey: ["inventories"],
    queryFn: getAllInventories,
  });


  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className=" text-2xl font-bold tracking-tight">Inventory</h3>
        <Button size={"sm"} onClick={onOpen}>
          Add Inventories
        </Button>
        <InventorySheet />
      </div>
      {isError && <span className='text-red-500'>Something went wrong.</span>}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="size-10 animate-spin" />
        </div>
      ) : (
        <DataTable columns={columns} data={inventories || []} />
      )}
    </>
  );
}

export default Inventories