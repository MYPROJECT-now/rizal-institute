"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"

import { getEnrolledStudentsInfo, updateStudentInfo } from "@/src/actions/registrarAction"
import { useTableStudentModal } from "@/src/store/REGISTRAR/student"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"


export const Students_info_Modal = () => {
  const { isOpen, close, selectedLRN } = useTableStudentModal();
  const [editing, setEditing] = useState(false);
  const [studentLastName, setStudentLastName] = useState("");
  const [studentFirstName, setStudentFirstName] = useState("");
  const [studentMiddleName, setStudentMiddleName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [fullAddress, setFullAddress] = useState("");

  const [guardiansLastName, setGuardiansLastName] = useState("");
  const [guardiansFirstName, setGuardiansFirstName] = useState("");
  const [guardiansMiddleName, setGuardiansMiddleName] = useState("");
  const [guardiansSuffix, setGuardiansSuffix] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [emergencyEmail, setEmergencyEmail] = useState("");
  const [isActive, setIsActive] = useState(false);

  const [birthcert, setBirthcert] = useState(false);
  const [reportcard, setReportcard] = useState(false);
  const [goodmoral, setGoodmoral] = useState(false);
  const [idpic, setIdpic] = useState(false);
  const [exitform, setExitform] = useState(false);
  const [form137, setForm137] = useState(false);
  const [itr, setItr] = useState(false);
  const [esc, setEsc] = useState(false);

  const [escGrantee, setEscGrantee] = useState("");
  const [studentType, setStudentType] = useState("");
  const [schoolType, setSchoolType] = useState("");


  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

useEffect(() => {
  if (selectedLRN) {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getEnrolledStudentsInfo(selectedLRN);

      setStudentLastName(data[0].studentLastName || "-");
      setStudentFirstName(data[0].studentFirstName || "-");
      setStudentMiddleName(data[0].studentMiddleName || "-");
      setSuffix(data[0].studentSuffix || "-");
      setDateOfBirth(data[0].studentBirthDate || "-");
      setAge(data[0].age || 0);
      setGender(data[0].studentGender || "-");

      setGuardiansLastName(data[0].guardiansLastName || "-");
      setGuardiansFirstName(data[0].guardiansFirstName || "-");
      setGuardiansMiddleName(data[0].guardiansMiddleName || "-");
      setGuardiansSuffix(data[0].guardiansSuffix || "-");
      setEmergencyContact(data[0].emergencyContact || "-");
      setEmergencyEmail(data[0].emergencyEmail || "-");

      setBirthcert(Boolean(data[0].birthcert));
      setReportcard(Boolean(data[0].reportCard));
      setGoodmoral(Boolean(data[0].goodMoral));
      setIdpic(Boolean(data[0].idPic));
      setExitform(Boolean(data[0].studentExitForm));
      setForm137(Boolean(data[0].form137));
      setItr(Boolean(data[0].itr));
      setEsc(Boolean(data[0].escCert));

      setStudentType(data[0].studentType || "-");
      setSchoolType(data[0].schoolType || "-");
      setEscGrantee(data[0].escGrantee || "-");

      setIsActive(Boolean(data[0]?.isActive));

      setIsLoading(false);

    };
    fetchData();
  }
}, [selectedLRN])

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
      
    if (!selectedLRN) return;
    setIsSaving(true);
    // await updateStudentInfo(selectedLRN);

    try {
       updateStudentInfo(selectedLRN,
        {
          studentLastName,
          studentFirstName,
          studentMiddleName,
          suffix,
          studentBirthDate: dateOfBirth,
          studentAge: age,
          studentGender: gender,
          fullAddress,

          guardiansLastName,
          guardiansFirstName,
          guardiansMiddleName,
          guardiansSuffix,
          emergencyContact,
          emergencyEmail,

          birthcert,
          reportcard,
          goodmoral,
          idpic,
          exitform,
          form137,
          itr,
          esc,
        }
      );
      toast.success("Student information updated successfully!");
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setEditing(false);
      setIsSaving(false);
    }
 
  };

  const handleClose = () => {
    close();
    setEditing(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="lg:w-[700px] sm:w-[550px] w-[290px] max-h-[400px] overflow-hidden bg-gray-50 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="lg:text-2xl sm:text-xl text-lg font-bold text-white bg-dGreen lg:py-4 sm:py-3 py-4 flex items-center justify-center">
            Student Registration Form
          </DialogTitle>
        </DialogHeader>
      {isLoading ? (  
        <div className="flex items-center justify-center py-5">
          Loading...
        </div>
      ):(
        <div className="space-y-6 sm:px-6 px-3 py-1  max-h-[300px] overflow-y-auto">
          <article className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200">
            <h3 className="lg:text-lg sm:text-base text-sm font-bold mb-2 text-dGreen"> Section 1: Personal Information</h3>

            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-7 sm:pl-3 pl-1">
              <section className="flex flex-col">
                <span className="font-merriweather font-semibold text-dGreen text-[12px]"> Last Name:</span>
                <input 
                  type="text"
                  readOnly={!editing}
                  value={studentLastName}
                  onChange={(e) => setStudentLastName(e.target.value)} 
                  className={`font-merriweather text-dGreen text-sm lg:w-[220px] sm:w-[190px] p-2 ${
                    editing ? "bg-green-100 rounded-sm  outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : "outline-none bg-green-100/50 rounded-sm "
                  }`}

                />
              </section>

              <section className="flex flex-col">
                <label className=" font-merriweather font-semibold text-dGreen text-[12px]"> First Name:</label>
                <input 
                  type="text"
                  readOnly={!editing}
                  value={studentFirstName}
                  onChange={(e) => setStudentFirstName(e.target.value)} 
                  className={`font-merriweather text-dGreen text-sm lg:w-[220px] sm:w-[190px] p-2 ${
                    editing ? "bg-green-100 rounded-sm  outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : "outline-none bg-green-100/50 rounded-sm "
                  }`}
                />
              </section>

              <section className="flex flex-col">
                <label className="font-merriweather font-semibold text-dGreen text-[12px]"> Middle Name:</label>
                <input 
                  type="text"
                  readOnly={!editing}
                  value={studentMiddleName}
                  onChange={(e) => setStudentMiddleName(e.target.value)} 
                  className={`font-merriweather text-dGreen text-sm lg:w-[220px] sm:w-[190px] p-2 ${
                    editing ? "bg-green-100 rounded-sm  outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : "outline-none bg-green-100/50 rounded-sm "
                  }`}
                />
              </section>

              <section className="flex flex-col">
                <label className="font-merriweather font-semibold text-dGreen text-[12px]"> Suffix:</label>
                <input 
                  type="text"
                  readOnly={!editing}
                  value={suffix}
                  onChange={(e) => setSuffix(e.target.value)} 
                  className={`font-merriweather text-dGreen text-sm lg:w-[220px] sm:w-[190px] p-2 ${
                    editing ? "bg-green-100 rounded-sm  outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : "outline-none bg-green-100/50 rounded-sm "
                  }`}
                />
              </section>

              <section className="flex flex-col">
                <label className=" font-merriweather font-semibold text-dGreen text-[12px]">Date of Birth:</label>
                <input 
                  type="date"
                  readOnly={!editing}
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)} 
                  className={`font-merriweather text-dGreen text-sm lg:w-[220px] sm:w-[190px] p-2 ${
                    editing ? "bg-green-100 rounded-sm  outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : "outline-none bg-green-100/50 rounded-sm "
                  }`}
                />
              </section>

              <section className="flex flex-col">
                <label className=" font-merriweather font-semibold text-dGreen text-[12px]">Age:</label>
                <input 
                  type="text"
                  readOnly={!editing}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))} 
                  className={`font-merriweather text-dGreen text-sm lg:w-[220px] sm:w-[190px] p-2 ${
                    editing ? "bg-green-100 rounded-sm  outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : "outline-none bg-green-100/50 rounded-sm "
                  }`}
                />
              </section>

              <section className="flex flex-col">
                <label className="font-merriweather font-semibold text-dGreen text-[12px]">Gender:</label>
                <input 
                  type="text"
                  readOnly={!editing}
                  value={gender}
                  onChange={(e) => setGender(e.target.value)} 
                  className={`font-merriweather text-dGreen text-sm lg:w-[220px] sm:w-[190px] p-2 ${
                    editing ? "bg-green-100 rounded-sm  outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : "outline-none bg-green-100/50 rounded-sm "
                  }`}
                />
              </section>

              <section className="flex flex-col">
                <label className="font-merriweather font-semibold text-dGreen text-[12px]">Full Address:</label>
                <input 
                  type="text"
                  readOnly={!editing}
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)} 
                  className={`font-merriweather text-dGreen text-sm lg:w-[220px] sm:w-[190px] p-2 ${
                    editing ? "bg-green-100 rounded-sm  outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : "outline-none bg-green-100/50 rounded-sm "
                  }`}
                />
              </section>
            </div>
          </article>

          <article className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="lg:text-lg sm:text-base text-sm font-bold mb-2 text-dGreen"> Section 2: Emergency Contact Details</h3>

            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-7 sm:pl-3 pl-1">
              <section className="flex flex-col">
                <label className="w- font-merriweather font-semibold text-dGreen text-[12px]"> Last Name:</label>
                <input 
                  type="text"
                  readOnly={!editing}
                  value={guardiansLastName}
                  onChange={(e) => setGuardiansLastName(e.target.value)} 
                  className={`font-merriweather text-dGreen text-sm lg:w-[220px] sm:w-[190px] p-2 ${
                    editing ? "bg-green-100 rounded-sm  outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : "outline-none bg-green-100/50 rounded-sm "
                  }`}
                />
              </section>

              <section className="flex flex-col">
                <label className=" font-merriweather font-semibold text-dGreen text-[12px]"> First Name:</label>
                <input 
                  type="text"
                  readOnly={!editing}
                  value={guardiansFirstName}
                  onChange={(e) => setGuardiansFirstName(e.target.value)} 
                  className={`font-merriweather text-dGreen text-sm lg:w-[220px] sm:w-[190px] p-2 ${
                    editing ? "bg-green-100 rounded-sm  outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : "outline-none bg-green-100/50 rounded-sm "
                  }`}
                />
              </section>

              <section className="flex flex-col">
                <label className=" font-merriweather font-semibold text-dGreen text-[12px]"> Middle Name:</label>
                <input 
                  type="text"
                  readOnly={!editing}
                  value={guardiansMiddleName}
                  onChange={(e) => setGuardiansMiddleName(e.target.value)} 
                  className={`font-merriweather text-dGreen text-sm lg:w-[220px] sm:w-[190px] p-2 ${
                    editing ? "bg-green-100 rounded-sm  outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : "outline-none bg-green-100/50 rounded-sm "
                  }`}
                />
              </section>

              <section className="flex flex-col">
                <label className=" font-merriweather font-semibold text-dGreen text-[12px]">suffix:</label>
                <input 
                  type="text"
                  readOnly={!editing}
                  value={guardiansSuffix}
                  onChange={(e) => setGuardiansSuffix(e.target.value)} 
                  className={`font-merriweather text-dGreen text-sm lg:w-[220px] sm:w-[190px] p-2 ${
                    editing ? "bg-green-100 rounded-sm  outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : "outline-none bg-green-100/50 rounded-sm "
                  }`}
                />
              </section>

              <section className="flex flex-col">
                <label className=" font-merriweather font-semibold text-dGreen text-[12px]">Contact No:</label>
                <input 
                  type="text"
                  readOnly={!editing}
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)} 
                  className={`font-merriweather text-dGreen text-sm lg:w-[220px] sm:w-[190px] p-2 ${
                    editing ? "bg-green-100 rounded-sm  outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : "outline-none bg-green-100/50 rounded-sm "
                  }`}
                />
              </section>

              <section className="flex flex-col">
                <label className=" font-merriweather font-semibold text-dGreen text-[12px]">Email:</label>
                <input 
                  type="text"
                  readOnly={!editing}
                  value={emergencyEmail}
                  onChange={(e) => setEmergencyEmail(e.target.value)} 
                  className={`font-merriweather text-dGreen text-sm lg:w-[220px] sm:w-[190px] p-2 ${
                    editing ? "bg-green-100 rounded-sm  outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : "outline-none bg-green-100/50 rounded-sm "
                  }`}
                />
              </section>

              
            </div>
          </article>

          <article className="bg-white p-4 rounded-lg shadow-lg border-2 border-gray-200">
            <h3 className="lg:text-lg sm:text-base text-sm font-bold mb-2 text-dGreen"> Section 3: Document Checklist</h3>

              <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-7 sm:pl-3 pl-1">
                  <label className="flex items-center gap-2 text-sm text-dGreen font-merriweather">
                <input
                  type="checkbox"
                  checked={birthcert}
                  disabled={!editing}
                  onChange={() => setBirthcert(!birthcert)}
                  className="accent-dGreen w-4 h-4"
                />
                Birth Certificate
              </label>

              <label className="flex items-center gap-2 text-sm text-dGreen font-merriweather">
                <input
                  type="checkbox"
                  checked={reportcard}
                  disabled={!editing}
                  onChange={() => setReportcard(!reportcard)}
                  className="accent-dGreen w-4 h-4"
                />
                Report Card 
              </label>

              <label className="flex items-center gap-2 text-sm text-dGreen font-merriweather">
                <input
                  type="checkbox"
                  checked={goodmoral}
                  disabled={!editing}
                  onChange={() => setGoodmoral(!goodmoral)}
                  className="accent-dGreen w-4 h-4"
                />
                Good Moral
              </label>

              <label className="flex items-center gap-2 text-sm text-dGreen font-merriweather">
                <input
                  type="checkbox"
                  checked={idpic}
                  disabled={!editing}
                  onChange={() => setIdpic(!idpic)}
                  className="accent-dGreen w-4 h-4"
                />
                1x1 ID Picture
              </label>

              {studentType === "Transferee" && (
              <label className="flex items-center gap-2 text-sm text-dGreen font-merriweather">
                <input
                  type="checkbox"
                  checked={exitform}
                  disabled={!editing}
                  onChange={() => setExitform(!exitform)}
                  className="accent-dGreen w-4 h-4"
                />
                Student Exit Form
              </label>
              )}

              <label className="flex items-center gap-2 text-sm text-dGreen font-merriweather">
                <input
                  type="checkbox"
                  checked={form137}
                  disabled={!editing}
                  onChange={() => setForm137(!form137)}
                  className="accent-dGreen w-4 h-4"
                />
                Form 137 (Permanent Record)
              </label>

              {studentType === "Incoming G7" && (
              <label className="flex items-center gap-2 text-sm text-dGreen font-merriweather">
                <input
                  type="checkbox"
                  checked={itr}
                  disabled={!editing}
                  onChange={() => setItr(!itr)}
                  className="accent-dGreen w-4 h-4"
                />
                Income Tax Return (ITR)
              </label>
              )}

              {escGrantee === "Yes" && schoolType === "Private" && (
              <label className="flex items-center gap-2 text-sm text-dGreen font-merriweather">
                <input
                  type="checkbox"
                  checked={esc}
                  disabled={!editing}
                  onChange={() => setEsc(!esc)}
                  className="accent-dGreen w-4 h-4"
                />
                ESC Certificate
              </label>
              )}
            </div>
          </article>

          <div className="flex flex-row w-full justify-center gap-2 ">
            <Button
              onClick={handleEdit}
              variant={"acceptButton"}
              disabled={!isActive}
              className="rounded-xl px-2 w-14 py-1"
            >
              Edit
            </Button>
            
            <Button
              onClick={handleSave}
              disabled={!editing}
              variant={"confirmButton"}
              className="rounded-xl px-4 py-1"
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      )}
      </DialogContent>
    </Dialog>
  )
}
