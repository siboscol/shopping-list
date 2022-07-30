const puppeteer = require('puppeteer');
const fs = require('fs');

const getBeersFromPage = async (page) => {
  return await page.evaluate(() => {
    const beersPage = document.querySelectorAll('div.productTile__wrapper');
    const results = []
    const textContent = elem => elem ? elem.textContent.trim() : '';

    beersPage.forEach(product => {
      results.push(
        {
          title: textContent(product.querySelector('p.productTile-details__name-value')),
          price: textContent(product.querySelector('p.productTile__price-value-lead-price')),
          oldPrice: textContent(product.querySelector('p.productTile__price-value-lead-price-old')).replace('was  ', ''),
          imageUrl: product.querySelector('img.product-listing__thumbnail__image').getAttribute('src').replace('15_15', '310_310').replace('//', '')
        }
      )
    })
    return results;
  })
}

const saveListToFile = (list, fileName) => {
  const objectString = JSON.stringify(list);
  fs.writeFile(fileName, objectString, (err, result) => {
    if (err) console.log('error', err);
  });
}


(async () => {
  const url = 'https://www.coop.ch/en/food/drinks/beer/c/m_0260?q=%3AspecialOffers&sort=specialOffers&pageSize=60';
  const browser = await puppeteer.launch({ headless: false, slowMo: 250, devtools: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(url);

  try {
    let totalBeers = []
    
    while (await page.$('a.pagination__next')) {
      const beersByPage = await getBeersFromPage(page)
      totalBeers.push(...beersByPage)
      await page.click('a.pagination__next')
      await page.waitForTimeout(5000)
    }

    const beersByPage = await getBeersFromPage(page)
    totalBeers.push(...beersByPage)

    console.log(totalBeers)
    saveListToFile(totalBeers, 'beers.json')
  } catch (error) {
    console.log(error);
  }
  await browser.close();
})();
