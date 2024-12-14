import { execSync } from "child_process"

describe("npm run build", () => {
    it("should build without errors", () => {
        execSync("npm run build");
    })
})