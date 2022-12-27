import { SkillNodeElements } from "./skillNodeElements.js";
import { startData } from "../data.js";
import { config } from "../configs.js";
import { depthNodeConfig } from "../configs.js";
export class SkillNode {
    constructor(skillNodeData) {
        this.rotationPeriod = config.startRotationPeriod; // animation time
        this.orbitWidth = config.startOrbitWidth;
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
        this.setNodeParamsDependedOnDepth();
        this.setNodeStartPositionUsingDelay(this.getCurrentOrderPosition());
    }
    setNodeParamsDependedOnDepth() {
        const currentDepthLevel = this.getCurrentDepthLevel();
        const { nodeWidth, orbitWidth, rotationPeriod } = depthNodeConfig[currentDepthLevel];
        this.skillNodeElements.nodeWidth = nodeWidth;
        this.skillNodeElements.orbitWidth = orbitWidth;
        this.skillNodeElements.rotationPeriod = rotationPeriod;
        this.skillNodeElements.rotationRadius = depthNodeConfig[currentDepthLevel - 1].orbitWidth; // parent node orbit width
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