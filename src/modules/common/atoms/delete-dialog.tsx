import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DialogClose } from "@/components/ui/dialog"

export const DeleteDialog = (props: {buttonTitle: string, deleteDescription: string, deleteAction: () => void}) => {
  const {buttonTitle, deleteDescription, deleteAction} = props

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-destructive hover:opacity-[70%] px-4 py-2 rounded-md text-sm">
        {buttonTitle}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {deleteDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <DialogClose asChild>
            <AlertDialogAction onClick={deleteAction}>Delete</AlertDialogAction>
          </DialogClose>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}