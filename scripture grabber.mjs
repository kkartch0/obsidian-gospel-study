import puppeteer from 'puppeteer';
import clipboard from 'clipboardy';

// const url = 'https://www.churchofjesuschrist.org/study/general-conference/2023/10/42freeman?lang=eng&id=p3-p4#p3';
// const url = 'https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/001-conversion?lang=eng&id=p1#p1';

/**
 * Grabs the content of a page and copies it to the clipboard.
 */
async function GrabContent() {
  const url = process.argv[2];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'domcontentloaded' });

  const pageTitle = await page.title();
  const titleLink = `#### [${pageTitle}](${url})\n`;

  let text = titleLink;

  const paragraphs = await page.$$eval('p.active-item', paragraphs => paragraphs.map(p => p.innerHTML));
  paragraphs.forEach((innerHTML, index) => {
    innerHTML = innerHTML.replace("/study/", "https://churchofjesuschrist.org/study/");
    text += `\n${innerHTML}\n`; 
  });

  const tag = "\n#study/general-conference/2023/10/42freeman";

  text += tag;

  clipboard.write(text);
  console.log(text);

  await browser.close();
}

GrabContent();