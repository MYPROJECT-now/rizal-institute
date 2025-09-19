// UploadGradeServer.tsx (server component wrapper)
import { getGradeAndSubjects } from "@/src/actions/teacherAction";
import { UploadGradeClient } from "./addGrade";

export const UploadGrade = async () => {
  const assignments = await getGradeAndSubjects(); // server fetch
  return <UploadGradeClient assignments={assignments || []} />;
};
