
let cryptoData = [];
const openPriceSelect = document.getElementById('openPriceSelect');
const baseAssetSelect = document.getElementById('baseAssetSelect');

$(document).ready( () => {


   getData();

   // Set table properties
   $('#crypto-table').DataTable({
      data: cryptoData,
      columns: [
         { data: 'symbol' },
         { data: 'baseAsset' },
         { data: 'openPrice' },
         { data: 'lowPrice' },
         { data: 'highPrice' },
         { data: 'lastPrice' },
         { data: 'volume' }
      ],
      columnDefs: [
         { targets: [1,2,3,4,5,6], className: 'text-right' }
      ],
      pageLength: 10,
      lengthMenu: [ [5, 10, 25], [5, 10, 25] ]

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
         console.log(data); // TODO delete

         cryptoData = data;
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

