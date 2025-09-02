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
     <div className="  xl:min-h-[500px] lg:min-h-[400px] min-h-[500px] flex flex-col gap-2 -mt-10 sm:mt-0 items-center justify-center">
      {/* <h1 className="text-2xl font-bold text-dGreen">Create Account</h1> */}

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
          <span className="text-dGreen text-sm font-semibold">Username:</span>
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
  );
};
