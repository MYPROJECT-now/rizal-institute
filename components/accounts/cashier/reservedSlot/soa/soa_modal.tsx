"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useShowDocumentModal, useShowGradeModal, useUploadSoaModal } from "@/src/store/CASHIER/reserved";
import { Button } from "@/components/ui/button";
import { addBreakDown, addGrant, getESC, getGranted, getInfo, prevDiscounts, searchSibling } from "@/src/actions/cashierAction";
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

  // const [fullName, setFullName] = useState("");
  // const [studentType, setStudentType] = useState("");
  // const [gradeLevel, setGradeLevel] = useState("");

  // const [dateOfPayment, setDateOfPayment] = useState("");
  // const [amount, setAmount] = useState("");

  // const [AttainmentUponGraduation, setAttainmentUponGraduation] = useState("");
  // const [reportCard, setReportCard] = useState("");

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
    setLrn("");
    close();
  }
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
      return toast.error("Invalid LRN. Please enter a valid 12-digit LRN.");
    }

    const info = await getInfo(lrn);
    setDisInfo(info[0]);
    setAcad(info[0].AttainmentUponGraduation ?? "");
    if (info[0]?.studentType === "Incoming G7" || info[0]?.studentType === "Transferee") {
      setSibling(info[0].HasEnrolledSibling ?? "")
    }


    if (info[0]?.studentType === "Incoming G7" || info[0]?.studentType === "Old Student" && info[0]?.student_case === "REGULAR") {
      setEscGrantee("Yes");
    }

    setLrnLoading(false);
    if (!info || info.length === 0) {
      return toast.error("No student found with this LRN.");
    }

    const granted = await getGranted();
    setGranted(granted);

    const prev_discount = await prevDiscounts(lrn);
    setPrevGrantee(prev_discount?.escGrant === 9000 ? "Yes" : "No");
    if (info[0]?.studentType === "Old Student") {
      setSibling(prev_discount?.withSibling ?? "");
    }
    setPrevAcadDiscount(prev_discount?.academic_discount ?? "");
    setPrevSiblingsDiscount(prev_discount?.withSibling ?? "");
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
    const result = await addBreakDown(lrn, Number(tuition),  Number(miscellaneous), acad, sibling, Number(other_discount), Number(other_fees), escGrantee, disInfo?.studentType ?? "")
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
                  onKeyDown={(e) => e.key === "Enter" && handleGetInfoByLrn()}
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

                <section className="flex flex-col ">
                  <span className="font-semibold text-sm text-dGreen mb-1">Discount Classification</span>
                  {disInfo.studentType === "Incoming G7" ? (
                    <div className="flex flex-col gap-5 bg-gray-100/50 shadow-lg border-2 rounded-lg p-4">
                      {disInfo.AttainmentUponGraduation !== "N/a" && disInfo.reportCard !== null && disInfo.reportCard !== "" && (
                        <div className="grid grid-cols-2 gap-7 ">
                          <section className="flex flex-col">
                            <span className="font-bold font-merriweather text-sm text-dGreen">Attainment Upon Graduation</span>
                            <select 
                              onChange={(e) => setAcad(e.target.value)} 
                              className=" py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" 
                              value={acad}>
                              
                              <option value="N/a">N/a</option>
                              <option value="With Honor">With Honor</option>
                              <option value="With High Honor"> With High Honor</option>
                              <option value="With Highest Honor"> With Highest Honor</option>
                            </select>
                          </section>

                          <section className="flex flex-col">
                            <span className="font-bold font-merriweather text-sm text-dGreen">Report Card</span>
                              {disInfo?.reportCard && (
                                <Button
                                  variant="confirmButton"
                                  className="px-4 py-1 rounded-lg"
                                  onClick={handleOpenDocument}  // pass URL
                                  // onClick={() => openDocument(disInfo.reportCard!)}  
                                >
                                  View Report Card
                                </Button>
                              )}
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
                  ) : (
                    disInfo.studentType === "Old Student" ? (
                    <div className="flex flex-col gap-5 bg-gray-100/50 shadow-lg border-2 rounded-lg p-4">
                      <div className="grid grid-cols-3 gap-7 ">
                        <section className="flex flex-col">
                          <span className="font-bold font-merriweather text-sm text-dGreen">Last Year&apos;s discount</span>
                          <input 
                            type="text"
                            readOnly
                            value={prevAcadDiscount}
                            className="py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg"
                          />
                        </section>

                        <section className="flex flex-col">
                          <span className="font-bold font-merriweather text-sm text-dGreen">Grant discount</span>
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

                        <section className="flex flex-col">
                          <span className="font-bold font-merriweather text-sm text-dGreen">Grade Summary</span>
                            {disInfo?.reportCard && (
                              <Button
                                variant="confirmButton"
                                className="px-4 py-1 rounded-lg"
                                onClick={handleOpenGrade}
                              >
                                View Grade
                              </Button>
                            )}
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
                    ) : (
                    disInfo.studentType === "Transferee" ? (
                    <div className="flex flex-col gap-5 bg-gray-100/50 shadow-lg border-2 rounded-lg p-4">
                      {disInfo.AttainmentUponGraduation !== "N/a" && disInfo.reportCard !== null && disInfo.reportCard !== "" && (
                        <div className="grid grid-cols-2 gap-7 ">
                          <section className="flex flex-col">
                            <span className="font-bold font-merriweather text-sm text-dGreen">Academic Discount</span>
                            <select 
                              onChange={(e) => setAcad(e.target.value)} 
                              className=" py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" 
                              value={acad}>
                              
                              <option value="N/a">N/a</option>
                              <option value="With Honor">With Honor</option>
                              <option value="With High Honor"> With High Honor</option>
                              <option value="With Highest Honor"> With Highest Honor</option>
                            </select>
                          </section>

                          <section className="flex flex-col">
                            <span className="font-bold font-merriweather text-sm text-dGreen">Report Card</span>
                              {disInfo?.reportCard && (
                                <Button
                                  variant="confirmButton"
                                  className="px-4 py-1 rounded-lg"
                                  onClick={handleOpenDocument}  // pass URL
                                >
                                  View Report Card
                                </Button>
                              )}
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
        
                    ) : null

                  ))}

                </section>
                {(disInfo.studentType === "Incoming G7" && disInfo.HasEnrolledSibling === "Yes" &&  disInfo.siblingName !== null) || (disInfo.studentType === "Transferee" && disInfo.HasEnrolledSibling === "Yes" &&  disInfo.siblingName !== null) && (
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
            <article  className="flex flex-col gap-8">
              <section className="flex flex-col ">
                  <span className="font-semibold text-sm text-dGreen mb-1">Main Fees</span>
                  <div className="flex sm:flex-row flex-col gap-5 bg-gray-100/50 shadow-lg border-2 rounded-lg p-4">
                    <section className="flex flex-col">
                      <span className="font-bold font-merriweather text-sm text-dGreen">Tuition Fee</span>
                      <input type="text" placeholder="0"  value={tuition} onChange={(e) => setTuition(e.target.value)} className="py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" />
                    </section>

                    <section className="flex flex-col">
                      <span className="font-bold font-merriweather text-sm text-dGreen">Miscellaneous Fee</span>
                      <input type="text" placeholder="0"  value={miscellaneous} onChange={(e) => setMiscellaneous(e.target.value)} className="py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" />
                    </section>
                  </div>

              </section>

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
                      <option value="" className="text-center"></option>
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
                      <option value="" className="text-center"></option>
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
                      <option value="" className="text-center"></option>
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
                      <input type="text" placeholder="0"  value={other_discount} onChange={(e) => setOtherDiscount(e.target.value)} className="py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" />
                    </section>

                    <section className="flex flex-col">
                      <span className="font-bold font-merriweather text-sm text-dGreen">Other fees:</span>
                      <input type="text" placeholder="0"  value={other_fees} onChange={(e) => setOtherFees(e.target.value)} className="py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" />
                    </section>
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
                disabled={page === 2}
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


