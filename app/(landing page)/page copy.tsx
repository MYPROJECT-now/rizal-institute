import Image from "next/image";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <div className="w-full h-min-screen">

      {/* first section */}
      <div className="h-[600px] w-full relative flex items-center justify-center">
        {/* baclkground */}
        <Image
        src="/bg_home.jpeg"
        alt="bg"
        width={1000}
        height={1000}
        className="h-full w-full absolute top-0 left-0 object-cover"
         />
         {/* shadow */}
         <div className="bg-black/40 h-[350px] w-full absolute top-50 left-0 " />


          {/* main text */}
            <div className="relative z-9 flex flex-col gap-7">
              <div className="flex flex-col gap-3">
                <p className="font-bold font-merriweather text-6xl relative z-10 text-white text-center">
                Proudly Rizalian, Ready for
                </p>
                <p className="font-bold font-merriweather text-6xl relative z-10 text-white text-center">
                the World!!
                </p>
              </div>

              <div className="flex flex-col items-center justify-center gap-4">
                <Button
                variant="mButton"
                className="h-[65px] w-[250px] rounded-2xl ">
                  <p className="font-oswald font-bold text-3xl">
                    ENROLL NOW!!
                  </p>
                </Button>

                <Button
                variant="sButton"
                className="h-[55px] w-[210px] rounded-xl ">
                  <p className="font-oswald font-bold text-xl">
                    TRACK APPLICATION
                  </p>
                </Button>
              </div>
            </div>
      </div>
       {/* end first section */}

      {/* second section */}
      <div className="w-full h-[210px] bg-sl2Green flex flex-col justify-center text-center gap-3">
        <p className="font-bold font-merriweather text-d2Green text-4xl text-center">
        WHY CHOOSE RIZAL INSTITUTE?
        </p>
        <div>
          <p className="font-light font-merriweather text-d2Green text-2xl text-center">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam, modi nisi.  
          </p>
          <p className="font-light font-merriweather text-d2Green text-2xl text-center">
            Accusamus cumque quae exercitationem facilis, eum iste laborum nisi! 
          </p>
          <p className="font-light font-merriweather text-d2Green text-2xl text-center">
            Neque quibusdam dignissimos delectus nostrum unde eaque provident consequuntur corporis.
          </p>
        </div>
      </div>
      {/* end second section */}

      {/* third section */}
      <div className="w-full h-[415px] flex flex-row items-center justify-around gap-3">
        <div className="w-[330px] h-[250px] bg-green-500 rounded-[35px]" >
          hi
        </div>

        <div className="w-[330px] h-[250px] bg-green-500 rounded-[35px]" >
          hi
        </div>

        <div className="w-[330px] h-[250px] bg-green-500 rounded-[35px]" >
          hi
        </div>
      </div>
      {/* end third section */}

      {/* fourth section */}
      <div className="h-[600px] w-full relative flex items-center">
        {/* background */}
        <Image
          src="/bf.jpeg"
          alt="baseball background"
          width={1000}
          height={1000}
          className="h-full w-full absolute top-0 left-0 object-cover"
        />
       {/* shadow */}
       <div className="bg-black/40 h-[300px] w-full absolute top-100 left-0 " />

        

        {/* main text */}
        <div className="relative w-full h-fulll text-center items-center justify-center z-9 flex flex-col gap-10 te">  
          {/* FIRST PART */}
          <p className="font-bold font-oswald text-6xl text-white">
            Coming Soon: RI Baseball Program!
          </p>
           {/* SECOND PART */}
          <div className="flex flex-row w-full h-[250px] items-center justify-evenly">
            <div>
              <Image
              src="/star.png"
              alt="star"
              width={120}
              height={120}
              />
              <p>
              Pioneering Spirit
              </p>
            </div>

            <div>
              <Image
              src="/star.png"
              alt="star"
              width={120}
              height={120}
              />
              <p>
              Pioneering Spirit
              </p>
            </div>

            <div>
              <Image
              src="/star.png"
              alt="star"
              width={120}
              height={120}
              />
              <p>
              Pioneering Spirit
              </p>
            </div>

            <div>
              <Image
              src="/star.png"
              alt="star"
              width={120}
              height={120}
              />
              <p>
              Pioneering Spirit
              </p>
            </div>
          </div>
        
         {/* THIRD PART */}
          <Button
            variant="mButton"
            className="h-[65px] w-[250px] rounded-2xl ">
              <p className="font-oswald font-bold text-3xl">
                ENROLL NOW!
              </p>
          </Button>
        </div>
      </div>
       {/* end of fourth section */}


    </div>
  );
}
