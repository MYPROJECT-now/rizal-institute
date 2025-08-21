"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getInfoByLrn } from "@/src/actions/registrarAction"
import { useEffect, useState } from "react"
import { Document_Modal } from "./document_modal/document_modal"
import { ApplicanInfotType } from "@/src/type/REGISTRAR/applicant"
import { useShowApplicantInfoModal } from "@/src/store/REGISTRAR/applicant"
import { useShowDocumentModal } from "@/src/store/REGISTRAR/applicant"
import { Button } from "@/components/ui/button"

export const Enrollees_info_Modal = () => {
  const { isOpen, close, selectedLRN } = useShowApplicantInfoModal()
  const [applicant, setApplicant] = useState<ApplicanInfotType | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { open } = useShowDocumentModal()

  const [selectedImage, setSelectedImage] = useState<{ src: string | null, title: string }>({ src: null, title: "" })

useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true)
    if (selectedLRN) {
      const res = await getInfoByLrn(selectedLRN)
      setApplicant(res[0] ?? null)
    }
    setIsLoading(false)
  }

  fetchData()
}, [selectedLRN])


const showDocument = (src: string | null, title: string) => {
  if (!src?.trim()) return
  setSelectedImage({ src, title })
  open()
}




  if (!applicant) return null

  return (
      <>
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-[800px] max-h-[90vh] overflow-y-auto bg-gray-50 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
            Student Information
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center">Loading...</div>
        ) : (
          <div className="space-y-6 px-2 py-4 text-sm text-gray-700">

          {!!applicant?.reg_remarks?.length && (
            <section className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
                📘 Registrar&apos;s Remarks
              </h3>
              <div className="grid grid-cols-2 gap-1 text-gray-700 w-[200px]">
                <p className="whitespace-pre-line">Past Remark:</p>
                <p className="whitespace-pre-line">{applicant.reg_remarks}</p>
                <p className="text-sm text-gray-500">Date:</p>
                <p className="text-sm text-gray-500">{applicant.dateOfRemarks}</p>
              </div>
            </section>
          )}

          <section className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">📘 Section 1: Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Full Name:</strong> {applicant.applicantsLastName}, {applicant.applicantsFirstName} {applicant.applicantsMiddleName} {applicant.applicantsSuffix}</p>
              <p><strong>Date of Birth:</strong> {applicant.dateOfBirth}</p>
              <p><strong>Age:</strong> {applicant.age} </p>
              <p><strong>Gender:</strong> {applicant.gender} </p>
              <p><strong>Mobile Number:</strong> {applicant.mobileNumber} </p>
              <p><strong>Email:</strong> {applicant.email} </p>
            </div>
          </section>

          <section className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">📞 Section 2: Contact & Guardian Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Full Name:</strong> {applicant.guardiansLastName}, {applicant.guardiansFirstName} {applicant.guardiansMiddleName} {applicant.guardiansSuffix}</p>
              <p><strong>Emergency Contact:</strong> {applicant.emergencyContact} </p>
              <p><strong>Email:</strong> {applicant.emergencyEmail} </p>
              <p><strong>Full Address:</strong> {applicant.fullAddress} </p>
            </div>
          </section>


          <section className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">🏫 Section 3: Educational Background</h3>
            <div className="grid grid-cols-2 gap-4">
              <p><strong> Grade Level:</strong> {applicant.gradeLevel}</p>
              <p><strong>Student Type:</strong> {applicant.studentType} </p>
              <p><strong>School Name:</strong> {applicant.prevSchool} </p>
              <p><strong>School Address:</strong> {applicant.schoolAddress} </p>
              <p><strong>School Type:</strong> {applicant.schoolType} </p>
              <p><strong>School Year Graduated:</strong> {applicant.schoolYear} </p>
            </div>
          </section>

          
          <section className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">📝 Section 4: Submitted Documents</h3>
            <Document_Modal src={selectedImage.src} title={selectedImage.title} />

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => showDocument(applicant.birthCert, "Birth Certificate")}
                variant="confirmButton"
                className="flex items-center gap-2"
                disabled={!applicant.birthCert?.trim()}
              >
                📄 Birth Certificate
              </Button>

              <Button
                onClick={() => showDocument(applicant.reportCard, "Report Card")}
                variant="confirmButton"
                className="flex items-center gap-2"
                disabled={!applicant.reportCard?.trim()}
              >
                📃 Report Card
              </Button>

              <Button
                onClick={() => showDocument(applicant.goodMoral, "Good Moral Certificate")}
                variant="confirmButton"
                className="flex items-center gap-2"
                disabled={!applicant.goodMoral?.trim()}
              >
                📑 Good Moral Certificate
              </Button>

              <Button
                onClick={() => showDocument(applicant.idPic, "ID Picture")}
                variant="confirmButton"
                className="flex items-center gap-2"
                disabled={!applicant.idPic?.trim()}
              >
                🖼️ ID Picture
              </Button>

              <Button
                onClick={() => showDocument(applicant.studentExitForm, "Student Exit Form")}
                variant="confirmButton"
                className="flex items-center gap-2"
                disabled={!applicant.studentExitForm?.trim()}
              >
                📝 Student Exit Form
              </Button>
            </div>
          </section>
          </div>
        )}
      </DialogContent>
    </Dialog>
    </>
    
  )
}
