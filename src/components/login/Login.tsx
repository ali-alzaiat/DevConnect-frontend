import { Controller, useForm } from 'react-hook-form';
import { FieldGroup, Field, FieldLabel, FieldError } from '../ui/field';
import { Input } from '../ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import PasswordInput from '../general/PasswordInput';
import { Button } from '../ui/button';
import Logo from '../general/Logo';
import { Link } from 'react-router';
import useLogin from '@/hooks/api/useLogin';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(100, 'Description must be at most 100 characters.')
});

const Login = () => {
  const { mutate: login, isPending } = useLogin();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  function onSubmit(data: z.infer<typeof loginSchema>) {
    login({ data });
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col justify-center gap-4 flex-1 p-10 h-full bg-surface border-r-2 border-subtle shadow-lg">
          <Logo />
          <h1 className="text-3xl font-bold">Welcome to Dev Connect!</h1>
          <p className="text-secondary">
            Connect, collaborate and innovate with fellow developers around the world.
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-4 w-full marker:text-brand text-secondary">
            <li>Kanban projects boards</li>
            <li>Task tracking</li>
            <li>Team collaboration</li>
            <li>Project management</li>
            <li>Project management</li>
          </ul>
        </div>
        <div className="flex flex-col p-10 gap-4 max-w-[750px] w-[50%]">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-secondary">Login to your account</p>
          </div>
          <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="form-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your email address"
                      autoComplete="off"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-password">Password</FieldLabel>
                    <PasswordInput
                      {...field}
                      id="form-password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your password"
                      autoComplete="off"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? 'Logging in...' : 'Login'}
              </Button>
              <div className="flex items-center justify-center gap-2 text-secondary">
                <p>Don't have an account?</p>
                <Link to="/register" className="text-brand">
                  Register
                </Link>
              </div>
            </FieldGroup>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
