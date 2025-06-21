"use client";

import { ChangeEvent, FC, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";

interface Props {
  addApplicant: (
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
    
) => void;
}

const ApplicationPage: FC<Props>  =  ({ addApplicant }) => {
    const [page, setPage] = useState(0);

    const [errors,setErrors] = useState<{ [key: string]: string }>({});

    // State for handling input value
    const [applicantsLastName, setApplicantLastName] = useState("");
    const [applicantsFirstName, setApplicantFirst] = useState("");
    const [applicantsMiddleName, setApplicantMiddle] = useState("");
    const [applicantsSuffix, setApplicantSuffix] = useState("");
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

    const [mop, setMop] = useState("");
    const [reservationReceipt, setReservationReceipt] = useState<File | null>(null);
    
    const [isBankTransferSelected, setIsBankTransferSelected] = useState(false);
    const [isGcashSelected, setIsGcashSelected] = useState(false);

    const [trackingId, setTrackingId] = useState<string | null>(null);
    const [applicationStatus, setApplicationStatus] = useState<string | null>(null);


    const [isSubmitting, setIsSubmitting] = useState(false);


// Validation per page
const validatePage = (): boolean => {
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
        if (!emergencyEmail.trim()) newErrors.emergencyEmail = "Required";
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
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emergencyEmail) ||
            emergencyEmail.length < 5 ||
            emergencyEmail.length > 50
        ) {
             newErrors.emergencyEmail = "invalid";
            setErrors(newErrors);
            toast.error("Invalid email. Please enter a valid email.");
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

        if (!/^\d{12}$/.test(lrn)) {
            newErrors.lrn = "invalid";
            setErrors(newErrors);
            toast.error("Invalid LRN. Please enter a valid LRN.");
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
    const handleApplicantLastName = (e: ChangeEvent<HTMLInputElement>) => {
        setApplicantLastName(e.target.value);
    };
    const handleApplicantFirstName = (e: ChangeEvent<HTMLInputElement>) => {
        setApplicantFirst(e.target.value);
    };
    const handleApplicantMiddleName = (e: ChangeEvent<HTMLInputElement>) => {
        setApplicantMiddle(e.target.value);
    };
    const handleApplicantSuffix = (e: ChangeEvent<HTMLInputElement>) => {
        setApplicantSuffix(e.target.value);
    };
    const handleDateOfBirth = (e: ChangeEvent<HTMLInputElement>) => {
        const dateOfBirth = new Date(e.target.value);
        const age = calculateAge(dateOfBirth);
        setDateOfBirth(e.target.value);
        setAge(age.toString());
    };
    const handleGender = (e: ChangeEvent<HTMLSelectElement>) => {
        setGender(e.target.value);
    };
    const handleMobileNumber = (e: ChangeEvent<HTMLInputElement>) => {
        setMobileNumber(e.target.value);
    };
    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };


    const handleGuardiansLastName = (e: ChangeEvent<HTMLInputElement>) => {
        setGuardianLastName(e.target.value);
    };
    const handleGuardiansFirstName = (e: ChangeEvent<HTMLInputElement>) => {
        setGuardianFirstName(e.target.value);
    };
    const handleGuardiansMiddleName = (e: ChangeEvent<HTMLInputElement>) => {
        setGuardianMiddleName(e.target.value);
    };
    const handleGuardiansSuffix = (e: ChangeEvent<HTMLInputElement>) => {
        setGuardianSuffix(e.target.value);
    };
    
    const handleEmergencyContact = (e: ChangeEvent<HTMLInputElement>) => {
        setEmergencyContact(e.target.value);
    };
    const handleEmergencyEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmergencyEmail(e.target.value);
    };  
    const handleFullAddress = (e: ChangeEvent<HTMLInputElement>) => {
        setFullAddress(e.target.value);
    };

    const handleLrn = (e: ChangeEvent<HTMLInputElement>) => {
        setLrn(e.target.value);
    };
    const handleGradeLevel = (e: ChangeEvent<HTMLSelectElement>) => {
        setGradeLevel(e.target.value);
    };
    const handleSchoolYear = (e: ChangeEvent<HTMLSelectElement>) => {
        setSchoolYear(e.target.value);
    };
    const handleSchoolType = (e: ChangeEvent<HTMLSelectElement>) =>  {
        setSchoolType(e.target.value);
    };
    const handleSchoolName = (e: ChangeEvent<HTMLInputElement>) => {
        setSchoolName(e.target.value);
    };
    const handleSchoolAddress = (e: ChangeEvent<HTMLInputElement>) => {
        setSchoolAddress(e.target.value);
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

     // Refs for input elements
         const birthCertRef = useRef<HTMLInputElement>(null);
         const reportCardRef = useRef<HTMLInputElement>(null);
         const goodMoralRef = useRef<HTMLInputElement>(null);
         const idPicRef = useRef<HTMLInputElement>(null);
         const studentExitFormRef = useRef<HTMLInputElement>(null);

    const handleMopChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMop(e.target.value);
        setIsGcashSelected(e.target.value === "GCash");
        setIsBankTransferSelected(e.target.value === "Bank Transfer");
    };

    const handleReceiptChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setReservationReceipt(file);
        }
    };

    const gcashReceiptRef = useRef<HTMLInputElement>(null);
    const bankTransferReceiptRef = useRef<HTMLInputElement>(null);

    
    // Event handler for adding a new todo
    const handleAdd = async () => {
        setIsSubmitting(true);
        try {
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

        const uploadReservationReceipt = reservationReceipt ? await uploadImage(reservationReceipt, 'reservationPayments') : ""; 

                //api call
        const response = await fetch('/api/trackingId', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ trackingId, applicationStatus, email }),
          });
        const data = await response.json();
  
        // Ensure these properties exist in your API response
        setTrackingId(data.trackingId);
        setApplicationStatus(data.applicationStatus);


            addApplicant
            (
                applicantsLastName, 
                applicantsFirstName,
                applicantsMiddleName, 
                applicantsSuffix, 
                new Date(dateOfBirth), 
                Number(age), 
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
                schoolName,
                schoolAddress,

                uploadBirthCert,
                uploadReportCard,
                uploadGoodMoral,
                uploadIdPic,
                uploadStudentExitForm,

                mop,
                uploadReservationReceipt,



            );
        
                setApplicantLastName("");
                setApplicantFirst("");
                setApplicantMiddle("");
                setApplicantSuffix("");
                setDateOfBirth("");
                setAge("");
                setGender("");
                setMobileNumber("");
                setEmail("");
                setLrn("");

                setGuardianLastName("");
                setGuardianFirstName("");
                setGuardianMiddleName("");
                setGuardianSuffix("");
                setEmergencyContact("");
                setEmergencyEmail("");
                setFullAddress("");

                setGradeLevel("");
                setSchoolYear("");
                setSchoolType("");
                setSchoolName("");
                setSchoolAddress("");

                setMop("");
                setReservationReceipt(null);
                
                // Reset file input fields
                if (birthCertRef.current) birthCertRef.current.value = "";
                if (reportCardRef.current) reportCardRef.current.value = "";
                if (goodMoralRef.current) goodMoralRef.current.value = "";
                if (idPicRef.current) idPicRef.current.value = "";
                if (studentExitFormRef.current) studentExitFormRef.current.value = "";

                if (gcashReceiptRef.current) gcashReceiptRef.current.value = "";
                if (bankTransferReceiptRef.current) bankTransferReceiptRef.current.value = "";

        } catch (error) {
            toast.error("Failed to enroll. Please try again.");
            console.error('Error creating user:', error);
        } finally {
            setIsSubmitting(false);
        }
  
    };

    const sections = [
        {
            title: (
                <div>
                    <p className="text-lg lg:text-2xl text-dGreen font-bold font-merriweather">
                        Section 1: Personal Information
                    </p>
                </div>
            ),
            content: (
                <main className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <section className="flex flex-col h-[55px] justify-center">
                        {errors.applicantsLastName === "Required" &&(
                            <p className="text-red-500 text-[12px]">
                                {errors.applicantsLastName}
                            </p>
                        )}
                        <div className="flex flex-row gap-3 items-center">
                            <label className="font-semibold font-merriweather text-dGreen text-sm lg:text-xl w-[170px]">Last Name:</label>
                            <input 
                                type="text" 
                                placeholder="Dela Cruz"
                                onChange={handleApplicantLastName}
                                value={applicantsLastName}
                                className={`rounded-sm px-2 w-full lg:-w-[300px] h-[35px]
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
                            <label className="font-semibold font-merriweather text-dGreen text-sm lg:text-xl w-[170px]">First Name:</label>
                            <input 
                                type="text" 
                                placeholder="John"
                                onChange={handleApplicantFirstName}
                                value={applicantsFirstName}
                                className={`rounded-sm px-2 w-full lg:w-[300px] h-[35px]
                                ${errors.applicantsFirstName ? 'border border-red-600 bg-red-100' : ' bg-gray-200'}`} 
                            />
                        </div>
                    </section>

                    <section className="flex flex-col h-[55px] justify-center ">
                        <div className="flex flex-row gap-3 items-center">
                            <label className="font-semibold font-merriweather text-dGreen text-sm lg:text-xl w-[170px]">Middle Name:</label>
                            <input 
                                type="text" 
                                placeholder="Doe" 
                                onChange={handleApplicantMiddleName}
                                value={applicantsMiddleName}
                                className="rounded-sm px-2 w-full h-[35px] bg-gray-200"
                            />
                        </div>
                    </section>
         
                    <section className="flex flex-col h-[55px] justify-center ">
                        <div className="flex flex-row gap-3 items-center">
                            <label className="font-semibold font-merriweather text-dGreen text-sm lg:text-xl w-[170px]">Suffix:</label>
                            <input 
                                type="text" 
                                placeholder="Jr." 
                                onChange={handleApplicantSuffix}
                                value={applicantsSuffix}
                                className="border bg-gray-200 rounded-sm px-2 w-full lg:w-[300px] h-[35px]" />
                        </div>
                    </section>

                    <section className="flex flex-col h-[55px] justify-center ">
                        {errors.dateOfBirth === "Required" && (
                            <p className="text-red-500 text-[12px]">
                                {errors.dateOfBirth}
                            </p>
                        )}
                        <div className="flex flex-row gap-3 items-center">
                            <label className="font-semibold font-merriweather text-dGreen text-sm lg:text-xl w-full lg:w-[170px]">Birth Date:</label>
                            <input 
                                type="date" 
                                onChange={handleDateOfBirth}
                                value={dateOfBirth}
                                className={`rounded-sm px-1 w-[300px] h-[35px]
                                ${errors.dateOfBirth ? 'border border-red-600 bg-red-100' : 'bg-gray-200'} 
                                ${dateOfBirth === '' ? 'text-gray-500' : 'text-black'}`} 
                            />
                        </div>

                    </section>
                    
                    <section className="flex flex-col h-[55px] justify-center ">
                        <div className="flex flex-row gap-3 items-center">
                            <label className="font-semibold font-merriweather text-dGreen text-sm lg:text-xl w-[170px]">Age:</label>
                            <input 
                                disabled
                                type="text" 
                                value={age}
                                className="border bg-gray-200 rounded-sm px-2 w-full lg:w-[170px] h-[35px]" />
                        </div>
                    </section>
                    <section className="flex flex-col h-[55px] justify-center ">
                        {errors.gender && (
                            <p className="text-red-500 text-[12px]">
                                {errors.gender}
                            </p>
                        )}
                        <div className="flex flex-row gap-3 items-center">
                            <label className="font-semibold font-merriweather text-dGreen text-sm lg:text-xl w-[170px]">Gender:</label>
                            <select 
                                name="Gender"
                                onChange={handleGender}
                                value={gender}
                                className={`rounded-sm px-2 w-full lg:w-[300px] h-[35px] 
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
                            <label className="font-semibold font-merriweather text-dGreen text-sm lg:text-xl w-[170px]">Mobile Number:</label>
                            <input 
                                type="text"
                                placeholder="09XXXXXXXX" 
                                onChange={handleMobileNumber}
                                value={mobileNumber}
                                className={`rounded-sm px-2 w-full lg:w-[300px] h-[35px]
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
                            <label className="font-semibold font-merriweather text-dGreen text-sm lg:text-xl w-[170px]">Email address:</label>
                            <input 
                                type="text" 
                                placeholder="l7B4G@example.com" 
                                onChange={handleEmail}
                                value={email}
                                className={`rounded-sm px-2 w-full lg:w-[300px] h-[35px]
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
                    <p className="text-lg lg:text-2xl text-dGreen font-bold font-merriweather">
                        Section 2: Contact & Guardian Details
                    </p>
                </div>
            ),
            content:(
                <main className="grid grid-cols-1 lg:grid lg:grid-cols-1 gap-10">
                    <article className="grid grid-cols-1 lg:grid lg:grid-cols-2 gap-10">
                        <section className="flex flex-col h-[55px] justify-center ">    
                            {errors.guardiansLastName === "Required" && (
                                <p className="text-red-500 text-[12px]">
                                    {errors.guardiansLastName}
                                </p>
                            )}
                            <div className="flex flex-row gap-3 items-center">
                                
                                <label className="font-semibold font-merriweather text-dGreen text-sm lg:text-xl w-[240px]"> Guardian Last Name:</label>
                                <input 
                                    type="text" 
                                    placeholder="Garcia"
                                    onChange={handleGuardiansLastName}
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
                                <label className="font-semibold font-merriweather text-dGreen text-sm lg:text-xl w-[240px]"> Guardian First Name:</label>
                                <input 
                                    type="text" 
                                    placeholder="John" 
                                    onChange={handleGuardiansFirstName}
                                    value={guardiansFirstName}
                                    className={`rounded-sm px-1 w-[300px] h-[35px]
                                    ${errors.guardiansFirstName ? 'border border-red-600 bg-red-100' : ' bg-gray-200'}`} 
                                />
                            </div>
                         </section>

                        <section className="flex flex-col h-[55px] justify-center ">
                            <div className="flex flex-row gap-3 items-center">
                                <label className="font-semibold font-merriweather text-dGreen text-sm lg:text-xl w-[240px]"> Guardian Middle Name:</label>
                                <input 
                                    type="text" 
                                    placeholder="Doe"
                                    onChange={handleGuardiansMiddleName}
                                    value={guardiansMiddleName}
                                    className="border bg-gray-200 rounded-sm px-1 w-[300px] h-[35px]" 
                                />
                            </div>
                        </section>

                        <section className="flex flex-col h-[55px] justify-center ">
                            <div className="flex flex-row gap-3 items-center">
                                <label className="font-semibold font-merriweather text-dGreen text-sm lg:text-xl w-[240px]"> Guardian Suffix:</label>
                                <input 
                                    type="text" 
                                    placeholder="Jr."
                                    onChange={handleGuardiansSuffix}
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
                                <label className="font-semibold font-merriweather text-dGreen text-sm lg:text-xl w-[240px]"> Contact Number:</label>
                                <input 
                                    type="text" 
                                    placeholder="09123456789" 
                                    onChange={handleEmergencyContact}
                                    value={emergencyContact}
                                    className={`rounded-sm px-1 w-[300px] h-[35px]
                                    ${errors.emergencyContact ? 'border border-red-600 bg-red-100' : ' bg-gray-200'}`} 
                                />
                            </div>
                        </section>

                        <section className="flex flex-col h-[55px] justify-center ">
                            <div className="flex flex-row gap-3 items-center">
                                <label className="font-semibold font-merriweather text-dGreen text-sm lg:text-xl w-[240px]"> Guardian Email:</label>
                                <input 
                                    type="text" 
                                    placeholder="sample@gmail.com"
                                    onChange={handleEmergencyEmail}
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
                            <label className="font-semibold font-merriweather text-dGreen text-sm lg:text-xl w-[240px]">Full Address:</label>
                            <input 
                                type="text" 
                                placeholder="123 Main Street, City, Country"
                                onChange={handleFullAddress}
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
                    <p className="text-lg lg:text-2xl text-dGreen font-bold font-merriweather">
                        Section 3: Educational Background
                    </p>
                </div>
            ),
            content: (
                <main className="flex flex-col gap-5">
                    <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
                        <section className="flex flex-col gap-3 justify-center h-[55px]">
                            {errors.lrn === "Required" && (
                                <p className="text-red-500 text-[12px]">
                                    {errors.lrn}
                                </p>
                            )}
                            <div className="flex flex-row gap-3 items-center">
                                <label className="font-semibold font-merriweather text-dGreen text-sm lg:text-xl w-[240px]"> LRN:</label>
                                <input 
                                    type="text" 
                                    placeholder="123456789102"
                                    onChange={handleLrn}
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
                                <label className="font-semibold font-merriweather text-dGreen text-sm lg:text-xl w-[240px]">Grade Level to Enroll:</label>
                                <select 
                                    name="Gender"
                                    onChange={handleGradeLevel}
                                    value={gradeLevel}
                                    className={`rounded-sm px-1 w-[300px] h-[35px] 
                                    ${errors.gradeLevel ? 'border border-red-600 bg-red-100' : 'bg-gray-200'} 
                                    ${gradeLevel === '' ? 'text-gray-500' : 'text-black'}`}>
                                        <option value="" >Select Grade</option>
                                        <option value="Grade 7">Grade 7</option>
                                        <option value="Grade 8">grade 8</option>
                                        <option value="Grade 9">Grade 9</option>
                                        <option value="Grade 10">Grade 10</option>
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
                                <label className="font-semibold font-merriweather text-dGreen text-sm lg:text-xl w-[240px]">School Year Graduated:</label>
                                <select
                                    name="schoolYear"
                                    onChange={handleSchoolYear}
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
                                <label className="font-semibold font-merriweather text-dGreen text-sm lg:text-xl w-[240px]">School Type:</label>
                                <select 
                                    name="Gender"
                                    onChange={handleSchoolType}
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
                                <label className="font-semibold font-merriweather text-dGreen text-sm lg:text-xl w-[240px]">Previous School:</label>
                                <input 
                                    type="text" 
                                    placeholder="AB Normal Schoool"
                                    onChange= {handleSchoolName} 
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
                            <label className="font-semibold font-merriweather text-dGreen text-sm lg:text-xl w-[240px]">School Address:</label>
                            <input 
                                type="text"
                                placeholder="123 Street, City, Country"
                                onChange={handleSchoolAddress}
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
                    <p className="text-lg lg:text-2xl text-dGreen font-bold font-merriweather">
                        Section 4: Documents Submission
                    </p>
                </div>
            ),
            content: (
                <main className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                    <section className="flex flex-row gap-3 items-center">
                        <label className="font-semibold font-merriweather text-dGreen text-sm lg:text-xl w-[240px]">PSA Birth Certificate:</label>
                        <input 
                             type="file" 
                            ref={birthCertRef}
                            onChange={handleBirthCertChange}
                            name="document"  
                            className="border bg-gray-200 rounded-sm p-1 w-full lg:w-[300px] h-[35px] " 
                        />
                    </section>
                    <section className="flex flex-row gap-3 items-center">
                        <label className="font-semibold font-merriweather text-dGreen text-sm lg:text-xl w-[240px]">Good Moral Certificate:</label>
                        <input 
                            type="file" 
                            ref={goodMoralRef}
                            name="document"  
                            onChange={handleGoodMoralChange}
                            className="border bg-gray-200 rounded-sm p-1 w-full lg:w-[300px] h-[35px] " />
                    </section>
                    <section className="flex flex-row gap-3 items-center">
                        <label className="font-semibold font-merriweather text-dGreen text-sm lg:text-xl w-[240px]">REPORT CARD:</label>
                        <input 
                            type="file" 
                            ref={reportCardRef}
                            name="document"  
                            onChange={handleReportCardChange}
                            className="border bg-gray-200 rounded-sm p-1 w-full lg:w-[300px] h-[35px] " />
                    </section>
                    <section className="flex flex-row gap-3 items-center">
                        <label className="font-semibold font-merriweather text-dGreen text-sm lg:text-xl w-[240px]">2x2 ID picture:</label>
                        <input 
                        type="file" 
                        ref={idPicRef}
                        name="document"  
                        onChange={handleIdPIcChange}
                        className="border bg-gray-200 rounded-sm p-1 w-full lg:w-[300px] h-[35px] " />
                    </section>
                    <section className="flex flex-row gap-3 items-center">
                        <label className="font-semibold font-merriweather text-dGreen text-sm lg:text-xl w-[240px]">CACPRISAA Student Exit Clearance:</label>
                        <input 
                            type="file" 
                            name="document"  
                            ref={studentExitFormRef}
                            onChange={handleStudentExitFormChange}
                            className="border bg-gray-200 rounded-sm p-1 w-full lg:w-[300px] h-[35px] " />
                    </section>
                </main>
            ),
        },

        {
            title: (
                <div>
                    <p className="text-lg lg:text-2xl text-dGreen font-bold font-merriweather">
                        Section 5: Slot Reservation Fee (₱500)
                    </p>
                </div>
                ),
                content: (
                    <main className="flex flex-col lg:flex-row gap-7 w-full justify-center">
                        
                        <section className="w-full lg:max-w-[600px] flex flex-col items-center text-center gap-10">  
                            <header className="font-bold font-merriweather text-2xl text-lGreen bg-green-400/30 w-[250px] lg:w-[500px] py-3" >
                                GCASH PAYMENT
                            </header> 

                            <article  className=" gap-7 items-center">
                                <div className="bg-yellow h-[45px] w-[125px] rounded-lg items-center justify-center flex font-bold font-oswald text-2xl text-lGreen">
                                    STEP 1
                                </div>
                                <section className="w-[250px] h-[200px] lg:w-[530px] lg:h-[150px] bg-green-400/30 rounded-md  py-5">
                                    <p className="font-bold text-lg text-dGreen ">
                                        Send the 500.00 reservation fee
                                    </p>
                                    <div className="flex flex-row w-full justify-center gap-3">
                                        <p className="font-bold text-lg text-dGreen ">
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
                                                width={20}
                                                height={20}
                                            />
                                        </button>
                                    </div>

                                    <footer className="mt-10 font-regular text-md text-dGreen flex flex-row justify-center gap-3">
                                        <p>
                                            Click this to download the QR Code
                                        </p>
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
                                    </footer>

                                </section>
                            </article >

                            <article>
                            <div className="bg-yellow h-[45px] w-[125px] rounded-lg items-center justify-center flex font-bold font-oswald text-2xl text-lGreen">
                                STEP 2
                            </div>
                           <section className="w-[300px] h-[550px] lg:w-[530px] lg:h-[530px] bg-green-400/30  rounded-md flex flex-col items-center gap-10  py-5">
                               
                                    <p className="font-regular text-base lg:text-lg text-d2Green">
                                        Upload a screenshot of your receipt.
                                    </p>
                                    <p className="font-regular text-base lg:text-lg text-d2Green">
                                        Make sure the <strong className="font-bold text-d2Green">Reference No.</strong> is clearly visible.
                                    </p>
                                
                                <figure>
                                    <Image
                                        src="/image.png"
                                        alt="receipt"
                                        width={300}
                                        height={200}
                                        className="w-[200px] h-[200px] lg:w-[300px] lg:h-[200px]"
                                    />
                                </figure>
                                <section>
                                    <div className="flex flex-col lg:flex-row gap-5 items-center">
                                        <label htmlFor="mop" className="font-bold text-base lg:text-lg text-d2Green">Payment Method: </label>
                                        <div className="flex flex-row gap-3">
                                            <input 
                                                type="radio" 
                                                id="mop"
                                                name="mop" 
                                                value="GCash"
                                                onChange={handleMopChange}
                                                
                                            />
                                            <label htmlFor="mop" className="font-regular text-base lg:text-lg text-d2Green"> 
                                                Gcash Payment
                                            </label>
                                        </div>                                         
                                    </div>  

                                    <div className="flex flex-col lg:flex-row gap-3 items-center justify-center mt-2">
                                        <label htmlFor="document" className="font-medium font-oswald text-base lg:text-xl text-d2Green "> GCash Receipt:</label>
                                        <input 
                                        type="file" 
                                        ref={gcashReceiptRef}
                                        name="document"  
                                        className="px-4 py-1 bg-gray-300/50 h-[36px] w-full lg:w-[250px] rounded-lg"
                                        disabled={!isGcashSelected}
                                        onChange={handleReceiptChange}
                                        accept="image/*"
                                        />
                                    </div>
                                </section>
                            </section>
                            </article>
                        </section>
                         <br />

                      {/*  <div className="w-[2px] h-auto bg-dGreen" />  
                      <div className="w-1/2"> */}


                        
                        <section className="w-full lg:w-[600px] flex flex-col items-center text-center gap-10">  
                            <header className="font-bold font-merriweather text-2xl text-lGreen bg-green-400/30  w-[250px] lg:w-[500px] py-3" >
                                BANK TRANSFER
                            </header>

                            <article  className=" gap-7 items-center">
                                
                                <div className="bg-yellow h-[45px] w-[125px] rounded-lg items-center justify-center flex font-bold font-oswald text-2xl text-lGreen">
                                    STEP 1
                                </div>
                                <section className="w-[300px] h-[200px] lg:w-[530px] lg:h-[200px] bg-green-500/30 rounded-md flex flex-col p-2 gap-5">
                                    <p className="font-bold text-base lg:text-lg text-dGreen ">
                                        Send the 500.00 reservation fee
                                    </p>
                                    <div className="flex flex-row text-start justify-center gap-[100px] ">
                                        <div className="font-bold text-sm lg:text-lg text-dGreen  bg-yellow-300">
                                            <p >Bank Name:</p>
                                            <p >Account Name:</p>
                                            <p>Account Number:</p>
                                        </div>
                                        <div className="font-semibold text-sm lg:text-lg text-dGreen">
                                            <p >BDO</p>
                                            <p>John Doe </p>
                                            <p className="text-xs lg:text-lg">1234-5678-9101 </p>
                                        </div>
                                    </div>
                                     <footer className="font-regular text-md text-dGreen flex flex-row justify-center gap-3">
                                        <p>
                                            Click this to download the QR Code
                                        </p>
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
                                    </footer>
                                </section>
                            </article >
                            
                            <article>
                            <div className="bg-yellow h-[45px] w-[125px] rounded-lg items-center justify-center flex font-bold font-oswald text-2xl text-lGreen">
                                STEP 2
                            </div>
                            <section className="w-[300px] h-[500px] lg:w-[530px] lg:h-[570px] bg-green-400/30  rounded-md flex flex-col items-center gap-10  py-5">
                                    <p className="font-regular text-sm lg:text-lg text-d2Green">
                                        Upload a screenshot of your receipt.
                                    </p>
                                    <p className="font-regular text-sm lg:text-lg text-d2Green">
                                        Make sure the <strong className="font-bold text-d2Green">Reference No.</strong> is clearly visible.
                                    </p>
                                
                                <figure>
                                    <Image
                                        src="/bank.svg"
                                        alt="receipt"
                                        width={300}
                                        height={200}
                                        className="w-[200px] h-[150px] lg:w-[300px] lg:h-[200px]"
                                    />
                                </figure>
                                <section>
                                    <div className="flex flex-col lg:flex-row gap-5 items-center">
                                        <label htmlFor="mop" className="font-bold text-base lg:text-lg text-d2Green">Payment Method: </label>
                                        <div className="flex flex-row gap-3">
                                            <input 
                                                type="radio" 
                                                id="mop"
                                                name="mop" 
                                                value="Bank Transfer"
                                                onChange={handleMopChange}
                                                
                                            />
                                            <label htmlFor="mop" className="font-regular text-lg text-d2Green"> 
                                                Bank Transfer
                                            </label>
                                        </div>                                         
                                    </div>  

                                    <div className="flex flex-col lg:flex-row gap-3 items-center justify-center mt-2">
                                        <label htmlFor="document" className="font-medium font-oswald text-base lg:text-xl text-d2Green"> Bank Receipt:</label>
                                        <input 
                                        type="file" 
                                        ref={bankTransferReceiptRef}
                                        name="document"  
                                        className="px-4 py-1 bg-gray-300/50 h-[36px] w-full lg:w-[250px] rounded-lg"
                                        disabled={!isBankTransferSelected}
                                        onChange={handleReceiptChange}
                                        accept="image/*"
                                        />
                                    </div>
                                </section>
                            </section>
                            </article>
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

    const handleNext = () => {
        if (!validatePage()) return;
        if (page < sections.length - 1) setPage(page + 1);
        setErrors({}); 
    };

    return (
        <main className="min-h-[600px] w-full mt-2 p-5 flex flex-col">
            <div className="h-full ">
                <section className="w-full text-center">
                    <p className="text-4xl text-dGreen font-bold font-merriweather">
                        Junior High School Application
                    </p>
                </section>

                {/* content */}
                <div className=" mt-[80px] -mx-0 flex flex-col gap-3">
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
    );
};

export default ApplicationPage;
