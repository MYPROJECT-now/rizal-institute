"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useShowGradesModal } from "@/src/store/REGISTRAR/grades"

export const Reg_Grades = () => {
  const { isOpen, close } = useShowGradesModal()

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-[800px] max-h-[90vh] overflow-y-auto bg-gray-50 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
            Student Grade Records (Grade 7 - 10)
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 px-2 py-4 text-sm text-gray-700">
          {/* Grade Level Sections */}
          {[7, 8, 9, 10].map((grade) => (
            <section
              key={grade}
              className="bg-white p-4 rounded-lg shadow-sm border"
            >
              <h3 className="text-lg font-semibold mb-2">
                🎓 Grade {grade}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <p><strong>English:</strong> 89</p>
                <p><strong>Filipino:</strong> 91</p>
                <p><strong>Mathematics:</strong> 87</p>
                <p><strong>Science:</strong> 90</p>
                <p><strong>Araling Panlipunan:</strong> 88</p>
                <p><strong>MAPEH:</strong> 92</p>
                <p><strong>TLE:</strong> 89</p>
                <p><strong>Edukasyon sa Pagpapakatao (EsP):</strong> 90</p>
                <p><strong>General Average:</strong> 89.5</p>
              </div>
            </section>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
