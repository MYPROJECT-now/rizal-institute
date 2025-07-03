import Registrar_header  from "@/components/header/header_registrar";
import { GradeTable } from "@/components/registrar/grades/grades_registrar";
import RegistrarClientComponent from "@/components/validation/registrar_validate";
const RegistrarsStudentsTable = () => {
    return (
        <RegistrarClientComponent>
<<<<<<< HEAD:app/registrar/grades/page.tsx
        <div className="w-full max-h-full flex flex-col px-10 bg-page sm:text-sm md:text-base lg:text-lg ">
            <Registrar_header /> 
            <div className="w-full h-auto bg-white self-center mt-3 rounded-lg ">
                <div className="h-[80px] w-full bg-lGreen font-merriweather text-lg lg:text-3xl text-white items-center flex pl-5">
=======
        <div className="w-full h-[680px] mt-3 mx-3 rounded-xl flex flex-col px-10  bg-page">
            <Registrar_header /> 
            <div className="w-full h-[540px] bg-white self-center  mt-10 rounded-lg ">
                <div className="h-[80px] w-full bg-lGreen font-merriweather text-3xl text-white items-center flex pl-5">
>>>>>>> 69fa2d4498f24bef8e4bb818cf37c25028ffe2c1:app/ACCOUNTS/registrar/grades/page.tsx
                    GRADE MANAGEMENT
                </div>
                <GradeTable />
            </div>
        </div>
        </RegistrarClientComponent>
    );
};

export default RegistrarsStudentsTable;