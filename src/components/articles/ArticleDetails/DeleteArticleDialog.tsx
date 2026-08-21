import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useDeleteArticle, getGetAllArticlesQueryKey } from '@/api/generated/articles/articles';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

type DeleteArticleDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  articleId: number;
  onSuccess: () => void;
};

const DeleteArticleDialog = ({
  open,
  onOpenChange,
  articleId,
  onSuccess
}: DeleteArticleDialogProps) => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteArticle, isPending } = useDeleteArticle();

  const handleDelete = async () => {
    try {
      await deleteArticle({ id: articleId });
      queryClient.invalidateQueries({ queryKey: getGetAllArticlesQueryKey() });
      toast.success('Article deleted successfully');
      onOpenChange(false);
      onSuccess();
    } catch {
      toast.error('Failed to delete article');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Article</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this article? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteArticleDialog;
