export class SkillNodeElements {
    set nodeWidth(width) {
        this.nodeTitleElement.style.width = `${width}px`;
    }
    set animationDelay(animationDelay) {
        this.skillNodeElement.style.animationDelay = `${animationDelay}s`;
    }
    set orbitWidth(orbitWidth) {
        this.orbitElement.style.width = `${orbitWidth}px`;
    }
    set rotationRadius(parentOrbitWidthRadius) {
        // this property is used in rotate animation
        this.skillNodeElement.style.setProperty('--halfOfOrbitWidth', `${parentOrbitWidthRadius / 2}px`);
    }
    set rotationPeriod(rotationPeriod) {
        this.skillNodeElement.style.animation = `rotate ${rotationPeriod}s linear infinite`;
    }
    set nodeTitle(title) {
        this.nodeTitleElement.innerText = title;
    }
    set skillNodeBackgroundColor(color) {
        this.skillNodeElement.style.border = `1px solid ${color}`;
    }
    /**
     * create structure like this
     * <div class="skill-node">
     *   <div class="container" id="{{this.id}}">
     *     <div class="node-title">{{this.title}}</div>
     *     <div class="orbit"></div>
     *   </div>
     * </div>
     */
    createNodeStructure(skillNode) {
        this.createSkillNodeElement();
        this.createContainerElement(skillNode.id);
        this.createNodeTitleElement(skillNode.nodeTitle);
        this.createOrbitElement(skillNode.orbitWidth);
    }
    createSkillNodeElement() {
        this.skillNodeElement = document.createElement('div');
        this.skillNodeElement.classList.add('skill-node');
    }
    createContainerElement(id) {
        this.containerElement = document.createElement('div');
        this.containerElement.classList.add('container');
        this.containerElement.id = String(id);
        this.skillNodeElement.appendChild(this.containerElement);
    }
    createNodeTitleElement(title) {
        this.nodeTitleElement = document.createElement('div');
        this.nodeTitleElement.classList.add('node-title');
        this.nodeTitleElement.innerText = title;
        this.containerElement.appendChild(this.nodeTitleElement);
    }
    createOrbitElement(orbitWidth) {
        this.orbitElement = document.createElement('div');
        this.orbitElement.classList.add('orbit');
        this.orbitElement.style.width = `${orbitWidth}px`;
        this.containerElement.appendChild(this.orbitElement);
    }
    /**
     * append SkillNode to parent skillNode container
     * @param parentNodeId
     */
    addNodeToSchema(parentNodeId) {
        const parentNode = document.getElementById(String(parentNodeId));
        if (!parentNode) {
            console.error(`Element with given id = ${parentNodeId} is not found!`);
            return;
        }
        parentNode.appendChild(this.skillNodeElement);
    }
}
//# sourceMappingURL=skillNodeElements.js.map