const translations = {
  en: {
   our_current_reviews: 'Our current reviews',
   ratings: 'ratings'
  },
  nl: {
    our_current_reviews: 'Onze actuele beoordelingen',
    ratings: 'beoordelingen'
  }
}

const locale = window.bakaGlassConfig.locale || 'en';

const root = document.getElementsByTagName('baka-glass-ratings')[0];

const titleRoot = document.createElement('div');
titleRoot.className = 'baka-glass-ratings-title-root';

const title = document.createElement('h3');
title.appendChild(document.createTextNode(translations[locale].our_current_reviews))
titleRoot.appendChild(title);

const totalRatings = document.createElement('p');
titleRoot.appendChild(totalRatings);

const grade = document.createElement('div');
grade.className = 'baka-glass-ratings-grade';

root.appendChild(titleRoot);
root.appendChild(grade);

const css = `
  baka-glass-ratings {
    font-family: sans-serif;
  }

  .baka-glass-ratings-title-root {
    max-width: 300px;
    display: inline-block;
    padding-right: 25px;
    vertical-align: top;
    margin-top: 15px;
  }
  .baka-glass-ratings-title-root > h3 {
    margin-top: 0;
    font-size: 20px;
  }
  .baka-glass-ratings-title-root > p {
    font-size: 20px;
  }

  .baka-glass-ratings-grade {
    width: 100px;
    height: 100px;
    display: inline-block;
    background: red;
    border-radius: 50%;
    text-align: center;
    line-height: 100px;
    font-size: 50px;
    color: grey;
    background: lightgrey;
  }
`;
const head = document.head || document.getElementsByTagName('head')[0];
const style = document.createElement('style');

head.appendChild(style);

if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

fetch(window.bakaGlassConfig.url + '/api/integrations/ratings')
  .then(response => response.json())
  .then(data => {
    grade.appendChild(document.createTextNode(data.average))
    totalRatings.appendChild(document.createTextNode(data.amount + ' ' + translations[locale].ratings))
  })
;