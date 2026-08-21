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
import { Button } from '@/components/ui/button';
import { useCreateProject } from '@/hooks/api/useCreateProject';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required').max(50, 'Title must be less than 50 characters'),
  description: z.string().max(200, 'Description must be less than 200 characters')
});

type CreateProjectDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CreateProjectDialog = ({ open, onOpenChange }: CreateProjectDialogProps) => {
  const navigate = useNavigate();
  const { mutateAsync: createProject, isPending } = useCreateProject();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: ''
    }
  });

  const onSubmit = async (data: { title: string; description?: string }) => {
    try {
      const project = await createProject({ data });
      toast.success('Project created successfully');
      form.reset();
      onOpenChange(false);
      navigate(`/projects/${project.id}`);
    } catch {
      toast.error('Failed to create project');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>Start a team project with Kanban boards.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project title" {...field} />
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
                    <Textarea
                      className="w-full h-24"
                      placeholder="Enter project description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Creating...' : 'Create Project'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;
