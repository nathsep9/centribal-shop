import { useTranslation } from "react-i18next";
import {
  Container as MuiContainer,
  Box,
  Grid,
  Button,
  AppBar,
} from "@mui/material";
import React, { Suspense } from "react";
import useSWR from "swr";

import { Card } from "components/Card";
import { fetcher } from "fetcher";
import { Product } from "models/product";
import { AddProduct } from "components/Dialogs";
import beer from "assets/img/beer.jpg";

export const Products = () => {
  const { t } = useTranslation("addProduct");
  const { data, isLoading, mutate } = useSWR<Product[]>("/products", fetcher);

  const [create, setCreate] = React.useState(false);
  if (isLoading) return <div>Loading...</div>;

  return (
    <AppBar position="relative" color="transparent">
      <Box sx={{ flexGrow: 3, backgroundColor: "#190325" }}>
        <MuiContainer>
          <img src={beer} alt="drink" width="100%" height="100%" />
        </MuiContainer>
        <MuiContainer maxWidth="lg">
          <Box textAlign="center" mt={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setCreate(true);
              }}
            >
              {t("addProduct")}
            </Button>
          </Box>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            {data?.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.ref}>
                <Suspense fallback={<div>Loading...</div>}>
                  <Card
                    onEdited={(newProduct: Product) => {
                      mutate(
                        data?.map((p) =>
                          p.ref === product.ref ? newProduct : p
                        ),
                        false
                      );
                    }}
                    product={product}
                    onDelete={() =>
                      mutate(
                        data?.filter((p) => p.ref !== product.ref),
                        false
                      )
                    }
                  />
                </Suspense>
              </Grid>
            ))}
          </Grid>
          <AddProduct
            open={create}
            onClose={() => setCreate(false)}
            onCreated={(newProduct: Product) => {
              mutate([newProduct, ...(data || [])], false);
            }}
          />
        </MuiContainer>
      </Box>
    </AppBar>
  );
};
