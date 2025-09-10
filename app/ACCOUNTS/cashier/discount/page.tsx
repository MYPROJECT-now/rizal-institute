"use client";

import { useState, useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const Discount = ({ children }: Props) => {
  const [discount, setDiscount] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [percentage, setPercentage] = useState<number | "">("");
  const [discountedAmount, setDiscountedAmount] = useState<number | "">("");
  const [honors, setHonors] = useState("");
  

  useEffect(() => {
  setAmount("");
  setPercentage("");
  setDiscountedAmount("");
  setHonors("");
}, [discount]);

  // Function to calculate discount
  const handleCalculate = () => {
    if (amount && percentage) {
      const result = amount - (amount * Number(percentage)) / 100;
      setDiscountedAmount(result);
    } else {
      setDiscountedAmount(""); 
    }
  };



const handleHonors = () => {
  if (amount === "" || isNaN(Number(amount))) {
    setDiscountedAmount(""); // reset if no valid number
    return;
  }

  let result = 0;
  const honorAmount = Number(amount);

  if (honors === "honor") {
    result = honorAmount - honorAmount * 0.25;
  } else if (honors === "high") {
    result = honorAmount - honorAmount * 0.5;
  } else if (honors === "highest") {
    result = honorAmount - honorAmount * 0.75;
  }

  setDiscountedAmount(result);
};


  return (
    <div className="p-4 w-full min-h-screen lg:h-screen">
   <div className=" w-full h-full rounded-xl flex flex-col pt-4 sm:px-10 px-4  bg-page">
    
    <div className="h-[600px] w-full justify-items-center">
      <div className="w-full h-full bg-white justify-items-center mt-2 rounded-lg">
        <label htmlFor="discount" className="w-full bg-lGreen font-merriweather text-white 
                                    items-center flex sm:pl-5 pl-2 sm:py-5 py-4 text-sm sm:text-lg lg:text-2xl">
          Select Discount
        </label>
        
        <select
          id="discount"
          name="discount"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="border rounded-lg p-2 w-60 items-center ml-10 mt-5"
        >
          <option value="">-- Select Discount --</option>
          <option value="siblings">Sibling</option>
          <option value="academic">Academic</option>
          <option value="others">Others</option>
        </select>

        {/* Conditional Rendering */}
        <div className="mt-4">
          {discount === "siblings" && (
            <div className="space-y-3">
              <div>
                <label htmlFor="amount" className="block font-merriweather font-bold">
                  Tuition Amount:
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="border rounded-lg p-2 w-60 "
                />
              </div>

              <div>
                <label htmlFor="percentageInput" className="block font-merriweather font-bold">
                  Percent of Discount:
                </label>
                <input
                  type="number"
                  id="percentageInput"
                  name="percentage"
                  value={percentage}
                  onChange={(e) => setPercentage(Number(e.target.value))}
                  min="0"
                  max="100"
                  step="0.01"
                  className="border rounded-lg p-2 w-60"
                />
              </div>

              <button
                onClick={handleCalculate}
                className="bg-dGreen text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Calculate
              </button>

              {/* Show result */}
              {discountedAmount !== "" && (
                <p className="text-green-600 font-bold mt-3">
                  Total Discounted Tuition: ₱{Number(discountedAmount).toFixed(2)}
                </p>
              )}
            </div>
          )}

          {discount === "academic" && (
            <div>
                <div> 
                 <label htmlFor="acads" className="block mt-3 font-merriweather font-bold ">
                    
                    Type of Academic Discount
                    
                    </label>   
                <select id="academic"
                        name="honors"
                        value={honors}
                        onChange={(e) => setHonors(e.target.value)}
                        className="border rounded-lg p-2 w-60" >
                    
                    <option value="">-- Select Discount --</option>
                    <option value="honor">With Honors</option>
                    <option value="high">With High Honors</option>
                    <option value="highest">With Highest Honors</option>
                    </select>
                 {honors === "honor" && (
                     <div>
                     <label htmlFor="amount" className="block font-merriweather font-bold mt-10">
                          Tuition Amount:
                        </label>
                        <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="border rounded-lg p-2 w-60"
                        />
                        <br></br>
                         <button
                            onClick={handleHonors}
                            className="bg-dGreen text-white px-4 py-2 rounded-lg hover:bg-green-700 mt-5"
                            >
                            Calculate
                         </button>
                         {discountedAmount !== "" && (
                            <p className="text-green-600 font-bold mt-3">
                             Total Discounted Tuition: ₱{Number(discountedAmount).toFixed(2)}
                             </p> )}
              </div>
                 )}

                 {honors === "high" && (
                     <div>
                        <label htmlFor="amount" className="block font-merriweather font-bold mt-10">
                        Tuition Amount:
                        </label>
                        <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="border rounded-lg p-2 w-60"
                        />
                       <br></br>
                        <button
                            onClick={handleHonors}
                            className="bg-dGreen text-white px-4 py-2 rounded-lg hover:bg-green-700 mt-5"
                            >
                            Calculate
                         </button>
                         {discountedAmount !== "" && (
                            <p className="text-green-600 font-bold mt-3">
                             Total Discounted Tuition: ₱{Number(discountedAmount).toFixed(2)}
                             </p> )}
              </div>
                 )}

                 {honors === "highest" && (
                    <div>
                        <label htmlFor="amount" className="block font-merriweather font-bold mt-10">
                        Tuition Amount:
                        </label>
                        <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="border rounded-lg p-2 w-60"
                        />
                        <br></br>
                        <button
                            onClick={handleHonors}
                            className="bg-dGreen text-white px-4 py-2 rounded-lg hover:bg-green-700 mt-5"
                            >
                            Calculate
                         </button>
                         {discountedAmount !== "" && (
                            <p className="text-green-600 font-bold mt-3">
                             Total Discounted Tuition: ₱{Number(discountedAmount).toFixed(2)}
                             </p> )}
              </div>
                 )}
                </div>


              </div>
          )}

          {discount === "others" && (
            <div>
                        <label htmlFor="amount" className="block font-merriweather font-bold">
                        Tuition Amount:
                        </label>
                        <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="border rounded-lg p-2 w-60"
                        />
                        
                <div>
                    <label htmlFor="percentageInput" className="block font-merriweather font-bold mt-10">
                                Percent of Discount:
                    </label>
                    <input
                            type="number"
                            id="percentageInput"
                            name="percentage"
                            value={percentage}
                            onChange={(e) => setPercentage(Number(e.target.value))}
                            min="0"
                            max="100"
                            step="0.01"
                            className="border rounded-lg p-2 w-60"
                        />
                
                </div>
                <br></br>
                <button
                    onClick={handleCalculate}
                    className="bg-dGreen text-white px-4 py-2 rounded-lg hover:bg-green-700"
                 >
                    Calculate
                    </button>

              {/* Show result */}
              {discountedAmount !== "" && (
                <p className="text-green-600 font-bold mt-3">
                  Total Discounted Tuition: ₱{Number(discountedAmount).toFixed(2)}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Discount;
