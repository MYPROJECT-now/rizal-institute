// import { Button } from "@/components/ui/button";
// import { getRecord } from "@/src/actions/studentAction";

// export const Registration_Form = async () => {
//   const record = await getRecord();

//   if (!record) return null;
//   return (
//   <div className="p-10 text-center">
//     <h2 className="text-2xl font-bold text-green-700 mb-2">RIZAL INSTITUTE</h2>
//     <p className="text-sm text-gray-500 mb-6">Official Registration Confirmation</p>

//     <div className="text-left space-y-2 text-gray-800">
//       <p><strong>Student Name:</strong> {record.studentLastName}, {record.studentFirstName} {record.studentMiddleName} {record.studentSuffix}</p>
//       <p><strong>Grade Level:</strong> {record.gradeLevelName}</p>
//       <p><strong>LRN:</strong> {record.lrn}</p>
//       <p><strong>School Year:</strong> {record.ay}</p>
//       <p><strong>Date Admitted:</strong> {record.da ? new Date(record.da).toDateString().slice(4) : 'N/A'}</p>
//     </div>

//     <div className="mt-[70px]">
//       <p>This is to certify that the above-named student is officially enrolled at</p>
//       <p className="font-semibold">Rizal Institute - Junior High School Department</p>
//     </div>

//     <div className="mt-10 justify-between px-10 text-sm text-gray-600 sm:grid grid-cols-1 grid-row-2 md:grid-cols-2">
//       <div className="text-center">
//         _______________________<br />
//         Student Signature
//       </div>
//       <div className="text-center">
//         _______________________<br />
//         Registrar
//       </div>
//     </div>

//     <Button
//       className="px-5 py-1 rounded-lg"
//       variant="confirmButton"
//     >
//       Print Registration Form
//     </Button>
//   </div>

//     );
// };
"use client";

import React from "react";
import { Document, Page, Text, View, Image, StyleSheet} from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { getInfoForDashboard } from "@/src/actions/studentAction";
import { Container } from "lucide-react";


    const styles = StyleSheet.create({
            page: {
                padding: 20,
                alignContent:"center",
                margin:5,
                marginBottom:5,
            },
            header: {
                flexDirection: "row", // put items side by side
                alignItems: "center", // vertically center
                justifyContent: "center",
                gap: 10, // spacing between image and text
            },
            logo: {
                width: 70,
                height: 70, // fixed size (PDF needs numbers, not 'auto')
            },
            title: {
                fontSize: 14,
                textAlign: "center", // align text properly
                fontWeight: "bold",
            },
            greetings:{
              fontSize: 12,
              marginTop: 100,
              marginLeft: 40,
              marginBottom: 35,
            },
            indent:{
              fontSize:12,
              marginTop: 50,
              marginLeft: 80,
            },
            paragraph:{
              fontSize:12,
              marginLeft:40,
              marginRight:40,
              marginTop: 5,
              
            },
            waterMark:{
              position: "absolute",
              top: "30%",
              left:"20%",
              width: 450,
              height:450,
              opacity:0.1,
              transform: "translate (-50%, -50%)"
            },
            data:{
              fontWeight:"bold",
              textTransform:"uppercase",
            }

          
    });
  interface StudentInfo {
      lrn: string | null;
      admissionStatus: string | null;
      gradeLevelName: string | null;
      academicYear: string | null;
      outstandingBalance?: number ;
      studentFirstName: string | null;
      studentMiddleName: string | null;
      studentLastName: string | null;
      studentSuffix: string | null;
}
type EnrollmentCertProps = unknown;


      const Enrollment_cert : React.FC<EnrollmentCertProps>= () => {

        
    const [StudentInfoTable, setStudentInfoTable] = useState<StudentInfo | null >(null); 
                  const fullName = [
                    StudentInfoTable?.studentFirstName,
                    StudentInfoTable?.studentMiddleName,
                    StudentInfoTable?.studentLastName,
                    StudentInfoTable?.studentSuffix ] .filter(Boolean).join(" ")
    useEffect(() => {
        const fetchData = async () => {
          const res = await getInfoForDashboard();
          setStudentInfoTable(res);
        };
        fetchData();
      }, []);

        return (
            <Document>
            <Page size="A4" style={styles.page}>
              <Image src="/logo.png" 
                      style={styles.waterMark}
              />
                {/* HEADER */}
                <View style={styles.header}>
                <Image src="/logo.png" 
                      style={styles.logo} 
                      
                      /> 
                <Text style={styles.title}>
                    RIZAL INSTITUTE CANLUBANG FOUNDATION INC.
                </Text>
                <Image src="/logo.png" style={styles.logo} /> 
                </View>
                <View style={{marginTop:100, alignItems:"center", fontWeight:"bold"}}>
                  <Text>CERTIFICATE OF ENROLLMENT</Text>
                </View>
                {/*<View style={styles.greetings}>
                  <Text>Greetings! </Text>
                </View> */}
              <Container style={{padding: 4, textAlign:"justify",}}>
                <View>
                  <Text style={styles.indent}>
                    This certifies that <Text style={styles.data}>{fullName || "_____________"}</Text>, <Text style={styles.data}>LRN# {StudentInfoTable?.lrn || "_____________"}</Text> is
                    currently 
                  </Text>

                  <Text style={styles.paragraph}>
                   enrolled in Rizal Institute Canlubang Foundation Inc. as a <Text style={styles.data}> Grade {""}
                    {StudentInfoTable?.gradeLevelName || "___"}</Text> student for the A.Y <Text style={styles.data}>{StudentInfoTable?.academicYear || "____-____"}</Text>.
                  </Text>
                </View>

              <View style={{marginTop: 100, marginRight:40 ,alignItems:"flex-end", fontSize:12, }}>
                <Text>_________________</Text>
                <Text style={{marginTop:4, justifySelf:"center", fontSize: 12}}>Registrar&apos;s Signature</Text>
              </View>
              </Container>
                
            </Page>
            </Document>
        );



  //if (loading) {
  //  return (
  //    <div className=" h-[600px] w-full flex items-center justify-center ">
 //       <p className="text-gray-500 text-lg">Loading...</p>
//      </div>
//    );
//  }

//  if (!record) return <p className="text-center text-red-500">No record found.</p>;

 
}

export default Enrollment_cert;


