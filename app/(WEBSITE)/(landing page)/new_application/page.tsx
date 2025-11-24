"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


import { useRouter } from "next/navigation";
import { addNewApplicants, getTuitionByGrade, verifyPIN } from "@/src/actions/LandingPageAction";
import { verifyLrn } from "@/src/actions/landingPage";
import { usePreviewModal } from "@/src/store/preview";
import { PreviewModal } from "@/components/landing_page/landing_page_portal/preview/preview_modal";
import { DiscountWarningModal } from "../application/new_applicant/reminder";



const ApplicationPage = () => {
    const router = useRouter();

    const [page, setPage] = useState(0);
    const [errors,setErrors] = useState<{ [key: string]: string }>({});

    const [lrn, setLrn] = useState("");
    const [studentType, setStudentType] = useState("");
    const [gradeToEnroll, setGradeToEnroll] = useState("");
    const [tuition, setTuition] = useState<{ tuitionBase: number; miscellaneous: number; } | null>(null);
    const [loading, setLoading] = useState(true);

    const [applicantsLastName, setApplicantsLastName] = useState("");
    const [applicantsFirstName, setApplicantsFirstName] = useState("");
    const [applicantsMiddleName, setApplicantsMiddleName] = useState("");
    const [applicantsSuffix, setApplicantsSuffix] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [religion, setReligion] = useState("");
    const [ip, setIp] = useState("");
    const [house_no_purok, setHouseNoPurok] = useState("");
    const [barangay, setBarangay] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [motherTongue, setMotherTongue] = useState("");
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
    const [relationship, setRelationship] = useState("");



    const [schoolYear, setSchoolYear] = useState("");
    const [schoolType, setSchoolType] = useState("");
    const [schoolName, setSchoolName ] = useState("");
    const [schoolAddress, setSchoolAddress] = useState("");


    const [attainmentUponGraduation, setAttainmentUponGraduation] = useState("");
    // const [consistentGPA, setConsistentGPA] = useState("");
    const [hasEnrolledSibling, setHasEnrolledSibling] = useState("");
    const [siblingName, setSiblingName] = useState("");
    const [escGrantee, setEscGrantee] = useState("");


    const [birthCert, setBirthCert] =  useState<File | null>(null);
    const [reportCard, setReportCard] = useState<File | null>(null);
    const [goodMoral, setGoodMoral] = useState<File | null>(null);
    const [idPic, setIdPic] = useState<File | null>(null);
    const [studentExitForm, setStudentExitForm] = useState<File | null>(null);
    const [form137, setForm137] = useState<File | null>(null);
    const [itr, setITR] = useState<File | null>(null);
    const [escCert, setEscCert] = useState<File | null>(null);
    const { open: openPreview } = usePreviewModal();
    const birthCertRef = useRef<HTMLInputElement>(null);
    const reportCardRef = useRef<HTMLInputElement>(null);
    const goodMoralRef = useRef<HTMLInputElement>(null);
    const idPicRef = useRef<HTMLInputElement>(null);
    const studentExitFormRef = useRef<HTMLInputElement>(null);
    const form137Ref = useRef<HTMLInputElement>(null);
    const itrRef = useRef<HTMLInputElement>(null);
    const escCertRef = useRef<HTMLInputElement>(null);


    const [showDiscountWarning, setShowDiscountWarning] = useState(false);
    const [discountWarningMessage, setDiscountWarningMessage] = useState<string[]>([]);    const [isSending, setIsSending] = useState(false);

    const [timer, setTimer] = useState(0);
    const [generatedPIN, setGeneratedPIN] = useState("");
    const [pin, setPin] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
    if (!gradeToEnroll) {
        setTuition(null);
        return;
    }

    const fetchTuition = async () => {
        setLoading(true);
        const data = await getTuitionByGrade(gradeToEnroll);
        setTuition(data);
        setLoading(false);  
    };

    fetchTuition();
    }, [gradeToEnroll]);

    // Validation per page
    const validatePage = async (): Promise<boolean> => {
        const newErrors: { [key: string]: string } = {};

        switch (page) {
        case 0: 

            if (!lrn.trim()) newErrors.lrn = "Required";
            if (!studentType.trim()) newErrors.studentType = "Required";
            if (!gradeToEnroll.trim()) newErrors.gradeToEnroll = "Required";

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                toast.error("Please fill in all required fields.");
                return false;
            }

            if (!/^\d{12}$/.test(lrn)) {
                newErrors.lrn = "invalid";
                setErrors(newErrors);
                toast.error("Invalid LRN. Please enter a valid 12-digit LRN.");
                return false;
            }

            

            // Check for existing LRN using the new function
            try {
                await verifyLrn(lrn);
            } catch (error) {
                newErrors.lrn = "invalid";
                setErrors(newErrors);
                toast.error(error instanceof Error ? error.message : "This LRN is already in use.");
                return false;
            }
        return true;

        case 1: // Personal Info
            if (!applicantsLastName.trim()) newErrors.applicantsLastName = "Required";
            if (!applicantsFirstName.trim()) newErrors.applicantsFirstName = "Required";
            if (!dateOfBirth.trim()) newErrors.dateOfBirth = "Required";
            if (!age.trim()) newErrors.age = "Required";
            if (!gender.trim()) newErrors.gender = "Required";
            if (!mobileNumber.trim()) newErrors.mobileNumber = "Required";
            if (!email.trim()) newErrors.email = "Required";
            if (!house_no_purok.trim()) newErrors.house_no_purok = "Required";
            if (!barangay.trim()) newErrors.barangay = "Required";
            if (!city.trim()) newErrors.city = "Required";
            if (!province.trim()) newErrors.province = "Required";

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                toast.error("Please fill in all required fields.");
                return false;
            }

            // Check for existing email


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

            if (applicantsMiddleName && !/^[a-zA-Z\s'-]+$/.test(applicantsMiddleName)) {
                newErrors.applicantsMiddleName = "invalid";
                setErrors(newErrors);
                toast.error("Invalid middle name. Please enter a valid middle name.");
                return false;
            }


            if (
                applicantsSuffix && !/^[a-zA-Z\s'-]+$/.test(applicantsSuffix) 
            ) {
                newErrors.applicantsSuffix = "invalid";
                setErrors(newErrors);
                toast.error("Invalid suffix. Please enter a valid suffix.");
                return false;
            }


            if (!validateNotInFuture(new Date(dateOfBirth))) {
                newErrors.dateOfBirth = "invalid";
                setErrors(newErrors);
                toast.error("Date of birth cannot be in the future.");
                return false;
            }   
            

            // if(!validateMinDate(new Date(dateOfBirth))){
            //     newErrors.dateOfBirth = "invalid";
            //     setErrors(newErrors);
            //     toast.error("The minimum threshold for age is 6 years.");
            //     return false;
            // }
            const minAge = getMinAgeForGrade(Number(gradeToEnroll));

            // if (!minAge) {
            //     toast.error("Invalid grade level");
            //     return false;
            // }

            if (!validateMinAge(new Date(dateOfBirth), minAge)) {
                newErrors.dateOfBirth = "invalid";
                setErrors(newErrors);
                toast.error(`Minimum age for Grade ${gradeToEnroll} is ${minAge} years old.`);
                return false;
            }


            if(!validateMaxAge(new Date(dateOfBirth))){
                newErrors.dateOfBirth = "invalid";
                setErrors(newErrors);
                toast.error("Are you still alive?.");
                return false;
            }

            if (religion && !/^[\p{L}\s'-]+$/u.test(religion)) {
                newErrors.religion = "invalid";
                setErrors(newErrors);
                toast.error("Invalid religion.");
                return false;
            }
            if (motherTongue  && !/^[a-zA-Z\s'-]+$/.test(motherTongue) ) {
                newErrors.motherTongue = "invalid";
                setErrors(newErrors);
                toast.error("Invalid mother tongue. Please enter a valid native language name.");
                return false;
            }
            if (
                ip && !/^[a-zA-Z\s'-]+$/.test(ip) 
            ) {
                newErrors.ip = "invalid";
                setErrors(newErrors);
                toast.error("Invalid ethnic. Please enter a proper Ethnic Group.");
                return false;
            }



            if (
                house_no_purok && !/^[a-zA-Z0-9\s,'\-#./]+$/.test(house_no_purok)
            ) {
                newErrors.house_no_purok = "invalid";
                setErrors(newErrors);
                toast.error("Invalid house# / purok / street. Please enter a valid house# / purok / street.");
                return false;
            }

            if (
                barangay && !/^[a-zA-Z0-9\s,'\-#./]+$/.test(barangay)
            ) {
                newErrors.barangay = "invalid";
                setErrors(newErrors);
                toast.error("Invalid barangay. Please enter a valid barangay.");
                return false;
            }

            if (
                city && !/^[a-zA-Z\s,'\-#./]+$/.test(city)
            ) {
                newErrors.city = "invalid";
                setErrors(newErrors);
                toast.error("Invalid city. Please enter a valid city.");
                return false;
            }

            if (
                province && !/^[a-zA-Z\s,'\-#./]+$/.test(province)
            ) {
                newErrors.province = "invalid";
                setErrors(newErrors);
                toast.error("Invalid province. Please enter a valid province.");
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

            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                newErrors.email = "invalid";
                setErrors(newErrors);
                toast.error("Invalid email format.");
                return false;
            }

            try {
                const res = await fetch("/api/validate_email", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Server error.");
                }

                if (!data.valid) {
                    newErrors.email = "invalid";
                    setErrors(newErrors);
                    toast.error(data.message);
                    return false;
                }


            } catch (error) {
                const err = error as Error;
                newErrors.email = "invalid";
                setErrors(newErrors);
                toast.error(err.message || "Invalid email address.");
                console.log(error);
                return false;
            }

        return true;


        case 2: // Guardian Info
        
            if (!guardiansLastName.trim()) newErrors.guardiansLastName = "Required";
            if (!guardiansFirstName.trim()) newErrors.guardiansFirstName = "Required";
            if (!emergencyContact.trim()) newErrors.emergencyContact = "Required";
            if (!relationship.trim()) newErrors.relationship = "Required";

            
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
                guardiansMiddleName && !/^[a-zA-Z\s'-]+$/.test(guardiansMiddleName) 
            ) {
                newErrors.guardiansMiddleName = "invalid";
                setErrors(newErrors);
                toast.error("Invalid middle name. Please enter a valid middle name.");
                return false;
            }
            
            if (
                guardiansSuffix && !/^[a-zA-Z\s'-]+$/.test(guardiansSuffix) 
            ) {
                newErrors.guardiansSuffix = "invalid";
                setErrors(newErrors);
                toast.error("Invalid suffix. Please enter a valid suffix.");
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
                emergencyEmail && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emergencyEmail) 
            ) {
                newErrors.emergencyEmail = "invalid";
                setErrors(newErrors);
                toast.error("Invalid email. Please enter a valid email.");
                return false;
            }
        return true;


        case 3: // Academic Info
            // if (!lrn.trim()) newErrors.lrn = "Required";
            // if (!gradeLevel.trim()) newErrors.gradeLevel = "Required";
            // if (!studentType.trim()) newErrors.section = "Required";
            if (!schoolYear.trim()) newErrors.schoolYear = "Required";
            if (!studentType.trim()) newErrors.studentType = "Required";
            if (!schoolType.trim()) newErrors.schoolType = "Required";
            if (!schoolName.trim()) newErrors.schoolName = "Required";
            if (!schoolAddress.trim()) newErrors.schoolAddress = "Required";

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                toast.error("Please fill in all required fields.");
                return false;
            }

            // if (!/^\d{12}$/.test(lrn)) {
            //     newErrors.lrn = "invalid";
            //     setErrors(newErrors);
            //     toast.error("Invalid LRN. Please enter a valid LRN.");
            //     return false;
            // }

            

            // // Check for existing LRN using the new function
            // try {
            //     await verifyLrn(lrn);
            // } catch (error) {
            //     newErrors.lrn = "invalid";
            //     setErrors(newErrors);
            //     toast.error(error instanceof Error ? error.message : "This LRN is already in use.");
            //     return false;
            // }

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

        case 4: // Additional Information
            if (!attainmentUponGraduation.trim()) newErrors.attainmentUponGraduation = "Required";
            if (!hasEnrolledSibling.trim()) newErrors.hasEnrolledSibling = "Required";
            if (!escGrantee.trim()) newErrors.escGrantee = "Required";

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                toast.error("Please fill in all required fields.");
                return false;
            }

            if (
                siblingName && !/^[a-zA-Z\s'-]+$/.test(siblingName)     
            ) {
                newErrors.siblingName = "invalid";
                setErrors(newErrors);
                toast.error("Invalid name. Please enter a valid name.");
                return false;
            }

            if (
                hasEnrolledSibling === "Yes" && !/^[a-zA-Z\s'-]+$/.test(siblingName)
            ) {
                newErrors.siblingName = "invalid";
                setErrors(newErrors);
                toast.error("Enter your valid sibling name.");
                return false;
            }
        return true;

        default:
        return true;
        }
    };

    // functions

    function getMinAgeForGrade(grade: number) {
        const gradeAgeMap: Record<number, number> = {
            7: 12,
            8: 13,
            9: 14,
            10: 15
        };

        return gradeAgeMap[grade] ?? null; // return null if grade not in map
    }
    function validateMinAge(birthDate: Date, minAge: number) {
        const today = new Date();
        const minDate = new Date(
            today.getFullYear() - minAge,
            today.getMonth(),
            today.getDate()
        );

        return new Date(birthDate) <= minDate;
    }

    // function validateMinDate( birthofDate: Date ) {
    //         const today = new Date();
    //         const minDate = new Date(today.getFullYear() - 6, today.getMonth(), today.getDate());
    //         const date = new Date(birthofDate);
        
    //         return date <= minDate;
    //     }

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

    const calculateAge = (dateOfBirth: Date) => {
        const today = new Date();
        const age = Math.floor((today.getTime() - dateOfBirth.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
        return age;
    };

    const years = Array.from({ length: 4 }, (_, i) => new Date().getFullYear() - i - 1);


    // Event handler for input change

    const handleDateOfBirth = (e: ChangeEvent<HTMLInputElement>) => {
        const dateOfBirth = new Date(e.target.value);
        const age = calculateAge(dateOfBirth);
        setDateOfBirth(e.target.value);
        setAge(age.toString());
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

    const handleITRChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
        setITR(file);
        }
    };

    const handleEscCert = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
        setEscCert(file);
        }
    }
        

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

    const handleProceedAnyway = () => {
        setShowDiscountWarning(false);
        setErrors({});
        if (page < sections.length - 1) setPage(page + 1);
    };

    const handleSendCode = async () => {
        if (timer > 0) return; // prevent spam clicking

        setIsSending(true);

        try {
            const res = await fetch("/api/landing_page/send_code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!data.success) {
                toast.error(data.message || "Failed to send code");
                return;
            }

            toast.success("Verification code sent!");
            setGeneratedPIN(data.pin);

            // Optional: store returned PIN
            // setGeneratedPin(data.pin);

            setTimer(60);
            const countdown = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(countdown);
                        return 0;
                    }
                    return prev - 1;
                });
        }, 1000);
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong.");
        } finally {
            setIsSending(false);
        }
    };


    const handlePrev = () => {
        if (page > 0) setPage(page - 1);
    };

        // const handleNext = async () => {
        //     if (!(await validatePage())) return;
        //     if (page < sections.length - 1) setPage(page + 1);
        //     setErrors({}); 
        // };

    const handleNext = async () => {
        if (!(await validatePage())) return;

        if (page === 5) {
            const warnings: string[] = [];

            // 1️⃣ Academic Discount Requirement
            const requiresReportCard =
            attainmentUponGraduation === "With Honor" ||
            attainmentUponGraduation === "With High Honor" ||
            attainmentUponGraduation === "With Highest Honor";

            if (requiresReportCard && !reportCard) {
                warnings.push(
                "You selected Academic Achievement. Please upload your Report Card to receive the discount; otherwise it would not be applied"      
                );
            }

            // 2️⃣ ESC Discount Requirement
            if (escGrantee === "Yes" && !escCert) {
                warnings.push(
                "You indicated you are an ESC grantee. Please upload your ESC Certificate to receive the discount; otherwise it would not be applied"      
                );
            }

            // ❗ If there's at least one warning → show modal
            if (warnings.length > 0) {
            setDiscountWarningMessage(warnings); // now an array
            setShowDiscountWarning(true);
            return;
            }
        }

        if(page === 6) {
            if (pin !== generatedPIN) {
            toast.error("Incorrect PIN.");
            return;
        }

        // If correct → go to page 6
        setPage(7);
        }

        if (page < sections.length - 1) setPage(page + 1);
    };


    const handleAdd = async () => {
        setIsSubmitting(true);
        try 
        {
        const result = await verifyPIN(email, Number(pin));

        if (!result.success) {
            toast.error(result.message);
            setIsSubmitting(false);
            return; // STOP everything
        }
        const uploadImage = async (file: File, folder: string) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'my_preset'); // Use one preset for all
            formData.append('folder', folder); // Dynamically assign the folder
        
            const response = await fetch('https://api.cloudinary.com/v1_1/dkfn4xy6q/image/upload', {
            method: 'POST',
            body: formData,
            });
        
            const data = await response.json();  
            return data.secure_url; // Returns the image URL from Cloudinary
            };

            const uploadBirthCert = birthCert ? await uploadImage(birthCert, 'documents') : "";
            const uploadReportCard = reportCard ? await uploadImage(reportCard, 'documents') : "";
            const uploadGoodMoral = goodMoral ? await uploadImage(goodMoral, 'documents') : "";
            const uploadIdPic = idPic ? await uploadImage(idPic, 'documents') : "";
            const uploadStudentExitForm = studentExitForm ? await uploadImage(studentExitForm, 'documents') : "";
            const uploadForm137 = form137 ? await uploadImage(form137, 'documents') : "";
            const uploadITR = itr ? await uploadImage(itr, 'documents') : "";
            const uploadEscCert = escCert ? await uploadImage(escCert, 'documents') : "";

            // const uploadReservationReceipt = reservationReceipt ? await uploadImage(reservationReceipt, 'reservationPayments') : ""; 


            await addNewApplicants
            (
                applicantsLastName, 
                applicantsFirstName,
                applicantsMiddleName, 
                applicantsSuffix, 
                new Date(dateOfBirth), 
                Number(age), 
                gender, 
                religion,
                motherTongue,
                ip,
                house_no_purok,
                barangay,
                city,
                province,
                mobileNumber, 
                email,
                lrn,

                guardiansLastName,
                guardiansFirstName,
                guardiansMiddleName,
                guardiansSuffix,
                emergencyContact,
                emergencyEmail,
                relationship,
                
                gradeToEnroll,
                studentType,
                schoolYear,
                schoolType,
                schoolName,
                schoolAddress,

                uploadBirthCert,
                uploadReportCard,
                uploadGoodMoral,
                uploadIdPic,
                uploadStudentExitForm,
                uploadForm137,
                uploadITR,
                uploadEscCert,

                attainmentUponGraduation,
                hasEnrolledSibling,
                siblingName,
                escGrantee,

            );
        
                setApplicantsLastName("");
                setApplicantsFirstName("");
                setApplicantsMiddleName("");
                setApplicantsSuffix("");
                setDateOfBirth("");
                setAge("");
                setGender("");
                setReligion("");
                setMotherTongue("");
                setIp("");
                setHouseNoPurok("");
                setBarangay("");
                setCity("");
                setProvince("");
                setMobileNumber("");
                setEmail("");
                setLrn("");

                setGuardianLastName("");
                setGuardianFirstName("");
                setGuardianMiddleName("");
                setGuardianSuffix("");
                setEmergencyContact("");
                setEmergencyEmail("");

                setGradeToEnroll("");
                setStudentType("");
                setSchoolYear("");
                setSchoolType("");
                setSchoolName("");
                setRelationship("");


                setAttainmentUponGraduation("");
                // setConsistentGPA("");
                setHasEnrolledSibling("");
                setSiblingName("");
                setEscGrantee("");
                
                // // Reset file input fields
                if (birthCertRef.current) birthCertRef.current.value = "";
                if (reportCardRef.current) reportCardRef.current.value = "";
                if (goodMoralRef.current) goodMoralRef.current.value = "";
                if (idPicRef.current) idPicRef.current.value = "";
                if (studentExitFormRef.current) studentExitFormRef.current.value = "";
                if (form137Ref.current) form137Ref.current.value = "";
                if (itrRef.current) itrRef.current.value = "";
                if (escCertRef.current) escCertRef.current.value = "";

                toast.success("Application submitted successfully!");
                router.push("/");
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.error('Something went wrong. Please try again.', error);

        } finally {
            setIsSubmitting(false); 

            

        }

    };

    
const sections = [
    {
        title: (
            <div>
                <p className="sm:text-lg lg::text-2xl text-dGreen font-bold font-merriweather">
                    Section 1: Enrollment Details
                </p>
            </div>
        ),
        content: (
            <main className=" w-full flex flex-col gap-10 px-0 lg:px-10 h-auto mt-2 ">

                <fieldset  className="w-full px-0 sm:px-2 py-2">
                <legend className="pl-2 ml-0 sm:ml-2 text-[13px] sm:text-[14px] lg:text-[16px] text-dGreen font-semibold border-l-4 rounded-sm border-dGreen font-merriweather">Enrollment Details:</legend>
                    <article className="w-full gap-8 flex flex-col shadow-lg py-8 px-2 lg:px-8 bg-gray-100/50 border-2 border-gray-100 rounded-lg mt-3 ">
                        <section className="flex flex-col sm:flex-row gap-5 mb-3 sm:mb-0">  
                            <div className="flex flex-col">
                                <label className="text-xs lg:text-sm text-dGreen font-semibold">LRN <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
                                <input 
                                    type="text" 
                                    placeholder="102325652545"
                                    onChange={(e) => setLrn(e.target.value)}
                                    value={lrn}
                                    className={`rounded-sm px-1 w-full sm:w-[170px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.lrn ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`} 
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-xs lg:text-sm text-dGreen font-semibold">Grade to Enroll <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
                                <select 
                                    name="grade to enroll"
                                    onChange={(e) => setGradeToEnroll(e.target.value)}
                                    value={gradeToEnroll}
                                    className={`rounded-sm px-1 w-full sm:w-[190px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.gradeToEnroll ? 'border border-red-600 bg-red-100' : 'bg-green-100'} 
                                    ${gradeToEnroll === '' ? 'text-gray-500' : 'text-black'}`}>
                                        <option value="" >Select Grade</option>
                                        <option value="7">Grade 7</option>
                                        <option value="8">grade 8</option>
                                        <option value="9">Grade 9</option>
                                        <option value="10">Grade 10</option>
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-xs lg:text-sm text-dGreen font-semibold">Student Type <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
                                <select 
                                    name="student type"
                                    onChange={(e) => setStudentType(e.target.value)}
                                    value={studentType}
                                    disabled={!gradeToEnroll}
                                    className={`rounded-sm px-1 w-full sm:w-[190px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.studentType ? 'border border-red-600 bg-red-100' : 'bg-green-100'} 
                                    ${studentType === '' ? 'text-gray-500' : 'text-black'}`}>
                                        <option value="" >Select Option</option>
                                        {/* <option value="Incoming G7">Incoming G7</option>
                                        <option value="Transferee">Transferee</option> */}
                                        {gradeToEnroll === "7" && (
                                            <option value="Incoming G7">Incoming G7</option>
                                        )}
                                        {/* Always show Transferee when grade 8–10 */}
                                        {(gradeToEnroll === "7" || 
                                            gradeToEnroll === "8" || 
                                            gradeToEnroll === "9" || 
                                            gradeToEnroll === "10") && (
                                                <option value="Transferee">Transferee</option>
                                        )}
                                        {/* <option value="Old Student">Old Student</option> */}
                                </select>
                            </div>
                        </section>

                    </article>
                </fieldset >


                <fieldset className="w-full px-2 py-2">
                { gradeToEnroll && studentType && <legend className="pl-2 text-[14px] lg:text-[16px] text-dGreen font-semibold border-l-4 border-dGreen font-merriweather">
                    Tuition Fees for Grade {gradeToEnroll}:
                </legend> }

                <section className="w-full mt-4 p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {loading && gradeToEnroll && studentType && (
                        <>
                        {/* LEFT SKELETON */}
                        <div className="rounded-xl shadow-md p-6 border bg-gray-50 border-gray-100 animate-pulse">
                            <div className="h-4 w-40 bg-gray-300 rounded mb-4"></div>
                            <div className="space-y-3">
                            <div className="h-3 w-full bg-gray-300 rounded"></div>
                            <div className="h-3 w-full bg-gray-300 rounded"></div>
                            <div className="h-3 w-full bg-gray-300 rounded"></div>
                            </div>
                        </div>

                        {/* RIGHT SKELETON */}
                        <div className="rounded-xl shadow-md p-6 border bg-gray-50 border-gray-100 animate-pulse">
                            <div className="h-4 w-40 bg-gray-300 rounded mb-4"></div>
                            <div className="space-y-3">
                            <div className="h-3 w-full bg-gray-300 rounded"></div>
                            <div className="h-3 w-full bg-gray-300 rounded"></div>
                            <div className="h-3 w-full bg-gray-300 rounded"></div>
                            </div>
                        </div>
                        </>
                    )}

                    {tuition && loading === false && studentType && (
                        <>
                        {/* LEFT CARD — FEES */}
                        <div className=" rounded-xl shadow-md p-6 border bg-gray-50 border-gray-100">
                            <h2 className="text-sm font-semibold text-dGreen mb-4">
                                Tuition Cost Summary
                            </h2>

                            <table className="w-full text-sm">
                            <tbody className="text-dGreen font-medium">
                                <tr className="flex justify-between py-2">
                                <td>Tuition Fee</td>
                                <td>{tuition?.tuitionBase ?? "----"}</td>
                                </tr>

                                <tr className="flex justify-between py-2">
                                <td>Miscellaneous Fee</td>
                                <td>{tuition?.miscellaneous ?? "----"}</td>
                                </tr>

                                <tr className="border-t border-dGreen flex justify-between py-3 font-semibold">
                                <td>Grand Total</td>
                                <td>
                                    {tuition
                                    ? tuition.tuitionBase + tuition.miscellaneous
                                    : "----"}
                                </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>

                        {/* RIGHT CARD — DISCOUNTS */}
                        <div className="bg-gray-50 rounded-xl shadow-md p-6 border border-gray-100">
                            <h2 className="text-sm font-semibold text-dGreen mb-4">
                            Possible Discounts
                            </h2>

                            <ul className="list-disc list-inside text-sm text-dGreen space-y-3 pl-10">
                            {gradeToEnroll === "7" && studentType === "Incoming G7" && <li>ESC Voucher (-9000)</li>}
                            <li>Sibling Discount (-500)</li>
                            <li>
                                Academic Discount —  
                                <span className="block ml-4 mt-1 text-xs text-green-800">
                                With Honor: 20% <br />
                                With High Honor: 50% <br />
                                With Highest Honor: 75%
                                </span>
                            </li>
                            </ul>
                        </div>
                        </>
                    )}                    
                    </div>

                </section>
                </fieldset>

     
            </main>
        ),
    },

    {
        title: (
            <div>
                <p className="sm:text-lg lg::text-2xl text-dGreen font-bold font-merriweather">
                    Section 2: Personal Information
                </p>
            </div>
        ),
        content: (
            <main className=" w-full flex flex-col gap-10 px-0 lg:px-10 h-auto mt-2 ">

                <fieldset  className="w-full px-0 sm:px-2 py-2">
                <legend className="pl-2 ml-0 sm:ml-2 text-[13px] sm:text-[14px] lg:text-[16px] text-dGreen font-semibold border-l-4 rounded-sm border-dGreen font-merriweather">Personal Details:</legend>

                    <article className="w-full gap-8 flex flex-col shadow-lg py-8 px-2 lg:px-8 bg-gray-100/50 border-2 border-gray-100 rounded-lg mt-3 ">

                        <section className="flex flex-col sm:flex-row gap-5 mb-3 sm:mb-0">
                            <div className="flex flex-col">
                                <label className="text-xs lg:text-sm text-dGreen font-semibold">Last Name <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
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
                                <label className="text-xs lg:text-sm text-dGreen font-semibold">First Name <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
                                <input type="text"
                                    placeholder="John"
                                    onChange={(e) => setApplicantsFirstName(e.target.value)}
                                    value={applicantsFirstName}
                                    className={`rounded-sm px-1 w-full sm:w-[170px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.applicantsFirstName ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`} 
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-xs lg:text-sm text-dGreen font-semibold"> Middle Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Doe" 
                                    onChange={(e) => setApplicantsMiddleName(e.target.value)}
                                    value={applicantsMiddleName}
                                    className={`rounded-sm px-1 w-full sm:w-[170px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.applicantsMiddleName ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`}                                 
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-xs lg:text-sm text-dGreen font-semibold"> Suffix</label>
                                <input
                                    type="text" 
                                    placeholder="Jr." 
                                    onChange={(e) => setApplicantsSuffix(e.target.value)}
                                    value={applicantsSuffix}
                                    className={`rounded-sm px-1 w-full sm:w-[70px] lg:w-[100px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.applicantsSuffix ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`}                                />
                            </div>
                        </section>

                        <section className="flex flex-col sm:flex-row gap-5">
                            <div className="flex flex-col">
                                <label className="text-xs lg:text-sm text-dGreen font-semibold">Date Of Birth <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
                                <input 
                                    type="date" 
                                    onChange={handleDateOfBirth}
                                    value={dateOfBirth}
                                    className={`rounded-sm px-1 w-full sm:w-[170px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.dateOfBirth ? 'border border-red-600 bg-red-100' : 'bg-green-100'} 
                                    ${dateOfBirth === '' ? 'text-gray-500' : 'text-black'}`} 
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-xs lg:text-sm text-dGreen font-semibold">Age <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
                                <input 
                                type="text" 
                                value={age}
                                disabled
                                    className="rounded-sm px-1 w-full sm:w-[170px] lg::w-[300px] py-[6px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
                            />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-xs lg:text-sm text-dGreen font-semibold">Sex at birth <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
                                <select 
                                    name="Sex"
                                    onChange={(e) => setGender(e.target.value)}
                                    value={gender}
                                    className={`rounded-sm px-1 w-full sm:w-[170px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.gender ? 'border border-red-600 bg-red-100' : 'bg-green-100'} 
                                    ${gender === '' ? 'text-gray-500' : 'text-black'}`}>
                                        <option value="" >Select Sex</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                </select>
                            </div>
                        </section>


                    </article>
                </fieldset >

                <fieldset className="w-full px-0 sm:px-2 py-2">
                <legend className="pl-2 ml-0 sm:ml-2 text-[13px] sm:text-[14px] lg:text-[16px] text-dGreen font-semibold border-l-4 rounded-sm border-dGreen font-merriweather">Cultural Background:</legend>
                
                    <article className="w-full gap-8 flex flex-col shadow-lg py-8 px-2 lg:px-8 bg-gray-100/50 border-2 border-gray-100 rounded-lg mt-3 ">

                        <section className="flex flex-col sm:flex-row gap-5">
                            <div className="flex flex-col">
                                <label className="text-xs lg:text-sm text-dGreen font-semibold">Religion </label>
                                <input 
                                    type="text" 
                                    placeholder="Religion"
                                    onChange={(e) => setReligion(e.target.value)}
                                    value={religion}
                                    className={`rounded-sm px-1 w-full sm:w-[170px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.religion ? 'border border-red-600 bg-red-100' : 'bg-green-100'} 
                                    ${religion === '' ? 'text-gray-500' : 'text-black'}`} 
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-xs lg:text-sm text-dGreen font-semibold">Mother Tongue</label>
                                <input 
                                    type="text" 
                                    placeholder="Tagalog"
                                    onChange={(e) => setMotherTongue(e.target.value)}
                                    value={motherTongue}
                                    className={`rounded-sm px-1 w-full sm:w-[170px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.motherTongue ? 'border border-red-600 bg-red-100' : 'bg-green-100'} 
                                    ${motherTongue === '' ? 'text-gray-500' : 'text-black'}`} 
                                />
                            </div>
                            
                            <div className="flex flex-col">
                                <label className="text-xs lg:text-sm text-dGreen font-semibold">Ethnic Group </label>
                                <input 
                                    type="text" 
                                    placeholder="Aeta"
                                    onChange={(e) => setIp(e.target.value)}
                                    value={ip}
                                    className={`rounded-sm px-1 w-full sm:w-[170px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.ip ? 'border border-red-600 bg-red-100' : 'bg-green-100'} 
                                    ${ip === '' ? 'text-gray-500' : 'text-black'}`} 
                                />
                            </div>
                        </section>

                    </article>
                </fieldset>

                <fieldset className="w-full px-0 sm:px-2 py-2">
                <legend className="pl-2 ml-0 sm:ml-2 text-[13px] sm:text-[14px] lg:text-[16px] text-dGreen font-semibold border-l-4 rounded-sm border-dGreen font-merriweather">Address & Contact Information:</legend>
                    
                    <article className="w-full gap-8 flex flex-col shadow-lg py-8 px-2 lg:px-8 bg-gray-100/50 border-2 border-gray-100 rounded-lg mt-3 ">

                        <section className="flex flex-col sm:flex-row gap-5 mb-3 sm:mb-0">
                            <div className="flex flex-col">
                                <label className="text-xs lg:text-sm text-dGreen font-semibold">House#/ Purok / Street <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
                                <input 
                                    type="text" 
                                    placeholder="House 3"
                                    onChange={(e) => setHouseNoPurok(e.target.value)}
                                    value={house_no_purok}
                                    className={`rounded-sm px-1 w-full sm:w-[145px] lg:w-[260px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.house_no_purok ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`} 
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xs lg:text-sm text-dGreen font-semibold">Barangay <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
                                <input type="text"
                                    placeholder="Lawa"
                                    onChange={(e) => setBarangay(e.target.value)}
                                    value={barangay}
                                    className={`rounded-sm px-1 w-full sm:w-[145px] lg:w-[260px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.barangay ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`} 
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xs lg:text-sm text-dGreen font-semibold"> City <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
                                <input 
                                    type="text" 
                                    placeholder="Calamba" 
                                    onChange={(e) => setCity(e.target.value)}
                                    value={city}
                                    className={`rounded-sm px-1 w-full sm:w-[145px] lg:w-[260px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.city ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`}                                 
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xs lg:text-sm text-dGreen font-semibold"> Province <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
                                <input
                                    type="text" 
                                    placeholder="Laguna" 
                                    onChange={(e) => setProvince(e.target.value)}
                                    value={province}
                                    className={`rounded-sm px-1 w-full sm:w-[145px] lg:w-[260px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.province ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`}                                />
                            </div>
                        </section>
                        
                        <section className="flex flex-col sm:flex-row gap-5">
                            <div className="flex flex-col">
                                <label className="text-xs lg:text-sm text-dGreen font-semibold">Mobile Number <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
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
                                <label className="text-xs lg:text-sm text-dGreen font-semibold">Email <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
                                <input 
                                    type="text" 
                                    placeholder="sample@example.com" 
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    className={`rounded-sm px-1 w-full sm:w-[170px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.email ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`} 
                                />
                            </div>
                        </section>

                    </article>
                </fieldset>
     
            </main>
        ),
    },

    {
        title: (
            <div>
                <p className="sm:text-lg lg::text-2xl text-dGreen font-bold font-merriweather">
                    Section 3: Parent / Guardian Details
                </p>
            </div>
        ),
        content: (
            <main className=" w-full flex flex-col gap-10 px-0 lg:px-10 h-auto mt-2 ">

                <fieldset className="w-full px-0 sm:px-2 py-2">
                <legend className="pl-2 ml-0 sm:ml-2 text-[13px] sm:text-[14px] lg:text-[16px] text-dGreen font-semibold border-l-4 rounded-sm border-dGreen font-merriweather">Personal Details:</legend>
                    
                    <article className="w-full gap-4 flex flex-col shadow-lg py-8 px-2 lg:px-8 bg-gray-100/50 border-2 border-gray-100 rounded-lg mt-3 ">

                        <section className="flex flex-col sm:flex-row gap-5">
                            <div className="flex flex-col">
                                <label className="text-xs lg:text-sm text-dGreen font-semibold">Last Name <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
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
                                <label className="text-xs lg:text-sm text-dGreen font-semibold">First Name <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
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
                                <label className="text-xs lg:text-sm  text-dGreen font-semibold">Middle Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Doe"
                                    onChange={(e) => setGuardianMiddleName(e.target.value)}
                                    value={guardiansMiddleName}
                                    className={`rounded-sm px-1 w-full sm:w-[170px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.guardiansMiddleName ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`}                                 />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xs lg:text-sm text-dGreen font-semibold">Suffix</label>
                                <input 
                                    type="text" 
                                    placeholder="jr."
                                    onChange={(e) => setGuardianSuffix(e.target.value)}
                                    value={guardiansSuffix}
                                    className={`rounded-sm px-1 w-full sm:w-[70px] lg:w-[100px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.guardiansSuffix ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`}                                 />
                            </div>
                        </section>

                    </article>
                </fieldset>

                <fieldset className="w-full px-2 py-2">
                <legend className="pl-2 ml-0 sm:ml-2 text-[13px] sm:text-[14px] lg:text-[16px] text-dGreen font-semibold border-l-4 rounded-sm border-dGreen font-merriweather"> Contact Information & Relationship:</legend>
                    
                    <article className="w-full gap-4 flex flex-col shadow-lg py-8 px-2 lg:px-8 bg-gray-100/50 border-2 border-gray-100 rounded-lg mt-3 ">

                        <section className="flex flex-col sm:flex-row gap-5">
                            <div className="flex flex-col">
                                <label className="text-xs lg:text-sm  text-dGreen font-semibold">Mobile Number <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
                                <input 
                                    type="text" 
                                    placeholder="09XXXXXXXX" 
                                    onChange={(e) => setEmergencyContact(e.target.value)}
                                    value={emergencyContact}
                                    className={`rounded-sm px-1 w-full sm:w-[170px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.emergencyContact ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`} 
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xs lg:text-sm  text-dGreen font-semibold">Email </label>
                                <input 
                                    type="text" 
                                    placeholder="sample@example.com" 
                                    onChange={(e) => setEmergencyEmail(e.target.value)}
                                    value={emergencyEmail}
                                    className={`rounded-sm px-1 w-full sm:w-[170px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.emergencyEmail ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`} 
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xs lg:text-sm  text-dGreen font-semibold">Relationship <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
                                <select 
                                    name="relationship"
                                    onChange={(e) => setRelationship(e.target.value)}
                                    value={relationship}
                                    className={`rounded-sm px-1 w-full sm:w-[190px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.relationship ? 'border border-red-600 bg-red-100' : 'bg-green-100'} 
                                    ${relationship === '' ? 'text-gray-500' : 'text-black'}`}>
                                        <option value="" >Select Relationship</option>
                                        <option value="Mother">Mother</option>
                                        <option value="Father">Father</option>
                                        <option value="Guardian">Guardian</option>
                                </select>
                            </div>
                        </section>

                    </article>
                </fieldset>
            </main>
            
        ),
    },

    {
        title: (
            <div>
                <p className="text-[15px] sm:text-lg lg::text-2xl text-dGreen font-bold font-merriweather">
                    Section 4: Educational Background
                </p>
            </div>
        ),
        content: (
            <main className=" w-full flex flex-col gap-10 px-0 lg:px-10 h-auto mt-2 ">


                <fieldset className="w-full px-2 py-2">
                <legend className="pl-2 ml-0 sm:ml-2 text-[13px] sm:text-[14px] lg:text-[16px] text-dGreen font-semibold border-l-4 rounded-sm border-dGreen font-merriweather"> Previous School Information:</legend>
                    
                    <article className="w-full gap-4 flex flex-col shadow-lg py-8 px-2 lg:px-8 bg-gray-100/50 border-2 border-gray-100 rounded-lg mt-3   ">

                        <section className="flex flex-col gap-4">
                            
                            <div className="flex flex-col sm:flex-row gap-5">
                                <div className="flex flex-col">
                                    <label className="text-xs lg:text-sm text-dGreen font-semibold">SY Graduated <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
                                    <select
                                        name="schoolYear"
                                        onChange={(e) => setSchoolYear(e.target.value)}
                                        value={schoolYear}
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
                                    <label className="text-xs lg:text-sm text-dGreen font-semibold">School Type <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
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
                                <label className="text-xs lg:text-sm text-dGreen font-semibold">Previous School <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
                                <input 
                                    type="text" 
                                    placeholder="AB Normal Schoool"
                                    onChange= {(e) => setSchoolName(e.target.value)} 
                                    value={schoolName}
                                    className={`rounded-sm px-1 w-full  py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.schoolName ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`}
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-xs lg:text-sm text-dGreen font-semibold">School Address <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
                                <input 
                                    type="text"
                                    placeholder="123 Street, Brgy., City, Province"
                                    onChange={(e) => setSchoolAddress(e.target.value)}
                                    value={schoolAddress}
                                    className={`rounded-sm px-1 w-full \ py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.schoolAddress ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`}
                                />
                            </div>
                           
                        </section>

                    </article>
                </fieldset>


            </main>
        ),
    },

    {
    title: (
        <div>
            <p className="text-[15px] sm:text-lg lg::text-2xl text-dGreen font-bold font-merriweather">
                Section 5: Discount Classification
            </p>
        </div>
    ),
    content: (
        <main className=" w-full flex flex-col gap-10 px-0 lg:px-10 h-auto mt-2 ">

            <fieldset className="w-full px-0 sm:px-2 py-2">
            <legend className="pl-2 ml-0 sm:ml-2   text-[13px] sm:text-[14px] lg:text-[16px] text-dGreen font-semibold border-l-4 rounded-sm border-dGreen font-merriweather"> Discount Details:</legend>
                
                <article className="w-full gap-8 flex flex-col shadow-lg py-8 px-2 lg:px-8 bg-gray-100/50 border-2 border-gray-100 rounded-lg mt-3 ">

                    <section className="flex flex-col sm:flex-row gap-10">
                        <div className="flex flex-col">
                            <label className="text-xs lg:text-sm text-dGreen font-semibold">Attainment Upon Graduation <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
                            <select 
                                name="additionalInformation" 
                                className={`rounded-sm px-1 w-full sm:w-[190px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                ${errors.attainmentUponGraduation ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`}
                                value={attainmentUponGraduation}
                                onChange={(e) => setAttainmentUponGraduation(e.target.value)}
                            >
                                <option value="">Select Option</option>
                                <option value="N/a">N/a</option>
                                <option value="With Honor">Graduated with Honors</option>
                                <option value="With High Honor">Graduated with High Honor</option>
                                <option value="With Highest Honor">Graduated with Highest Honor</option>
                            </select>
                        </div>


                        <div className="flex flex-col">
                            <label className="text-xs lg:text-sm text-dGreen font-semibold">Has enrolled sibling <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
                            <select 
                                name="additionalInformation" 
                                className={`rounded-sm px-1 w-full sm:w-[190px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                ${errors.hasEnrolledSibling ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`}
                                value={hasEnrolledSibling}
                                onChange={(e) => setHasEnrolledSibling(e.target.value)}
                                >
                                    <option value="">Select Option</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs lg:text-sm text-dGreen font-semibold">Sibling&apos;s Full Name:</label>
                            <input 
                                type="text" 
                                placeholder="Blue Kirigaya"
                                className={`rounded-sm px-1 w-full sm:w-[190px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                ${errors.siblingName ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`}
                                disabled={hasEnrolledSibling !== 'Yes'}
                                value={siblingName}
                                onChange={(e) => setSiblingName(e.target.value)}
                            />
                        </div>
                    </section>

                    <section className="flex flex-col sm:flex-row gap-10">

                        <div className="flex flex-col">
                            <label className="text-xs lg:text-sm text-dGreen font-semibold">Already an ESC Grantee?<strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
                            <select 
                                name="escGrantee    " 
                                className={`rounded-sm px-1 w-full sm:w-[190px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                ${errors.escGrantee ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`}
                                value={escGrantee}
                                onChange={(e) => setEscGrantee(e.target.value)}
                                >
                                    <option value="">Select Option</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    
                            </select>
                        </div>

                    </section>

                </article>
            </fieldset>
        </main>
        ),
    },

    {
    title: (
        <div>
            <p className="text-[15px] sm:text-lg lg::text-2xl text-dGreen font-bold font-merriweather">
                Section 6: Documents Submission 
            </p>
        </div>
    ),
    content: (
        <main className=" w-full flex flex-col gap-10 px-0 lg:px-10 h-auto mt-2 ">

            <section className="w-full gap-4 flex flex-col shadow-lg py-8 px-2 lg:px-8 bg-red-100/50 border-2 border-red-100 text-red-900 rounded-lg mt-3">
                <p><strong>NOTE: </strong> 
                    Uploading scanned copies of your documents is optional. 
                    But if you would like to be considered for academic discounts, please upload a scanned copy of your Report Card.
                    If you are a transferee and already an ESC grantee, do not forget to upload a scanned copy of your ESC Certificate too.
                </p>
            </section>

            <section className="w-full px-0 sm:px-2 py-2">

                <span className="pl-2 ml-0 sm:ml-2 text-[13px] sm:text-[14px] lg:text-[16px] text-dGreen font-semibold border-l-4 rounded-sm border-dGreen font-merriweather"> Identity & Financial Documents   :</span>
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
                                <span className="text-xs text-gray-500 mt-1">Upload any image. No size limit.</span>
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
                                <span className="text-xs text-gray-500 mt-1">Upload any image. No size limit.</span>
                            </div>
                            )}
                        </div>
                            
                        <div className="flex flex-col">
                            <span className="text-xs lg:text-sm text-dGreen font-semibold">Parent&apos;s Income Tax Return (for incoming G7)</span>
                            {itr ? (
                            <div 
                                className="flex flex-col gap-1 w-full sm:w-[190px] lg:w-[320px]"
                                key="itr_preview"
                            >
                                <div className="flex flex-row items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => previewImage(itr)}
                                        className="w-full sm:w-[180px] lg:w-[320px] py-[6px] border-2 border-dGreen bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition flex-1 text-left truncate p-"
                                        title="Click to preview"
                                        >
                                        {itr.name}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                        setIdPic(null);
                                        if (itrRef.current) itrRef.current.value = "";}}
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
                                key="itr_preview"
                            >
                                <input
                                    type="file"
                                    ref={itrRef}
                                    accept="image/*"
                                    onChange={handleITRChange}
                                    name="document"
                                    className="rounded-sm px-1 w-full sm:w-[200px] lg:w-[320px] py-[6px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
                                />
                                <span className="text-xs text-gray-500 mt-1">Upload any image. No size limit.</span>

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
                                <span className="text-xs text-gray-500 mt-1">Upload any image. No size limit.</span>

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
                                <span className="text-xs text-gray-500 mt-1">Upload any image. No size limit.</span>

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
                                <span className="text-xs text-gray-500 mt-1">Upload any image. No size limit.</span>

                            </div>
                            )}
                        </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-8">
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
                                <span className="text-xs text-gray-500 mt-1">Upload any image. No size limit.</span>

                            </div>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <span className="text-xs lg:text-sm text-dGreen font-semibold">ESC Certificate (if transferee & prev ESC grantee) </span>
                            {escCert ? (
                            <div 
                                className="flex flex-col gap-1 w-full sm:w-[190px] lg:w-[320px]"
                                key="student_exit_preview"
                            >
                                <div className="flex flex-row items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => previewImage(escCert)}
                                        className="w-[180px] sm:w-[320px] py-[6px] border-2 border-dGreen bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition flex-1 text-left truncate p-"
                                        title="Click to preview"
                                        >
                                        {escCert.name}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                        setEscCert(null);
                                        if (escCertRef.current) escCertRef.current.value = "";}}
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
                                    ref={escCertRef}
                                    accept="image/*"
                                    onChange={handleEscCert}
                                    name="document"
                                    className="rounded-sm px-1 w-full sm:w-[200px] lg:w-[320px] py-[6px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
                                />
                                <span className="text-xs text-gray-500 mt-1">Upload any image. No size limit.</span>

                            </div>
                            )}
                        </div>
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
                    Section 7: Verification
                </p>
            </div>
        ),
        content: (
            <main className="w-full flex flex-col items-center gap-10 px-0 lg:px-10 h-auto mt-2">

                <article className="w-[500px] flex flex-col items-center shadow-lg py-8 px-4 bg-gray-100/50 border-2 border-gray-100 rounded-lg mt-3 gap-6">
                    <div className="w-full flex flex-col gap-4">


                        {/* EMAIL INPUT */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-dGreen">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                disabled
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-dGreen focus:outline-none"
                            />
                        </div>

                        {/* SEND CODE BUTTON */}
                        <Button
                            variant="confirmButton"
                            onClick={handleSendCode}
                            disabled={isSending || timer > 0}
                            className={`text-white py-2 px-3 rounded-md font-semibold transition-all
                                ${timer > 0 ? "opacity-50 cursor-not-allowed" : ""}
                            `}
                        >
                            {timer > 0 ? `Resend in ${timer}s` : "Send Code"}
                        </Button>


                        {/* PIN INPUT */}
                        <div className="flex flex-col gap-1 mt-4">
                            <label className="text-sm font-semibold text-dGreen">Verification PIN</label>
                            <input
                                type="text"
                                maxLength={6}
                                placeholder="Enter 6-digit code"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                className="w-full border border-gray-300 rounded-md  p-2 text-center text-lg focus:ring-2 focus:ring-dGreen focus:outline-none"
                            />
                        </div>
                    </div>
                </article>

            </main>


        ),
    },

    {
        title: (
            <div>
                <p className="text-[15px] sm:text-lg lg::text-2xl text-dGreen font-bold font-merriweather">
                    Section 8: Application Submission
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
            Submit
        </Button>
        </main>

        ),
    },

   
  
];

    return (
        <main className="min-h-[600px] w-full mt-2 p-5 flex flex-col">
            <div className="h-full w-full ">
                <section className="w-full text-center">
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

                <DiscountWarningModal
                  open={showDiscountWarning}
                  onClose={() => setShowDiscountWarning(false)}
                  onProceed={handleProceedAnyway}
                  messages={discountWarningMessage}
                />
            </div>
        </main>
    );
};

export default ApplicationPage;