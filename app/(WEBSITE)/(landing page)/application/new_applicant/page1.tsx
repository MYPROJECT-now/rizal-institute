// "use client";
// import { addNewApplicant } from "@/src/actions/landingPage";
// import ApplicationPage from "./new_Applicant_page";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";



// const NewApplicant = () => {
//   const router = useRouter();
//   // Function to create a new todo item
//   const addApplicant = async (
//     applicantsLastName: string,
//     applicantsFirstName: string,
//     applicantsMiddleName: string,
//     applicantsSuffix: string,
//     dateOfBirth: Date,
//     age: number,
//     gender: string,
//     mobileNumber: string,
//     email: string,
//     lrn: string,

//     guardiansLastName: string,
//     guardiansFirstName: string,
//     guardiansMiddleName: string,
//     guardiansSuffix: string,
//     emergencyContact: string,
//     emergencyEmail: string,
//     fullAddress: string,
    
//     gradeLevel: string,
//     studentType: string,
//     schoolYear: string,
//     schoolType: string,
//     prevSchool: string,
//     schoolAddress: string,

    
//     birthCert: string,
//     reportCard: string,
//     goodMoral: string,
//     idPic: string,
//     studentExitForm: string,
//     form137: string,
//     itr: string,
//     escCert: string,

//     mop: string,
//     reservationReceipt: string,
//     reservationAmount: number,

//     attainmentUponGraduation: string,
//     // consistentGPA: string,
//     hasEnrolledSibling: string,
//     siblingName: string,
//   ) => {
//   try { 
//     await addNewApplicant
//     ({
//     applicantsLastName,
//     applicantsFirstName,    
//     applicantsMiddleName,
//     applicantsSuffix,
//     dateOfBirth,
//     age,
//     gender,
//     mobileNumber,
//     email,
//     lrn,

//     guardiansLastName,
//     guardiansFirstName,
//     guardiansMiddleName,
//     guardiansSuffix,
//     emergencyContact,
//     emergencyEmail,
//     fullAddress,

//     gradeLevel,
//     schoolYear,
//     studentType,
//     schoolType,
//     prevSchool,
//     schoolAddress,

//     birthCert,
//     reportCard,
//     goodMoral,
//     idPic,
//     studentExitForm,
//     form137,
//     itr,
//     escCert,

//     mop,
//     reservationReceipt,
//     reservationAmount,

//     attainmentUponGraduation,
//     // consistentGPA,
//     hasEnrolledSibling,
//     siblingName,
//   });
//       toast.success("Application was submitted successfully. Check your email for more details"); 
//       router.push("/");
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         toast.error(error.message || "Failed to enroll. Please try again.");
//       } else {
//         toast.error("Failed to enroll. Please try again.");
//       }
//     }
//   };
//   // Rendering the Todo List component
//   return (
//     <main>

//       {/* Adding Todo component for creating new todos */}
//       <ApplicationPage addApplicant={addApplicant} />
//     </main>
//   );
// };

// export default NewApplicant;
