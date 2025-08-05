import React from "react";
import { assets2 } from "../assets/frontend_assets/assets2";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 text-center py-20 text-xs sm:text-sm  md:text-base text-gray-500">
      <div>
        <img src={assets2.exchange_icon} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">We Offer hassel free exchange policy</p>
      </div>
      <div>
        <img src={assets2.quality_icon} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">We provide 7 days free return policy</p>
      </div>
      <div>
        <img src={assets2.support_img} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">We provide 24/7 customer supprot</p>
      </div>
    </div>
  );
};

export default OurPolicy;
