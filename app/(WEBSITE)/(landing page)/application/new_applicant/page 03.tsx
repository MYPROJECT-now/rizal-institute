// "use client";

// import { ChangeEvent, useRef, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import Image from "next/image";
// import { usePreviewModal } from "@/src/store/preview";
// import {  addNewApplicants, verifyLrn } from "@/src/actions/landingPage";

// import {
// Card,
// CardContent,    
// CardHeader,
// CardTitle,
// } from "@/components/ui/card"
// import { PreviewModal } from "@/components/landing_page/landing_page_portal/preview/preview_modal";
// import { useRouter } from "next/navigation";
// import { DiscountWarningModal } from "./reminder";



//     const ApplicationPage = () => {
//         const router = useRouter();

//         const [page, setPage] = useState(0);

//         const [errors,setErrors] = useState<{ [key: string]: string }>({});

//         // State for handling input value
//         const [applicantsLastName, setApplicantsLastName] = useState("");
//         const [applicantsFirstName, setApplicantsFirstName] = useState("");
//         const [applicantsMiddleName, setApplicantsMiddleName] = useState("");
//         const [applicantsSuffix, setApplicantsSuffix] = useState("");
//         const [dateOfBirth, setDateOfBirth] = useState("");
//         const [religion, setReligion] = useState("");
//         const [ip, setIp] = useState("");
//         const [house_no_purok, setHouseNoPurok] = useState("");
//         const [barangay, setBarangay] = useState("");
//         const [city, setCity] = useState("");
//         const [province, setProvince] = useState("");
//         const [motherTongue, setMotherTongue] = useState("");
//         const [age, setAge] = useState("");
//         const [gender, setGender] = useState("");
//         const [mobileNumber, setMobileNumber] = useState("");
//         const [email, setEmail] = useState("");

//         const [guardiansLastName, setGuardianLastName] = useState("");
//         const [guardiansFirstName, setGuardianFirstName] = useState("");
//         const [guardiansMiddleName, setGuardianMiddleName] = useState("");
//         const [guardiansSuffix, setGuardianSuffix] = useState("");
//         const [emergencyContact, setEmergencyContact] = useState("");
//         const [emergencyEmail, setEmergencyEmail] = useState("");
//         const [relationship, setRelationship] = useState("");

//         const [lrn, setLrn] = useState(""); 
//         const [gradeLevel, setGradeLevel] = useState("");
//         const [schoolYear, setSchoolYear] = useState("");
//         const [studentType, setStudentType] = useState("");
//         const [schoolType, setSchoolType] = useState("");
//         const [schoolName, setSchoolName ] = useState("");
//         const [schoolAddress, setSchoolAddress] = useState("");

//         const [birthCert, setBirthCert] =  useState<File | null>(null);
//         const [reportCard, setReportCard] = useState<File | null>(null);
//         const [goodMoral, setGoodMoral] = useState<File | null>(null);
//         const [idPic, setIdPic] = useState<File | null>(null);
//         const [studentExitForm, setStudentExitForm] = useState<File | null>(null);
//         const [form137, setForm137] = useState<File | null>(null);
//         const [itr, setITR] = useState<File | null>(null);
//         const [escCert, setEscCert] = useState<File | null>(null);


//         const [mop, setMop] = useState("");
//         const [reservationReceipt, setReservationReceipt] = useState<File | null>(null);
//         const [reservationAmount, setReservationAmount] = useState("");
        
//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//         const [isBankTransferSelected, setIsBankTransferSelected] = useState(false);
//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//         const [isGcashSelected, setIsGcashSelected] = useState(false);

//         const [attainmentUponGraduation, setAttainmentUponGraduation] = useState("");
//         // const [consistentGPA, setConsistentGPA] = useState("");
//         const [hasEnrolledSibling, setHasEnrolledSibling] = useState("");
//         const [siblingName, setSiblingName] = useState("");
//         const [escGrantee, setEscGrantee] = useState("");

//         const { open: openPreview } = usePreviewModal();
//         const [isSubmitting, setIsSubmitting] = useState(false);


//         const [showDiscountWarning, setShowDiscountWarning] = useState(false);
//         const [discountWarningMessage, setDiscountWarningMessage] = useState<string[]>([]);

//     // Validation per page
//     const validatePage = async (): Promise<boolean> => {
//         const newErrors: { [key: string]: string } = {};

//         switch (page) {
  


//         case 0: // Additional Information
//             if (!attainmentUponGraduation.trim()) newErrors.attainmentUponGraduation = "Required";
//             if (!hasEnrolledSibling.trim()) newErrors.hasEnrolledSibling = "Required";
//             if (!escGrantee.trim()) newErrors.escGrantee = "Required";

//             if (Object.keys(newErrors).length > 0) {
//                 setErrors(newErrors);
//                 toast.error("Please fill in all required fields.");
//                 return false;
//             }

//             if (
//                 siblingName && !/^[a-zA-Z\s'-]+$/.test(siblingName)     
//             ) {
//                 newErrors.siblingName = "invalid";
//                 setErrors(newErrors);
//                 toast.error("Invalid name. Please enter a valid name.");
//                 return false;
//             }

//             if (
//                 hasEnrolledSibling === "Yes" && !/^[a-zA-Z\s'-]+$/.test(siblingName)
//             ) {
//                 newErrors.siblingName = "invalid";
//                 setErrors(newErrors);
//                 toast.error("Enter your valid sibling name.");
//                 return false;
//             }
//         return true;


//         default:
//         return true;
//         }
//     };



//         const handleBirthCertChange = (e: ChangeEvent<HTMLInputElement>) => {
//             const file = e.target.files?.[0];
//             if (file) {
//             setBirthCert(file);
//             }
//         };
//         const handleReportCardChange = (e: ChangeEvent<HTMLInputElement>) => {
//             const file = e.target.files?.[0];
//             if (file) {
//             setReportCard(file);
//             }
//         };
//         const handleGoodMoralChange = (e: ChangeEvent<HTMLInputElement>) => {
//             const file = e.target.files?.[0];
//             if (file) {
//             setGoodMoral(file);
//             }
//         };
//         const handleIdPIcChange = (e: ChangeEvent<HTMLInputElement>) => {
//             const file = e.target.files?.[0];
//             if (file) {
//             setIdPic(file);
//             }
//         };
//         const handleStudentExitFormChange = (e: ChangeEvent<HTMLInputElement>) => {
//             const file = e.target.files?.[0];
//             if (file) {
//             setStudentExitForm(file);
//             }
//         };

//         const handleForm137Change = (e: ChangeEvent<HTMLInputElement>) => {
//             const file = e.target.files?.[0];
//             if (file) {
//             setForm137(file);
//             }
//         };

//         const handleITRChange = (e: ChangeEvent<HTMLInputElement>) => {
//             const file = e.target.files?.[0];
//             if (file) {
//             setITR(file);
//             }
//         };

//         const handleEscCert = (e: ChangeEvent<HTMLInputElement>) => {
//             const file = e.target.files?.[0];
//             if (file) {
//             setEscCert(file);
//             }
//         }
//         const handleProceedAnyway = () => {
//             setShowDiscountWarning(false);
//             setErrors({});
//             if (page < sections.length - 1) setPage(page + 1);
//         };


//         // Refs for input elements
//         const birthCertRef = useRef<HTMLInputElement>(null);
//         const reportCardRef = useRef<HTMLInputElement>(null);
//         const goodMoralRef = useRef<HTMLInputElement>(null);
//         const idPicRef = useRef<HTMLInputElement>(null);
//         const studentExitFormRef = useRef<HTMLInputElement>(null);
//         const form137Ref = useRef<HTMLInputElement>(null);
//         const itrRef = useRef<HTMLInputElement>(null);
//         const escCertRef = useRef<HTMLInputElement>(null);


//         const previewImage = (file: File | null) => {
//         if (!file) return;
//             const reader = new FileReader();
//                 reader.onloadend = () => {
//                     if (typeof reader.result === "string") {
//                     openPreview(reader.result);
//                     }
//                 };
//             reader.readAsDataURL(file);
//         };


     
//         const handlePrev = () => {
//             if (page > 0) setPage(page - 1);
//             setErrors({}); 
//         };

// const handleNext = async () => {
//   if (!(await validatePage())) return;

//   if (page === 1) {
//     let warnings: string[] = [];

//     // 1️⃣ Academic Discount Requirement
//     const requiresReportCard =
//       attainmentUponGraduation === "With Honor" ||
//       attainmentUponGraduation === "With High Honor" ||
//       attainmentUponGraduation === "With Highest Honor";

//     if (requiresReportCard && !reportCard) {
//       warnings.push(
//         "You selected Academic Achievement. Please upload your Report Card to receive the discount; otherwise it would not be applied"      
//     );
//     }

//     // 2️⃣ ESC Discount Requirement
//     if (escGrantee === "Yes" && !escCert) {
//       warnings.push(
//         "You indicated you are an ESC grantee. Please upload your ESC Certificate to receive the discount; otherwise it would not be applied"      
//     );
//     }

//     // ❗ If there's at least one warning → show modal
// if (warnings.length > 0) {
//   setDiscountWarningMessage(warnings); // now an array
//   setShowDiscountWarning(true);
//   return;
// }
//   }

//   // No warnings → continue normally
//   if (page < sections.length - 1) setPage(page + 1);
//   setErrors({});
// };



// const sections = [



//     {
//     title: (
//         <div>
//             <p className="text-[15px] sm:text-lg lg::text-2xl text-dGreen font-bold font-merriweather">
//                 Section 4: Discount Classification
//             </p>
//         </div>
//     ),
//     content: (
//         <main className=" w-full flex flex-col gap-10 px-0 lg:px-10 h-auto mt-2 ">

//             <fieldset className="w-full px-0 sm:px-2 py-2">
//             <legend className="pl-2 ml-0 sm:ml-2   text-[13px] sm:text-[14px] lg:text-[16px] text-dGreen font-semibold border-l-4 rounded-sm border-dGreen font-merriweather"> Discount Details:</legend>
                
//                 <article className="w-full gap-8 flex flex-col shadow-lg py-8 px-2 lg:px-8 bg-gray-100/50 border-2 border-gray-100 rounded-lg mt-3 ">

//                     <section className="flex flex-col sm:flex-row gap-10">
//                         <div className="flex flex-col">
//                             <label className="text-xs lg:text-sm text-dGreen font-semibold">Attainment Upon Graduation <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
//                             <select 
//                                 name="additionalInformation" 
//                                 className={`rounded-sm px-1 w-full sm:w-[190px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
//                                 ${errors.attainmentUponGraduation ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`}
//                                 value={attainmentUponGraduation}
//                                 onChange={(e) => setAttainmentUponGraduation(e.target.value)}
//                             >
//                                 <option value="">Select Option</option>
//                                 <option value="N/a">N/a</option>
//                                 <option value="With Honor">Graduated with Honors</option>
//                                 <option value="With High Honor">Graduated with High Honor</option>
//                                 <option value="With Highest Honor">Graduated with Highest Honor</option>
//                             </select>
//                         </div>


//                         <div className="flex flex-col">
//                             <label className="text-xs lg:text-sm text-dGreen font-semibold">Has enrolled sibling <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
//                             <select 
//                                 name="additionalInformation" 
//                                 className={`rounded-sm px-1 w-full sm:w-[190px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
//                                 ${errors.hasEnrolledSibling ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`}
//                                 value={hasEnrolledSibling}
//                                 onChange={(e) => setHasEnrolledSibling(e.target.value)}
//                                 >
//                                     <option value="">Select Option</option>
//                                     <option value="No">No</option>
//                                     <option value="Yes">Yes</option>
                                    
//                             </select>
//                         </div>

//                         <div className="flex flex-col">
//                             <label className="text-xs lg:text-sm text-dGreen font-semibold">Sibling&apos;s Full Name:</label>
//                             <input 
//                                 type="text" 
//                                 placeholder="Blue Kirigaya"
//                                 className={`rounded-sm px-1 w-full sm:w-[190px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
//                                 ${errors.siblingName ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`}
//                                 disabled={hasEnrolledSibling !== 'Yes'}
//                                 value={siblingName}
//                                 onChange={(e) => setSiblingName(e.target.value)}
//                             />
//                         </div>
//                     </section>

//                     <section className="flex flex-col sm:flex-row gap-10">

//                         <div className="flex flex-col">
//                             <label className="text-xs lg:text-sm text-dGreen font-semibold">Already an ESC Grantee?<strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
//                             <select 
//                                 name="escGrantee    " 
//                                 className={`rounded-sm px-1 w-full sm:w-[190px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
//                                 ${errors.escGrantee ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`}
//                                 value={escGrantee}
//                                 onChange={(e) => setEscGrantee(e.target.value)}
//                                 >
//                                     <option value="">Select Option</option>
//                                     <option value="No">No</option>
//                                     <option value="Yes">Yes</option>
                                    
//                             </select>
//                         </div>

//                     </section>

//                 </article>
//             </fieldset>
//         </main>
//         ),
//     },

//     {
//     title: (
//         <div>
//             <p className="text-[15px] sm:text-lg lg::text-2xl text-dGreen font-bold font-merriweather">
//                 Section 5: Documents Submission 
//             </p>
//         </div>
//     ),
//     content: (
//         <main className=" w-full flex flex-col gap-10 px-0 lg:px-10 h-auto mt-2 ">

//             <section className="w-full gap-4 flex flex-col shadow-lg py-8 px-2 lg:px-8 bg-red-100/50 border-2 border-red-100 text-red-900 rounded-lg mt-3">
//                 <p><strong>NOTE: </strong> 
//                     Uploading scanned copies of your documents is optional. 
//                     But if you would like to be considered for academic discounts, please upload a scanned copy of your Report Card.
//                     If you are a transferee and already an ESC grantee, do not forget to upload a scanned copy of your ESC Certificate too.
//                 </p>
//             </section>

//             <section className="w-full px-0 sm:px-2 py-2">

//                 <span className="pl-2 ml-0 sm:ml-2 text-[13px] sm:text-[14px] lg:text-[16px] text-dGreen font-semibold border-l-4 rounded-sm border-dGreen font-merriweather"> Identity & Financial Documents   :</span>
//                 <div className="w-full gap-4 flex flex-col shadow-lg py-8 px-2 lg:px-8 bg-gray-100/50 border-2 border-gray-100 rounded-lg mt-3 ">


//                     <section className="flex flex-col sm:flex-row gap-8">
//                         <div className="flex flex-col">
//                             <span className="text-xs lg:text-sm text-dGreen font-semibold">Birth Certificate </span>
//                             <PreviewModal />
//                             {birthCert ? (
//                             <div 
//                                 className="flex flex-col gap-1 w-full sm:w-[190px] lg:w-[320px]"
//                                 key="birthcert_preview"
//                             >
//                                 <div className="flex flex-row items-center gap-2">
//                                     <button
//                                         type="button"
//                                         onClick={() => previewImage(birthCert)}
//                                         className="w-full sm:w-[180px] lg:w-[320px] py-[6px] border-2 border-dGreen bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition flex-1 text-left truncate p-"
//                                         title="Click to preview"
//                                         >
//                                         {birthCert.name}
//                                     </button>
//                                     <button
//                                         type="button"
//                                         onClick={() => {
//                                         setBirthCert(null);
//                                         if (birthCertRef.current) birthCertRef.current.value = "";}}
//                                         className="text-red-500 hover:text-red-700 font-bold"
//                                         title="Remove file"
//                                         >
//                                             ✕
//                                     </button>
//                                 </div>
//                             </div>
                            
//                             ) : (
//                             <div 
//                                 className="flex flex-col gap-1 "
//                                 key="birthcert_upload"
//                             >
//                                 <input
//                                     type="file"
//                                     ref={birthCertRef}
//                                     accept="image/*"
//                                     onChange={handleBirthCertChange}
//                                     name="document"
//                                     className="rounded-sm px-1 w-full sm:w-[200px] lg:w-[320px] py-[6px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
//                                 />
//                             </div>
//                             )}
//                         </div>

//                         <div className="flex flex-col">
//                             <span className="text-xs lg:text-sm text-dGreen font-semibold">id picture </span>
//                             {idPic ? (
//                             <div 
//                                 className="flex flex-col gap-1 w-full sm:w-[190px] lg:w-[320px]"
//                                 key="idpic_preview"
//                             >
//                                 <div className="flex flex-row items-center gap-2">
//                                     <button
//                                         type="button"
//                                         onClick={() => previewImage(idPic)}
//                                         className="w-full sm:w-[180px] lg:w-[320px] py-[6px] border-2 border-dGreen bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition flex-1 text-left truncate p-"
//                                         title="Click to preview"
//                                         >
//                                         {idPic.name}
//                                     </button>
//                                     <button
//                                         type="button"
//                                         onClick={() => {
//                                         setIdPic(null);
//                                         if (idPicRef.current) idPicRef.current.value = "";}}
//                                         className="text-red-500 hover:text-red-700 font-bold"
//                                         title="Remove file"
//                                         >
//                                             ✕
//                                     </button>
//                                 </div>
//                             </div>
                            
//                             ) : (
//                             <div 
//                                 className="flex flex-col gap-1 "
//                                 key="idpic_upload"
//                             >
//                                 <input
//                                     type="file"
//                                     ref={idPicRef}
//                                     accept="image/*"
//                                     onChange={handleIdPIcChange}
//                                     name="document"
//                                     className="rounded-sm px-1 w-full sm:w-[200px] lg:w-[320px] py-[6px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
//                                 />
//                             </div>
//                             )}
//                         </div>
                            
//                         <div className="flex flex-col">
//                             <span className="text-xs lg:text-sm text-dGreen font-semibold">Parent&apos;s Income Tax Return (for incoming G7)</span>
//                             {itr ? (
//                             <div 
//                                 className="flex flex-col gap-1 w-full sm:w-[190px] lg:w-[320px]"
//                                 key="itr_preview"
//                             >
//                                 <div className="flex flex-row items-center gap-2">
//                                     <button
//                                         type="button"
//                                         onClick={() => previewImage(itr)}
//                                         className="w-full sm:w-[180px] lg:w-[320px] py-[6px] border-2 border-dGreen bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition flex-1 text-left truncate p-"
//                                         title="Click to preview"
//                                         >
//                                         {itr.name}
//                                     </button>
//                                     <button
//                                         type="button"
//                                         onClick={() => {
//                                         setIdPic(null);
//                                         if (itrRef.current) itrRef.current.value = "";}}
//                                         className="text-red-500 hover:text-red-700 font-bold"
//                                         title="Remove file"
//                                         >
//                                             ✕
//                                     </button>
//                                 </div>
//                             </div>
                            
//                             ) : (
//                             <div 
//                                 className="flex flex-col gap-1 "
//                                 key="itr_preview"
//                             >
//                                 <input
//                                     type="file"
//                                     ref={itrRef}
//                                     accept="image/*"
//                                     onChange={handleITRChange}
//                                     name="document"
//                                     className="rounded-sm px-1 w-full sm:w-[200px] lg:w-[320px] py-[6px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
//                                 />
//                             </div>
//                             )}
//                         </div>
                        
//                     </section>

//                 </div>
//             </section>

//             <section className="w-full px-0 sm:px-2 py-2">

//                 <span className="pl-2 ml-0 sm:ml-2 text-[13px] sm:text-[14px] lg:text-[16px] text-dGreen font-semibold border-l-4 rounded-sm border-dGreen font-merriweather"> Academic Records:</span>
//                 <div className="w-full gap-4 flex flex-col shadow-lg py-8 px-2 lg:px-8 bg-gray-100/50 border-2 border-gray-100 rounded-lg mt-3 ">

//                     <section className="flex flex-col gap-8">
//                         <div className="flex flex-col sm:flex-row gap-8">
//                         <div className="flex flex-col">
//                             <span className="text-xs lg:text-sm text-dGreen font-semibold">Report Card </span>
//                             {reportCard ? (
//                             <div 
//                                 className="flex flex-col gap-1 w-full sm:w-[190px] lg:w-[320px]"
//                                 key="reportcard_preview"
//                             >
//                                 <div className="flex flex-row items-center gap-2">
//                                     <button
//                                         type="button"
//                                         onClick={() => previewImage(reportCard)}
//                                         className="w-full sm:w-[180px] lg:w-[320px] py-[6px] border-2 border-dGreen bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition flex-1 text-left truncate p-"
//                                         title="Click to preview"
//                                         >
//                                         {reportCard.name}
//                                     </button>
//                                     <button
//                                         type="button"
//                                         onClick={() => {
//                                         setReportCard(null);
//                                         if (reportCardRef.current) reportCardRef.current.value = "";}}
//                                         className="text-red-500 hover:text-red-700 font-bold"
//                                         title="Remove file"
//                                         >
//                                             ✕
//                                     </button>
//                                 </div>
//                             </div>
                            
//                             ) : (
//                             <div 
//                                 className="flex flex-col gap-1 "
//                                 key="reportcard_upload"
//                             >
//                                 <input
//                                     type="file"
//                                     ref={reportCardRef}
//                                     accept="image/*"
//                                     onChange={handleReportCardChange}
//                                     name="document"
//                                     className="rounded-sm px-1 w-full sm:w-[200px] lg:w-[320px] py-[6px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
//                                 />
//                             </div>
//                             )}
//                         </div>

//                         <div className="flex flex-col">
//                             <span className="text-xs lg:text-sm text-dGreen font-semibold">Form 137 </span>
//                             {form137 ? (
//                             <div 
//                                 className="flex flex-col gap-1 w-full sm:w-[190px] lg:w-[320px]"
//                                 key="form137_preview"
//                             >
//                                 <div className="flex flex-row items-center gap-2">
//                                     <button
//                                         type="button"
//                                         onClick={() => previewImage(form137)}
//                                         className="w-full sm:w-[180px] lg:w-[320px] py-[6px] border-2 border-dGreen bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition flex-1 text-left truncate p-"
//                                         title="Click to preview"
//                                         >
//                                         {form137.name}
//                                     </button>
//                                     <button
//                                         type="button"
//                                         onClick={() => {
//                                         setForm137(null);
//                                         if (form137Ref.current) form137Ref.current.value = "";}}
//                                         className="text-red-500 hover:text-red-700 font-bold"
//                                         title="Remove file"
//                                         >
//                                             ✕
//                                     </button>
//                                 </div>
//                             </div>
                            
//                             ) : (
//                             <div 
//                                 className="flex flex-col gap-1 "
//                                 key="form137_upload"
//                             >
//                                 <input
//                                     type="file"
//                                     ref={form137Ref}
//                                     accept="image/*"
//                                     onChange={handleForm137Change}
//                                     name="document"
//                                     className="rounded-sm px-1 w-full sm:w-[200px] lg:w-[320px] py-[6px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
//                                 />
//                             </div>
//                             )}
//                         </div>

//                         <div className="flex flex-col">
//                             <span className="text-xs lg:text-sm text-dGreen font-semibold">Good Moral </span>
//                             {goodMoral ? (
//                             <div 
//                                 className="flex flex-col gap-1 w-full sm:w-[190px] lg:w-[320px]"
//                                 key="goodmoral_preview"
//                             >
//                                 <div className="flex flex-row items-center gap-2">
//                                     <button
//                                         type="button"
//                                         onClick={() => previewImage(goodMoral)}
//                                         className="w-full sm:w-[180px] lg:w-[320px] py-[6px] border-2 border-dGreen bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition flex-1 text-left truncate p-"
//                                         title="Click to preview"
//                                         >
//                                         {goodMoral.name}
//                                     </button>
//                                     <button
//                                         type="button"
//                                         onClick={() => {
//                                         setGoodMoral(null);
//                                         if (goodMoralRef.current) goodMoralRef.current.value = "";}}
//                                         className="text-red-500 hover:text-red-700 font-bold"
//                                         title="Remove file"
//                                         >
//                                             ✕
//                                     </button>
//                                 </div>
//                             </div>
                            
//                             ) : (
//                             <div 
//                                 className="flex flex-col gap-1 "
//                                 key="goodmoral_upload"
//                             >
//                                 <input
//                                     type="file"
//                                     ref={goodMoralRef}
//                                     accept="image/*"
//                                     onChange={handleGoodMoralChange}
//                                     name="document"
//                                     className="rounded-sm px-1 w-full sm:w-[200px] lg:w-[320px] py-[6px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
//                                 />
//                             </div>
//                             )}
//                         </div>
//                         </div>

//                         <div className="flex flex-col sm:flex-row gap-8">
//                         <div className="flex flex-col">
//                             <span className="text-xs lg:text-sm text-dGreen font-semibold">CAPRISSA (if private) </span>
//                             {studentExitForm ? (
//                             <div 
//                                 className="flex flex-col gap-1 w-full sm:w-[190px] lg:w-[320px]"
//                                 key="student_exit_preview"
//                             >
//                                 <div className="flex flex-row items-center gap-2">
//                                     <button
//                                         type="button"
//                                         onClick={() => previewImage(studentExitForm)}
//                                         className="w-[180px] sm:w-[320px] py-[6px] border-2 border-dGreen bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition flex-1 text-left truncate p-"
//                                         title="Click to preview"
//                                         >
//                                         {studentExitForm.name}
//                                     </button>
//                                     <button
//                                         type="button"
//                                         onClick={() => {
//                                         setStudentExitForm(null);
//                                         if (studentExitFormRef.current) studentExitFormRef.current.value = "";}}
//                                         className="text-red-500 hover:text-red-700 font-bold"
//                                         title="Remove file"
//                                         >
//                                             ✕
//                                     </button>
//                                 </div>
//                             </div>
                            
//                             ) : (
//                             <div 
//                                 className="flex flex-col gap-1 "
//                                 key="student_exit_upload"
//                             >
//                                 <input
//                                     type="file"
//                                     ref={studentExitFormRef}
//                                     accept="image/*"
//                                     onChange={handleStudentExitFormChange}
//                                     name="document"
//                                     className="rounded-sm px-1 w-full sm:w-[200px] lg:w-[320px] py-[6px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
//                                 />
//                             </div>
//                             )}
//                         </div>

//                         <div className="flex flex-col">
//                             <span className="text-xs lg:text-sm text-dGreen font-semibold">ESC Certificate (if transferee & prev ESC grantee) </span>
//                             {escCert ? (
//                             <div 
//                                 className="flex flex-col gap-1 w-full sm:w-[190px] lg:w-[320px]"
//                                 key="student_exit_preview"
//                             >
//                                 <div className="flex flex-row items-center gap-2">
//                                     <button
//                                         type="button"
//                                         onClick={() => previewImage(escCert)}
//                                         className="w-[180px] sm:w-[320px] py-[6px] border-2 border-dGreen bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition flex-1 text-left truncate p-"
//                                         title="Click to preview"
//                                         >
//                                         {escCert.name}
//                                     </button>
//                                     <button
//                                         type="button"
//                                         onClick={() => {
//                                         setEscCert(null);
//                                         if (escCertRef.current) escCertRef.current.value = "";}}
//                                         className="text-red-500 hover:text-red-700 font-bold"
//                                         title="Remove file"
//                                         >
//                                             ✕
//                                     </button>
//                                 </div>
//                             </div>
                            
//                             ) : (
//                             <div 
//                                 className="flex flex-col gap-1 "
//                                 key="student_exit_upload"
//                             >
//                                 <input
//                                     type="file"
//                                     ref={escCertRef}
//                                     accept="image/*"
//                                     onChange={handleEscCert}
//                                     name="document"
//                                     className="rounded-sm px-1 w-full sm:w-[200px] lg:w-[320px] py-[6px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
//                                 />
//                             </div>
//                             )}
//                         </div>
//                         </div>
                        
//                     </section>
//                 </div>

//             </section>


            
//         </main>
//     ),
//     },
//       { 
//         title: (
//             <div>
//                 <p className="text-[15px] sm:text-lg lg::text-2xl text-dGreen font-bold font-merriweather">
//                     Section 7: Application Submission
//                 </p>
//             </div>
//         ),
//         content: (
//         <main className="w-full mt-10 flex flex-col items-center justify-center px-0 sm:px-4">
//         <section className="bg-white/90 rounded-2xl shadow-xl border border-green-200 w-full grid grid-cols-1 md:grid-cols-2 items-center mb-8">
//             {/* Reminder Box */}
//             <div className="mb-2 flex flex-col items-center px-4 sm:px-6 py-8 md:px-10 md:py-10">
//             <div className="flex items-center gap-2 mb-2">
//                 <svg
//                 className="w-6 h-6 md:w-7 md:h-7 text-yellow-500"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//                 >
//                 <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
//                 />
//                 </svg>
//                 <span className="text-xl md:text-2xl font-bold text-dGreen font-merriweather">
//                 Reminder
//                 </span>
//             </div>
//             <ul className="text-left text-d2Green text-sm md:text-base lg:text-lg font-medium space-y-2 pl-0 sm:pl-2">
//                 <li className="flex items-start gap-2">
//                 <span className="mt-1">•</span> Ensure that all the information you have provided is correct.
//                 </li>
//                 <li className="">
//                 <span className="mt-1">•</span> You can only
//                 <span className="pl-2 font-semibold text-yellow-700">submit the application once</span>.
//                 </li>
//                 <li className="">
//                 <span className="mt-1">•</span> All documents must be{" "}
//                 <span className="pl-2 font-semibold text-blue-700">submitted in person</span>.
//                 </li>
//                 <li className="2">
//                 <span className="mt-1">•</span> Check your
//                 <span className="pl-2 font-semibold text-purple-700">email inbox</span> for updates.
//                 </li>
//             </ul>
//             </div>

//             {/* Congratulations Box */}
//             <div className="h-full bg-gradient-to-r from-lGreen to-dGreen rounded-b-2xl md:rounded-r-2xl md:rounded-b-none flex flex-col items-center justify-center px-6 py-8 md:px-8 md:py-10 shadow-md">
//             <div className="flex flex-col items-center gap-2 mb-4">
//                 <span className="text-2xl md:text-3xl font-bold text-white font-merriweather drop-shadow">
//                 Congratulations!
//                 </span>
//             </div>
//             <p className="text-lg md:text-2xl font-semibold mb-2 text-center tracking-wide text-white">
//                 Your application is almost complete!
//             </p>
//             <p className="text-sm md:text-base lg:text-lg text-center opacity-80 text-white">
//                 Thank you for choosing Rizal Institute. We look forward to seeing you thrive and grow with us!
//             </p>
//             </div>
//         </section>

//         {/* Submit Button */}
//         <Button
//             variant="mainButton"
//             disabled={isSubmitting}
//             className="px-10 py-3 sm:px-[50px] sm:py-5 rounded-xl bg-gradient-to-r from-lGreen to-dGreen text-white font-bold shadow-lg hover:scale-105 hover:from-green-400 hover:to-green-700 transition-all duration-200 disabled:opacity-60"
//         >
//             {isSubmitting ? "Submitting..." : "Submit"}
//         </Button>
//         </main>

//         ),
//     },
  

// ];

//     return (
//         <main className="min-h-[600px] w-full mt-2 p-5 flex flex-col">
//             <div className="h-full w-full ">
//                 <section className="w-full text-center">
//                     <p className="mt-[20px] text-xl sm:text-2xl lg:text-4xl text-dGreen font-bold font-merriweather">
//                         Junior High School Application
//                     </p>
//                 </section>

//                 {/* content */}
//                 <div className="w-full flex-1 mt-[40px] md:mt-[60px] lg:mt-[80px] px-[5px] lg:px-[70px] flex flex-col gap-3 ">
//                     {sections[page].title}
//                     <hr className="border-b-2 border-dGreen w-full" />
//                     {sections[page].content}
//                 </div>

//                 {/* buttona */}
//                 <div className="w-full flex justify-center gap-5 md:gap-10 mt-[50px]">
//                     <Button
//                         variant="prevButton"
//                         className="w-[65px] md:w-[100px] h-[40px] rounded-xl"
//                         onClick={handlePrev}
//                         disabled={page === 0}
//                     >
//                         Previous
//                     </Button>
//                     <span className="text-xs md:text-sm text-gray-600 self-center">
//                         Page {page + 1} of {sections.length}
//                     </span>
//                     <Button
//                         variant="prevButton"
//                         className="w-[65px] md:w-[100px] h-[40px] rounded-xl"
//                         onClick={handleNext}
//                         disabled={page === sections.length - 1}
//                     >
//                         Next
//                     </Button>
//                 </div>

// <DiscountWarningModal
//   open={showDiscountWarning}
//   onClose={() => setShowDiscountWarning(false)}
//   onProceed={handleProceedAnyway}
//   messages={discountWarningMessage}
// />


//             </div>
//         </main>
//     );
// };

// export default ApplicationPage;