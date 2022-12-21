import { SkillNodeElements } from "./SkillNodeElements.js";
export class SkillNode {
    constructor(skillNodeData) {
        this.rotationPeriod = 40; // animation time
        this.skillNodeElements = new SkillNodeElements();
        this.id = skillNodeData.id;
        this.parentNodeId = skillNodeData.parentNodeId;
        this.nodeTitle = skillNodeData.nodeTitle;
        this.sameLevelSkillNodesQuantity = skillNodeData.sameLevelSkillNodesQuantity;
        this.createSkillNode();
    }
    createSkillNode() {
        this.skillNodeElements.createNodeStructure(this);
        this.skillNodeElements.addNodeToSchema(this.parentNodeId);
        this.setNodeStartPositionUsingDelay(this.getCurrentOrderPosition());
    }
    setNodeStartPositionUsingDelay(currentOrderPosition) {
        const delayBetweenNodes = this.rotationPeriod / this.sameLevelSkillNodesQuantity;
        this.skillNodeElements.animationDelay = -delayBetweenNodes * currentOrderPosition;
    }
    getCurrentOrderPosition() {
        const parentNodeChildren = Array.from(document.getElementById(String(this.parentNodeId)).children);
        const sameLevelSkillNodes = parentNodeChildren.filter((htmlElement) => htmlElement.classList.contains('skill-node'));
        return sameLevelSkillNodes.length;
    }
}
//# sourceMappingURL=skillNode.js.map