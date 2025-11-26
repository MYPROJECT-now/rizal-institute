"use client";

import { Button } from "@/components/ui/button";
import { doubleEntry, full_payment, getPaymentMethodData, installments } from "@/src/actions/landingPage";
import { usePreviewModal } from "@/src/store/preview";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PreviewModal } from "../landing_page_portal/preview/preview_modal";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Tesseract from "tesseract.js";




export const PaymentSection = () => {

    const searchParams = useSearchParams();
    const trackingId = searchParams.get("trackingId");
    const router = useRouter();

    const [page, setPage] = useState(0);

    const [errors,setErrors] = useState<{ [key: string]: string }>({});
    // State for handling input value
    const [totalTuition, setTotalTuition] = useState(0);
    const [monthlyDues, setMonthlyDues] = useState<{ month: string; monthlyDues: number }[]>([]);
    const [downPayment, setDownPayment] = useState(0);
    const [pm, setPm] = useState("");

    const [mop, setMop] = useState("");
    const [reservationReceipt, setReservationReceipt] = useState<File | null>(null);
        
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isBankTransferSelected, setIsBankTransferSelected] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isGcashSelected, setIsGcashSelected] = useState(false);

    const gcashReceiptRef = useRef<HTMLInputElement>(null);
    const bankTransferReceiptRef = useRef<HTMLInputElement>(null);

    const [isLoading, setIsLoading] = useState(true);
    
    const { open: openPreview } = usePreviewModal();

    const [miscellaneous, setMiscellaneous] = useState(0);
    const [academic_discount, setAcademic_discount] = useState("");
    const [academic_discount_amount, setAcademic_discount_amount] = useState(0);
    const [withSibling, setWithSibling] = useState("");
    const [withSibling_amount, setWithSibling_amount] = useState(0);
    const [other_fees, setOther_fees] = useState(0);
    const [other_discount, setOther_discount] = useState(0);
    const [escGrant, setEscGrant] = useState(0);
    const [tuitionFee, setTuitionFee] = useState(0);
    const [pastTuition, setPastTuition] = useState(0);
    
    const [downpaymentOption, setDownpaymentOption] = useState("");
    const [customDownpayment, setCustomDownpayment] = useState<number | "">("");
    const [amountToPay, setAmountToPay] = useState(0);


    const [scannedRef, setScannedRef] = useState("");
    const [isScanning, setIsScanning] = useState(false);
    
const handleAmountToPay = () => {
    if(pm === "full_payment"){
        setAmountToPay(totalTuition);
    } else if (pm === "Installments"){
        setAmountToPay(Number(downpaymentOption) || customDownpayment || 0);
    } else {
        setAmountToPay(0);
    }
}

useEffect(() => {
    handleAmountToPay();
}, [pm, downpaymentOption, customDownpayment, totalTuition]);


// const recomputeMonthlyDues = (selectedDown: number) => {
//     const months = monthlyDues.map(d => d.month); // extract months only

//     const totalFee = totalTuition;
//     const finalPayable = totalFee - selectedDown; // remaining balance

//     if (finalPayable < 0) return; // prevent negative

//     const totalMonths = months.length;

//     const baseDue = Math.floor(finalPayable / totalMonths);
//     const remainder = finalPayable % totalMonths;

//     const updatedDues = months.map((m, index) => ({
//         month: m,
//         monthlyDues: baseDue + (index < remainder ? 1 : 0),
//     }));

//     setDownPayment(selectedDown);
//     setMonthlyDues(updatedDues);
// };
const recomputeMonthlyDues = (selectedDown: number) => {
    const months = monthlyDues.map(d => d.month);

    const totalFee = totalTuition;
    const finalPayable = totalFee - selectedDown;

    // 🚫 If downpayment is equal or above total tuition → no remaining balance
    if (finalPayable <= 0) {
        const zeroDues = months.map(m => ({
            month: m,
            monthlyDues: 0,
        }));

        setDownPayment(selectedDown);
        setMonthlyDues(zeroDues);
        return;
    }

    const totalMonths = months.length;

    const baseDue = Math.floor(finalPayable / totalMonths);
    const remainder = finalPayable % totalMonths;

    const updatedDues = months.map((m, index) => ({
        month: m,
        monthlyDues: baseDue + (index < remainder ? 1 : 0),
    }));

    setDownPayment(selectedDown);
    setMonthlyDues(updatedDues);
};

const handleDownpaymentOption = (value: string) => {
    setDownpaymentOption(value);

    if (value === "500") {
        recomputeMonthlyDues(500);
        setDownPayment(Number(value)); 
    } else if (value === "1000") {
        recomputeMonthlyDues(1000);
        setDownPayment(Number(value)); 
    } else if (value === "2000") {
        recomputeMonthlyDues(2000);
        setDownPayment(Number(value)); 
    } else if (value === "") {
        recomputeMonthlyDues(0);
        setCustomDownpayment("");
        setDownPayment(0);
    } else {
        // custom option – reset first
        setCustomDownpayment("");
        setDownPayment(0);
    }

};

const handleCustomDownpayment = (val: string) => {
    const amount = Number(val);
    setCustomDownpayment(Number(val));

    if (!isNaN(amount) && amount >= 0) {
        recomputeMonthlyDues(amount);
        setDownPayment(amount); 

    }
};

// const handleCustomDownpayment = (val: string) => {
//     const amount = Number(val);
//     setCustomDownpayment(amount);

//     // if empty, NaN, or negative → ignore
//     if (isNaN(amount) || amount < 0) return;

//     // 🚫 BLOCK if amount >= totalTuition
//     if (amount >= totalTuition) {
//         toast.error("Downpayment cannot be equal to or exceed total tuition.");
//         return;
//     }

//     // allowed → proceed
//     recomputeMonthlyDues(amount);
//     setDownPayment(amount);
// };


    useEffect(() => {
        if (trackingId) {
        
            // setLocalTrackingId(trackingId);
            const fetchStudentData = async () => {
                setIsLoading(true);
                try {
                    const data = await getPaymentMethodData(trackingId);

                    setTotalTuition(data.totalTuitionFee || 0);
                    setMonthlyDues(data.MonthlyDues || []);
                    setDownPayment(data.downPayment || 0);

                    setMiscellaneous(data.miscellaneous || 0);
                    setAcademic_discount(data.academic_discount || "");
                    setAcademic_discount_amount(data.academic_discount_amount || 0);
                    setWithSibling(data.withSibling || "");
                    setWithSibling_amount(data.withSibling_amount || 0);
                    setOther_fees(data.other_fees || 0);
                    setOther_discount(data.other_discount || 0);
                    setEscGrant(data.escGrant || 0);
                    setTuitionFee(data.tuitionFee || 0);
                    setPastTuition(data.pastTuition || 0)

                
                } catch (error) {
                    console.error("Error fetching student data:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchStudentData();
        }
    // }, [trackingId]);
    }, [trackingId]);


    useEffect(() => {
        if (!trackingId) {
        router.push('/');
        }
    }, [trackingId, router]);
    
    if (!trackingId) {
        return <p className="text-center text-red-500">No tracking ID found.</p>;
    }


    // Validation per page
const validatePage = async (): Promise<boolean> => {


    switch (page) {


    case 2:
        const newErrors: { [key: string]: string } = {};

        if (!mop.trim()) newErrors.mop = "Required";
        if (!reservationReceipt) newErrors.reservationReceipt = "Required";
        if(!scannedRef) newErrors.scannedRef = "Required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error("Please fill in all required fields.");
            return false;
        }

    return true;


        
    default:
    return true;
    }
};


const scanReferenceNumber = async (file: File) => {
  setIsScanning(true);
  try {
    const result = await Tesseract.recognize(file, "eng", {
      logger: (m) => console.log(m),
    });

    const text = result.data.text || "";

    // Remove spaces, newlines, etc.
    const cleaned = text.replace(/\s+/g, "");

    // Match 12–15 digit reference number
    const match = cleaned.match(/\d{12,15}/);

    if (match) {
      setScannedRef(match[0]);
      toast.success("Reference number detected!");
    } else {
      toast.error("No reference number found.");
    }

  } catch (err) {
    console.error(err);
    toast.error("Failed to scan reference number");
  }
  setIsScanning(false);
};


    const handleMopChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setMop(e.target.value);
        setIsGcashSelected(e.target.value === "GCash");
        setIsBankTransferSelected(e.target.value === "Bank Transfer");
        // Clear the receipt when payment method changes
        setReservationReceipt(null);
        if (gcashReceiptRef.current) gcashReceiptRef.current.value = "";
        if (bankTransferReceiptRef.current) bankTransferReceiptRef.current.value = "";
    };


    // const handleReceiptChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         setReservationReceipt(file);
    //     }
    // };
const handleReceiptChange = async (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setReservationReceipt(file);

  // auto-scan OCR
  await scanReferenceNumber(file);
};


    const previewImage = (file: File | null) => {
        if (!file) return;
            const reader = new FileReader();
                reader.onloadend = () => {
                    if (typeof reader.result === "string") {
                    openPreview(reader.result);
                    }
                };
            reader.readAsDataURL(file);
        };

    // const handleSubmit = async () => {
    //     setIsLoading(true);
    //     try {
    //         if (pm === "Installments") {  
    //             const data = await installments(trackingId, pm, downPayment, monthlyDues);
    //             toast.success(data.message);
    //             router.push("/");
    //         } else if (pm === "full_payment") {
    //             const uploadImage = async (file: File, folder: string) => {
    //                 const formData = new FormData();
    //                 formData.append('file', file);
    //                 formData.append('upload_preset', 'my_preset');
    //                 formData.append('folder', folder);
                
    //                 const response = await fetch('https://api.cloudinary.com/v1_1/dkfn4xy6q/image/upload', {
    //                     method: 'POST',
    //                     body: formData,
    //                 });
                
    //                 const data = await response.json();  
    //                 return data.secure_url;
    //             };

    //             const uploadReservationReceipt = reservationReceipt ? await uploadImage(reservationReceipt, 'reservationPayments') : "";
    //             const data = await full_payment(trackingId, pm, downPayment, totalTuition ,mop,  uploadReservationReceipt, monthlyDues);
    //             toast.success(data.message);
    //             router.push("/");
    //         }
    //         setIsLoading(false);
    //     } catch (error) {
    //         console.error("Something went wrong", error);
    //     }
    // };
    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const uploadImage = async (file: File, folder: string) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'my_preset');
                formData.append('folder', folder);
            
                const response = await fetch('https://api.cloudinary.com/v1_1/dkfn4xy6q/image/upload', {
                    method: 'POST',
                    body: formData,
                });
            
                const data = await response.json();  
                return data.secure_url;
            };

            const uploadReservationReceipt = reservationReceipt ? await uploadImage(reservationReceipt, 'reservationPayments') : "";

            if (pm === "Installments") {  
                const data = await installments(trackingId, pm, uploadReservationReceipt,mop ,  downPayment, monthlyDues, scannedRef);
                toast.success(data.message);
                router.push("/");
            } else if (pm === "full_payment") {

                const data = await full_payment(trackingId, pm, downPayment, totalTuition ,mop,  uploadReservationReceipt, monthlyDues, scannedRef);
                toast.success(data.message);
                router.push("/");
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Something went wrong", error);
        }
    };
const sections = [
    {
        title: (
            <div>
                <p className="text-[16px] md:text-2xl text-dGreen font-bold font-merriweather">
                    Section 1: Payment Option
                </p>
            </div>
            ),
        content: (
            <main className="w-full  flex flex-col gap-10 items-center "> 
            <div className="p-10 mt-5 shadow-lg rounded-lg flex flex-col gap-10">
                {isLoading ? (
                    <div className="w-full text-center text-2xl text-dGreen font-oswald flex flex-row justify-center gap-2"><strong className="font-bold">Total Tuition Fee:</strong> <Skeleton className="w-[100px] h-[30px]"/></div>
                    
                ) : (
                    <p className="w-full text-center text-2xl text-dGreen font-oswald"><strong className="font-bold">Total Tuition Fee:</strong> {totalTuition}</p>
                )}
                
                <div className="flex flex-col gap-2 w-[400px] text-start ">
                    <span className="sm:text-sm text-xs text-dGreen font-bold font-oswald">Payment Method</span>
                    <select 
                        className="border rounded-md px-3 h-[40px] w-full backdrop-blur-sm text-dGreen shadow-inner focus:ring-2 focus:ring-dGreen outline-none"
                        value={pm} 
                        onChange={(e) => setPm(e.target.value)}
                    >
                        <option value="">Select Payment Method</option>
                        <option value="Installments">Installments</option>
                        <option value="full_payment">Full Payment</option>
                    </select>
                </div>
            </div>
            </main>   
        ),
    },

    {
        title: (
            <div>
                <p className="text-2xl text-dGreen font-bold font-merriweather">
                    Section 2: Tuition Breakdown & Payment Guide
                </p>
            </div>
        ),
        content: (
        <main className="w-full mt-2 flex flex-col items-center justify-center">
            {isLoading ? (
                <div>
                <Loader2 className="animate-spin text-dGreen" />
                </div>
            ) : (
            <div className=" mt-5 flex flex-col  gap-10">

                <div className="mb-4 w-[1000px] self-center shadow-lg rounded-lg px-5 py-10">
                    <label className="font-semibold text-dGreen">Downpayment Options</label>
                    <select
                        value={downpaymentOption}
                        onChange={(e) => handleDownpaymentOption(e.target.value)}
                        className="border rounded px-3 h-[40px] w-full mt-2"
                    >
                        <option value="">Select Downpayment</option>
                        <option value="500">₱500</option>
                        <option value="1000">₱1000</option>
                        <option value="2000">₱2000</option>
                        <option value="custom">Custom Amount</option>
                    </select>

                    {downpaymentOption === "custom" && (
                        <input
                            type="number"
                            placeholder="Enter custom downpayment"
                            value={customDownpayment}
                            onChange={(e) => handleCustomDownpayment(e.target.value)}
                            className="border rounded px-3 h-[40px] w-full mt-3"
                        />
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2">
                
                {/* Left: Breakdown */}
                <div className="bg-white rounded-2xl border-gray-100 shadow-lg p-6 w-[400px]">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                    Tuition Breakdown
                    </h2>
                    <table className="w-full text-sm">
                    <tbody>
                        <tr>
                        <td className="py-2">Tuition Fee</td>
                        <td className="text-right font-medium">₱{tuitionFee}</td>
                        </tr>
                        <tr>
                        <td className="py-2">Miscellaneous Fee</td>
                        <td className="text-right font-medium">₱{miscellaneous}</td>
                        </tr>


                        <tr className="border-t">
                        <td className="py-2 font-semibold">Subtotal</td>
                        <td className="text-right">₱{tuitionFee + miscellaneous }</td>
                        </tr>

                        {escGrant > 0 && (
                        <tr>
                            <td className="py-2 text-red-600">Less: ESC Grant</td>
                            <td className="text-right text-red-600">-₱{escGrant}</td>
                        </tr>
                        )}
                        {academic_discount_amount > 0 && (
                        <tr>
                            <td className="py-2 text-red-600">Less: {academic_discount} Discount</td>
                            <td className="text-right text-red-600">-₱{academic_discount_amount}</td>
                        </tr>
                        )}
                        {withSibling === "yes" && (
                        <tr>
                            <td className="py-2 text-red-600">Less: </td>
                            <td className="text-right text-red-600">-₱{withSibling_amount}</td>
                        </tr>
                        )}
                        {other_discount > 0 && (
                        <tr>
                            <td className="py-2 text-red-600">Less: Other Discount</td>
                            <td className="text-right text-red-600">-₱{other_discount}</td>
                        </tr>
                        )}

                        <tr className="border-t font-semibold">
                        <td className="py-2">Total Tuition & Misc.</td>
                        <td className="text-right">₱{tuitionFee + miscellaneous - escGrant - academic_discount_amount - withSibling_amount - other_discount}</td>
                        </tr>
                        
                        {pastTuition > 0 && (
                        <tr className="border-t font-semibold">
                            <td className="py-2">Unpaid Balance</td>
                            <td className="text-right">₱{pastTuition}</td>
                        </tr>
                        )}

                        {other_fees > 0 && (
                        <tr>
                            <td className="py-2">Other Fees</td>
                            <td className="text-right">₱{other_fees}</td>
                        </tr>
                        )}
                        


                        <tr className="border-t text-lg font-bold text-green-700">
                        <td className="py-3">Grand Total</td>
                        <td className="text-right">₱{totalTuition}</td>
                        </tr>
                    </tbody>
                    </table>
                </div>

                {/* Right: Installment Schedule */}
                {monthlyDues.length > 0 ? (
                    <div className="bg-white rounded-2xl border-gray-100 shadow-lg p-6 w-[500px]">
                    <h2 className="text-lg font-semibold text-dGreen mb-4 border-b pb-2">
                        Installment Payment Scheme
                    </h2>

                    <div className="mb-4 flex justify-between">
                        <span className="font-medium">Down Upon Enrollment</span>
                        <span className="font-semibold text-green-600">₱{downPayment}</span>
                    </div>

                    <table className="w-full text-sm">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left p-2">Month</th>
                            <th className="text-right p-2">Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {monthlyDues.map((due, idx) => (
                            <tr key={idx}>
                                <td>{due.month}</td>
                                <td className="text-right">₱{due.monthlyDues.toFixed(2)}</td>
                            </tr>
                        ))}

                        </tbody>
                    </table>
                    </div>
                ) : (
                    <p>No monthly dues found.</p>
                )}
                </div>

            </div>  
            )}
            </main>

        ),

    },


    {
    title: (
        <div>
            <p className="text-[16px] md:text-2xl text-dGreen font-bold font-merriweather">
                Section 3: Payment Section
            </p>
        </div>
        ),
    content: (
        <main className="w-full flex flex-col gap-5"> 

            <section className=" md:flex md:grid-cols-2 grid-cols-1 justify-center gap-5 pb-10 w-full">

                <div className="w-full md:w-1/2 flex flex-col items-center gap-10 mt-5 px-0 xl:px-10" >
                    <p className="text-2xl font-bold text-dGreen font-merriweather text-center"> GCash Payment </p>

                    <Card className="w-full backdrop-blur-md bg-green-200/10 border border-green-300/20 shadow-lg rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-dGreen text-center text-2xl underline font-merriweather font-extrabold">Step 1: Send the payment</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-5">
                            <section className="flex justify-center gap-2">
                                <p className="font-bold text-lg text-dGreen ">
                                    Gcash: 091234567890
                                </p>
                                <button
                                onClick={() => {
                                navigator.clipboard.writeText("091234567890");
                                toast.success("Copied to clipboard");
                                }}>
                                    <Image
                                        src="/copy.png"
                                        alt="copy icon"
                                        width={20}
                                        height={20}
                                    />
                                </button>
                            </section>

                            <section className="font-regular text-md text-dGreen flex flex-row justify-center gap-3">
                                <p> Click this to download the QR Code</p>
                                <button
                                    onClick={() => {
                                    const link = document.createElement("a");
                                    link.href = "/qr.jpg";
                                    link.download = "qr.jpg";
                                    link.click();
                                    toast.success("QR Code downloaded");
                                }}>
                                    <Image
                                        src="/dl.png"
                                        alt="download icon"
                                        width={20}
                                        height={20}
                                    />
                                </button>
                            </section>
                        </CardContent>
                    </Card>
                    
                    <Card className="w-full backdrop-blur-md bg-green-200/10 border border-green-300/20 shadow-lg rounded-2xl"> 
                        <CardHeader> 
                            <CardTitle className="text-dGreen text-center text-2xl underline font-merriweather font-extrabold">Step 2: Upload proof of payment</CardTitle> 
                        </CardHeader> 
                        <CardContent className="flex flex-col gap-5"> 
                            <section className="flex flex-col items-center"> 
                                <div className="text-start"> 
                                    <p className="font-regular text-lg text-d2Green"> Make sure the <strong className="font-bold text-d2Green">Reference No.</strong> is clearly visible. </p> 
                                </div> 
                            </section> 
                            <section className="font-regular text-md text-dGreen flex flex-row justify-center gap-3"> 
                                <figure> 
                                    <Image 
                                        src="/image.png" 
                                        alt="receipt" 
                                        width={300} 
                                        height={200} 
                                    /> 
                                </figure> 
                            </section> 
                        </CardContent> 
                    </Card>
                </div>

                <div className=" my-10 md:my-0 bg-green-900 md:h-auto h-[4px] md:w-[2px] w-full" />

                <div className="w-full md:w-1/2 flex flex-col items-center gap-10 mt-5 px-0 xl:px-10" >
                    <p className="text-2xl font-bold text-dGreen font-merriweather text-center"> Bank Transfer </p>

                    <Card className="w-full backdrop-blur-md bg-green-200/10 border border-green-300/20 shadow-lg rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-dGreen text-center text-2xl underline font-merriweather font-extrabold">Step 1: Send the payment</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-5">
                            <section className="flex justify-center">
                                <div className="grid grid-cols-2 gap-y-2 gap-x-[80px] text-dGreen text-lg w-fit">
                                    <p className="font-bold">Bank Name:</p>
                                    <p className="font-semibold">BDO</p>

                                    <p className="font-bold">Account Name:</p>
                                    <p className="font-semibold">John Doe</p>

                                    <p className="font-bold">Account Number:</p>
                                    <p className="font-semibold">1234-5678-9101</p>
                                </div>
                            </section>

                            <section className="font-regular text-md text-dGreen flex flex-row justify-center gap-3">
                                <p> Click this to download the QR Code</p>
                                <button
                                    onClick={() => {
                                    const link = document.createElement("a");
                                    link.href = "/qr.jpg";
                                    link.download = "qr.jpg";
                                    link.click();
                                    toast.success("QR Code downloaded");
                                }}>
                                    <Image
                                        src="/dl.png"
                                        alt="download icon"
                                        width={20}
                                        height={20}
                                    />
                                </button>
                            </section>
                        </CardContent>
                    </Card>

                    <Card className="w-full backdrop-blur-md bg-green-200/10 border border-green-300/20 shadow-lg rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-dGreen text-center text-2xl underline font-merriweather font-extrabold">Step 2: Upload proof of payment</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-5">
                            <section className="flex flex-col items-center">
                                <div className="text-start">
                                    <p className="font-regular text-lg text-d2Green">
                                        Make sure the <strong className="font-bold text-d2Green">Reference No.</strong> is clearly visible.
                                    </p>
                                </div>
                            </section>

                            <section className="font-regular text-md text-dGreen flex flex-row justify-center gap-3">
                                <figure>
                                    <Image
                                        src="/bank.svg"
                                        alt="receipt"
                                        width={300}
                                        height={200}
                                    />
                                </figure>
                            </section>
                        </CardContent>
                    </Card>
                </div>

            </section>

            <section className="w-full flex flex-col gap-6 items-center justify-center">
                <PreviewModal />
                <Card className="w-full max-w-[700px] backdrop-blur-md bg-green-100/10 border border-green-300/30 shadow-xl rounded-2xl p-6">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-dGreen text-center font-merriweather">
                        Payment Section
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-6 items-center justify-center">
                        {/* Amount */}
                        <div className="flex flex-row gap-4 items-center w-full max-w-[500px]">
                            <label className="font-semibold font-merriweather text-dGreen text-lg w-[170px]">
                                Amount:
                            </label>
                            <input 
                                type="number" 
                                placeholder="500.00"
                                min="500"
                                step="0.01"
                                readOnly
                                className="rounded-md px-3 h-[40px] w-full backdrop-blur-sm text-dGreen shadow-inner outline-none"
                                value={amountToPay}
                            />
                        </div>

                        {/* Payment Method */}
                        <div className="flex flex-row gap-4 items-center w-full max-w-[500px]">
                            <label className="font-semibold font-merriweather text-dGreen text-lg w-[170px]">
                            Payment Method:
                        </label>
                        <select 
                            value={mop || ''}
                            className={`rounded-md px-3 h-[40px] w-full backdrop-blur-sm text-dGreen shadow-inner outline-none focus:ring-2 focus:ring-dGreen
                                ${errors.mop ? 'border border-red-600 bg-red-100' : ' bg-white/20'}`}
                            onChange={handleMopChange}
                        >
                            <option value="">Select Payment Method</option>
                            <option value="Gcash">GCash</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                        </div>

                        {/* Payment Receipt */}
                        <div className="flex flex-row gap-4 items-center w-full max-w-[500px]">
                            <label className="font-semibold font-merriweather text-dGreen text-lg w-[170px]">
                                Payment Receipt:
                            </label>


                        {reservationReceipt ? (
                            <div className="flex items-center gap-2 w-full">
                            <button
                                type="button"
                                onClick={() => previewImage(reservationReceipt)}
                                className="text-dGreen underline text-sm bg-white/20 backdrop-blur-sm rounded-md flex-1 text-left truncate pl-3 py-2 h-[45px] shadow-inner"
                                title="Click to preview"
                            >
                                {reservationReceipt.name}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                setReservationReceipt(null)
                                setScannedRef("");
                                if (gcashReceiptRef.current) gcashReceiptRef.current.value = "";
                                if (bankTransferReceiptRef.current) bankTransferReceiptRef.current.value = "";
                                }}
                                className="text-red-500 hover:text-red-700 font-bold"
                                title="Remove file"
                            >
                                ✕
                            </button>
                            </div>
                        ) : (
                            <div className="w-full ">
                                <input 
                                    type="file" 
                                    name="document"  
                                    accept="image/*"
                                    disabled={!mop}
                                    onChange={handleReceiptChange}
                                    className={`backdrop-blur-sm text-dGreen rounded-md p-2 w-full h-[45px] shadow-inner
                                    ${errors.reservationReceipt ? 'border border-red-600 bg-red-100' : ' bg-white/20'}`}
                                
                                />
                                <p className="text-xs text-dGreen/60 italic mt-1 pl-2">
                                    Image files only. No minimum size required.
                                </p>
                            </div>
                        )}

                        </div>
                        <div className="flex flex-row gap-4 items-center w-full max-w-[500px]">
                            <label className="font-semibold font-merriweather text-dGreen text-lg w-[170px]">
                                Reference No.:
                            </label>

                            <input
                                type="text"
                                value={scannedRef}
                                onChange={(e) => setScannedRef(e.target.value)}
                                placeholder="Enter reference number"
                                disabled={!mop || !reservationReceipt}
                                className={`rounded-md px-3 h-[40px] w-full backdrop-blur-sm text-dGreen shadow-inner outline-none focus:ring-2 focus:ring-dGreen
                                    ${errors.scannedRef ? 'border border-red-600 bg-red-100' : ' bg-white/20'}`}                            />
                        </div>

                        {isScanning && (
                        <p className="text-dGreen animate-pulse text-sm">Scanning reference number...</p>
                        )}

                
                        <p className="text-sm text-dGreen/80 italic text-center mt-4">
                            Please make sure your payment receipt and reference number are correct before proceeding.
                        </p>
                        
                    </CardContent>
                </Card>

            </section>



        </main>
            
    ),
},
{
    title: (
        <div>
            <p className="text-[16px] md:text-2xl text-dGreen font-bold font-merriweather">
                Section 4: Confirmation of Payment
            </p>
        </div>
    ),
    content: (
    <main className="w-full mt-10 flex flex-col items-center justify-center">
        <section className="bg-white/90 rounded-2xl shadow-xl border border-green-200   w-full grid grid-cols-2 items-center mb-8">
        <div className="mb-2 flex flex-col items-center px-10 py-10 ">
            <div className="flex items-center gap-2 mb-2">
            <svg className="w-7 h-7 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
            <span className="text-2xl font-bold text-dGreen font-merriweather">Note</span>
            </div>  
            <ul className="text-left text-d2Green text-lg font-medium space-y-2 pl-2">
            <li className="flex items-start gap-2"><span className="mt-1">•</span> Ensure that all the information you have provided is correct.</li>
            <li className="flex items-start gap-2"><span className="mt-1">•</span> Wait for the registrar to confirm your admission.</li>
            <li className="flex items-start gap-2"><span className="mt-1">•</span> You will receive an email about your admission along with your credentials.</li>
            </ul>
        </div>

        <div className="h-full bg-gradient-to-r from-lGreen to-dGreen rounded-r-2xl flex flex-col items-center justify-center px-8 py-10 shadow-md">
            <div className="flex flex-col items-center gap-2 mb-4">
            <span className="text-3xl font-bold text-white font-merriweather drop-shadow">Congratulations!</span>
            </div>
            <p className="text-white text-base text-center opacity-80">Thank you for choosing Rizal Institute. We look forward to seeing you thrive and grow with us!</p>
        </div>
        </section>

        <Button
        variant="mainButton"
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-[180px] h-[50px] text-xl rounded-xl bg-gradient-to-r from-lGreen to-dGreen text-white font-bold shadow-lg hover:scale-105 hover:from-green-400 hover:to-green-700 transition-all duration-200 disabled:opacity-60"
        >
        Submit
        </Button>
    </main>
    ),
}
    ];

    // const handlePrev = () => {
    //     if (page > 0) setPage(page - 1);

    // };

    // const handleNext  = async () => {
    //     if (page < sections.length - 1) setPage(page + 1);
    // };

const handleNext = async () => {
if (!(await validatePage())) return;

if (page === 0) {
    if (pm === "Installments") {
    setPage(1); // go to MonthlyDues
    } else if (pm === "full_payment") {
    setPage(2); // go to TotalTuition
    } else {
    toast.error("Please select a payment method first.");
    }
    return;
}

// After MonthlyDues (page 1) → jump to Payment Section (page 3)
// if (page === 1 && pm === "Installments") {
//     setPage(3);
//     return;
// }
if (page === 1 && pm === "Installments") {
    if (downPayment === 0) {
        toast.error("Please select a downpayment option.");
        return;
    }

    if (downPayment > 0 && downPayment < 500) {
        toast.error("Minimum downpayment is 500.");
        return;
    }

    if (downPayment > totalTuition) {
        toast.error("Downpayment cannot exceed the total tuition.");
        return;
    }
    setPage(2);
    return;
}

if (page === 2){
    const double_entry = await doubleEntry(scannedRef);
    if (double_entry) {
        toast.error("This receipt has already been used.");
        return;
    }
}   


// After TotalTuition (page 2) → jump to Payment Section (page 3)
if (page === 2 && pm === "full_payment") {
    setPage(3);
    return;
}


// From Payment Section (page 3) → Confirmation (page 4)
if (page === 3) {
    setPage(4);
if (!(await validatePage())) return;
    return;
}

// Default fallback
if (page < sections.length - 1) {
    setPage(page + 1);
}


};


const handlePrev = () => {
if (page === 3) {
    // From Payment Section → go back depending on mop
    if (pm === "Installments") {
    setPage(1); // back to MonthlyDues
    } else if (pm === "full_payment") {
    setPage(2); // back to TotalTuition
    }
    return;
}

if (page === 1 && pm === "Installments") {
    setPage(0); // back to Select Payment Method
    return;
}

if (page === 2 && pm === "full_payment") {
    setPage(0); // back to Select Payment Method
    return;
}

if (page > 0) {
    setPage(page - 1);
}
};


    return (
        <main className="min-h-[600px] w-full mt-2 p-5 flex flex-col">
            <div className="h-full ">
                <section className="w-full text-center">
                    <div className="flex justify-start" >
                        <Link href="/">
                        <div className="flex flex-row gap-2 items-end">
                            <Image
                                src="/arrow.png"
                                alt="back"
                                height={1000} 
                                width={1000}
                                className="w-[30px]  h-[30px]"
                            />
                            <p className="text-dGreen font-merriweather text-xl font-bold">Home</p>
                        </div>
                        </Link> 
                    </div>
                    {/* <RemarksModal /> */}
                    <p className="mt-[20px] text-xl md:text-2xl lg:text-3xl text-dGreen font-bold font-merriweather">
                        Junior High School - Payment Method Selection
                    </p>
                </section>

                {/* content */}
                <div className="flex-1 mt-[80px] mx-[70px] flex flex-col gap-3">
                    {sections[page].title}
                    <hr className="border-b-2 border-dGreen" />
                    {sections[page].content}
                </div>

                {/* buttona */}
                <div className="w-full flex justify-center gap-10 mt-[50px]">
                    <Button
                        variant="prevButton"
                        className="w-[65px] md:w-[100px] h-[40px] rounded-xl"
                        onClick={handlePrev}
                        disabled={page === 0}
                    >
                        Previous
                    </Button>
                    <span className="text-sm text-gray-600 self-center">
                        Page {page + 1} of {sections.length}
                    </span>
                    <Button
                        variant="prevButton"
                        className="w-[65px] md:w-[100px] h-[40px] rounded-xl"
                        onClick={handleNext}
                        disabled={page === sections.length - 1}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </main>
    )
};