import { RequestUrlResponse, RequestUrlResponsePromise } from "obsidian";
import fs from 'fs';
import { string } from "yaml/dist/schema/common/string";

export function requestUrl(url: string): Promise<RequestUrlResponse> {
  const urlToHtmlFileMap: { [key: string]: string } = {
    "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/22?lang=eng&id=2#p2": "2nephi22.2.html"
  };

  const htmlFileName = urlToHtmlFileMap[url];
  const htmlFileContent = fs.readFileSync(`__mocks__/${htmlFileName}`, 'utf8');

  return new Promise((resolve, reject) => {

    resolve({
      status: 0,
      headers: {},
      arrayBuffer: new ArrayBuffer(0),
      json: null,
      text: htmlFileContent,
    });
  });

}