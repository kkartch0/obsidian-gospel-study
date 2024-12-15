import { StudyDataParser } from "src/models/StudyDataParser";
import { standardUrlStudyDataParser } from "./standardUrlStudyDataParser";
import { numberOnlyUrlStudyDataParser } from "./numberOnlyUrlStudyDataParser";

export const registeredStudyDataParsers: StudyDataParser[] = [
	standardUrlStudyDataParser,
	numberOnlyUrlStudyDataParser
];
