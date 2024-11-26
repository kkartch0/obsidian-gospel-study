import { UrlParser } from "src/models/UrlParser";
import { standardUrlParser } from "./standardUrlParser";
import { numberOnlyUrlParser } from "./numberOnlyUrlParser";

export const registeredUrlParsers: UrlParser[] = [
	standardUrlParser,
	numberOnlyUrlParser
];
