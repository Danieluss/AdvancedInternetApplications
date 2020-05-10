# lab5

### Build & run
####[1] docker-compose
```
docker-compose build
docker-compose up
```
####[2] without docker-compose
You need mongodb `3.6+` running locally at `27017`.

```
npm install
npm start
```

### Populate mongo

```
node ./seed/seeder.js
```

### View

Navigate to `localhost:8000`.

