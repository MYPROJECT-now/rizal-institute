import { MyClasses } from "@/components/accounts/teacher/class/class";
import { getSelectedYearNumber } from "@/src/actions/utils/getSelectedYear";
const MyClassesTable = () => {
    const year = async () => await getSelectedYearNumber()
    return (
        <div className="flex-1 flex flex-col  rounded-t-lg  lg:px-5 px-0 ">
            <section className="w-full  bg-white self-center lg:mt-2 mt-0">
                <header className="  rounded-t-lg bg-lGreen font-bold font-merriweather  tracking-[2px]   text-white sm:pl-5 pl-2 sm:py-5 py-4 text-sm sm:text-lg lg:text-xl lg:border-0 border-x-2 border-t-2 border-white">
                    MY CLASS | A.Y. {year()} 
                </header>
                <MyClasses />
            </section>
        </div>
    );
};

export default MyClassesTable;