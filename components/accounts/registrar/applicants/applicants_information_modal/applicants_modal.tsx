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
import { Loader2 } from "lucide-react"

export const Enrollees_info_Modal = () => {
  const { isOpen, close , selectedLRN } = useShowApplicantInfoModal()
  const [applicant, setApplicant] = useState<ApplicanInfotType | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { open } = useShowDocumentModal()
  const { close: closeInfo } = useShowApplicantInfoModal()

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
  closeInfo()   // ✅ Close the info modal

  open()

}




  if (!applicant) return null

  return (
      <>
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="lg:w-[600px] sm:w-[550px] w-[290px]  bg-gray-50 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="lg:text-2xl sm:text-2xl text-lg font-bold text-white bg-dGreen py-3 flex items-center justify-center rounded-t-lg">
            Student Information
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-dGreen animate-spin" />
          </div>
        ) : (
        <div className="space-y-6 sm:px-4 px-2 sm:py-2 py-1 text-sm text-gray-700 max-h-[350px]  overflow-y-auto overflow-hidden ">

          {!!applicant?.reg_remarks?.length && (
            <article className="bg-white sm:p-4 p-2 rounded-lg shadow-sm border">
              <p className="border-l-4  border-dGreen rounded-lg pl-2 text-base font-bold font-oswald mb-4 text-dGreen "> 
                Registrar&apos;s Remarks
              </p>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 px-2">
                <section className="flex flex-col">
                  <p className="text-green-900 font-semibold text-xs font-sans pl-1">Past Remark:</p>
                  <p className="w-full text-dGreen text-sm font-semibold font-sans bg-green-100 p-2 rounded-lg">
                    {applicant.reg_remarks}
                  </p>
                </section>

                <section className="flex flex-col">
                  <p className="text-green-900 font-semibold text-xs font-sans pl-1">Date:</p>
                  <p className="w-full text-dGreen text-sm font-semibold font-sans bg-green-100 p-2 rounded-lg">
                    {applicant.dateOfRemarks}
                  </p>
                </section>
              </div>
            </article>
            )}

            <article className="bg-white sm:p-4 p-2 rounded-lg shadow-sm border">
              <p className="border-l-4  border-dGreen rounded-lg pl-2 text-base font-bold font-oswald mb-4 text-dGreen "> 
                Section 1: Personal Information
              </p>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 px-2">

                <section className="flex flex-col">
                  <p className="text-green-900 font-semibold text-xs font-sans pl-1">Full Name:</p>
                  <p className="w-full text-dGreen text-sm font-semibold font-sans bg-green-100 p-2 rounded-lg">
                    {applicant.applicantsLastName}, {applicant.applicantsFirstName} {applicant.applicantsMiddleName} {applicant.applicantsSuffix}
                  </p>
                </section>

                <section className="flex flex-col">
                  <p className="text-green-900 font-semibold text-xs font-sans pl-1">Date of Birth:</p>
                  <p className="w-full text-dGreen text-sm font-semibold font-sans bg-green-100 p-2 rounded-lg">
                    {applicant.dateOfBirth}
                  </p>
                </section>

                <section className="flex flex-col">
                  <p className="text-green-900 font-semibold text-xs font-sans pl-1">Age:</p>
                  <p className="w-full text-dGreen text-sm font-semibold font-sans bg-green-100 p-2 rounded-lg">
                    {applicant.age}
                  </p>
                </section>

                <section className="flex flex-col">
                  <p className="text-green-900 font-semibold text-xs font-sans pl-1">Gender:</p>
                  <p className="w-full text-dGreen text-sm font-semibold font-sans bg-green-100 p-2 rounded-lg">
                    {applicant.gender}
                  </p>
                </section>

                <section className="flex flex-col">
                  <p className="text-green-900 font-semibold text-xs font-sans pl-1">Mobile Number:</p>
                  <p className="w-full text-dGreen text-sm font-semibold font-sans bg-green-100 p-2 rounded-lg">
                    {applicant.mobileNumber}
                  </p>
                </section>
                <section className="flex flex-col">
                  <p className="text-green-900 font-semibold text-xs font-sans pl-1">Email:</p>
                  <p className="w-full text-dGreen text-sm font-semibold font-sans bg-green-100 p-2 rounded-lg">
                    {applicant.email}
                  </p>
                </section>

              </div>
            </article>

            <article className="bg-white sm:p-4 p-2 rounded-lg shadow-sm border">
              <p className="border-l-4  border-dGreen rounded-lg pl-2 text-base font-bold font-oswald mb-4 text-dGreen "> 
                Section 2: Contact & Guardian Details
              </p>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 px-2">
                <section className="flex flex-col">
                  <p className="text-green-900 font-semibold text-xs font-sans pl-1">Full Name:</p>
                  <p className="w-full text-dGreen text-sm font-semibold font-sans bg-green-100 p-2 rounded-lg">
                    {applicant.guardiansLastName}, {applicant.guardiansFirstName} {applicant.guardiansMiddleName} {applicant.guardiansSuffix}                
                  </p>
                </section>

                <section className="flex flex-col">
                  <p className="text-green-900 font-semibold text-xs font-sans pl-1">Emergency Contact:</p>
                  <p className="w-full text-dGreen text-sm font-semibold font-sans bg-green-100 p-2 rounded-lg">
                    {applicant.emergencyContact}
                  </p>
                </section>

                <section className="flex flex-col">
                  <p className="text-green-900 font-semibold text-xs font-sans pl-1">Email:</p>
                  <p className="w-full text-dGreen text-sm font-semibold font-sans bg-green-100 p-2 rounded-lg">
                    {applicant.emergencyEmail || "-"}
                  </p>
                </section>

                <section className="flex flex-col">
                  <p className="text-green-900 font-semibold text-xs font-sans pl-1">Full Address:</p>
                  <p className="w-full text-dGreen text-sm font-semibold font-sans bg-green-100 p-2 rounded-lg">
                    {applicant.fullAddress}
                  </p>
                </section>
              
              </div>
            </article>


            <article className="bg-white sm:p-4 p-2 rounded-lg shadow-sm border">
              <p className="border-l-4  border-dGreen rounded-lg pl-2 text-base font-bold font-oswald mb-4 text-dGreen "> 
                Section 3: Educational Background
              </p>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 px-2">
                <section className="flex flex-col">
                  <p className="text-green-900 font-semibold text-xs font-sans pl-1">LRN:</p>
                  <p className="w-full text-dGreen text-sm font-semibold font-sans bg-green-100 p-2 rounded-lg">
                    {applicant.lrn}              
                  </p>
                </section>

                <section className="flex flex-col">
                  <p className="text-green-900 font-semibold text-xs font-sans pl-1">Grade Level:</p>
                  <p className="w-full text-dGreen text-sm font-semibold font-sans bg-green-100 p-2 rounded-lg">
                    Grade {applicant.gradeLevel}              
                  </p>
                </section>

                <section className="flex flex-col">
                  <p className="text-green-900 font-semibold text-xs font-sans pl-1">Student Type:</p>
                  <p className="w-full text-dGreen text-sm font-semibold font-sans bg-green-100 p-2 rounded-lg">
                    {applicant.studentType}              
                  </p>
                </section>

                <section className="flex flex-col">
                  <p className="text-green-900 font-semibold text-xs font-sans pl-1">SY Graduated:</p>
                  <p className="w-full text-dGreen text-sm font-semibold font-sans bg-green-100 p-2 rounded-lg">
                    {applicant.schoolYear}              
                  </p>
                </section>

                <section className="flex flex-col">
                  <p className="text-green-900 font-semibold text-xs font-sans pl-1">Previous School:</p>
                  <p className="w-full text-dGreen text-sm font-semibold font-sans bg-green-100 p-2 rounded-lg">
                    {applicant.prevSchool}              
                  </p>
                </section>

                <section className="flex flex-col">
                  <p className="text-green-900 font-semibold text-xs font-sans pl-1">School Type:</p>
                  <p className="w-full text-dGreen text-sm font-semibold font-sans bg-green-100 p-2 rounded-lg">
                    {applicant.schoolType}              
                  </p>
                </section>

                <section className="flex flex-col">
                  <p className="text-green-900 font-semibold text-xs font-sans pl-1">School Address:</p>
                  <p className="w-full text-dGreen text-sm font-semibold font-sans bg-green-100 p-2 rounded-lg">
                    {applicant.schoolAddress}              
                  </p>
                </section>
              </div>
            </article>

          
            <article className="bg-white sm:p-4 p-2 rounded-lg shadow-sm border">
              <p className="border-l-4  border-dGreen rounded-lg pl-2 text-base font-bold font-oswald mb-4 text-dGreen "> 
                Section 4: Submitted Documents
              </p>

              <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 mb-2">
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
            </article>
          </div>
        )}
      </DialogContent>
    </Dialog>

    <Document_Modal src={selectedImage.src} title={selectedImage.title} />

    </>
    
  )
}
