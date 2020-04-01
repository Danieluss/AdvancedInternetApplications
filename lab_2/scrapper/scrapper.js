const Puppeteer = require('puppeteer')
const Money = require('money');
const PromisePool = require('es6-promise-pool');
const ProgressBar = require('progressbar');
const FileSystem = require('fs');

var ArgumentParser = require('argparse').ArgumentParser;

var parser = new ArgumentParser({
  version: '0.0.1',
  addHelp:true,
  description: 'Argparse example'
});
parser.addArgument(
  [ '-c', '--concurrency' ],
  {
    help: 'PromisePool concurrency',
    defaultValue: 32
  }
);
var args = parser.parseArgs();

const CONCURRENCY = Number(args.concurrency);

function url(page) {
    // undamaged, accident-free, steering wheel on the "right" left side, manual gearbox,
    // 5 000 PLN <= price <= 30 000 PLN, VIN number available online (exclude simplest scams)
    // mileage <= 200 000km, 110HP <= engine, age <= 20y 
    return `https://www.otomoto.pl/osobowe/od-2000/?page=${page}&search%5Bfilter_float_price%3Afrom%5D=5000&search%5Bfilter_float_price%3Ato%5D=30000&search%5Bfilter_enum_has_vin%5D=1&search%5Bfilter_float_mileage%3Ato%5D=200000&search%5Bfilter_float_engine_power%3Afrom%5D=110&search%5Bfilter_enum_gearbox%5D%5B0%5D=manual&search%5Bfilter_enum_gearbox%5D%5B1%5D=manual-sequential&search%5Bfilter_enum_damaged%5D=0&search%5Bfilter_enum_no_accident%5D=1&search%5Border%5D=created_at%3Adesc&search%5Bbrand_program_id%5D%5B0%5D=&search%5Bcountry%5D=`
}

async function run() {
    const browser = await Puppeteer.launch();
    const page = await newPage();

    await page.goto(url(1));
    await page.addScriptTag({ url: 'https://code.jquery.com/jquery-3.4.1.min.js' });
    const noResults = await page.evaluate(() => {
       const $ = window.$;
       return Number($('.om-pager li:nth-last-child(2) a .page')[0].innerText);
   });
    page.close();
   
    var pageUrls = [...Array(noResults).keys()].map((k) => url(k + 1));

    var accData = [];

    const mileageCost = 2;
    const priceCost = 2;
    const ageCost = 0.5;

    const progressBar = ProgressBar.create().step('Scrapping the web');
    progressBar.setTotal(noResults);

    const promiseProducer = () => {
        const url = pageUrls.pop();
        return url ? scrap(url).catch((e) => {
            console.log("\nSome error occured while scrapping \n" + url + "\n" + e);
        }) : null;
    };

    const pool = new PromisePool(promiseProducer, CONCURRENCY);
    await pool.start();
    
    accData.sort((item_1, item_2) => {
        return item_2.value - item_1.value;
    });

    console.log(accData.slice(0, 10));
    await browser.close();

    var stream = FileSystem.createWriteStream("output.txt");
    stream.once('open', function(fd) {
        stream.write(JSON.stringify(accData, null, 2));
        stream.end();
    });

    async function newPage() {
        var page = await browser.newPage();
  
        await page.setRequestInterception(true);
        // keep scripts so that content is rendered properly
        page.on('request', (request) => {
            if (['image', 'stylesheet', 'font'].indexOf(request.resourceType()) !== -1) {
                request.abort();
            } else {
                request.continue();
            }
        });

        return page;
    }

    async function scrap(url) {
        const page = await newPage();
        const data = await visit(url);
        await page.close();

        data.name.forEach((name, i) => {
            if(data.currency[i] !== 'PLN')
                Money(data.price[i]).from(data.currency[i]).to('PLN'); 
            accData.push(
                {
                    name: name,
                    value: 1 - 
                        ( mileageCost * data.mileage[i] / 200_000 
                            + priceCost * (data.price[i] - 5_000) / 25_000 
                            + ageCost * data.age[i] / 20 ) 
                        / (mileageCost + priceCost + ageCost),
                    url: data.url[i]
                });
        });

        progressBar.addTick();
    
        async function visit(url) {
            await page.goto(url);
            await page.addScriptTag({ url: 'https://code.jquery.com/jquery-3.4.1.min.js' });
    
            return await page.evaluate(() => {
                const $ = window.$;
                const numberRegex = /(\d+)/g;
                var data = {};
    
                function get(selector, fun) {
                    return $(selector).toArray().map(fun);
                }
    
                function getNumber(selector) {
                    return get(selector, (element) => {
                        text = element.innerText;
                        return Number(text.match(numberRegex).join(''));
                    });
                }
    
                data.name = get('.offer-title a', (element) => {
                    return element.text.trim();
                });
                data.mileage = getNumber('li.ds-param[data-code="mileage"] span');
                data.price = getNumber('span.offer-price__number span:first-child()');
                data.currency = get('span.offer-price__number span:nth-child(2)', (element) => {
                    return element.innerText;
                });
                data.age = get('li.ds-param[data-code="year"] span', (element) => {
                    text = element.innerText;
                    return number = 2020 - Number(text);
                });
                data.url = get('a.offer-title__link', (element) => {
                    return element.getAttribute('href');
                });
    
                return data;
            });
        }
    };
}

run();