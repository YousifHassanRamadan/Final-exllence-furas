import { Container } from "@mui/material";
import {
  shamboOut,
  shamboIn,
  bananaOut,
  bananaIn,
  bottleOut,
  bottleIn,
  vrOut,
  vrIn,
  dreameOut,
  dreameIn,
  statueOut,
  statueIn,
  kitchenOut,
  kitchenIn,
} from "../../assets/images";
import ProductCard from "../components/Ui-Card/ProductCard";
import { useTranslation } from "react-i18next";

const ViewedOrdersPage = () => {
  const { t } = useTranslation();

  const fakeProductsIn = [
    {
      id: 1,
      name: "Organic Natural Bananas",
      price: 79,
      category: "Supermarket",
      image: bananaIn,
      imageHovered: bananaOut,
    },
    {
      id: 2,
      name: "Awake Shower Shampoo Gel",
      price: 45,
      category: "Supermarket",
      image: shamboIn,
      imageHovered: shamboOut,
    },
    {
      id: 3,
      name: "The Sparkling Mineral Water",
      price: 199,
      category: "Supermarket",
      image: bottleIn,
      imageHovered: bottleOut,
    },
    {
      id: 4,
      name: "Apple Vision Pro 512GB (VR)",
      price: 499,
      category: "Electronics",
      image: vrIn,
      imageHovered: vrOut,
    },
    {
      id: 5,
      name: "D10 Plus Robot Vacuum",
      price: 120,
      category: "Kitchen",
      image: dreameIn,
      imageHovered: dreameOut,
    },
    {
      id: 6,
      name: "Under Sink Organizers",
      price: 999,
      category: "Kitchen",
      image: kitchenIn,
      imageHovered: kitchenOut,
    },
    {
      id: 7,
      name: "Couple Figurines Statue",
      price: 232,
      category: "Electronics",
      image: statueIn,
      imageHovered: statueOut,
    },
  ];

  return (
    <Container maxWidth={"lg"} className="w-full my-[10%]">
      <div className="header">
        <p className="text-3xl font-semibold text-[#284980]">
          {t("recentlyViewedProducts")}
        </p>
      </div>
      <div className="w-full opacity-[8%] h-[2px] rounded bg-gray-500 px-9 mt-5 mb-9"></div>

      <div className="ourProducts grid sm:grid-cols-2 grid-cols-1 gap-5">
        {fakeProductsIn.map((prod) => (
          <ProductCard product={prod} key={prod.id} />
        ))}
      </div>
    </Container>
  );
};

export default ViewedOrdersPage;
