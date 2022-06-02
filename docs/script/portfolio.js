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


const getRootURL = () => {
    const hostName = window.location.hostname;
    
    if(hostName.indexOf('localhost') > -1) {
        const pathName = window.location.pathname;
        const rootPath = pathName.split('/')[1];

        return new URL(`./${rootPath}`, window.location.origin).toString();
    }
    else {
        return window.location.origin;
    }

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
};


/**
 * 
 * @param {string | URL} baseURL 
 * @param {string} targetURL 
 * @param {string} id 
 * @returns {string} url
 */
const createURL = (baseURL, targetURL, id) => {
    const url = new URL(targetURL, baseURL);
    url.searchParams.append('id', id);

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
    const joinedPath = new URL(path, getRootURL()).toString();

    const jsonData = await loadJson(joinedPath);

    return jsonData;
}


/**
 * 
 * @param {string} path 
 * @returns {string} markDown
 */
const loadMarkDown = async(path) => {

    const response = await fetch(path)
                                .then(response => {
                                    if(!response.ok){
                                        return 'Error';
                                    }

                                    return response.text()
                                })
                                .catch(err => {
                                    console.error(err);
                                    return 'Error';
                                });
    const markDown = response;

    return markDown;
};


const loadMarkDownFromOrigin = async(path) => {
    const joinedPath = new URL(path, getRootURL()).toString();

    const markDown = await loadMarkDown(joinedPath);

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

    emptyColElement.setAttribute('class', `col-md-${colWidth}`);

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
    const worksData = jsonData.slice(0, 5);

    for(let [index, workData] of worksData.entries()) {
        const element = elements[index];

        const anchorElement = element.getElementsByTagName('a')[0];
        anchorElement.setAttribute('href', createURL(baseURL, targetURL, workData.id));

        const imageElement = anchorElement.getElementsByTagName('img')[0];
        imageElement.setAttribute('src', workData.captionImage);
        imageElement.setAttribute('alt', workData.title);
    }
};


/**
 * 
 * @param {HTMLElement} ctx 
 * @param {*} jsonData 
 */
const renderWorkList = (ctx, jsonData) => {
    const elementArray = new Array();
    const urlOrigin = getRootURL();
    
    for(let work of jsonData) {
        const topLevelRowElement = document.createElement('div');
        topLevelRowElement.classList.add('row', 'mb-2', 'border');

        const imgColElement = renderEmptyColElement(4);
        imgColElement.classList.add('p-0');

        const imgElement = document.createElement('img');
        imgElement.classList.add('img-fluid', 'border', 'h-100');
        imgElement.setAttribute('src', new URL(work.captionImage, urlOrigin).toString());

        imgColElement.appendChild(imgElement);
        topLevelRowElement.appendChild(imgColElement);

        const contentColElement = renderEmptyColElement(8);
        contentColElement.classList.add('pt-3', 'pb-3');
        
        const titleElement = document.createElement('h4');
        titleElement.textContent = work.title;

        contentColElement.appendChild(titleElement);

        const captionTextElement = document.createElement('p');
        captionTextElement.classList.add('fs-5');
        captionTextElement.textContent = work.captionText;

        contentColElement.appendChild(captionTextElement);

        // const useEnvironmentsElement = document.createElement('ul');
        // useEnvironmentsElement.classList.add('list-inline');

        // for(let useEnvironment of work.useEnvironments) {
        //     const listElement = document.createElement('')

        //     const spanElement = document.createElement('span');
        //     spanElement.classList.add('fs-5');
        // }

        const buttonDivElement = document.createElement('div');
        buttonDivElement.classList.add('d-flex', 'justify-content-end')

        const buttonAnchorElement = document.createElement('a');
        buttonAnchorElement.classList.add('btn', 'btn-outline-secondary', 'mt-2', 'me-3');
        buttonAnchorElement.setAttribute('href', createURL(urlOrigin, './works/content.html', work.id));
        buttonAnchorElement.textContent = 'See More'

        buttonDivElement.appendChild(buttonAnchorElement)
        contentColElement.appendChild(buttonDivElement);

        topLevelRowElement.appendChild(contentColElement);
        elementArray.push(topLevelRowElement);
    }

    for(let element of elementArray) {
        ctx.appendChild(element);
    }
}


/**
 * 
 * @returns {HTMLDivElement} divElement
 */
const renderFailedLoadWorkContent = () => {
    const divElement = document.createElement('div');
    divElement.classList.add('text-center');

    const statusElement = document.createElement('p');
    statusElement.classList.add('h1');
    statusElement.textContent = 'Error! 404 Not Found'

    const messageElement = document.createElement('p');
    messageElement.classList.add('h3', 'text-muted');
    messageElement.textContent = 'このページは存在しません';

    divElement.appendChild(statusElement)
    divElement.appendChild(messageElement);

    return divElement;
} 


/**
 * 
 * @param {HTMLElement} ctx
 * @param {any} markDownConvertor 
 * @returns 
 */
const renderWorkContent = async (ctx, markDownConvertor) => {
    const urlParams = getURLParamsDictionary(window.location);
    const markdownString = await loadMarkDownFromOrigin(`./resources/markdown/${urlParams.id}.md`);

    if(markdownString != 'Error'){
        const results = markDownConvertor.convert(markdownString);

        for(let result of results) {
            ctx.appendChild(result);
        }
    }
    else {
        ctx.appendChild(renderFailedLoadWorkContent());
    }

}