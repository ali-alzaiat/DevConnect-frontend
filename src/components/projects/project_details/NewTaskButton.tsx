import { useState } from 'react';
import { TaskFormData } from './ProjectDetails';
import { Controller, useForm } from 'react-hook-form';
import { TaskPriority } from '../TaskPriorityTag/constants';
import { TaskType } from '../TaskTypeTag/constants';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { FieldGroup, Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton
} from '@/components/ui/input-group';
import { PopoverTrigger, PopoverContent, Popover } from '@/components/ui/popover';
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Select
} from '@/components/ui/select';
import { Plus, CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

type NewTaskButtonProps = {
  statusKey: string;
  onAddTask: (data: TaskFormData, status: string) => void;
};

export const NewTaskButton = ({ statusKey, onAddTask }: NewTaskButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<TaskFormData>({
    defaultValues: {
      title: '',
      priority: TaskPriority.MEDIUM,
      type: TaskType.FEATURE,
      dueDate: new Date()
    }
  });

  const onSubmit = (data: TaskFormData) => {
    onAddTask(data, statusKey);
    form.reset();
    setIsOpen(false); // Close dialog on success
  };

  return (
    <div className="task-item mb-4 rounded-md shadow-sm hover:bg-surface-hover">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className="flex items-center cursor-pointer w-full p-2 text-sm text-secondary">
            <Plus className="w-3 h-3 mr-2" />
            <span>Add New Task</span>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>

          <form id={`form-add-task-${statusKey}`} onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Title Field */}
              <Controller
                name="title"
                control={form.control}
                rules={{ required: 'Task title is required' }}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Description</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Enter task title"
                      className="w-full h-10 border rounded-md p-2"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Priority Field */}
              <Controller
                name="priority"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Priority</FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Priority" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {Object.keys(TaskPriority).map((priority) => (
                          <SelectItem
                            key={priority}
                            value={TaskPriority[priority as keyof typeof TaskPriority]}
                          >
                            {priority}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Type Field */}
              <Controller
                name="type"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Type</FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {Object.keys(TaskType).map((type) => (
                          <SelectItem key={type} value={TaskType[type as keyof typeof TaskType]}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Date Picker Field */}
              <Controller
                name="dueDate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="w-full">
                    <FieldLabel>Due Date</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        readOnly
                        value={field.value ? field.value.toLocaleDateString() : ''}
                        placeholder="Select a date"
                      />
                      <InputGroupAddon align="inline-end">
                        <Popover>
                          <PopoverTrigger asChild>
                            <InputGroupButton
                              variant="ghost"
                              size="icon-xs"
                              aria-label="Select date"
                            >
                              <CalendarIcon />
                            </InputGroupButton>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="end">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                            />
                          </PopoverContent>
                        </Popover>
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>

          <DialogFooter>
            {/* Native submit button linked to the form ID */}
            <button
              type="submit"
              form={`form-add-task-${statusKey}`}
              className="button my-0 mx-auto bg-brand text-white px-4 py-2 rounded cursor-pointer hover:bg-brand-hover transition-colors"
            >
              Add Task
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
