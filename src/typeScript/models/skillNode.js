import { SkillNodeElements } from "./skillNodeElements.js";
import { startData } from "../data.js";
import { depthNodeConfig } from "../configs.js";
export class SkillNode {
    constructor(skillNodeData) {
        this.orbitWidth = depthNodeConfig[0].orbitWidth;
        this.skillNodeElements = new SkillNodeElements();
        this.id = skillNodeData.id;
        this.parentNodeId = skillNodeData.parentNodeId;
        this.nodeTitle = skillNodeData.nodeTitle;
        this.sameLevelSkillNodesQuantity = skillNodeData.sameLevelSkillNodesQuantity;
        if (this.getCurrentDepthLevel() >= 5) {
            return;
        }
        this.createSkillNode();
    }
    createSkillNode() {
        if (!document.getElementById(String(this.parentNodeId))) {
            return;
        }
        this.skillNodeElements.createNodeStructure(this);
        this.skillNodeElements.addNodeToSchema(this.parentNodeId);
        this.setNodeParamsDependedOnDepth();
    }
    setNodeParamsDependedOnDepth() {
        const currentDepthLevel = this.getCurrentDepthLevel();
        const { nodeWidth, orbitWidth, rotationPeriod } = depthNodeConfig[currentDepthLevel];
        this.skillNodeElements.nodeWidth = nodeWidth;
        this.skillNodeElements.orbitWidth = this.orbitWidth = orbitWidth;
        this.skillNodeElements.rotationPeriod = rotationPeriod;
        this.skillNodeElements.rotationRadius = depthNodeConfig[currentDepthLevel - 1].orbitWidth; // parent node orbit width
        this.setNodeStartPositionUsingDelay(this.getCurrentOrderPosition(), rotationPeriod);
        this.setParamsRelatedToDepthLevel(currentDepthLevel);
    }
    setParamsRelatedToDepthLevel(depthLevel) {
        if (depthLevel === 4) {
            this.skillNodeElements.nodeTitle = '';
            this.skillNodeElements.skillNodeBackgroundColor = '#B0B0B0';
        }
        if (depthLevel % 3 === 0) {
            this.skillNodeElements.reverseRotation();
        }
    }
    setNodeStartPositionUsingDelay(currentOrderPosition, rotationPeriod) {
        const delayBetweenNodes = rotationPeriod / this.sameLevelSkillNodesQuantity;
        this.skillNodeElements.animationDelay = -delayBetweenNodes * currentOrderPosition;
    }
    getCurrentOrderPosition() {
        const parentNodeChildren = Array.from(document.getElementById(String(this.parentNodeId)).children);
        const sameLevelSkillNodes = parentNodeChildren.filter((htmlElement) => htmlElement.classList.contains('skill-node'));
        return sameLevelSkillNodes.length;
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
        const parentNode = startData.find(skillNode => skillNode.id == nodeId);
        if (nodeId === 0 || (parentNode === null || parentNode === void 0 ? void 0 : parentNode.main)) {
            return null;
        }
        return parentNode;
    }
}
//# sourceMappingURL=skillNode.js.map