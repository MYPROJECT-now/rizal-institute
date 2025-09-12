"use client";

import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { handlePasswordUpdate } from "@/src/actions/utils/changePassword";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import Cashier_header from "@/app/header/header_cashier";

const CashierPassword = () => {
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
      <div className="p-4 w-full min-h-screen lg:h-screen">
        <div className=" w-full h-full rounded-xl flex flex-col py-4 sm:px-10 px-4  bg-page">
          <Cashier_header />
              <div className="w-full h-full bg-white self-center mt-2 rounded-lg ">
                <div className=" w-full bg-lGreen font-merriweather text-white items-center flex sm:pl-5 pl-2 sm:py-5 py-4 text-sm sm:text-lg lg:text-2xl">
                  PASSWORD MANAGEMENT
                </div>

                <section className=" w-full xl:min-h-[500px] lg:min-h-[400px] min-h-[500px] flex flex-col gap-7 items-center justify-center">
                  {/* Current Password */}
                  <div className="flex flex-col text-start w-full px-10 lg:w-[500px] relative">
                    <label htmlFor="current-password" className="text-dGreen text-[17px] font-semibold">Old Password</label>
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
                      className="absolute right-12 top-11 text-gray-500"
                    >
                      {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* New Password */}
                  <div className="flex flex-col text-start w-full px-10 lg:w-[500px] relative">
                    <label htmlFor="current-password" className="text-dGreen text-[17px] font-semibold">New Password</label>
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
                      className="absolute right-12 top-11 text-gray-500"
                    >
                      {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col text-start w-full px-10 lg:w-[500px] relative">
                    <label htmlFor="current-password" className="text-dGreen text-[17px] font-semibold">Confirm Password</label>
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
                      className="absolute right-12 top-11 text-gray-500"
                    >
                      {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
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
              </div>
        </div>
    </div>
  );
};

export default CashierPassword;


