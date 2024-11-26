import { RequestUrlParam, RequestUrlResponse } from "obsidian";

export function requestUrl(requestUrlParam: RequestUrlParam): Promise<RequestUrlResponse> {
  return new Promise((resolve) => {
    fetch(requestUrlParam.url)
      .then(response => response.text())
      .then(text => {
        resolve({
          status: 200,
          headers: {},
          arrayBuffer: new ArrayBuffer(0),
          json: null,
          text: text,
        } as RequestUrlResponse);
      })
      .catch(error => {
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