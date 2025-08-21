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
      setFullAddress(data[0].fullAddress || "-"  );

      setGuardiansLastName(data[0].guardiansLastName || "-");
      setGuardiansFirstName(data[0].guardiansFirstName || "-");
      setGuardiansMiddleName(data[0].guardiansMiddleName || "-");
      setGuardiansSuffix(data[0].guardiansSuffix || "-");
      setEmergencyContact(data[0].emergencyContact || "-");
      setEmergencyEmail(data[0].emergencyEmail || "-");

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
          emergencyEmail
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
      <DialogContent className="w-[700px] max-h-[500px] overflow-y-auto bg-gray-50 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
            Student Registration Form
          </DialogTitle>
        </DialogHeader>
      {isLoading ? (
        <div className="flex items-center justify-center">
          Loading...
        </div>
      ):(
        <div className="space-y-6 px-2 py-4 text-sm text-gray-700">
          <section className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">📘 Section 1: Personal Information</h3>

            <div className="grid grid-cols-2 gap-4 mt-7">
              <section className="flex flex-row gap-2 items-center">
                <label className="w-[130px] font-merriweather font-semibold text-dGreen text-[15px]"> Last Name:</label>
                <input 
                  type="text"
                  readOnly={!editing}
                  value={studentLastName}
                  onChange={(e) => setStudentLastName(e.target.value)} 
                  className={`font-merriweather text-dGreen text-[12px] w-[170px] ${
                    editing ? "bg-green-100 p-1 border rounded-sm outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : ""
                  }`}

                />
              </section>

              <section className="flex flex-row gap-2 items-center">
                <label className="w-[130px] font-merriweather font-semibold text-dGreen text-[15px]"> First Name:</label>
                <input 
                  type="text"
                  readOnly={!editing}
                  value={studentFirstName}
                  onChange={(e) => setStudentFirstName(e.target.value)} 
                  className={`font-merriweather text-dGreen text-[12px] w-[170px] ${
                    editing ? "bg-green-100 p-1 border rounded-sm outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : ""
                  }`}
                />
              </section>

              <section className="flex flex-row gap-2 items-center">
                <label className="w-[130px] font-merriweather font-semibold text-dGreen text-[15px]"> Middle Name:</label>
                <input 
                  type="text"
                  readOnly={!editing}
                  value={studentMiddleName}
                  onChange={(e) => setStudentMiddleName(e.target.value)} 
                  className={`font-merriweather text-dGreen text-[12px] w-[170px] ${
                    editing ? "bg-green-100 p-1 border rounded-sm outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : ""
                  }`}
                />
              </section>

              <section className="flex flex-row gap-2 items-center">
                <label className="w-[130px] font-merriweather font-semibold text-dGreen text-[15px]"> Suffix:</label>
                <input 
                  type="text"
                  readOnly={!editing}
                  value={suffix}
                  onChange={(e) => setSuffix(e.target.value)} 
                  className={`font-merriweather text-dGreen text-[12px] w-[170px] ${
                    editing ? "bg-green-100 p-1 border rounded-sm outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : ""
                  }`}
                />
              </section>

              <section className="flex flex-row gap-2 items-center">
                <label className="w-[130px] font-merriweather font-semibold text-dGreen text-[15px]">Date of Birth:</label>
                <input 
                  type="date"
                  readOnly={!editing}
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)} 
                  className={`font-merriweather text-dGreen text-[12px] w-[170px] ${
                    editing ? "bg-green-100 p-1 border rounded-sm outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : ""
                  }`}
                />
              </section>

              <section className="flex flex-row gap-2 items-center">
                <label className="w-[130px] font-merriweather font-semibold text-dGreen text-[15px]">Age:</label>
                <input 
                  type="text"
                  readOnly={!editing}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))} 
                  className={`font-merriweather text-dGreen text-[12px] w-[170px] ${
                    editing ? "bg-green-100 p-1 border rounded-sm outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : ""
                  }`}
                />
              </section>

              <section className="flex flex-row gap-2 items-center">
                <label className="w-[130px] font-merriweather font-semibold text-dGreen text-[15px]">Gender:</label>
                <input 
                  type="text"
                  readOnly={!editing}
                  value={gender}
                  onChange={(e) => setGender(e.target.value)} 
                  className={`font-merriweather text-dGreen text-[12px] w-[170px] ${
                    editing ? "bg-green-100 p-1 border rounded-sm outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : ""
                  }`}
                />
              </section>

              <section className="flex flex-row gap-2 items-center">
                <label className="w-[130px] font-merriweather font-semibold text-dGreen text-[15px]">Full Address:</label>
                <input 
                  type="text"
                  readOnly={!editing}
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)} 
                  className={`font-merriweather text-dGreen text-[12px] w-[170px] ${
                    editing ? "bg-green-100 p-1 border rounded-sm outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : ""
                  }`}
                />
              </section>
            </div>
          </section>

          <section className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">📘 Section 2: Emergency Contact Details</h3>

            <div className="grid grid-cols-2 gap-4 mt-7">
              <section className="flex flex-row gap-2 items-center">
                <label className="w-[130px] font-merriweather font-semibold text-dGreen text-[15px]"> Last Name:</label>
                <input 
                  type="text"
                  readOnly={!editing}
                  value={guardiansLastName}
                  onChange={(e) => setGuardiansLastName(e.target.value)} 
                  className={`font-merriweather text-dGreen text-[12px] w-[170px] ${
                    editing ? "bg-green-100 p-1 border rounded-sm outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : ""
                  }`}
                />
              </section>

              <section className="flex flex-row gap-2 items-center">
                <label className="w-[130px] font-merriweather font-semibold text-dGreen text-[15px]"> First Name:</label>
                <input 
                  type="text"
                  readOnly={!editing}
                  value={guardiansFirstName}
                  onChange={(e) => setGuardiansFirstName(e.target.value)} 
                  className={`font-merriweather text-dGreen text-[12px] w-[170px] ${
                    editing ? "bg-green-100 p-1 border rounded-sm outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : ""
                  }`}
                />
              </section>

              <section className="flex flex-row gap-2 items-center">
                <label className="w-[130px] font-merriweather font-semibold text-dGreen text-[15px]"> Middle Name:</label>
                <input 
                  type="text"
                  readOnly={!editing}
                  value={guardiansMiddleName}
                  onChange={(e) => setGuardiansMiddleName(e.target.value)} 
                  className={`font-merriweather text-dGreen text-[12px] w-[170px] ${
                    editing ? "bg-green-100 p-1 border rounded-sm outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : ""
                  }`}
                />
              </section>

              <section className="flex flex-row gap-2 items-center">
                <label className="w-[130px] font-merriweather font-semibold text-dGreen text-[15px]">suffix:</label>
                <input 
                  type="text"
                  readOnly={!editing}
                  value={guardiansSuffix}
                  onChange={(e) => setGuardiansSuffix(e.target.value)} 
                  className={`font-merriweather text-dGreen text-[12px] w-[170px] ${
                    editing ? "bg-green-100 p-1 border rounded-sm outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : ""
                  }`}
                />
              </section>

              <section className="flex flex-row gap-2 items-center">
                <label className="w-[130px] font-merriweather font-semibold text-dGreen text-[15px]">Contact No:</label>
                <input 
                  type="text"
                  readOnly={!editing}
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)} 
                  className={`font-merriweather text-dGreen text-[12px] w-[170px] ${
                    editing ? "bg-green-100 p-1 border rounded-sm outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : ""
                  }`}
                />
              </section>

              <section className="flex flex-row gap-2 items-center">
                <label className="w-[130px] font-merriweather font-semibold text-dGreen text-[15px]">Email:</label>
                <input 
                  type="text"
                  readOnly={!editing}
                  value={emergencyEmail}
                  onChange={(e) => setEmergencyEmail(e.target.value)} 
                  className={`font-merriweather text-dGreen text-[12px] w-[170px] ${
                    editing ? "bg-green-100 p-1 border rounded-sm outline-none focus:ring-2 focus:ring-dGreen focus:border-dGreen transition" : ""
                  }`}
                />
              </section>
            </div>
          </section>
          <div className="flex flex-row w-full justify-center gap-2 ">
            <Button
              onClick={handleEdit}
              variant={"acceptButton"}
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
