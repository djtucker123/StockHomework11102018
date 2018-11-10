
$(document).ready(function() {
  
 // build validationList array to validate stock endered by as existing on IEX
//URL retreives entire set of todays valid stocks

const queryURL = `https://api.iextrading.com/1.0/ref-data/symbols`;

// Creating an AJAX call to retreive all the valid stocks
$.ajax({
  url: queryURL,
  method: 'GET'
}).then(function(response) {
 // this push is a test and to be removed upon completion -- 
 //"Lists" is a test to push the response into array upon arrival in single step
  validationLists.push(response);

//push only the valid symbols into the validationList array 
  for (i=0; i<response.length; i++) {
    validationList.push(response[i].symbol);
  };

  
}) 

 
  //dynamic array of buttons built from "stockList array"
  // DYNAMICALLY CREATE BUTTONS that match Array contents, and re-render it each time a new one is added.

  const renders = function() {

    // 1. Create a for-loop to iterate through the stockList array.
    for( let i = 0; i < stockList.length; i++ ) {

      // 2. Create a variable named "stockBtn" equal to $("<button>");
      const stockBtn = $('<button>');

      // 3. Then give each "stockBtn" the following classes: "stock-button".
      stockBtn.addClass('stock-button stock-btn');

      // 4. Then give each "stockBtn" an attribute called "stock-name", eqaual to "stockList[i] array"
      stockBtn.attr('stock-name', stockList[i]);
     
      // 5. Then give each "stockBtn" a text equal to "stocktList[i]" - this is what is listed on the button face.
      stockBtn.text(stockList[i]);

      // 6. Finally, append each "stockBtn" to the "#stockButtons" div.
      $('#stockButtons').append(stockBtn);
     
    }
  }
  
  renders();


// This function handles events where add a stock button is clicked
const addButton = function(event) {

  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box and trim off any white space
  const stock = $('#stock-input').val().trim();


  // here is where I need to add a validation agaisnt validationList array as well as first convert entry to all caps prior to matching
  //convert "stock-input" to all CAPITAL letters
const capitalStock = stock.toUpperCase();
console.log(stock);
console.log(capitalStock);

if (  ! stockList.includes(capitalStock) && (validationList.includes(capitalStock))) {
  alert("  yes that one is in the validaiton Array  " + capitalStock);
  stockList.push(capitalStock);
} else {
  alert(" That one is not the validation array  " + capitalStock);
}
  
  // The stock from the textbox is then added to our array
  
  
  // Deletes the contents of the input
  $('#stock-input').val('');

  //clear stockButtons ID to prevent duplicates and then reload buttons with Renders
  $('#stockButtons').empty();

  // calling renders which handles the processing of our stockList array and regenerates stock buttons
  renders();
}



// displaystockInfo function re-renders the HTML to display the appropriate content
const displayStockInfo = function () {
  //clear card-body for ne news articles for subsequent button push
$('.card-body').empty();
  // Grab the stock symbol from the button clicked and add it to the queryURL
  const stock = $(this).attr('stock-name');
  const queryURL = `https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,news&range=10y&last=10`;

  // Creating an AJAX call for the specific stock button being clicked
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {

console.log(response);
    // Creating a div to hold the stock
    const stockDiv = $('<div>').addClass('stock');

    // Storing the company name
    const companyName = response.quote.companyName;

    // Creating an element to display the company name
    const nameHolder = $('<p>').text(`Company Name: ${companyName}`);

    // Appending the name to our stockDiv
    stockDiv.append(nameHolder);

    // Storing the stock symbol
    const stockSymbol = response.quote.symbol;

    // Creating an element to display the stock symbol
    const symbolHolder = $('<p>').text(`Stock Symbol: ${stockSymbol}`);

    // Appending the symbol to our stockDiv
    stockDiv.append(symbolHolder);

    // Storing the price
    const stockPrice = response.quote.latestPrice;

    // Creating an element to display the price
    const priceHolder = $('<p>').text(`Stock Price: $${stockPrice}`);

    // Appending the price to our stockDiv
    stockDiv.append(priceHolder);
 
    // Finally adding the stockDiv to the DOM
    // Until this point nothing is actually displayed on our page
    $('#stocks-view').empty();
    $('#stocks-view').prepend(stockDiv);
  });

// below will retreive last 10 news articles about specific stock - will append to article DIV so pulled out of basic display

const articleURL = `https://api.iextrading.com/1.0/stock/${stock}/news/last/10`;
// Creating an AJAX call for the specific stock articles - for up to 10 (or however many available if less than 10)

$.ajax({
  url: articleURL,
  method: 'GET'
}).then(function(response2) {

console.log(response2);
const arrayLength = (response2.length);
console.log(arrayLength);
for (i=0; i<arrayLength; i++) {

    const companyNews = response2[i].summary;
    const one = response2[i].headline;
    const two = response2[i].url;
    $('.card-body').append($('<h4>').text(`${one}`));
    $('.card-body').append($('<h6>').text(`Highlight:    ${companyNews}`));
    $('.card-body').append($('<h6>').text(`Link to full article:    ${two}`));
}


})








}

// Even listener for #add-stock button
$('#add-stock').on('click', addButton);

// Adding a click event listener to all elements with a class of 'stock-btn'
$('#stockButtons').on('click', '.stock-button', displayStockInfo);




// // Function for displaying stock data
// const render = function () {

//   // Deleting the stocks prior to adding new stocks
//   // (this is necessary otherwise you will have repeat buttons)
//   $('#buttons-view').empty();

//   // Looping through the array of stocks
//   for (let i = 0; i < stocks.length; i++) {

//     // Then dynamicaly generating buttons for each stock in the array
//     // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
//     const newButton = $('<button>');
    
//     // Adding a class of stock-btn to our button
//     newButton.addClass('stock-btn');
    
//     // Adding a data-attribute
//     newButton.attr('data-name', stocks[i]);
    
//     // Providing the initial button text
//     newButton.text(stocks[i]);
    
//     // Adding the button to the buttons-view div
//     $('#buttons-view').append(newButton);
//   }
// }





// Calling the renderButtons function to display the intial buttons
//render();



// if (validationList.includes("IP")) {
//     console.log('Yes it does exists');
//   } else {
//       console.log('it does not exist'); 
//   };







});