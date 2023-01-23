

$(document).ready(() => {

   loadStyle('spinner');

   $('#spinner').load('./public/src/spinner.html');
   $('#main').load('./public/src/main.html', () => {

      loadStyle('table');
      $.getScript( './public/src/index.js');
      
   });
 });


 /**
  * Load a .css file from src by the styleName given
  * @param {string} styleName 
  */
 function loadStyle(styleName) {
   
   const link = document.createElement("link");
   link.href = `./public/src/styles/${styleName}.css`;
   link.type = 'text/css';
   link.rel = 'stylesheet';
   document.getElementsByTagName('head')[0].appendChild(link);

 }