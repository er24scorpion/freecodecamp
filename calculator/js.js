class Calculator {
     constructor(){
     }
    
    
    
    getSum( a, b){
        return a + b;
    }
    
    getMultiply( a, b){
        return a * b;
    }
    
    getDifference( a, b){
        return a - b;
    }
    
    getDivide( a, b){
        if(b!=0){
            return a / b;
        } else {
            return undefined;
        }
        
    }
}
$(document).ready(function () {
    var operation;
    var operators = [];
    var numbers = [];
    var calc = new Calculator();
    var lastTypeOfSymb;
    $("button").click(function () {
        var val = $(this).val();
        var thisClass = $(this).attr('class');
        switch (val) {
            case 'C':
                $("#process span").text("");
                numbers = [];
                operation = undefined;
						    lastTypeOfSymb = undefined;
            case 'CE':
                if (numbers.length > 1){
                    numbers.splice(-1, 1);
								} else if (numbers.length === 1) {
										numbers = [];
                    lastTypeOfSymb = undefined;
                } 
                $("#input span").text("0");
                return false;
        }
        
        if (numbers.length === 1 && val === "=") {
            $("#process span").text("");
            $("#input span").text(numbers[0]);
            numbers = [];
            lastTypeOfSymb = "equal";
            return false;
        }

        if (numbers.length > 0 && lastTypeOfSymb === "operation" && thisClass === "operation") {
            operation = val;
            if (val !== "=") {
                if ($("#process span").text() === "") {
                    $("#process span").text(numbers[0] + val);
                } else {
                    var proc = $("#process span").text().substring(0, $("#process span").text().length - 1);
                    $("#process span").text(proc + val);
                }
            }
            return false;
        } else if ($("#input span").text().indexOf(".") ===-1 && thisClass === "point") {
					if(numbers.length>0 ){
            numbers[numbers.length - 1] += val;
					} else{
						numbers.push(0+val);
					}
            $("#input span").text(numbers[numbers.length - 1]);
						lastTypeOfSymb = thisClass;
            return false;
        } else if ( (lastTypeOfSymb === undefined && thisClass === "operation") 
									 || (lastTypeOfSymb === thisClass && thisClass=== "point") 
									|| ( (numbers.length === 0 || numbers[numbers.length-1] == "0") && val==="0")) {
            return false;
        }


        

        var res;

        if (thisClass === "btn_number") {
					if(lastTypeOfSymb === "point" || lastTypeOfSymb === "btn_number"){
						var index = numbers.length > 1 ? numbers.length -1 : 0;
						 numbers[index] += val;
						 val = numbers[index];
					} else
            if (numbers.length == 1 && lastTypeOfSymb == "equal") {
                numbers[0] = val;
            } else {
                if(lastTypeOfSymb === undefined && val=="." ) {
                    val = 0+val;
									  lastTypeOfSymb = "point";
                }
                numbers.push(val);
            }
            $("#input span").text(val);
        } else if (thisClass === "operation") {
            if(numbers.length === 0 && lastTypeOfSymb === "equal" && $("#input span").text()!=""){
                numbers.push($("#input span").text());
            }
            numbers[numbers.length - 1] = Number(numbers[numbers.length - 1]);

            if (numbers.length === 2 && operation !== undefined) {
                switch (operation) {
                    case '+':
                        res = calc.getSum(numbers[0], numbers[1]);
                        break;
                    case '-':
                        res = calc.getDifference(numbers[0], numbers[1]);
                        break;
                    case '*':
                        res = calc.getMultiply(numbers[0], numbers[1]);
                        break;
                    case '/':
                        res = calc.getDivide(numbers[0], numbers[1]);
                        break;
                }

            }

            operation = val;
            if (operation !== "=") {
                var proc = $("#process span").text();
                $("#process span").text(proc + $("#input span").text() + val);
            }
        }

        lastTypeOfSymb = thisClass;
        if (res !== undefined) {
            $("#input span").text(res);
            numbers = [];
            numbers.push(res);
        }
        if (val === "=") {
            $("#process span").text("");
            res = undefined;
            operation = undefined;
            lastTypeOfSymb = "equal";
        }


        return false;
    });

});


