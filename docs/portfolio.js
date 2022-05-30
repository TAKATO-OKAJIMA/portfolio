/**
 * 
 * @param {Array} array 
 * @param {Number} number 
 * @returns {Array<Array>}
 */
const sliceByNumber = (array, number) => {
    const length = array.length;

    const slicedArray = new Array(length)
                                 .fill()
                                 .map((_, i) => 
                                    array.slice(i * number, (i + 1) * number)
                                 );

    return slicedArray
}


/**
 * 
 * @param {string} href 
 * @returns {any} paramsDictionary
 */
const getURLParamsDictionary = (href) => {
    const url = new URL(href);
    const params = url.searchParams;

    const paramsDictionary = {};

    for(let entry of params.entries()) {
        paramsDictionary[entry[0]] = entry[1];
    }

    return paramsDictionary;
}


/**
 * 
 * @param {string} path 
 * @returns {any | Array<any>} jsonData
 */
const loadJson = async (path) => {
    const response = await fetch(path)
                                .catch(err => {
                                    console.error(err);
                                });
    const jsonData = await response.json();

    return jsonData;
}


const loadMarkDown = async(path) => {
    const response = await fetch(path)
                                .catch(err => {
                                    console.error(err);
                                });
    const markDown = await response.text();

    return markDown;
}


/**
 * 
 * @param {HTMLElement} element 
 */
const removeAllChildNodes = (element) => {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}


/**
 * 
 * @param {number} colWidth 
 * @returns 
 */
const renderEmptyColElement = (colWidth) => {
    const emptyColElement = document.createElement('div');

    emptyColElement.setAttribute('class', 'col-md-' + colWidth);

    return emptyColElement;
}


/**
 * 
 * @param {*} jsonData 
 * @param {HTMLElement} element 
 */
const renderSkills = (jsonData, element) => {
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    const slicedArray = sliceByNumber(jsonData, 2);

    for(let skills of slicedArray) {
        const startElement = renderEmptyColElement(2);

        rowElement.appendChild(startElement);

        for(let skill of skills) {
            const colElement = renderEmptyColElement(4);
            const titleElement = document.createElement('h3');
            titleElement.classList.add('text-center');
            titleElement.textContent = skill.categoryName;

            const ulElement = document.createElement('ul');
            ulElement.classList.add('list-group-flush', 'ps-0');

            for(let name of skill.names) {
                const listElement = document.createElement('li');
                listElement.classList.add('list-group-item');
                listElement.textContent = name

                ulElement.appendChild(listElement);
            }

            colElement.appendChild(titleElement);
            colElement.appendChild(ulElement);

            rowElement.appendChild(colElement);
        }

        const endElement = renderEmptyColElement(2);

        rowElement.appendChild(endElement);
    }

    element.appendChild(rowElement);
}