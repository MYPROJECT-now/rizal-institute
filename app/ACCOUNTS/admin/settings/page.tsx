"use client";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { handlePasswordUpdate } from "@/src/actions/utils/changePassword";
import Admin_header from "@/app/header/header_admin";
import { toast } from "sonner";

const RegistrarsEnrolleesTable = () => {
  const { user } = useUser();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  // const [error, setError] = useState("");
  // const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async () => {
    // setError("");
    // setSuccess("");
    setLoading(true);

    if (!currentPassword || !newPassword) {
      // setError("Please fill in all fields.");
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (!user) {
      // setError("User not found.");
      // setLoading(false);
      toast.error("User not found.");
      return;
    }

    const result = await handlePasswordUpdate(user, currentPassword, newPassword);
    setLoading(false);

    if (result.error) {
      // setError(result.error);
      toast.error(result.error);
    } else {
        // setSuccess("Password updated successfully!");
        setCurrentPassword("");    
        setNewPassword("");     
        toast.success("Password updated successfully!");
      // Optionally redirect after short delay
      // setTimeout(() => router.push("/registrar/settings"), 2000);
    }
  };

  return (
      <div className="p-4 w-full min-h-screen lg:h-screen">
        <div className=" w-full h-full rounded-xl flex flex-col py-4 sm:px-10 px-4  bg-page">
        <Admin_header />
              <div className="w-full h-full bg-white self-center mt-2 rounded-lg ">
                <div className=" w-full bg-lGreen font-merriweather text-white items-center flex sm:pl-5 pl-2 sm:py-5 py-4 text-sm sm:text-lg lg:text-2xl">
              PASSWORD MANAGEMENT
            </div>
                <section className=" w-full xl:min-h-[500px] lg:min-h-[400px] min-h-[500px] flex flex-col gap-10 items-center justify-center">
                  <div className="flex flex-col gap-2 w-[200px] sm:w-[300px] xl:w-[400px] h-full  ">
                    <span className="text-sm text-dGreen font-semibold">Current Password</span>
                    <input
                      type="password"
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    className="border-2 border-gray-300 rounded px-3 py-1  w-full  focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-[200px] sm:w-[300px] xl:w-[400px] h-full  ">
                    <span className="text-sm text-dGreen font-semibold">New Password</span>
                    <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border-2 border-gray-300 rounded px-3 py-1  w-full  focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
                    />
                  </div>

                    <Button
                      variant="confirmButton"
                      size="lg"
                      className="mt-4"
                      onClick={handlePasswordChange}
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update Password"}
                    </Button>
                </section>

          {/* <div className=" flex flex-col gap-4 items-center justify-center bg-gray shadow-gray-500 shadow-xl w-full h-[450px] rounded-lg">
            <div className="flex flex-col text-start w-full px-10 lg:w-[500px]">
              <label htmlFor="current-password">Current Password</label>
              <input
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-4 p-2 border rounded"
              />
            </div>

            <div className="flex flex-col text-start w-full px-10 lg:w-[500px]">
              <label htmlFor="new-password">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-4 p-2 border rounded"
              />
            </div>

            {error && <p className="text-red-500 mb-2">{error}</p>}
            {success && <p className="text-green-600 mb-2">{success}</p>}

            <Button
              variant="mButton"
              size="lg"
              className="mt-4"
              onClick={handlePasswordChange}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default RegistrarsEnrolleesTable;





// "use client"
// import Registrar_header from "@/components/header/header_registrar";
// import { useUser } from '@clerk/clerk-react';
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { handlePasswordUpdate } from "./changePassword";
// import RegistrarClientComponent from "@/components/validation/registrar_validate";
// import { Button } from "@/components/ui/button";

// const RegistrarsEnrolleesTable = () => {
//     const { user } = useUser(); // Get the user from the Clerk hook
//     const [currentPassword, setCurrentPassword] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [error, setError] = useState("");
//     const router = useRouter();

//     const handlePasswordChange = async () => {
//         if (!user) {
//             setError("User not found");
//             return;
//         }

//         const result = await handlePasswordUpdate(user, currentPassword, newPassword); // Pass user to the function

//         if (result.error) {
//             setError(result.error);
//         } else {
//             router.push("/registrar/settings");
//         }
//     };

//     return(

//     <RegistrarClientComponent>
//         <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10  bg-gray-300">
//             <Registrar_header /> 
//             <div className="w-full h-[550px] bg-white self-center  mt-10 rounded-lg flex flex-col items-center text-center">
  
//                 <div className="bg-dash font-bold w-full  text-black text-lg py-5 pl-5">
//                     Change Password
//                 </div>

//         <div className="flex flex-col gap-4  items-center justify-center bg-gray shadow-gray-500 shadow-xl w-[700px] h-[350px] mt-[80px] rounded-lg">
//             <div className="flex flex-col w-full px-10 ">
//             <label htmlFor="current-password">Current Password</label>
//             <input
//                 type="password"
//                 placeholder="Enter current password"
//                 value={currentPassword}
//                 onChange={(e) => setCurrentPassword(e.target.value)}
//                 className="mt-4 p-2 border rounded"
//             />
//             </div>

//             <div className="flex flex-col w-full px-10 ">
//             <label htmlFor="current-password">New Password</label>
//             <input
//                 type="password"
//                 placeholder="Enter new password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 className="mt-4 p-2 border rounded"
//             />
//             </div>
//             {error && <p className="text-red-500 mb-2">{error}</p>}
//             <Button
//                 variant="mButton"
//                 size="lg"
//             className="mt-4"
//                 onClick={handlePasswordChange}
//             >
//                 Update Password
//             </Button>
//         </div>
//         </div>
         

//         </div>
//         </RegistrarClientComponent>
//     );
// };

// export default RegistrarsEnrolleesTable;