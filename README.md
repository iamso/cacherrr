cacherrr
=======
simple caching for the browser

Install
-------

### With Bower

```bash
bower install cacherrr
```

### With NPM

```bash
npm install cacherrr
```

Example Setup
-------------

### Javascript
```javascript
import Cacherrr from 'cacherrr';

// create an instance
const cacherrr = new Cacherrr();

// set cached data for path
cacherrr.set('/path', {key: 'value'})
  .then(data => {console.log(data);})
  .catch(e => {console.error(e);});

// get cached data for path
cacherrr.get('/path')
  .then(data => {console.log(data);})
  .catch(e => {console.error(e);});

// clear cache for path
cacherrr.clear('/path');

// clear entire cache
cacherrr.clearAll();

```


License
-------

[MIT License](LICENSE)
