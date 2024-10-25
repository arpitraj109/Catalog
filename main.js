const fs = require('fs');


function decodeValue(base, value) {
    return parseInt(value, base);
}


function lagrangeInterpolation(xValues, yValues) {
    let total = 0;
    const n = xValues.length;

    for (let i = 0; i < n; i++) {
        let term = yValues[i];
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                term *= (0 - xValues[j]) / (xValues[i] - xValues[j]);
            }
        }
        total += term;
    }
    return total;
}


function main() {
    try {
       
        const data = JSON.parse(fs.readFileSync('input2.json'));

       
        const n = data.keys.n;
        const k = data.keys.k;

        
        const xValues = [];
        const yValues = [];

        
        for (let key in data) {
            if (key !== 'keys') {
                const x = parseInt(key); 
                const base = parseInt(data[key].base); 
                const value = data[key].value; 
                const y = decodeValue(base, value); 

                xValues.push(x);
                yValues.push(y);
            }
        }

        
        const constantTerm = lagrangeInterpolation(
            xValues.slice(0, k),
            yValues.slice(0, k)
        );

        
        console.log("The constant term (c) of the polynomial is:", Math.round(constantTerm));

    } catch (error) {
        console.error("Error reading or parsing the JSON file:", error);
    }
}

main();
