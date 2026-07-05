import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useCreateProject } from '@/hooks/api/useCreateProject';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required').max(50, 'Title must be less than 50 characters'),
  description: z.string().max(200, 'Description must be less than 200 characters')
});

const NewProject = () => {
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
      navigate(`/projects/${project.id}`);
    } catch {
      toast.error('Failed to create project');
    }
  };

  return (
    <div className="create-project-form px-3 flex flex-col w-full h-full justify-center items-center bg-background">
      <div className="form-container bg-card p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-3xl mb-4 font-bold">Create a New Project</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="mb-6">
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
                <FormItem className="mb-6">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="w-full h-24 border rounded-md p-2"
                      placeholder="Enter project description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button type="submit" className="button" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create Project'}
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewProject;
