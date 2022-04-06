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
    let arr;

    try {
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
                    if (arr.length > size) arr = arr.slice(0, size);
                    arr = arr.map(elm => parseFloat(elm));
                }
            }
        } while (!arr);
    } catch (error) {
        console.log("Something went wrong while processing inputs !");
    } finally {
        readFromTerminal.close();
    }

    console.log("Array: ", arr);

    let minDistance = minimumDistances(arr);

    console.log("Minimum distances: ", minDistance);
}

function minimumDistances(array){
    let minDistance = -1;

    if(!array || !Array.isArray(array) || array.length === 0) 
        return minDistance;

    let processingArr = array?.map(elm => {
        return { value: elm, checked: false};
    });

    for (let currentIndex = 0; currentIndex < array.length; currentIndex++){
        if (!processingArr[currentIndex].checked) {
            const number = array[currentIndex];
            const nextIndex = processingArr.findIndex((elm, index) => 
                index != currentIndex && 
                !elm.checked &&
                elm.value === number
            );

            if (nextIndex != -1) {
                const distance = nextIndex - currentIndex;
                if (minDistance === -1 || minDistance > distance) minDistance = distance;
            }

            processingArr[currentIndex].checked = true;
        }
    }

    return minDistance;
}