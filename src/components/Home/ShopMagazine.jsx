import React from "react";
import { man, note, women } from "../../../assets/images";
import { useTranslation } from "react-i18next";

const ShopMagazine = () => {
  const { t } = useTranslation();

  const ShopMagazineArr = [
    {
      name: "man",
      img: man,
      posted: t("postedIn"),
      spanText: t("tutorial"),
      body: t("marchRetailSales"),
    },
    {
      name: "note",
      img: note,
      posted: t("postedIn"),
      spanText: t("news"),
      body: t("cobornsToAcquire"),
    },
    {
      name: "women",
      img: women,
      posted: t("postedIn"),
      spanText: t("interview"),
      body: t("krogerReadyToExpand"),
    },
  ];

  return (
    <div className="w-full my-[20%]">
      <div className="text flex flex-col sm:flex-row justify-center items-center mb-16">
        <div className="text">
          <p className="flex justify-center text-4xl font-bold text-[#424a63]">
            {t("fromTheShopMagazine")}
          </p>
          <p className="text-[#aeb1bb] text-xl mt-2">
            {t("weHaveNewProductsFromAllWorldBrands")}
          </p>
        </div>
      </div>
      <div className="imgs grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 h-full">
        {ShopMagazineArr.map((item) => (
          <div
            className="w-full h-[60vh] bg-cover transition-all duration-500 hover:opacity-50 cursor-pointer flex flex-col justify-end border-[#ededed] border-[6px] p-5 hover:border-[#284980]"
            style={{ backgroundImage: `url("${item.img}")` }}
            key={item.name}
          >
            <div className="text">
              <div className="posted bg-white w-fit text-[#a8abb6] p-2">
                <p className="text-[11px]">
                  {item.posted}{" "}
                  <span className="text-[#284980]">{item.spanText}</span>{" "}
                </p>
              </div>
              <div className="body bg-[#284980] p-2 w-fit">
                <p className="text-white font-bold text-[20px]">{item.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopMagazine;
