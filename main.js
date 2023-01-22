

$(document).ready(() => {

   $('#spinner').load('./src/spinner.html');
   $('#main').load('./src/main.html', () => {

      loadStyle('table');
      $.getScript( './src/index.js');
      
   });
 });


 /**
  * Load a .css file from src by the styleName given
  * @param {string} styleName 
  */
 function loadStyle(styleName) {
   
   const link = document.createElement("link");
   link.href = `./src/${styleName}.css`;
   link.type = 'text/css';
   link.rel = 'stylesheet';
   document.getElementsByTagName('head')[0].appendChild(link);

 }