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
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";




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
    const [studentType, setStudentType] = useState("");
    const [schoolType, setSchoolType] = useState("");
    const [schoolName, setSchoolName ] = useState("");
    const [schoolAddress, setSchoolAddress] = useState("");

    const [birthCert, setBirthCert] =  useState<File | null>(null);
    const [reportCard, setReportCard] = useState<File | null>(null);
    const [goodMoral, setGoodMoral] = useState<File | null>(null);
    const [idPic, setIdPic] = useState<File | null>(null);
    const [studentExitForm, setStudentExitForm] = useState<File | null>(null);
    const [form137, setForm137] = useState<File | null>(null);

    const [mop, setMop] = useState("");
    const [reservationReceipt, setReservationReceipt] = useState<File | null>(null);
    const [reservationAmount, setReservationAmount] = useState(0);
        
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isBankTransferSelected, setIsBankTransferSelected] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isGcashSelected, setIsGcashSelected] = useState(false);
    
    const gcashReceiptRef = useRef<HTMLInputElement>(null);
    const bankTransferReceiptRef = useRef<HTMLInputElement>(null);
    
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
    const form137Ref = useRef<HTMLInputElement>(null);

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
                    setStudentType(data.studentType || "");
                    setSchoolType(data.schoolType || "");
                    setSchoolName(data.prevSchool || "");
                    setSchoolAddress(data.schoolAddress || "");

                    setMop(data.mop || "");
                    setReservationAmount(data.reservationAmount || 0);

                
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
                    setForm137(data.form137 ? await urlToFile(data.form137, "form137") : null);

                    setReservationReceipt(data.reservationReceipt ? await urlToFile(data.reservationReceipt, "reservationReceipt") : null);
                    
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
    }, [trackingId]);


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
            newErrors.dateOfBirth = "invalid";
            setErrors(newErrors);
            toast.error("Date of birth cannot be in the future.");
            return false;
        }   
        

        if(!validateMinDate(new Date(dateOfBirth))){
            newErrors.dateOfBirth = "invalid";
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



    case 4:
        const mopFilled = !!mop;
        const receiptFilled = !!reservationReceipt;
        const amountFilled = reservationAmount > 0;
            
        const anyFilled = mopFilled || receiptFilled || amountFilled;
        const allFilled = mopFilled && receiptFilled && amountFilled;
            
        if (anyFilled && !allFilled) {
            if (!mopFilled) newErrors.mop = "Required if other payment fields are filled.";
            if (!amountFilled) newErrors.reservationAmount = "Required if other payment fields are filled.";
            if (!receiptFilled) newErrors.reservationReceipt = "Required if other payment fields are filled.";
            
            setErrors(newErrors);
            toast.error("Keep all fields blank or complete all payment details.");
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

const handleForm137Change = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm137(file);
    }
};


    const handleMopChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setMop(e.target.value);
        setIsGcashSelected(e.target.value === "GCash");
        setIsBankTransferSelected(e.target.value === "Bank Transfer");
        // Clear the receipt when payment method changes
        setReservationReceipt(null);
        if (gcashReceiptRef.current) gcashReceiptRef.current.value = "";
        if (bankTransferReceiptRef.current) bankTransferReceiptRef.current.value = "";
    };
    const handleReservationAmount = (e: ChangeEvent<HTMLInputElement>) => {
        setReservationAmount(Number(e.target.value));
    };

    const handleReceiptChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setReservationReceipt(file);
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
            const uploadForm137 = form137 ? await uploadImage(form137, 'documents') : "";
            const uploadReservationReceipt = reservationReceipt ? await uploadImage(reservationReceipt, 'reservationPayments') : "";

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
                form137: uploadForm137,

                mop,
                reservationAmount,
                reservationReceipt: uploadReservationReceipt,

                trackingId: trackingId,
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
                    <p className="sm:text-lg lg::text-2xl text-dGreen font-bold font-merriweather">
                        Section 1: Personal Information
                    </p>
                </div>
            ),
            content: (
            <main className=" w-full flex flex-col gap-10 px-0 lg:px-10 h-auto mt-2 ">

                <section className="w-full px-0 sm:px-2 py-2">

                    <span className="pl-2 ml-0 sm:ml-2 text-[13px] sm:text-[14px] lg:text-[16px] text-dGreen font-semibold border-l-4 rounded-sm border-dGreen font-merriweather">Personal Details:</span>
                    <div className="w-full gap-4 flex flex-col shadow-lg py-8 px-2 lg:px-8 bg-gray-100/50 border-2 border-gray-100 rounded-lg mt-3 ">

                        <section className="flex flex-col sm:flex-row gap-5 mb-3 sm:mb-0">
                            <div className="flex flex-col">
                                <span className="text-xs lg:text-sm text-dGreen font-semibold">Last Name <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></span>
                                <input 
                                    type="text" 
                                    placeholder="Dela Cruz"
                                    onChange={(e) => setApplicantsLastName(e.target.value)}
                                    value={applicantsLastName}
                                    className={`rounded-sm px-1 w-full sm:w-[170px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.applicantsLastName ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`} 
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs lg:text-sm text-dGreen font-semibold">First Name <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></span>
                                <input type="text"
                                    placeholder="John"
                                    onChange={(e) => setApplicantsFirstName(e.target.value)}
                                    value={applicantsFirstName}
                                    className={`rounded-sm px-1 w-full sm:w-[170px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.applicantsFirstName ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`} 
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs lg:text-sm text-dGreen font-semibold"> Middle Name</span>
                                <input 
                                    type="text" 
                                    placeholder="Doe" 
                                    onChange={(e) => setApplicantsMiddleName(e.target.value)}
                                    value={applicantsMiddleName}
                                    className="rounded-sm px-1 w-full sm:w-[170px] lg::w-[300px] py-[6px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs lg:text-sm text-dGreen font-semibold"> Suffix</span>
                                <input
                                    type="text" 
                                    placeholder="Jr." 
                                    onChange={(e) => setApplicantsSuffix(e.target.value)}
                                    value={applicantsSuffix}
                                    className="rounded-sm px-1  w-full sm:w-[70px] lg:w-[100px] py-[6px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
                                />
                            </div>
                        </section>
                        <section className="flex flex-col sm:flex-row gap-5">
                            <div className="flex flex-col">
                                <span className="text-xs lg:text-sm text-dGreen font-semibold">Date Of Birth <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></span>
                                <input 
                                    type="date" 
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                    value={dateOfBirth}
                                    className={`rounded-sm px-1 w-full sm:w-[170px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.dateOfBirth ? 'border border-red-600 bg-red-100' : 'bg-green-100'} 
                                    ${dateOfBirth === '' ? 'text-gray-500' : 'text-black'}`} 
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs lg:text-sm text-dGreen font-semibold">Age <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></span>
                                <input 
                                type="text" 
                                value={age}
                                disabled
                                    className="rounded-sm px-1 w-full sm:w-[170px] lg::w-[300px] py-[6px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
                            />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs lg:text-sm text-dGreen font-semibold">Gender <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></span>
                                <select 
                                    name="Gender"
                                    onChange={(e) => setGender(e.target.value)}
                                    value={gender}
                                    className={`rounded-sm px-1 w-full sm:w-[170px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.gender ? 'border border-red-600 bg-red-100' : 'bg-green-100'} 
                                    ${gender === '' ? 'text-gray-500' : 'text-black'}`}>
                                        <option value="" >Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                </select>
                            </div>
                        </section>

                    </div>
                </section>

                <section className="w-full px-2 py-2">

                    <span className="pl-2 ml-0 sm:ml-2 text-[13px] sm:text-[14px] lg:text-[16px] text-dGreen font-semibold border-l-4 rounded-sm border-dGreen font-merriweather"> Contact Information:</span>
                    <div className="w-full gap-4 flex flex-col shadow-lg py-8 px-2 lg:px-8 bg-gray-100/50 border-2 border-gray-100 rounded-lg mt-3 ">

                        <section className="flex flex-col sm:flex-row gap-5">
                            <div className="flex flex-col">
                                <span className="text-xs lg:text-sm text-dGreen font-semibold">Mobile Number <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></span>
                                <input 
                                    type="text" 
                                    placeholder="09XXXXXXXX" 
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                    value={mobileNumber}
                                    className={`rounded-sm px-1 w-full sm:w-[170px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.mobileNumber ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`} 
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs lg:text-sm text-dGreen font-semibold">Email <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></span>
                                <input 
                                    type="text" 
                                    placeholder="l7B4G@example.com" 
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    className={`rounded-sm px-1 w-full sm:w-[170px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.email ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`} 
                                />
                            </div>
                        </section>

                    </div>
                </section>
     
            </main>
            ),
        },

        {
            title: (
                <div>
                    <p className="sm:text-lg lg::text-2xl text-dGreen font-bold font-merriweather">
                        Section 2: Contact & Guardian Details
                    </p>
                </div>
            ),
            content: (
            <main className=" w-full flex flex-col gap-10 px-0 lg:px-10 h-auto mt-2 ">

                <section className="w-full px-0 sm:px-2 py-2">

                    <span className="pl-2 ml-0 sm:ml-2 text-[13px] sm:text-[14px] lg:text-[16px] text-dGreen font-semibold border-l-4 rounded-sm border-dGreen font-merriweather">Personal Details:</span>
                    <div className="w-full gap-4 flex flex-col shadow-lg py-8 px-2 lg:px-8 bg-gray-100/50 border-2 border-gray-100 rounded-lg mt-3 ">

                        <section className="flex flex-col sm:flex-row gap-5">
                            <div className="flex flex-col">
                                <span className="text-xs lg:text-sm text-dGreen font-semibold">Last Name <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></span>
                                <input 
                                    type="text" 
                                    placeholder="Garcia"
                                    onChange={(e) => setGuardianLastName(e.target.value)}
                                    value={guardiansLastName}
                                    className={`rounded-sm px-1 w-full sm:w-[170px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.guardiansLastName ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`} 
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs lg:text-sm text-dGreen font-semibold">First Name <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></span>
                                <input 
                                    type="text" 
                                    placeholder="John" 
                                    onChange={(e) => setGuardianFirstName(e.target.value)}
                                    value={guardiansFirstName}
                                    className={`rounded-sm px-1 w-full sm:w-[170px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.guardiansFirstName ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`} 
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs lg:text-sm  text-dGreen font-semibold">Middle Name</span>
                                <input 
                                    type="text" 
                                    placeholder="Doe"
                                    onChange={(e) => setGuardianMiddleName(e.target.value)}
                                    value={guardiansMiddleName}
                                    className="rounded-sm px-1 w-full sm:w-[170px] lg:w-[300px] py-[6px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs lg:text-sm text-dGreen font-semibold">Suffix</span>
                                <input 
                                    type="text" 
                                    placeholder="Doe"
                                    onChange={(e) => setGuardianSuffix(e.target.value)}
                                    value={guardiansSuffix}
                                    className="rounded-sm px-1 w-full sm:w-[70px] lg:w-[100px] py-[6px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
                                />
                            </div>
                        </section>

                        <section className="flex flex-col sm:flex-row gap-5 sm:mt-0 mt-1"  >
                            <div className="flex flex-col">
                                <span className="text-xs lg:text-sm  text-dGreen font-semibold">Full Address <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></span>
                                <input 
                                    type="text" 
                                    placeholder="123 Main Street, City, Country"
                                    onChange={(e) => setFullAddress(e.target.value)}
                                    value={fullAddress}
                                    className={`rounded-sm px-1 w-full sm:w-[600px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.fullAddress ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`} 
                                />
                            </div>
                        </section>

                    </div>
                </section>

                <section className="w-full px-2 py-2">

                    <span className="pl-2 ml-0 sm:ml-2 text-[13px] sm:text-[14px] lg:text-[16px] text-dGreen font-semibold border-l-4 rounded-sm border-dGreen font-merriweather"> Emergency Contact Information:</span>
                    <div className="w-full gap-4 flex flex-col shadow-lg py-8 px-2 lg:px-8 bg-gray-100/50 border-2 border-gray-100 rounded-lg mt-3 ">

                        <section className="flex flex-col sm:flex-row gap-5">
                            <div className="flex flex-col">
                                <span className="text-xs lg:text-sm  text-dGreen font-semibold">Mobile Number <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></span>
                                <input 
                                    type="text" 
                                    placeholder="09XXXXXXXX" 
                                    onChange={(e) => setEmergencyContact(e.target.value)}
                                    value={emergencyContact}
                                    className={`rounded-sm px-1 w-full sm:w-[170px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.setEmergencyContact ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`} 
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs lg:text-sm  text-dGreen font-semibold">Email </span>
                                <input 
                                    type="text" 
                                    placeholder="l7B4G@example.com" 
                                    onChange={(e) => setEmergencyEmail(e.target.value)}
                                    value={emergencyEmail}
                                    className="rounded-sm px-1 w-full sm-[150px] lg::w-[300px] py-[6px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"

                                />
                            </div>
                        </section>

                    </div>
                </section>
            </main>
                
            ),
        },
        {
            title: (
                <div>
                    <p className="text-[15px] sm:text-lg lg::text-2xl text-dGreen font-bold font-merriweather">
                        Section 3: Educational Background
                    </p>
                </div>
            ),
            content: (
            <main className=" w-full flex flex-col gap-10 px-0 lg:px-10 h-auto mt-2 ">

                <section className="w-full px-0 sm:px-2 py-2">

                    <span className="pl-2 ml-0 sm:ml-2 text-[13px] sm:text-[14px] lg:text-[16px] text-dGreen font-semibold border-l-4 rounded-sm border-dGreen font-merriweather"> Enrollment Information:</span>
                    <div className="w-full gap-4 flex flex-col shadow-lg py-8 px-2 lg:px-8 bg-gray-100/50 border-2 border-gray-100 rounded-lg mt-3 ">

                        <section className="flex flex-col sm:flex-row gap-5">
                            <div className="flex flex-col">
                                <span className="text-xs lg:text-sm text-dGreen font-semibold">LRN <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></span>
                                <input 
                                    type="text" 
                                    placeholder="123456789102"
                                    onChange={(e) => setLrn(e.target.value)}
                                    value={lrn}
                                    className={`rounded-sm px-1 w-full sm:w-[190px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.lrn ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`} 
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs lg:text-sm text-dGreen font-semibold">Grade to Enroll <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></span>
                                <select 
                                    name="grade to enroll"
                                    onChange={(e) => setGradeLevel(e.target.value)}
                                    value={gradeLevel}
                                    className={`rounded-sm px-1 w-full sm:w-[190px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.gradeLevel ? 'border border-red-600 bg-red-100' : 'bg-green-100'} 
                                    ${gradeLevel === '' ? 'text-gray-500' : 'text-black'}`}>
                                        <option value="" >Select Grade</option>
                                        <option value="7">Grade 7</option>
                                        <option value="8">grade 8</option>
                                        <option value="9">Grade 9</option>
                                        <option value="10">Grade 10</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs lg:text-sm text-dGreen font-semibold">Student Type <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></span>
                                <select 
                                    name="student type"
                                    onChange={(e) => setStudentType(e.target.value)}
                                    value={studentType}
                                    className={`rounded-sm px-1 w-full sm:w-[190px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.studentType ? 'border border-red-600 bg-red-100' : 'bg-green-100'} 
                                    ${studentType === '' ? 'text-gray-500' : 'text-black'}`}>
                                        <option value="" >Select Option</option>
                                        <option value="New">Incoming G7</option>
                                        <option value="Transferee">Transferee</option>
                                        <option value="Returnee">Old Student</option>
                                </select>
                            </div>
                        </section>

                    </div>
                </section>


                <section className="w-full px-2 py-2">

                    <span className="pl-2 ml-0 sm:ml-2 text-[13px] sm:text-[14px] lg:text-[16px] text-dGreen font-semibold border-l-4 rounded-sm border-dGreen font-merriweather"> Previous School Information:</span>
                    <div className="w-full gap-4 flex flex-col shadow-lg py-8 px-2 lg:px-8 bg-gray-100/50 border-2 border-gray-100 rounded-lg mt-3   ">

                        <section className="flex flex-col gap-4">
                            <div className="flex flex-col sm:flex-row gap-5">
                                <div className="flex flex-col">
                                    <span className="text-xs lg:text-sm text-dGreen font-semibold">SY Graduated <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></span>
                                    <select
                                        name="schoolYear"
                                        onChange={(e) => setSchoolYear(e.target.value)}
                                        className={`rounded-sm px-1 w-full sm:w-[190px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                        ${errors.schoolYear ? 'border border-red-600 bg-red-100' : 'bg-green-100'} 
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
                                <div className="flex flex-col">
                                    <span className="text-xs lg:text-sm text-dGreen font-semibold">School Type <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></span>
                                    <select 
                                        name="Gender"
                                        onChange={(e) => setSchoolType(e.target.value)}
                                        value={schoolType}
                                        className={`rounded-sm px-1 w-full sm:w-[190px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                        ${errors.schoolType ? 'border border-red-600 bg-red-100' : 'bg-green-100'} 
                                        ${schoolType === '' ? 'text-gray-500' : 'text-black'}`}>
                                            <option value="" >Select School Type</option>
                                            <option value="Private">Private</option>
                                            <option value="Public">Public</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col ">
                                <span className="text-xs lg:text-sm text-dGreen font-semibold">Previous School <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></span>
                                <input 
                                    type="text" 
                                    placeholder="AB Normal Schoool"
                                    onChange={(e) => setSchoolName(e.target.value)}
                                    value={schoolName}
                                    className={`rounded-sm px-1 w-full sm:w-[600px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.schoolName ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`}
                                />
                            </div>

                            <div className="flex flex-col">
                                <span className="text-xs lg:text-sm text-dGreen font-semibold">School Address <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></span>
                                <input 
                                    type="text"
                                    placeholder="123 Street, City, Country"
                                    onChange={(e) => setSchoolAddress(e.target.value)}
                                    value={schoolAddress}
                                    className={`rounded-sm px-1 w-full sm:w-[600px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.schoolAddress ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`}
                                />
                            </div>
                           
                        </section>

                    </div>
                </section>
            </main>
            ),
        },

        
           {
                title: (
                    <div>
                        <p className="text-[15px] sm:text-lg lg::text-2xl text-dGreen font-bold font-merriweather">
                            Section 4: Documents Submission
                        </p>
                    </div>
                ),
                content: (
                <main className=" w-full flex flex-col gap-10 px-0 lg:px-10 h-auto mt-2 ">

                    <section className="w-full px-0 sm:px-2 py-2">

                        <span className="pl-2 ml-0 sm:ml-2 text-[13px] sm:text-[14px] lg:text-[16px] text-dGreen font-semibold border-l-4 rounded-sm border-dGreen font-merriweather"> Identity Documents:</span>
                        <div className="w-full gap-4 flex flex-col shadow-lg py-8 px-2 lg:px-8 bg-gray-100/50 border-2 border-gray-100 rounded-lg mt-3 ">

                            <section className="flex flex-col sm:flex-row gap-8">
                                <div className="flex flex-col">
                                    <span className="text-xs lg:text-sm text-dGreen font-semibold">Birth Certificate </span>
                                    <PreviewModal />
                                    {birthCert ? (
                                    <div 
                                        className="flex flex-col gap-1 w-full sm:w-[190px] lg:w-[320px]"
                                        key="birthcert_preview"
                                    >
                                        <div className="flex flex-row items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => previewImage(birthCert)}
                                                className="w-full sm:w-[180px] lg:w-[320px] py-[6px] border-2 border-dGreen bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition flex-1 text-left truncate p-"
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
                                    </div>
                                    
                                    ) : (
                                    <div 
                                        className="flex flex-col gap-1 "
                                        key="birthcert_upload"
                                    >
                                        <input
                                            type="file"
                                            ref={birthCertRef}
                                            accept="image/*"
                                            onChange={handleBirthCertChange}
                                            name="document"
                                            className="rounded-sm px-1 w-full sm:w-[200px] lg:w-[320px] py-[6px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
                                        />
                                    </div>
                                    )}
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-xs lg:text-sm text-dGreen font-semibold">id picture </span>
                                    {idPic ? (
                                    <div 
                                        className="flex flex-col gap-1 w-full sm:w-[190px] lg:w-[320px]"
                                        key="idpic_preview"
                                    >
                                        <div className="flex flex-row items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => previewImage(idPic)}
                                                className="w-full sm:w-[180px] lg:w-[320px] py-[6px] border-2 border-dGreen bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition flex-1 text-left truncate p-"
                                                title="Click to preview"
                                                >
                                                {idPic.name}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                setIdPic(null);
                                                if (idPicRef.current) idPicRef.current.value = "";}}
                                                className="text-red-500 hover:text-red-700 font-bold"
                                                title="Remove file"
                                                >
                                                    ✕
                                            </button>
                                        </div>
                                    </div>
                                    
                                    ) : (
                                    <div 
                                        className="flex flex-col gap-1 "
                                        key="idpic_upload"
                                    >
                                        <input
                                            type="file"
                                            ref={idPicRef}
                                            accept="image/*"
                                            onChange={handleIdPIcChange}
                                            name="document"
                                            className="rounded-sm px-1 w-full sm:w-[200px] lg:w-[320px] py-[6px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
                                        />
                                    </div>
                                    )}
                                </div>
                                
                            </section>

                        </div>
                    </section>

                    <section className="w-full px-0 sm:px-2 py-2">

                    <span className="pl-2 ml-0 sm:ml-2 text-[13px] sm:text-[14px] lg:text-[16px] text-dGreen font-semibold border-l-4 rounded-sm border-dGreen font-merriweather"> Academic Records:</span>
                        <div className="w-full gap-4 flex flex-col shadow-lg py-8 px-2 lg:px-8 bg-gray-100/50 border-2 border-gray-100 rounded-lg mt-3 ">

                            <section className="flex flex-col gap-8">
                                <div className="flex flex-col sm:flex-row gap-8">
                                <div className="flex flex-col">
                                    <span className="text-xs lg:text-sm text-dGreen font-semibold">Report Card </span>
                                    {reportCard ? (
                                    <div 
                                        className="flex flex-col gap-1 w-full sm:w-[190px] lg:w-[320px]"
                                        key="reportcard_preview"
                                    >
                                        <div className="flex flex-row items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => previewImage(reportCard)}
                                                className="w-full sm:w-[180px] lg:w-[320px] py-[6px] border-2 border-dGreen bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition flex-1 text-left truncate p-"
                                                title="Click to preview"
                                                >
                                                {reportCard.name}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                setReportCard(null);
                                                if (reportCardRef.current) reportCardRef.current.value = "";}}
                                                className="text-red-500 hover:text-red-700 font-bold"
                                                title="Remove file"
                                                >
                                                    ✕
                                            </button>
                                        </div>
                                    </div>
                                    
                                    ) : (
                                    <div 
                                        className="flex flex-col gap-1 "
                                        key="reportcard_upload"
                                    >
                                        <input
                                            type="file"
                                            ref={reportCardRef}
                                            accept="image/*"
                                            onChange={handleReportCardChange}
                                            name="document"
                                            className="rounded-sm px-1 w-full sm:w-[200px] lg:w-[320px] py-[6px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
                                        />
                                    </div>
                                    )}
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-xs lg:text-sm text-dGreen font-semibold">Form 137 </span>
                                    {form137 ? (
                                    <div 
                                        className="flex flex-col gap-1 w-full sm:w-[190px] lg:w-[320px]"
                                        key="form137_preview"
                                    >
                                        <div className="flex flex-row items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => previewImage(form137)}
                                                className="w-full sm:w-[180px] lg:w-[320px] py-[6px] border-2 border-dGreen bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition flex-1 text-left truncate p-"
                                                title="Click to preview"
                                                >
                                                {form137.name}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                setForm137(null);
                                                if (form137Ref.current) form137Ref.current.value = "";}}
                                                className="text-red-500 hover:text-red-700 font-bold"
                                                title="Remove file"
                                                >
                                                    ✕
                                            </button>
                                        </div>
                                    </div>
                                    
                                    ) : (
                                    <div 
                                        className="flex flex-col gap-1 "
                                        key="form137_upload"
                                    >
                                        <input
                                            type="file"
                                            ref={form137Ref}
                                            accept="image/*"
                                            onChange={handleForm137Change}
                                            name="document"
                                            className="rounded-sm px-1 w-full sm:w-[200px] lg:w-[320px] py-[6px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
                                        />
                                    </div>
                                    )}
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-xs lg:text-sm text-dGreen font-semibold">Good Moral </span>
                                    {goodMoral ? (
                                    <div 
                                        className="flex flex-col gap-1 w-full sm:w-[190px] lg:w-[320px]"
                                        key="goodmoral_preview"
                                    >
                                        <div className="flex flex-row items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => previewImage(goodMoral)}
                                                className="w-full sm:w-[180px] lg:w-[320px] py-[6px] border-2 border-dGreen bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition flex-1 text-left truncate p-"
                                                title="Click to preview"
                                                >
                                                {goodMoral.name}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                setGoodMoral(null);
                                                if (goodMoralRef.current) goodMoralRef.current.value = "";}}
                                                className="text-red-500 hover:text-red-700 font-bold"
                                                title="Remove file"
                                                >
                                                    ✕
                                            </button>
                                        </div>
                                    </div>
                                    
                                    ) : (
                                    <div 
                                        className="flex flex-col gap-1 "
                                        key="goodmoral_upload"
                                    >
                                        <input
                                            type="file"
                                            ref={goodMoralRef}
                                            accept="image/*"
                                            onChange={handleGoodMoralChange}
                                            name="document"
                                            className="rounded-sm px-1 w-full sm:w-[200px] lg:w-[320px] py-[6px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
                                        />
                                    </div>
                                    )}
                                </div>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-xs lg:text-sm text-dGreen font-semibold">CAPRISSA (if private) </span>
                                    {studentExitForm ? (
                                    <div 
                                        className="flex flex-col gap-1 w-full sm:w-[190px] lg:w-[320px]"
                                        key="student_exit_preview"
                                    >
                                        <div className="flex flex-row items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => previewImage(studentExitForm)}
                                                className="w-[180px] sm:w-[320px] py-[6px] border-2 border-dGreen bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition flex-1 text-left truncate p-"
                                                title="Click to preview"
                                                >
                                                {studentExitForm.name}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                setStudentExitForm(null);
                                                if (studentExitFormRef.current) studentExitFormRef.current.value = "";}}
                                                className="text-red-500 hover:text-red-700 font-bold"
                                                title="Remove file"
                                                >
                                                    ✕
                                            </button>
                                        </div>
                                    </div>
                                    
                                    ) : (
                                    <div 
                                        className="flex flex-col gap-1 "
                                        key="student_exit_upload"
                                    >
                                        <input
                                            type="file"
                                            ref={studentExitFormRef}
                                            accept="image/*"
                                            onChange={handleStudentExitFormChange}
                                            name="document"
                                            className="rounded-sm px-1 w-full sm:w-[200px] lg:w-[320px] py-[6px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
                                        />
                                    </div>
                                    )}
                                </div>
                                
                            </section>

                        </div>
                    </section>


                    
                </main>
                ),
            },

         {
            title: (
                <div>
                    <p className="text-[15px] sm:text-lg lg::text-2xl text-dGreen font-bold font-merriweather">
                        Section 5: Slot Reservation Fee Minimum (₱500)
                    </p>
                </div>
                ),
            content: (
            <main className="w-full flex flex-col gap-5"> 

                <section className=" md:flex  grid-cols-1 justify-center gap-5 pb-10 w-full">

                    <div className="w-full md:w-1/2 flex flex-col items-center gap-10 mt-5 px-0 xl:px-10" >
                        <p className="sm:text-xl lg:text-2xl font-bold text-dGreen font-merriweather text-center"> GCash Payment </p>

                        <Card className="w-full backdrop-blur-md bg-green-200/10 border border-green-300/20 shadow-lg rounded-2xl">
                            <CardHeader>
                                <CardTitle className="text-dGreen text-center sm:text-lg lg:text-2xl underline font-merriweather font-extrabold">Step 1: Send the reservation fee</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-5">
                                <section className="flex justify-center gap-2">
                                    <p className="font-bold text-sm lg:text-lg text-dGreen ">
                                        Gcash: 091234567890
                                    </p>
                                    <button
                                    onClick={() => {
                                    navigator.clipboard.writeText("091234567890");
                                    toast.success("Copied to clipboard");
                                    }}>
                                        <Image
                                            src="/copy.png"
                                            alt="copy icon"
                                            width={1000}
                                            height={1000}
                                            className="lg:w-[20px] lg:h-[20px] w-[15px] h-[15px]"
                                        />
                                    </button>
                                </section>

                                <section className="font-regular text-sm sm:text-md text-dGreen flex flex-row justify-center gap-3">
                                    <p> Click this to download the QR Code</p>
                                    <button
                                        onClick={() => {
                                        const link = document.createElement("a");
                                        link.href = "/qr.jpg";
                                        link.download = "qr.jpg";
                                        link.click();
                                        toast.success("QR Code downloaded");
                                    }}>
                                        <Image
                                            src="/dl.png"
                                            alt="download icon"
                                            width={20}
                                            height={20}
                                        />
                                    </button>
                                </section>
                            </CardContent>
                        </Card>
                        
                        <Card className="w-full backdrop-blur-md bg-green-200/10 border border-green-300/20 shadow-lg rounded-2xl"> 
                            <CardHeader> 
                                <CardTitle className="text-dGreen text-center sm:text-lg lg:text-2xl underline font-merriweather font-extrabold">Step 2: Upload proof of payment</CardTitle> 
                            </CardHeader> 
                            <CardContent className="flex flex-col gap-5"> 
                                <section className="flex flex-col items-center"> 
                                    <div className="text-start"> 
                                        <p className="font-regular sm:text-md lg:text-lg text-d2Green"> Make sure the <strong className="font-bold text-d2Green">Reference No.</strong> is clearly visible. </p> 
                                    </div> 
                                </section> 
                                <section className="font-regular text-md text-dGreen flex flex-row justify-center gap-3"> 
                                    <figure> 
                                        <Image 
                                            src="/image.png" 
                                            alt="receipt" 
                                            width={1000} 
                                            height={1000}
                                            className="w-[300px] h-[250px]" 
                                        /> 
                                    </figure> 
                                </section> 
                            </CardContent> 
                        </Card>
                    </div>

                    <div className=" my-10 md:my-0 bg-green-900 md:h-auto h-[4px] md:w-[2px] w-full" />

                    <div className="w-full md:w-1/2 flex flex-col items-center gap-10 mt-5 px-0 xl:px-10" >
                        <p className="sm:text-xl lg:text-2xl font-bold text-dGreen font-merriweather text-center"> Bank Transfer </p>

                        <Card className="w-full backdrop-blur-md bg-green-200/10 border border-green-300/20 shadow-lg rounded-2xl">
                            <CardHeader>
                                <CardTitle className="text-dGreen text-center sm:text-lg lg:text-2xl underline font-merriweather font-extrabold">Step 1: Send the reservation fee</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-5">
                                <section className="flex justify-center">
                                    <div className="grid grid-cols-2 gap-y-2 gap-x-[30px] lg:gap-x-[80px] text-dGreen sm:text-sm lg:text-lg w-fit">
                                        <p className="font-bold">Bank Name:</p>
                                        <p className="font-semibold">BDO</p>

                                        <p className="font-bold">Account Name:</p>
                                        <p className="font-semibold">John Doe</p>

                                        <p className="font-bold">Account Number:</p>
                                        <p className="font-semibold">1234-5678-9101</p>
                                    </div>
                                </section>

                                <section className="font-regular sm:text-sm lg:text-md text-dGreen flex flex-row justify-center gap-3">
                                    <p> Click this to download the QR Code</p>
                                    <button
                                        onClick={() => {
                                        const link = document.createElement("a");
                                        link.href = "/qr.jpg";
                                        link.download = "qr.jpg";
                                        link.click();
                                        toast.success("QR Code downloaded");
                                    }}>
                                        <Image
                                            src="/dl.png"
                                            alt="download icon"
                                            width={1000}
                                            height={1000}
                                            className="w-[20px] h-[20px]"
                                        />
                                    </button>
                                </section>
                            </CardContent>
                        </Card>

                        <Card className="w-full backdrop-blur-md bg-green-200/10 border border-green-300/20 shadow-lg rounded-2xl">
                            <CardHeader>
                                <CardTitle className="text-dGreen text-center sm:text-lg lg:text-2xl underline font-merriweather font-extrabold">Step 2: Upload proof of payment</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-5">
                                <section className="flex flex-col items-center">
                                    <div className="text-start">
                                        <p className="font-regular sm:text-md lg:text-lg text-d2Green">
                                            Make sure the <strong className="font-bold text-d2Green">Reference No.</strong> is clearly visible.
                                        </p>
                                    </div>
                                </section>

                                <section className="font-regular text-md text-dGreen flex flex-row justify-center gap-3">
                                    <figure>
                                        <Image
                                            src="/bank.svg"
                                            alt="receipt"
                                            width={1000} 
                                            height={1000}
                                            className="w-[300px] h-[250px]" 
                                        />
                                    </figure>
                                </section>
                            </CardContent>
                        </Card>
                    </div>

                </section>

                <section className="w-full flex flex-col gap-6 items-center justify-center">
                    <PreviewModal />
                    <Card className="w-full max-w-[700px] backdrop-blur-md bg-green-100/10 border border-green-300/30 shadow-xl rounded-2xl px-0 sm:p-6">
                        <CardHeader>
                            <CardTitle className="text-lg sm:text-2xl font-bold text-dGreen text-center font-merriweather">
                            Payment Section
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="flex flex-col gap-6 items-center justify-start">
                            {/* Amount */}
                            <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 items-start sm:items-center w-full max-w-[500px]">
                            <label className="font-semibold font-merriweather text-dGreen  text-sm sm:text-xl w-[170px]">
                                Amount:
                            </label>
                            <input 
                                type="number" 
                                placeholder="500.00"
                                min="500"
                                step="0.01"
                                value={reservationAmount || ''}
                                className={`rounded-md px-3 h-[40px] w-full backdrop-blur-sm text-dGreen shadow-inner outline-none focus:ring-2 focus:ring-dGreen
                                ${errors.reservationAmount ? 'border border-red-600 bg-red-100' : ' bg-white/20'}`}
                                onChange={handleReservationAmount}
                            />
                            </div>

                            {/* Payment Method */}
                            <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 items-start sm:items-center w-full max-w-[500px]">
                            <label className="font-semibold font-merriweather text-dGreen  text-sm sm:text-xl w-[170px]">
                                Payment Method:
                            </label>
                            <select 
                                value={mop || ''}
                                className={`rounded-md px-3 h-[40px] w-full backdrop-blur-sm text-dGreen shadow-inner outline-none focus:ring-2 focus:ring-dGreen
                                ${errors.mop ? 'border border-red-600 bg-red-100' : ' bg-white/20'}`}
                                onChange={handleMopChange}
                            >
                                <option value="">Select Payment Method</option>
                                <option value="Gcash">GCash</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                            </select>
                            </div>

                            {/* Payment Receipt */}
                            <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 items-start sm:items-center w-full max-w-[500px]">
                            <label className="font-semibold font-merriweather text-dGreen  text-sm sm:text-xl w-[170px]">
                                Payment Receipt:
                            </label>

                            {reservationReceipt ? (
                                <div className="flex items-center gap-2 w-full">
                                <button
                                    type="button"
                                    onClick={() => previewImage(reservationReceipt)}
                                    className="text-dGreen underline text-sm bg-white/20 backdrop-blur-sm rounded-md flex-1 text-left truncate pl-3 py-2 h-[45px] shadow-inner"
                                    title="Click to preview"
                                >
                                    {reservationReceipt.name}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                    setReservationReceipt(null);
                                    if (gcashReceiptRef.current) gcashReceiptRef.current.value = "";
                                    if (bankTransferReceiptRef.current) bankTransferReceiptRef.current.value = "";
                                    }}
                                    className="text-red-500 hover:text-red-700 font-bold"
                                    title="Remove file"
                                >
                                    ✕
                                </button>
                                </div>
                            ) : (
                                <input 
                                type="file" 
                                name="document"  
                                accept="image/*"
                                onChange={handleReceiptChange}
                                className={`backdrop-blur-sm text-dGreen rounded-md p-2 w-full h-[45px] shadow-inner
                                    ${errors.reservationReceipt ? 'border border-red-600 bg-red-100' : ' bg-white/20'}`}
                                
                                />
                            )}
                            </div>
                        </CardContent>
                    </Card>

                </section>



            </main>
                    
            ),
        },

    {
        title: (
            <div>
                <p className="text-[15px] sm:text-lg lg::text-2xl text-dGreen font-bold font-merriweather">
                    Section 6: Application Submission
                </p>
            </div>
        ),
        content: (
        <main className="w-full mt-10 flex flex-col items-center justify-center px-0 sm:px-4">
        <section className="bg-white/90 rounded-2xl shadow-xl border border-green-200 w-full grid grid-cols-1 md:grid-cols-2 items-center mb-8">
            {/* Reminder Box */}
            <div className="mb-2 flex flex-col items-center px-4 sm:px-6 py-8 md:px-10 md:py-10">
            <div className="flex items-center gap-2 mb-2">
                <svg
                className="w-6 h-6 md:w-7 md:h-7 text-yellow-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                />
                </svg>
                <span className="text-xl md:text-2xl font-bold text-dGreen font-merriweather">
                Reminder
                </span>
            </div>
            <ul className="text-left text-d2Green text-sm md:text-base lg:text-lg font-medium space-y-2 pl-0 sm:pl-2">
                <li className="flex items-start gap-2">
                <span className="mt-1">•</span> Ensure that all the information you have provided is correct.
                </li>
                <li className="">
                <span className="mt-1">•</span> You can only
                <span className="pl-2 font-semibold text-yellow-700">submit the application once</span>.
                </li>
                <li className="">
                <span className="mt-1">•</span> All documents must be{" "}
                <span className="pl-2 font-semibold text-blue-700">submitted in person</span>.
                </li>
                <li className="2">
                <span className="mt-1">•</span> Check your
                <span className="pl-2 font-semibold text-purple-700">email inbox</span> for updates.
                </li>
            </ul>
            </div>

            {/* Congratulations Box */}
            <div className="h-full bg-gradient-to-r from-lGreen to-dGreen rounded-b-2xl md:rounded-r-2xl md:rounded-b-none flex flex-col items-center justify-center px-6 py-8 md:px-8 md:py-10 shadow-md">
            <div className="flex flex-col items-center gap-2 mb-4">
                <span className="text-2xl md:text-3xl font-bold text-white font-merriweather drop-shadow">
                Congratulations!
                </span>
            </div>
            <p className="text-lg md:text-2xl font-semibold mb-2 text-center tracking-wide text-white">
                Your application is almost complete!
            </p>
            <p className="text-sm md:text-base lg:text-lg text-center opacity-80 text-white">
                Thank you for choosing Rizal Institute. We look forward to seeing you thrive and grow with us!
            </p>
            </div>
        </section>

        {/* Submit Button */}
        <Button
            variant="mainButton"
            onClick={handleAdd}
            disabled={isSubmitting}
            className="px-10 py-3 sm:px-[50px] sm:py-5 rounded-xl bg-gradient-to-r from-lGreen to-dGreen text-white font-bold shadow-lg hover:scale-105 hover:from-green-400 hover:to-green-700 transition-all duration-200 disabled:opacity-60"
        >
            {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
        </main>

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
            <div className="h-full w-full ">
                <section className="w-full text-center">
                    <div className="flex justify-start" >
                        <Link href="/">
                        <div className="flex flex-row gap-2 ">
                            <Image
                                src="/arrow.png"
                                alt="back"
                                height={1000} 
                                width={1000}
                                className="sm:w-[30px]  sm:h-[30px] w-[20px] h-[20px]"
                            />
                            <p className="text-dGreen font-merriweather sm:text-xl text-base font-bold">Home</p>
                        </div>
                        </Link> 
                    </div>
                    <RemarksModal />
                    <p className="mt-[20px] text-xl sm:text-2xl lg:text-4xl text-dGreen font-bold font-merriweather">
                        Junior High School Application
                    </p>
                </section>

                {/* content */}
                <div className="w-full flex-1 mt-[40px] md:mt-[60px] lg:mt-[80px] px-[5px] lg:px-[70px] flex flex-col gap-3 ">
                    {sections[page].title}
                    <hr className="border-b-2 border-dGreen w-full" />
                    {sections[page].content}
                </div>

                {/* buttona */}
                <div className="w-full flex justify-center gap-5 md:gap-10 mt-[50px]">
                    <Button
                        variant="prevButton"
                        className="w-[65px] md:w-[100px] h-[40px] rounded-xl"
                        onClick={handlePrev}
                        disabled={page === 0}
                    >
                        Previous
                    </Button>
                    <span className="text-xs md:text-sm text-gray-600 self-center">
                        Page {page + 1} of {sections.length}
                    </span>
                    <Button
                        variant="prevButton"
                        className="w-[65px] md:w-[100px] h-[40px] rounded-xl"
                        onClick={handleNext}
                        disabled={page === sections.length - 1}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </main>
    );
};