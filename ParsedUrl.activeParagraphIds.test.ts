import ParsedUrl from "./ParsedUrl";

describe("ParsedUrl", () => {
	describe("activeParagraphIds", () => {
		it("should return an array of active paragraph IDs", () => {
			// Arrange
			const urlString = "https://example.com/?id=p1,p2-p5,p6";
			const parsedUrl = new ParsedUrl(urlString);

			// Act
			const result = parsedUrl.activeParagraphIds;

			// Assert
			const expectedIds = ["p1", "p2", "p3", "p4", "p5", "p6"];
			expect(result).toEqual(expectedIds);
		});

		it("should return an empty array if no active paragraph IDs are found", () => {
			// Arrange
			const urlString = "https://example.com";
			const parsedUrl = new ParsedUrl(urlString);

			// Act
			const result = parsedUrl.activeParagraphIds;

			// Assert
			const expectedIds: string[] = [];
			expect(result).toEqual(expectedIds);
		});
	});
});
