
let cryptoData = [];
const openPriceSelect = document.getElementById('openPriceSelect');
const baseAssetSelect = document.getElementById('baseAssetSelect');

$(document).ready( () => {


   getData();

   const table = $('#crypto-table').DataTable({
      data: cryptoData,
      responsive: true,
      columns: [
         { data: 'symbol' },
         { data: 'baseAsset' },
         { data: 'openPrice' },
         { data: 'lastPrice' },
         { data: 'changePercent'},
         { data: 'highPrice' },
         { data: 'lowPrice' },
         { data: 'volume' }
      ],
      columnDefs: [
         { targets: [1,2,3,4,5], className: 'text-right' }
      ],
      pageLength: 10,
      lengthMenu: [ [5, 10, 25], [5, 10, 25] ]

   });

   // Link sort filters with column functions
   table.on('draw.dt', function () {

      // Check for the colums to sort
      let sortedColumn = $(this).DataTable().order()[0][0];
      let typeSort = 'asc';
      setSortSelectValues(sortedColumn, typeSort);

      // Add the correct class color for percent change
      $('#crypto-table tbody tr').each(function () {
         const row = $(this);
         const rowData = table.row(row).data();
      
         if( rowData.isPositive ) {
            $(this).find('td:nth-child(5)').addClass('text-success');
         } else {
            $(this).find('td:nth-child(5)').addClass('text-danger');
         }
      });
  
   });

   
   // add custom event filters
   $('#searchBar').on('keyup', function() {
      $('#crypto-table').DataTable().search(this.value).draw();
   });

   openPriceSelect.addEventListener('change', sortOpenPrice);
   baseAssetSelect.addEventListener('change', sortBaseAsset);

   // Hide default search
   $('.dataTables_filter').hide();


});

function setSortSelectValues( columnIndex, typeSortString ) {
   if( columnIndex === 1 ) {

      openPriceSelect.value = 'noSorting';
      if( typeSortString === 'asc') {
         baseAssetSelect.value = 'A-Z';
      } else {
         baseAssetSelect.value = 'Z-A';
      }

   } else if( columnIndex === 2 ) {

      baseAssetSelect.value = 'noSorting';
      if( typeSortString === 'asc') {
         openPriceSelect.value = 'lowToHigh';
      } else {
         openPriceSelect.value = 'highToLow';
      }

   } else {

      baseAssetSelect.value = 'noSorting';
      openPriceSelect.value = 'noSorting';
   }
}

function showHideLoadData( show ) {

   $('#noDataFound').hide();

   if( show ) {
      $('#isDataLoading').hide();
      $('#isDataLoaded').show();
   } else {
      $('#isDataLoading').show();
      $('#isDataLoaded').hide();
   }
      
}

function getData() {

   showHideLoadData(false);

   $.ajax({
      url: 'https://api.wazirx.com/sapi/v1/tickers/24hr',
      method: 'GET',
      success: (data) => {
         cryptoData = setFormatData(data);
         showHideLoadData(true);

         $('#crypto-table').DataTable().clear().rows.add(cryptoData).draw();

      },
      error: function(error) {
         console.error(error);
      }
   });
}


function sortOpenPrice() {

   const selectedValue = openPriceSelect.value;
   let orderType;

   switch( selectedValue ) {
      
      case 'lowToHigh': {
         orderType = 'asc';
         break;
      }
      
      case 'highToLow': {
         orderType = 'desc';
         break;
      }

      default: {
         $('#crypto-table').DataTable().order([0, 'asc']).draw();
         return;
      }

   }

   baseAssetSelect.value = 'noSorting';
   $('#crypto-table').DataTable().order([2, orderType]).draw();
}

function sortBaseAsset() {

   const selectedValue = baseAssetSelect.value;
   let orderType;

   switch(selectedValue) {

      case 'A-Z': {
         orderType = 'asc';
         break;
      }

      case 'Z-A': {
         orderType = 'desc';
         break;
      }

      default: {
         $('#crypto-table').DataTable().order([0, 'asc']).draw();
         return;
      }

   }

   openPriceSelect.value = 'noSorting';
   $('#crypto-table').DataTable().order([1, orderType]).draw();
}

function setFormatData(data) {
   return data.map(item => {

      const diff = (item.lastPrice - item.openPrice);

      const changePercent = (diff / item.openPrice * 100).toFixed(4);
      
      const isPositive =  (diff >= 0 )? true : false;
      const signSymbol = (isPositive )? '▲': '▼';

      let newData = {
         symbol: splitSymbolFormat(item.symbol, item.baseAsset),
         baseAsset: item.baseAsset,
         openPrice: toScientificNotation(item.openPrice),
         lastPrice: toScientificNotation(item.lastPrice),
         lowPrice: toScientificNotation(item.lowPrice),
         highPrice: toScientificNotation(item.highPrice),
         askPrice: toScientificNotation(item.askPrice),
         bidPrice: toScientificNotation(item.bidPrice),
         volume: toScientificNotation(item.volume),
         isPositive,
         changePercent: signSymbol + ' ' + changePercent + '%'
       };

       return newData;
   });
}

function toScientificNotation(number, dataLenght = 6){
   if(number.length >= dataLenght) {
      return parseFloat(number).toExponential();
   } else {
      return number;
   }
}


function splitSymbolFormat(symbol, baseAsset) {

   return symbol.replace(baseAsset, baseAsset + ' / ');
}

function isOutOfRange(number, limit) {
   return (number > limit || number < 1 / limit);
}