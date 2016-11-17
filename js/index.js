// Updates global variables when numbers are clicked
function set_operation(operation) {
  if ($("#display").text() != "0") {
    numbers[numbers.length] = $("#display").text();
  }
  operator = operation;
  operating = true;
  console.log(numbers);
}

// Performs passed operation on global numbers array
function operate(operator) {
  var result = numbers[0];
  for(var i = 1; i < numbers.length; i++) {
    result = eval(result + operator + numbers[i])
  }
  return result;
};

// Updates display by calling operator in global operator variable
function process_operation() {
  console.log(numbers);
  switch(operator) {
    case 'add':
      $("#display").text(operate('+')); break;
    case 'subtract':
      $("#display").text(operate('-')); break;
    case 'multiply':
      $("#display").text(operate('*')); break;
    case 'divide':
      $("#display").text(operate('/')); break; 
  };
};

// Helper function for clear and equals
function reset() {
  numbers = [];
  operator = "";
  operating = false;
  isNegative = false;
  isDecimal = false;
}

// Initialize variables
var numbers = [];
var operator = "";
var operating = false;
var isNegative = false;
var isDecimal = false;

// Number buttons
$(".number").on("click", function() {
  // replace display if it's a 0 or when operating
  if (isDecimal) {
    $("#display").append(".");
    isDecimal = false;
  }
  if( $("#display").text() === "0" || operating === true) {
    $("#display").text(this.innerHTML);
    operating = false;
  } else {
    $("#display").append(this.innerHTML);
  }
  if (isNegative) {
    $("#display").prepend("-");
    isNegative = false;
  }
});

// Clear button
$("#clear").on( "click", function() { 
  $("#display").text("0");
  reset();
});

// Operator buttons
$("#add").on("click", function() { set_operation('add'); });
$("#subtract").on("click", function() { 
  if(numbers.length === 0 && $("#display").text() === "0") { isNegative = true; }
  set_operation('subtract'); 
});
$("#multiply").on("click", function() { set_operation('multiply'); });
$("#divide").on("click", function() { set_operation('divide'); });

// Equals button
$("#equals").on("click", function() {
  numbers[numbers.length] = $("#display").text();
  process_operation();
  console.log(numbers);
  reset();
});

// Decimal button
$("#decimal").on("click", function() {
  isDecimal = true;
});