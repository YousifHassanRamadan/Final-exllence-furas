import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  useMediaQuery,
  useTheme,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { GiBeachBag } from "react-icons/gi";
import { appStore, googlePlay } from "../../../assets/images";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const socialMediaIcons = [
  {
    name: "Facebook",
    icon: <FacebookIcon />,
    link: "#",
    hoverColor: "#1877F2",
  },
  { name: "Twitter", icon: <TwitterIcon />, link: "#", hoverColor: "#1DA1F2" },
  {
    name: "Instagram",
    icon: <InstagramIcon />,
    link: "#",
    hoverColor: "#DD2A7B",
  },
  {
    name: "LinkedIn",
    icon: <LinkedInIcon />,
    link: "#",
    hoverColor: "#0A66C2",
  },
];

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const { isRTL } = useSelector((state) => state.RTLState);

  // Get categories from Redux store
  const { Allcategories } = useSelector((state) => state.getCategoryState);

  const shopWith = [
    { name: t("help_center"), link: "/help" },
    { name: t("refund_policy"), link: "/refund-policy" },
    { name: t("terms_conditions"), link: "/terms" },
    { name: "+12 534 565 896", link: "tel:+12534565896" },
  ];

  const helpSupp = [
    { name: t("your_account"), link: "/my-account" },
    { name: t("lost_password"), link: "/my-account/edit-account" },
    { name: t("your_orders"), link: "/my-account/orders" },
    { name: t("address"), link: "/my-account/edit-address" },
  ];

  // Render footer links for desktop/tablet view
  const renderLinks = (items) => {
    return items.map((item, index) => (
      <Typography
        key={index}
        dir="auto"
        variant="body2"
        mt={1}
        component={Link}
        href={item.link}
        sx={{
          color: "#4866c1",
          display: "block",
          textDecoration: "none",
          transition: "color 0.3s",
          "&:hover": {
            color: "#284980",
            textDecoration: "underline",
          },
        }}
      >
        {item.name}
      </Typography>
    ));
  };

  // Render categories for desktop/tablet view
  const renderCategories = () => {
    // If categories aren't loaded yet, show placeholder
    if (!Allcategories || Allcategories.length === 0) {
      return (
        <Typography variant="body2" color="text.secondary">
          {t("loading_categories")}
        </Typography>
      );
    }

    // Show up to 6 categories to avoid overcrowding
    return Allcategories.slice(0, 6).map((category, index) => (
      <Typography
        key={index}
        dir="auto"
        variant="body2"
        mt={1}
        component={Link}
        href={`/category/${category._id}`}
        sx={{
          color: "#4866c1",
          display: "block",
          textDecoration: "none",
          transition: "color 0.3s",
          "&:hover": {
            color: "#284980",
            textDecoration: "underline",
          },
        }}
      >
        {isRTL ? category.arabicName : category.name}
      </Typography>
    ));
  };

  // Render mobile accordions for responsive design
  const renderMobileAccordion = (title, content) => {
    return (
      <Accordion
        elevation={0}
        sx={{
          background: "transparent",
          "&.MuiAccordion-root:before": {
            display: "none",
          },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ padding: 0 }}>
          <Typography variant="h6" fontWeight="bold" color="#284980">
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "0 16px 16px" }}>
          {content}
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <Box
      component="footer"
      dir="ltr"
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "light"
            ? "rgb(241, 242, 246)"
            : "rgb(38, 38, 38)",
        borderRadius: { xs: "40px 40px 0 0", md: "80px 80px 0 0" },
        py: { xs: 4, md: 6 },
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        {isMobile ? (
          // Mobile View with Accordions
          <Box>
            {/* Logo Section */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb={4}
            >
              <GiBeachBag
                style={{
                  color: "#284980",
                  fontSize: "50px",
                  cursor: "pointer",
                }}
              />
              <Typography
                variant="h5"
                fontWeight="bold"
                color="#284980"
                dir="auto"
              >
                <span style={{ color: "#f8c530" }}>Excellence</span> Furas
              </Typography>
              <Box mt={2} display="flex" justifyContent="center">
                {socialMediaIcons.map((social) => (
                  <IconButton
                    key={social.name}
                    href={social.link}
                    sx={{
                      mx: 1,
                      color: "#284980",
                      "&:hover": { color: social.hoverColor },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>

            {/* Accordions for mobile */}
            {renderMobileAccordion(t("categories"), renderCategories())}
            {renderMobileAccordion(t("help_support"), renderLinks(helpSupp))}
          </Box>
        ) : (
          // Desktop/Tablet View with Grid
          <Grid
            container
            spacing={4}
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            {/* Logo Section */}
            <Grid item xs={12} md={3}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems={isTablet ? "center" : "flex-start"}
              >
                <Typography
                  dir="auto"
                  variant="h5"
                  fontWeight="bold"
                  color="#284980"
                  mt={1}
                >
                  <p
                    className={`pl-3 pr-2 text-[#284980] text-3xl cursor-pointer flex items-center ${
                      isRTL && "flex-row-reverse"
                    } `}
                  >
                    <span
                      className={`text-[#f8c530] ${isRTL ? "mr-2" : "mr-2"}`}
                    >
                      {t("logo_excellence")}
                    </span>{" "}
                    <span className="mx-2">{t("logo_furas")}</span>
                    <GiBeachBag
                      style={{
                        color: "#284980",
                        fontSize: "50px",
                        cursor: "pointer",
                      }}
                    />
                  </p>
                </Typography>
                <Box mt={2} display="flex">
                  {socialMediaIcons.map((social) => (
                    <IconButton
                      key={social.name}
                      href={social.link}
                      sx={{
                        mr: 1,
                        color: "#284980",
                        "&:hover": { color: social.hoverColor },
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* Categories Section */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography
                variant="h6"
                color="#284980"
                fontWeight="bold"
                textAlign={isTablet ? "center" : "left"}
              >
                {t("categories")}
              </Typography>
              <Box textAlign={isTablet ? "center" : "left"}>
                {renderCategories()}
              </Box>
            </Grid>

            {/* Help & Support */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography
                variant="h6"
                color="#284980"
                fontWeight="bold"
                textAlign={isTablet ? "center" : "left"}
              >
                {t("help_support")}
              </Typography>
              <Box textAlign={isTablet ? "center" : "left"}>
                {renderLinks(helpSupp)}
              </Box>
            </Grid>
          </Grid>
        )}

        <Divider sx={{ my: 4, borderColor: "rgba(72, 102, 193, 0.2)" }} />

        {/* Footer Bottom */}
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          justifyContent="space-between"
          alignItems="center"
          textAlign={isMobile ? "center" : "left"}
        >
          <Typography dir="auto" variant="body2" color="text.secondary">
            Excellence Furas Shop © {new Date().getFullYear()}{" "}
            {t("all_rights_reserved")}
          </Typography>
          <Button
            onClick={() => {
              navigate("/my-account/orders"),
                window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            startIcon={<ShoppingCartIcon />}
            sx={{
              mt: isMobile ? 2 : 0,
              color: "#4866c1",
              "&:hover": {
                backgroundColor: "rgba(72, 102, 193, 0.1)",
              },
            }}
          >
            {t("track_your_orders")}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
