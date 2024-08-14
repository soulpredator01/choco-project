import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { createWarehouse } from "@/http/api";
import { useNewWarehouse } from "@/store/warehouse/warehouse-store";
import { Warehouse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CreateProductForm, { FormValues } from "./create-warehouses-form";

const WarehouseSheet = () => {

  const { toast } = useToast();
  const { isOpen, onClose } = useNewWarehouse();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-warehouse"],
    mutationFn: (data: Warehouse) => createWarehouse(data),
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['warehouses']});
        toast({
          title: 'Warehouse created successfully'
        })
        onClose();
    }
  });

  const onSubmit = (values: FormValues) => {
    console.log("values: ", values);
    mutate(values as Warehouse);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="min-w-[28rem] space-y-4">
        <SheetHeader>
          <SheetTitle>Create Warehouse</SheetTitle>
          <SheetDescription>Create a new warehouse</SheetDescription>
        </SheetHeader>
        <CreateProductForm onSubmit={onSubmit} disabled={isPending} />
      </SheetContent>
    </Sheet>
  );
};

export default WarehouseSheet;
