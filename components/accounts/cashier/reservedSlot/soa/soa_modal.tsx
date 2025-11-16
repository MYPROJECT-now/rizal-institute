"use client";

import React, {  useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useShowDocumentModal, useShowGradeModal, useUploadSoaModal } from "@/src/store/CASHIER/reserved";
import { Button } from "@/components/ui/button";
import { addBreakDown, addGrant, checkSoa, getESC, getGranted, getInfo, getRemainingBalance, isLrnExist, prevDiscounts, searchSibling } from "@/src/actions/cashierAction";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Document_Review } from "./document/document_review";
import { Grade_Summary } from "./grade_summary/grade_summary";

interface DIsInfo {
  fullName: string | null;
  studentType: string | null;
  student_case: string | null;
  gradeLevel: string |  null;
  dateOfPayment: string | null;
  amount: number | null;
  AttainmentUponGraduation: string | null;
  reportCard: string | null;
  escCert: string | null;
  HasEnrolledSibling: string | null;
  siblingName: string | null;
}

export const UploadSoaModal = () => {
  
  const { isOpen, close } = useUploadSoaModal();
  const { open: openDocument } = useShowDocumentModal();

  const [isLoading, setIsLoading] = useState(true);
  const [grandLoading, setGrandLoading] = useState(false);
  const [grant, setGrant] = useState("");
  const [esc, setEsc] = useState<number | never[]>(0);
  const [granted, setGranted] = useState(0);
  const [lrn, setLrn] = useState("");
  const [disInfo, setDisInfo] = useState<DIsInfo | null>(null);
  const [lrnLoading, setLrnLoading] = useState(false);
  const [page, setPage] = useState(1);


  const [tuition, setTuition] = useState("");
  const [miscellaneous, setMiscellaneous] = useState("");
  const [acad, setAcad] = useState("");
  const [sibling, setSibling] = useState("");
  const [other_discount, setOtherDiscount] = useState("");
  const [other_fees, setOtherFees] = useState("");
  const [escGrantee, setEscGrantee] = useState("");

  const [siblingSearch, setSiblingSearch] = useState("");
  const [searchResults, setSearchResults] = useState<{ student_id: number; fullName: string }[]>([]);
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [prevGrantee, setPrevGrantee] = useState("");
  const [prevAcadDiscount, setPrevAcadDiscount] = useState("");
  const [prevSiblingsDiscount, setPrevSiblingsDiscount] = useState("");

  const [pastTuition, setPastTuition] = useState<number>(0);
  const {open: openGrade} = useShowGradeModal();
  const [addTuition , setAddTuition] = useState(false);

  const handleOpenGrade = () => {
    openGrade(lrn);
    close();
  }

  const handleOpenDocument = () => {
    openDocument(disInfo?.reportCard ?? "");
    close();
  }

const handleClose = () => {
  // reset input fields
  setLrn("");
  setDisInfo(null);
  setGrant("");
  setGranted(0);
  setAcad("");
  setSibling("");
  setOtherDiscount("");
  setOtherFees("");
  setEscGrantee("");
  setSiblingSearch("");
  setSearchResults([]);
  setHasSearched(false);
  setPage(1);
  setPrevAcadDiscount("");
  setPrevGrantee("");
  setPrevSiblingsDiscount("");
  setTuition("");
  setMiscellaneous("");

  // finally close the modal
  close();
};

  const fetchESC = async () => {
    const esc = await getESC();
    setEsc(esc);
    setIsLoading(false);
  };


  useEffect(() => { 
      fetchESC(); 
  }, []);
  
  const handleAddGrant = async () => {
    setGrandLoading(true);
    const grantResult = await addGrant(Number(grant));
    toast.success(grantResult.message);

    await fetchESC(); 
    setGrandLoading(false);
  };



  const handleGetInfoByLrn = async () => {
    setLrnLoading(true);
    if (!/^\d{12}$/.test(lrn)) {
      setLrnLoading(false);
      toast.error("Invalid LRN. Please enter a valid 12-digit LRN.");
    return 
    }

    const isLRNexist = await isLrnExist(lrn);
    if (isLRNexist.length === 0) {
      setLrnLoading(false);
      toast.error("No student found with this LRN.");
    return
    }
    
    const check = await checkSoa(lrn);
    if (check.length > 0) {
      setLrnLoading(false);
      toast.error("This student already has been issued a tuition fee.");
    return
    }



    const info = await getInfo(lrn);
    setDisInfo(info[0]);
    setAcad(info[0].AttainmentUponGraduation ?? "");
    if (info[0]?.studentType === "Incoming G7" || info[0]?.studentType === "Transferee") {
      setSibling(info[0].HasEnrolledSibling ?? "")
    }

    const prev_discount = await prevDiscounts(lrn);
    if ((info[0]?.studentType === "Incoming G7") || (info[0]?.studentType === "Old Student" && info[0]?.student_case === "REGULAR" && prev_discount?.escGrant === 9000)) {
      setEscGrantee("Yes");
    }
    else {
      setEscGrantee("No");
    }
    //prev grantee yes and old student and regular

    setLrnLoading(false);
    if (!info || info.length === 0) {
      return toast.error("No student found with this LRN.");
    }

    const granted = await getGranted();
    setGranted(granted);

    setPrevGrantee(prev_discount?.escGrant === 9000 ? "Yes" : "No");
    if (info[0]?.studentType === "Old Student") {
      setSibling(prev_discount?.withSibling ?? "");
    }
    setPrevAcadDiscount(prev_discount?.academic_discount ?? "");
    setPrevSiblingsDiscount(prev_discount?.withSibling ?? "");

    if (info[0]?.studentType === "Old Student") {
      const remainingBalance = await getRemainingBalance(lrn);
      setPastTuition(remainingBalance);
    } 
    

  }

  const handleSearchSibling = async () => {
    if (!siblingSearch) return;
    setSearching(true);

    try {
      const results = await searchSibling(siblingSearch); 
      setSearchResults(results);
      setHasSearched(true);
    } catch (err) {
      console.error(err);
      toast.error("Error searching sibling names");
    }

    setSearching(false);
  };



  const handelAddTuition = async () => {
    setAddTuition(true);
    if (!/^\d{12}$/.test(lrn) ) {
      return toast.error("Invalid LRN. Please enter a valid LRN.");
    }
    const result = await addBreakDown(lrn, Number(tuition),  Number(miscellaneous), acad, sibling, Number(other_discount), Number(other_fees), escGrantee, disInfo?.studentType ?? "", pastTuition)
    toast.success(result.message);
    setAddTuition(false);
    close();
    window.location.reload();
  }




  return(
    <>
    <Dialog  open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:w-[600px] w-[290px]   bg-gray-50 rounded-lg shadow-lg ">
        <DialogHeader>
          <DialogTitle className="sm:text-xl  text-lg font-bold text-white bg-dGreen py-4 flex items-center justify-center rounded-t-lg">
            Add Tuition
          </DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="w-full flex items-center justify-center py-4">
            <Loader2 className="animate-spin text-dGreen " />
          </div>
        ): (
          <div className="max-h-[400px] overflow-y-auto  sm:px-7 px-3 ">
          {!esc ? (
            <div className="flex flex-col gap-[50px] items-center py-5">
              <section className="flex flex-row gap-5 justify-center items-center">
                <span className="font-bold font-merriweather text-lg text-dGreen">
                  Grant Allocated:
                </span>
                <input
                  type="text"
                  className="px-2 py-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg"
                  value={grant}
                  onChange={(e) => setGrant(e.target.value)}
                />
              </section>

              <Button
                variant="confirmButton"
                onClick={handleAddGrant}
                disabled={grandLoading}
                className="px-5 py-2 rounded-lg"
              >
                {grandLoading ? "Adding..." : "Add"}
              </Button>
            </div>
          ) : disInfo === null ? (
            <div className="flex flex-col items-center gap-8 py-5">
              <section className="flex sm:flex-row flex-col sm:items-center items-start sm:gap-5 gap-0 ">
                <span className="font-bold font-merriweather sm:text-[17px] text-xs text-dGreen ">
                  LRN:
                </span>
                <input
                  type="text"
                  placeholder="Enter LRN"
                  value={lrn}
                  onChange={(e) => setLrn(e.target.value)}
                  className="w-full sm:w-[210px] py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen  transition rounded-lg"
                />
              </section>

              <section>
                <Button
                  variant="confirmButton"
                  className="px-5 py-2 rounded-lg"
                  onClick={handleGetInfoByLrn}
                  disabled={lrnLoading}
                >
                  Submit
                </Button>
              </section>
              </div>
            ) : (
              <>
              {page === 1 && (
              <article className="flex flex-col gap-4 py-5">
                <section className="flex flex-col ">
                <span className="font-semibold text-sm text-dGreen mb-1">Student Information</span>

                  <div className="grid grid-cols-2 gap-5 bg-gray-100/50 shadow-lg border-2 rounded-lg p-4">
                    <section className="flex flex-col">
                      <span className="font-bold font-merriweather text-sm text-dGreen">Full Name</span>
                      <input readOnly value={disInfo.fullName ?? " "} className="py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" />
                    </section>

                    <section className="flex flex-col">
                      <span className="font-bold font-merriweather text-sm text-dGreen">Grade Level</span>
                      <input readOnly value={"Grade " + disInfo.gradeLevel} className="  py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" />
                    </section>

                    <section className="flex flex-col">
                      <span className="font-bold font-merriweather text-sm text-dGreen">Student Type</span>
                      <input readOnly value={disInfo.studentType ?? ""} className="   py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" />
                    </section>

                    <section className="flex flex-col">
                      <span className="font-bold font-merriweather text-sm text-dGreen">Academic Status</span>
                      <input readOnly value={disInfo.student_case ?? ""} className="   py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" />
                    </section>
                  </div>
                </section>

                {disInfo.studentType === "Incoming G7" && (
                  disInfo.AttainmentUponGraduation !== "N/a" ||
                  (disInfo.HasEnrolledSibling === "Yes" && disInfo.siblingName !== null) ||
                  escGrantee === "Yes"
                ) && (
                <section className="flex flex-col ">
                <span className="font-semibold text-sm text-dGreen mb-1">Discount Classification</span>
                    <div className="flex flex-col gap-5 bg-gray-100/50 shadow-lg border-2 rounded-lg p-4">
                      {(disInfo.AttainmentUponGraduation !== "N/a" || disInfo.reportCard !== null) && (
                        <div className="grid grid-cols-2 gap-7 ">
                          <section className="flex flex-col">
                            <span className="font-bold font-merriweather text-sm text-dGreen">Attainment Upon Graduation</span>
                            <select 
                              onChange={(e) => setAcad(e.target.value)} 
                              className=" py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" 
                              value={acad}>
                              
                              <option value="N/a">None</option>
                              <option value="With Honor">With Honor</option>
                              <option value="With High Honor"> With High Honor</option>
                              <option value="With Highest Honor"> With Highest Honor</option>
                            </select>
                          </section>

                          <section className="flex flex-col">
                            <span className="font-bold font-merriweather text-sm text-dGreen">Report Card</span>
                                <Button
                                  variant="confirmButton"
                                  className="px-4 py-1 rounded-lg"
                                  onClick={handleOpenDocument} 
                                >
                                  View Report Card
                                </Button>
                          </section>
                        </div>
                      )}


                      {disInfo.HasEnrolledSibling === "Yes" && disInfo.siblingName !== null && (
                        <div className="flex flex-col gap-4">
                          <div className="grid grid-cols-2 gap-7 ">
                            <section className="flex flex-col">
                              <span className="font-bold font-merriweather text-sm text-dGreen">has Sibling?</span>
                              <select 
                                value={sibling} 
                                onChange={(e) => setSibling(e.target.value)}
                                className=" py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg"
                              >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </section>

                            <section className="flex flex-col">
                              <span className="font-bold font-merriweather text-sm text-dGreen">Siblings Name</span>
                              <input readOnly value={disInfo.siblingName}  className="py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" />
                            </section>
                          </div>

                          {/* <div>
                            search func here
                          </div> */}
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-7 ">
                        <section className="flex flex-col">
                          <span className="font-bold font-merriweather text-sm text-dGreen">Grantees</span>
                          <p className="py-1.5 px-2 font-bold font-merriweather text-sm text-dGreen bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg">{granted} / {esc}</p>
                        </section>
                        <section className="flex flex-col">
                          <span className="font-bold font-merriweather text-sm text-dGreen">Esc Grantee</span>
                          <select 
                            value={escGrantee}
                            onChange={(e) => setEscGrantee(e.target.value)}
                            className=" py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg"
                          >
                            <option value="Yes">Yes</option>a
                          </select>
                          {/* <input readOnly value={ "Granted"} className="py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" /> */}
                        </section>

                      </div>
                    </div>
                </section>
                )}

                {disInfo.studentType === "Old Student" && (
                  prevAcadDiscount !== "N/a" ||
                  (disInfo.HasEnrolledSibling === "Yes" && disInfo.siblingName !== null) ||
                  prevSiblingsDiscount !== "N/a" ||
                  prevGrantee !== "N/a" ||
                  escGrantee !== "N/a" ||
                  disInfo?.reportCard
                ) && (
                <section className="flex flex-col ">
                <span className="font-semibold text-sm text-dGreen mb-1">Discount Classification</span>
                  <div className="flex flex-col gap-5 bg-gray-100/50 shadow-lg border-2 rounded-lg p-4">
                    <div className="grid grid-cols-3 gap-7 ">
                      <section className="flex flex-col">
                        <span className="font-bold font-merriweather text-sm text-dGreen">Past Acad discount</span>
                        <input 
                          type="text"
                          readOnly
                          value={prevAcadDiscount}
                          className="py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg"
                        />
                      </section>

                      <section className="flex flex-col">
                        <span className="font-bold font-merriweather text-sm text-dGreen">Grant Acad discount</span>
                        <select 
                          onChange={(e) => setAcad(e.target.value)} 
                          className=" py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" 
                          value={prevAcadDiscount}>
                          
                          <option value="N/a">N/a</option>
                          <option value="With Honor">With Honor</option>
                          <option value="With High Honor"> With High Honor</option>
                          <option value="With Highest Honor"> With Highest Honor</option>
                        </select>
                      </section>
                      {/* change to acad later on */}
                      <section className="flex flex-col">
                        <span className="font-bold font-merriweather text-sm text-dGreen">Grade Summary</span>
                          <Button
                            variant="confirmButton"
                            className="px-4 py-1 rounded-lg"
                            onClick={handleOpenGrade}
                          >
                            View Grade
                          </Button>
                      </section>
                    </div>

                    {disInfo.HasEnrolledSibling === "Yes" && disInfo.siblingName !== null && (
                      <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-7 ">
                          <section className="flex flex-col">
                            <span className="font-bold font-merriweather text-sm text-dGreen">Siblings Discount</span>
                            <input 
                              type="text"
                              readOnly
                              value={prevSiblingsDiscount}
                              className="py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg"
                            />
                          </section>
                          

                          <section className="flex flex-col">
                            <span className="font-bold font-merriweather text-sm text-dGreen">Siblings Name</span>
                            <input readOnly value={disInfo.siblingName}  className="py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" />
                          </section>
                        </div>

                        {/* <div>
                          search func here
                        </div> */}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-7 ">
      
                      <section className="flex flex-col">
                        <span className="font-bold font-merriweather text-sm text-dGreen">Prev. Grantee</span>
                        <input 
                          type="text"
                          readOnly
                          value={prevGrantee}
                          className="py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg"
                        />
                      </section>

                      <section className="flex flex-col">
                        <span className="font-bold font-merriweather text-sm text-dGreen">Current Eligibility</span>
                        <input 
                          type="text"
                          readOnly
                          value={escGrantee}
                          className="py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg"
                        />
                      </section>
                    </div>

                    </div>
                </section>
                )}

                {disInfo.studentType === "Transferee" &&(
                  disInfo.AttainmentUponGraduation !== "N/a" ||
                  (disInfo.HasEnrolledSibling === "Yes" && disInfo.siblingName !== null) ||
                  disInfo.escCert
                ) && (
                <section className="flex flex-col ">
                <span className="font-semibold text-sm text-dGreen mb-1">Discount Classification</span>
                  <div className="flex flex-col gap-5 bg-gray-100/50 shadow-lg border-2 rounded-lg p-4">
                  {disInfo.AttainmentUponGraduation !== "N/a" && (
                    <div className="grid grid-cols-2 gap-7 ">
                      <section className="flex flex-col">
                        <span className="font-bold font-merriweather text-sm text-dGreen">Academic Discount</span>
                        <select 
                          onChange={(e) => setAcad(e.target.value)} 
                          className=" py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" 
                          value={acad}>
                          
                          <option value="N/a">None</option>
                          <option value="With Honor">With Honor</option>
                          <option value="With High Honor"> With High Honor</option>
                          <option value="With Highest Honor"> With Highest Honor</option>
                        </select>
                      </section>

                      <section className="flex flex-col">
                        <span className="font-bold font-merriweather text-sm text-dGreen">Report Card</span>
                            <Button
                              variant="confirmButton"
                              className="px-4 py-1 rounded-lg"
                              onClick={handleOpenDocument}  // pass URL
                            >
                              View Report Card
                            </Button>
                      </section>
                    </div>
                  )}

                  {disInfo.HasEnrolledSibling === "Yes" && disInfo.siblingName !== null && (
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-7 ">
                        <section className="flex flex-col">
                          <span className="font-bold font-merriweather text-sm text-dGreen">has Sibling?</span>
                          <select 
                            value={sibling} 
                            onChange={(e) => setSibling(e.target.value)}
                            className=" py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg"
                          >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </section>

                        <section className="flex flex-col">
                          <span className="font-bold font-merriweather text-sm text-dGreen">Siblings Name</span>
                          <input readOnly value={disInfo.siblingName}  className="py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" />
                        </section>
                      </div>

   
                    </div>
                  )}

                  {disInfo?.escCert && (
                  <div className="grid grid-cols-2 gap-7 ">
                    <section className="flex flex-col">
                      <span className="font-bold font-merriweather text-sm text-dGreen">Esc Grantee</span>
                      <select 
                        value={escGrantee}
                        onChange={(e) => setEscGrantee(e.target.value)}
                        className=" py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg"
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      {/* <input readOnly value={ "Granted"} className="py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" /> */}
                    </section>

                    <section className="flex flex-col">
                      <span className="font-bold font-merriweather text-sm text-dGreen">ESC Certificate</span>
                        
                          <Button
                            variant="confirmButton"
                            className="px-4 py-1 rounded-lg"
                            onClick={() => openDocument(disInfo.escCert ?? "")}  // pass URL
                          >
                            View ESC Cert
                          </Button>
                      
                    </section>
                  </div>
                  )}
                  </div>
                </section>
              )}

              {(
                  (disInfo.studentType === "Incoming G7" && disInfo.HasEnrolledSibling === "Yes" &&  disInfo.siblingName !== null) || 
                  (disInfo.studentType === "Transferee" && disInfo.HasEnrolledSibling === "Yes" &&  disInfo.siblingName !== null)
                ) && (
                <section className="flex flex-col ">
                  <span className="font-semibold text-sm text-dGreen mb-1">Search Sibling</span>
                  <div className="flex flex-col gap-5 bg-gray-100/50 shadow-lg border-2 rounded-lg p-4 ">

                    <section className="flex flex-col gap-4 px-2 py-2">
                      <input 
                        type="text" 
                        placeholder="Enter sibling name"
                        value={siblingSearch}
                        onChange={(e) => setSiblingSearch(e.target.value)}
                        className="  py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg"
                      />         
                      <Button
                        variant="confirmButton"
                        onClick={handleSearchSibling}
                        disabled={searching}
                      >
                        {searching ? "Searching..." : "Search"}
                      </Button>           
                    </section>

                    {searchResults.length > 0 && (
                      <div className="mt-2 bg-gray-100 rounded-lg p-2 border max-h-40 overflow-y-auto">
                        {searchResults.map((s) => (
                          <div key={s.student_id} className="py-1 px-2 border-b last:border-b-0">
                            {s.fullName}
                          </div>
                        ))}
                      </div>
                    )}

                    {searchResults.length === 0 && hasSearched && siblingSearch && (
                      <span className="text-sm text-red-500 mt-1">No matching siblings found</span>
                    )}
                    
                  </div>
                </section>
                )}


            </article>
            )}

            {page === 2 && (
            <article  className="flex flex-col gap-8 py-5">
              <section className="flex flex-col ">
                <span className="font-semibold text-sm text-dGreen mb-1">Main Fees</span>
                <div className="flex sm:flex-row flex-col gap-5 bg-gray-100/50 shadow-lg border-2 rounded-lg p-4">
                  <section className="flex flex-col">
                    <span className="font-bold font-merriweather text-sm text-dGreen"><strong className="text-red-500 text-xs">*</strong> Tuition Fee</span>
                    <input 
                      type="text" 
                      placeholder="0"  
                      value={tuition} 
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, ""); 
                        setTuition(val);
                      }}
                      className="py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" />
                  </section>

                  <section className="flex flex-col">
                    <span className="font-bold font-merriweather text-sm text-dGreen"><strong className="text-red-500 text-xs">* </strong> Miscellaneous Fee</span>
                    <input 
                      type="text" 
                      placeholder="0" 
                      value={miscellaneous} 
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, ""); 
                        setMiscellaneous(val);
                      }}
                      className="py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" />
                  </section>
                </div>

              </section>

              {pastTuition > 0 && (
                <section className="flex flex-col ">
                  <span className="font-semibold text-sm text-dGreen mb-1">Remaing Balance</span>
                  <div className="flex sm:flex-row flex-col gap-5 bg-gray-100/50 shadow-lg border-2 rounded-lg p-4">
                    <section className="flex flex-col w-full">
                      <span className="font-bold font-merriweather text-sm text-dGreen">Unpaid Balance</span>
                      <input type="text"  value={pastTuition} disabled readOnly className="w-full py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" />
                    </section>
                  </div>
                </section>
              )}


              <section className="flex flex-col ">
                <span className="font-semibold text-sm text-dGreen mb-1">Discounts</span>
                <div className="flex sm:flex-row flex-col gap-5 bg-gray-100/50 shadow-lg border-2 rounded-lg p-4">
                
                  <section className="flex flex-col">
                    <span className="font-bold font-merriweather text-sm text-dGreen">ESC Grantee:</span>
                    <select 
                      value={escGrantee}
                      disabled
                      className=" py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg"
                    >
                      <option value="" className="text-center">No</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>                  
                  </section>  

                  <section className="flex flex-col">
                    <span className="font-bold font-merriweather text-sm text-dGreen">Academic Discount</span>
                    <select
                      value={acad}
                      disabled
                      className="py-1 px-2  outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg"  
                    >                     
                      <option value="">None</option>
                      <option value="With Honor">With Honor</option>
                      <option value="With High Honor" >With High Honor</option>
                      <option value="With Highest Honor">With Highest Honor</option>
                    </select> 
                  </section>

                  <section className="flex flex-col">
                    <span className="font-bold font-merriweather text-sm text-dGreen">Sibling Discount</span>
                    <select
                      value={sibling}
                      disabled
                      className="py-1 px-2  outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg"  
                    >                     
                      <option value="" className="text-center">None</option>
                      <option value="Yes" >Yes</option>
                      <option value="No">No</option>
                    </select> 
                  </section>

                </div>
              </section>

              <section className="flex flex-col ">
                  <span className="font-semibold text-sm text-dGreen mb-1">Additional</span>
                  <div className="flex sm:flex-row flex-col gap-5 bg-gray-100/50 shadow-lg border-2 rounded-lg p-4">
                    <section className="flex flex-col">
                      <span className="font-bold font-merriweather text-sm text-dGreen">Other discounts:</span>
                      <input 
                        type="text" 
                        placeholder="0"  
                        value={other_discount} 
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, ""); 
                          setOtherDiscount(val);
                        }}
                        className="py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" />
                    </section>

                    <section className="flex flex-col">
                      <span className="font-bold font-merriweather text-sm text-dGreen">Other fees:</span>
                      <input 
                        type="text" 
                        placeholder="0"  
                        value={other_fees} 
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, ""); 
                          setOtherFees(val);
                        }}
                        className="py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" />
                    </section>
                  </div>

              </section>



            </article>
            )}

            {page === 3 && (
              <article  className="flex flex-col gap-8 py-5">

                <section className="flex flex-col ">
                  <span className="font-semibold text-sm text-dGreen mb-1">Tuition Summary</span>
                  <div className="flex flex-col gap-5 bg-gray-100/50 shadow-lg border-2 rounded-lg p-4">
                    <table className="w-full text-sm">
                      <tbody>
                          <tr>
                          <td className="py-2">Tuition Fee</td>
                          <td className="text-right font-medium">₱{tuition}</td>
                          </tr>
                          <tr>
                          <td className="py-2">Miscellaneous Fee</td>
                          <td className="text-right font-medium">₱{miscellaneous}</td>
                          </tr>


                          <tr className="border-t">
                          <td className="py-2 font-semibold"></td>
                          <td className="text-right">₱{Number(tuition) + Number(miscellaneous)}</td>
                          </tr>

                          {escGrantee === "Yes"  && (
                          <tr>
                              <td className="py-2 text-red-600">Less: ESC Grant</td>
                              <td className="text-right text-red-600">-₱9000</td>
                          </tr>
                          )}
                          {acad !== "N/a" && (
                          <tr>
                              <td className="py-2 text-red-600">Less: {acad} Discount</td>
                              <td className="text-right text-red-600">-₱{acad === "With Honor" ? Math.ceil((Number(tuition) + Number(miscellaneous) - (escGrantee === "Yes" ? 9000 : 0)) * 0.20) : acad === "With High Honor" ? Math.ceil((Number(tuition) + Number(miscellaneous) - (escGrantee === "Yes" ? 9000 : 0)) * 0.50)  : acad === "With Highest Honor" ? Math.ceil((Number(tuition) + Number(miscellaneous) - (escGrantee === "Yes" ? 9000 : 0)) * 0.75)  : 0}</td>
                          </tr>
                          )}
                          {sibling === "Yes" && (
                          <tr>
                              <td className="py-2 text-red-600">Less: </td>
                              <td className="text-right text-red-600">-₱500</td>
                          </tr>
                          )}
                          {other_discount !== "" && (
                          <tr>
                              <td className="py-2 text-red-600">Less: Other Discount</td>
                              <td className="text-right text-red-600">-₱{other_discount}</td>
                          </tr>
                          )}

                          <tr className="border-t font-semibold">
                          <td className="py-2">Total Tuition & Misc.</td>
                          <td className="text-right">₱ {Number(tuition) + Number(miscellaneous) - (escGrantee === "Yes" ? 9000 : 0) - (acad === "With Honor" ? Math.ceil((Number(tuition) + Number(miscellaneous) - (escGrantee === "Yes" ? 9000 : 0)) * 0.20) : acad === "With High Honor" ? Math.ceil((Number(tuition) + Number(miscellaneous) - (escGrantee === "Yes" ? 9000 : 0)) * 0.50)  : acad === "With Highest Honor" ? Math.ceil((Number(tuition) + Number(miscellaneous) - (escGrantee === "Yes" ? 9000 : 0)) * 0.75)  : 0) - (sibling === "Yes" ? 500 : 0) - Number(other_discount )}</td>
                          {/* <td className="text-right">₱{tuition + miscellaneous - escGrant - academic_discount_amount - withSibling_amount - other_discount}</td> */}
                          </tr>

                          {pastTuition > 0 && (
                          <tr className="border-t font-semibold">
                              <td className="py-2">Unpaid Tuition</td>
                              <td className="text-right">₱{pastTuition}</td>
                          </tr>
                          )}

                          {other_fees !== "" && (
                          <tr>
                              <td className="py-2">Other Fees</td>
                              <td className="text-right">₱{other_fees}</td>
                          </tr>
                          )}

                          <tr className="border-t text-lg font-bold text-green-700">
                          <td className="py-3">Grand Total</td>
                          <td className="text-right">₱ {Number(tuition) + Number(miscellaneous) - (escGrantee === "Yes" ? 9000 : 0) - (acad === "With Honor" ? Math.ceil((Number(tuition) + Number(miscellaneous) - (escGrantee === "Yes" ? 9000 : 0)) * 0.20) : acad === "With High Honor" ? Math.ceil((Number(tuition) + Number(miscellaneous) - (escGrantee === "Yes" ? 9000 : 0)) * 0.50)  : acad === "With Highest Honor" ? Math.ceil((Number(tuition) + Number(miscellaneous) - (escGrantee === "Yes" ? 9000 : 0)) * 0.75)  : 0) - (sibling === "Yes" ? 500 : 0) - Number(other_discount ) + Number(other_fees) + (pastTuition > 0 ? pastTuition : 0)}</td>
                          </tr>
                      </tbody>
                    </table>
                  </div>

                </section>

                <section className="w-full text-center">
                  <Button
                    variant="confirmButton"
                    className="px-10 py-2 rounded-lg mb-5"
                    disabled={!tuition || !miscellaneous || addTuition }
                    onClick={handelAddTuition}
                  >
                    Submit
                  </Button>
              </section>

              </article>
            )}

            <article className="flex  justify-center mt-4 gap-10">
              <Button
                variant="prevButton"
                className="px-4 py-2 rounded-lg"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Prev
              </Button>
              <Button
                variant="prevButton"
                className="px-4 py-2 rounded-lg"
                disabled={page === 3 || (page === 2 && Number(tuition) === 0 && Number(miscellaneous) === 0)}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>     
            </article>

            </>
            
          )}

          </div>
        )}
        
      </DialogContent>
    </Dialog>

    <Document_Review />
    <Grade_Summary />

    </>
  );
};


