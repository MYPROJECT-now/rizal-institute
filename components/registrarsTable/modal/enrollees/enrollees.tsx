"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRegEnrolleesModal } from "@/src/store/registrar/enrollees"

export const Reg_Enrollees = () => {
  const { isOpen, close } = useRegEnrolleesModal()

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
              <p><strong>Full Name:</strong> Juan Andres Tamad Jr.</p>
              <p><strong>Date of Birth:</strong> 04/15/2009</p>
              <p><strong>Age:</strong> 16</p>
              <p><strong>Gender:</strong> Male</p>
              <p><strong>Civil Status:</strong> Single</p>
              <p><strong>Nationality:</strong> Filipino</p>
              <p><strong>Religion:</strong> Catholic</p>
            </div>
          </section>

          {/* Section 2: Contact & Guardian Details */}
          <section className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">📞 Section 2: Contact & Guardian Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Full Address:</strong> 123 Main St, City, Country</p>
              <p><strong>Mobile Number:</strong> 09123456789</p>
              <p><strong>Email Address:</strong> sample@gmail.com</p>
              <p><strong>Parent/Guardian&apos;s Name:</strong> Jose Maria Tamad Sr.</p>
            </div>
          </section>

          {/* Section 3: Educational Background */}
          <section className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">🏫 Section 3: Educational Background</h3>
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Student Admission Status:</strong> Transferee</p>
              <p><strong>Previous School:</strong> AB Normal Elementary School</p>
              <p><strong>School Address:</strong> 123 Main St, City, Country</p>
              <p><strong>LRN:</strong> 123456789</p>
              <p><strong>School Type:</strong> Public</p>
              <p><strong>Last Grade Level</strong> Grade 6</p>
              <p><strong>Year Completed</strong> 2020</p>
            </div>
          </section>

          {/* Section 4: Required Documents Upload */}
          <section className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">📄 Section 4: Required Documents Upload</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>✅ PSA Birth Certificate</li>
              <li>✅ REPORT CARD</li>
              <li>✅ Good Moral Certificate</li>
              <li>✅ 2x2 ID picture</li>
              <li>✅ CACPRISAA Student Exit Clearance</li>
            </ul>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
