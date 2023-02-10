import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TestingProvider } from "@modules/testing-utils";

import { FeedbackForm } from "../FeedbackForm";

describe("FeedbackForm", () => {
  describe("basic functionality", () => {
    test("should render inputs for name, email, rating and comment", async () => {
      render(<FeedbackForm />, { wrapper: TestingProvider });

      expect(screen.getByRole("textbox", { name: "name" })).toBeVisible();
      expect(screen.getByRole("textbox", { name: "email" })).toBeVisible();
      expect(
        screen.getByRole("radiogroup", {
          name: "How would you rate our product?",
        })
      ).toBeVisible();
      expect(screen.getByRole("textbox", { name: "comment" })).toBeVisible();
    });

    test("form should hold input values", async () => {
      const user = userEvent.setup();

      render(<FeedbackForm />, { wrapper: TestingProvider });

      await user.type(
        screen.getByRole("textbox", { name: "name" }),
        "John Doe"
      );

      expect(screen.getByRole("textbox", { name: "name" })).toHaveValue(
        "John Doe"
      );

      await user.type(
        screen.getByRole("textbox", { name: "email" }),
        "john.doe@mail.com"
      );

      expect(screen.getByRole("textbox", { name: "email" })).toHaveValue(
        "john.doe@mail.com"
      );

      await user.click(screen.getByRole("radio", { name: "4 star" }));

      expect(screen.getByRole("radio", { name: "4 star" })).toBeChecked();

      await user.type(
        screen.getByRole("textbox", { name: "comment" }),
        "This product is very good! One star off because it coule be even better."
      );

      expect(screen.getByRole("textbox", { name: "comment" })).toHaveValue(
        "This product is very good! One star off because it coule be even better."
      );
    });
  });

  describe("accessibility by keyboard", () => {
    test("name should be focusable by tab key", async () => {
      const user = userEvent.setup();

      render(<FeedbackForm />, { wrapper: TestingProvider });

      expect(screen.getByRole("textbox", { name: "name" })).not.toHaveFocus();

      await user.tab();

      expect(screen.getByRole("textbox", { name: "name" })).toHaveFocus();
    });

    test("email should be focusable by tab key", async () => {
      const user = userEvent.setup();

      render(<FeedbackForm />, { wrapper: TestingProvider });

      expect(screen.getByRole("textbox", { name: "email" })).not.toHaveFocus();

      await user.tab();
      await user.tab();

      expect(screen.getByRole("textbox", { name: "email" })).toHaveFocus();
    });

    test("star rating should be selectable by arrow keys", async () => {
      const user = userEvent.setup();

      render(<FeedbackForm />, { wrapper: TestingProvider });

      expect(screen.getByRole("radio", { name: "1 star" })).not.toHaveFocus();
      expect(screen.getByRole("radio", { name: "2 star" })).not.toHaveFocus();
      expect(screen.getByRole("radio", { name: "3 star" })).not.toHaveFocus();
      expect(screen.getByRole("radio", { name: "4 star" })).not.toHaveFocus();
      expect(screen.getByRole("radio", { name: "5 star" })).not.toHaveFocus();

      await user.tab();
      await user.tab();
      await user.tab();

      expect(screen.getByRole("radio", { name: "1 star" })).toHaveFocus();

      await user.keyboard("[ArrowDown]");

      expect(screen.getByRole("radio", { name: "2 star" })).toHaveFocus();

      await user.keyboard("[ArrowDown]");

      expect(screen.getByRole("radio", { name: "3 star" })).toHaveFocus();

      await user.keyboard("[ArrowDown]");

      expect(screen.getByRole("radio", { name: "4 star" })).toHaveFocus();

      await user.keyboard("[ArrowDown]");

      expect(screen.getByRole("radio", { name: "5 star" })).toHaveFocus();
    });

    test("comment should be focusable by tab key", async () => {
      const user = userEvent.setup();

      render(<FeedbackForm />, { wrapper: TestingProvider });

      expect(
        screen.getByRole("textbox", { name: "comment" })
      ).not.toHaveFocus();

      await user.tab();
      await user.tab();
      await user.tab();
      await user.tab();

      expect(screen.getByRole("textbox", { name: "comment" })).toHaveFocus();
    });
  });

  describe("failing validations should be alerted by error message upon submission", () => {
    test("missing name", async () => {
      const user = userEvent.setup();

      render(<FeedbackForm />, { wrapper: TestingProvider });

      expect(
        screen.getByRole("textbox", { name: "name" })
      ).not.toHaveErrorMessage("This field is required.");

      await user.click(screen.getByRole("button", { name: "Send" }));
      await screen.findAllByRole("alert");

      expect(screen.getByRole("textbox", { name: "name" })).toHaveErrorMessage(
        "This field is required."
      );
    });

    test("missing email", async () => {
      const user = userEvent.setup();

      render(<FeedbackForm />, { wrapper: TestingProvider });

      expect(
        screen.getByRole("textbox", { name: "email" })
      ).not.toHaveErrorMessage("This field is required.");

      await user.click(screen.getByRole("button", { name: "Send" }));
      await screen.findAllByRole("alert");

      expect(screen.getByRole("textbox", { name: "email" })).toHaveErrorMessage(
        "This field is required."
      );
    });

    test("missing rating", async () => {
      const user = userEvent.setup();

      render(<FeedbackForm />, { wrapper: TestingProvider });

      expect(
        screen.getByRole("radiogroup", {
          name: "How would you rate our product?",
        })
      ).not.toHaveErrorMessage("This field is required.");

      await user.click(screen.getByRole("button", { name: "Send" }));
      await screen.findAllByRole("alert");

      expect(
        screen.getByRole("radiogroup", {
          name: "How would you rate our product?",
        })
      ).toHaveErrorMessage("This field is required.");
    });

    test("missing comment", async () => {
      const user = userEvent.setup();

      render(<FeedbackForm />, { wrapper: TestingProvider });

      expect(
        screen.getByRole("textbox", { name: "comment" })
      ).not.toHaveErrorMessage("This field is required.");

      await user.click(screen.getByRole("button", { name: "Send" }));
      await screen.findAllByRole("alert");

      expect(
        screen.getByRole("textbox", { name: "comment" })
      ).toHaveErrorMessage("This field is required.");
    });

    test("invalid email format", async () => {
      const user = userEvent.setup();

      render(<FeedbackForm />, { wrapper: TestingProvider });

      expect(
        screen.getByRole("textbox", { name: "email" })
      ).not.toHaveErrorMessage("Invalid email address.");

      await user.type(
        screen.getByRole("textbox", { name: "email" }),
        "invalid-email"
      );
      await user.click(screen.getByRole("button", { name: "Send" }));
      await screen.findAllByRole("alert");

      expect(screen.getByRole("textbox", { name: "email" })).toHaveErrorMessage(
        "Invalid email address."
      );
    });
  });
});
