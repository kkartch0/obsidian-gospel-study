import { UrlParser } from "src/models/UrlParser";
import { defaultUrlParser } from "./defaultUrlParser";

export const registeredUrlParsers: UrlParser[] = [
	defaultUrlParser
];
