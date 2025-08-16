"use client";

import { Button } from "@/components/ui/button";
import { getStudentDataByTrackingId, updateStudentData } from "@/src/actions/landingPage";
import { usePreviewModal } from "@/src/store/preview";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useShowRemarksModal } from "@/src/store/LANDING_PAGE/landing_page";
import { PreviewModal } from "../landing_page_portal/preview/preview_modal";
import { RemarksModal } from "../landing_page_portal/remarks_modal/remarks_modal";




export const ReApplication = () => {

    const searchParams = useSearchParams();
    const trackingId = searchParams.get("trackingId");
    const router = useRouter();

    const [page, setPage] = useState(0);

    const [errors,setErrors] = useState<{ [key: string]: string }>({});
    // State for handling input value
    const [applicantsLastName, setApplicantsLastName] = useState("");
    const [applicantsFirstName, setApplicantsFirstName] = useState("");
    const [applicantsMiddleName, setApplicantsMiddleName] = useState("");
    const [applicantsSuffix, setApplicantsSuffix] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");

    const [guardiansLastName, setGuardianLastName] = useState("");
    const [guardiansFirstName, setGuardianFirstName] = useState("");
    const [guardiansMiddleName, setGuardianMiddleName] = useState("");
    const [guardiansSuffix, setGuardianSuffix] = useState("");
    const [emergencyContact, setEmergencyContact] = useState("");
    const [emergencyEmail, setEmergencyEmail] = useState("");
    const [fullAddress, setFullAddress] = useState("");

    const [lrn, setLrn] = useState(""); 
    const [gradeLevel, setGradeLevel] = useState("");
    const [schoolYear, setSchoolYear] = useState("");
    const [schoolType, setSchoolType] = useState("");
    const [schoolName, setSchoolName ] = useState("");
    const [schoolAddress, setSchoolAddress] = useState("");

    const [birthCert, setBirthCert] =  useState<File | null>(null);
    const [reportCard, setReportCard] = useState<File | null>(null);
    const [goodMoral, setGoodMoral] = useState<File | null>(null);
    const [idPic, setIdPic] = useState<File | null>(null);
    const [studentExitForm, setStudentExitForm] = useState<File | null>(null);

    
    // const [localTrackingId, setLocalTrackingId] = useState<string | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { open: openPreview } = usePreviewModal();
    const { open: openRemarks } = useShowRemarksModal();


         // Refs for input elements
    const birthCertRef = useRef<HTMLInputElement>(null);
    const reportCardRef = useRef<HTMLInputElement>(null);
    const goodMoralRef = useRef<HTMLInputElement>(null);
    const idPicRef = useRef<HTMLInputElement>(null);
    const studentExitFormRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (trackingId) {
        
            // setLocalTrackingId(trackingId);
            const fetchStudentData = async () => {
                try {
                    const data = await getStudentDataByTrackingId(trackingId);
                    // Set state with fetched data

                    // studentInformationTable
                    setApplicantsFirstName(data.applicantsFirstName || "");
                    setApplicantsMiddleName(data.applicantsMiddleName || "");
                    setApplicantsLastName(data.applicantsLastName || "");
                    setApplicantsSuffix(data.applicantsSuffix || "");
                    setDateOfBirth(data.dateOfBirth || "");
                    setAge(data.age.toString() || "");
                    setGender(data.gender || "");
                    setMobileNumber(data.mobileNumber || "");
                    setEmail(data.email || "");

                    setGuardianFirstName(data.guardiansFirstName || "");
                    setGuardianMiddleName(data.guardiansMiddleName || "");
                    setGuardianLastName(data.guardiansLastName || "");
                    setGuardianSuffix(data.guardiansSuffix || "");
                    setFullAddress(data.fullAddress || "");
                    setEmergencyContact(data.emergencyContact || "");
                    setEmergencyEmail(data.emergencyEmail || "");

                    setLrn(data.lrn || "");
                    setGradeLevel(data.gradeLevel || "");
                    setSchoolYear(data.schoolYear || "");
                    setSchoolType(data.schoolType || "");
                    setSchoolName(data.prevSchool || "");
                    setSchoolAddress(data.schoolAddress || "");

                
                      // Fetch image and convert to File
                      const urlToFile = async (url: string, filename: string) => {
                        if (!url) return null;
                        const response = await fetch(url);
                        const blob = await response.blob();
                        return new File([blob], filename, { type: blob.type });
                    };

                    setBirthCert(data.birthCert ? await urlToFile(data.birthCert, "birthCert") : null);
                    setReportCard(data.reportCard ? await urlToFile(data.reportCard, "reportCard") : null);
                    setGoodMoral(data.goodMoral ? await urlToFile(data.goodMoral, "goodMoral") : null);
                    setIdPic(data.idPic ? await urlToFile(data.idPic, "idPic") : null);
                    setStudentExitForm(data.studentExitForm ? await urlToFile(data.studentExitForm, "studentExitForm") : null);
                    
                    // If there are remarks, open the remarks modal
                    if (data.regRemarks || data.cashierRemarks) {
                        handleOpenRemarks({
                            regRemarks: data.regRemarks,
                            cashierRemarks: data.cashierRemarks,
                            regDate: data.regDate,
                            cashierDate: data.cashierDate
                        });
                    }
                } catch (error) {
                    console.error("Error fetching student data:", error);
                }
            };
            fetchStudentData();
        }
    // }, [trackingId]);
        }, );


    useEffect(() => {
        if (!trackingId) {
          router.push('/');
        }
      }, [trackingId, router]);
      
      if (!trackingId) {
        return <p className="text-center text-red-500">No tracking ID found.</p>;
      }


      
// Validation per page
const validatePage = async (): Promise<boolean> => {
    const newErrors: { [key: string]: string } = {};

    switch (page) {
    case 0: // Personal Info

        if (!applicantsLastName.trim()) newErrors.applicantsLastName = "Required";
        if (!applicantsFirstName.trim()) newErrors.applicantsFirstName = "Required";
        if (!dateOfBirth.trim()) newErrors.dateOfBirth = "Required";
        if (!age.trim()) newErrors.age = "Required";
        if (!gender.trim()) newErrors.gender = "Required";
        if (!mobileNumber.trim()) newErrors.mobileNumber = "Required";
        if (!email.trim()) newErrors.email = "Required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error("Please fill in all required fields.");
            return false;
        }



        if (
            !/^[a-zA-Z\s'-]+$/.test(applicantsLastName) ||  
            applicantsLastName.length < 2 ||  
            applicantsLastName.length > 50
        ) {
            newErrors.applicantsLastName = "invalid";
            setErrors(newErrors);
            toast.error("Invalid student's last name. Please enter a valid last name.");
            return false;
        }


        if (
            !/^[a-zA-Z\s'-]+$/.test(applicantsFirstName) ||
            applicantsFirstName.length < 2 ||
            applicantsFirstName.length > 50
        ) {
            newErrors.applicantsFirstName = "invalid";
            setErrors(newErrors);
            toast.error("Invalid student's first name. Please enter a valid first name.");
            return false;
        }


        if (!validateNotInFuture(new Date(dateOfBirth))) {
            newErrors.applicantsLastName = "invalid";
            setErrors(newErrors);
            toast.error("Date of birth cannot be in the future.");
            return false;
        }   
        

        if(!validateMinDate(new Date(dateOfBirth))){
            newErrors.applicantsLastName = "invalid";
            setErrors(newErrors);
            toast.error("The minimum threshold for age is 6 years.");
            return false;
        }

        if(!validateMaxAge(new Date(dateOfBirth))){
            newErrors.dateOfBirth = "invalid";
            setErrors(newErrors);
            toast.error("Are you alive still?.");
            return false;
        }

        if (
            !/^[0-9]+$/.test(mobileNumber) || 
            mobileNumber.length !== 11
        ) {
             newErrors.mobileNumber = "invalid";
            setErrors(newErrors);
            toast.error("Invalid mobile number. Please enter a valid mobile number.");
            return false;
        }
        
        if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) ||
            email.length < 5 ||
            email.length > 50
        ) {
             newErrors.email = "invalid";
            setErrors(newErrors);
            toast.error("Invalid email. Please enter a valid email.");
            return false;
        }   
        

    return true;

        

    case 1: // Guardian Info
      
        if (!guardiansLastName.trim()) newErrors.guardiansLastName = "Required";
        if (!guardiansFirstName.trim()) newErrors.guardiansFirstName = "Required";
        if (!emergencyContact.trim()) newErrors.emergencyContact = "Required";
        if (!fullAddress.trim()) newErrors.fullAddress = "Required";

        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error("Please fill in all required fields.");
            return false;
        }

        
        if (
            !/^[a-zA-Z\s'-]+$/.test(guardiansLastName) ||  
            guardiansLastName.length < 2 ||  
            guardiansLastName.length > 50
        ) {
            newErrors.guardiansLastName = "invalid";
            setErrors(newErrors);
            toast.error("Invalid guardian's last name. Please enter a valid last name.");
            return false;
        }
        if (
            !/^[a-zA-Z\s'-]+$/.test(guardiansFirstName) ||
            guardiansFirstName.length < 2 ||
            guardiansFirstName.length > 50
        ) {
            newErrors.guardiansFirstName = "invalid";
            setErrors(newErrors);
            toast.error("Invalid guardian's first name. Please enter a valid first name.");
            return false;
        }
        
        if (
            !/^[0-9]+$/.test(emergencyContact) || 
            emergencyContact.length !== 11
        ) {
            newErrors.emergencyContact = "invalid";
            setErrors(newErrors);
            toast.error("Invalid mobile number. Please enter a valid mobile number.");
            return false;
        }

        if (
            fullAddress.length < 2 ||
            fullAddress.length > 50
        ) {
            newErrors.fullAddress = "invalid";
            setErrors(newErrors);
            toast.error("Invalid address. Please enter a valid address.");
            return false;
        }


    return true;

    case 2: // Academic Info
        if (!lrn.trim()) newErrors.lrn = "Required";
        if (!gradeLevel.trim()) newErrors.gradeLevel = "Required";
        if (!schoolYear.trim()) newErrors.schoolYear = "Required";
        if (!schoolType.trim()) newErrors.schoolType = "Required";
        if (!schoolName.trim()) newErrors.schoolName = "Required";
        if (!schoolAddress.trim()) newErrors.schoolAddress = "Required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error("Please fill in all required fields.");
            return false;
        }


        if (
            schoolName.length < 2 ||
            schoolName.length > 50
        ) {
            newErrors.schoolName = "invalid";
            setErrors(newErrors);
            toast.error("Invalid school name. Please enter a valid school name.");
            return false;
        }
        if (
            schoolAddress.length < 2 ||
            schoolAddress.length > 50
        ) {
            newErrors.schoolAddress = "invalid";
            setErrors(newErrors);
            toast.error("Invalid school address. Please enter a valid school address.");
            return false;
        }
        return true;

    default:
    return true;
    }
  };

  
const handleBirthCertChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBirthCert(file);
    }
};
const handleReportCardChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReportCard(file);
    }
};
const handleGoodMoralChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setGoodMoral(file);
    }
};
const handleIdPIcChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIdPic(file);
    }
};
const handleStudentExitFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setStudentExitForm(file);
    }
};

    // functions
    function validateMinDate( birthofDate: Date ) {
        const today = new Date();
        const minDate = new Date(today.getFullYear() - 6, today.getMonth(), today.getDate());
        const date = new Date(birthofDate);
    
        return date <= minDate;
    }

    function validateNotInFuture(birthofDate: Date) {
        const today = new Date();
        const date = new Date(birthofDate);

        return date <= today;
    }

    function validateMaxAge(birthDate: Date) {
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    return age <= 100;
    }

    const years = Array.from({ length: 4 }, (_, i) => new Date().getFullYear() - i - 1);

    const previewImage = (file: File | null) => {
        if (!file) return;
            const reader = new FileReader();
                reader.onloadend = () => {
                    if (typeof reader.result === "string") {
                    openPreview(reader.result);
                    }
                };
            reader.readAsDataURL(file);
        };
    
    
    // Event handler for adding a new todo
    const handleAdd = async () => {
        setIsSubmitting(true);
        try {
            const uploadImage = async (file: File, folder: string) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'my_preset');
                formData.append('folder', folder);
            
                const response = await fetch('https://api.cloudinary.com/v1_1/dkfn4xy6q/image/upload', {
                    method: 'POST',
                    body: formData,
                });
            
                const data = await response.json();  
                return data.secure_url;
            };

            const uploadBirthCert = birthCert ? await uploadImage(birthCert, 'documents') : "";
            const uploadReportCard = reportCard ? await uploadImage(reportCard, 'documents') : "";
            const uploadGoodMoral = goodMoral ? await uploadImage(goodMoral, 'documents') : "";
            const uploadIdPic = idPic ? await uploadImage(idPic, 'documents') : "";
            const uploadStudentExitForm = studentExitForm ? await uploadImage(studentExitForm, 'documents') : "";

            const updatedData = {
                applicantsLastName, 
                applicantsFirstName,
                applicantsMiddleName, 
                applicantsSuffix, 
                dateOfBirth, 
                age: parseInt(age),
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
                prevSchool: schoolName,
                schoolAddress,

                birthCert: uploadBirthCert,
                reportCard: uploadReportCard,
                goodMoral: uploadGoodMoral,
                idPic: uploadIdPic,
                studentExitForm: uploadStudentExitForm,
            };

            const updatedStudent = await updateStudentData(lrn, updatedData);
            console.log("Student updated successfully:", updatedStudent);
            
            toast.success("Reapplication submitted successfully. Your application is now pending review.");
            router.push("/");

        } catch (error) {
            toast.error("Failed to submit reapplication. Please try again.");
            console.error('Error updating application:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const sections = [
        {
            title: (
                <div>
                    <p className="text-2xl text-dGreen font-bold font-merriweather">
                        Section 1: Personal Information
                    </p>
                </div>
            ),
            content: (
                <main className="grid grid-cols-2 gap-5 mx-[20px]">
                    <section className="flex flex-col h-[55px] justify-center ">
                        {errors.applicantsLastName === "Required" &&(
                            <p className="text-red-500 text-[12px]">
                                {errors.applicantsLastName}
                            </p>
                        )}
                        <div className="flex flex-row gap-3 items-center">
                            <label className="font-semibold font-merriweather text-dGreen text-xl w-[170px]">Last Name:</label>
                            <input 
                                type="text" 
                                placeholder="Dela Cruz"
                                onChange={(e) => setApplicantsLastName(e.target.value)}
                                value={applicantsLastName}
                                className={`rounded-sm px-1 w-[300px] h-[35px]
                                ${errors.applicantsLastName ? 'border border-red-600 bg-red-100' : ' bg-gray-200'}`} 

                            />
                        </div>
                    </section>

                    <section className="flex flex-col h-[55px] justify-center ">
                        {errors.applicantsFirstName === "Required" && (
                            <p className="text-red-500 text-[12px]">
                                {errors.applicantsFirstName}
                            </p>
                        )}
                        <div className="flex flex-row gap-3 items-center">
                            <label className="font-semibold font-merriweather text-dGreen text-xl w-[170px]">First Name:</label>
                            <input 
                                type="text" 
                                placeholder="John"
                                onChange={(e) => setApplicantsFirstName(e.target.value)}
                                value={applicantsFirstName}
                                className={`rounded-sm px-1 w-[300px] h-[35px]
                                ${errors.applicantsFirstName ? 'border border-red-600 bg-red-100' : ' bg-gray-200'}`} 
                            />
                        </div>
                    </section>

                    <section className="flex flex-col h-[55px] justify-center ">
                        <div className="flex flex-row gap-3 items-center">
                            <label className="font-semibold font-merriweather text-dGreen text-xl w-[170px]">Middle Name:</label>
                            <input 
                                type="text" 
                                placeholder="Doe" 
                                onChange={(e) => setApplicantsMiddleName(e.target.value)}
                                value={applicantsMiddleName}
                                className="rounded-sm px-1 w-[300px] h-[35px] bg-gray-200"
                            />
                        </div>
                    </section>
         
                    <section className="flex flex-col h-[55px] justify-center ">
                        <div className="flex flex-row gap-3 items-center">
                            <label className="font-semibold font-merriweather text-dGreen text-xl w-[170px]">Suffix:</label>
                            <input 
                                type="text" 
                                placeholder="Jr." 
                                onChange={(e) => setApplicantsSuffix(e.target.value)}
                                value={applicantsSuffix}
                                className="border bg-gray-200 rounded-sm px-1 w-[300px] h-[35px]" />
                        </div>
                    </section>

                    <section className="flex flex-col h-[55px] justify-center ">
                        {errors.dateOfBirth === "Required" && (
                            <p className="text-red-500 text-[12px]">
                                {errors.dateOfBirth}
                            </p>
                        )}
                        <div className="flex flex-row gap-3 items-center">
                            <label className="font-semibold font-merriweather text-dGreen text-xl w-[170px]">Birth Date:</label>
                            <input 
                                type="date" 
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                value={dateOfBirth}
                                className={`rounded-sm px-1 w-[300px] h-[35px]
                                ${errors.dateOfBirth ? 'border border-red-600 bg-red-100' : 'bg-gray-200'} 
                                ${dateOfBirth === '' ? 'text-gray-500' : 'text-black'}`} 
                            />
                        </div>

                    </section>
                    
                    <section className="flex flex-col h-[55px] justify-center ">
                        <div className="flex flex-row gap-3 items-center">
                            <label className="font-semibold font-merriweather text-dGreen text-xl w-[170px]">Age:</label>
                            <input 
                                disabled
                                type="text" 
                                value={age}
                                className="border bg-gray-200 rounded-sm px-1 w-[300px] h-[35px]" />
                        </div>
                    </section>
                    <section className="flex flex-col h-[55px] justify-center ">
                        {errors.gender && (
                            <p className="text-red-500 text-[12px]">
                                {errors.gender}
                            </p>
                        )}
                        <div className="flex flex-row gap-3 items-center">
                            <label className="font-semibold font-merriweather text-dGreen text-xl w-[170px]">Gender:</label>
                            <select 
                                name="Gender"
                                onChange={(e) => setGender(e.target.value)}
                                value={gender}
                                className={`rounded-sm px-1 w-[300px] h-[35px] 
                                ${errors.gender ? 'border border-red-600 bg-red-100' : 'bg-gray-200'} 
                                ${gender === '' ? 'text-gray-500' : 'text-black'}`}>
                                <option value="" >Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                    </section>
                    
                    <section className="flex flex-col h-[55px] justify-center ">
                        {errors.mobileNumber === "Required" && (
                            <p className="text-red-500 text-[12px]">
                                {errors.mobileNumber}
                            </p>
                        )}
                        <div className="flex flex-row gap-3 items-center">
                            <label className="font-semibold font-merriweather text-dGreen text-xl w-[170px]">Mobile Number:</label>
                            <input 
                                type="text"
                                placeholder="09XXXXXXXX" 
                                onChange={(e) => setMobileNumber(e.target.value)}
                                value={mobileNumber}
                                className={`rounded-sm px-1 w-[300px] h-[35px]
                                ${errors.mobileNumber ? 'border border-red-600 bg-red-100' : ' bg-gray-200'}`} 
                            />
                        </div>
                    </section>
                   
                   <section className="flex flex-col h-[55px] justify-center ">
                        {errors.email === "Required" && (
                            <p className="text-red-500 text-[12px]">
                                {errors.email}
                            </p>
                        )}
                        <div className="flex flex-row gap-3 items-center">
                            <label className="font-semibold font-merriweather text-dGreen text-xl w-[170px]">Email address:</label>
                            <input 
                                type="text" 
                                placeholder="l7B4G@example.com" 
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className={`rounded-sm px-1 w-[300px] h-[35px]
                                ${errors.email ? 'border border-red-600 bg-red-100' : ' bg-gray-200'}`} 
                            />
                        </div>
                   </section>
                </main>
            ),
        },

        {
            title: (
                <div>
                    <p className="text-2xl text-dGreen font-bold font-merriweather">
                        Section 2: Contact & Guardian Details
                    </p>
                </div>
            ),
            content: (
                <main className="flex flex-col gap-5 mx-[20px]">
                    <article className="grid grid-cols-2 gap-5 ">
                        <section className="flex flex-col h-[55px] justify-center ">    
                            {errors.guardiansLastName === "Required" && (
                                <p className="text-red-500 text-[12px]">
                                    {errors.guardiansLastName}
                                </p>
                            )}
                            <div className="flex flex-row gap-3 items-center">
                                
                                <label className="font-semibold font-merriweather text-dGreen text-xl w-[240px]"> Guardian Last Name:</label>
                                <input 
                                    type="text" 
                                    placeholder="Garcia"
                                    onChange={(e) => setGuardianLastName(e.target.value)}
                                    value={guardiansLastName}
                                    className={`rounded-sm px-1 w-[300px] h-[35px]
                                    ${errors.guardiansLastName ? 'border border-red-600 bg-red-100' : ' bg-gray-200'}`} 
                                />
                            </div>
                        </section>

                        <section className="flex flex-col h-[55px] justify-center ">  
                            {errors.guardiansFirstName === "Required" && (
                                <p className="text-red-500 text-[12px]">
                                    {errors.guardiansFirstName}
                                </p>
                            )}
                            <div className="flex flex-row gap-3 items-center">
                                <label className="font-semibold font-merriweather text-dGreen text-xl w-[240px]"> Guardian First Name:</label>
                                <input 
                                    type="text" 
                                    value={guardiansFirstName}
                                    onChange={(e) => setGuardianFirstName(e.target.value)}
                                    className={`rounded-sm px-1 w-[300px] h-[35px]
                                    ${errors.guardiansFirstName ? 'border border-red-600 bg-red-100' : ' bg-gray-200'}`} 
                                />
                            </div>
                         </section>

                        <section className="flex flex-col h-[55px] justify-center ">
                            <div className="flex flex-row gap-3 items-center">
                                <label className="font-semibold font-merriweather text-dGreen text-xl w-[240px]"> Guardian Middle Name:</label>
                                <input 
                                    type="text" 
                                    placeholder="Doe"
                                    onChange={(e) => setGuardianMiddleName(e.target.value)}
                                    value={guardiansMiddleName}
                                    className="border bg-gray-200 rounded-sm px-1 w-[300px] h-[35px]" 
                                />
                            </div>
                        </section>

                        <section className="flex flex-col h-[55px] justify-center ">
                            <div className="flex flex-row gap-3 items-center">
                                <label className="font-semibold font-merriweather text-dGreen text-xl w-[240px]"> Guardian Suffix:</label>
                                <input 
                                    type="text" 
                                    placeholder="Jr."
                                    onChange={(e) => setGuardianSuffix(e.target.value)}
                                    value={guardiansSuffix}
                                    className="border bg-gray-200 rounded-sm px-1 w-[300px] h-[35px]" 
                                />
                            </div>
                        </section>
                        
                        <section className="flex flex-col h-[55px] justify-center ">
                            {errors.emergencyContact === "Required" && (
                                <p className="text-red-500 text-[12px]">
                                    {errors.emergencyContact}
                                </p>
                            )}
                            <div className="flex flex-row gap-3 items-center">
                                <label className="font-semibold font-merriweather text-dGreen text-xl w-[240px]"> Contact Number:</label>
                                <input 
                                    type="text" 
                                    placeholder="09123456789" 
                                    onChange={(e) => setEmergencyContact(e.target.value)}
                                    value={emergencyContact}
                                    className={`rounded-sm px-1 w-[300px] h-[35px]
                                    ${errors.emergencyContact ? 'border border-red-600 bg-red-100' : ' bg-gray-200'}`} 
                                />
                            </div>
                        </section>

                        <section className="flex flex-col h-[55px] justify-center ">
                            <div className="flex flex-row gap-3 items-center">
                                <label className="font-semibold font-merriweather text-dGreen text-xl w-[240px]"> Guardian Email:</label>
                                <input 
                                    type="text" 
                                    placeholder="sample@gmail.com"
                                    onChange={(e) => setEmergencyEmail(e.target.value)}
                                    value={emergencyEmail}
                                    className="border bg-gray-200 rounded-sm px-1 w-[300px] h-[35px]" 
                                />
                            </div>
                        </section>
                    </article>

                    <section className="flex flex-col gap-3 justify-center h-[55px]">
                        {errors.fullAddress === "Required" && (
                            <p className="text-red-500 text-[12px]">
                                {errors.fullAddress}
                            </p>
                        )}
                        <div className="flex flex-row gap-3 items-center">  
                            <label className="font-semibold font-merriweather text-dGreen text-xl w-[240px]">Full Address:</label>
                            <input 
                                type="text" 
                                placeholder="123 Main Street, City, Country"
                                onChange={(e) => setFullAddress(e.target.value)}
                                value={fullAddress}
                                className={`rounded-sm px-1 w-[400px] h-[35px]
                                ${errors.fullAddress ? 'border border-red-600 bg-red-100' : ' bg-gray-200'}`} 
                            />
                        </div>
                    </section>
                </main>
                
            ),
        },
        {
            title: (
                <div>
                    <p className="text-2xl text-dGreen font-bold font-merriweather">
                        Section 3: Educational Background
                    </p>
                </div>
            ),
            content: (
                <main className="flex flex-col gap-5 mx-[20px]">
                    <article className="grid grid-cols-2 gap-5 ">
                        <section className="flex flex-col gap-3 justify-center h-[55px]">
                            {errors.lrn === "Required" && (
                                <p className="text-red-500 text-[12px]">
                                    {errors.lrn}
                                </p>
                            )}
                            <div className="flex flex-row gap-3 items-center">
                                <label className="font-semibold font-merriweather text-dGreen text-xl w-[240px]"> LRN:</label>
                                <input 
                                    type="text" 
                                    placeholder="123456789102"
                                    onChange={(e) => setLrn(e.target.value)}
                                    value={lrn}
                                    className={`rounded-sm px-1 w-[300px] h-[35px]
                                    ${errors.lrn ? 'border border-red-600 bg-red-100' : ' bg-gray-200'}`} 
                                />
                            </div>
                        </section>

                        <section className="flex flex-col gap-3 justify-center h-[55px]">
                            {errors.gradeLevel === "Required" && (
                                <p className="text-red-500 text-[12px]">
                                    {errors.gradeLevel}
                                </p>
                            )}          
                            <div className="flex flex-row gap-3 items-center">
                                <label className="font-semibold font-merriweather text-dGreen text-xl w-[240px]">Grade Level to Enroll:</label>
                                <select 
                                    name="Gender"
                                    onChange={(e) => setGradeLevel(e.target.value)}
                                    value={gradeLevel}
                                    className={`rounded-sm px-1 w-[300px] h-[35px] 
                                    ${errors.gradeLevel ? 'border border-red-600 bg-red-100' : 'bg-gray-200'} 
                                    ${gradeLevel === '' ? 'text-gray-500' : 'text-black'}`}>
                                        <option value="" >Select Grade</option>
                                        <option value="7">Grade 7</option>
                                        <option value="8">grade 8</option>
                                        <option value="9">Grade 9</option>
                                        <option value="10">Grade 10</option>
                                </select>
                            </div>
                        </section>      

                        <section className="flex flex-col gap-3 justify-center h-[55px]">
                            {errors.schoolYear === "Required" && (
                                <p className="text-red-500 text-[12px]">
                                    {errors.schoolYear}
                                </p>
                            )}   
                            <div className="flex flex-row gap-3 items-center">
                                <label className="font-semibold font-merriweather text-dGreen text-xl w-[240px]">School Year Graduated:</label>
                                <select
                                    name="schoolYear"
                                    onChange={(e) => setSchoolYear(e.target.value)}
                                    value={schoolYear}
                                    className={`rounded-sm px-1 w-[300px] h-[35px] 
                                    ${errors.schoolYear ? 'border border-red-600 bg-red-100' : 'bg-gray-200'} 
                                    ${schoolYear === '' ? 'text-gray-500' : 'text-black'}`}
                                >
                                    <option className="text-gray-300" value="">
                                        Select School Year
                                    </option>
                                    {years.map((year) => (
                                        <option key={year} className="text-black" value={`${year}-${year + 1}`}>
                                            {year}-{year + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </section>

                        <section className="flex flex-col gap-3 justify-center h-[55px]">  
                            {errors.schoolType === "Required" && (
                                <p className="text-red-500 text-[12px]">
                                    {errors.schoolType}
                                </p>
                            )}   
                            <div className="flex flex-row gap-3 items-center">
                                <label className="font-semibold font-merriweather text-dGreen text-xl w-[240px]">School Type:</label>
                                <select 
                                    name="Gender"
                                    onChange={(e) => setSchoolType(e.target.value)}
                                    value={schoolType}
                                    className={`rounded-sm px-1 w-[300px] h-[35px] 
                                    ${errors.schoolType ? 'border border-red-600 bg-red-100' : 'bg-gray-200'} 
                                    ${schoolType === '' ? 'text-gray-500' : 'text-black'}`}>
                                        <option value="" >Select School Type</option>
                                        <option value="Private">Private</option>
                                        <option value="Public">Public</option>
                                </select>
                            </div>
                        </section>

                        <section className="flex flex-col gap-3 justify-center h-[55px]"> 
                            {errors.schoolName === "Required" && (
                                <p className="text-red-500 text-[12px]">
                                    {errors.schoolName}
                                </p>
                            )}              
                            <div className="flex flex-row gap-3 items-center">
                                <label className="font-semibold font-merriweather text-dGreen text-xl w-[240px]">Previous School:</label>
                                <input 
                                    type="text" 
                                    placeholder="AB Normal Schoool"
                                    onChange={(e) => setSchoolName(e.target.value)}
                                    value={schoolName}
                                    className={`rounded-sm px-1 w-[300px] h-[35px]
                                    ${errors.schoolName ? 'border border-red-600 bg-red-100' : ' bg-gray-200'}`}
                                />
                            </div>
                        </section>    
                    </article>

                    <section className="flex flex-col gap-3 justify-center h-[55px]">
                        {errors.schoolAddress === "Required" && (
                            <p className="text-red-500 text-[12px]">
                                {errors.schoolAddress}
                            </p>
                        )}   
                        <div className="flex flex-row gap-3 items-center">
                            <label className="font-semibold font-merriweather text-dGreen text-xl w-[240px]">School Address:</label>
                            <input 
                                type="text"
                                placeholder="123 Street, City, Country"
                                onChange={(e) => setSchoolAddress(e.target.value)}
                                value={schoolAddress}
                                className={`rounded-sm px-1 w-[300px] h-[35px]
                                ${errors.schoolAddress ? 'border border-red-600 bg-red-100' : ' bg-gray-200'}`}
                            />
                        </div>
                    </section>      
                </main>
            ),
        },
        {
            title: (
                <div>
                    <p className="text-2xl text-dGreen font-bold font-merriweather">
                        Section 4: Documents Submission
                    </p>
                </div>
            ),
            content: (
                <main className="grid grid-cols-2 gap-7 mx-[20px]">
                    <section className="flex flex-row gap-3 items-center">
                        <label className="font-semibold font-merriweather text-dGreen text-xl w-[240px]">PSA Birth Certificate:</label>
                       
                        <PreviewModal />
                        {birthCert ? (
                        <div className="flex items-center gap-2 w-[300px] ">
                            <button
                                type="button"
                                onClick={() => previewImage(birthCert)}
                                className="text-dGreen underline text-sm bg-gray-200 rounded flex-1 text-left truncate p-1 w-[300px] h-[35px]"
                                title="Click to preview"
                                >
                                {birthCert.name}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                setBirthCert(null);
                                if (birthCertRef.current) birthCertRef.current.value = "";}}
                                className="text-red-500 hover:text-red-700 font-bold"
                                title="Remove file"
                                >
                                    ✕
                            </button>
                        </div>
                        
                        ) : (
                        <input
                            type="file"
                            ref={birthCertRef}
                            accept="image/*"
                            onChange={handleBirthCertChange}
                            name="document"
                            className="border bg-gray-200 rounded-sm p-1 w-[300px] h-[35px]"
                        />
                        )}
                        
                    </section>
                    <section className="flex flex-row gap-3 items-center">
                        <label className="font-semibold font-merriweather text-dGreen text-xl w-[240px]">Good Moral Certificate:</label>

                       {goodMoral ? (
                        <div className="flex items-center gap-2 w-[300px] ">
                            <button
                                type="button"
                                onClick={() => previewImage(goodMoral)}
                                className="text-dGreen underline text-sm bg-gray-200 rounded flex-1 text-left truncate p-1 w-[300px] h-[35px]"
                                title="Click to preview"
                                >
                                {goodMoral.name}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                setBirthCert(null);
                                if (goodMoralRef.current) goodMoralRef.current.value = "";}}
                                className="text-red-500 hover:text-red-700 font-bold"
                                title="Remove file"
                                >
                                    ✕
                            </button>
                        </div>
                        
                        ) : (
                        <input
                            type="file"
                            ref={goodMoralRef}
                            accept="image/*"
                            onChange={handleGoodMoralChange}
                            name="document"
                            className="border bg-gray-200 rounded-sm p-1 w-[300px] h-[35px]"
                        />
                        )}
                        
                    </section>
                    <section className="flex flex-row gap-3 items-center">
                        <label className="font-semibold font-merriweather text-dGreen text-xl w-[240px]">REPORT CARD:</label>

                       {reportCard ? (
                        <div className="flex items-center gap-2 w-[300px] ">
                            <button
                                type="button"
                                onClick={() => previewImage(reportCard)}
                                className="text-dGreen underline text-sm bg-gray-200 rounded flex-1 text-left truncate p-1 w-[300px] h-[35px]"
                                title="Click to preview"
                                >
                                {reportCard.name}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                setBirthCert(null);
                                if (reportCardRef.current) reportCardRef.current.value = "";}}
                                className="text-red-500 hover:text-red-700 font-bold"
                                title="Remove file"
                                >
                                    ✕
                            </button>
                        </div>
                        
                        ) : (
                        <input
                            type="file"
                            ref={reportCard}
                            accept="image/*"
                            onChange={handleReportCardChange}
                            name="document"
                            className="border bg-gray-200 rounded-sm p-1 w-[300px] h-[35px]"
                        />
                        )}

                    </section>
                    <section className="flex flex-row gap-3 items-center">
                        <label className="font-semibold font-merriweather text-dGreen text-xl w-[240px]">2x2 ID picture:</label>

                       {idPic ? (
                        <div className="flex items-center gap-2 w-[300px] ">
                            <button
                                type="button"
                                onClick={() => previewImage(idPic)}
                                className="text-dGreen underline text-sm bg-gray-200 rounded flex-1 text-left truncate p-1 w-[300px] h-[35px]"
                                title="Click to preview"
                                >
                                {idPic.name}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                setBirthCert(null);
                                if (idPicRef.current) idPicRef.current.value = "";}}
                                className="text-red-500 hover:text-red-700 font-bold"
                                title="Remove file"
                                >
                                    ✕
                            </button>
                        </div>
                        
                        ) : (
                        <input
                            type="file"
                            ref={idPicRef}
                            accept="image/*"
                            onChange={handleIdPIcChange}
                            name="document"
                            className="border bg-gray-200 rounded-sm p-1 w-[300px] h-[35px]"
                        />
                        )}                        
                    </section>
                    <section className="flex flex-row gap-3 items-center">
                        <label className="font-semibold font-merriweather text-dGreen text-xl w-[240px]">CACPRISAA Student Exit Clearance:</label>

                        {studentExitForm ? (
                        <div className="flex items-center gap-2 w-[300px] ">
                            <button
                                type="button"
                                onClick={() => previewImage(studentExitForm)}
                                className="text-dGreen underline text-sm bg-gray-200 rounded flex-1 text-left truncate p-1 w-[300px] h-[35px]"
                                title="Click to preview"
                                >
                                {studentExitForm.name}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                setBirthCert(null);
                                if (studentExitFormRef.current) studentExitFormRef.current.value = "";}}
                                className="text-red-500 hover:text-red-700 font-bold"
                                title="Remove file"
                                >
                                    ✕
                            </button>
                        </div>
                        
                        ) : (
                        <input
                            type="file"
                            ref={studentExitFormRef}
                            accept="image/*"
                            onChange={handleStudentExitFormChange}
                            name="document"
                            className="border bg-gray-200 rounded-sm p-1 w-[300px] h-[35px]"
                        />
                        )}
                    </section>
                </main>
            ),
        },
        {
            title: (
                <div>
                    <p className="text-2xl text-dGreen font-bold font-merriweather">
                        Appilication Submission
                    </p>
                </div>
            ),
            content: (
               <div className="w-full mt-10 text-center">
                    <Button
                        variant="mButton"
                        onClick={handleAdd}
                        disabled={isSubmitting}
                        className="w-[150px] h-[45px] text-xl rounded-xl"
                    >
                        Submit
                    </Button>
                </div>
            ),
        },
    ];

    const handlePrev = () => {
        if (page > 0) setPage(page - 1);
        setErrors({}); 
    };

    const handleNext  = async () => {
        if (!(await validatePage())) return;
        if (page < sections.length - 1) setPage(page + 1);
        setErrors({}); 
    };

    // Add this function to handle opening remarks modal
    const handleOpenRemarks = (remarks: { regRemarks: string | null; cashierRemarks: string | null; regDate: string | null; cashierDate: string | null }) => {
        openRemarks(remarks);
    };

    return (
        <main className="min-h-[600px] w-full mt-2 p-5 flex flex-col">
            <div className="h-full ">
                <section className="w-full text-center">
                    <div className="flex justify-start" >
                        <Link href="/">home</Link> 
                    </div>
                    <RemarksModal />
                    <p className="text-4xl text-dGreen font-bold font-merriweather">
                        Junior High School Application
                    </p>
                </section>

                {/* content */}
                <div className="flex-1 mt-[80px] mx-[70px] flex flex-col gap-3">
                     {sections[page].title}
                     <hr className="border-b-2 border-dGreen" />
                    {sections[page].content}
                </div>

                {/* buttona */}
                <div className="w-full flex justify-center gap-10 mt-[50px]">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                        onClick={handlePrev}
                        disabled={page === 0}
                    >
                        Previous
                    </button>
                    <span className="text-sm text-gray-600 self-center">
                        Page {page + 1} of {sections.length}
                    </span>
                    <button
                        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                        onClick={handleNext}
                        disabled={page === sections.length - 1}
                    >
                        Next
                    </button>
                </div>
            </div>
        </main>
    )
};