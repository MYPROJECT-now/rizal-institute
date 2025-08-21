"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";



export const UploadGrade = () => {
  const [gradeLevel_id, setGradeLevel] = useState("");
  const [subject_id, setSubject] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [assignments, setAssignments] = useState<{ 
    assignment_id: number; 
    gradeLevel_id: number; 
    subject_id: number; 
    gradeLevelName: string; 
    subjectName: string 
  }[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

const handleSubmit = async () => {
  if (!file || !gradeLevel_id || !subject_id) {
    toast.error("Please complete all fields.");
    return;
  }

  setLoading(true);
  const formData = new FormData();
  formData.append("gradeLevel_id", gradeLevel_id);
  formData.append("subject_id", subject_id);
  formData.append("file", file);


  try {
    const response = await fetch("/api/grades", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    // 🧠 Check for backend formula error
    if (!response.ok || !data.success) {
      if (
        data.error?.toLowerCase().includes("formulas that haven't been calculated") ||
        data.error?.toLowerCase().includes("press f9")
      ) {
        toast.warning(
          "⚠️ Excel formulas not calculated. Please open the file, press F9, and save before uploading again."
        );
      } else {
        toast.error(data.error || "Upload failed.");
      }
      return;
    }
    toast.success(data.message);
  } catch (err) {
    const error = err as Error; // 👈 assert to Error
    toast.error(error.message || "An unexpected error occurred.");
    console.error("❌ Unexpected Error:", error);
  } finally {
    setLoading(false);
    setFile(null);
    setGradeLevel("");
    setSubject("");
  }
};

useEffect(() => {
  const fetchAssignments = async () => {
    try {
      const res = await fetch("/api/grade-subject");
      const data = await res.json();
      console.log(data);
      setAssignments(data);
    } catch (error) {
      toast.error("Failed to load.");
      console.error(error);
    }
  };

  fetchAssignments();
}, []);


  return (
    <main className="w-full  items-center justify-center flex mt-10">
      <Card className="w-full max-w-lg shadow-md flex flex-col ">
        <CardHeader className="flex  items-center justify-between">
          <CardTitle className="text-xl">Upload Student Grade</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          <select
            value={`${gradeLevel_id}-${subject_id}`}
            onChange={(e) => {
              const [gId, sId] = e.target.value.split("-");
              setGradeLevel(gId);
              setSubject(sId);
            }}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select grade and subject</option>
            {assignments.map((item) => (
              <option
                key={item.assignment_id}
                value={`${item.gradeLevel_id}-${item.subject_id}`}
              >
                {"Grade " + item.gradeLevelName} - {item.subjectName}
              </option>
            ))}
          </select>

          <div className="flex flex-col ">
            <label htmlFor="file">Excel File</label>
            <input
              id="file"
              type="file"
              accept=".xls,.xlsx"
              className="w-full border px-3 py-2 rounded"
              onChange={handleFileChange}
            />
          </div>

          <Button
            className="w-full"
            variant="confirmButton"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};
