import { render, screen } from "@testing-library/react";
import TransactionCreateStepTwo from "./TransactionCreateStepTwo";

test("on initial render, the pay button is disable", async () => {
  render(<TransactionCreateStepTwo sender={{ sender: "5" }} receiver={{ id: "2" }} />);
  //   screen.debug(); //for see all render html
  //   screen.getByRole(""); //for see categories on page
  expect(await screen.findByRole("button", { name: "Pay" })).toBeDisabled();
  //   expect(await screen.findByRole("button", { name: "Pay" })).toBeEnabled();
});
