"use client";

import Teacher_header from "@/app/header/header_teacher";
import { UploadGrade } from "@/components/accounts/teacher/grade/addGrade";

const GradePage = () => {


  return (
    <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10 bg-page">
      <Teacher_header />
      <div className="w-full h-[540px] bg-white self-center mt-10 rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="h-[80px] w-full bg-lGreen font-merriweather text-3xl text-white items-center flex pl-5">
          Submission of Grades
        </div>
        <div >
        <UploadGrade />
        </div>
      </div>
    </div>
  );
};

export default GradePage;
