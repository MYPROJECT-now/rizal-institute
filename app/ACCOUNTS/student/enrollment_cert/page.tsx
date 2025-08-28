"use client";

import React from "react";
import Admin_student from "@/components/sidebar/header/header_student";
import { PDFDownloadLink, PDFViewer, } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import Enrollment_cert from "@/components/accounts/students/enrollment certificate/enrollment_cert";
import { useEffect, useState } from "react";
import { getInfoForDashboard, StudentInfo } from "@/src/actions/studentAction";


const Certificate = () => {

    const [studentInfo, setstudentInfo] = useState< StudentInfo | null>(null);

    const fullName = [
                    studentInfo?.studentFirstName,
                    studentInfo?.studentMiddleName,
                    studentInfo?.studentLastName,
                    studentInfo?.studentSuffix ] .filter(Boolean).join(" ")
  useEffect(() => {
    const fetchData = async () => {
      const res = await getInfoForDashboard();
      setstudentInfo(res);
    };
    fetchData();
  }, []);

  

    return (
        <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10  bg-page">
            <Admin_student />
            <div className="w-full h-auto lg:h-[540px] bg-white self-center  mt-10 rounded-lg ">
                <div>
                <PDFViewer className="w-[100%] h-[500px]">
            <Enrollment_cert />
        </PDFViewer>
                <div className="flex justify-center">
                <PDFDownloadLink fileName={`Certificate_of_Enrollment_${fullName}`} 
                document ={<Enrollment_cert />} >

                <Button className="cursor-pointer bg-dGreen hover:bg-lGreen mt-1 text-center">Download PDF </Button>
                </PDFDownloadLink>
                </div>
                
              </div>
            </div>
           
        </div>
    );
};

export default Certificate;