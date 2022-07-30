const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const url = 'https://www.coop.ch/en/promotions/weekly-special-offers/special-offers-fruits-vegetables/c/m_1434';
  const browser = await puppeteer.launch({ headless: false, slowMo: 250, devtools: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(url);

  try {

    const promotions = await page.evaluate(() => {
      const products = document.querySelectorAll('div.productTile__wrapper');
      const results = []
      const textContent = elem => elem ? elem.textContent.trim() : '';

      products.forEach(product => {
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
    console.log(promotions)
    const promotionsString = JSON.stringify(promotions);
    fs.writeFile("promotions.json", promotionsString, (err, result) => {
      if(err) console.log('error', err);
  });

  } catch (error) {
    console.log(error);
  }
  await browser.close();
})();
