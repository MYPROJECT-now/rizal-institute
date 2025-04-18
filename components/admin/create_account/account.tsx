import { Button } from "@/components/ui/button";

export const CreateAccount = () => {
    return (
        <div className="w-full mt-[50px] flex flex-row items-center justify-center  gap-10 ">
            <div className="w-[460px] h-[360px] bg-page flex flex-col items-center justify-center gap-10 pt-5 rounded-xl">
                <p className="font-merriweather text-dGreen text-xl font-bold">
                    REGISTRAR ACCOUNT
                </p>
                <div className="flex flex-col">
                    <label 
                        htmlFor=""
                        className="font-semibold text-lg text-dGreen font-merriweather">
                        Username
                    </label>
                    <input 
                    type="text"
                    className="w-[350px] h-[30px]" />
                </div>
                <div className="flex flex-col">
                    <label 
                        htmlFor=""
                        className="font-semibold text-lg text-dGreen font-merriweather">
                        Email
                    </label>
                    <input 
                    type="text"
                    className="w-[350px] h-[30px]" />
                </div>
                <Button
                    variant="mButton"
                    className="w-[200px] p-5 rounded-lg"
                >
                    Create
                </Button>
            </div>

            <div className="w-[460px] h-[360px] bg-page flex flex-col items-center justify-center gap-10 pt-5 rounded-xl">
                <p className="font-merriweather text-dGreen text-xl font-bold">
                    CASHIER ACCOUNT
                </p>
                <div className="flex flex-col">
                    <label 
                        htmlFor=""
                        className="font-semibold text-lg text-dGreen font-merriweather">
                        Username
                    </label>
                    <input 
                    type="text"
                    className="w-[350px] h-[30px]" />
                </div>
                <div className="flex flex-col">
                    <label 
                        htmlFor=""
                        className="font-semibold text-lg text-dGreen font-merriweather">
                        Email
                    </label>
                    <input 
                    type="text"
                    className="w-[350px] h-[30px]" />
                </div>
                <Button
                    variant="mButton"
                    className="w-[200px] p-5 rounded-lg"
                >
                    Create
                </Button>
            </div>
        </div>
    );
};