import { productSchema } from '@/lib/validators/productSchema';
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
import { warehouseSchema } from '@/lib/validators/warehouseSchema';
import { Loader2 } from 'lucide-react';

export type FormValues = z.input<typeof warehouseSchema>;

const CreateProductForm = ({ onSubmit, disabled }: { onSubmit: (formValues: FormValues) => void, disabled: boolean }) => {
  const form = useForm<z.infer<typeof warehouseSchema>>({
    resolver: zodResolver(warehouseSchema),
    defaultValues: {
      name: "",
      pincode: "",
    },
  });


  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Dairy Milk" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pincode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pincode</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 123456" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={disabled}>
          {
            disabled ? <Loader2 className='size-4 animate-spin'/> : "Create"
          }
        </Button>
      </form>
    </Form>
  );
};

export default CreateProductForm