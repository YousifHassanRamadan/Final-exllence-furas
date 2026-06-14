import React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemButton from "@mui/joy/ListItemButton";

const RecentReview = () => {
  const data = [
    {
      src: "https://images.unsplash.com/photo-1502657877623-f66bf489d236",
      title: "Night view",
      description: "4.21M views",
    },
    {
      src: "https://images.unsplash.com/photo-1527549993586-dff825b37782",
      title: "Lake view",
      description: "4.74M views",
    },
    {
      src: "https://images.unsplash.com/photo-1532614338840-ab30cf10ed36",
      title: "Mountain view",
      description: "3.98M views",
    },
    {
      src: "https://images.unsplash.com/photo-1502657877623-f66bf489d236",
      title: "Night view",
      description: "4.21M views",
    },
    {
      src: "https://images.unsplash.com/photo-1527549993586-dff825b37782",
      title: "Lake view",
      description: "4.74M views",
    },
    {
      src: "https://images.unsplash.com/photo-1532614338840-ab30cf10ed36",
      title: "Mountain view",
      description: "3.98M views",
    },
  ];

  return (
    <div className="bg-[#f3f4f6]  rounded-lg shadow-md mb-10">
      <div className="header bg-[#eeefef] px-4 py-3 text-lg font-semibold text-gray-700">
        <p className="text-[#50576e] text-xl font-semibold">Recent Review</p>
      </div>
      <div className="body">
        <Card
          variant=""
          className="w-full"
          sx={{ p: 0, backgroundColor: "#f3f4f6" }}
        >
          <List sx={{ py: "var(--ListDivider-gap)" }}>
            {data.map((item, index) => (
              <React.Fragment key={item.title}>
                <ListItem>
                  <ListItemButton sx={{ gap: 2, paddingY: 2 }}>
                    <AspectRatio sx={{ flexBasis: 120 }}>
                      <img
                        srcSet={`${item.src}?w=120&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.src}?w=120&fit=crop&auto=format`}
                        alt={item.title}
                      />
                    </AspectRatio>
                    <ListItemContent>
                      <Typography sx={{ fontWeight: "md" }}>
                        {item.title}
                      </Typography>
                      <Typography level="body-sm">
                        {item.description}
                      </Typography>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
                {index !== data.length - 1 && <ListDivider />}
              </React.Fragment>
            ))}
          </List>
        </Card>
      </div>
    </div>
  );
};

export default RecentReview;
