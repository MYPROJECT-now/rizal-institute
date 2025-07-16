"use client";
import { enrollOldStudent } from "@/src/actions/landingPage";
import ApplicationPage from "./old_student_page";
import { toast } from "sonner";

const newApplicant = () => {

  // Function to create a new todo item
  const addApplicant = async (

    lrn: string,
    
    gradeLevel: string,

    mop: string,
    reservationReceipt: string,
    reservationAmount: number,
  ) => {
  try { 
    await enrollOldStudent
    (
    lrn,
    gradeLevel,
    mop,
    reservationReceipt,
    reservationAmount,
  );
      toast.success("Application was submitted successfully. Check your email for more details");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to enroll. Please try again.");
      } else {
        toast.error("Failed to enroll. Please try again.");
      }
    }
  };
  // Rendering the Todo List component
  return (
    <main>

      {/* Adding Todo component for creating new todos */}
      <ApplicationPage addApplicant={addApplicant} />
    </main>
  );
};

export default newApplicant;
