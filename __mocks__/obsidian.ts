import { RequestUrlResponse, RequestUrlResponsePromise } from "obsidian";
import fs from 'fs';

export function requestUrl(url: string): Promise<RequestUrlResponse> {
  const urlToHtmlFileMap: { [key: string]: string } = {
    "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/22?lang=eng&id=2#p2": "2nephi22.2.html",
    "https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/10?lang=eng&id=p8": "weRejoiceInChrist.html"
  };

  const htmlFileName = urlToHtmlFileMap[url];
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