"use client";
import { Button } from "@/components/ui/button";

import { ChangeEvent, FC, useState } from "react";
import { toast } from "sonner";

import { useRef } from "react";
import Image from "next/image";

interface Props {
    enrollmentAdd: (
        lrn: string, 
        studentsLastName:string, 
        studentsFirstName: string, 
        studentsMiddleName: string, 
        studentsSuffix: string, 
        dateOfBirth: Date, 
        age: number, 
        gender: string, 
        civilStatus: string, 
        Nationality: string,
        religion: string,
    
        guardiansLastName: string,
        guardiansFirstName: string,
        guardiansMiddleName: string,
        guardiansSuffix: string,
        fullAddress: string,
        mobileNumber: string,
        email: string,
    
        admissionStatus: string,
        prevSchool: string,
        schoolAddress: string,
        schoolType: string,
        gradeLevel: string,
        schoolYear: string,

        birthCert: string,
        reportCard: string,
        goodMoral: string,
        idPic: string,
        studentExitForm: string,

        mop: string,
        receipt: string
    ) => void;
  }

const EnrollmentPage: FC<Props> = ({ enrollmentAdd }) => {
    
    // State for handling input value
    const [lrn, setLrn] = useState("");
    const [studentsLastName, setStudentsLastName] = useState("");
    const [studentsFirstName, setStudentsFirstName] = useState("");
    const [studentsMiddleName, setStudentsMiddleName] = useState("");
    const [studentsSuffix, setStudentsSuffix] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [civilStatus, setCivilStatus] = useState("");
    const [nationality, setNationality] = useState("");
    const [religion, setReligion] = useState("");

    const [guardiansLastName, setGuardiansLastName] = useState("");
    const [guardiansFirstName, setGuardiansFirstName] = useState("");
    const [guardiansMiddleName, setGuardiansMiddleName] = useState("");
    const [guardiansSuffix, setGuardiansSuffix] = useState("");
    const [fullAddress, setFullAddress] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");

    const [admissionStatus, setAdmissionStatus] = useState("");
    const [prevSchool, setPrevSchool] = useState("");
    const [schoolAddress, setSchoolAddress] = useState("");
    const [schoolType, setSchoolType] = useState("");
    const [gradeLevel, setGradeLevel] = useState("");
    const [schoolYear, setSchoolYear] = useState("");

    const [birthCert, setBirthCert] =  useState<File | null>(null);
    const [reportCard, setReportCard] = useState<File | null>(null);
    const [goodMoral, setGoodMoral] = useState<File | null>(null);
    const [idPic, setIdPic] = useState<File | null>(null);
    const [studentExitForm, setStudentExitForm] = useState<File | null>(null);

    const [mop, setMop] = useState("");
    const [receipt, setReceipt] = useState<File | null>(null);

    const [isBankTransferSelected, setIsBankTransferSelected] = useState(false);
    const [isGcashSelected, setIsGcashSelected] = useState(false);

    const [trackingId, setTrackingId] = useState<string | null>(null);
    const [applicationStatus, setApplicationStatus] = useState<string | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);



    // Event handler for input change
    const handleLrnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLrn(e.target.value);
    };
    const handleStudentsLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStudentsLastName(e.target.value);
    };
    const handleStudentsFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStudentsFirstName(e.target.value);
    };
    const handleStudentsMiddleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStudentsMiddleName(e.target.value);
    };
    const handleStudentsSuffixChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStudentsSuffix(e.target.value);
    };
    // const handleDateOfBirthChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setDateOfBirth(e.target.value);
    // };
    // const handleAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setAge(e.target.value);
    // };

    const handleDateOfBirthChange = (e: ChangeEvent<HTMLInputElement>) => {
        const dateOfBirth = new Date(e.target.value);
        const age = calculateAge(dateOfBirth);
        setDateOfBirth(e.target.value);
        setAge(age.toString());
      };

    const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setGender(e.target.value);
    };
    const handleCivilStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setCivilStatus(e.target.value);
    };
    const handleNationalityChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNationality(e.target.value);
    };
    const handleReligionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setReligion(e.target.value);
    };


    const handleGuardiansLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGuardiansLastName(e.target.value);
    };
    const handleGuardiansFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGuardiansFirstName(e.target.value);
    };
    const handleGuardiansMiddleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGuardiansMiddleName(e.target.value);
    };
    const handleGuardiansSuffixChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGuardiansSuffix(e.target.value);
    };
    const handleFullAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFullAddress(e.target.value);
    };
    const handleMobileNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMobileNumber(e.target.value);
    };
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };


    const handleAdmissionStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setAdmissionStatus(e.target.value);
    };
    const handlePrevSchoolChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPrevSchool(e.target.value);
    };
    const handleSchoolAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSchoolAddress(e.target.value);
    };
    const handleSchoolTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSchoolType(e.target.value);
    };
    const handleGradeLevelChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setGradeLevel(e.target.value);
    };
    const handleSchoolYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSchoolYear(e.target.value);
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



    // const handleMopChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setMop(e.target.value);
    // };

    const handleMopChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMop(e.target.value);
        setIsGcashSelected(e.target.value === "GCash");
        setIsBankTransferSelected(e.target.value === "Bank Transfer");
    };

    const handleReceiptChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setReceipt(file);
        }
    };






     // Refs for input elements
     const birthCertRef = useRef<HTMLInputElement>(null);
     const reportCardRef = useRef<HTMLInputElement>(null);
     const goodMoralRef = useRef<HTMLInputElement>(null);
     const idPicRef = useRef<HTMLInputElement>(null);
     const studentExitFormRef = useRef<HTMLInputElement>(null);

     const gcashReceiptRef = useRef<HTMLInputElement>(null);
    const bankTransferReceiptRef = useRef<HTMLInputElement>(null);
        
    
     
    // const handleFileChange = (
    //     e: ChangeEvent<HTMLInputElement>,
    //     setFile: React.Dispatch<React.SetStateAction<File | null>>
    // ) => {
    //     const file = e.target.files?.[0] || null;
    //     setFile(file);
    // };


    // functions for validation below
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

    const calculateAge = (dateOfBirth: Date) => {
        const today = new Date();
        const age = today.getFullYear() - dateOfBirth.getFullYear();
        return age;
      };
    

    function validateEmail( email:string ) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
     }


    const years = Array.from({ length: 4 }, (_, i) => new Date().getFullYear() - i - 1);

  // Event handler for adding a new todo
  const handleAdd = async () => {
    setIsSubmitting(true);

    
    try {
    //validation of empty inputs
    if  (
        !lrn || !studentsLastName || !studentsFirstName ||!studentsMiddleName ||  !dateOfBirth ||!age ||!gender || !civilStatus || !nationality || !religion ||
        !guardiansLastName || !guardiansFirstName ||   !guardiansMiddleName ||   !fullAddress ||   !mobileNumber ||  !email ||
        !admissionStatus || !prevSchool || !schoolAddress ||  !schoolType ||  !gradeLevel ||  !schoolYear 
    ){
        toast.error("Please fill out all required fields.");
        return;
    }

    //validation of empty documents
    if  (
        !birthCert
    ){
        toast.error("Please upload atleast the birth certificate.");
        return;
    }

     //validation for payment receipts
     if  (
        !receipt
    ){
        toast.error("Please upload a receipt of payment.");
        return;
    }


       
    //validation for section 1

     // validate students lastname
     if (!/^[a-zA-Z\s'-]+$/.test(studentsLastName) ||  studentsLastName.length < 2 ||  studentsLastName.length > 50
      ) {
        toast.error("Invalid student's last name. Please enter a valid last name (2-50 characters).");
        return;
      }
    // validate students firstname
    if (!/^[a-zA-Z\s'-]+$/.test(studentsFirstName) || studentsFirstName.length < 2 || studentsFirstName.length > 50) {
        toast.error("Invalid students Firstname format. Please enter a valid Firstname.");
        return;
    }

    // validate students middlename
    if (!/^[a-zA-Z\s'-]+$/.test(studentsMiddleName) || studentsMiddleName.length < 2 || studentsMiddleName.length > 50) {
        toast.error("Invalid students Middlename format. Please enter a valid Middlename.");
        return;
    }

    // validate students suffix
    if (studentsSuffix && (!/^[a-zA-Z\s'-]+$/.test(studentsSuffix) || studentsSuffix.length < 1 || studentsSuffix.length > 10)) {
        toast.error("Invalid students Suffix format. Please enter a valid Suffix.");
        return;
    }
    
    if (!validateNotInFuture(new Date(dateOfBirth))) {
        toast.error("Date of birth cannot be in the future.");
        return;
    }   

    // validate the date of birth
    if(!validateMinDate(new Date(dateOfBirth))){
        toast.error("The minimum threshold for age is 6 years.");
        return;
    }


    //validation for section 2
     // validate students guardians lastname
     if (!/^[a-zA-Z\s'-]+$/.test(guardiansLastName) || guardiansLastName.length < 2 || guardiansLastName.length > 50 ) {
        toast.error("Invalid parent/guardians Lastname format. Please enter a valid Lastname.");
        return;
    }

    // validate guardians firstname
    if (!/^[a-zA-Z\s'-]+$/.test(guardiansFirstName) || guardiansFirstName.length < 2 || guardiansFirstName.length > 50) {
        toast.error("Invalid parent/guardians Firstname format. Please enter a valid Firstname.");
        return;
    }

    // validate guardians middlename
    if (!/^[a-zA-Z\s'-]+$/.test(guardiansMiddleName) || guardiansMiddleName.length < 2 || guardiansMiddleName.length > 50) {
        toast.error("Invalid parent/guardians Middlename format. Please enter a valid Middlename.");
        return;
    }

    // validate guardians suffix
    if (guardiansSuffix && (!/^[a-zA-Z\s'-]+$/.test(guardiansSuffix) || guardiansSuffix.length < 1 || guardiansSuffix.length > 10)) {
        toast.error("Invalid parent/guardians Suffix format. Please enter a valid Suffix.");
        return;
    }

    if (fullAddress.length < 5 || fullAddress.length > 200) {
        toast.error("Invalid address format. Please enter a valid address.");
        return;
    }


    if (!/^(09)\d{9}$/.test(mobileNumber)) {
        toast.error("Invalid mobile number format. Please enter a valid mobile number.");
        return;
    }

    if (!validateEmail(email)) {
        toast.error("Invalid email format. Please enter a valid email.");
        return;
    }


    //validation for section 3

    if (prevSchool.length < 5 || fullAddress.length > 200) {
        toast.error("Please enter a valid school name.");
        return;
    }

    // if (schoolAddress.length > 10) {
    //     toast.error("Invalid address format. Please enter a valid address.");
    //     return;
    // }
    // validate LRN
    const isLRNValid =  /^\d{12}$/;
    if (!isLRNValid.test(lrn)) {
        toast.error("Invalid LRN format. Please enter a valid 12-digit LRN.");
        return;
    }


    // function for uploading image to the cloudinary
    // const uploadImage = async (file: File) => {
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     formData.append('upload_preset', 'documents');
      
    //     const response = await fetch('https://api.cloudinary.com/v1_1/dkfn4xy6q/image/upload', {
    //       method: 'POST',
    //       body: formData,
    //     });
      
    //     const data = await response.json();
    //     return data.secure_url; // Returns the image URL from Cloudinary
    //   };
    
    //   const uploadBirthCert = birthCert ? await uploadImage(birthCert) : "";
    //   const uploadReportCard = reportCard ? await uploadImage(reportCard) : "";
    //   const uploadGoodMoral = goodMoral ? await uploadImage(goodMoral) : "";
    //   const uploadIdPic = idPic ? await uploadImage(idPic) : "";
    //   const uploadStudentExitForm = studentExitForm ? await uploadImage(studentExitForm) : "";
    //   const uploadReceipt= receipt ? await uploadImage(receipt) : "";

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
        
        const uploadReceipt = receipt ? await uploadImage(receipt, 'payments') : ""; 


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


      
    enrollmentAdd(
        lrn,
        studentsLastName,
        studentsFirstName,
        studentsMiddleName,
        studentsSuffix,
        new Date(dateOfBirth),
        Number(age),
        gender,
        civilStatus,
        nationality,
        religion,

        guardiansLastName,
        guardiansFirstName,
        guardiansMiddleName,
        guardiansSuffix,
        fullAddress,
        mobileNumber,
        email,

        admissionStatus,
        prevSchool,
        schoolAddress,
        schoolType,
        gradeLevel,
        schoolYear,

       uploadBirthCert,
       uploadReportCard,
       uploadGoodMoral,
       uploadIdPic,
       uploadStudentExitForm,

       mop,
       uploadReceipt
    );

    setLrn("");
    setStudentsLastName("");
    setStudentsFirstName("");
    setStudentsMiddleName("");
    setStudentsSuffix("");
    setDateOfBirth("");
    setAge("");
    setGender("");
    setCivilStatus("");
    setReligion("");

    setGuardiansLastName("");
    setGuardiansFirstName("");
    setGuardiansMiddleName("");
    setGuardiansSuffix("");
    setFullAddress("");
    setMobileNumber("");
    setEmail("");

    setAdmissionStatus("");
    setPrevSchool("");
    setSchoolAddress("");
    setSchoolType("");
    setGradeLevel("");
    setSchoolYear(""); 

    setBirthCert(null);
    setReportCard(null);
    setGoodMoral(null);
    setIdPic(null);
    setStudentExitForm(null);

    setMop("");
    setReceipt(null);

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
    setIsSubmitting(false); // Ensure the button is re-enabled at the end
    }
};



    return (
        <div className="flex flex-col mx-[60px] my-5">
            {/* first section */}
            <div className="flex flex-col py-10 gap-10">
                <p className="font-bold font-merriweather text-4xl text-center text-lGreen">High School Admission Application</p>
                <div className="h-[80px] w-[250px] rounded-lg bg-slGreen">
                    <p className="font-extralight font-oswald text-lg text-center text-red-500 p-2">
                    *Please ensure all fields are correctly filled before submitting
                    </p>
                </div>
              
            </div>
            {/* end of first section */}

            {/* second section */}
            <div className="flex flex-col gap-2 mb-10">
                <p className="font-bold font-merriweather text-2xl text-lGreen">
                    Section 1: Personal Information
                </p>
                <hr className="border-2 border-solid border-dGreen w-full" />
                {/* first row */}
                <div className="w-full h-[40px] flex items-center gap-5">
                    <label htmlFor="Name" className="font-medium font-oswald text-xl text-lGreen">Full Name:</label>
                    <input 
                        type="firstName" 
                        placeholder="First Name" 
                        className="w-[250px] h-[35px] rounded-lg px-2 bg-gray-300/50"
                        onChange={handleStudentsFirstNameChange}
                        value={studentsFirstName} 
                        />
                    <input 
                        type="middleName" 
                        placeholder="Middle Name" 
                        className="w-[250px] h-[35px] rounded-lg px-2 bg-gray-300/50"
                        onChange={handleStudentsMiddleNameChange}
                        value={studentsMiddleName} 
                        />
                    <input 
                        type="LastName" 
                        placeholder="Last Name" 
                        className="w-[250px] h-[35px] rounded-lg px-2 bg-gray-300/50"
                        onChange={handleStudentsLastNameChange}
                        value={studentsLastName} 
                        />
                    <input 
                        type="Suffix" 
                        placeholder="Suffix" 
                        className="w-[100px] h-[35px] rounded-lg px-2 bg-gray-300/50 "
                        onChange={handleStudentsSuffixChange}
                        value={studentsSuffix} 
                        />
                </div>
               
               {/* second row */}
                <div className="w-full h-[40px] flex flex-row items-center gap-10">
                    <div className="flex flex-row gap-2">
                    <label htmlFor="DateOfBirth" className="font-medium font-oswald text-xl text-lGreen ">Date of Birth:</label>
                    <input 
                        type="date" 
                        name="DateOfBirth" 
                        className="w-[250px] h-[35px] rounded-lg px-2 bg-gray-300/50 text-gray-400"
                        onChange={handleDateOfBirthChange}
                        value={dateOfBirth}   
                    />
                    </div>

                    <div className="flex flex-row gap-2">
                    <label htmlFor="Age" className="font-medium font-oswald text-xl text-lGreen">Age:</label>
                    <input 
                        type="input" 
                        placeholder="Age" 
                        className="w-[250px] h-[35px] rounded-lg px-2 bg-gray-300/50" 
                        value={age} 
                        readOnly
                        />
                    </div>

                    <div className="flex flex-row gap-5">
                        <label htmlFor="Gender" className="font-medium font-oswald text-xl text-lGreen">Gender:</label>
                        <select 
                           className={`bg-gray-300/50 h-[36px] w-[200px] rounded-lg font-sans ${
                            !gender ? "text-gray-400" : "text-black"
                            }`}
                            onChange={handleGenderChange}
                            value={gender} 
                        >
                            <option value="">Gender</option>
                            <option className="text-black" value="Male">Male</option>
                            <option className="text-black" value="Female">Female</option>
                        </select>
                    </div>
                </div>

                {/* third row */}
                <div className="w-full h-[40px] flex flex-row items-center gap-10">
                    <div className="flex flex-row gap-5">
                        <label htmlFor="Civil Status" className="font-medium font-oswald text-xl text-lGreen">Civil Status:</label>
                        <select 
                           className={`bg-gray-300/50 h-[36px] w-[200px] rounded-lg font-sans ${
                            !civilStatus ? "text-gray-400" : "text-black"
                            }`}
                            onChange={handleCivilStatusChange}
                            value={civilStatus} 
                        >
                            <option className="text-gray-300" value="">Civil Status</option>
                            <option className="text-black" value="Single">Single</option>
                            <option className="text-black" value="Married">Married</option>    
                        </select>
                    </div>

                    <div className="flex flex-row gap-2">
                    <label htmlFor="Nationality" className="font-medium font-oswald text-xl text-lGreen">Nationality:</label>
                    <input 
                        type="text" 
                        placeholder="FIlipino" 
                        className="w-[250px] h-[35px] rounded-lg px-2 bg-gray-300/50 " 
                        onChange={handleNationalityChange}
                        value={nationality} 
                        />
                    </div>

                    <div className="flex flex-row gap-2">
                    <label htmlFor="Religion" className="font-medium font-oswald text-xl text-lGreen">Religion:</label>
                    <input 
                        type="text" 
                        placeholder="Catholic" 
                        className="w-[250px] h-[35px] rounded-lg px-2 bg-gray-300/50" 
                        onChange={handleReligionChange}
                        value={religion} 
                        />
                    </div>
                </div>
            </div>


            {/* third section */}
            <div className="flex flex-col gap-2 mb-10">
                <p className="font-bold font-merriweather text-2xl text-lGreen">
                 Section 2: Contact & Guardian Details
                </p>
                <hr className="border-2 border-solid border-dGreen w-full" />
                {/* first row */}
                <div className="w-full h-[40px] flex items-center gap-5">
                    <label htmlFor="adress" className="font-medium font-oswald text-xl text-lGreen">Full Address:</label>
                    <input 
                        type="text" 
                        placeholder="123 Main St, City, Country" 
                        className="w-[600px] h-[35px] rounded-lg px-2 bg-gray-300/50" 
                        onChange={handleFullAddressChange}
                        value={fullAddress} 
                        />
                </div>
               
               {/* second row */}
                <div className="w-full h-[40px] flex flex-row items-center gap-10">
                    <div className="flex flex-row gap-2">
                    <label htmlFor="mobile" className="font-medium font-oswald text-xl text-lGreen">Mobile Number:</label>
                    <input 
                        type="text" 
                        placeholder="09123456789" 
                        className="w-[250px] h-[35px] rounded-lg px-2 bg-gray-300/50 " 
                        onChange={handleMobileNumberChange}
                        value={mobileNumber} 
                         />
                    </div>

                    <div className="flex flex-row gap-2">
                    <label htmlFor="email" className="font-medium font-oswald text-xl text-lGreen">Email Address:</label>
                    <input 
                        type="text"
                        placeholder="sample@gmail.com" 
                        className="w-[250px] h-[35px] rounded-lg px-2 bg-gray-300/50 " 
                        onChange={handleEmailChange}
                        value={email} 
                        />
                    </div>

                </div>

                {/* third row */}
                <div className="w-full h-[40px] flex flex-row items-center gap-10">
                    <div className="w-full h-[40px] flex items-center gap-5">
                        <label htmlFor="Name" className="font-medium font-oswald text-xl text-lGreen">Parent/Guardian&apos;s Name:</label>
                        <input 
                            type="firstName" 
                            placeholder="First Name" 
                            className="w-[250px] h-[35px] rounded-lg px-2 bg-gray-300/50" 
                            onChange={handleGuardiansFirstNameChange}
                            value={guardiansFirstName} 
                            />
                        <input 
                        type="middleName" 
                        placeholder="Middle Name" 
                        className="w-[250px] h-[35px] rounded-lg px-2 bg-gray-300/50" 
                        onChange={handleGuardiansMiddleNameChange}
                        value={guardiansMiddleName} 
                        />
                        <input 
                            type="LastName" 
                            placeholder="Last Name" 
                            className="w-[250px] h-[35px] rounded-lg px-2 bg-gray-300/50 "
                            onChange={handleGuardiansLastNameChange}
                            value={guardiansLastName} 
                            />
                        <input 
                            type="Suffix" 
                            placeholder="Suffix" 
                            className="w-[100px] h-[35px] rounded-lg px-2 bg-gray-300/50 "
                            onChange={handleGuardiansSuffixChange}
                            value={guardiansSuffix} 
                            />
                    </div>
                </div>
            </div>

           {/* fourth section */}
           <div className="flex flex-col gap-5 mb-10">
                <p className="font-bold font-merriweather text-2xl text-lGreen">
                Section 3: Educational Background
                </p>
                <hr className="border-2 border-solid border-dGreen w-full" />

                <div className="flex flex-row gap-5">
                    <label htmlFor="school" className="font-medium font-oswald text-xl text-lGreen">Student Admission Status:</label>
                    <div className="h-[36px] w-[200px] bg-gray-300/50 flex items-center justify-center rounded-lg">
                        <select 
                            className={`bg-gray-300/50 h-[36px] w-[200px] rounded-lg font-sans ${
                                !admissionStatus ? "text-gray-400" : "text-black"
                                }`}
                            onChange={handleAdmissionStatusChange}
                            value={admissionStatus} 
                            >
                            <option className="text-gray-300" value="">Status</option>
                            <option className="text-black" value="Freshment">Freshmen</option>
                            <option className="text-black" value="Transferee">Transferee</option>
                        </select>
                    </div>
                </div>

                {/* first row */}
                <div className="w-full h-[40px] flex items-center gap-5">
                    <label htmlFor="school" className="font-medium font-oswald text-xl text-lGreen">Previous School:</label>
                    <input 
                        type="input" 
                        placeholder="AB Normal Elementary School" 
                        className="w-[600px] h-[35px] rounded-lg px-2 bg-gray-300/50"
                        onChange={handlePrevSchoolChange}
                        value={prevSchool}  
                        />
                </div>
               
               {/* second row */}
                <div className="w-full h-[40px] flex items-center gap-5">
                    <label htmlFor="address" className="font-medium font-oswald text-xl text-lGreen">School Address:</label>
                    <input 
                        type="text" 
                        placeholder="123 Main St, City, Country" 
                        className="w-[600px] h-[35px] rounded-lg px-2 bg-gray-300/50" 
                        onChange={handleSchoolAddressChange}
                        value={schoolAddress} 
                        />
                </div>

                {/* third row */}
                <div className="w-full h-[40px] flex flex-row items-center gap-10">
                    
                    <div className="flex flex-row gap-5">
                        <label htmlFor="LRN" className="font-medium font-oswald text-xl text-lGreen"> LRN: </label>
                        <input 
                            type="text" 
                            placeholder="123456789" 
                            className="w-[200px] h-[35px] rounded-lg px-2 bg-gray-300/50"
                            onChange={handleLrnChange}
                            value={lrn} />
                    </div>
                    <div className="flex flex-row gap-5">
                    <label htmlFor="Gender" className="font-medium font-oswald text-xl text-lGreen">School Type:</label>
                        <select 
                            className={`bg-gray-300/50 h-[36px] w-[200px] rounded-lg font-sans ${
                                !schoolType ? "text-gray-400" : "text-black"
                                }`}
                            onChange={handleSchoolTypeChange}
                            value={schoolType} 
                            >
                            <option className="text-gray-300" value="">School Type</option>
                            <option className="text-black" value="Public">Public</option>
                            <option className="text-black" value="Private">Private</option>
                        </select>
                    </div>

                    <div className="flex flex-row gap-5">
                        <label htmlFor="Gender" className="font-medium font-oswald text-xl text-lGreen">Last Grade Level Completed:</label>
                        <select 
                            className={`bg-gray-300/50 h-[36px] w-[200px] rounded-lg font-sans ${
                                !gradeLevel ? "text-gray-400" : "text-black"
                                }`}
                            onChange={handleGradeLevelChange}
                            value={gradeLevel} 
                            >
                            <option className="text-gray-300" value="">Grade</option>
                            <option className="text-black" value="Grade7">Grade 7</option>
                            <option className="text-black" value="Grade8">Grade 8</option>
                            <option className="text-black" value="Grade9">Grade 9</option>
                            <option className="text-black" value="Grade9">Grade 10</option>
                        </select>
                        <select
                            className={`bg-gray-300/50 h-[36px] w-[200px] rounded-lg font-sans ${
                                !schoolYear ? "text-gray-400" : "text-black"
                            }`}
                            onChange={handleSchoolYearChange}
                            value={schoolYear}
                            >
                                <option className="text-gray-300" value="">
                                    Year
                                </option>
                                {years.map((year) => (
                                    <option key={year} className="text-black" value={`${year}-${year + 1}`}>
                                    {year}-{year + 1}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* fifth section */}
            <div className="flex flex-col gap-2 mb-10">
                <p className="font-bold font-merriweather text-2xl text-lGreen">
                Section 4: Required Documents Upload
                </p>
                <hr className="border-2 border-solid border-dGreen w-full mb-7" />

                <div className="flex flex-row gap-[200px]">
                    {/* left side */}
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-row gap-10">
                            <label htmlFor="document" className="font-medium font-oswald text-xl text-lGreen w-[190px] ">PSA Birth Certificate</label>
                            <input 
                            type="file" 
                            ref={birthCertRef}
                            name="document"  
                            className="px-4 py-1 bg-gray-300/50 h-[36px] w-[250px] rounded-lg" 
                            onChange={handleBirthCertChange}
                            accept="image/*"
                            />
                        </div>
                        <div className="flex flex-row gap-10">
                            <label htmlFor="document" className="font-medium font-oswald text-xl text-lGreen  w-[190px]"> REPORT CARD</label>
                            <input 
                            type="file" 
                            ref={reportCardRef}
                            name="document"  
                            className="px-4 py-1 bg-gray-300/50 h-[36px] w-[250px] rounded-lg" 
                            onChange={handleReportCardChange}
                            accept="image/*"
                            />
                        </div>

                        <div>
                            <p>if private</p>
                            <div className="flex flex-row gap-10">
                            <label htmlFor="document" className="font-medium font-oswald text-xl text-lGreen  w-[190px]"> CACPRISAA Student Exit Clearance</label>
                            <input 
                            type="file" 
                            name="document"  
                            ref={studentExitFormRef}
                            className="px-4 py-1 bg-gray-300/50 h-[36px] w-[250px] rounded-lg" 
                            onChange={handleStudentExitFormChange}
                            accept="image/*"
                            />
                        </div>

                        </div>
                    </div>

                    {/* right side */}
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-row gap-10">
                            <label htmlFor="document" className="font-medium font-oswald text-xl text-lGreen  w-[190px]"> Good Moral Certificate</label>
                            <input 
                            type="file" 
                            ref={goodMoralRef}
                            name="document"  className="px-4 py-1 bg-gray-300/50 h-[36px] w-[250px] rounded-lg"
                            onChange={handleGoodMoralChange}
                            accept="image/*"
                            />
                        </div>
                        <div className="flex flex-row gap-10">
                            <label htmlFor="document" className="font-medium font-oswald text-xl text-lGreen  w-[190px]"> 2x2 ID picture</label>
                            <input 
                            type="file" 
                            ref={idPicRef}
                            name="document"  
                            className="px-4 py-1 bg-gray-300/50 h-[36px] w-[250px] rounded-lg" 
                            onChange={handleIdPIcChange}
                            accept="image/*"
                            />
                        </div>
                    </div>
                </div>
            </div>


            {/* sixth section*/}
            <div className="flex flex-col gap-2 mb-10">
                <p className="font-bold font-merriweather text-2xl text-lGreen">
                Section 5: Payment & Slot Reservation (₱500)
                </p>
                <hr className="border-2 border-solid border-dGreen w-full mb-7" />

                <div className="flex flex-row justify-center">
                    <div className="w-[600px] h-[1050px] flex flex-col text-center items-center py-5 gap-10">
                        <p className="font-bold font-merriweather text-2xl text-lGreen bg-green-400/30  w-full py-3" >GCASH PAYMENT</p>

                        <div className="flex flex-col gap-7 items-center">
                            <div className="bg-yellow h-[45px] w-[125px] rounded-lg items-center justify-center flex font-bold font-oswald text-2xl text-lGreen">
                                STEP 1
                            </div>
                            <div className="w-[530px] h-[150px] bg-green-400/30 rounded-md flex flex-col py-5">
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
                                <div className="mt-10 font-regular text-md text-dGreen flex flex-row justify-center gap-3">
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
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-7 mt-5 items-center">
                            <div className="bg-yellow h-[45px] w-[125px] rounded-lg items-center justify-center flex font-bold font-oswald text-2xl text-lGreen">
                                STEP 2
                            </div>
                            <div className="w-[530px] h-[500px] bg-green-400/30  rounded-md flex flex-col items-center gap-10  py-5">
                                <div>
                                    <p className="font-regular text-lg text-d2Green">
                                    Uplad the screenshot of the reciept.
                                    </p>
                                    <div className="flex flex-row gap-2">
                                    <p className="font-regular text-lg -mt-1 text-d2Green">
                                    Make sure the
                                    </p>
                                    <p className="font-bold text-lg -mt-1 text-d2Green">
                                    Reference No.
                                    </p>
                                    <p className="font-regular text-lg -mt-1 text-d2Green">
                                    is included.
                                    </p>
                                    </div>
                                </div>
                                <div>
                                    <Image
                                        src="/image.png"
                                        alt="receipt"
                                        width={300}
                                        height={200}
                                    />
                                </div>
                                <div>
                                    <div className="flex flex-row gap-5">
                                        <label htmlFor="mop" className="font-bold text-lg text-d2Green">Payment Method: </label>
                                        <div className="flex flex-row gap-3">
                                            <input 
                                                type="radio" 
                                                id="mop"
                                                name="mop" 
                                                value="GCash"
                                                onChange={handleMopChange}
                                                
                                            />
                                            <label htmlFor="mop" className="font-regular text-lg text-d2Green"> 
                                                Gcash Payment
                                            </label>
                                        </div>                                         
                                    </div>  

                                    <div className="flex flex-row gap-3 items-center justify-center mt-2">
                                        <label htmlFor="document" className="font-medium font-oswald text-xl text-d2Green "> GCash Receipt:</label>
                                        <input 
                                        type="file" 
                                        ref={gcashReceiptRef}
                                        name="document"  
                                        className="px-4 py-1 bg-gray-300/50 h-[36px] w-[250px] rounded-lg"
                                        disabled={!isGcashSelected}
                                        onChange={handleReceiptChange}
                                        accept="image/*"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                    <div className="w-1 h-[1100px] bg-lGreen mx-[70px]" />





                    <div className="w-[600px] h-[930px]  flex flex-col text-center items-center py-5 gap-10"> 
                        <p className="font-bold font-merriweather text-2xl text-lGreen bg-green-400/30  w-full py-3" >BANK TRANSFER</p>

                        <div className="flex flex-col gap-7 items-center">
                            <div className="bg-yellow h-[45px] w-[125px] rounded-lg items-center justify-center flex font-bold font-oswald text-2xl text-lGreen">
                                STEP 1
                            </div>
                            <div className="w-[530px] h-[260px] bg-green-400/30 rounded-md flex flex-col text-start py-5 gap-10">
                                <p className="font-bold text-lg text-dGreen text-center ">
                                    Send the 500.00 reservation fee
                                </p>

                                <div className="flex flex-row justify-center ">
                                    <div className="flex flex-row gap-5">
                                        <div>
                                            <p className="font-bold text-lg text-dGreen  bg-yellow-300">
                                                Bank Name:
                                            </p>
                                            <p className="font-bold text-lg text-dGreen  bg-yellow-300">
                                                Account Name:
                                            </p>
                                            <p className="font-bold text-lg text-dGreen  bg-yellow-300">
                                                Account Number:
                                            </p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-lg text-dGreen">
                                                BDO
                                            </p>
                                            <p className="font-semibold text-lg text-dGreen">
                                                John Doe 
                                            </p>
                                            <p className="font-semibold text-lg text-dGreen">
                                                1234-5678-9101 
                                            </p>
                                        </div>
                                    </div>
                                   
                                </div>

                                <div className="font-regular text-md text-dGreen flex flex-row justify-center gap-3  mt-1">
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
                                </div>
                               
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 items-center">
                            <div className="bg-yellow h-[45px] w-[125px] rounded-lg items-center justify-center flex font-bold font-oswald text-2xl text-lGreen">
                                STEP 2
                            </div>
                            <div className="w-[530px] h-[550px] bg-green-400/30  rounded-md flex flex-col items-center gap-10  py-5">
                                <div>
                                    <p className="font-regular text-lg text-d2Green">
                                    Uplad the screenshot of the reciept.
                                    </p>
                                    <div className="flex flex-row gap-2">
                                    <p className="font-regular text-lg -mt-1 text-d2Green">
                                    Make sure the
                                    </p>
                                    <p className="font-bold text-lg -mt-1 text-d2Green">
                                    Reference No.
                                    </p>
                                    <p className="font-regular text-lg -mt-1 text-d2Green">
                                    is included.
                                    </p>
                                    </div>
                                </div>
                                <div>
                                    <Image
                                        src="/bank.svg"
                                        alt="receipt"
                                        width={300}
                                        height={200}
                                    />
                                </div>
                                
                                <div>
                                    <div className="flex flex-row gap-5">
                                        <label htmlFor="mop" className="font-bold text-lg text-d2Green">Payment Method: </label>
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

                                    <div className="flex flex-row gap-3 items-center justify-center mt-2">
                                        <label htmlFor="document" className="font-medium font-oswald text-xl text-d2Green "> Bank Receipt:</label>
                                        <input 
                                        type="file" 
                                        ref={bankTransferReceiptRef}
                                        name="document"  
                                        className="px-4 py-1 bg-gray-300/50 h-[36px] w-[250px] rounded-lg"
                                        disabled={!isBankTransferSelected}
                                        onChange={handleReceiptChange}
                                        accept="image/*"
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>


            <div className="w-full flex justify-center mt-10"> 
            <Button
            variant="mButton"
            onClick={handleAdd}
            disabled={isSubmitting}
            className="w-[150px] h-[45px] text-xl rounded-xl"
            >
                Submit
            </Button>
            </div>
            





        </div>
    );
};

export default EnrollmentPage;