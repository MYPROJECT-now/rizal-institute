"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRegStudentsModal } from "@/src/store/registrar/students"

export const Reg_Students = () => {
  const { isOpen, close } = useRegStudentsModal()

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-[700px] overflow-y-auto bg-gray-50 rounded-xl shadow-lg">
        <DialogHeader>
            <DialogTitle 
            className="text-2xl font-bold text-white bg-dGreen h-[60px] items-center justify-center flex"
            >
                Student Profile
            </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 px-2 py-4">
          {/* Personal Information */}
          <section className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">👤 Personal Information</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-700">
              <p><strong>LRN:</strong> 123546547958</p>
              <p><strong>Full Name:</strong> Tamad, Juan A.</p>
              <p><strong>Sex:</strong> Male</p>
              <p><strong>Date of Birth:</strong> April 15, 2009</p>
              <p><strong>Age:</strong> 16</p>
              <p><strong>Nationality:</strong> Filipino</p>
              <p><strong>Religion:</strong> Roman Catholic</p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">📞 Contact & Address</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-700">
              <p><strong>Home Address:</strong> 123 Mabini Street, Quezon City</p>
              <p><strong>Contact Number:</strong> 09171234567</p>
              <p><strong>Email Address:</strong> juan.tamad@example.com</p>
            </div>
          </section>

          {/* Family Background */}
          <section className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">👪 Family Background</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-700">
              <p><strong>Father&apos;s Name:</strong> Pedro Tamad</p>
              <p><strong>Mother&apos;s Name:</strong> Maria Tamad</p>
            </div>
          </section>

          {/* Emergency Info */}
          <section className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">🚑 Emergency Details</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-700">
              <p><strong>Emergency Contact:</strong> Pedro Tamad</p>
              <p><strong>Relationship:</strong> Father</p>
              <p><strong>Emergency Phone:</strong> 09171234567</p>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
