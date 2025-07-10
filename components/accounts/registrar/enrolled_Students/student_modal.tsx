"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"

import { getEnrolledStudentsInfo } from "@/src/actions/registrarAction"
import { useTableStudentModal } from "@/src/store/REGISTRAR/student"
import { all_student_info_ModalType } from "@/src/type/REGISTRAR/student"


export const Students_info_Modal = () => {
  const { isOpen, close, selectedLRN } = useTableStudentModal()
  const [student, setStudent] = useState<all_student_info_ModalType | null>(null)


useEffect(() => {
  if (selectedLRN) {
    // getEnrolledStudentsInfo(selectedLRN).then((res) => {
      getEnrolledStudentsInfo().then((res) => {
      setStudent(res[0] ?? null)
    })
  }
}, [selectedLRN])


  if (!student) return null

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-[800px] max-h-[90vh] overflow-y-auto bg-gray-50 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
            Student Registration Form
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 px-2 py-4 text-sm text-gray-700">
          <section className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">📘 Section 1: Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Full Name:</strong> {student.studentLastName}, {student.studentFirstName} {student.studentMiddleName} {student.studentSuffix}</p>
              <p><strong>Date of Birth:</strong> {student.studentBirthDate}</p>
              <p><strong>Age:</strong> {student.studentAge} </p>
              <p><strong>Gender:</strong> {student.studentGender} </p>
              <p><strong>Address:</strong> {student.fullAddress} </p>
            </div>
          </section>

        
        </div>
      </DialogContent>
    </Dialog>
  )
}
