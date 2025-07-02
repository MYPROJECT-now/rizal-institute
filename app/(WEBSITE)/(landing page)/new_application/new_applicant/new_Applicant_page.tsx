    "use client";

    import { ChangeEvent, FC, useRef, useState } from "react";
    import { Button } from "@/components/ui/button";
    import { toast } from "sonner";
    import Image from "next/image";
    import { usePreviewModal } from "@/src/store/preview";
    import { PreviewModal } from "@/components/landing_page_portal/preview/preview_modal";
    import { verifyEmail, verifyLrn } from "@/src/actions/landingPage";

    import {
        Card,
        CardContent,
        CardHeader,
        CardTitle,
    } from "@/components/ui/card"


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
        studentType: string,
        schoolType: string,
        prevSchool: string,
        schoolAddress: string,

            
        birthCert: string,
        reportCard: string,
        goodMoral: string,
        idPic: string,
        studentExitForm: string,
        form137: string,

        mop: string,
        reservationReceipt: string,
        reservationAmount: number,

        attainmentUponGraduation: string,
        consistentGPA: string,
        hasEnrolledSibling: string,
        
    ) => void;
    }


    const ApplicationPage: FC<Props>  =  ({ addApplicant }) => {
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

        const [attainmentUponGraduation, setAttainmentUponGraduation] = useState("");
        const [consistentGPA, setConsistentGPA] = useState("");
        const [hasEnrolledSibling, setHasEnrolledSibling] = useState("");

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

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                toast.error("Please fill in all required fields.");
                return false;
            }

            // Check for existing email
            try {
                await verifyEmail(email);
            } catch (error) {
                newErrors.email = "invalid";
                setErrors(newErrors);
                toast.error("This email is already in use. Please use another email.");
                console.log(error);
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
            if (!studentType.trim()) newErrors.section = "Required";
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
            
            
        case 5: // Additional Information
            if (!attainmentUponGraduation.trim()) newErrors.attainmentUponGraduation = "Required";
            if (!consistentGPA.trim()) newErrors.consistentGPA = "Required";
            if (!hasEnrolledSibling.trim()) newErrors.hasEnrolledSibling = "Required";

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                toast.error("Please fill in all required fields.");
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
            setApplicantsLastName(e.target.value);
        };
        const handleApplicantFirstName = (e: ChangeEvent<HTMLInputElement>) => {
            setApplicantsFirstName(e.target.value);
        };
        const handleApplicantMiddleName = (e: ChangeEvent<HTMLInputElement>) => {
            setApplicantsMiddleName(e.target.value);
        };
        const handleApplicantSuffix = (e: ChangeEvent<HTMLInputElement>) => {
            setApplicantsSuffix(e.target.value);
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
        const handleStudentType = (e: ChangeEvent<HTMLSelectElement>) =>{
            setStudentType(e.target.value);
        }
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

        const handleAttainmentUponGraduation = (e: ChangeEvent<HTMLSelectElement>) => {
            setAttainmentUponGraduation(e.target.value);
        };
        const handleConsistentGPA = (e: ChangeEvent<HTMLSelectElement>) => {
            setConsistentGPA(e.target.value);
        };
        const handleHasEnrolledSibling = (e: ChangeEvent<HTMLSelectElement>) => {
            setHasEnrolledSibling(e.target.value);
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
        

        // Refs for input elements
            const birthCertRef = useRef<HTMLInputElement>(null);
            const reportCardRef = useRef<HTMLInputElement>(null);
            const goodMoralRef = useRef<HTMLInputElement>(null);
            const idPicRef = useRef<HTMLInputElement>(null);
            const studentExitFormRef = useRef<HTMLInputElement>(null);
            const form137Ref = useRef<HTMLInputElement>(null);

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

                const uploadReservationReceipt = reservationReceipt ? await uploadImage(reservationReceipt, 'reservationPayments') : ""; 



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

                    mop,
                    uploadReservationReceipt,
                    reservationAmount,

                    attainmentUponGraduation,
                    consistentGPA,
                    hasEnrolledSibling,

                );
            
                    setApplicantsLastName("");
                    setApplicantsFirstName("");
                    setApplicantsMiddleName("");
                    setApplicantsSuffix("");
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
                    setStudentType("");
                    setSchoolYear("");
                    setSchoolType("");
                    setSchoolName("");
                    setSchoolAddress("");

                    setMop("");
                    setReservationAmount(0);
                    setReservationReceipt(null);

                    setAttainmentUponGraduation("");
                    setConsistentGPA("");
                    setHasEnrolledSibling("");
                    
                    // Reset file input fields
                    if (birthCertRef.current) birthCertRef.current.value = "";
                    if (reportCardRef.current) reportCardRef.current.value = "";
                    if (goodMoralRef.current) goodMoralRef.current.value = "";
                    if (idPicRef.current) idPicRef.current.value = "";
                    if (studentExitFormRef.current) studentExitFormRef.current.value = "";
                    if (form137Ref.current) form137Ref.current.value = "";


                    if (gcashReceiptRef.current) gcashReceiptRef.current.value = "";
                    if (bankTransferReceiptRef.current) bankTransferReceiptRef.current.value = "";

            } catch (error) {
                toast.error("Failed to enroll. Please try again.");
                console.error('Error creating user:', error);
            } finally {
                setIsSubmitting(false);
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
                        <p className="text-[16px] md:text-2xl text-dGreen font-bold font-merriweather">
                            Section 1: Personal Information
                        </p>
                    </div>
                ),
                content: (
                    <main className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7 mt-4 px-[10px] md:px-[20px] w-full ">

                        <section className="flex flex-row items-end w-full">
                            <label className="hidden md:block text-[15px] lg:text-[19px] xl:text-[23px] w-[200px] lg:w-[250px] font-semibold font-merriweather text-dGreen ">Last Name:</label>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex flex-row items-center gap-1 w-full">
                                    <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">Last Name:</label>
                                    <span className="text-red-500 font-semibold block md:hidden text-[8px]"> (Required) </span>
                                    <span className="text-red-500 font-semibold md:block hidden text-[11px]"> Required </span>
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="Dela Cruz"
                                    onChange={handleApplicantLastName}
                                    value={applicantsLastName}
                                    className={`rounded-sm px-1 w-full  md:w-[190px] lg:w-[250px] xl:w-[320px] h-[30px] lg:h-[35px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.applicantsLastName ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`} 
                                />
                            </div>
                        </section>

                        <section className="flex flex-row items-end w-full">
                            <label className="hidden md:block text-[15px] lg:text-[19px] xl:text-[23px] w-[200px] lg:w-[250px] font-semibold font-merriweather text-dGreen ">First Name:</label>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex flex-row items-center gap-1">
                                    <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">First Name:</label>
                                    <span className="text-red-500 font-semibold block md:hidden text-[8px]"> (Required) </span>
                                    <span className="text-red-500 font-semibold md:block hidden text-[11px]"> Required </span>
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="John"
                                    onChange={handleApplicantFirstName}
                                    value={applicantsFirstName}
                                    className={`rounded-sm px-1 w-full md:w-[190px] lg:w-[250px] xl:w-[320px] h-[30px] lg:h-[35px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.applicantsFirstName ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`} 
                                />
                            </div>

                        </section>

                        <section className="flex flex-row items-end w-full">
                            <label className="hidden md:block text-[15px] lg:text-[19px] xl:text-[23px] w-[200px] lg:w-[250px] font-semibold font-merriweather text-dGreen ">Middle Name:</label>
                            <div className="flex flex-col gap-1 w-full ">
                                <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">Middle Name:</label>
                                <input 
                                    type="text" 
                                    placeholder="Doe" 
                                    onChange={handleApplicantMiddleName}
                                    value={applicantsMiddleName}
                                    className="rounded-sm px-1 w-full md:w-[190px] lg:w-[250px] xl:w-[320px] h-[30px] lg:h-[35px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
                                    />
                            </div>
                        </section>
            
                        <section className="flex flex-row items-end w-full">
                            <label className="hidden md:block text-[15px] lg:text-[19px] xl:text-[23px] w-[200px] lg:w-[250px] font-semibold font-merriweather text-dGreen "> Suffix:</label>
                            <div className="flex flex-col gap-1 w-full ">
                                <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">Suffix:</label>
                                <input 
                                    type="text" 
                                    placeholder="Jr." 
                                    onChange={handleApplicantSuffix}
                                    value={applicantsSuffix}
                                    className="rounded-sm px-1  w-full md:w-[190px] lg:w-[250px] xl:w-[320px] h-[30px] lg:h-[35px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
                                />
                            </div>
                        </section>

                        <section className="flex flex-row items-end w-full ">
                            <label className="hidden md:block text-[15px] lg:text-[19px] xl:text-[23px] w-[200px] lg:w-[250px] font-semibold font-merriweather text-dGreen ">Date Of Birth:</label>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex flex-row items-center gap-1">
                                    <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">Date Of Birth:</label>
                                    <span className="text-red-500 font-semibold block md:hidden text-[8px]"> (Required) </span>
                                    <span className="text-red-500 font-semibold md:block hidden text-[11px]"> Required </span>
                                </div>
                                <input 
                                    type="date" 
                                    onChange={handleDateOfBirth}
                                    value={dateOfBirth}
                                    className={`rounded-sm px-1 w-full md:w-[190px] lg:w-[250px] xl:w-[320px] h-[30px] lg:h-[35px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.dateOfBirth ? 'border border-red-600 bg-red-100' : 'bg-green-100'} 
                                    ${dateOfBirth === '' ? 'text-gray-500' : 'text-black'}`} 
                                />
                            </div>
                        </section>
                        
                        <section className="flex flex-row items-end w-full">
                        <label className="hidden md:block text-[15px] lg:text-[19px] xl:text-[23px] w-[200px] lg:w-[250px] font-semibold font-merriweather text-dGreen "> Age:</label>
                            <div className="flex flex-col gap-1 w-full">
                                <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">Age:</label>
                                <input 
                                    disabled
                                    type="text" 
                                    value={age}
                                    className="rounded-sm px-1  w-full md:w-[190px] lg:w-[250px] xl:w-[320px] h-[30px] lg:h-[35px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
                                />         
                            </div>           
                        </section>

                        <section className="flex flex-row items-end w-full">
                            <label className="hidden md:block text-[15px] lg:text-[19px] xl:text-[23px] w-[200px] lg:w-[250px] font-semibold font-merriweather text-dGreen ">Gender:</label>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex flex-row items-center gap-1">
                                    <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">Gender:</label>
                                    <span className="text-red-500 font-semibold block md:hidden text-[8px]"> (Required) </span>
                                    <span className="text-red-500 font-semibold md:block hidden text-[11px]"> Required </span>
                                </div>
                                <select 
                                    name="Gender"
                                    onChange={handleGender}
                                    value={gender}
                                    className={`rounded-sm px-1 w-full md:w-[190px] lg:w-[250px] xl:w-[320px] h-[30px] lg:h-[35px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.gender ? 'border border-red-600 bg-red-100' : 'bg-green-100'} 
                                    ${gender === '' ? 'text-gray-500' : 'text-black'}`}>
                                    <option value="" >Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </section>
                        
                        <section className="flex flex-row items-end w-full">
                            <label className="hidden md:block text-[15px] lg:text-[19px] xl:text-[23px] w-[200px] lg:w-[250px] font-semibold font-merriweather text-dGreen ">Mobile No:</label>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex flex-row items-center gap-1">
                                    <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">Mobile No:</label>
                                    <span className="text-red-500 font-semibold block md:hidden text-[8px]"> (Required) </span>
                                    <span className="text-red-500 font-semibold md:block hidden text-[11px]"> Required </span>
                                </div>
                                <input 
                                    type="text"
                                    placeholder="09XXXXXXXX" 
                                    onChange={handleMobileNumber}
                                    value={mobileNumber}
                                    className={`rounded-sm px-1 w-full md:w-[190px] lg:w-[250px] xl:w-[320px] h-[30px] lg:h-[35px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.mobileNumber ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`} 
                                />
                            </div>
                        </section>
                    
                        <section className="flex flex-row items-end  w-full">
                            <label className="hidden md:block text-[15px] lg:text-[19px] xl:text-[23px] w-[200px] lg:w-[250px] font-semibold font-merriweather text-dGreen ">Email:</label>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex flex-row items-center gap-1">
                                    <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">Email:</label>
                                    <span className="text-red-500 font-semibold block md:hidden text-[8px]"> (Required) </span>
                                    <span className="text-red-500 font-semibold md:block hidden text-[11px]"> Required </span>
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="l7B4G@example.com" 
                                    onChange={handleEmail}
                                    value={email}
                                    className={`rounded-sm px-1 w-full md:w-[190px] lg:w-[250px] xl:w-[320px] h-[30px] lg:h-[35px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.email ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`} 
                                />
                            </div>
                    </section>
                    </main>
                ),
            },

            {
                title: (
                    <div>
                        <p className="text-[16px] md:text-2xl text-dGreen font-bold font-merriweather">
                            Section 2: Guardian Details
                        </p>
                    </div>
                ),
                content: (
                    <main className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7 mt-4 px-[10px] md:px-[20px] w-full ">
                        <section className="flex flex-row items-end  w-full">
                            <label className="hidden md:block text-[15px] lg:text-[19px] xl:text-[23px] w-[200px] lg:w-[250px] font-semibold font-merriweather text-dGreen ">Last Name:</label>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex flex-row items-center gap-1">
                                    <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">Last Name:</label>
                                    <span className="text-red-500 font-semibold block md:hidden text-[8px]"> (Required) </span>
                                    <span className="text-red-500 font-semibold md:block hidden text-[11px]"> Required </span>
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="Garcia"
                                    onChange={handleGuardiansLastName}
                                    value={guardiansLastName}
                                    className={`rounded-sm px-1 w-full md:w-[190px] lg:w-[250px] xl:w-[320px] h-[30px] lg:h-[35px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.guardiansLastName ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`} 
                                />
                            </div>
                        </section>

                        <section className="flex flex-row items-end w-full ">
                            <label className="hidden md:block text-[15px] lg:text-[19px] xl:text-[23px] w-[200px] lg:w-[250px] font-semibold font-merriweather text-dGreen ">First Name:</label>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex flex-row items-center gap-1">
                                    <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">First Name:</label>
                                    <span className="text-red-500 font-semibold block md:hidden text-[8px]"> (Required) </span>
                                    <span className="text-red-500 font-semibold md:block hidden text-[11px]"> Required </span>
                                </div>
                                    <input 
                                        type="text" 
                                        placeholder="John" 
                                        onChange={handleGuardiansFirstName}
                                        value={guardiansFirstName}
                                        className={`rounded-sm px-1 w-full md:w-[190px] lg:w-[250px] xl:w-[320px] h-[30px] lg:h-[35px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                        ${errors.guardiansFirstName ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`} 
                                    />
                            </div>
                        </section>

                        <section className="flex flex-row items-end  w-full">
                            <label className="hidden md:block text-[15px] lg:text-[19px] xl:text-[23px] w-[200px] lg:w-[250px] font-semibold font-merriweather text-dGreen "> Middle Name:</label>
                            <div className="flex flex-col gap-1 w-full">
                                <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">Middle Name:</label>
                                <input 
                                    type="text" 
                                    placeholder="Doe"
                                    onChange={handleGuardiansMiddleName}
                                    value={guardiansMiddleName}
                                    className="rounded-sm px-1 w-full md:w-[190px] lg:w-[250px] xl:w-[320px] h-[30px] lg:h-[35px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
                                />
                                </div>
                        </section>

                        <section className="flex flex-row items-end  w-full">
                            <label className="hidden md:block text-[15px] lg:text-[19px] xl:text-[23px] w-[200px] lg:w-[250px] font-semibold font-merriweather text-dGreen "> Suffix:</label>
                            <div className="flex flex-col gap-1 w-full">
                                <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">Suffix:</label>
                                <input 
                                    type="text" 
                                    placeholder="Jr."
                                    onChange={handleGuardiansSuffix}
                                    value={guardiansSuffix}
                                    className="rounded-sm px-1 w-full md:w-[190px] lg:w-[250px] xl:w-[320px] h-[30px] lg:h-[35px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"

                                />
                            </div>
                        </section>
                            
                        <section className="flex flex-row items-end w-full ">
                            <label className="hidden md:block text-[15px] lg:text-[19px] xl:text-[23px] w-[200px] lg:w-[250px]  font-semibold font-merriweather text-dGreen ">Mobile No:</label>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex flex-row items-center gap-1">
                                    <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">Emergency No:</label>
                                    <span className="text-red-500 font-semibold block md:hidden text-[8px]"> (Required) </span>
                                    <span className="text-red-500 font-semibold md:block hidden text-[11px]"> Required </span>
                                </div>
                                    <input 
                                        type="text" 
                                        placeholder="09123456789" 
                                        onChange={handleEmergencyContact}
                                        value={emergencyContact}
                                        className={`rounded-sm px-1 w-full md:w-[190px] lg:w-[250px] xl:w-[320px] h-[30px] lg:h-[35px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                        ${errors.emergencyContact ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`} 
                                    />
                                </div>
                            </section>

                        <section className="flex flex-row items-end w-full ">
                            <label className="hidden md:block text-[15px] lg:text-[19px] xl:text-[23px] w-[200px] lg:w-[250px] font-semibold font-merriweather text-dGreen "> Email:</label>
                            <div className="flex flex-col gap-1 w-full">    
                                <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">Email:</label>
                                <input 
                                    type="text" 
                                    placeholder="sample@gmail.com"
                                    onChange={handleEmergencyEmail}
                                    value={emergencyEmail}
                                    className="rounded-sm px-1 w-full md:w-[190px] lg:w-[250px] xl:w-[320px] h-[30px] lg:h-[35px] bg-green-100 outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition"
                                />
                            </div>
                            </section>
                            
                        <section className="flex flex-row items-end w-full ">
                            <label className="hidden md:block text-[15px] lg:text-[19px] xl:text-[23px] w-[200px] lg:w-[250px] font-semibold font-merriweather text-dGreen ">Full Address:</label>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex flex-row items-center gap-1">
                                    <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">Full Address:</label>
                                    <span className="text-red-500 font-semibold block md:hidden text-[8px]"> (Required) </span>
                                    <span className="text-red-500 font-semibold md:block hidden text-[11px]"> Required </span>
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="123 Main Street, City, Country"
                                    onChange={handleFullAddress}
                                    value={fullAddress}
                                    className={`rounded-sm px-1 w-fullmd:w-[190px] lg:w-[250px] xl:w-[320px] h-[30px] lg:h-[35px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.fullAddress ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`} 
                                />
                            </div>
                        </section>
                    </main>
                    
                ),
            },
            {
                title: (
                    <div>
                        <p className="text-[16px] md:text-2xl text-dGreen font-bold font-merriweather">
                            Section 3: Educational Background
                        </p>
                    </div>
                ),
                content: (
                    <main className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7 mt-4 px-[5px] w-full ">
                        <section className="flex flex-row items-end w-full ">
                            <label className="hidden md:block text-[15px] lg:text-[19px] xl:text-[23px] w-[200px] lg:w-[250px] xl:w-[320px]   font-semibold font-merriweather text-dGreen ">LRN:</label>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex flex-row items-center gap-1">
                                    <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">LRN:</label>
                                    <span className="text-red-500 font-semibold block md:hidden text-[8px]"> (Required) </span>
                                    <span className="text-red-500 font-semibold md:block hidden text-[11px]"> Required </span>
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="123456789102"
                                    onChange={handleLrn}
                                    value={lrn}
                                    className={`rounded-sm px-1 w-full md:w-[190px] lg:w-[250px] xl:w-[320px] h-[30px] lg:h-[35px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.lrn ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`} 
                                />
                                </div>
                            </section>

                        <section className="flex flex-row items-end w-full">
                            <label className="hidden md:block text-[15px] lg:text-[19px] xl:text-[23px] w-[200px] lg:w-[250px] xl:w-[320px] font-semibold font-merriweather text-dGreen ">Grade to Enroll:</label>
                            <div className="flex flex-col gap-1 w-full">
                            <div className="flex flex-row items-center gap-1">
                                <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">Grade to Enroll:</label>
                                <span className="text-red-500 font-semibold block md:hidden text-[8px]"> (Required) </span>
                                <span className="text-red-500 font-semibold md:block hidden text-[11px]"> Required </span>
                            </div>
                                <select 
                                    name="Gender"
                                    onChange={handleGradeLevel}
                                    value={gradeLevel}
                                    className={`rounded-sm px-1 w-full md:w-[190px] lg:w-[250px] xl:w-[320px] h-[30px] lg:h-[35px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.gradeLevel ? 'border border-red-600 bg-red-100' : 'bg-green-100'} 
                                    ${gradeLevel === '' ? 'text-gray-500' : 'text-black'}`}>
                                        <option value="" >Select Grade</option>
                                        <option value="7">Grade 7</option>
                                        <option value="8">grade 8</option>
                                        <option value="9">Grade 9</option>
                                        <option value="10">Grade 10</option>
                                </select>
                            </div>
                        </section>    

                        <section className="flex flex-row items-end w-full">
                            <label className="hidden md:block text-[15px] lg:text-[19px] xl:text-[23px] w-[200px] lg:w-[250px] xl:w-[320px] font-semibold font-merriweather text-dGreen ">Student Type:</label>
                            <div className="flex flex-col gap-1 w-full">
                            <div className="flex flex-row items-center gap-1">
                                <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">StudentType:</label>
                                <span className="text-red-500 font-semibold block md:hidden text-[8px]"> (Required) </span>
                                <span className="text-red-500 font-semibold md:block hidden text-[11px]"> Required </span>
                            </div>
                                <select 
                                    name="Gender"
                                    onChange={handleStudentType}
                                    value={studentType}
                                    className={`rounded-sm px-1 w-full md:w-[190px] lg:w-[250px] xl:w-[320px] h-[30px] lg:h-[35px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.studentType ? 'border border-red-600 bg-red-100' : 'bg-green-100'} 
                                    ${studentType === '' ? 'text-gray-500' : 'text-black'}`}>
                                        <option value="" >Select Option</option>
                                        <option value="New">Incoming G7</option>
                                        <option value="Transferee">Transferee</option>
                                </select>
                            </div>
                        </section>        

                        <section className="flex flex-row items-end w-full ">
                            <label className="hidden md:block text-[15px] lg:text-[19px] xl:text-[23px] w-[200px] lg:w-[250px] xl:w-[320px] font-semibold font-merriweather text-dGreen ">SY Graduated:</label>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex flex-row items-center gap-1">
                                    <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">SY Graduated:</label>
                                    <span className="text-red-500 font-semibold block md:hidden text-[8px]"> (Required) </span>
                                    <span className="text-red-500 font-semibold md:block hidden text-[11px]"> Required </span>
                                </div>
                                <select
                                    name="schoolYear"
                                    onChange={handleSchoolYear}
                                    value={schoolYear}
                                    className={`rounded-sm px-1 w-full md:w-[190px] lg:w-[250px] xl:w-[320px] h-[30px] lg:h-[35px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
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
                        </section>

                        <section className="flex flex-row items-end w-full ">
                            <label className="hidden md:block text-[15px] lg:text-[19px] xl:text-[23px] w-[200px] lg:w-[250px] xl:w-[320px]  font-semibold font-merriweather text-dGreen ">School Type:</label>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex flex-row items-center gap-1">
                                    <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">School Type:</label>
                                    <span className="text-red-500 font-semibold block md:hidden text-[8px]"> (Required) </span>
                                    <span className="text-red-500 font-semibold md:block hidden text-[11px]"> Required </span>
                                </div>
                                <select 
                                    name="Gender"
                                    onChange={handleSchoolType}
                                    value={schoolType}
                                    className={`rounded-sm px-1 w-full md:w-[190px] lg:w-[250px] xl:w-[320px] h-[30px] lg:h-[35px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.schoolType ? 'border border-red-600 bg-red-100' : 'bg-green-100'} 
                                    ${schoolType === '' ? 'text-gray-500' : 'text-black'}`}>
                                        <option value="" >Select School Type</option>
                                        <option value="Private">Private</option>
                                        <option value="Public">Public</option>
                                </select>
                            </div>
                        </section>

                        <section className="flex flex-row items-end w-full ">
                            <label className="hidden md:block text-[15px] lg:text-[19px] xl:text-[23px] w-[200px] lg:w-[250px] xl:w-[320px] font-semibold font-merriweather text-dGreen ">Prev. School:</label>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex flex-row items-center gap-1">
                                    <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">Previous School:</label>
                                    <span className="text-red-500 font-semibold block md:hidden text-[8px]"> (Required) </span>
                                    <span className="text-red-500 font-semibold md:block hidden text-[11px]"> Required </span>
                                </div>
                                    <input 
                                        type="text" 
                                        placeholder="AB Normal Schoool"
                                        onChange= {handleSchoolName} 
                                        value={schoolName}
                                    className={`rounded-sm px-1 w-full md:w-[190px] lg:w-[250px] xl:w-[320px] h-[30px] lg:h-[35px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                        ${errors.schoolName ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`}
                                    />
                                </div>
                            </section>    
                        <section className="flex flex-row items-end w-full  ">
                            <label className="hidden md:block text-[15px] lg:text-[19px] xl:text-[23px] w-[200px] lg:w-[250px] xl:w-[320px] font-semibold font-merriweather text-dGreen ">School Address:</label>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex flex-row items-center gap-1">
                                    <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">School Address:</label>
                                    <span className="text-red-500 font-semibold block md:hidden text-[8px]"> (Required) </span>
                                    <span className="text-red-500 font-semibold md:block hidden text-[11px]"> Required </span>
                                </div>
                                <input 
                                    type="text"
                                    placeholder="123 Street, City, Country"
                                    onChange={handleSchoolAddress}
                                    value={schoolAddress}
                                    className={`rounded-sm px-1 w-full md:w-[190px] lg:w-[250px] xl:w-[320px] h-[30px] lg:h-[35px] outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition
                                    ${errors.schoolAddress ? 'border border-red-600 bg-red-100' : ' bg-green-100'}`}
                                />
                            </div>
                        </section>      
                    </main>
                ),
            },
                    {
                title: (
                    <div>
                        <p className="text-[16px] md:text-2xl text-dGreen font-bold font-merriweather">
                            Section 4: Documents Submission
                        </p>
                    </div>
                ),
                content: (
                    <main className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7 mt-4 px-[5px] w-full ">
                        <section className="flex flex-row gap-3 items-center w-full mx-1">
                            <label className=" hidden md:block  text-[14px] lg:text-[19px] xl:text-[23px] md:w-[120px] lg:w-[140px] xl:w-[200px] font-semibold font-merriweather text-dGreen ">Birth Certificate:</label>
                            <PreviewModal />
                            {birthCert ? (
                            <div 
                                className="flex flex-col gap-1 w-full md:w-[190px] lg:w-[225px] xl:w-[300px]"
                                key="birthcert_preview"
                            >
                                <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">Birth Certificate:</label>
                                <div className="flex flex-row items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => previewImage(birthCert)}
                                        className="w-[180px] lg:w-[225px] xl:w-[300px] h-[30px] mx:h-[40px] border-2 border-dGreen bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition py-1  flex-1 text-left truncate p-"
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
                                className="flex flex-col gap-1 w-full md:w-[190px] lg:w-[225px] xl:w-[300px] "
                                key="birthcert_upload"
                            >
                                <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">Birth Certificate:</label>
                                <input
                                    type="file"
                                    ref={birthCertRef}
                                    accept="image/*"
                                    onChange={handleBirthCertChange}
                                    name="document"
                                    className="w-full md:w-[190px] lg:w-[250px] xl:w-[320px] h-[40px] border bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition py-1"
                                />
                            </div>
                            )}
                            
                        </section>
                        
                        <section className="flex flex-row gap-3 items-center w-full">
                            <label className="hidden md:block text-[14px] lg:text-[19px] xl:text-[23px] md:w-[120px] lg:w-[140px] xl:w-[200px] font-semibold font-merriweather text-dGreen ">Good Moral:</label>

                        {goodMoral ? (
                           <div 
                                className="flex flex-col gap-1 w-full md:w-[190px] lg:w-[225px] xl:w-[300px]"
                                key="goodmoral_preview"
                            >
                                <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">Birth Certificate:</label>
                                <button
                                    type="button"
                                    onClick={() => previewImage(goodMoral)}
                                    className="w-full lg:w-[225px] xl:w-[300px] h-[40px] border-2 border-dGreen bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition py-1  flex-1 text-left truncate p-"
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
                            
                            ) : (
                            <div 
                                className="flex flex-col gap-1 w-full md:w-[190px] lg:w-[225px] xl:w-[300px] "
                                key="goodmoral_upload"
                            >
                                <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">Good Moral:</label>
                                <input
                                    type="file"
                                    ref={goodMoralRef}
                                    accept="image/*"
                                    onChange={handleGoodMoralChange}
                                    name="document"
                                    className="w-full md:w-[190px] lg:w-[250px] xl:w-[320px] h-[40px] border bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition py-1"
                                />
                            </div>
                            )}
                            
                        </section>

                        <section className="flex flex-row gap-3 items-center">
                            <label className=" hidden md:block  text-[14px] lg:text-[19px] xl:text-[23px] md:w-[120px] lg:w-[140px] xl:w-[200px] font-semibold font-merriweather text-dGreen ">Repord Card:</label>

                        {reportCard ? (
                            <div 
                                className="flex flex-col gap-1 w-full md:w-[190px] lg:w-[225px] xl:w-[300px]  "
                                key="reportcard_preview"
                            >
                                <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">Birth Certificate:</label>
                                <div className="flex flex-row items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => previewImage(reportCard)}
                                        className="w-[190px] lg:w-[225px] xl:w-[300px] h-[40px] border-2 border-dGreen bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition py-1  flex-1 text-left truncate p-"
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
                                className="flex flex-col gap-1 w-full md:w-[190px] lg:w-[225px] xl:w-[300px] "
                                key="reportcard_upload"
                            >
                                <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">Report Card:</label>
                                <input
                                    type="file"
                                    ref={reportCardRef}
                                    accept="image/*"
                                    onChange={handleReportCardChange}
                                    name="document"
                                    className="w-full md:w-[190px] lg:w-[250px] xl:w-[320px] h-[40px] border bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition py-1"
                                />
                            </div>
                            )}

                        </section>

                        <section className="flex flex-row gap-3 items-center">
                            <label className=" hidden md:block  text-[14px] lg:text-[19px] xl:text-[23px] md:w-[120px] lg:w-[140px] xl:w-[200px] font-semibold font-merriweather text-dGreen ">Repord Card:</label>

                        {idPic ? (
                            <div 
                                className="flex flex-col gap-1 w-full md:w-[190px] lg:w-[225px] xl:w-[300px]  "
                                key="idpic_preview"
                            >
                                <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen ">ID pic:</label>
                                <div className="flex flex-row items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => previewImage(idPic)}
                                    className="w-[190px] lg:w-[225px] xl:w-[300px] h-[40px] border-2 border-dGreen bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition py-1  flex-1 text-left truncate p-"
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
                                className="flex flex-col gap-1 w-full md:w-[190px] lg:w-[225px] xl:w-[300px] "
                                key="idpic_upload"
                            >
                                <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen "> ID pic:</label>
                                <input
                                    type="file"
                                    ref={idPicRef}
                                    accept="image/*"
                                    onChange={handleIdPIcChange}
                                    name="document"
                                    className="w-full md:w-[190px] lg:w-[250px] xl:w-[320px] h-[40px] border bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition py-1"
                                />
                            </div>
                            )}                        
                        </section>

                        <section className="flex flex-row gap-3 items-end">
                            <label className=" hidden md:block  text-[14px] lg:text-[19px] xl:text-[23px] md:w-[120px] lg:w-[140px] xl:w-[200px] font-semibold font-merriweather text-dGreen ">CAPRISSA:</label>

                        {studentExitForm ? (
                            <div 
                                className="flex flex-col gap-1 w-full md:w-[190px] lg:w-[225px] xl:w-[300px]  "
                                key="idpic_preview"
                            >
                                <label className=" block md:hidden text-[11px] font-semibold font-merriweather text-dGreen "> CAPRISSA: (if private)</label>
                                <div className="flex flex-row items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => previewImage(studentExitForm)}
                                    className="w-[190px] lg:w-[225px] xl:w-[300px] h-[40px] border-2 border-dGreen bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition py-1  flex-1 text-left truncate p-"
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
                                className="flex flex-col justify-center gap-1 w-full md:w-[190px] lg:w-[225px] xl:w-[300px] "
                                key="idpic_upload"
                            >
                                <div className="flex flex-row gap-1">                               
                                    <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen "> CAPRISSA:</label>
                                    <label className=" text-[11px] font-semibold font-merriweather text-dGreen "> (if private)</label>
                                </div>
                                <input
                                    type="file"
                                    ref={studentExitFormRef}
                                    accept="image/*"
                                    onChange={handleStudentExitFormChange}
                                    name="document"
                                    className="w-full md:w-[190px] lg:w-[250px] xl:w-[320px] h-[40px] border bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition py-1"
                                />
                            </div>
                            )}                        
                        </section>

                        <section className="flex flex-row  gap-3 items-end">
                            <label className=" hidden md:block  text-[14px] lg:text-[19px] xl:text-[23px] md:w-[120px] lg:w-[140px] xl:w-[200px] font-semibold font-merriweather text-dGreen ">Form 137:</label>

                        {form137 ? (
                            <div 
                                className="flex flex-col gap-1 w-full md:w-[190px] lg:w-[225px] xl:w-[300px]  "
                                key="idpic_preview"
                            >
                                <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen "> Form 137:</label>
                                <div className="flex flex-row items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => previewImage(form137)}
                                    className="w-[190px] lg:w-[225px] xl:w-[300px] h-[40px] border-2 border-dGreen bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition py-1  flex-1 text-left truncate p-"
                                    title="Click to preview"
                                    >
                                    {form137.name}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                    setStudentExitForm(null);
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
                                className="flex flex-col justify-center gap-1 w-full md:w-[190px] lg:w-[225px] xl:w-[300px] "
                                key="idpic_upload"
                            >
                                <div className="flex flex-row gap-1">                               
                                    <label className="block md:hidden text-[11px] font-semibold font-merriweather text-dGreen "> Form 137:</label>
                                    <label className=" text-[11px] font-semibold font-merriweather text-dGreen "> (if private)</label>
                                </div>
                                <input
                                    type="file"
                                    ref={form137Ref}
                                    accept="image/*"
                                    onChange={handleForm137Change}
                                    name="document"
                                    className="w-full md:w-[190px] lg:w-[250px] xl:w-[320px] h-[40px] border bg-green-100 rounded-sm p-1 outline-none focus:ring-1 focus:ring-dGreen focus:border-dGreen transition py-1"
                                />
                            </div>
                            )}                        
                        </section>

                    </main>
                ),
            },

              {
                title: (
                    <div>
                        <p className="text-[16px] md:text-2xl text-dGreen font-bold font-merriweather">
                            Section 5: Slot Reservation Fee Minimum (₱500)
                        </p>
                    </div>
                    ),
                content: (
                    <main className="w-full flex flex-col gap-5"> 

                        <section className=" md:flex md:grid-cols-2 grid-cols-1 justify-center gap-5 pb-10 w-full">

                            <div className="w-full md:w-1/2 flex flex-col items-center gap-10 mt-5 px-0 xl:px-10" >
                                <p className="text-2xl font-bold text-dGreen font-merriweather text-center"> GCash Payment </p>

                                <Card className="w-full backdrop-blur-md bg-green-200/10 border border-green-300/20 shadow-lg rounded-2xl">
                                    <CardHeader>
                                        <CardTitle className="text-dGreen text-center text-2xl underline font-merriweather font-extrabold">Step 1: Send the reservation fee</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-5">
                                        <section className="flex justify-center gap-2">
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
                                        </section>

                                        <section className="font-regular text-md text-dGreen flex flex-row justify-center gap-3">
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
                                        <CardTitle className="text-dGreen text-center text-2xl underline font-merriweather font-extrabold">Step 2: Upload proof of payment</CardTitle> 
                                    </CardHeader> 
                                    <CardContent className="flex flex-col gap-5"> 
                                        <section className="flex flex-col items-center"> 
                                            <div className="text-start"> 
                                                <p className="font-regular text-lg text-d2Green"> Make sure the <strong className="font-bold text-d2Green">Reference No.</strong> is clearly visible. </p> 
                                            </div> 
                                        </section> 
                                        <section className="font-regular text-md text-dGreen flex flex-row justify-center gap-3"> 
                                            <figure> 
                                                <Image 
                                                    src="/image.png" 
                                                    alt="receipt" 
                                                    width={300} 
                                                    height={200} 
                                                /> 
                                            </figure> 
                                        </section> 
                                    </CardContent> 
                                </Card>
                            </div>

                            <div className=" my-10 md:my-0 bg-green-900 md:h-auto h-[4px] md:w-[2px] w-full" />

                            <div className="w-full md:w-1/2 flex flex-col items-center gap-10 mt-5 px-0 xl:px-10" >
                                <p className="text-2xl font-bold text-dGreen font-merriweather text-center"> Bank Transfer </p>

                                <Card className="w-full backdrop-blur-md bg-green-200/10 border border-green-300/20 shadow-lg rounded-2xl">
                                    <CardHeader>
                                        <CardTitle className="text-dGreen text-center text-2xl underline font-merriweather font-extrabold">Step 1: Send the reservation fee</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-5">
                                        <section className="flex justify-center">
                                            <div className="grid grid-cols-2 gap-y-2 gap-x-[80px] text-dGreen text-lg w-fit">
                                                <p className="font-bold">Bank Name:</p>
                                                <p className="font-semibold">BDO</p>

                                                <p className="font-bold">Account Name:</p>
                                                <p className="font-semibold">John Doe</p>

                                                <p className="font-bold">Account Number:</p>
                                                <p className="font-semibold">1234-5678-9101</p>
                                            </div>
                                        </section>

                                        <section className="font-regular text-md text-dGreen flex flex-row justify-center gap-3">
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
                                        <CardTitle className="text-dGreen text-center text-2xl underline font-merriweather font-extrabold">Step 2: Upload proof of payment</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-5">
                                        <section className="flex flex-col items-center">
                                            <div className="text-start">
                                                <p className="font-regular text-lg text-d2Green">
                                                    Make sure the <strong className="font-bold text-d2Green">Reference No.</strong> is clearly visible.
                                                </p>
                                            </div>
                                        </section>

                                        <section className="font-regular text-md text-dGreen flex flex-row justify-center gap-3">
                                           <figure>
                                                <Image
                                                    src="/bank.svg"
                                                    alt="receipt"
                                                    width={300}
                                                    height={200}
                                                />
                                            </figure>
                                        </section>
                                    </CardContent>
                                </Card>
                            </div>

                        </section>

                        <section className="w-full flex flex-col gap-6 items-center justify-center">
                            <PreviewModal />
                            <Card className="w-full max-w-[700px] backdrop-blur-md bg-green-100/10 border border-green-300/30 shadow-xl rounded-2xl p-6">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-dGreen text-center font-merriweather">
                                    Payment Section
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="flex flex-col gap-6 items-center justify-center">
                                    {/* Amount */}
                                    <div className="flex flex-row gap-4 items-center w-full max-w-[500px]">
                                    <label className="font-semibold font-merriweather text-dGreen text-xl w-[170px]">
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
                                    <div className="flex flex-row gap-4 items-center w-full max-w-[500px]">
                                    <label className="font-semibold font-merriweather text-dGreen text-xl w-[170px]">
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
                                    <div className="flex flex-row gap-4 items-center w-full max-w-[500px]">
                                    <label className="font-semibold font-merriweather text-dGreen text-xl w-[170px]">
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
                        <p className="text-2xl text-dGreen font-bold font-merriweather">
                            Section 6: Additional Information
                        </p>
                    </div>
                ),
                content: (
                    <main className="w-full grid grid-cols-2 gap-5 items-center justify-center">
                        <section className="flex flex-col h-[55px] justify-center">
                            {errors.attainmentUponGraduation === "Required" && (
                                <p className="text-red-500 text-[12px]">
                                    {errors.attainmentUponGraduation}
                                </p>
                            )}   
                            <div className="flex flex-row gap-3 items-center">
                                <label className="font-semibold font-merriweather text-dGreen text-xl w-[280px]">Attaiment upon graduation:</label>
                            <select 
                                name="additionalInformation" 
                                className={`rounded-sm px-1 w-[300px] h-[35px]
                                    ${errors.attainmentUponGraduation ? 'border border-red-600 bg-red-100' : ' bg-gray-200'}`}
                                value={attainmentUponGraduation}
                                onChange={handleAttainmentUponGraduation}
                                >
                                <option value="">Select Option</option>
                                <option value="N/a">N/a</option>
                                <option value="Graduated with Honors">Graduated with Honors</option>
                                <option value="Graduated with High Honor">Graduated with High Honor</option>
                                <option value="Graduated with Highest Honor">Graduated with Highest Honor</option>
                            </select>
                            </div>
                        </section>
                    

                        <section className="flex flex-col h-[55px] justify-center">
                            {errors.consistentGPA === "Required" && (
                                <p className="text-red-500 text-[12px]">
                                    {errors.consistentGPA}
                                </p>
                            )}   
                            <div className="flex flex-row gap-3 items-center">
                                <label className="font-semibold font-merriweather text-dGreen text-xl w-[280px]">Consistent GWA of:</label>
                            <select 
                                name="additionalInformation" 
                                className={`rounded-sm px-1 w-[300px] h-[35px]
                                    ${errors.consistentGPA ? 'border border-red-600 bg-red-100' : ' bg-gray-200'}`}
                                value={consistentGPA}
                                onChange={handleConsistentGPA}
                                >
                                    <option value="">Select Option</option>
                                    <option value="75-80%">75-80%</option>
                                    <option value="81-85%">81-85%</option>
                                    <option value="86-90%">86-90%</option>
                                    <option value="91-95%">91-95%</option>
                                    <option value="96-100%">96-100%</option>
                            </select>
                            </div>
                        </section>
                        <section className="flex flex-col h-[55px] justify-center">
                            {errors.hasEnrolledSibling === "Required" && (
                                <p className="text-red-500 text-[12px]">
                                    {errors.hasEnrolledSibling}
                                </p>
                            )}   
                            <div className="flex flex-row gap-3 items-center">
                                <label className="font-semibold font-merriweather text-dGreen text-xl w-[280px]">Has enrolled sibling:</label>
                            <select 
                                name="additionalInformation" 
                                className={`rounded-sm px-1 w-[300px] h-[35px]
                                    ${errors.hasEnrolledSibling ? 'border border-red-600 bg-red-100' : ' bg-gray-200'}`}
                                value={hasEnrolledSibling}
                                onChange={handleHasEnrolledSibling}
                                >
                                    <option value="">Select Option</option>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                    
                            </select>
                            </div>
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
                <main className="w-full mt-10 flex flex-col items-center justify-center">
                    <section className="bg-white/90 rounded-2xl shadow-xl border border-green-200   w-full grid grid-cols-2 items-center mb-8">
                    <div className="mb-2 flex flex-col items-center px-10 py-10 ">
                        <div className="flex items-center gap-2 mb-2">
                        <svg className="w-7 h-7 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
                        <span className="text-2xl font-bold text-dGreen font-merriweather">Reminder</span>
                        </div>  
                        <ul className="text-left text-d2Green text-lg font-medium space-y-2 pl-2">
                        <li className="flex items-start gap-2"><span className="mt-1">•</span> Ensure that all the information you have provided is correct.</li>
                        <li className="flex items-start gap-2"><span className="mt-1">•</span> You can only <span className="font-semibold text-yellow-700">submit the application once</span>.</li>
                        <li className="flex items-start gap-2"><span className="mt-1">•</span> All documents must be <span className="font-semibold text-blue-700">submitted in person</span>.</li>
                        <li className="flex items-start gap-2"><span className="mt-1">•</span> Check your <span className="font-semibold text-purple-700">email inbox</span> for updates.</li>
                        </ul>
                    </div>

                    <div className="h-full bg-gradient-to-r from-lGreen to-dGreen rounded-r-2xl flex flex-col items-center justify-center px-8 py-10 shadow-md">
                        <div className="flex flex-col items-center gap-2 mb-4">
                        <span className="text-3xl font-bold text-white font-merriweather drop-shadow">Congratulations!</span>
                        </div>
                        <p className="text-white text-2xl font-semibold mb-2 text-center tracking-wide">Your application is almost complete!</p>
                        <p className="text-white text-base text-center opacity-80">Thank you for choosing Rizal Institute. We look forward to seeing you thrive and grow with us!</p>
                    </div>
                    </section>

                    <Button
                    variant="mainButton"
                    onClick={handleAdd}
                    disabled={isSubmitting}
                    className="w-[180px] h-[50px] text-xl rounded-xl bg-gradient-to-r from-lGreen to-dGreen text-white font-bold shadow-lg hover:scale-105 hover:from-green-400 hover:to-green-700 transition-all duration-200 disabled:opacity-60"
                    >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </main>
                ),
            },

        ];

        return (
            <main className="min-h-[600px] w-full mt-2 p-5 flex flex-col">
                <div className="h-full w-full ">
                    <section className="w-full text-center">
                        <p className="mt-[20px] text-2xl md:text-3xl lg:text-4xl text-dGreen font-bold font-merriweather">
                            Junior High School Application
                        </p>
                    </section>

                    {/* content */}
                    <div className="w-full flex-1 mt-[40px] md:mt-[60px] lg:mt-[80px] px-[5px] md:px-[25px] lg:px-[70px] flex flex-col gap-3 ">
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
