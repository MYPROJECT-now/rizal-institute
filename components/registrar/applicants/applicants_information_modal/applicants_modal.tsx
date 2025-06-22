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

export const Enrollees_info_Modal = () => {
  const { isOpen, close, selectedLRN } = useShowApplicantInfoModal()
  const [applicant, setApplicant] = useState<ApplicanInfotType | null>(null)
  const { open } = useShowDocumentModal()

  const [selectedImage, setSelectedImage] = useState<{ src: string | null, title: string }>({ src: null, title: "" })

  useEffect(() => {
    if (selectedLRN) {
      getInfoByLrn(selectedLRN).then((res) => {
        setApplicant(res[0] ?? null)
      })
    }
  }, [selectedLRN])

  const showDocument = (src: string | null, title: string) => {
    if (!src) return
    setSelectedImage({ src, title })
    open()
  }


  if (!applicant) return null

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-[800px] max-h-[90vh] overflow-y-auto bg-gray-50 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
            Student Registration Form
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 px-2 py-4 text-sm text-gray-700">
          {/* Section 1: Personal Information */}
          <section className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">📘 Section 1: Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Full Name:</strong> {applicant.applicantsLastName}, {applicant.applicantsFirstName} {applicant.applicantsMiddleName} {applicant.applicantsSuffix}</p>
              <p><strong>Date of Birth:</strong> {applicant.dateOfBirth}</p>
              <p><strong>Age:</strong> {applicant.age} </p>
              <p><strong>Gender:</strong> {applicant.gender} </p>
              <p><strong>Mobile Number:</strong> {applicant.mobileNumber} </p>
              <p><strong>email:</strong> {applicant.email} </p>
            </div>
          </section>

          {/* Section 2: Contact & Guardian Details */}
          <section className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">📞 Section 2: Contact & Guardian Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Full Name:</strong> {applicant.guardiansLastName}, {applicant.guardiansFirstName} {applicant.guardiansMiddleName} {applicant.guardiansSuffix}</p>
              <p><strong>Emergency Contact:</strong> {applicant.emergencyContact} </p>
              <p><strong>email:</strong> {applicant.emergencyEmail} </p>
              <p><strong>Full Address:</strong> {applicant.fullAddress} </p>
            </div>
          </section>

          {/* Section 3: Educational Background */}
          <section className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">🏫 Section 3: Educational Background</h3>
            <div className="grid grid-cols-2 gap-4">
              <p><strong> Grade Level:</strong> {applicant.gradeLevel}</p>
              <p><strong>School Name:</strong> {applicant.prevSchool} </p>
              <p><strong>School Address:</strong> {applicant.schoolAddress} </p>
              <p><strong>School Type:</strong> {applicant.schoolType} </p>
              <p><strong>School Year Graduated:</strong> {applicant.schoolYear} </p>
            </div>
          </section>

          <section>
              <Document_Modal src={selectedImage.src} title={selectedImage.title} />
              <button onClick={() => showDocument(applicant.birthCert, "Birth Certificate")} className="text-blue-600 underline">View Birth Certificate</button>
              <button onClick={() => showDocument(applicant.reportCard, "Report Card")} className="text-blue-600 underline">View Report Card</button>
              <button onClick={() => showDocument(applicant.goodMoral, "Good Moral Certificate")} className="text-blue-600 underline">View Good Moral</button>
              <button onClick={() => showDocument(applicant.idPic, "ID Picture")} className="text-blue-600 underline">View ID Picture</button>
              <button onClick={() => showDocument(applicant.studentExitForm, "Student Exit Form")} className="text-blue-600 underline">View Exit Form</button>
          </section>

        </div>
      </DialogContent>
    </Dialog>
  )
}
