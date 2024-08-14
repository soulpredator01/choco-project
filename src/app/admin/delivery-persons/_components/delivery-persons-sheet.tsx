import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { createDeliveryPerson } from "@/http/api";
import { useNewDeliveryPerson } from "@/store/delivery-person/delivery-person-store";
import { DeliveryPerson } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CreateProductForm, { FormValues } from "./create-delivery-persons-form";

const WarehouseSheet = () => {

  const { toast } = useToast();
  const { isOpen, onClose } = useNewDeliveryPerson();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-delivery-person"],
    mutationFn: (data: DeliveryPerson) => createDeliveryPerson(data),
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['delivery-persons']});
        toast({
          title: 'Delivery Person created successfully'
        })
        onClose();
    }
  });

  const onSubmit = (values: FormValues) => {
    console.log("values: ", values);
    mutate(values as DeliveryPerson);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="min-w-[28rem] space-y-4">
        <SheetHeader>
          <SheetTitle>Create Delivery Persons</SheetTitle>
          <SheetDescription>Create a new delivery person</SheetDescription>
        </SheetHeader>
        <CreateProductForm onSubmit={onSubmit} disabled={isPending} />
      </SheetContent>
    </Sheet>
  );
};

export default WarehouseSheet;
