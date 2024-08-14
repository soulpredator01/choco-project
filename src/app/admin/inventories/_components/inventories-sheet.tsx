import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { createInventory } from "@/http/api";
import { useNewInventory } from "@/store/inventories/inventory-store";
import { Inventory, InventoryData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CreateInventoryForm, { FormValues } from "./create-inventories-form";

const InventorySheet = () => {

  const { toast } = useToast();
  const { isOpen, onClose } = useNewInventory();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-inventory"],
    mutationFn: (data: InventoryData) => createInventory(data),
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['inventories']});
        toast({
          title: 'Inventory created successfully'
        })
        onClose();
    }
  });

  const onSubmit = (values: FormValues) => {
    mutate(values);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="min-w-[28rem] space-y-4">
        <SheetHeader>
          <SheetTitle>Create Inventories</SheetTitle>
          <SheetDescription>Create a new inventory</SheetDescription>
        </SheetHeader>
        <CreateInventoryForm onSubmit={onSubmit} disabled={isPending} />
      </SheetContent>
    </Sheet>
  );
};

export default InventorySheet;
