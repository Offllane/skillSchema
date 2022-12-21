export class SkillNodeElements {
    set animationDelay(animationDelay) {
        this.skillNodeElement.style.animationDelay = `${animationDelay}s`;
    }
    /**
     * create structure like this
     * <div class="skill-node">
     *   <div class="container" id="{{this.id}}">
     *     <div>{{this.title}}</div>
     *     <div class="orbit"></div>
     *   </div>
     * </div>
     */
    createNodeStructure(skillNode) {
        this.createSkillNodeElement(skillNode.rotationPeriod);
        this.createContainerElement(skillNode.id);
        this.createNodeTitleElement(skillNode.nodeTitle);
        this.createOrbitElement();
    }
    createSkillNodeElement(rotationPeriod) {
        this.skillNodeElement = document.createElement('div');
        this.skillNodeElement.classList.add('skill-node');
        this.skillNodeElement.style.animation = `rotate ${rotationPeriod}s linear infinite`;
    }
    createContainerElement(id) {
        this.containerElement = document.createElement('div');
        this.containerElement.classList.add('container');
        this.containerElement.id = String(id);
        this.skillNodeElement.appendChild(this.containerElement);
    }
    createNodeTitleElement(title) {
        this.nodeTitleElement = document.createElement('div');
        this.nodeTitleElement.innerText = title;
        this.containerElement.appendChild(this.nodeTitleElement);
    }
    createOrbitElement() {
        this.orbitElement = document.createElement('div');
        this.orbitElement.classList.add('orbit');
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
//# sourceMappingURL=SkillNodeElements.js.map