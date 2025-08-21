"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { getStudentGradesByLRN } from "@/src/actions/registrarAction"
import { useShowApplicantInfoModal } from "@/src/store/REGISTRAR/applicant"

type StudentGradeType = {
  subject: string | null;
  gradeLevel: string | null;
  finalGrade: number | null;
};

export const Enrollees_info_Modal = () => {
  const { isOpen, close, selectedLRN } = useShowApplicantInfoModal()
  const [grades, setGrades] = useState<StudentGradeType[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchGrades = async () => {
      setIsLoading(true)
      if (selectedLRN) {
        const res = await getStudentGradesByLRN(selectedLRN)
        setGrades(res ?? [])
      }
      setIsLoading(false)
    }

    fetchGrades()
  }, [selectedLRN])

  // Group grades by gradeLevel (fallback to "Unknown" for null)
  const groupedGrades = grades.reduce((acc, grade) => {
    const key = grade.gradeLevel ?? "Unknown"
    if (!acc[key]) acc[key] = []
    acc[key].push(grade)
    return acc
  }, {} as Record<string, StudentGradeType[]>)

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-[800px] max-h-[90vh] overflow-y-auto bg-gray-50 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
            Student Grade Records (Grade 7 - 10)
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="py-10 text-center text-gray-600">Loading grades...</div>
        ) : grades.length === 0 ? (
          <div className="py-6 text-center text-gray-600">No grades available.</div>
        ) : (
          <div className="space-y-6 px-2 py-4 text-sm text-gray-700">
            {Object.entries(groupedGrades).map(([gradeLevel, subjects]) => (
              <section
                key={gradeLevel}
                className="bg-white p-4 rounded-lg shadow-sm border"
              >
                <h3 className="text-lg font-semibold mb-2">
                  🎓 {gradeLevel === "Unknown" ? "Unspecified Grade Level" : `Grade ${gradeLevel}`}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {subjects.map((subject, idx) => (
                    <p key={idx}>
                      <strong>{subject.subject ?? "Unnamed Subject"}:</strong>{" "}
                      {subject.finalGrade ?? "-"}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
