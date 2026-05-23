import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { CirclePlus } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ItemTypes } from '@/constants'
import Header from '@/components/general/header'

type Task = { id: number; title: string; status: string }

const tasks = [
  { id: 1, title: 'Task 1', status: 'to-do' },
  { id: 2, title: 'Task 2', status: 'in-progress' },
  { id: 3, title: 'Task 3', status: 'done' },
  { id: 4, title: 'Task 4', status: 'to-do' },
  { id: 5, title: 'Task 5', status: 'in-progress' },
  { id: 6, title: 'Task 6', status: 'done' },
  { id: 7, title: 'Task 7', status: 'to-do' },
  { id: 8, title: 'Task 8', status: 'in-progress' },
  { id: 9, title: 'Task 9', status: 'done' },
  { id: 10, title: 'Task 10', status: 'to-do' },
  { id: 11, title: 'Task 11', status: 'in-progress' },
  { id: 12, title: 'Task 12', status: 'done' },
  { id: 13, title: 'Task 13', status: 'to-do' }
]

let count = tasks.length

const ProjectDetails = () => {
  const params = useParams()
  const location = useLocation()
  const { projectName, projectDescription } = location.state || {
    projectName: '',
    projectDescription: ''
  }
  const projectId = params.id
  console.log('Project ID:', projectId)
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([])
  const [toDoTasks, setToDoTasks] = useState<Task[]>([])
  const [doneTasks, setDoneTasks] = useState<Task[]>([])

  useEffect(() => {
    const toDo: Task[] = []
    const inProgress: Task[] = []
    const done: Task[] = []
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].status === 'to-do') {
        toDo.push(tasks[i])
      } else if (tasks[i].status === 'in-progress') {
        inProgress.push(tasks[i])
      } else if (tasks[i].status === 'done') {
        done.push(tasks[i])
      }
    }
    setToDoTasks(toDo)
    setInProgressTasks(inProgress)
    setDoneTasks(done)
  }, [])

  const TaskList = ({
    title,
    tasks,
    setTasks,
    className
  }: {
    title: string
    tasks: Task[]
    setTasks: Dispatch<SetStateAction<Task[]>>
    className: string
  }) => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: ItemTypes.TASK,
      drop: (item: { task: Task }) => {
        const task = item.task
        const existingTask = tasks.find((t) => t.id === task.id)
        if (existingTask) return

        switch (task.status) {
          case 'to-do':
            setToDoTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id))
            break
          case 'in-progress':
            setInProgressTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id))
            break
          case 'done':
            setDoneTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id))
            break
          default:
        }
        task.status = title.toLowerCase().replace(' ', '-')
        setTasks((prevTasks) => [...prevTasks, task])
      },
      collect: (monitor) => ({
        isOver: monitor.isOver()
      })
    }))
    const ref = useRef<HTMLDivElement>(null)
    drop(ref)

    return (
      <div
        ref={ref}
        className={
          className +
          ' p-6 rounded-lg shadow-md w-30/100 min-w-60' +
          (isOver ? ' bg-brand-tint text-brand' : ' bg-sunken')
        }
      >
        <h2 className="text-base lg:text-xl font-semibold mb-4">{title}</h2>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
        <NewTaskButton setTasks={setTasks} status={title.toLowerCase().replace(' ', '-')} />
      </div>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="project-details">
        <Header title={projectName} description={projectDescription} />
        <div className="task-list flex flex-row gap-6 flex-wrap justify-between">
          <TaskList
            title="To Do"
            tasks={toDoTasks}
            setTasks={setToDoTasks}
            className="to-do-list"
          />
          <TaskList
            title="In Progress"
            tasks={inProgressTasks}
            setTasks={setInProgressTasks}
            className="in-progress-list"
          />
          <TaskList title="Done" tasks={doneTasks} setTasks={setDoneTasks} className="done-list" />
        </div>
      </div>
    </DndProvider>
  )
}

export default ProjectDetails

type NewTaskButtonProps = {
  setTasks: Dispatch<SetStateAction<Task[]>>
  status: string
}

const NewTaskButton = ({ setTasks, status }: NewTaskButtonProps) => {
  const [taskTitle, setTaskTitle] = useState<string>('')

  const handleAddTask = () => {
    setTasks((prevTasks) => [...prevTasks, { id: ++count, title: taskTitle, status }])
    setTaskTitle('')
  }

  return (
    <div
      key={status}
      className="task-item mb-4 bg-card rounded-md shadow-sm hover:text-brand hover:bg-brand-tint flex justify-center items-center cursor-pointer"
    >
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex justify-center items-center cursor-pointer w-full  p-4">
            <CirclePlus className="w-8 h-8" />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            placeholder="Enter task title"
            className="w-full h-10 border rounded-md p-2"
            onChange={(e) => {
              setTaskTitle(e.target.value)
            }}
            value={taskTitle}
          />
          <DialogFooter>
            <DialogClose asChild>
              <button
                className={`button my-0 mx-auto ${
                  !taskTitle && 'text-disabled !cursor-default pointer-events-none'
                }`}
                onClick={handleAddTask}
                disabled={!taskTitle}
              >
                Add
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const TaskItem = ({ task }: { task: Task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: { task: task },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))
  const ref = useRef<HTMLDivElement>(null)
  drag(ref)

  return (
    <div
      ref={ref}
      className={`task-item mb-4 bg-surface rounded-md shadow-sm flex justify-center items-center cursor-pointer hover:text-brand hover:bg-brand-tint ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {task.title}
    </div>
  )
}
