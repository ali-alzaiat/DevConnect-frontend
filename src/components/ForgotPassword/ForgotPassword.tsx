import { Controller, useForm } from 'react-hook-form';
import { FieldGroup, Field, FieldLabel, FieldError } from '../ui/field';
import { Input } from '../ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import Logo from '../general/Logo';
import { Link } from 'react-router';
import { toast } from 'sonner';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address')
});

const ForgotPassword = () => {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  });

  function onSubmit(data: z.infer<typeof forgotPasswordSchema>) {
    void data;
    toast.info('Password reset is coming soon');
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col p-10 gap-4 max-w-md w-full">
          <Logo />
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl font-bold">Forgot Password</h1>
            <p className="text-secondary text-center">
              Enter your email and we will send you a reset link.
            </p>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="forgot-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="forgot-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your email address"
                      autoComplete="off"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Button type="submit" className="w-full">
                Send Reset Link
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

export default ForgotPassword;
