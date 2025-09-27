"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAccountModal } from "@/src/store/ADMIN/account";


export const CreateAccount = () => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { isOpen, close } = useAccountModal();

  const hadleSubmit = async () => {
    setLoading(true);
    try {
      const result = await fetch("/api/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role, username, email }),
      })
      
      const data = await result.json();

      if (!result.ok) {
       toast.error(data.details || data.error || "Failed to create account.");
      console.log("Create account failed:", data);
      } else {
      toast.success(data.message);

      }
      console.log(data.message);
      setRole("");
      setUsername("");
      setEmail("");
      setLoading(false);
      close();
    } catch (error) {
      toast.error("Failed to create account.");
      console.log(error || "something went wrong");
    }
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="lg:w-[600px] overflow-y-auto bg-white rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white bg-dGreen h-[60px] flex items-center justify-center">
            Create Account
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center py-5 gap-3">
        <section className="flex flex-col gap-1 w-[200px] sm:w-[300px] xl:w-[400px]">
          <span className="text-dGreen text-sm font-semibold">Role:</span>
          <select 
            className="border-2 border-gray-300 rounded px-3 py-1  w-full  focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="cashier">Cashier</option>
            <option value="registrar">Registrar</option>
            <option value="admin">Admin</option>
          </select>
        </section>

        <section className="flex flex-col gap-1 w-[200px] sm:w-[300px] xl:w-[400px]">
          <span className="text-dGreen text-sm font-semibold">Username (lrn for student):</span>
          <input
            type="text"
            placeholder="Gabriel"
            className="border-2 border-gray-300 rounded px-3 py-1  w-full  focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </section>

        <section className="flex flex-col gap-1 w-[200px] sm:w-[300px] xl:w-[400px]">
          <span className="text-dGreen text-sm font-semibold">Email:</span>
          <input
            type="text"
            placeholder="gabriel@gmail.com"
            className="border-2 border-gray-300 rounded px-3 py-1  w-full  focus:ring-1 focus:ring-dGreen focus:border-dGreen outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </section>

        <Button
          variant="confirmButton"
          className="sm:p-5 p-2 mt-2  rounded-lg"
          onClick={hadleSubmit}
          disabled={(!role || !username || !email) || loading}
        >
          {loading ? "Creating..." : "Create Account"}
        </Button>
        </div>
    </DialogContent>
  </Dialog>
  );
};
