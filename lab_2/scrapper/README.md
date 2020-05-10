```
npm install
```
```
node scrapper.js
```
```
usage: scrapper.js [-h] [-v] [-c CONCURRENCY] [-m MILEAGE] [-p PRICE] [-a AGE]

Argparse example

Optional arguments:
  -h, --help            Show this help message and exit.
  -v, --version         Show program's version number and exit.
  -c CONCURRENCY, --concurrency CONCURRENCY
                        PromisePool concurrency
  -m MILEAGE, --mileage MILEAGE
                        Mileage cost
  -p PRICE, --price PRICE
                        Price cost
  -a AGE, --age AGE     Age cost
```


```
time node scrapper.js
--
real    1m9,547s
user    1m33,418s
sys     0m1,364s
```
```
time node scrapper_puppeteeer.js
--
real    3m3,077s
user    2m27,200s
sys     0m35,919s
```