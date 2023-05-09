import * as React from "react";
import { useTranslation } from "react-i18next";
import MuiCard from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Grid, Menu, MenuItem } from "@mui/material";
import { Box } from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCartCheckout";

import { Product } from "models/product";
import { client } from "client";
import { EditProduct } from "../Dialogs";
import { useShopping } from "contexts/ShoppingContext";
import { numberFormat } from "utils";

import { styled } from "@mui/material/styles";
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface Card {
  product: Product;
  onDelete: () => void;
  onEdited: (newProduct: Product) => void;
}

export const Card = ({ product, onDelete, onEdited }: Card) => {
  const { t } = useTranslation("cardProduct");
  const { name, description, price, ref } = product;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = !!anchorEl;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [edit, setEdit] = React.useState(false);
  const { addProduct } = useShopping();

  return (
    <MuiCard
      sx={{
        height: "100%",
      }}
      component={Grid}
      container
      direction="column"
      alignItems="stretch"
    >
      <CardHeader
        component={Grid}
        item
        xs="auto"
        action={
          <>
            <IconButton
              aria-label="delete"
              color="inherit"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  setEdit(true);
                }}
              >
                {t("edit")}
              </MenuItem>
              <MenuItem
                onClick={async () => {
                  handleClose();
                  await client.delete(`/products/${product.id}`);
                  onDelete();
                }}
              >
                {t("delete")}
              </MenuItem>
            </Menu>
          </>
        }
        title={
          <Typography
            color="text.secondary"
            fontFamily={"Roboto"}
            fontSize={12}
          >
            {ref}
          </Typography>
        }
        subheader={
          <Typography
            color="text.secondary"
            fontFamily={"Roboto"}
            fontSize={20}
          >
            {name}
          </Typography>
        }
      />
      <Grid item xs>
        <CardContent>
          <Typography variant="body2" color="text.secondary" mb={2}>
            {description || "----------------"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {numberFormat(price)}
          </Typography>
        </CardContent>
      </Grid>
      <Grid item xs="auto">
        <CardActions
          sx={{
            justifyContent: "center",
            my: 2,
          }}
        >
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              addProduct(product);
            }}
          >
            <Grid
              container
              spacing={1}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>{t("add")}</Grid>
              <Grid item>
                <ShoppingCart />
              </Grid>
            </Grid>
          </Button>
        </CardActions>
      </Grid>
      <EditProduct
        open={edit}
        onClose={() => setEdit(false)}
        product={product}
        onEdited={onEdited}
      />
    </MuiCard>
  );
};
