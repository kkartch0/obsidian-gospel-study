
/**
 * Standardizes the URL by moving the 'lang' parameter to the front of the search parameters and decoding any percentage 
 * encodings (e.g. %23) in the given URL)
 * 
 * @param url - The URL to standardize.
 * @returns The modified URL with the 'lang' parameter moved to the front and params decoded.
 * 
 * @example
 * const url = "https://www.churchofjesuschrist.org/study/general-conference/2023/10/13daines?id=p33%23p33&lang=eng";
 * const modifiedUrl = moveLangParamToFrontOfSearchParams(url);
 * console.log(modifiedUrl);
 * // Output: "https://www.churchofjesuschrist.org/study/general-conference/2023/10/13daines?lang=eng&id=p33#p33"
 * @remarks
 * There are times when the 'lang' parameter is not the first parameter in the URL which makes it so the language 
 * defaults to whatever the user has set on the churchofjesuschrist.org website. Moving lang to the front ensures 
 * that the language is set correctly.
 */
export function standardizeSearchParams(url: URL): URL {
    const lang = url.searchParams.get("lang");

    const standardizedUrl = new URL(url.toString());
    standardizedUrl.hash = url.hash;
    standardizedUrl.search = "";

    if (lang) {
        standardizedUrl.searchParams.append("lang", lang);
    }
    url.searchParams.forEach((value, key) => {
        if (key !== "lang") {
            standardizedUrl.searchParams.append(key, value);
        }
    });

    standardizedUrl.href = decodeURIComponent(standardizedUrl.href);

    return standardizedUrl;
}