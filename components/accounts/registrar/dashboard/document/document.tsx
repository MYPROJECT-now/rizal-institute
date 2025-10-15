import Image from "next/image";
import {  getTotalDocuments } from "@/src/actions/registrarAction";
import { getSelectedYear } from "@/src/actions/utils/getSelectedYear";
import { toast } from "sonner";

type StudentDocument = {
  hasBirth: boolean | null;
  hasReportCard: boolean | null;
  hasGoodMoral: boolean | null;
  hasIdPic: boolean | null;
  hasForm137: boolean | null;
  hasExitForm: boolean | null;
  hasITR: boolean | null;
  hasEscCert: boolean | null;
  studentType: string | null;
  schoolType: string | null;
  escGrantee:  string  | null;
};

const getDocumentStatus = (s: StudentDocument) => {
  const docs = {
    birth: s.hasBirth,
    reportCard: s.hasReportCard,
    goodMoral: s.hasGoodMoral,
    idPic: s.hasIdPic,
    form137: s.hasForm137,
    exitForm: s.hasExitForm,
    itr: s.hasITR,
    escCert: s.hasEscCert,
  };

  let requiredDocs: (keyof typeof docs)[] = [];

  if (s.studentType === "Incoming G7" && s.schoolType === "Public") {
    requiredDocs = ["birth", "reportCard", "goodMoral", "idPic", "form137", "itr"];
  } else if (s.studentType === "Incoming G7" && s.schoolType === "Private") {
    requiredDocs = ["birth", "reportCard", "goodMoral", "idPic", "form137", "itr", "exitForm"];
  } else if (s.schoolType === "Private" && s.studentType === "Transferee" && s.escGrantee === "Yes") {
    requiredDocs = ["birth", "reportCard", "goodMoral", "idPic", "form137", "exitForm", "escCert"];
  } else if ((s.schoolType === "Private" || s.schoolType === "Public") && s.studentType === "Transferee") {
    requiredDocs = ["birth", "reportCard", "goodMoral", "idPic", "form137", "exitForm"];
  }

  const hasAll = requiredDocs.every((key) => docs[key]);
  if (hasAll) return "Complete";

  const hasSome = requiredDocs.some((key) => docs[key]);
  if (hasSome) return "Incomplete";

  return "None";
};
export const DocumentStatus = async () => {



  const selectedYear = await getSelectedYear();
  if (!selectedYear) return toast.error("No selected academic year.");

  const documents = await getTotalDocuments();

  // Count per document status
  const counts = { Complete: 0, Incomplete: 0, None: 0 };

  if (documents && documents.length > 0) {
    for (const doc of documents) {
      const status = getDocumentStatus(doc);
      counts[status as keyof typeof counts]++;
    }
  } else {
    // No records found = treat as "None"
    counts.None = 0; // can stay 0 or handle elsewhere depending on data model
  }


    return (
        <div className="grid sm:grid-cols-3 grid-cols-2 gap-3">

            <section className=" py-2 gap-10 bg-Green text-white rounded-lg flex flex-row justify-center items-center">
                <div className=" flex flex-col text-center font-sans">
                    <p className="font-bold xl:text-[15px] lg:text-[12px]">
                        Complete Documents
                    </p>
                    <p className="font-bold text-[15px]">
                       {counts.Complete}
                    </p>
                </div>
                <div>
                    <Image
                        src="/done.png"
                        alt="done"
                        width={1000}
                        height={1000}
                        className="w-[40px] h-[40px] lg:block hidden"
                    />
                </div>
            </section>

            <section className=" py-2 gap-10 bg-yellow-500 text-white rounded-lg flex flex-row justify-center items-center">
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold xl:text-[15px] lg:text-[12px]">
                        Incomplete Documents
                    </p>
                    <p className="font-bold text-[15px]">
                       {counts.Incomplete}
                    </p>
                </div>
                <div>
                    <Image
                        src="/incom.png"
                        alt="cup"
                        width={1000}
                        height={1000}
                        className="w-[40px] h-[40px] lg:block hidden"
                    />
                </div>
            </section>

            <section className=" py-2 gap-10 bg-red-600 text-white rounded-lg flex flex-row justify-center items-center">
                <div className="flex flex-col text-center font-sans">
                    <p className="font-bold xl:text-[15px] lg:text-[12px]">
                        No Documents
                    </p>
                    <p className="font-bold text-[15px]">
                        {counts.None}
                    </p>
                </div>
                <div>
                    <Image
                        src="/no.png"
                        alt="cup"
                        width={1000}
                        height={1000}
                        className="w-[40px] h-[40px] lg:block hidden"
                     />
                </div>
            </section>

           
        </div>
    );
};