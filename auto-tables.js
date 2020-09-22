const SORT_TYPES = {
  INT: "int",
  STRING: "string",
  DATE: "date",
};

$(document).ready(function() {
  loadAllTableText(); 
  addEventListeners();
});

function addEventListeners() {
  $('.tablesort th').on('click', function() {
    tableSort(this);
  });

  $('.tablesearch-input').on('keyup', function() {
    tableSearch(this);
  });
}


// Table sort

function tableSort(thClicked) {
  var table       = $(thClicked).closest('.tablesort');
  var columnIndex = getCellIndex(thClicked);
  var rows        = $(table).find('tbody tr');
  var sortType    = $(thClicked).attr('data-tablesort-type');

  switch (sortType) {
    case SORT_TYPES.INT:
      rows = sortRowsInt(rows, columnIndex);
      break;
    case SORT_TYPES.STRING:
      rows = sortRowsString(rows, columnIndex);
      break;
    case SORT_TYPES.DATE:
    rows = sortRowsDate(rows, columnIndex);
    break;
  }

  $(table).find('tbody').html(rows);


}

function getCellIndex(th) {
  var index = $(th).closest('table').find('tr').find(th).index();
  return index;
}

function sortRowsString(rows, columnIndex) {

  var sortedRows = rows.sort(function(a, b) {
    var cellsA = $(a).find('td');
    var cellsB = $(b).find('td');
    var textA  = $(cellsA[columnIndex]).text().toUpperCase();
    var textB  = $(cellsB[columnIndex]).text().toUpperCase();

    return textA < textB ? -1 : 1;
  });

  return sortedRows;
}

function sortRowsInt(rows, columnIndex) {
  var sortedRows = rows.sort(function(a, b) {
    var cellsA = $(a).find('td');
    var cellsB = $(b).find('td');
    var numA  = parseInt($(cellsA[columnIndex]).text());
    var numB  = parseInt($(cellsB[columnIndex]).text());

    return numA < numB ? -1 : 1;
  });

  return sortedRows;
}

function sortRowsDate(rows, columnIndex) {
  var sortedRows = rows.sort(function(a, b) {
    var cellsA = $(a).find('td');
    var cellsB = $(b).find('td');
    var numA  = parseInt($(cellsA[columnIndex]).attr('data-tablesort-value'));
    var numB  = parseInt($(cellsB[columnIndex]).attr('data-tablesort-value'));

    return numA < numB ? -1 : 1;
  });

  return sortedRows;
}


// Table Search

function loadAllTableText() {
  var tablesearchTables = $('.tablesearch-table');

  for (var count = 0; count < tablesearchTables.length; count++) 
    loadTableText(tablesearchTables[count]);
  
}

function loadTableText(table) {
  var cells = $(table).find('tbody td');

  for (var count = 0; count < cells.length; count++) {
    var cell = cells[count];
    var upperCaseText = $(cell).text().toUpperCase();
    $(cell).attr('data-tablesearch-text', upperCaseText);
  }
}

function tableSearch(input) {
  var text = $(input).val().toUpperCase();
  var table = $(input).attr('data-tablesearch-table');

  if (text == '' || text.length == 0) {
    $(table).find('tbody tr').removeClass('d-none');
    return;
  }

  $(table).find('tbody tr').addClass('d-none');
  $(table).find('tbody td[data-tablesearch-text*="' + text + '"]').closest('tr').removeClass('d-none');
}