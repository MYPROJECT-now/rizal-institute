import Registrar_header  from "@/components/header/header_registrar";
import { EnrolleePAge } from "@/components/registrarsTable/enrollees/enrollessTable/enrolleePage";
import { Button } from "@/components/ui/button";
import RegistrarClientComponent from "@/components/validation/registrar_validate";
const RegistrarsEnrolleesTable = () => {
    return (
        <RegistrarClientComponent>
        <div className="w-full h-[750px] mt-3 mx-3 rounded-xl flex flex-col px-10  bg-page">
            <Registrar_header /> 
            <div className="w-full h-[620px] bg-white self-center  mt-10 rounded-lg ">
                <div className="h-[80px] w-full bg-lGreen font-merriweather text-3xl text-white items-center flex pl-5">
                    APPLICANT MANAGEMENT
                </div>
                 <div className="flex flex-row items-center mt-5 ml-10 gap-5">
                                <p className="font-bold text-xl text-dGreen font-merriweather">
                                    Filter By:
                                </p>
                                <input 
                                    type="text"
                                    placeholder="Name"
                                    className="border border-gray-600 p-2 rounded" 
                                />
                                <input 
                                    type="text"
                                    placeholder="LRN"
                                    className="border border-gray-600 p-2 rounded" 
                                />
                                <select name="Grade Level"  className="border border-gray-600 p-2 rounded w-[200px]">
                                    <option value=""> Grade 7</option>
                                    <option value=""> Grade 8</option>
                                    <option value=""> Grade 9</option>
                                    <option value=""> Grade 10</option>
                                </select>
                                <Button
                                    variant="mButton"
                                    className=" text-white px-7 py-4 rounded-lg"
                                >
                                    Clear Filter
                                </Button>
                            </div>
                
                < EnrolleePAge />
            </div>
        </div>
        </RegistrarClientComponent>
    );
};

export default RegistrarsEnrolleesTable;