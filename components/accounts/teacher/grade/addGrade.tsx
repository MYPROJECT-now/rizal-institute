"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GradeOption {
  gradeLevel_id: string;
  gradeLevelName: string;
}

interface SubjectOption {
  subject_id: string;
  subjectName: string;
}


export const UploadGrade = () => {
  const [gradeLevel, setGradeLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
const [grades, setGrades] = useState<GradeOption[]>([]);
const [subjects, setSubjects] = useState<SubjectOption[]>([]);


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/grade-subject");
        const json = await res.json();

        if (json.success) {
          setGrades(json.data.grades);
          setSubjects(json.data.subjects);
        } else {
          toast.error("Failed to load grade and subject options.");
        }
      } catch (error) {
        toast.error("Error loading dropdown data.");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

const handleSubmit = async () => {
  if (!file || !gradeLevel || !subject) {
    toast.error("Please complete all fields.");
    return;
  }

  setLoading(true);
  const formData = new FormData();
  formData.append("gradeLevel", gradeLevel);
  formData.append("subject", subject);
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


  return (
    <main className="w-full  items-center justify-center flex mt-10">
      <Card className="w-full max-w-lg shadow-md flex flex-col ">
        <CardHeader className="flex  items-center justify-between">
          <CardTitle className="text-xl">Upload Student Grade</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col ">
            <label htmlFor="gradeLevel">Grade Level</label>
            <select
              id="gradeLevel"
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select grade</option>
              {grades.map((grade) => (
                <option key={grade.gradeLevel_id} value={grade.gradeLevel_id}>
                  {grade.gradeLevelName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col ">
            <label htmlFor="subject">Subject</label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select subject</option>
              {subjects.map((subj) => (
                <option key={subj.subject_id} value={subj.subject_id}>
                  {subj.subjectName}
                </option>
              ))}
            </select>
          </div>

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
