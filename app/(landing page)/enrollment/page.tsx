"use client";

import { addTodo } from "@/src/actions/serverActions";
import EnrollmentPage from "./enrollment_page";
import { toast } from "sonner";

const enrollmet_Page = () => {



  const enrollmentAdd  = async (
    lrn: string, 
    studentsLastName:string, 
    studentsFirstName: string, 
    studentsMiddleName: string, 
    studentsSuffix: string, 
    dateOfBirth: Date, 
    age: number, 
    gender: string, 
    civilStatus: string, 
    nationality: string,
    religion: string,

    guardiansLastName: string,
    guardiansFirstName: string,
    guardiansMiddleName: string,
    guardiansSuffix: string,
    fullAddress: string,
    mobileNumber: string,
    email: string,

    admissionStatus: string,
    prevSchool: string,
    schoolAddress: string,
    schoolType: string,
    gradeLevel: string,
    schoolYear: string,

    birthCert: string,
    reportCard: string,
    goodMoral: string,
    idPic: string,
    studentExitForm: string,

    mop:string,
    receipt: string
    
  ) =>  {
    try {
    await addTodo(  
    lrn,
    studentsLastName,
    studentsFirstName,
    studentsMiddleName,
    studentsSuffix,
    dateOfBirth,
    age,
    gender,
    civilStatus,
    nationality,
    religion,

    guardiansLastName,
    guardiansFirstName,
    guardiansMiddleName,
    guardiansSuffix,
    fullAddress,
    mobileNumber,
    email,

    admissionStatus,
    prevSchool,
    schoolAddress,
    schoolType,
    gradeLevel,
    schoolYear,

    birthCert,
    reportCard,
    goodMoral,
    idPic,
    studentExitForm,
    mop,
    receipt
    
  );
    toast.success("Application was submitted successfully. Check your email for more details"); // ✅ Show success message only after successful insertion.
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message || "Failed to enroll. Please try again.");
    } else {
      toast.error("Failed to enroll. Please try again.");
    }
  }
  };

 

  return (
    <div>
      <EnrollmentPage enrollmentAdd={enrollmentAdd} />
    </div>
  );
};

export default enrollmet_Page;
