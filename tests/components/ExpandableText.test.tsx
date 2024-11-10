import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
	const limit = 255;
	const longText = "a".repeat(limit + 1);
	const truncatedText = longText.substring(0, limit) + "...";

	const renderComponent = (text: string) => {
		render(<ExpandableText text={text} />);
	};

	it("should render the full text if less than 255 characters", () => {
		const text = "Short text";
		renderComponent(text);

		expect(screen.getByText(text)).toBeInTheDocument();
	});

	it("should truncate text if longer than 255 characters", () => {
		renderComponent(longText);

		expect(screen.getByText(truncatedText)).toBeInTheDocument();
		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent(/more/i);
	});

	it("should expand text when Show More button is clicked", async () => {
		renderComponent(longText);

		const button = screen.getByRole("button");
		const user = userEvent.setup();
		await user.click(button);

		expect(screen.getByText(longText)).toBeInTheDocument();
		expect(button).toHaveTextContent(/less/i);
	});

	it("should collapse text when Show Less button is clicked", async () => {
		renderComponent(longText);

		const button = screen.getByRole("button");
		const user = userEvent.setup();
		await user.click(button);

		await user.click(button);

		expect(screen.getByText(truncatedText)).toBeInTheDocument();
		expect(button).toHaveTextContent(/more/i);
	});
});
