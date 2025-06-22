// "use client";

// import { ChangeEvent, FC, useRef, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { usePreviewModal } from "@/src/store/preview";
// import { PreviewModal } from "@/components/landing_page_portal/preview/preview_modal";

// interface Props {
//   addApplicant: (
        
//     birthCert: string,
//     reportCard: string,
//     goodMoral: string,
//     idPic: string,
//     studentExitForm: string,
// ) => void;
// }

// const ApplicationPage: FC<Props>  =  ({ addApplicant }) => {
//     const [page, setPage] = useState(0);

//     const [errors,setErrors] = useState<{ [key: string]: string }>({});

//     const [birthCert, setBirthCert] =  useState<File | null>(null);
//     const [reportCard, setReportCard] = useState<File | null>(null);
//     const [goodMoral, setGoodMoral] = useState<File | null>(null);
//     const [idPic, setIdPic] = useState<File | null>(null);
//     const [studentExitForm, setStudentExitForm] = useState<File | null>(null);
//     const { open: openPreview } = usePreviewModal();

//     const [isSubmitting, setIsSubmitting] = useState(false);


  
//     // Event handler for input change

//         const handleBirthCertChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//           setBirthCert(file);
//         }
//     };
//     const handleReportCardChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//           setReportCard(file);
//         }
//     };
//     const handleGoodMoralChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//           setGoodMoral(file);
//         }
//     };
//     const handleIdPIcChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//           setIdPic(file);
//         }
//     };
//     const handleStudentExitFormChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//           setStudentExitForm(file);
//         }
//     };

//     const previewImage = (file: File | null) => {
//   if (!file) return;
//   const reader = new FileReader();
//   reader.onloadend = () => {
//     if (typeof reader.result === "string") {
//       openPreview(reader.result);
//     }
//   };
//   reader.readAsDataURL(file);
// };

//      // Refs for input elements
//          const birthCertRef = useRef<HTMLInputElement>(null);
//          const reportCardRef = useRef<HTMLInputElement>(null);
//          const goodMoralRef = useRef<HTMLInputElement>(null);
//          const idPicRef = useRef<HTMLInputElement>(null);
//          const studentExitFormRef = useRef<HTMLInputElement>(null);


//     const gcashReceiptRef = useRef<HTMLInputElement>(null);
//     const bankTransferReceiptRef = useRef<HTMLInputElement>(null);

    
//     // Event handler for adding a new todo
//     const handleAdd = async () => {
//         setIsSubmitting(true);
//         try {
//             const uploadImage = async (file: File, folder: string) => {
//             const formData = new FormData();
//             formData.append('file', file);
//             formData.append('upload_preset', 'my_preset'); // Use one preset for all
//             formData.append('folder', folder); // Dynamically assign the folder
        
//             const response = await fetch('https://api.cloudinary.com/v1_1/dkfn4xy6q/image/upload', {
//             method: 'POST',
//             body: formData,
//             });
        
//             const data = await response.json();  
//             return data.secure_url; // Returns the image URL from Cloudinary
    
//         };

//         const uploadBirthCert = birthCert ? await uploadImage(birthCert, 'documents') : "";
//         const uploadReportCard = reportCard ? await uploadImage(reportCard, 'documents') : "";
//         const uploadGoodMoral = goodMoral ? await uploadImage(goodMoral, 'documents') : "";
//         const uploadIdPic = idPic ? await uploadImage(idPic, 'documents') : "";
//         const uploadStudentExitForm = studentExitForm ? await uploadImage(studentExitForm, 'documents') : "";

//             addApplicant
//             (
 
//                 uploadBirthCert,
//                 uploadReportCard,
//                 uploadGoodMoral,
//                 uploadIdPic,
//                 uploadStudentExitForm,

//             );
                
//                 // Reset file input fields
//                 if (birthCertRef.current) birthCertRef.current.value = "";
//                 if (reportCardRef.current) reportCardRef.current.value = "";
//                 if (goodMoralRef.current) goodMoralRef.current.value = "";
//                 if (idPicRef.current) idPicRef.current.value = "";
//                 if (studentExitFormRef.current) studentExitFormRef.current.value = "";

//         } catch (error) {
//             toast.error("Failed to enroll. Please try again.");
//             console.error('Error creating user:', error);
//         } finally {
//             setIsSubmitting(false);
//         }
  
//     };

//     const sections = [
//                 {
//             title: (
//                 <div>
//                     <p className="text-2xl text-dGreen font-bold font-merriweather">
//                         Section 4: Documents Submission
//                     </p>
//                 </div>
//             ),
//             content: (
//                 <main className="grid grid-cols-2 gap-7 mx-[20px]">
//                     <section className="flex flex-row gap-3 items-center">
//                         <label className="font-semibold font-merriweather text-dGreen text-xl w-[240px]">PSA Birth Certificate:</label>
//                         <PreviewModal />
// {birthCert ? (
//   <div className="flex items-center gap-2 w-[300px] ">
//     <button
//       type="button"
//       onClick={() => previewImage(birthCert)}
//       className="text-dGreen underline text-sm bg-gray-200 rounded flex-1 text-left truncate p-1 w-[300px] h-[35px]"
//       title="Click to preview"
//     >
//       {birthCert.name}
//     </button>
//     <button
//       type="button"
//       onClick={() => {
//         setBirthCert(null);
//         if (birthCertRef.current) birthCertRef.current.value = "";
//       }}
//       className="text-red-500 hover:text-red-700 font-bold"
//       title="Remove file"
//     >
//       ✕
//     </button>
//   </div>
// ) : (
//   <input
//     type="file"
//     ref={birthCertRef}
//     accept="image/*"
//     onChange={handleBirthCertChange}
//     name="document"
//     className="border bg-gray-200 rounded-sm p-1 w-[300px] h-[35px]"
//   />
// )}

//                     </section>
//                     <section className="flex flex-row gap-3 items-center">
//                         <label className="font-semibold font-merriweather text-dGreen text-xl w-[240px]">Good Moral Certificate:</label>
//                         <input 
//                             type="file" 
//                             ref={goodMoralRef}
//                             name="document"  
//                             onChange={handleGoodMoralChange}
//                             className="border bg-gray-200 rounded-sm p-1 w-[300px] h-[35px] " />
//                     </section>
//                     <section className="flex flex-row gap-3 items-center">
//                         <label className="font-semibold font-merriweather text-dGreen text-xl w-[240px]">REPORT CARD:</label>
//                         <input 
//                             type="file" 
//                             ref={reportCardRef}
//                             name="document"  
//                             onChange={handleReportCardChange}
//                             className="border bg-gray-200 rounded-sm p-1 w-[300px] h-[35px] " />
//                     </section>
//                     <section className="flex flex-row gap-3 items-center">
//                         <label className="font-semibold font-merriweather text-dGreen text-xl w-[240px]">2x2 ID picture:</label>
//                         <input 
//                         type="file" 
//                         ref={idPicRef}
//                         name="document"  
//                         onChange={handleIdPIcChange}
//                         className="border bg-gray-200 rounded-sm p-1 w-[300px] h-[35px] " />
//                     </section>
//                     <section className="flex flex-row gap-3 items-center">
//                         <label className="font-semibold font-merriweather text-dGreen text-xl w-[240px]">CACPRISAA Student Exit Clearance:</label>
//                         <input 
//                             type="file" 
//                             name="document"  
//                             ref={studentExitFormRef}
//                             onChange={handleStudentExitFormChange}
//                             className="border bg-gray-200 rounded-sm p-1 w-[300px] h-[35px] " />
//                     </section>
//                 </main>
//             ),
//         },

      
      
//         {
//             title: (
//                 <div>
//                     <p className="text-2xl text-dGreen font-bold font-merriweather">
//                         Appilication Submission
//                     </p>
//                 </div>
//             ),
//             content: (
//                <div className="w-full mt-10 text-center">
//                     <Button
//                         variant="mButton"
//                         onClick={handleAdd}
//                         disabled={isSubmitting}
//                         className="w-[150px] h-[45px] text-xl rounded-xl"
//                     >
//                         Submit
//                     </Button>
//                 </div>
//             ),
//         },
//     ];

//     const handlePrev = () => {
//         if (page > 0) setPage(page - 1);
//         setErrors({}); 
//     };

//     const handleNext = () => {
//         if (page < sections.length - 1) setPage(page + 1);
//         setErrors({}); 
//     };

//     return (
//         <main className="min-h-[600px] w-full mt-2 p-5 flex flex-col">
//             <div className="h-full ">
//                 <section className="w-full text-center">
//                     <p className="text-4xl text-dGreen font-bold font-merriweather">
//                         Junior High School Application
//                     </p>
//                 </section>

//                 {/* content */}
//                 <div className="flex-1 mt-[80px] mx-[70px] flex flex-col gap-3">
//                      {sections[page].title}
//                      <hr className="border-b-2 border-dGreen" />
//                     {sections[page].content}
//                 </div>

//                 {/* buttona */}
//                 <div className="w-full flex justify-center gap-10 mt-[50px]">
//                     <button
//                         className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
//                         onClick={handlePrev}
//                         disabled={page === 0}
//                     >
//                         Previous
//                     </button>
//                     <span className="text-sm text-gray-600 self-center">
//                         Page {page + 1} of {sections.length}
//                     </span>
//                     <button
//                         className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
//                         onClick={handleNext}
//                         disabled={page === sections.length - 1}
//                     >
//                         Next
//                     </button>
//                 </div>
//             </div>
//         </main>
//     );
// };

// export default ApplicationPage;
