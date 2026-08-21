import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useDeleteProfile } from '@/api/generated/users/users';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

type DeleteAccountDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DeleteAccountDialog = ({ open, onOpenChange }: DeleteAccountDialogProps) => {
  const navigate = useNavigate();
  const { mutateAsync: deleteProfile, isPending } = useDeleteProfile();

  const handleDelete = async () => {
    try {
      await deleteProfile();
      localStorage.removeItem('accessToken');
      toast.success('Account deleted successfully');
      onOpenChange(false);
      navigate('/login');
    } catch {
      toast.error('Failed to delete account');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your account? This action cannot be undone and all your
            data will be permanently removed.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            {isPending ? 'Deleting...' : 'Delete Account'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountDialog;
