class IMarkDownConvertor {
    constructor(markdownParser) {

    }

    convert(markDown) {

    }
}


class MarkDownBootstrapConvertor {

    constructor(markdownParser) {
        this.markdownParser = markdownParser;
    }

    /**
     * 
     * @param {string} htmlString 
     * @returns {Document} mdDocument
     */
    createElementFromString(htmlString) {
        const domParser = new DOMParser();
        const mdDocument = domParser.parseFromString(htmlString, 'text/html')

        return mdDocument;
    }

    /**
     * 
     * @param {string} markdownString 
     * @returns {HTMLCollection} bootStrapHTML
     */
    convert(markdownString){
        const parsedMarkDown = this.markdownParser.parse(markdownString);
        const mdDocument = this.createElementFromString(parsedMarkDown);
        
        this.convertHeadingElements(mdDocument.getElementsByTagName('h4'));
        this.convertParagraphElements(mdDocument.getElementsByTagName('p'));
        this.convertAnchorElements(mdDocument.getElementsByTagName('a'));
        this.convertTableElements(mdDocument.getElementsByTagName('table'));
        this.convertTableColHeaderElements(mdDocument.querySelectorAll('thead tr th'));
        this.convertTableRowHeaderElements(mdDocument.querySelectorAll('tbody tr th'));
        this.convertTableDataElements(mdDocument.getElementsByTagName('td'));
        this.convertImageElements(mdDocument.getElementsByTagName('img'));

        return mdDocument.body.childNodes;
    }

    /**
     * 
     * @param {HTMLParagraphElement} paragraphElement 
     */
    convertParagraphElement(paragraphElement) {
        ;
    }

    /**
     * 
     * @param {HTMLCollectionOf<HTMLParagraphElement>} paragraphElements 
     */
    convertParagraphElements(paragraphElements){
        for(let paragraphElement of paragraphElements) {
            this.convertParagraphElement(paragraphElement);
        }
    }

    /**
     * 
     * @param {HTMLHeadingElement} headerElement 
     */
    convertHeadingElement(headingElement) {
        ;
    }

    /**
     * 
     * @param {HTMLCollectionOf<HTMLHeadingElement>} headingElements 
     */
    convertHeadingElements(headingElements) {
        for(let headingElement of headingElements) {
            this.convertHeadingElement(headingElement);
        }
    }

    /**
     * 
     * @param {HTMLImageElement} imgElement 
     */
    convertImageElement(imgElement) {
        imgElement.classList.add('img-fluid');
    }

    /**
     * 
     * @param {HTMLCollectionOf<HTMLImageElement>} imgElements 
     */
    convertImageElements(imgElements){
        for(let imgElement of imgElements){
            this.convertImageElement(imgElement);
        }
    }

    /**
     * 
     * @param {HTMLAnchorElement} anchorElement 
     */
    convertAnchorElement(anchorElement) {
        anchorElement.classList.add('text-decoration-none');
    }

    /**
     * 
     * @param {HTMLCollectionOf<HTMLImageElement>} anchorElements 
     */
    convertAnchorElements(anchorElements) {
        for(let anchorElement of anchorElements) {
            this.convertAnchorElement(anchorElement);
        }
    }

    /**
     * 
     * @param {HTMLTableElement} tableElement 
     */
    convertTableElement(tableElement) {
        tableElement.classList.add('table');
    }
    
    /**
     * 
     * @param {HTMLCollectionOf<HTMLTableElement>} tableElements 
     */
    convertTableElements(tableElements) {
        for(let tableElement of tableElements) {
            this.convertTableElement(tableElement);
        }
    }

    /**
     * 
     * @param {HTMLTableCellElement} tableRowHeaderElement 
     */
    convertTableRowHeaderElement(tableRowHeaderElement) {
        tableRowHeaderElement.setAttribute('scope', 'row');     
    }
    
    /**
     * 
     * @param {HTMLCollectionOf<HTMLTableCellElement} tableRowHeaderElements 
     */
    convertTableRowHeaderElements(tableRowHeaderElements) {
        for(let tableSectionHeaderElement of tableRowHeaderElements) {
            this.convertTableRowHeaderElement(tableSectionHeaderElement);
        }
    }

    /**
     * 
     * @param {HTMLTableCellElement} tableColHeaderElement 
     */
    convertTableColHeaderElement(tableColHeaderElement) {
        tableColHeaderElement.setAttribute('scope', 'col');
    }

    /**
     * 
     * @param {HTMLCollectionOf<HTMLTableCellElement>} tableColHeaderElements 
     */
    convertTableColHeaderElements(tableColHeaderElements) {
        for(let tableColHeaderElement of tableColHeaderElements) {
            this.convertTableColHeaderElement(tableColHeaderElement);
        }
    }

    convertTableDataElement(tableDataElement) {
        ;
    }

    convertTableDataElements(tableDataElements) {
        for(let tableDataElement of tableDataElements) {
            this.convertTableDataElement(tableDataElement);
        }
    }
}


class PortFolioMarkDownConvertor extends MarkDownBootstrapConvertor {

    constructor(markdownParser) {
        super(markdownParser);
    }

    /**
     * 
     * @param {HTMLHeadingElement} headingElement 
     */
    convertHeadingElement(headingElement) {
        headingElement.classList.add('mt-5');
    }

    /**
     * 
     * @param {HTMLParagraphElement} paragraphElement 
     */
    convertParagraphElement(paragraphElement) {
        if (paragraphElement.textContent != '') {
            paragraphElement.classList.add('ms-3', 'fs-5', 'mb-0');
    
        }
    }

    convertImageElement(imgElement) {
        super.convertImageElement(imgElement);
        imgElement.classList.add('shadow-sm')
    }

    /**
     * 
     * @param {HTMLTableElement} tableElement 
     */
    convertTableElement(tableElement) {
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');

        const colElement = document.createElement('div');
        colElement.classList.add('col-md-8');

        super.convertTableElement(tableElement);

        const parentElement = tableElement.parentElement;

        parentElement.replaceChild(rowElement, tableElement);

        colElement.appendChild(tableElement);
        rowElement.appendChild(colElement);


       // console.log(tableElement)
    }

    convertTableColHeaderElement(tableColHeaderElement) {
        super.convertTableColHeaderElement(tableColHeaderElement);
        tableColHeaderElement.classList.add('fs-5');
    }

    convertTableRowHeaderElement(tableRowHeaderElement) {
        super.convertTableRowHeaderElement(tableRowHeaderElement);
        tableRowHeaderElement.classList.add('fs-5');
    }

    convertTableDataElement(tableDataElement) {
        super.convertTableDataElement(tableDataElement);
        tableDataElement.classList.add('fs-5');
    }
}