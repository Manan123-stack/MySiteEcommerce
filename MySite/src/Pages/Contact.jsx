import React from "react";
import Title from "../Components/Title";
import { assets2 } from "../assets/frontend_assets/assets2";
import NewsLetterBox from "../Components/NewsLetterBox";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full max-w-[480px]"
          src={assets2.contact_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 items-start">
          <p className="font-semibold text-xl text-gray-600">Our Store </p>
          <p className="text-gray-500">
            54709 Willms Station Suite 350, Washington, USA{" "}
          </p>
          <p className="text-gray-500">
            Tel: (415) 555-0132 <br />
            Email: admin@forever.com
          </p>
          <p className="font-semibold text-xl">Career at BCDapps</p>
          <p className="text-gray-500">learn more our teams and job open </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black transition-all duration-500 hover:text-white">
            Explore Jobs
          </button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default Contact;
