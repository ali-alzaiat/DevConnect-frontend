import { Controller, useForm } from 'react-hook-form';
import { FieldGroup, Field, FieldLabel, FieldError } from '../ui/field';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import PasswordInput from '../general/PasswordInput';
import { Button } from '../ui/button';
import Logo from '../general/Logo';
import { Link, useSearchParams } from 'react-router';
import { toast } from 'sonner';

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters.')
      .max(100, 'Password must be at most 100 characters.'),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword']
  });

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });

  function onSubmit() {
    void token;
    toast.info('Password reset is coming soon');
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col p-10 gap-4 max-w-md w-full">
          <Logo />
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <p className="text-secondary text-center">Choose a new password for your account.</p>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="reset-password">New Password</FieldLabel>
                    <PasswordInput
                      {...field}
                      id="reset-password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your new password"
                      autoComplete="off"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="reset-confirm-password">Confirm Password</FieldLabel>
                    <PasswordInput
                      {...field}
                      id="reset-confirm-password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Confirm your new password"
                      autoComplete="off"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Button type="submit" className="w-full">
                Reset Password
              </Button>
              <div className="flex items-center justify-center gap-2 text-secondary">
                <p>Remembered your password?</p>
                <Link to="/login" className="text-brand">
                  Login
                </Link>
              </div>
            </FieldGroup>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
