import { UrlParser } from "src/models/UrlParser";
import { standardUrlParser } from "./standardUrlParser";

export const registeredUrlParsers: UrlParser[] = [
	standardUrlParser
];
