'use client';

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  composer: z.string().optional(),
  arranger: z.string().optional(),
  collectionId: z.string().min(1, "Collection is required"),
  difficulty: z.enum(["BEGINNER", "MEDIUM", "ADVANCED", "PROFESSIONAL"]),
});

interface PieceFormProps {
  onSuccess: () => void;
}

export function PieceForm({ onSuccess }: PieceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      composer: "",
      arranger: "",
      collectionId: "",
      difficulty: "MEDIUM",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/admin/pieces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to create piece');
      }

      onSuccess();
    } catch (error) {
      console.error('Error creating piece:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter piece title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="composer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Composer</FormLabel>
              <FormControl>
                <Input placeholder="Enter composer name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="arranger"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Arranger</FormLabel>
              <FormControl>
                <Input placeholder="Enter arranger name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Piece"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
