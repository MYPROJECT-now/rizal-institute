  // "use client";

  // import React, { useEffect, useState } from "react";
  // import {
  //   Dialog,
  //   DialogContent,
  //   DialogHeader,
  //   DialogTitle,
  // } from "@/components/ui/dialog";
  // import { useUploadSoaModal } from "@/src/store/CASHIER/reserved";
  // import { Button } from "@/components/ui/button";
  // import { addBreakDown, addGrant, getESC, isAcademicYearActive } from "@/src/actions/cashierAction";
  // import { Loader2 } from "lucide-react";
  // import { toast } from "sonner";



  // export const UploadSoaModal = () => {
  //   const [esc, setEsc] = useState<number | never[]>(0);
  //   const [isLoading, setIsLoading] = useState(true);
  //   const { isOpen, close } = useUploadSoaModal();

  //   const [grant, setGrant] = useState("");

  //   const [lrn, setLrn] = useState("");
  //   const [tuition, setTuition] = useState("");
  //   const [miscellaneous, setMiscellaneous] = useState("");
  //   const [acad, setAcad] = useState("");
  //   const [sibling, setSibling] = useState("");
  //   const [other_discount, setOtherDiscount] = useState("");
  //   const [other_fees, setOtherFees] = useState("");

  //   const [grandLoading, setGrandLoading] = useState(false);
  //   const [tuitionLoading, setTuitionLoading] = useState(false);

  //   const [isActive, setIsActive] = useState(true);

  //   const handleLrnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setLrn(event.target.value);
  //   };
  //   const fetchESC = async () => {
  //     const esc = await getESC();
  //     setEsc(esc);
  //     setIsLoading(false);
  //   };

  //   useEffect(() => {
  //     const fetchIsActive = async () => {
  //       const active = await isAcademicYearActive();
  //       setIsActive(active);
  //     };

  //     fetchIsActive();
  //   }, []);

  //   useEffect(() => { 
  //       fetchESC(); 
  //   }, []);


  //   const handleAddGrant = async () => {
  //     setGrandLoading(true);
  //     const grantResult = await addGrant(Number(grant));
  //     toast.success(grantResult.message);

  //     await fetchESC(); // re-fetch after inserting
  //     setGrandLoading(false);
  //   }

  //   const handleClose = () => {
  //     close();
  //     setGrant("");
  //     setLrn("")
  //     setTuition("");
  //     setMiscellaneous("");
  //     setAcad("")
  //     setSibling("")
  //     setOtherDiscount("");
  //     setOtherFees("");
  //   };

  //   const handelAddTuition = async () => {
  //     setTuitionLoading(true);
  //     if (!/^\d{12}$/.test(lrn) ) {
  //       return toast.error("Invalid LRN. Please enter a valid LRN.");
  //     }
  //     const result = await addBreakDown(lrn, Number(tuition),  Number(miscellaneous), acad, sibling, Number(other_discount), Number(other_fees))
  //     toast.success(result.message);
  //     handleClose();
  //     setTuitionLoading(false);
  //     await fetchESC();
  //     window.location.reload();
  //   }


  //   return(
  //     <Dialog  open={isOpen} onOpenChange={handleClose}>
  //       <DialogContent className="sm:w-[580px] w-[290px]   bg-gray-50 rounded-lg shadow-lg ">
  //         <DialogHeader>
  //           <DialogTitle className="sm:text-xl  text-lg font-bold text-white bg-dGreen py-4 flex items-center justify-center rounded-t-lg">
  //             Add Tuition
  //           </DialogTitle>
  //         </DialogHeader>
  //         {isLoading ? (
  //           <div className="w-full flex items-center justify-center">
  //             <Loader2 className="animate-spin text-dGreen " />
  //           </div>
  //         ): (
  //           <div className="max-h-[400px] overflow-y-auto sm:pt-5 pt-2 sm:px-7 px-3 ">
  //             {esc !== 0 ? (
  //               <div className="flex flex-col gap-8">
  //                 <section className="flex sm:flex-row flex-col sm:items-center items-start sm:gap-5 gap-0 ">
  //                   <span className="font-bold font-merriweather sm:text-[17px] text-xs text-dGreen ">LRN:</span>
  //                   <input 
  //                     type="text" 
  //                     placeholder="Enter LRN" 
  //                     value={lrn} onChange={handleLrnChange} 
  //                     className="w-full sm:w-[210px] py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" 
  //                   />
  //                 </section>

  //                 <section className="flex flex-col ">
  //                     <span className="font-semibold text-sm text-dGreen mb-1">Main Fees</span>
  //                     <div className="flex sm:flex-row flex-col gap-5 bg-gray-100/50 shadow-lg border-2 rounded-lg p-4">
  //                       <section className="flex flex-col">
  //                         <span className="font-bold font-merriweather text-sm text-dGreen">Tuition Fee</span>
  //                         <input type="text" placeholder="0"  value={tuition} onChange={(e) => setTuition(e.target.value)} className="py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" />
  //                       </section>

  //                       <section className="flex flex-col">
  //                         <span className="font-bold font-merriweather text-sm text-dGreen">Miscellaneous Fee</span>
  //                         <input type="text" placeholder="0"  value={miscellaneous} onChange={(e) => setMiscellaneous(e.target.value)} className="py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" />
  //                       </section>
  //                     </div>

  //                 </section>

  //                 <section className="flex flex-col ">
  //                     <span className="font-semibold text-sm text-dGreen mb-1">Discounts</span>
  //                     <div className="flex sm:flex-row flex-col gap-5 bg-gray-100/50 shadow-lg border-2 rounded-lg p-4">
  //                       <section className="flex flex-col">
  //                         <span className="font-bold font-merriweather text-sm text-dGreen">ESC Remaining:</span>
  //                         <input type="text" value={esc} readOnly className="py-1 px-2 sm:w-[130px] w-full outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" />
  //                       </section>

  //                       <section className="flex flex-col">
  //                         <span className="font-bold font-merriweather text-sm text-dGreen">Academic Discount</span>
  //                         <select
  //                           name="acads"
  //                           value={acad}
  //                           onChange={(e) => setAcad(e.target.value)}
  //                           className="py-1 px-2  outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg"  
  //                         >                     
  //                           <option value="text" className="text-center">--- Select ---</option>
  //                           <option value="With Honor">With Honors</option>
  //                           <option value="With High Honor" >With High Honors</option>
  //                           <option value="With Highest Honor">With Highest Honors</option>
  //                         </select> 
  //                       </section>

  //                       <section className="flex flex-col">
  //                         <span className="font-bold font-merriweather text-sm text-dGreen">Sibling Discount</span>
  //                         <select
  //                           value={sibling}
  //                           onChange={(e) => setSibling(e.target.value)}
  //                           name="acads"
  //                           className="py-1 px-2  outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg"  
  //                         >                     
  //                           <option value="text" className="text-center">--- Select ---</option>
  //                           <option value="yes" >yes</option>
  //                           <option value="no">no</option>
  //                         </select> 
  //                       </section>
  //                     </div>

  //                 </section>

  //                 <section className="flex flex-col ">
  //                     <span className="font-semibold text-sm text-dGreen mb-1">Additional</span>
  //                     <div className="flex sm:flex-row flex-col gap-5 bg-gray-100/50 shadow-lg border-2 rounded-lg p-4">
  //                       <section className="flex flex-col">
  //                         <span className="font-bold font-merriweather text-sm text-dGreen">Other discounts:</span>
  //                         <input type="text" placeholder="0"  value={other_discount} onChange={(e) => setOtherDiscount(e.target.value)} className="py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" />
  //                       </section>

  //                       <section className="flex flex-col">
  //                         <span className="font-bold font-merriweather text-sm text-dGreen">Other fees:</span>
  //                         <input type="text" placeholder="0"  value={other_fees} onChange={(e) => setOtherFees(e.target.value)} className="py-1 px-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" />
  //                       </section>
  //                     </div>

  //                 </section>

  //                 <section className="w-full text-center">
  //                   <Button
  //                     variant="confirmButton"
  //                     className="px-5 py-2 rounded-lg"
  //                     disabled={tuitionLoading || !isActive || !tuition}
  //                     onClick={handelAddTuition}
  //                   >
  //                     {tuitionLoading ? "Adding..." : "Add"}
  //                   </Button>

  //                 </section>

  //               </div>
  //             ) : (
  //               <div className="flex flex-col gap-[50px]  items-center">
  //                 <section className="flex flex-row gap-5 justify-center items-center">
  //                   <span className="font-bold font-merriweather text-lg text-dGreen">Assign Grant available:</span>
  //                   <input 
  //                     type="text" 
  //                     className="px-2 py-2 outline-none bg-green-100 focus:ring-2 focus:ring-dGreen focus:border-dGreen transition rounded-lg" 
  //                     value={grant}
  //                     onChange={(e) => setGrant(e.target.value)}
  //                   />
  //                 </section>

  //                 <Button
  //                   variant="confirmButton"
  //                   onClick={handleAddGrant}
  //                   disabled={grandLoading}
  //                   className="px-5 py-2 rounded-lg"
  //                 >
  //                   {grandLoading ? "Adding..." : "Add"}
  //                 </Button>
  //               </div>
  //             )}
  //           </div>
  //         )}
          
  //       </DialogContent>
  //     </Dialog>
  //   );
  // };

  
