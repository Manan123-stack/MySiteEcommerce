import React from "react";
import Title from "../Components/Title";
import { assets2 } from "../assets/frontend_assets/assets2";
import NewsLetterBox from "../Components/NewsLetterBox";

const About = () => {
  return (
    <div>
      <div className="text2xl text-center pt-8 border-t-red-50">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets2.about_img}
          alt=""
        />
        <div className="fex flex-col gap-6 justify-center md:w-2/4 ">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas ipsa
            odio repudiandae perspiciatis, reiciendis veritatis quis quibusdam
            suscipit, qui nisi culpa veniam deleniti, ducimus voluptatibus
            quaerat voluptatum saepe distinctio? Doloremque!
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Exercitationem dignissimos rerum optio beatae fugiat veniam cumque
            labore praesentium nam! Laudantium at odio obcaecati enim maxime id
            veritatis, vitae praesentium ea!
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi
            numquam eius debitis voluptas recusandae aut voluptatum assumenda
            aspernatur voluptate, reiciendis, eveniet, vitae pariatur
            consequuntur. Rerum exercitationem tempore perspiciatis. Vero,
            veritatis
          </p>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance: className="text-gray-600"</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
            adipisci natus? Commodi debitis a at impedit adipisci velit, laborum
            exercitationem est molestias eveniet similique voluptate
            praesentium, dicta qui excepturi eius?
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
            adipisci natus? Commodi debitis a at impedit adipisci velit, laborum
            exercitationem est molestias eveniet similique voluptate
            praesentium, dicta qui excepturi eius?
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Expectional Customer Service:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
            adipisci natus? Commodi debitis a at impedit adipisci velit, laborum
            exercitationem est molestias eveniet similique voluptate
            praesentium, dicta qui excepturi eius?
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default About;
