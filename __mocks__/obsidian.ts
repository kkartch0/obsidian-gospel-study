import { RequestUrlParam, RequestUrlResponse } from "obsidian";
import fetch from 'node-fetch';

export function requestUrl(requestUrlParam: RequestUrlParam): Promise<RequestUrlResponse> {
  return new Promise((resolve) => {
    fetch(requestUrlParam.url)
      .then((response: { text: () => string; }) => response.text())
      .then((text: string) => {
        resolve({
          status: 200,
          headers: {},
          arrayBuffer: new ArrayBuffer(0),
          json: null,
          text: text,
        } as RequestUrlResponse);
      })
      .catch((error: { message: string; }) => {
        resolve({
          status: 500,
          headers: {},
          arrayBuffer: new ArrayBuffer(0),
          json: null,
          text: error.message,
        } as RequestUrlResponse);
      });
  });
}