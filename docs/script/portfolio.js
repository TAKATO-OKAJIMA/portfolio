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

    return slicedArray;
};


/**
 * 
 * @param {Array} array 
 */
const shuffleArray = (array) => {
    for(let index = array.length - 1; index > 0; index--) {
        const target = Math.floor(Math.random() * (index + 1));
        [array[index], array[target]] = [array[target], array[index]];
    }
};


/**
 * 
 * @param {Array} array
 * @returns {any} dictionary  
 */
const countArrayElements = (array) => {
    const mostCommons = array.reduce(
        (prev, curr) => ({
            ...prev,
            [curr]: 1 + (prev[curr] || 0),
        }),
        {}
    );

    return mostCommons;
};


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
};


/**
 * 
 * @param {string | URL} baseURL 
 * @param {string} targetURL 
 * @param {string} markDownID 
 * @returns {string} url
 */
const createURL = (baseURL, targetURL, markDownID) => {
    const url = new URL(targetURL, baseURL);
    url.searchParams.append('markDownID', markDownID);

    return url.toString()
};


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
};


const loadJsonFromOrigin = async(path) => {
    const joinedPath = new URL(path, window.location.origin).toString();

    const jsonData = loadJson(joinedPath);

    return jsonData;
}


/**
 * 
 * @param {string} path 
 * @returns {string} markDown
 */
const loadMarkDown = async(path) => {

    const response = await fetch(path)
                                .catch(err => {
                                    console.error(err);
                                });
    const markDown = await response.text();

    return markDown;
};


const loadMarkDownFromOrigin = async(path) => {
    const joinedPath = new URL(path, window.location.origin).toString();

    const markDown = loadMarkDown(joinedPath);

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
};


/**
 * 
 * @param {number} colWidth 
 * @returns 
 */
const renderEmptyColElement = (colWidth) => {
    const emptyColElement = document.createElement('div');

    emptyColElement.setAttribute('class', 'col-md-' + colWidth);

    return emptyColElement;
};


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
};


/**
 * 
 * @param {string} baseURL
 * @param {string} targetURL
 * @param {Array<any>} jsonData 
 * @param {Array<HTMLElement>} elements 
 */
const setWorksCaptions = (baseURL, targetURL, jsonData, elements) => {
    shuffleArray(jsonData);
    const worksData = jsonData.slice(0, 3);

    for(let [index, workData] of worksData.entries()) {
        const element = elements[index];

        const anchorElement = element.getElementsByTagName('a')[0];
        anchorElement.setAttribute('href', createURL(baseURL, targetURL, workData.markDownID));

        const imageElement = anchorElement.getElementsByTagName('img')[0];
        imageElement.setAttribute('src', workData.captionImage);
        imageElement.setAttribute('alt', workData.title);
    }
};