
function write ( message ) {
	document.getElementById('message').innerHTML += message + '<br/>';
}

//global var example
function add (first, second) {
	a = first; 
	return a + second;
}

write("1+2="+add(1,2));
write("a: "+a);
write("54 + 18 ="+add(54,18));
write("a: "+a);

// Null
var myValue = null;
if(!myValue){
	write("null evaluates to false")
}

var hasAValue = 1 
if(hasAValue){
	write("hasAValue has a value");
}


//undefined
var notAssigned;
write(notAssigned);

if(!notAssigned){
	write("undefined evaluates to false");
}

//object literal example
var person = {
	name:"Frank"
	surname:"Martin"
	
};
write("non-existend object property: ")+ person.age);


//equality
//object are equal to themself
var joe = {name : "Joseph"};
var joe2 = {name: "Joseph"};
//write("joe equals joe: " + (joe === joe))


write("joe equals joe2: " + (joe ===joe2));

write ("apple === apple: "+("apple"==="apple"));

// the == operator

//write('1 =="1": ' + (1 == "1"));

//passing by value
function myfunction(x)
{
      // x is equal to 4
      x = 5;
      // x is now equal to 5
}

var x = 4;
write(x); // x is equal to 4
myfunction(x); 
write(x); // x is still equal to 4


function myobject()
{
	this.value = 5;
}
var o = new myobject();
write(o.value); // o.value = 5
function objectchanger(fnc)
{
	fnc = null;
}
objectchanger(o);
write(o.value); // o.value is now equal to 6

//no overload

function overload(a, b)
{
	write("overload a,b");
}

function overload(a, b, c)
{
	write("overload a,b,c");
}

overload(a,b);

//TryCatch

try{
	throw{
		name:"SomethingWentWrongError",
		message:"Something went wrong you should fix it. "
	}
}
catch(e){
	write(e.name+": "+e.message)
}
finally
{
	write("finally always executes");
}
	



//Regular expressions

var result = "abcdec".search(/c/g);
write("index of c in 'abcdec': " + result);

//
//exec

var input = "Text with some <strong>highlighted</strong> parts.";
var expression = /<strong>(.*)<\/strong>/g;
var results = expression.exec(input);
write("matched substring: " + results[0]);
write("first capture group: "+results[1]);

//test
var containsANumber = /\d/.text('abc4de');
write("abc4de contains a number: "+containsANumber);

//replace - replacement can be a string or a function
var updated = "Fred Brooks".replace(/(\w+) (\w+)/g, function (match, capture1,capture2){
	return capture2.toUpperCase() + ", " + capture1;
});
write(updated);

//

var dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
write(dateTime.test("30-01-2003 15:20"));
// → true
write(dateTime.test("30-jan-2003 15:20"));
// → false




//function argument pattern
function add(){
	var x = 0 ;
	for (var i = 0 ; i < arguments.length; i++)
		x = x + arguments[i];
	
	return x;
}
write(add(1,2,3));


//chaining design pattern
var Calc = function (start) {
	this.add = function(x) {
		start = start + x;
		return this;
	};
	
	this.multiply = function (x) {
		start = start * x;
		return this;
		
	};
	
	this.equals = function (callback) {
		callback(start);
		return this;
	};
}

new Calc(0)
	.add(1)
	.add(2)
	.multiply(3)
	.equals(function(result){
		write(result);
	});

	
	

//observable properties

var Book = function(name, price) {

    var priceChanging = [];
       var priceChanged = [];

    this.name = function(val) {
        return name;
    };

    this.price = function(val) {
        if (val !== undefined && val !== price) {
            for (var i = 0; i < priceChanging.length; i++) {
                if (!priceChanging[i](this, val)) {//wywolanie
                    return price;
                }
            }

            price = val;

            for (var i = 0; i < priceChanged.length; i++) {
                priceChanged[i](this);
            }
        }

        return price;
    };

    this.onPriceChanging = function(callback) {
        priceChanging.push(callback);
    };

    this.onPriceChanged = function(callback) {
        priceChanged.push(callback);
    };
};

    var book = new Book('Java Script: The Good Parts', 23.99);
    write('The name is: ' + book.name() + "<br />");
    write('The price is $ ' + book.price());

    book.onPriceChanging(function(b, price) {
        if (price > 100) {
            write('System error, price has gone unexpectedly high');
            return false;
        }

        return true;
    });

    book.onPriceChanged(function(b) {
        write('The book price has changed to:'  + b.price() + "<br/>");
    });

    book.price(19.99);
    book.price(200);

	

//async execution pattern
	

var demoArray = [];
for (var i = 1; i <= 1000; i++) {
    demoArray.push(1 + Math.floor(Math.random() * 50));
}

$(document).ready(function() {

    var buffer = function(items, iterFunction, callback) {
        var i = 0.
        len = items.length;

        setTimeout(function() {
            var result;
            // +new Date returns the number of milliseconds   
            //((+new Date) - start < 50 => buffer of 50 milliseconds            
            for (var start = +new Date; i < len && result !== false && ((+new Date) - start < 50); i++) {
                result = iterFunction.call(items[i], items[i], i);
            }

            // callee is a property of the arguments object. It can be used to refer to the currently executing function inside the function body of that function. This is for example useful when you don't know the name of this function, which is for example the case with anonymous functions. 
            if (i < len && result !== false) {
                setTimeout(arguments.callee, 20);
            } else {
                callback();
            }

            }, 20);
        };

        var html = '';
        buffer(demoArray, function(item) {
            html += '<li>' + item + '</li>';
        }, function() {
            $('ul').append(html);
        });
    });
	
	*/
	//Prototype pattern
	
	window.onload = function(){
		myNS.Calculator.prototype.add = function (x,y){
			var val = x-y;
			this.eqCtl.innerHTML = val;
		};
		var c = new myNS.Calculator('message');
		c.add(2,2);
	};
	
	var myNS = myNS || {};
	
	myNS.Calculator = function (eq){
		this.eqCtl = document.getElementById(eq);
		
	};

	myNS.Calculator.prototype ={
	add: function(x,y){
		var val = x+y;
		this.eqCtl.innerHTML = val;
	}
};


var Calculator = function ( eq ) {
	//private member 
	var eqCtl = document.getElementById(eq);
	
	return{
		//expose public member
		add: function(x,y) {
			var val = x+y;
			eqCtl.innerHTML = val;
		}
	};
};

	window.onload = function(){
		var calculator = new Calculator('message');
		calculator.add(2,2);
	}

//Prototype pattern

window.onload = function(){
	Calculator.prototype.add = function(x,y){
		return x-y;
	}
	var c = new Calculator('message')
	write(c.add(2,2));
};

var Calculator = function ( eq ) {
	this.eqCtl = document.getElementById(eq);
	};
	Calculator.prototype = {
		add: function(x,y) {
			var val = x+y;
			this.eqCtl.innerHTML = val;
		}
	};
	
	
//Revealing module pattern

var MyModule =  function() {
  
  function myMethod() {
    alert( 'my method' );
  }
  
  function myOtherMethod() {
    alert( 'my other method' );
  }
  
  // explicitly return public methods when this object is instantiated
  return {
    someMethod : myMethod,
    someOtherMethod : myOtherMethod
  };
  
}();

//  example usage

MyModule.someMethod(); // alerts "my method"
MyModule.someOtherMethod(); // alerts "my other method"

//Revealing prototype pattern
	
	var Calculator = function ( eq ) {
	//private member 
	this.eqCtl = document.getElementById(eq);
	};
	
	Calculator.prototype=function(){
		//expose public member
		var add = function(x,y) {
			var val = x+y;
			this.eqCtl.innerHTML = val;
		};
		return {add:add};
	}();

	window.onload = function(){
		var calculator = new Calculator('message');
		calculator.add(2,2);
	}
	
	//Events