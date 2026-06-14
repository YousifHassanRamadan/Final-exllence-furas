import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { useCountries } from "use-react-countries";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAddress } from "../reduxSystem/slices/getUserAddressSlice";
import { Trash2 } from "lucide-react";
import AddAddress from "../components/addAddress/AddAddress";
import { MdOutlineEditLocationAlt } from "react-icons/md";
import {
  deleteAddress,
  resetisAddressDeleted,
} from "../reduxSystem/slices/deleteAddressUserSlice";
import EditAddress from "../components/editAddress/EditAddress";
import { toast } from "react-toastify";

const EditAddressPage = () => {
  const { t } = useTranslation();

  const { countries } = useCountries();

  const dispatch = useDispatch();

  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);

  const [isEditAddressOpen, setIsEditAddressOpen] = useState(false);

  const { userAddress, isAddress } = useSelector(
    (state) => state.userAddressState
  );

  const { isAddressEdited } = useSelector((state) => state.editAddressState);

  const { isAddressDeleted } = useSelector((state) => state.deleteAddressState);

  const { isAddressAdded } = useSelector((state) => state.addAddressState);

  useEffect(() => {
    dispatch(fetchUserAddress());
  }, [isAddressEdited, isAddressDeleted, isAddressAdded]);

  useEffect(() => {
    dispatch(fetchUserAddress());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteAddress(id)).then(() => {
      dispatch(resetisAddressDeleted());
    });
    toast.success(t("address_deleted_success"));
  };

  return (
    <div className="w-full min-h-screen p-10 bg-[#f2f2f2]">
      <div className="header flex justify-between mb-6">
        <h1 className="text-3xl font-semibold text-[#284980]">
          {t("address")}
        </h1>
        <Button
          className="bg-[#284980]"
          onClick={() => setIsAddAddressOpen(true)}
        >
          {t("add_new_address")}
        </Button>
      </div>

      <div className="w-full h-[2px] bg-gray-300 mb-6"></div>

      {userAddress?.length === 0 ? (
        <div className="w-full text-center py-6 bg-white border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-[#284980]">
            {t("no_address")}
          </h2>
          <p className="text-sm text-gray-600 mb-4">{t("no_address_yet")}</p>
        </div>
      ) : (
        <div className="w-full mx-auto space-y-4">
          {userAddress?.map((address) => (
            <div
              key={address._id}
              className="bg-[#284980] text-white p-4 rounded-lg flex justify-between items-start shadow-md relative"
            >
              <div>
                <h2 className="text-lg font-semibold">{address.street}</h2>
                <p className="text-sm">{address.landmark}</p>
                <p className="text-white font-bold">
                  {t("country")}: {address.country}
                </p>
              </div>
              <div className="btns">
                <button
                  onClick={() => setIsEditAddressOpen(true)}
                  className="text-[#F0B100] hover:text-white transition mr-5 cursor-pointer"
                  title={t("edit_address")}
                >
                  <MdOutlineEditLocationAlt size={24} />
                </button>
                <button
                  onClick={() => handleDelete(address._id)}
                  className="text-red-500 hover:text-white transition cursor-pointer"
                  title={t("delete_address")}
                >
                  <Trash2 size={24} />
                </button>
              </div>
              {isEditAddressOpen && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50 w-full">
                  <EditAddress
                    address={address}
                    setIsEditAddressOpen={setIsEditAddressOpen}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {isAddAddressOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50 w-full">
          <AddAddress setIsAddAddressOpen={setIsAddAddressOpen} />
        </div>
      )}
    </div>
  );
};

export default EditAddressPage;
