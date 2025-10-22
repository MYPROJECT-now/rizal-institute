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
      <DialogContent className="lg:w-[600px] sm:w-[500px] w-[290px] bg-gray-50 rounded-lg ">
        <DialogHeader>
          <DialogTitle className="sm:text-xl text-lg  font-bold text-white bg-dGreen py-4 rounded-t-lg flex items-center justify-center">
            Student Grade Records
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="py-10 text-center text-gray-600">Loading grades...</div>
        ) : grades.length === 0 ? (
          <div className="py-6 text-center text-gray-600">No grades available.</div>
        ) : (
          <div className="space-y-6 px-4 py-4 text-sm text-gray-700  overflow-y-auto max-h-[400px]">
            {/* {Object.entries(groupedGrades).map(([gradeLevel, subjects]) => (
              <section
                key={gradeLevel}
                className="bg-white p-4 rounded-lg shadow-sm border"
              >
                <h3 className="sm:text-lg text-base text-dGreen font-bold mb-3 border-l-4 border-dGreen pl-2 rounded-lg">
                   {gradeLevel === "Unknown" ? "Unspecified Grade Level" : `Grade ${gradeLevel}`}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {subjects.map((subject, idx) => (
                    <div key={idx} className="flex flex-row gap-2">
                      <strong className="text-green-800">{subject.subject ?? "Unnamed Subject"}:</strong>{" "}
                      <p className="text-green-800">{subject.finalGrade ?? "-"}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))} */}

            {Object.entries(groupedGrades).map(([gradeLevel, subjects]) => {

            // Calculate GWA for this grade level
            const validGrades = subjects
              .map(s => s.finalGrade)
              .filter((g): g is number => g !== null)
            const gwa = validGrades.length > 0
            ? Math.round(validGrades.reduce((acc, curr) => acc + curr, 0) / validGrades.length)
              : null

            return (
              <section key={gradeLevel} className="bg-white p-4 rounded-lg shadow-sm border-2 flex flex-col gap-3">
                <h3 className="sm:text-lg text-base text-dGreen font-bold mb-1 border-l-4 border-dGreen pl-2 rounded-lg">
                  {gradeLevel === "Unknown" ? "Unspecified Grade Level" : `Grade ${gradeLevel}`} 

                </h3>
                
                {/* Display GWA for this grade level */}


                <div className="grid grid-cols-2 gap-4">
                  {subjects.map((subject, idx) => (
                    <div key={idx} className="flex flex-row gap-2">
                      <strong className="text-green-800">{subject.subject ?? "Unnamed Subject"}:</strong>
                      <p className="text-green-800">{subject.finalGrade ?? "-"}</p>
                    </div>
                  ))}
                </div>
                <div className="self-end px-3 py-1 rounded-full text-xl font-bold bg-green-100 text-green-800 shadow-sm">
                  GWA: {gwa ?? "-"}
                </div>
              </section>
            )
          })}

          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
