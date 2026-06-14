import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from "react-share";
import { FaFacebook, FaTwitter, FaWhatsapp, FaTelegram } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ProductShare = ({ productUrl, productTitle }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-3 mt-4 flex-wrap">
      <span className="font-semibold">{t("share_product")}</span>

      <FacebookShareButton url={productUrl} quote={productTitle}>
        <FaFacebook className="text-blue-600 text-2xl cursor-pointer" />
      </FacebookShareButton>

      <TwitterShareButton url={productUrl} title={productTitle}>
        <FaTwitter className="text-blue-400 text-2xl cursor-pointer" />
      </TwitterShareButton>

      <WhatsappShareButton url={productUrl} title={productTitle}>
        <FaWhatsapp className="text-green-500 text-2xl cursor-pointer" />
      </WhatsappShareButton>

      <TelegramShareButton url={productUrl} title={productTitle}>
        <FaTelegram className="text-blue-500 text-2xl cursor-pointer" />
      </TelegramShareButton>
    </div>
  );
};

export default ProductShare;
