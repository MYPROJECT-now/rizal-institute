"use client";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { handlePasswordUpdate } from "@/src/actions/utils/changePassword";
import Admin_student from "@/app/header/header_student";
import { Eye, EyeOff } from "lucide-react"; // 👈 for toggle icons
import { toast } from "sonner";

const StudentsPassword = () => {
  const { user } = useUser();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showCurrent, setShowCurrent] = useState(true);
  const [showNew, setShowNew] = useState(true);
  const [showConfirm, setShowConfirm] = useState(true);

  const handlePasswordChange = async () => {

    setLoading(true);

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (!user) {
      toast.error("User not found.");
      setLoading(false);
      return;
    }

    const checkOld = await handlePasswordUpdate(user, currentPassword, currentPassword);
    if (checkOld.error) {
      toast.error("Old password is incorrect.");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      setLoading(false);
      return;
    }


    const result = await handlePasswordUpdate(user, currentPassword, newPassword);
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="w-full h-full sm:mt-3 mt-1 mx-3 rounded-xl flex flex-col sm:px-10 px-2 bg-page sm:text-sm md:text-base lg:text-lg">
      <Admin_student />
      <div className="w-full sm:h-[540px] h-full bg-white self-center sm:mt-10 mt-5 rounded-lg flex flex-col items-center text-center">
        <div className="py-5 w-full bg-lGreen font-merriweather text-lg sm:text-2xl lg:text-3xl text-white items-center flex pl-5">
          PASSWORD MANAGEMENT
        </div>

        <div className="flex flex-col gap-7 items-center justify-center bg-gray shadow-gray-500  w-full h-[450px] rounded-lg">
          
          {/* Current Password */}
          <div className="flex flex-col text-start w-full sm:px-10 px-5 lg:w-[500px] relative gap-2">
            <label htmlFor="current-password" className="text-dGreen sm:text-[17px] text-sm font-semibold">Old Password</label>
            <input
              type={showCurrent ? "password" : "text"}
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="p-2 border rounded w-full"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute sm:right-12 right-8 top-10 text-gray-500"
            >
              {showCurrent ? <EyeOff  size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* New Password */}
          <div className="flex flex-col text-start w-full sm:px-10 px-5 lg:w-[500px] relative gap-2">
            <label htmlFor="current-password" className="text-dGreen sm:text-[17px] text-sm font-semibold">New Password</label>
            <input
              type={showNew ? "password" : "text"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className=" p-2 border rounded w-full"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute sm:right-12 right-8 top-10 text-gray-500"
            >
              {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col text-start w-full sm:px-10 px-5 lg:w-[500px] relative gap-2">
            <label htmlFor="current-password" className="text-dGreen sm:text-[17px] text-sm  font-semibold">Confirm Password</label>
            <input
              type={showConfirm ? "password" : "text"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className=" p-2 border rounded w-full"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute sm:right-12 right-8 top-10 text-gray-500"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Feedback */}
          {/* {error && <p className="text-red-500 mb-2">{error}</p>}
          {success && <p className="text-green-600 mb-2">{success}</p>} */}

          {/* Submit Button */}
          <Button
            variant="confirmButton"
            className="mt-4 px-5 py-2 rounded-lg"
            onClick={handlePasswordChange}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentsPassword;
