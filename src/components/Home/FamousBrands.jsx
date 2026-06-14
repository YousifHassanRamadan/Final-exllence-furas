import React from "react";
import {
  brandApple,
  brandAsus,
  brandbBoat,
  brandbBose,
  brandbHisense,
  brandbHp,
  brandbHuawei,
  brandbMicrosoft,
  brandbSamsung,
  brandbSony,
  brandbXiaomi,
  brandbXtra,
} from "../../../assets/images";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const brandImg = [
  { name: "Apple", image: brandApple },
  { name: "Asus", image: brandAsus },
  { name: "Boat", image: brandbBoat },
  { name: "Bose", image: brandbBose },
  { name: "Hisense", image: brandbHisense },
  { name: "Hp", image: brandbHp },
  { name: "Huawei", image: brandbHuawei },
  { name: "Microsoft", image: brandbMicrosoft },
  { name: "Samsung", image: brandbSamsung },
  { name: "Sony", image: brandbSony },
  { name: "Xiaomi", image: brandbXiaomi },
  { name: "Xtra", image: brandbXtra },
];

const FamousBrands = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full mt-[10%] mb-[5%]">
      <div className="famousBrands flex justify-center items-center mb-16">
        <div className="text">
          <p className="flex justify-center text-4xl font-bold text-[#424a63]">
            {t("productsByFamousBrands")}
          </p>
          <p className="text-[#aeb1bb] text-xl mt-2">
            {t("weHaveNewProducts")}
          </p>
        </div>
      </div>
      <div className="brands grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2 gap-5">
        {brandImg.map((brand) => (
          <div
            key={brand.name}
            className="border-[#ebecf0] border-[2px] rounded transition-transform hover:scale-110 cursor-pointer hover:border-[#284980] duration-300 hover:border-[4px]"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-[100%] h-[100%]"
            />
          </div>
        ))}
      </div>
      <div className="btn flex justify-center">
        <Link
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          to={`/brands`}
          className="mt-10 flex items-center justify-center bg-yellow-500 text-[#284980] font-semibold py-2 px-4 rounded shadow cursor-pointer hover:text-white hover:bg-[#284980] transition duration-200"
        >
          {t("viewAllBrands")}
        </Link>
      </div>
    </div>
  );
};

export default FamousBrands;
