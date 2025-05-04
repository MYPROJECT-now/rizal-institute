export const Registration_Form = () => {
    return (
<div className="p-10 text-center">
  <h2 className="text-2xl font-bold text-green-700 mb-2">RIZAL INSTITUTE</h2>
  <p className="text-sm text-gray-500 mb-6">Official Registration Confirmation</p>

  <div className="text-left space-y-2 text-gray-800">
    <p><strong>Student Name:</strong> Juan Dela Cruz</p>
    <p><strong>Grade Level:</strong> Grade 9</p>
    <p><strong>LRN:</strong> 123456789012</p>
    <p><strong>School Year:</strong> 2025 - 2026</p>
    <p><strong>Date Enrolled:</strong> April 13, 2025</p>
  </div>

  <div className="mt-[100px]">
    <p>This is to certify that the above-named student is officially enrolled at</p>
    <p className="font-semibold">Rizal Institute - Junior High School Department</p>
  </div>

  <div className="mt-10 flex justify-between px-10 text-sm text-gray-600">
    <div className="text-center">
      _______________________<br />
      Student Signature
    </div>
    <div className="text-center">
      _______________________<br />
      Registrar
    </div>
  </div>

  <button
    className="mt-10 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
  >
    Print Registration Form
  </button>
</div>

    );
};