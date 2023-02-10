// welcome to admin dashboard Brands page
// welcome to admin dashboard Users page
import React, { useState, createContext } from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, Grid, Typography } from "@mui/material";
import AppBarElement from "../../components/appbar";
import "./index.css";
import { Logos } from "./brandPop";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import ReusableModal from "./ReusableModal";

export const BrandContext = createContext({});
export const Brands = () => {
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  const [brands, setBrands] = useState(Logos);
  const [showModal, setShowModal] = useState(false);

  function seeModal() {
    showModal ? setShowModal(false) : setShowModal(true);
  }

  function handleDelete(id) {
    const delArray = brands.filter((brand) => brand.id !== id);
    setBrands(delArray);
  }
  return (
    <>
      <BrandContext.Provider value={{ brands }}>
        <Box sx={{ display: "flex" }}>
          <AppBarElement />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />

            <div className="brands-header">
              <h1 className="brands-title">Welcome to Admin Brands</h1>
              <Button className="brands-add-btn" onClick={seeModal}>
                Add Brand
              </Button>
            </div>

            <Grid
              container
              spacing={2}
              columns={{ xs: 4, sm: 8, md: 16 }}
              sx={{
                padding: "1em 1em",
                boxShadow: "0 1px 2px rgb(0 0 0 / 30%)",
                width: "90%",
                justifySelf: "center",
                margin: "0 auto",
                borderRadius: ".5em",
              }}
            >
              {brands.map((logo) => {
                return (
                  <Grid item xs={4} key={logo.id} sx={{ display: "flex" }}>
                    <Grid
                      item
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: ".1em .6em",
                        backgroundColor: "white",
                        borderRadius: ".5em",
                        width: "100%",
                        boxShadow: "0 1px 2px rgb(0 0 0 / 30%)",
                      }}
                    >
                      <button
                        className="brands-del-btn"
                        onClick={() => handleDelete(logo.id)}
                      >
                        <DeleteIcon />
                      </button>
                      <img
                        src={logo.img}
                        alt="logo-icon"
                        style={{ width: "60%" }}
                      />
                      <Typography component="h1"> {logo.name}</Typography>
                      <Typography component="p"> {logo.amount}</Typography>
                    </Grid>
                  </Grid>
                );
              })}{" "}
            </Grid>
            {showModal ? (
              <ReusableModal containerClick={() => setShowModal(false)} />
            ) : null}
          </Box>
        </Box>
      </BrandContext.Provider>
    </>
  );
};
