import { Button } from "@/components/ui/button";

const EnrollmentPage = () => {
    return (
        <div className="flex flex-col mx-[60px] my-5">
            {/* first section */}
            <div className="flex flex-col py-10 gap-10">
                <p className="font-bold font-merriweather text-4xl text-center text-lGreen">High School Admission Application</p>
                <div className="h-[80px] w-[250px] rounded-lg bg-slGreen">
                    <p className="font-extralight font-oswald text-lg text-center text-red-500 p-2">
                    *Please ensure all fields are correctly filled before submitting
                    </p>
                </div>
              
            </div>
            {/* end of first section */}

            {/* second section */}
            <div className="flex flex-col gap-2 mb-10">
                <p className="font-bold font-merriweather text-2xl text-lGreen">
                    Section 1: Personal Information
                </p>
                <hr className="border-2 border-solid border-dGreen w-full" />
                {/* first row */}
                <div className="w-full h-[40px] flex items-center gap-5">
                    <label htmlFor="Name" className="font-medium font-oswald text-xl text-lGreen">Full Name:</label>
                    <input type="firstName" placeholder="First Name" className="w-[250px] h-[35px] rounded-lg px-2 bg-gray-300/50" />
                    <input type="middleName" placeholder="Middle Name" className="w-[250px] h-[35px] rounded-lg px-2 bg-gray-300/50" />
                    <input type="LastName" placeholder="Last Name" className="w-[250px] h-[35px] rounded-lg px-2 bg-gray-300/50 "/>
                    <input type="Suffix" placeholder="Suffix" className="w-[100px] h-[35px] rounded-lg px-2 bg-gray-300/50 "/>
                </div>
               
               {/* second row */}
                <div className="w-full h-[40px] flex flex-row items-center gap-10">
                    <div className="flex flex-row gap-2">
                    <label htmlFor="DateOfBirth" className="font-medium font-oswald text-xl text-lGreen">Date of Birth:</label>
                    <input type="date" name="DateOfBirth" className="w-[250px] h-[35px] rounded-lg px-2 bg-gray-300/50 "  />
                    </div>

                    <div className="flex flex-row gap-2">
                    <label htmlFor="Age" className="font-medium font-oswald text-xl text-lGreen">Age:</label>
                    <input type="age" placeholder="Age" className="w-[250px] h-[35px] rounded-lg px-2 bg-gray-300/50 " />
                    </div>

                    <div className="flex flex-row gap-5">
                        <label htmlFor="Gender" className="font-medium font-oswald text-xl text-lGreen">Gender:</label>
                        <select className=" bg-gray-300/50 h-[36px] w-[200px] rounded-lg font-sans ">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>

                {/* third row */}
                <div className="w-full h-[40px] flex flex-row items-center gap-10">
                    <div className="flex flex-row gap-5">
                        <label htmlFor="Civil Status" className="font-medium font-oswald text-xl text-lGreen">Civil Status:</label>
                        <select className=" bg-gray-300/50 h-[36px] w-[200px] rounded-lg font-sans  ">
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>    
                        </select>
                    </div>

                    <div className="flex flex-row gap-2">
                    <label htmlFor="Nationality" className="font-medium font-oswald text-xl text-lGreen">Nationality:</label>
                    <input type="text" placeholder="FIlipino" className="w-[250px] h-[35px] rounded-lg px-2 bg-gray-300/50 " />
                    </div>

                    <div className="flex flex-row gap-2">
                    <label htmlFor="Religion" className="font-medium font-oswald text-xl text-lGreen">Religion:</label>
                    <input type="text" placeholder="Catholic" className="w-[250px] h-[35px] rounded-lg px-2 bg-gray-300/50 " />
                    </div>
                </div>
            </div>


            {/* third section */}
            <div className="flex flex-col gap-2 mb-10">
                <p className="font-bold font-merriweather text-2xl text-lGreen">
                 Section 2: Contact & Guardian Details
                </p>
                <hr className="border-2 border-solid border-dGreen w-full" />
                {/* first row */}
                <div className="w-full h-[40px] flex items-center gap-5">
                    <label htmlFor="adress" className="font-medium font-oswald text-xl text-lGreen">Full Address:</label>
                    <input type="text" placeholder="123 Main St, City, Country" className="w-[600px] h-[35px] rounded-lg px-2 bg-gray-300/50" />
                </div>
               
               {/* second row */}
                <div className="w-full h-[40px] flex flex-row items-center gap-10">
                    <div className="flex flex-row gap-2">
                    <label htmlFor="mobile" className="font-medium font-oswald text-xl text-lGreen">Mobile Number:</label>
                    <input type="text" placeholder="09123456789" className="w-[250px] h-[35px] rounded-lg px-2 bg-gray-300/50 "  />
                    </div>

                    <div className="flex flex-row gap-2">
                    <label htmlFor="email" className="font-medium font-oswald text-xl text-lGreen">Email Address:</label>
                    <input type="text" placeholder="sample@gmail.com" className="w-[250px] h-[35px] rounded-lg px-2 bg-gray-300/50 " />
                    </div>

                </div>

                {/* third row */}
                <div className="w-full h-[40px] flex flex-row items-center gap-10">
                    <div className="w-full h-[40px] flex items-center gap-5">
                        <label htmlFor="Name" className="font-medium font-oswald text-xl text-lGreen">Parent/Guardian&apos;s Name:</label>
                        <input type="firstName" placeholder="First Name" className="w-[250px] h-[35px] rounded-lg px-2 bg-gray-300/50" />
                        <input type="middleName" placeholder="Middle Name" className="w-[250px] h-[35px] rounded-lg px-2 bg-gray-300/50" />
                        <input type="LastName" placeholder="Last Name" className="w-[250px] h-[35px] rounded-lg px-2 bg-gray-300/50 "/>
                        <input type="Suffix" placeholder="Suffix" className="w-[100px] h-[35px] rounded-lg px-2 bg-gray-300/50 "/>
                    </div>
                </div>
            </div>

           {/* fourth section */}
           <div className="flex flex-col gap-5 mb-10">
                <p className="font-bold font-merriweather text-2xl text-lGreen">
                Section 3: Educational Background
                </p>
                <hr className="border-2 border-solid border-dGreen w-full" />

                <div className="flex flex-row gap-5">
                    <label htmlFor="school" className="font-medium font-oswald text-xl text-lGreen">Student Admission Status:</label>
                    <div className="h-[36px] w-[200px] bg-gray-300/50 flex items-center justify-center rounded-lg">
                        <select className="bg-transparent h-[36px] w-[200px] rounded-lg font-sans ">
                            <option value="Freshment">Freshmen</option>
                            <option value="Transferee">Transferee</option>
                        </select>
                    </div>
                </div>

                {/* first row */}
                <div className="w-full h-[40px] flex items-center gap-5">
                    <label htmlFor="school" className="font-medium font-oswald text-xl text-lGreen">Previous School:</label>
                    <input type="text" placeholder="AB Normal Elementary School" className="w-[600px] h-[35px] rounded-lg px-2 bg-gray-300/50" />
                </div>
               
               {/* second row */}
                <div className="w-full h-[40px] flex items-center gap-5">
                    <label htmlFor="address" className="font-medium font-oswald text-xl text-lGreen">School Address:</label>
                    <input type="text" placeholder="123 Main St, City, Country" className="w-[600px] h-[35px] rounded-lg px-2 bg-gray-300/50" />
                </div>

                {/* third row */}
                <div className="w-full h-[40px] flex flex-row items-center gap-10">
                    
                    <div className="flex flex-row gap-5">
                        <label htmlFor="LRN" className="font-medium font-oswald text-xl text-lGreen"> LRN: </label>
                        <input type="text" placeholder="123456789" className="w-[200px] h-[35px] rounded-lg px-2 bg-gray-300/50" />
                    </div>
                    <div className="flex flex-row gap-5">
                    <label htmlFor="Gender" className="font-medium font-oswald text-xl text-lGreen">School Type:</label>
                        <select className=" bg-gray-300/50 h-[36px] w-[200px] rounded-lg font-sans ">
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                        </select>
                    </div>

                    <div className="flex flex-row gap-5">
                        <label htmlFor="Gender" className="font-medium font-oswald text-xl text-lGreen">Last Grade Level Completed:</label>
                        <select className=" bg-gray-300/50 h-[36px] w-[150px] rounded-lg font-sans ">
                            <option value="Grade6">Grade 6</option>
                            <option value="Grade7">Grade 7</option>
                            <option value="Grade8">Grade 8</option>
                            <option value="Grade9">Grade 9</option>
                        </select>
                        <select className=" bg-gray-300/50 h-[36px] w-[150px] rounded-lg font-sans ">
                            <option value="year">2024</option>
                            <option value="year">2024</option>
                            <option value="year">2024</option>
                            <option value="year">2024</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* fifth section */}
            <div className="flex flex-col gap-2 mb-10">
                <p className="font-bold font-merriweather text-2xl text-lGreen">
                Section 4: Required Documents Upload
                </p>
                <hr className="border-2 border-solid border-dGreen w-full mb-7" />

                <div className="flex flex-row gap-[200px]">
                    {/* left side */}
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-row gap-10">
                            <label htmlFor="document" className="font-medium font-oswald text-xl text-lGreen w-[190px] ">PSA Birth Certificate</label>
                            <input type="file" name="document"  className="px-4 py-1 bg-gray-300/50 h-[36px] w-[250px] rounded-lg" />
                        </div>
                        <div className="flex flex-row gap-10">
                            <label htmlFor="document" className="font-medium font-oswald text-xl text-lGreen  w-[190px]"> REPORT CARD</label>
                            <input type="file" name="document"  className="px-4 py-1 bg-gray-300/50 h-[36px] w-[250px] rounded-lg" />
                        </div>

                        <div>
                            <p>if private</p>
                            <div className="flex flex-row gap-10">
                            <label htmlFor="document" className="font-medium font-oswald text-xl text-lGreen  w-[190px]"> CACPRISAA Student Exit Clearance</label>
                            <input type="file" name="document"  className="px-4 py-1 bg-gray-300/50 h-[36px] w-[250px] rounded-lg" />
                        </div>

                        </div>
                    </div>

                    {/* right side */}
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-row gap-10">
                            <label htmlFor="document" className="font-medium font-oswald text-xl text-lGreen  w-[190px]"> Good Moral Certificate</label>
                            <input type="file" name="document"  className="px-4 py-1 bg-gray-300/50 h-[36px] w-[250px] rounded-lg" />
                        </div>
                        <div className="flex flex-row gap-10">
                            <label htmlFor="document" className="font-medium font-oswald text-xl text-lGreen  w-[190px]"> 2x2 ID picture</label>
                            <input type="file" name="document"  className="px-4 py-1 bg-gray-300/50 h-[36px] w-[250px] rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>


            {/* sixth section*/}
            <div className="flex flex-col gap-2 mb-10">
                <p className="font-bold font-merriweather text-2xl text-lGreen">
                Section 5: Payment & Slot Reservation (₱500)
                </p>
                <hr className="border-2 border-solid border-dGreen w-full mb-7" />

                <div className="flex flex-row items-center justify-center">
                    <div className="w-[600px] h-[500px] bg-gray-400/40 flex flex-col text-center items-center py-5 gap-6">
                        <p className="font-bold font-merriweather text-2xl text-lGreen" >GCASH PAYMENT</p>

                        <div className="flex flex-col gap-3 items-center">
                            <div className="bg-yellow h-[40px] w-[115px] rounded-lg items-center justify-center flex font-bold font-oswald text-lg text-lGreen">
                                STEP 1
                            </div>
                            <div className="w-[530px] h-[140px] bg-slGreen rounded-md flex flex-col py-5">
                                <p>
                                Send the 500.00 reservation fee
                                </p>
                                <p>
                                    Gcash: 091234567890
                                </p>
                                <p>
                                Click this to download the QR Code
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 items-center">
                            <div className="bg-yellow h-[40px] w-[115px] rounded-lg items-center justify-center flex font-bold font-oswald text-lg text-lGreen">
                                STEP 2
                            </div>
                            <div className="w-[530px] h-[140px] bg-slGreen rounded-md flex flex-col gap-3 items-center text-center py-5">
                                <p>
                                Uplad the screenshot of the reciept.
                                </p>
                                <input type="file" name="document" className="w-[220px] bg-red-400" />
                            </div>
                        </div>
                    </div>

                    <div className="w-1 h-[500px] bg-lGreen mx-[70px]" />

                    <div className="w-[600px] h-[500px] bg-gray-400/40 flex flex-col text-center items-center py-5 gap-6">
                        <p className="font-bold font-merriweather text-2xl text-lGreen" >GCASH PAYMENT</p>

                        <div className="flex flex-col gap-3 items-center">
                            <div className="bg-yellow h-[40px] w-[115px] rounded-lg items-center justify-center flex font-bold font-oswald text-lg text-lGreen">
                                STEP 1
                            </div>
                            <div className="w-[530px] h-[140px] bg-slGreen rounded-md flex flex-col py-5">
                                <p>
                                Send the 500.00 reservation fee
                                </p>
                                <p>
                                    Gcash: 091234567890
                                </p>
                                <p>
                                Click this to download the QR Code
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 items-center">
                            <div className="bg-yellow h-[40px] w-[115px] rounded-lg items-center justify-center flex font-bold font-oswald text-lg text-lGreen">
                                STEP 2
                            </div>
                            <div className="w-[530px] h-[140px] bg-slGreen rounded-md flex flex-col gap-3 items-center text-center py-5">
                                <p>
                                Uplad the screenshot of the reciept.
                                </p>
                                <input type="file" name="document" className="w-[220px] bg-red-400" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>


            <div className="w-full flex justify-center mt-10"> 
            <Button
            variant="mButton"
            className="w-[150px] h-[45px] text-xl rounded-xl"
            >
                Submit
            </Button>
            </div>
            





        </div>
    );
};

export default EnrollmentPage;