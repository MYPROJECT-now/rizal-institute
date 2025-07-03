import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { useRegAddStudentModal } from "@/src/store/registrar/add_student";
  
 export const Reg_AddStudent = () => {
    const { isOpen, close } = useRegAddStudentModal()
    return (
        <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="w-[300px] lg:w-[700px] overflow-y-auto bg-gray-50 rounded-xl shadow-lg">
            <DialogHeader>
                <DialogTitle
                className="text-lg lg:text-2xl font-bold text-white bg-dGreen h-[60px] items-center justify-center flex"
                >
                    ADD STUDENT</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col items-center gap-5 my-5">
                <input 
                    type="file" 
                />
            <Button
                    variant="mButton"
                    className=" text-white px-7 py-4 rounded-lg"
                >
                    Add Student
                </Button>
            </div>
        </DialogContent>
      
    </Dialog>
    );
};