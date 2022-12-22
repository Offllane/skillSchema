import { SkillNodeElements } from "./skillNodeElements.js";
import { startData } from "../data.js";
export class SkillNode {
    constructor(skillNodeData) {
        this.rotationPeriod = 40; // animation time
        this.orbitWidth = 400;
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
        this.setOrbitWidth(this.getCurrentDepthLevel());
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
    setOrbitWidth(currentNodeDepthLevel) {
        this.skillNodeElements.setOrbitWidth(SkillNode.calculateOrbitWidth(currentNodeDepthLevel));
    }
    static calculateOrbitWidth(currentNodeDepthLevel) {
        return 400 - currentNodeDepthLevel * 100;
    }
    getCurrentDepthLevel() {
        let depthLevel = 1;
        let parentSkillNode = this.getParentSkillNode(this.parentNodeId);
        while (parentSkillNode) {
            parentSkillNode = this.getParentSkillNode(parentSkillNode.parentNodeId);
            depthLevel += 1;
        }
        return depthLevel;
    }
    getParentSkillNode(nodeId) {
        if (nodeId === 0) {
            return null;
        }
        return startData.find(skillNode => skillNode.id == nodeId);
    }
}
//# sourceMappingURL=skillNode.js.map