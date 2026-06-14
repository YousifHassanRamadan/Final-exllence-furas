import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from "react-redux";

const SubscribeForm = () => {
  const [email, setEmail] = useState("");

  const { t } = useTranslation();

  const handleSubscribe = () => {
    alert(`Subscribed with: ${email}`);
  };

  const { isRTL } = useSelector((state) => state.RTLState);

  return (
    <div className="flex flex-col sm:flex-row items-center bg-gray-100 rounded-full p-2 w-full max-w-lg gap-2 sm:gap-4">
      {/* Email Input */}
      <input
        type="email"
        placeholder={t("enter_email")}
        className="flex-1 bg-transparent outline-none px-4 py-2 text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 rounded-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Subscribe Button */}
      <button
        onClick={handleSubscribe}
        className="bg-yellow-400 text-gray-900 font-medium px-4 py-2 rounded-full flex items-center hover:bg-[#253858] hover:text-white transition cursor-pointer"
      >
        {isRTL ? (
          <FaArrowRightLong className="ml-2" />
        ) : (
          <FaArrowRightLong className="mr-2" />
        )}
        {t("subscribe_now")}
      </button>
    </div>
  );
};

export default SubscribeForm;
