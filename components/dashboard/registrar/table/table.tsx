export const EnrollmentTable = () => {
    return (
         <div>
            <table className="w-full border-collapse border-2 border-green-500 mb-10 ">
                <thead>
                    <tr className="bg-green-500 text-white">
                        <th className="p-2 border">LRN</th>
                        <th className="p-2 border">Student Name</th>
                        <th className="p-2 border">Grade Level</th>
                        <th className="p-2 border">Enrollment Status</th>
                        <th className="p-2 border">Date Registered</th>
                    </tr>
                </thead>
                <tbody>
                <tr className="bg-green-100 text-center">
                    <td className="p-2 border">12344</td>
                    <td className="p-2 border">JUan Tamad</td>
                    <td className="p-2 border">Grade 6</td>
                    <td className="p-2 border">Pending</td>
                    <td className="p-2 border">10/10/2023</td>
                </tr>
                <tr className="bg-green-100 text-center">
                    <td className="p-2 border">12344</td>
                    <td className="p-2 border">JUan Tamad</td>
                    <td className="p-2 border">Grade 6</td>
                    <td className="p-2 border">Pending</td>
                    <td className="p-2 border">10/10/2023</td>
                </tr>
                <tr className="bg-green-100 text-center">
                    <td className="p-2 border">12344</td>
                    <td className="p-2 border">JUan Tamad</td>
                    <td className="p-2 border">Grade 6</td>
                    <td className="p-2 border">Pending</td>
                    <td className="p-2 border">10/10/2023</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};