"use client";

import { ChangeEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { usePreviewModal } from "@/src/store/preview";
import {  addNewApplicants, verifyEmail, verifyLrn } from "@/src/actions/landingPage";

import {
Card,
CardContent,    
CardHeader,
CardTitle,
} from "@/components/ui/card"
import { PreviewModal } from "@/components/landing_page/landing_page_portal/preview/preview_modal";
import { useRouter } from "next/navigation";



    const ApplicationPage = () => {
        const router = useRouter();

        const [page, setPage] = useState(0);

        const [errors,setErrors] = useState<{ [key: string]: string }>({});

        // State for handling input value
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
        const [itr, setITR] = useState<File | null>(null);
        const [escCert, setEscCert] = useState<File | null>(null);


        const [mop, setMop] = useState("");
        const [reservationReceipt, setReservationReceipt] = useState<File | null>(null);
        const [reservationAmount, setReservationAmount] = useState("");
        
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [isBankTransferSelected, setIsBankTransferSelected] = useState(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [isGcashSelected, setIsGcashSelected] = useState(false);

        const [attainmentUponGraduation, setAttainmentUponGraduation] = useState("");
        // const [consistentGPA, setConsistentGPA] = useState("");
        const [hasEnrolledSibling, setHasEnrolledSibling] = useState("");
        const [siblingName, setSiblingName] = useState("");
        const [escGrantee, setEscGrantee] = useState("");

        const { open: openPreview } = usePreviewModal();
        const [isSubmitting, setIsSubmitting] = useState(false);



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
            if (!religion.trim()) newErrors.religion = "Required";
            if (!motherTongue.trim()) newErrors.motherTongue = "Required";
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
            

            if(!validateMinDate(new Date(dateOfBirth))){
                newErrors.dateOfBirth = "invalid";
                setErrors(newErrors);
                toast.error("The minimum threshold for age is 6 years.");
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
            if (
                !/^[a-zA-Z\s'-]+$/.test(motherTongue)
            ) {
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

            try {
                await verifyEmail(email);
            } catch (error) {
                const err = error as Error;
                newErrors.email = "invalid";
                setErrors(newErrors);
                toast.error(err.message || "Invalid email address.");
                console.log(error);
                return false;
            }

        return true;

            

        case 1: // Guardian Info
        
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

        case 2: // Academic Info
            if (!lrn.trim()) newErrors.lrn = "Required";
            if (!gradeLevel.trim()) newErrors.gradeLevel = "Required";
            if (!studentType.trim()) newErrors.section = "Required";
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

            if (!/^\d{12}$/.test(lrn)) {
                newErrors.lrn = "invalid";
                setErrors(newErrors);
                toast.error("Invalid LRN. Please enter a valid LRN.");
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

        case 3: // Additional Information
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

        
        case 5:
            const mopFilled = !!mop;
            const receiptFilled = !!reservationReceipt;
            const amountFilled = Number(reservationAmount) > 0;
            
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

            if (Number(reservationAmount) < 500 && reservationAmount !== "")
            {
                newErrors.reservationAmount = "Reservation amount must be greater than 500.";
                setErrors(newErrors);
                toast.error("The minimum reservation amount is P500.");
                return false;
            }
        return true;
            


        default:
        return true;
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
        
        const handleReservationAmount = (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if (value === "" || Number(value) >= 0) {
                setReservationAmount(value);
            }
            };

        // Refs for input elements
            const birthCertRef = useRef<HTMLInputElement>(null);
            const reportCardRef = useRef<HTMLInputElement>(null);
            const goodMoralRef = useRef<HTMLInputElement>(null);
            const idPicRef = useRef<HTMLInputElement>(null);
            const studentExitFormRef = useRef<HTMLInputElement>(null);
            const form137Ref = useRef<HTMLInputElement>(null);
            const itrRef = useRef<HTMLInputElement>(null);
            const escCertRef = useRef<HTMLInputElement>(null);

        const handleMopChange = (e: ChangeEvent<HTMLSelectElement>) => {
            setMop(e.target.value);
            setIsGcashSelected(e.target.value === "GCash");
            setIsBankTransferSelected(e.target.value === "Bank Transfer");
            // Clear the receipt when payment method changes
            setReservationReceipt(null);
            if (gcashReceiptRef.current) gcashReceiptRef.current.value = "";
            if (bankTransferReceiptRef.current) bankTransferReceiptRef.current.value = "";
        };

        const handleReceiptChange = (e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                setReservationReceipt(file);
            }
        };

        const gcashReceiptRef = useRef<HTMLInputElement>(null);
        const bankTransferReceiptRef = useRef<HTMLInputElement>(null);

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
            try 
            {

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

                const uploadReservationReceipt = reservationReceipt ? await uploadImage(reservationReceipt, 'reservationPayments') : ""; 


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
                    
                    gradeLevel,
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

                    mop,
                    uploadReservationReceipt,
                    reservationAmount,

                    attainmentUponGraduation,
                    // consistentGPA,
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

                    setGradeLevel("");
                    setStudentType("");
                    setSchoolYear("");
                    setSchoolType("");
                    setSchoolName("");
                    setRelationship("");

                    setMop("");
                    setReservationAmount("");
                    setReservationReceipt(null);

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


                    if (gcashReceiptRef.current) gcashReceiptRef.current.value = "";
                    if (bankTransferReceiptRef.current) bankTransferReceiptRef.current.value = "";
            } catch (error) {
                toast.error("Something went wrong. Please try again.");
                console.error('Something went wrong. Please try again.', error);

            } finally {
                setIsSubmitting(false); 
                toast.success("Application submitted successfully!");
                router.push("/");
               

            }
    
        };

        const handlePrev = () => {
            if (page > 0) setPage(page - 1);
            setErrors({}); 
        };

        const handleNext = async () => {
            if (!(await validatePage())) return;
            if (page < sections.length - 1) setPage(page + 1);
            setErrors({}); 
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
                                <label className="text-xs lg:text-sm text-dGreen font-semibold">Gender <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
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


                    </article>
                </fieldset >

                <fieldset className="w-full px-0 sm:px-2 py-2">
                <legend className="pl-2 ml-0 sm:ml-2 text-[13px] sm:text-[14px] lg:text-[16px] text-dGreen font-semibold border-l-4 rounded-sm border-dGreen font-merriweather">Cultural Background:</legend>
                
                    <article className="w-full gap-8 flex flex-col shadow-lg py-8 px-2 lg:px-8 bg-gray-100/50 border-2 border-gray-100 rounded-lg mt-3 ">

                        <section className="flex flex-col sm:flex-row gap-5">
                            <div className="flex flex-col">
                                <label className="text-xs lg:text-sm text-dGreen font-semibold">Religion <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
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
                                <label className="text-xs lg:text-sm text-dGreen font-semibold">Mother Tounge <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
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
                    Section 2: Parent / Guardian Details
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
                    Section 3: Educational Background
                </p>
            </div>
        ),
        content: (
            <main className=" w-full flex flex-col gap-10 px-0 lg:px-10 h-auto mt-2 ">

                <fieldset className="w-full px-0 sm:px-2 py-2">
                <legend className="pl-2 ml-0 sm:ml-2 text-[13px] sm:text-[14px] lg:text-[16px] text-dGreen font-semibold border-l-4 rounded-sm border-dGreen font-merriweather"> Enrollment Information:</legend>
                   
                    <article className="w-full gap-4 flex flex-col shadow-lg py-8 px-2 lg:px-8 bg-gray-100/50 border-2 border-gray-100 rounded-lg mt-3 ">

                        <section className="flex flex-col sm:flex-row gap-5">
                            <div className="flex flex-col">
                                <label className="text-xs lg:text-sm text-dGreen font-semibold">LRN <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
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
                                <label className="text-xs lg:text-sm text-dGreen font-semibold">Grade to Enroll <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
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
                                <label className="text-xs lg:text-sm text-dGreen font-semibold">Student Type <strong className="ml-1 text-red-600 text-[10px] lg:text-xs font-semibold">(Required)</strong></label>
                                <select 
                                    name="student type"
                                    onChange={(e) => setStudentType(e.target.value)}
                                    value={studentType}
                                    className={`rounded-sm px-1 w-full sm:w-[190px] lg:w-[300px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.studentType ? 'border border-red-600 bg-red-100' : 'bg-green-100'} 
                                    ${studentType === '' ? 'text-gray-500' : 'text-black'}`}>
                                        <option value="" >Select Option</option>
                                        <option value="Incoming G7">Incoming G7</option>
                                        <option value="Transferee">Transferee</option>
                                        {/* <option value="Old Student">Old Student</option> */}
                                </select>
                            </div>
                        </section>

                    </article>
                </fieldset>


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
                                    className={`rounded-sm px-1 w-full sm:w-[600px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
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
                                    className={`rounded-sm px-1 w-full sm:w-[600px] py-[6px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
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
                Section 4: Discount Classification
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
                Section 5: Documents Submission 
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
                <p className="text-[15px] sm:text-lg lg::text-2xl text-dGreen font-bold font-merriweather">
                    Section 6: Slot Reservation Fee Minimum (₱500)
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
                                value={reservationAmount}
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
                    Section 7: Application Submission
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
            </div>
        </main>
    );
};

export default ApplicationPage;