var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class SkillNode {
    constructor(skillNodeData) {
        this.id = skillNodeData.id;
        this.parentNodeId = skillNodeData.parentId;
        this.title = skillNodeData.nodeTitle;
        this.createSkillNode().then();
    }
    createSkillNode() {
        return __awaiter(this, void 0, void 0, function* () {
            this.nodeElement = yield this.createNodeStructure();
            yield this.addNodeToParentNode(this.parentNodeId);
        });
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
    createNodeStructure() {
        return __awaiter(this, void 0, void 0, function* () {
            const skillNodeElement = document.createElement('div');
            skillNodeElement.classList.add('skill-node');
            const containerElement = document.createElement('div');
            containerElement.classList.add('container');
            containerElement.id = String(this.id);
            skillNodeElement.appendChild(containerElement);
            const nodeTitleElement = document.createElement('div');
            nodeTitleElement.innerText = this.title;
            containerElement.appendChild(nodeTitleElement);
            const orbitElement = document.createElement('div');
            orbitElement.classList.add('orbit');
            containerElement.appendChild(orbitElement);
            return skillNodeElement;
        });
    }
    addNodeToParentNode(parentNodeId) {
        const parentNode = document.getElementById(String(parentNodeId));
        if (!parentNode) {
            console.error(`Element with given id = ${parentNodeId} is not found!`);
            return;
        }
        parentNode.appendChild(this.nodeElement);
    }
}
//# sourceMappingURL=skillNode.js.map