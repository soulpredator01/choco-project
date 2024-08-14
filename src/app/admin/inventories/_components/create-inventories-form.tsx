import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { z } from "zod";


import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getAllProducts, getAllWarehouse } from '@/http/api';
import { inventoriesSchema } from "@/lib/validators/inventoriesSchema";
import { Product, Warehouse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

export type FormValues = z.input<typeof inventoriesSchema>;

const CreateInventoryForm = ({ onSubmit, disabled }: { onSubmit: (formValues: FormValues) => void, disabled: boolean }) => {
  const form = useForm<z.infer<typeof inventoriesSchema>>({
    resolver: zodResolver(inventoriesSchema),
    defaultValues: {
      sku: "",
    },
  });

  const {data: warehouses, isLoading: isWarehousesLoading} = useQuery<Warehouse[]>({
    queryKey: ['warehouses'],
    queryFn: () => getAllWarehouse(),
  });

  const {data: products, isLoading: isProductsLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () => getAllProducts(),
  });


  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU ID</FormLabel>
              <FormControl>
                <Input placeholder="e.g. CH123456" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="warehouseId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Warehouse ID</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                defaultValue={field.value ? field.value.toString() : ""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Warehouse ID" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isWarehousesLoading ? (
                    <SelectItem value="Loading">Loading...</SelectItem>
                  ) : (
                    <>
                      {warehouses &&
                        warehouses.map((item) => (
                          <SelectItem
                            key={item.id}
                            value={item.id ? item.id?.toString() : ""}>
                            {item.name}
                          </SelectItem>
                        ))}
                    </>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="productId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product ID</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                defaultValue={field.value ? field.value.toString() : ""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Product ID" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isProductsLoading ? (
                    <SelectItem value="Loading">Loading...</SelectItem>
                  ) : (
                    <>
                      {products &&
                        products.map((item) => (
                          <SelectItem
                            key={item.id}
                            value={item.id ? item.id?.toString() : ""}>
                            {item.name}
                          </SelectItem>
                        ))}
                    </>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={disabled}>
          {disabled ? <Loader2 className="size-4 animate-spin" /> : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateInventoryForm