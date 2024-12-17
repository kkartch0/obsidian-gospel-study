import { StudyDataParser } from "src/models/StudyDataParser";
import { standardUrlStudyDataParser } from "./standardUrlStudyDataParser";
import { numberOnlyUrlStudyDataParser } from "./numberOnlyUrlStudyDataParser";
import { textFragmentUrlStudyDataParser } from "./textFragmentCase1UrlStudyDataParser";

export const registeredStudyDataParsers: StudyDataParser[] = [
	standardUrlStudyDataParser,
	numberOnlyUrlStudyDataParser,
	textFragmentUrlStudyDataParser
];
