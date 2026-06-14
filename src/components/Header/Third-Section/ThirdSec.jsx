import React from "react";
import BrowseCollection from "./Browse-Collection/BrowseCollection";
import QuickFind from "./Quick-Find/QuickFind";
import Contact from "./Contact/Contact";
import TrackingOrder from "./Tracking-Order/TrackingOrder";
import { useTranslation } from "react-i18next";
import "./ThirdSec.css";
import SpecialOffers from "./Spring-Sales/SpecialOffers";

const ThirdSec = () => {
  const { t } = useTranslation();

  const sections = [
    { id: "browse", name: t("browse_collection"), component: BrowseCollection },
    { id: "sales", name: t("special_offers"), component: SpecialOffers },
    { id: "quick-find", name: t("quick_find"), component: QuickFind },
    { id: "contact", name: t("contact"), component: Contact },
    { id: "tracking", name: t("tracking_order"), component: TrackingOrder },
  ];

  return (
    <div className=" h-16 grid md:grid-cols-5  gap-9  ">
      {sections.map(({ id, component: Component, name }) =>
        name === t("browse_collection") ? (
          <div key={id} className="flex justify-start">
            <Component />
          </div>
        ) : (
          <div key={id} className="flex justify-center">
            <Component />
          </div>
        )
      )}
    </div>
  );
};

export default ThirdSec;
