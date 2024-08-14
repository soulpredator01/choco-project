'use client'

import { Button } from '@/components/ui/button';
import { getAllDeliveryPerson, getAllWarehouse } from '@/http/api';
import { useNewWarehouse } from '@/store/warehouse/warehouse-store';
import { Product } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { columns } from './_components/columns';
import { DataTable } from "../_components/data-table";
import DeliveryPersonSheet from './_components/delivery-persons-sheet';
import { useNewDeliveryPerson } from '@/store/delivery-person/delivery-person-store';

const page = () => {

  const { onOpen } = useNewDeliveryPerson();
  const { data: deliveryPersons, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["delivery-persons"],
    queryFn: getAllDeliveryPerson,
  });


  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className=" text-2xl font-bold tracking-tight">Delivery Persons</h3>
        <Button size={"sm"} onClick={onOpen}>
          Add Delivery Person
        </Button>
        <DeliveryPersonSheet />
      </div>
      {isError && <span className='text-red-500'>Something went wrong.</span>}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="size-10 animate-spin" />
        </div>
      ) : (
        <DataTable columns={columns} data={deliveryPersons || []} />
      )}
    </>
  );
}

export default page