"use client";
import { addNewApplicant } from "@/src/actions/landingPage";
import ApplicationPage from "./new_Applicant_page";
import { toast } from "sonner";

const newApplicant = () => {

  // Function to create a new todo item
  const addApplicant = async (
    applicantsLastName: string,
    applicantsFirstName: string,
    applicantsMiddleName: string,
    applicantsSuffix: string,
    dateOfBirth: Date,
    age: number,
    gender: string,
    mobileNumber: string,
    email: string,
    lrn: string,

    guardiansLastName: string,
    guardiansFirstName: string,
    guardiansMiddleName: string,
    guardiansSuffix: string,
    emergencyContact: string,
    emergencyEmail: string,
    fullAddress: string,
    
    gradeLevel: string,
    schoolYear: string,
    schoolType: string,
    prevSchool: string,
    schoolAddress: string,

    
    birthCert: string,
    reportCard: string,
    goodMoral: string,
    idPic: string,
    studentExitForm: string,

    mop: string,
    reservationReceipt: string,
  ) => {
  try { 
    await addNewApplicant
    ({
    applicantsLastName,
    applicantsFirstName,    
    applicantsMiddleName,
    applicantsSuffix,
    dateOfBirth,
    age,
    gender,
    mobileNumber,
    email,
    lrn,

    guardiansLastName,
    guardiansFirstName,
    guardiansMiddleName,
    guardiansSuffix,
    emergencyContact,
    emergencyEmail,
    fullAddress,

    gradeLevel,
    schoolYear,
    schoolType,
    prevSchool,
    schoolAddress,

    birthCert,
    reportCard,
    goodMoral,
    idPic,
    studentExitForm,

    mop,
    reservationReceipt,
  });
      toast.success("Application was submitted successfully. Check your email for more details"); // ✅ Show success message only after successful insertion.
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
