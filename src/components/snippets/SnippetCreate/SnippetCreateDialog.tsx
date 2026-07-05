import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateSnippet } from '@/hooks/api/useCreateSnippet';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  code: z.string().min(1, 'Code is required'),
  tags: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

interface SnippetCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SnippetCreateDialog = ({ open, onOpenChange }: SnippetCreateDialogProps) => {
  const { mutateAsync: createSnippet, isPending } = useCreateSnippet();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      code: '',
      tags: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await createSnippet({
        data: {
          name: data.name,
          code: data.code,
          tags: data.tags
            ? data.tags
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean)
            : [],
          description: data.description ?? ''
        }
      });
      toast.success('Snippet created successfully');
      form.reset();
      onOpenChange(false);
    } catch {
      toast.error('Failed to create snippet');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create New Snippet</DialogTitle>
          <DialogDescription>Share a reusable code snippet with the community.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. React debounce hook" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief description of the snippet" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[200px] font-mono text-sm"
                      placeholder="Paste your code here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. React, TypeScript, hooks" {...field} />
                  </FormControl>
                  <p className="text-xs text-muted-foreground">Comma-separated list of tags</p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="px-4 py-2 text-sm rounded-md border hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="px-4 py-2 text-sm rounded-md bg-brand text-brand-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isPending ? 'Creating...' : 'Create Snippet'}
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SnippetCreateDialog;
