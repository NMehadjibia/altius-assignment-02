const readline = require('readline');
const { stdin, stdout } = require('process');

main();

async function main() {
    const readFromTerminal = readline.createInterface({
        input: stdin,
        output: stdout
    });
    const inputsIterator = readFromTerminal[Symbol.asyncIterator]();
    
    let size;
    do{
        console.log("Size: ");
        const data = await inputsIterator.next();
        size = data.value;
        if (!size) console.log("===>> Size is empty !");
        else {
            size = parseFloat(data.value);
            if(!Number.isInteger(size)) console.log("==>> Size must be an integer");
            else if (size <= 0) console.log("==>> Size must be greater than 0");
        }
    } while (!size || !Number.isInteger(size) || size <= 0);

    let arr;
    do{
        console.log("Array: ");
        const data = await inputsIterator.next();
        arr = data.value;
        if(!arr) console.log("===>> Array is empty !");
        else {
            arr = arr.replace(/ {1,}/g, " ").split(" ");
            const notANum = arr?.find(elm => isNaN(elm));
            if (notANum) {
                arr = undefined;
                console.log("===>> Array must contain only numbers !");
            } else {
                arr = arr.slice(0, size);
                arr = arr.map(elm => parseFloat(elm));
            }
        }
    } while (!arr);
    console.log("Array: ", arr);
    readFromTerminal.close();
}