"use client";
import { CardComponent } from "@/components/CardComponent";
import { ToastProvider } from "@/components/provider/toaster-provider";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Inter as FontSans } from "next/font/google";

import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormCreateUser } from "@/components/FormCreateUser";
import { FormUpdateUser } from "@/components/FormUpdateUser";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface User {
  id: number;
  name: string;
  email: string;
}

export const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Please input the right email",
  }),
});

const formSchemaUpdate = z.object({
  id: z.coerce.number(),
  name: z.string().min(3, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Please input the right email",
  }),
});

const Home = ({ id, name, email }: User) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const [users, setUsers] = useState<User[]>([]);

  // fetch users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        setUsers(response.data.reverse());
      } catch (error) {
        toast.error("Something went wrong 🚫");
        console.error("Error Fetching Data WOOY", error);
      }
    };

    fetchData()
  }, []);

  // create user
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const createUser = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`${apiUrl}/users`, values);
      setUsers([response.data, ...users]);
      toast.success("Success create 🥳");
      return response.data
    } catch (error) {
      toast.error("Something went wrong 🚫");
      console.error("Error Create User", error);
    } finally {
      form.setValue("name", "");
      form.setValue("email", "");
    }
  };

  //update user
  const formUpdateUser = useForm<z.infer<typeof formSchemaUpdate>>({
    resolver: zodResolver(formSchemaUpdate),
    defaultValues: {
      id: id || undefined,
      name: name || "",
      email: email || "",
    },
  });

  const updateUserDb = async (values: z.infer<typeof formSchemaUpdate>) => {
    try {
      await axios.put(`${apiUrl}/users/${values.id}`, values);
      setUsers(
        users.map((user) => {
          if (user.id === values.id) {
            return { ...user, name: values.name, email: values.email };
          }
          return user;
        })
      );
      toast.success("User updated 👏");
    } catch (error) {
      toast.error("Something went wrong 🚫");
      console.error("Error update user", error);
    } finally {
      formUpdateUser.setValue("id", 0);
      formUpdateUser.setValue("name", "");
      formUpdateUser.setValue("email", "");
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      await axios.delete(`${apiUrl}/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
      toast.success("User deleted 😱");
    } catch (error) {
      toast.error("Something went wrong 🚫");
      console.error(error);
    }
  };

  return (
    <>
      <ToastProvider />

      <main className="flex flex-col font-sans antialiased items-center justify-center min-h-screen p-4 bg-gray-100">
        <div className="space-y-4 w-full max-w-2xl">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            User Management App
          </h1>

          {/* Create User */}
          <FormCreateUser form={form} create={createUser} />

          {/* Update User */}
          <FormUpdateUser formUpdateUser={formUpdateUser} update={updateUserDb}/>

          {/* Display Users */}
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
            >
              <CardComponent card={user} />
              <Button onClick={() => deleteUser(user.id)} variant="destructive">
                Delete
              </Button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
