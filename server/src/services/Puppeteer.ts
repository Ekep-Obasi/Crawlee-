import puppeteer, { Browser, Page } from "puppeteer";
import { SCRAPE_TARGET_URL } from "../constants";
import {CategoryGroups, Data} from '../types';

async function getNumberOfPages(category: CategoryGroups, browser: Browser) {

  const page: Page = await browser.newPage();

  if(!category) throw new Error('Invalid Category');

  await page.goto(`${SCRAPE_TARGET_URL}/${category}`, {
    waitUntil: "domcontentloaded",
  });

  const numberOfPages = await page.evaluate(() => {
    const paginationPageLinks = document.querySelector('.page-nav')?.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>

    const [linkOfArrVals] = Array.from(paginationPageLinks).map((a) => a.getAttribute('title')).slice(-2, -1);

    return linkOfArrVals !== null ? +linkOfArrVals : 0;
    
  })

  return numberOfPages;
}



export default async function getData (category: CategoryGroups) {

  const browser = await puppeteer.launch({ headless: true });  

    const page: Page = await browser.newPage();

    await page.goto(`${SCRAPE_TARGET_URL}/${category}/`, {
      waitUntil: "domcontentloaded",
    });

    const res = await page.evaluate(() => {
    const categories = document.querySelectorAll(".td-block-span6") as NodeListOf<HTMLElement>;

    return Array.from(categories).map((category) => {

      const imageElement = category.querySelector(".entry-thumb") as HTMLImageElement;

      const headingElement = category.querySelector("h3") as HTMLHeadingElement;

      const anchorElement = headingElement?.querySelector("a") as HTMLAnchorElement;

      const time = category.querySelector('time')?.getAttribute('datetime');

      const tag = category.querySelector('.td-post-category') as HTMLAnchorElement;

      return {
        title: headingElement.innerText,
        image: imageElement.src,
        address: anchorElement.href,
        datetime: time,
        label: tag.innerText, 
      };
    }); 

  });

  await browser.close();

  return res;
}



