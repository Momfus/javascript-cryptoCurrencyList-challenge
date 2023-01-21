
let cryptoData = [];

$(document).ready( () => {

   
   getData();

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

   })
   // Add a function to add and fix the error to show when the sort column is asc or desc
   .on('draw.dt', function () {
 
      let sortedColumn = $(this).DataTable().order()[0][0];
    
      // Remove the icons if others columsn have
      $('th i').remove();
    
      // Add arrow for asc or desc sort
      if ($(this).DataTable().order()[0][1] === 'asc') {
        $('th:eq(' + sortedColumn + ')').append('<i class="bi bi-arrow-down"></i>');
      } else {
        $('th:eq(' + sortedColumn + ')').append('<i class="bi bi-arrow-up"></i>');
      }
    });

   // add custom event filters
   $('#searchBar').on('keyup', function() {
      $('#crypto-table').DataTable().search(this.value).draw();
   });

   // Hide default search
   $('.dataTables_filter').hide();

});


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
      url: "https://api.wazirx.com/sapi/v1/tickers/24hr",
      method: "GET",
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

