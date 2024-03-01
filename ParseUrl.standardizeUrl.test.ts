import ParsedUrl from "./ParsedUrl";

describe("ParsedUrl", () => {
	describe("standardizeUrl", () => {
		it("should trim the URL", () => {
			// Arrange
			const url = "   https://example.com   ";

			// Act
			const result = ParsedUrl.standardizeUrl(url);

			// Assert
			const expectedUrl = new URL("https://example.com");
			expect(result.href).toEqual(expectedUrl.href);
		});

		it("should replace %23 with # in the URL", () => {
			// Arrange
			const url = "https://example.com/%23section";

			// Act
			const result = ParsedUrl.standardizeUrl(url);

			// Assert
			const expectedUrl = new URL("https://example.com/#section");
			expect(result.href).toEqual(expectedUrl.href);
		});
	});
});
