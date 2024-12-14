import { StudyDataParser } from "src/models/StudyDataParser";
import { standardUrlStudyDataParser } from "./standardUrlStudyDataParser";
import { numberOnlyUrlStudyDataParser } from "./numberOnlyUrlStudyDataParser";
import { androidStudyDataParser } from "./androidStudyDataParser";

export const registeredStudyDataParsers: StudyDataParser[] = [
	standardUrlStudyDataParser,
	numberOnlyUrlStudyDataParser,
	androidStudyDataParser,
];
