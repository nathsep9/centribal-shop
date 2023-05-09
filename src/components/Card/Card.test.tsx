import { describe, test, expect, vi, beforeEach } from "vitest";
import { RenderResult, render, screen } from "@testing-library/react";

import { Card } from "./index";
import { Product } from "models/product";

const addProduct = vi.fn();

vi.mock("contexts/ShoppingContext", () => ({
  useShopping: () => ({
    addProduct,
  }),
}));

describe("<Card />", () => {
  let wrapper: RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  >;
  const product: Product = {
    name: "Cerveza Poker Bandeja 24x330ml",
    description:
      "Cerveza colombiana popular y refrescante con un sabor suave y equilibrado. Ideal para compartir con amigos en cualquier ocasión.",
    price: 48.0,
    id: "1",
    tax: "1",
    ref: "1",
  };

  beforeEach(() => {
    wrapper = render(
      <Card onDelete={() => {}} onEdited={() => {}} product={product} />
    );
  });

  test("Card mounts properly", async () => {
    expect(wrapper).toBeTruthy();
    await screen.findByText(product.name);
    await screen.findByText(product.description);

    expect(screen.getByText(product.name)).toBeTruthy();
  });

  test("Add product to shopping cart", async () => {
    expect(wrapper).toBeTruthy();
    const add = await screen.findByText("(cardProduct).add");
    add.click();
    expect(addProduct).toHaveBeenCalled();
    expect(addProduct).toHaveBeenCalledWith(product);
  });
});
