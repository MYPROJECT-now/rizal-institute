// UploadGradeClient.tsx (client, interactive UI)
"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const UploadGradeClient = ({
  assignments,
}: {
  assignments: {
    assignment_id: number;
    gradeLevel_id: number;
    subject_id: number;
    gradeLevelName: string | null;
    subjectName: string | null;
    sectionName: string | null;
    section_id: number | null;
  }[];
}) => {
  const [gradeLevel_id, setGradeLevel] = useState("");
  const [subject_id, setSubject] = useState("");
  const [section_id, setSection] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
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
    formData.append("section_id", section_id);
    formData.append("file", file);

    try {
      const response = await fetch("/api/grades", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(data.error || "Upload failed.");
        return;
      }
      toast.success(data.message);
    } catch (err) {
      toast.error("Unexpected error.");
      console.error(err);
    } finally {
      setLoading(false);
      setFile(null);
      setGradeLevel("");
      setSubject("");
      setSection("");
    }
  };

  return (
    <main className="w-full flex items-center justify-center mt-10">
      <Card className="w-full max-w-lg shadow-md flex flex-col">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="sm:text-xl text-lg text-dGreen font-bold">Upload Student Grade</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            {assignments.length === 0 ? (
              <p className="w-full border px-3 py-2 rounded text-sm sm:text-base">No Assigned grades and subjet yet.</p>
            ) : (
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
                    value={`${item.gradeLevel_id}-${item.subject_id}-${item.section_id} `}
                  >
                    {"Grade " + item.gradeLevelName} - {item.sectionName ? item.sectionName : ""} {item.subjectName}
                  </option>
                ))}
              </select>
            )}


          <div className="flex flex-col">
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
            disabled={loading || !file }
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};
