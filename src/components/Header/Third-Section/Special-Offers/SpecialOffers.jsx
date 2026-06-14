import React from "react";
import { useState } from "react";
import { Menu, MenuHandler, MenuList, Button } from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

import {
  clothes,
  electronics,
  entertainment,
  furniture,
  supermarket,
} from "../../../../../assets/images";
import { Link } from "react-router-dom";

const SpecialOffers = () => {
  const { t } = useTranslation();
  const [openMenu, setOpenMenu] = useState(false);

  const offers = [
    { title: t("furniture"), discount: t("20_off"), img: furniture },
    { title: t("electronics"), discount: t("10_off"), img: electronics },
    { title: t("entertainment"), discount: t("20_off"), img: entertainment },
    { title: t("clothes"), discount: t("30_off"), img: clothes },
    { title: t("supermarket"), discount: t("45_off"), img: supermarket },
  ];

  return (
    <div className="mb-1.5 -mx-7">
      <Menu>
        <MenuHandler>
          <Button className="text-white bg-[#284980] shadow-none hover:shadow-none flex items-center duration-300 hover:text-[#F8C530]">
            <span className="text-[14px] font-semibold">
              {t("special_offers")}
            </span>{" "}
            <ChevronDownIcon strokeWidth={2.5} className="h-3.5 w-3.5 ml-1" />
          </Button>
        </MenuHandler>
        <MenuList className="flex flex-col md:flex-row justify-between gap-11 sm:-ml-9">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg duration-500 hover:shadow-[#F8C530] p-4 flex flex-col items-center text-center w-52"
            >
              <img
                src={offer.img}
                alt={`${offer.title} Offer`}
                className="w-24 h-24 object-contain mb-2"
              />
              <p className="text-gray-700 font-semibold">{offer.discount}</p>
              <button className="mt-2 bg-[#284980] hover:bg-[#F8C530] hover:text-white duration-500 text-white px-4 py-1 rounded-md font-medium">
                {offer.title}
              </button>
            </div>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};

export default SpecialOffers;
