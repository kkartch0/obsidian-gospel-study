import { RequestUrlParam, RequestUrlResponse, RequestUrlResponsePromise } from "obsidian";
import fs from 'fs';

export function requestUrl(requestUrlParam: RequestUrlParam): Promise<RequestUrlResponse> {
  const urlToHtmlFileMap: { [key: string]: string } = {
    "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/22?lang=eng&id=2#p2": "2nephi22.2.html",
    "https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/10?lang=eng&id=p8": "weRejoiceInChrist.html",
    "https://www.churchofjesuschrist.org/study/general-conference/2023/10/13daines?lang=eng&id=p33#p33": "sirWeWouldLikeToSeeJesus.html",
    "https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/5?lang=eng&id=p1-p2#p1": "1nephi5.1-2.html",
    "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/10?lang=eng&id=24#p24": "2nephi10.24.html",
    "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/14?lang=eng&id=p4-p5": "mosiah14.4-5.html",
    "https://www.churchofjesuschrist.org/study/general-conference/2023/10/15christofferson?lang=eng&id=p4#p4": "theSealingPower.html",
    "https://www.churchofjesuschrist.org/study/scriptures/sacrament/water?lang=eng&id=p1": "blessingOnTheWater.html",
  };

  const htmlFileName = urlToHtmlFileMap[requestUrlParam.url];
  const htmlFileContent = fs.readFileSync(`__mocks__/${htmlFileName}`, 'utf8');

  return new Promise((resolve) => {
    resolve({
      status: 0,
      headers: {},
      arrayBuffer: new ArrayBuffer(0),
      json: null,
      text: htmlFileContent,
    } as RequestUrlResponse);
  });

}