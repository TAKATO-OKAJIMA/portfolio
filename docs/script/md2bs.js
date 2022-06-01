class MarkDownBootstrapConvertor {

    constructor(markdownParser) {
        await markdownParser.ready;

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
     * @returns {NodeListOf<ChildNode>} bootStrapHTML
     */
    convert(markdownString){
        const parsedMarkDown = this.markdownParser.parse(markdownString);
        const mdDocument = this.createElementFromString(parsedMarkDown);
        this.convertImageElements(mdDocument.getElementsByTagName('img'));

        return mdDocument.body.childNodes;
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
}