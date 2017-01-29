import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

/* eslint-disable no-console */

fs.readFile('src/index.html', 'utf8', (err, markup) => {

  if(err){
    return console.log(err);
  }
  // cheerio in memory dom
  const $ = cheerio.load(markup);
 // $('head').prepend('<link rel="stylesheet" href="/styles.css">');

  let dir = './dist';

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  fs.writeFile('dist/index.html', $.html(), 'utf8', (err) => {

    if(err){
      return console.log(err);
    }

    console.log('index.html written to /dist'.green);

  });
});
