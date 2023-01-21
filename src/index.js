

let cryptoData = [];
let cryptoTable = '';

$(document).ready( () => {

   setupTable();
   getData();
});

function setupTable() {
   cryptoTable = $('#crypto-table').DataTable({
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
      "order": [[ 1, "asc" ]],
  });
}

function showHideLoadData( show, isDataFound ) {

   if( isDataFound ) {

      $('#noDataFound').hide();

      if( show ) {
         $('#isDataLoading').hide();
         $('#isDataLoaded').show();
      } else {
         $('#isDataLoading').show();
         $('#isDataLoaded').hide();
      }

   } else {
      $('#isDataLoading').hide();
      $('#isDataLoaded').hide();

      $('#noDataFound').show();

   }
      
}

function getData() {

   showHideLoadData(false, true);

   $.ajax({
      url: "https://api.wazirx.com/sapi/v1/tickers/24hr",
      method: "GET",
      success: (data) => {
        console.log(data); // TODO delete
  
        cryptoData = data;
        cryptoTable.clear();
        cryptoTable.rows.add(data);
        cryptoTable.draw();

        showHideLoadData(true, cryptoData.length > 0);
  
      },
      error: function(error) {
        console.error(error);
      }
    });
}

function setupFilters() {
   
   $('#base-filter').on('keyup', function() {
      cryptoTable.column(1).search(this.value).draw();
   });

   $('#sort-filter').on('change', function() {
      cryptoTable
            .order([2, this.value])
            .draw();
   });

   $('#order-filter').on('change', function() {
      var column = cryptoTable.order()[0][0];
      cryptoTable
            .order([column, this.value])
            .draw();
   });

}

