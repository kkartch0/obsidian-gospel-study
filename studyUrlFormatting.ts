
/**
 * Moves the 'lang' parameter to the front of the search parameters in the given URL.
 * @param url - The URL to modify.
 * @returns The modified URL with the 'lang' parameter moved to the front.
 * 
 * @example
 * const url = "https://www.churchofjesuschrist.org/study/general-conference/2023/10/13daines?id=p33%23p33&lang=eng";
 * const modifiedUrl = moveLangParamToFrontOfSearchParams(url);
 * console.log(modifiedUrl);
 * // Output: "https://www.churchofjesuschrist.org/study/general-conference/2023/10/13daines?lang=eng&id=p33%23p33"
 * @remarks
 * There are times when the 'lang' parameter is not the first parameter in the URL which makes it so the language 
 * defaults to whatever the user has set on the churchofjesuschrist.org website. Moving lang to the front ensures 
 * that the language is set correctly.
 */
export function moveLangParamToFrontOfSearchParams(url: string): string {
    const urlObject = new URL(url);
    const lang = urlObject.searchParams.get("lang");
    urlObject.search = "";
    if (lang) {
        urlObject.searchParams.append("lang", lang);
    }
    const searchParams = new URLSearchParams(url.split("?")[1]);
    searchParams.forEach((value, key) => {
        if (key !== "lang") {
            urlObject.searchParams.append(key, value);
        }
    });

    url = urlObject.toString();
    return url;
}

/**
 * Replaces all occurrences of "%23" with "#" in the given URL.
 * 
 * @param url - The URL to be processed.
 * @returns The modified URL with "%23" replaced by "#".
 * @example
 * const url = "https://www.churchofjesuschrist.org/study/general-conference/2023/10/13daines?lang=eng&id=p33%23p33";
 * const modifiedUrl = moveLangParamToFrontOfSearchParams(url);
 * console.log(modifiedUrl);
 * // Output: "https://www.churchofjesuschrist.org/study/general-conference/2023/10/13daines?lang=eng&id=p33#p33"
 */
export function replacePercent23WithHash(url: string): string {
    return url.replace(/%23/g, "#");
}
