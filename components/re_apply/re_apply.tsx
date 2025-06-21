// "use client";

// import { useEffect, useState } from "react";
// // import { getStudentDataByTrackingId, updateStudentData } from "@/src/actions/serverActions";
// import { useRouter, useSearchParams } from "next/navigation";
// import { toast } from "sonner";
// import Link from "next/link";

// const ReApplyContent = () => {
//     // const { trackingId } = useReApplyStore();

//     const searchParams = useSearchParams();
//     const trackingId = searchParams.get("trackingId");
//     const router = useRouter();

    
//     // Individual state for each field
//     //student information table
//     const [studentsFirstName, setStudentsFirstName] = useState("");
//     const [studentsMiddleName, setStudentsMiddleName] = useState("");
//     const [studentsLastName, setStudentsLastName] = useState("");
//     const [studentsSuffix, setStudentsSuffix] = useState("");
//     const [lrn, setLrn] = useState("");
//     const [dateOfBirth, setDateOfBirth] = useState("");
//     const [age, setAge] = useState("");
//     const [gender, setGender] = useState("");
//     const [civilStatus, setCivilStatus] = useState("");
//     const [nationality, setNationality] = useState("");
//     const [religion, setReligion] = useState("");

//     const [guardiansFirstName, setGuardiansFirstName] = useState("");
//     const [guardiansMiddleName, setGuardiansMiddleName] = useState("");
//     const [guardiansLastName, setGuardiansLastName] = useState("");
//     const [guardiansSuffix, setGuardiansSuffix] = useState("");
//     const [fullAddress, setFullAddress] = useState("");
//     const [mobileNumber, setMobileNumber] = useState("");
//     const [email, setEmail] = useState("");

//     const [admissionStatus, setAdmissionStatus] = useState("");
//     const [prevSchool, setPrevSchool] = useState("");
//     const [schoolAddress, setSchoolAddress] = useState("");
//     const [schoolType, setSchoolType] = useState("");
//     const [gradeLevel, setGradeLevel] = useState("");
//     const [schoolYear, setSchoolYear] = useState("");

//     const [birthCert, setBirthCert] =  useState<File | null>(null);
//     const [reportCard, setReportCard] = useState<File | null>(null);
//     const [goodMoral, setGoodMoral] = useState<File | null>(null);
//     const [idPic, setIdPic] = useState<File | null>(null);
//     const [studentExitForm, setStudentExitForm] = useState<File | null>(null);

//     const [localTrackingId, setLocalTrackingId] = useState<string | null>(null);
//     const [applicationStatus, setApplicationStatus] = useState<string | null>(null);

//     const years = Array.from({ length: 4 }, (_, i) => new Date().getFullYear() - i - 1);

//     useEffect(() => {
//         if (trackingId) {
        
//             setLocalTrackingId(trackingId);
//             const fetchStudentData = async () => {
//                 try {
//                     const data = await getStudentDataByTrackingId(trackingId);
//                     // Set state with fetched data

//                     // studentInformationTable
//                     setStudentsFirstName(data.studentsFirstName || "");
//                     setStudentsMiddleName(data.studentsMiddleName || "");
//                     setStudentsLastName(data.studentsLastName || "");
//                     setStudentsSuffix(data.studentsSuffix || "");
//                     setLrn(data.lrn || "");
//                     setDateOfBirth(data.dateOfBirth || "");
//                     setAge(data.age.toString() || "");
//                     setGender(data.gender || "");
//                     setCivilStatus(data.civilStatus || "");
//                     setNationality(data.nationality || "");
//                     setReligion(data.religion || "");

//                     setGuardiansFirstName(data.guardiansFirstName || "");
//                     setGuardiansMiddleName(data.guardiansMiddleName || "");
//                     setGuardiansLastName(data.guardiansLastName || "");
//                     setGuardiansSuffix(data.guardiansSuffix || "");
//                     setFullAddress(data.fullAddress || "");
//                     setMobileNumber(data.mobileNumber || "");
//                     setEmail(data.email || "");

//                     setAdmissionStatus(data.admissionStatus || "");
//                     setPrevSchool(data.prevSchool || "");
//                     setSchoolAddress(data.schoolAddress || "");
//                     setSchoolType(data.schoolType || "");
//                     setGradeLevel(data.gradeLevel || "");
//                     setSchoolYear(data.schoolYear || "");   

                
//                       // Fetch image and convert to File
//                       const urlToFile = async (url: string, filename: string) => {
//                         if (!url) return null;
//                         const response = await fetch(url);
//                         const blob = await response.blob();
//                         return new File([blob], filename, { type: blob.type });
//                     };

//                     setBirthCert(await urlToFile(data.birthCert, "birthCert"));
//                     setReportCard(await urlToFile(data.reportCard, "reportCard"));
//                     setGoodMoral(await urlToFile(data.goodMoral, "goodMoral"));
//                     setIdPic(await urlToFile(data.idPic, "idPic"));
//                     setStudentExitForm(data.studentExitForm ? await urlToFile(data.studentExitForm, "studentExitForm") : null);
                    
//                 } catch (error) {
//                     console.error("Error fetching student data:", error);
//                 }
//             };
//             fetchStudentData();
//         }
//     }, [trackingId]);


    

//     // if (!trackingId) return <p className="text-center text-red-500">No tracking ID found.</p>;
//     // if (!trackingId) {
//     //     useEffect(() => {
//     //       router.push('/');
//     //     }, []);
//     //     return <p className="text-center text-red-500">No tracking ID found.</p>;
//     //   }

//     useEffect(() => {
//         if (!trackingId) {
//           router.push('/');
//         }
//       }, [trackingId, router]);
      
//       if (!trackingId) {
//         return <p className="text-center text-red-500">No tracking ID found.</p>;
//       }

    



//     const handleUpdate = async () => {

//           // functions for validation below
//           function validateMinDate( birthofDate: Date ) {
//             const today = new Date();
//             const minDate = new Date(today.getFullYear() - 6, today.getMonth(), today.getDate());
//             const date = new Date(birthofDate);
        
//             return date <= minDate;
//         }

//         function validateNotInFuture(birthofDate: Date) {
//             const today = new Date();
//             const date = new Date(birthofDate);

//             return date <= today;
//         }

//         function validateEmail( email:string ) {
//             const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//             return re.test(email);
//          }
        
    


//          //validation for section 1
        
//              // validate students lastname
//              if ( studentsLastName !== "" && !/^[a-zA-Z]+$/.test(studentsLastName) || studentsLastName.length < 2 || studentsLastName.length > 50 ) {
//                 toast.error("Invalid students Lastname format. Please enter a valid Lastname.");
//                 return;
//             }
        
//             // validate students firstname
//             if (!/^[a-zA-Z]+$/.test(studentsFirstName) || studentsFirstName.length < 2 || studentsFirstName.length > 50) {
//                 toast.error("Invalid students Firstname format. Please enter a valid Firstname.");
//                 return;
//             }
        
//             // validate students middlename
//             if (!/^[a-zA-Z]+$/.test(studentsMiddleName) || studentsMiddleName.length < 2 || studentsMiddleName.length > 50) {
//                 toast.error("Invalid students Middlename format. Please enter a valid Middlename.");
//                 return;
//             }
        
//             // validate students suffix
//             if (studentsSuffix && (!/^[a-zA-Z]+$/.test(studentsSuffix) || studentsSuffix.length < 1 || studentsSuffix.length > 10)) {
//                 toast.error("Invalid students Suffix format. Please enter a valid Suffix.");
//                 return;
//             }
            
//             if (!validateNotInFuture(new Date(dateOfBirth))) {
//                 toast.error("Date of birth cannot be in the future.");
//                 return;
//             }   
        
//             // validate the date of birth
//             if(!validateMinDate(new Date(dateOfBirth))){
//                 toast.error("The minimum threshold for age is 6 years.");
//                 return;
//             }

        
//         //validation for section 2
//              // validate students guardians lastname
//              if (!/^[a-zA-Z]+$/.test(guardiansLastName) || guardiansLastName.length < 2 || guardiansLastName.length > 50 ) {
//                 toast.error("Invalid parent/guardians Lastname format. Please enter a valid Lastname.");
//                 return;
//             }
        
//             // validate guardians firstname
//             if (!/^[a-zA-Z]+$/.test(guardiansFirstName) || guardiansFirstName.length < 2 || guardiansFirstName.length > 50) {
//                 toast.error("Invalid parent/guardians Firstname format. Please enter a valid Firstname.");
//                 return;
//             }
        
//             // validate guardians middlename
//             if (!/^[a-zA-Z]+$/.test(guardiansMiddleName) || guardiansMiddleName.length < 2 || guardiansMiddleName.length > 50) {
//                 toast.error("Invalid parent/guardians Middlename format. Please enter a valid Middlename.");
//                 return;
//             }
        
//             // validate guardians suffix
//             if (guardiansSuffix && (!/^[a-zA-Z]+$/.test(guardiansSuffix) || guardiansSuffix.length < 1 || guardiansSuffix.length > 10)) {
//                 toast.error("Invalid parent/guardians Suffix format. Please enter a valid Suffix.");
//                 return;
//             }
        
//             if (fullAddress.length > 10) {
//                 toast.error("Invalid address format. Please enter a valid address.");
//                 return;
//             }
        
        
//             if (!/^(09)\d{9}$/.test(mobileNumber)) {
//                 toast.error("Invalid mobile number format. Please enter a valid mobile number.");
//                 return;
//             }
        
//             if (!validateEmail(email)) {
//                 toast.error("Invalid email format. Please enter a valid email.");
//                 return;
//             }
        
//             //validation for section 3
        
//             if (prevSchool.length > 16) {
//                 toast.error("Please enter a valid school name.");
//                 return;
//             }
        
//             if (schoolAddress.length > 10) {
//                 toast.error("Invalid address format. Please enter a valid address.");
//                 return;
//             }
//             // validate LRN
//             const isLRNValid =  /^\d{12}$/;
//             if (!isLRNValid.test(lrn)) {
//                 toast.error("Invalid LRN format. Please enter a valid 12-digit LRN.");
//                 return;
//             }
        


//             //api call
//             const response = await fetch('/api/re_application', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ localTrackingId, applicationStatus, email }),
//               });
//             const data = await response.json();
      
//             // Ensure these properties exist in your API response
//             setLocalTrackingId(data.trackingId);
//             setApplicationStatus(data.applicationStatus);
            

//         const uploadImage = async (file: File, folder: string) => {
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

//         const updatedData = {
//             studentsFirstName,
//             studentsMiddleName,
//             studentsLastName,
//             studentsSuffix,
//             lrn,
//             dateOfBirth,
//             age: parseInt(age),
//             gender,
//             civilStatus,
//             nationality,
//             religion,

//             guardiansFirstName,
//             guardiansMiddleName,
//             guardiansLastName,
//             guardiansSuffix,
//             fullAddress,
//             mobileNumber,
//             email,

//             admissionStatus,
//             prevSchool,
//             schoolAddress,
//             schoolType,
//             gradeLevel,
//             schoolYear,

//             birthCert: uploadBirthCert,
//             reportCard: uploadReportCard,
//             goodMoral: uploadGoodMoral,
//             idPic: uploadIdPic,
//             studentExitForm: uploadStudentExitForm,
//         };





//         try {
//             const updatedStudent = await updateStudentData(lrn, updatedData);
//             console.log("Student updated successfully:", updatedStudent);
//             // Optionally, you can show a success message or redirect to another page
//             toast.success("Student Reapplied successfully.");
//             router.push("/");
//         } catch (error) {
//             console.error("Failed to update student data:", error);
//         }
//     };


//     return (
//         <div className="w-full min-h-screen flex flex-col px-10 pt-5">
//            <Link href="/">home</Link> 
//           <p className="text-2xl font-bold font-oswald text-center text-dGreen">
//             Re:Application for Enrollment in Rizal Institute - Canlubang
//           </p>

//         {/* first scetion */}
//         <div className=" flex flex-col mt-10 mb-5">
//             <p className="text-2xl font-bold font-oswald text-dGreen">
//                 Section 1: Personal Information
//             </p>
//             <hr className="border-2 border-dGreen"/>

//             {/* first row */}
//             <div className="flex flex-row mt-8 gap-10">
//                 <div className="flex flex-row items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[110px]">Last Name:</label>
//                     <input
//                         type="text"
//                         value={studentsLastName}
//                         onChange={(e) => setStudentsLastName(e.target.value)}
//                         className="w-[200px] p-2 border rounded-md bg-gray-200"
//                     />
//                 </div>

//                 <div className="flex flex-row items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[110px]">First Name:</label>
//                     <input
//                         type="text"
//                         value={studentsFirstName}
//                         onChange={(e) => setStudentsFirstName(e.target.value)}
//                         className="w-[200px] p-2 border rounded-md bg-gray-200"
//                     />
//                 </div>

//                 <div className="flex flex-row items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[140px]">Middle Name:</label>
//                     <input
//                         type="text"
//                         value={studentsMiddleName}
//                         onChange={(e) => setStudentsMiddleName(e.target.value)}
//                         className="w-[200px] p-2 border rounded-md bg-gray-200"
//                     />
//                 </div>

//                 <div className="flex flex-row items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[60px]">Suffix:</label>
//                     <input
//                         type="text"
//                         value={studentsSuffix}
//                         onChange={(e) => setStudentsSuffix(e.target.value)}
//                         className="w-[200px] p-2 border rounded-md bg-gray-200"
//                     />
//                 </div>
//             </div>

//             {/* second row */}
//             <div className="flex flex-row mt-6 gap-10">
//                 <div className="flex flex-row items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[130px]">Date of Birth:</label>
//                     <input
//                         type="date"
//                         value={dateOfBirth}
//                         onChange={(e) => {
//                             const dob = new Date(e.target.value);
//                             const today = new Date();
//                             const calculatedAge = today.getFullYear() - dob.getFullYear();
                            
//                             setDateOfBirth(e.target.value);
//                             setAge(calculatedAge.toString());
//                         }}
//                         className="w-[200px] p-2 border rounded-md bg-gray-200"
//                     />
//                 </div>

//                 <div className="flex flex-row items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[50px]">Age:</label>
//                     <input
//                         type="number"
//                         value={age}
//                         onChange={(e) => setAge(e.target.value)}
//                         readOnly
//                         className="w-[200px] p-2 border rounded-md bg-gray-200"
//                     />
//                 </div>

//                 <div className="flex flex-row items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[90px]">Gender:</label>
//                     <select
//                         value={gender}
//                         onChange={(e) => setGender(e.target.value)}
//                         className="w-[200px] p-2 border rounded-md bg-gray-200"
//                     >
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                     </select>
//                 </div>
//             </div>

//             {/* third row */}
//             <div className="flex flex-row mt-6 gap-10">
//                 <div className="flex flex-row items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[100px]">civilstatus:</label>
//                     <input
//                         type="text"
//                         value={civilStatus}
//                         onChange={(e) => setCivilStatus(e.target.value)}
//                         className="w-[200px] p-2 border rounded-md bg-gray-200"
//                     />
//                 </div>

//                 <div className="flex flex-row items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[115px]">Nationality:</label>
//                     <input
//                         type="text"
//                         value={nationality}
//                         onChange={(e) => setNationality(e.target.value)}
//                         className="w-[200px] p-2 border rounded-md bg-gray-200"
//                     />
//                 </div>

//                 <div className="flex flex-row items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[90px]">Religion:</label>
//                     <input
//                         type="text"
//                         value={religion}
//                         onChange={(e) => setReligion(e.target.value)}
//                         className="w-[200px] p-2 border rounded-md bg-gray-200"
//                     />
//                 </div>
//             </div>
//         </div>
//         {/* end of first scetion */}


//  {/* second scetion */}
//  <div className=" flex flex-col mt-10 mb-5">
//             <p className="text-2xl font-bold font-oswald text-dGreen">
//                 Section 2: Contact & Guardian Details
//             </p>
//             <hr className="border-2 border-dGreen"/>

//             {/* first row */}
//             <div className="flex mt-8 gap-10">
//                 <div className="flex flex-row items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[150px]">Full Address:</label>
//                     <input
//                         type="text"
//                         value={fullAddress}
//                         onChange={(e) => setFullAddress(e.target.value)}
//                         className="w-[500px] p-2 border rounded-md bg-gray-200"
//                     />
//                 </div>
//             </div>

//             {/* second row */}
//             <div className="flex flex-row mt-6 gap-10">

//                 <div className="flex flex-row items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[170px]">Mobile Number:</label>
//                     <input
//                         type="number"
//                         value={mobileNumber}
//                         onChange={(e) => setMobileNumber(e.target.value)}
//                         className="w-[200px] p-2 border rounded-md bg-gray-200"
//                     />
//                 </div>

//                 <div className="flex flex-row items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[70px]">Email:</label>
//                     <input
//                         type="text"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="w-[250px] p-2 border rounded-md bg-gray-200"
//                     />
//                 </div>
//             </div>

//             {/* third row */}
//             <div className="flex flex-row mt-6 gap-10">
//                 <div className="flex flex-row items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[110px]">Last Name:</label>
//                     <input
//                         type="text"
//                         value={guardiansLastName}
//                         onChange={(e) => setGuardiansLastName(e.target.value)}
//                         className="w-[200px] p-2 border rounded-md bg-gray-200"
//                     />
//                 </div>

//                 <div className="flex flex-row items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[110px]">First Name:</label>
//                     <input
//                         type="text"
//                         value={guardiansFirstName}
//                         onChange={(e) => setGuardiansFirstName(e.target.value)}
//                         className="w-[200px] p-2 border rounded-md bg-gray-200"
//                     />
//                 </div>

//                 <div className="flex flex-row items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[140px]">Middle Name:</label>
//                     <input
//                         type="text"
//                         value={guardiansMiddleName}
//                         onChange={(e) => setGuardiansMiddleName(e.target.value)}
//                         className="w-[200px] p-2 border rounded-md bg-gray-200"
//                     />
//                 </div>

//                 <div className="flex flex-row items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[60px]">Suffix:</label>
//                     <input
//                         type="text"
//                         value={guardiansSuffix}
//                         onChange={(e) => setGuardiansSuffix(e.target.value)}
//                         className="w-[200px] p-2 border rounded-md bg-gray-200"
//                     />
//                 </div>
//             </div>
//         </div>
//         {/* end of second scetion */}

        
//          {/* third scetion */}
//          <div className=" flex flex-col mt-10 mb-5">
//             <p className="text-2xl font-bold font-oswald text-dGreen">
//                 Section 3: Educational Background
//             </p>
//             <hr className="border-2 border-dGreen"/>

//             {/* first row */}
//             <div className="flex mt-8 gap-10">
//                 <div className="flex flex-row items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[200px]">Admission Status:</label>
//                     <select
//                         value={admissionStatus}
//                         onChange={(e) => setAdmissionStatus(e.target.value)}
//                         className="w-[200px] p-2 border rounded-md bg-gray-200"
//                     >
//                         <option value="Freshmen">Freshmen</option>
//                         <option value="Transferee">Transferee</option>
//                     </select>
//                 </div>
//             </div>

//             {/* second row */}
//             <div className="flex mt-8 gap-10">
//                 <div className="flex flex-row items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[180px]">Previous School:</label>
//                     <input
//                         type="text"
//                         value={prevSchool}
//                         onChange={(e) => setPrevSchool(e.target.value)}
//                         className="w-[500px] p-2 border rounded-md bg-gray-200"
//                     />
//                 </div>
//             </div>

//             {/* third row */}
//             <div className="flex mt-8 gap-10">
//                 <div className="flex flex-row items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[150px]">Full Address:</label>
//                     <input
//                         type="text"
//                         value={schoolAddress}
//                         onChange={(e) => setSchoolAddress(e.target.value)}
//                         className="w-[500px] p-2 border rounded-md bg-gray-200"
//                     />
//                 </div>
//             </div>

//             {/* fourth row */}
//             <div className="flex flex-row mt-6 gap-10">

//                 <div className="flex flex-row items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[60px]">LRN:</label>
//                     <input
//                         type="text"
//                         value={lrn}
//                         onChange={(e) => setLrn(e.target.value)}
//                         className="w-[200px] p-2 border rounded-md bg-gray-200"
//                     />
//                 </div>

//                 <div className="flex flex-row items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[150px]">School TYpe:</label>
//                     <select
//                         value={schoolType}
//                         onChange={(e) => setSchoolType(e.target.value)}
//                         className="w-[200px] p-2 border rounded-md bg-gray-200"
//                     >
//                         <option value="Public">Public</option>
//                         <option value="Private">Private</option>
//                     </select>
//                 </div>    

                
//                 <div className="flex flex-row gap-5 items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[120px]">Grade Level:</label>
//                     <select
//                         value={gradeLevel}
//                         onChange={(e) => setGradeLevel(e.target.value)}
//                         className="w-[200px] p-2 border rounded-md bg-gray-200"
//                     >
//                         <option value="Grade7">Grade 7</option>
//                         <option value="Grade8">Grade 8</option>
//                         <option value="Grade9">Grade 9</option>
//                         <option value="Grade9">Grade 10</option>
//                     </select>

//                     <select
//                         value={schoolYear}
//                         onChange={(e) => setSchoolYear(e.target.value)}
//                         className="w-[200px] p-2 border rounded-md bg-gray-200"
//                     >
//                     {years.map((year) => (
//                         <option key={year} className="text-black" value={`${year}-${year + 1}`}>
//                             {year}-{year + 1}
//                         </option>
//                     ))}
//                     </select>
//                 </div>           

               
//             </div>
//         </div>
//         {/* end of third scetion */}

//          {/* second scetion */}
//          <div className=" flex flex-col mt-10 mb-5">
//             <p className="text-2xl font-bold font-oswald text-dGreen">
//                 Section 1: Personal Information
//             </p>
//             <hr className="border-2 border-dGreen"/>

//             {/* first row */}
//             <div className="flex flex-row mt-8 gap-10">

//                 <div className="flex flex-row items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[160px]">Birth Certificate:</label>

//                     <div className="relative w-[270px]">
//                         {/* File Input */}
//                         <input
//                             type="file"
//                             onChange={(e) => setBirthCert(e.target.files ? e.target.files[0] : null)}
//                             className="w-full p-2 border rounded-md bg-gray-200 pr-10"
//                         />

//                         {/* Remove Button Inside Input */}
//                         {birthCert && (
//                             <button
//                                 type="button"
//                                 onClick={() => setBirthCert(null)}
//                                 className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 text-white text-sm px-2 py-1 rounded"
//                             >
//                                 ✕
//                             </button>
//                         )}
//                     </div>

//                     {/* Image Preview */}
//                     {birthCert && (
//                         <img
//                             src={URL.createObjectURL(birthCert)}
//                             alt="Preview"
//                             className="w-16 h-16 mt-2 border rounded-md"
//                         />
//                     )}
//                 </div>


//                 <div className="flex flex-row items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[110px]">First Name:</label>
//                     <input
//                         type="file" 
//                         name="document" 
//                         onChange={(e) => setReportCard(e.target.files ? e.target.files[0] : null)}
//                         className="w-[200px] p-2 border rounded-md bg-gray-200"
//                     />
//                     {reportCard && (
//                         <div className="flex items-center gap-2">
//                             <img src={URL.createObjectURL(reportCard)} alt="Birth Cert Preview" className="w-16 h-16 ml-2" />
//                             <button 
//                                 onClick={() => setBirthCert(null)} 
//                                 className="text-red-500 text-sm border border-red-500 px-2 py-1 rounded-md"
//                             >
//                                 Remove
//                             </button>
//                         </div>
//                     )}

//                 </div>

//             </div>

//             {/* second row */}
//             <div className="flex flex-row mt-6 gap-10">
//                 <div className="flex flex-row items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[110px]">First Name:</label>
//                     <input
//                         type="file" 
//                         name="document" 
//                         onChange={(e) => setGoodMoral(e.target.files ? e.target.files[0] : null)}
//                         className="w-[200px] p-2 border rounded-md bg-gray-200"
//                     />
//                     {goodMoral && (
//                         <div className="flex items-center gap-2">
//                             <img src={URL.createObjectURL(goodMoral)} alt="Birth Cert Preview" className="w-16 h-16 ml-2" />
//                             <button 
//                                 onClick={() => setBirthCert(null)} 
//                                 className="text-red-500 text-sm border border-red-500 px-2 py-1 rounded-md"
//                             >
//                                 Remove
//                             </button>
//                         </div>
//                     )} 
//                 </div>

//                 <div className="flex flex-row items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[110px]">First Name:</label>
//                     <input
//                         type="file" 
//                         name="document" 
//                         onChange={(e) => setIdPic(e.target.files ? e.target.files[0] : null)}
//                         className="w-[200px] p-2 border rounded-md bg-gray-200"
//                     />
//                     {idPic && (
//                         <div className="flex items-center gap-2">
//                             <img src={URL.createObjectURL(idPic)} alt="Birth Cert Preview" className="w-16 h-16 ml-2" />
//                             <button 
//                                 onClick={() => setBirthCert(null)} 
//                                 className="text-red-500 text-sm border border-red-500 px-2 py-1 rounded-md"
//                             >
//                                 Remove
//                             </button>
//                         </div>
//                     )}  
//                 </div>

//             </div>

//             {/* third row */}
//             <div className="flex flex-row mt-6 gap-10">
//             <div className="flex flex-row items-center">
//                     <label className="text-dGreen font-semibold text-xl w-[110px]">First Name:</label>
//                     <input
//                         type="file" 
//                         name="document" 
//                         onChange={(e) => setStudentExitForm(e.target.files ? e.target.files[0] : null)}
//                         className="w-[200px] p-2 border rounded-md bg-gray-200"
//                     />
//                     {studentExitForm && (
//                         <div className="flex items-center gap-2">
//                             <img src={URL.createObjectURL(studentExitForm)} alt="Birth Cert Preview" className="w-16 h-16 ml-2" />
//                             <button 
//                                 onClick={() => setBirthCert(null)} 
//                                 className="text-red-500 text-sm border border-red-500 px-2 py-1 rounded-md"
//                             >
//                                 Remove
//                             </button>
//                         </div>
//                     )}  
//                 </div>
//             </div>

//         </div>
//         {/* end of second scetion */}



//         <div className="w-full flex mt-10 mb-10 justify-center">
//             <button 
//             onClick={handleUpdate} 
//             className="mt-5 px-5 py-2 bg-dGreen text-white rounded-lg w-[300px]">
//                 Proceed with Re-Application
//             </button>
//         </div>
        
//         </div>
//     );
// };

// export default ReApplyContent;
