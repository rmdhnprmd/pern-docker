import { FormProvider, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface FormUpdateUserProps {
  formUpdateUser: UseFormReturn<{ id: number; name: string; email: string }>;
  update: (values: {id: number; name: string; email: string }) => Promise<any>;
}

export const FormUpdateUser: React.FC<FormUpdateUserProps> = ({
  formUpdateUser,
  update,
}) => {
  return (
    <FormProvider {...formUpdateUser}>
      <form
        onSubmit={formUpdateUser.handleSubmit(update)}
        className="p-8 space-y-4 border-2 bg-white border-black rounded-md"
      >
        <FormField
          control={formUpdateUser.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Id</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  disabled={formUpdateUser.formState.isLoading}
                  placeholder="e.g. '13'"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={formUpdateUser.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fullname</FormLabel>
              <FormControl>
                <Input
                  disabled={formUpdateUser.formState.isLoading}
                  placeholder="e.g. 'John Doe'"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={formUpdateUser.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={formUpdateUser.formState.isLoading}
                  placeholder="e.g. 'johndoe@mail.com'"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={
            !formUpdateUser.formState.isValid ||
            formUpdateUser.formState.isSubmitting
          }
          type="submit"
        >
          Update user
        </Button>
      </form>
    </FormProvider>
  );
};
