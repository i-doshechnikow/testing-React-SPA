import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TransactionCreateStepTwo from "./TransactionCreateStepTwo";

test("on initial render, the pay button is disable", async () => {
  render(<TransactionCreateStepTwo sender={{ sender: "5" }} receiver={{ id: "2" }} />);
  //   screen.debug(); //for see all render html
  //   screen.getByRole(""); //for see categories on page
  expect(await screen.findByRole("button", { name: "Pay" })).toBeDisabled();
  //   expect(await screen.findByRole("button", { name: "Pay" })).toBeEnabled();
});

test("if an amount and note is entered, the pay button becomes enabled", async () => {
  render(<TransactionCreateStepTwo sender={{ sender: "5" }} receiver={{ id: "2" }} />);
  
  userEvent.type(screen.getByPlaceholderText("Amount"), "50");
  userEvent.type(screen.getByPlaceholderText("Add a note"), "dinner");

  expect(await screen.findByRole("button", { name: "Pay" })).toBeEnabled();
});
