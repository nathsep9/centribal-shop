import {
  CssBaseline,
  Container as MuiContainer,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import { Card } from "components/Card";
import React from "react";

import useSWR from "swr";
import { fetcher } from "fetcher";
import { Product } from "models/product";

export const Container = () => {
  const { data, isLoading, mutate } = useSWR<Product[]>("/products", fetcher);

  console.log(data);
  if (isLoading) return <div>Loading...</div>;
  return (
    <React.Fragment>
      <MuiContainer>
        <Typography variant="h4" component="div" gutterBottom>
          Holaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {data?.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                product={product}
                onDelete={() =>
                  mutate(
                    data?.filter((p) => p.id !== product.id),
                    false
                  )
                }
              />
            </Grid>
          ))}
        </Grid>
      </MuiContainer>
    </React.Fragment>
  );
};
