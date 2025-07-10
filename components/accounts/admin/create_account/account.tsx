"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";



export const CreateAccount = () => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

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
    toast.success(data.message);
    console.log(data.message);
    setRole("");
    setUsername("");
    setEmail("");
    setLoading(false);
  } catch (error) {
    toast.error("Failed to create account.");
    console.log(error || "something went wrong");
  }
  }
  return (
     <div className="h-[370px] w-[600px] flex flex-col gap-3 items-center bg-gray-200/40 rounded-lg shadow-md pt-4 px-10 m">
      <h1 className="text-2xl font-bold text-dGreen">Create Account</h1>
        <div className="flex flex-col gap-1 w-full">
          <span className="text-dGreen text-sm font-semibold">Role:</span>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
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
        </div>

        <div className="flex flex-col gap-1 w-full">
          <span className="text-dGreen text-sm font-semibold">Username:</span>
          <input
            type="text"
            placeholder="Gabriel"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <span className="text-dGreen text-sm font-semibold">Email:</span>
          <input
            type="text"
            placeholder="gabriel@gmail.com"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button
          variant="confirmButton"
          className="p-5 mt-2 w-full rounded-lg"
          onClick={hadleSubmit}
          disabled={(!role || !username || !email) || loading}
        >
          {loading ? "Creating..." : "Create Account"}
        </Button>
      </div>
  );
};
