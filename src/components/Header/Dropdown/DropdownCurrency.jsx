import { useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const DropdownCurrency = () => {
  const { t } = useTranslation();

  const { isRTL } = useSelector((state) => state.RTLState);

  const currence = {
    name: t("riyal"),
  };

  const currencies = [
    {
      name: t("pound"),
      symbol: "(£)",
    },
    {
      name: t("dirham"),
      symbol: "(د. إ)",
    },
    {
      name: t("riyal"),
      symbol: "(SAR)",
    },
  ];

  return (
    <Menu>
      <MenuHandler>
        <Button
          className={`text-white bg-[#284980] shadow-none hover:shadow-none flex items-center ${
            isRTL && "flex-row-reverse"
          }`}
        >
          <span className=" text-[16px] font-semibold">{currence.name}</span>{" "}
          <ChevronDownIcon strokeWidth={2.5} className={`h-3.5 w-3.5 ml-1`} />
        </Button>
      </MenuHandler>
      <MenuList className="overflow-x-hidden w-[150px] p-2 border-none bg-white shadow-lg rounded-lg overflow-hidden">
        {currencies.map((item) => (
          <MenuItem
            key={item.symbol}
            className={`flex items-center justify-center py-2 hover:text-[#2b7fff] text-[#5E77A0]  transition-all duration-300  `}
            onClick={() => changeCurrency(item)}
          >
            {item.name} {item.symbol}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default DropdownCurrency;
