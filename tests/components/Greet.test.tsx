import Greet from "../../src/components/Greet";
import { render, screen } from "@testing-library/react";

describe("Greet", () => {
	it("should render Hello with the name when name is provided", () => {
		render(<Greet name="Tokhirjon" />);

		const heading = screen.getByRole("heading");
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent(/Tokhirjon/i);
	});

	it("should render login button when name is not provided", () => {
		render(<Greet />);

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent(/login/i);
	});
});
