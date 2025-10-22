"use client";

import React from "react";
import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    alignContent: "center",
    margin: 5,
    marginBottom: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  logo: {
    width: 70,
    height: 70,
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
  },
  greetings: {
    fontSize: 12,
    marginTop: 70,
    marginLeft: 40,
    marginBottom: 35,
  },
  indent: {
    fontSize: 12,
    marginTop: 20,
    marginLeft: 100,
  },
  paragraph: {
    fontSize: 12,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 5,
  },
  waterMark: {
    position: "absolute",
    top: "20%",
    left: "11%",
    width: 450,
    height: 450,
    opacity: 0.1,
  },
  data: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export interface StudentInfo {
  lrn: string | null;
  gradeLevelName: string | null;
  academicYear: string | null;
  studentFirstName: string | null;
  studentMiddleName: string | null;
  studentLastName: string | null;
  studentSuffix: string | null;
  sectionName: string | null;
  subjects?: string[]; 
  rooomName: string | null;

}

export default function EnrollmentCert({ studentInfo }: { studentInfo: StudentInfo }) {
  const fullName = [
    studentInfo?.studentFirstName,
    studentInfo?.studentMiddleName,
    studentInfo?.studentLastName,
    studentInfo?.studentSuffix,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src="/logo.png"   style={styles.waterMark} />

        {/* HEADER */}
        <View style={styles.header}>
          <Image src="/logo.png" style={styles.logo} />
          <Text style={styles.title}>RIZAL INSTITUTE CANLUBANG FOUNDATION INC.</Text>
          <Image src="/logo.png" style={styles.logo} />
        </View>

        <View style={styles.title}>
          <Text style={{ marginTop: 100 }}>CERTIFICATE OF ENROLLMENT</Text>
        </View>

        <View style={styles.greetings}>
          <Text>Greetings!</Text>
        </View>

        <View>
          <Text style={styles.indent}>
            This certifies that <Text style={styles.data}>{fullName || "_____________"}</Text>,{" "}
            <Text style={styles.data}>LRN: {studentInfo?.lrn || "_____________"}</Text> is currently
          </Text>

          <Text style={styles.paragraph}>
            enrolled in Rizal Institute Canlubang Foundation Inc. as a{" "}
            <Text style={styles.data}>Grade {studentInfo?.gradeLevelName || "___"}</Text> student for the S.Y{" "}
            <Text style={styles.data}>{studentInfo?.academicYear || "____-____"}</Text>.
          </Text>

          <View style={{ marginTop: 20, alignItems: "center" }}>
            <Text style={{ fontSize: 13 }}>
              <Text style={styles.data}>{studentInfo?.sectionName || "________"}</Text>
            </Text>
          </View>

          <View style={{ marginTop: 20, alignItems: "center" }}>
            <Text style={{ fontSize: 13 }}>
              <Text style={styles.data}>Room: {studentInfo?.rooomName || "________"}</Text>
            </Text>
          </View>
        </View>

        {studentInfo?.subjects && studentInfo.subjects.length > 0 && (
          <View
            style={{
              marginTop: 25,
              alignSelf: "center",
              width: "70%",
              borderWidth: 1,
              borderColor: "#000",
              borderRadius: 5,
              padding: 10,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                marginBottom: 25,
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              Subjects
            </Text>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                marginHorizontal: 10,
              }}
            >
              {studentInfo.subjects.map((subj, index) => (
                <View key={index} style={{ width: "45%", marginBottom: 5 }}>
                  <Text style={{ fontSize: 11 }}>• {subj}</Text>
                </View>
              ))}
            </View>
          </View>
        )}


        <View
          style={{
            marginTop: 100,
            marginRight: 40,
            alignItems: "flex-end",
            fontSize: 12,
          }}
        >
          <Text>_________________</Text>
          <Text style={{ marginTop: 4, fontSize: 12 }}>Registrar&apos;s Signature</Text>
        </View>
      </Page>
    </Document>
  );
}
