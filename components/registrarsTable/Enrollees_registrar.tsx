export const EnrolleesTable = () => {
    const students = [
        {
          lrn: "123546547958",
          fullName: "Tamad, Juan A.",
          gradeLevel: "Grade 7",
          advancement: "Pending",
        },
        // Duplicate entries for demonstration
        {
          lrn: "123546547958",
          fullName: "Tamad, Juan A.",
          gradeLevel: "Grade 7",
          advancement: "Pending",
        },
        {
          lrn: "123546547958",
          fullName: "Tamad, Juan A.",
          gradeLevel: "Grade 7",
          advancement: "Pending",
        },
      ];


    return (
        <div className="flex flex-col">
            <div className="h-[80px] w-full bg-lGreen">
                ENROLLMENT MANAGEMENT
            </div>

            <div>
                filter
            </div>

            <div className="mx-10">
                <table className="w-full border-collapse border border-green-600 text-center">
                    <thead>
                    <tr className="bg-green-600 text-white">
                        <th className="border border-green-600 p-2">LRN</th>
                        <th className="border border-green-600 p-2">Full Name</th>
                        <th className="border border-green-600 p-2">Grade Level</th>
                        <th className="border border-green-600 p-2">Full Details</th>
                        <th className="border border-green-600 p-2">Actions</th>
                        <th className="border border-green-600 p-2">Advancement</th>
                    </tr>
                    </thead>
                    <tbody>
                    {students.map((student, index) => (
                        <tr key={index} className="border border-green-600">
                        <td className="border border-green-600 p-2">{student.lrn}</td>
                        <td className="border border-green-600 p-2">{student.fullName}</td>
                        <td className="border border-green-600 p-2">{student.gradeLevel}</td>
                        <td className="border border-green-600 p-2">
                            <button className="bg-green-500 text-white px-4 py-1 rounded">View</button>
                        </td>
                        <td className="border border-green-600 p-2">
                            <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                            <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                        </td>
                        <td className="border border-green-600 p-2">{student.advancement}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};