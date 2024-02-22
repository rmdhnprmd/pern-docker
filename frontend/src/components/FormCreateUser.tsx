import {  FormProvider, UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface FormCreateUserProps {
  form: UseFormReturn<{ name: string; email: string }>;
  create: (values: { name: string; email: string }) => Promise<any>;
}

export const FormCreateUser: React.FC<FormCreateUserProps> = ({ form, create }) => {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(create)}
        className="p-8 space-y-4 border-2 bg-white border-black rounded-md"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fullname</FormLabel>
              <FormControl>
                <Input
                  disabled={form.formState.isLoading}
                  placeholder="e.g. 'John Doe'"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={form.formState.isLoading}
                  placeholder="e.g. 'johndoe@mail.com'"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          type="submit"
        >
          Add user
        </Button>
      </form>
    </FormProvider>
  );
};
