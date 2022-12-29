import {SkillNodeElements} from "./skillNodeElements.js";
import {startData} from "../data.js";
import {depthNodeConfig} from "../configs.js"

export class SkillNode implements ISkillNodeStartData {
  public id!: number;
  public parentNodeId!: number;
  public nodeTitle!: string;
  public sameLevelSkillNodesQuantity: number; // how many nodes with same orbit we have
  public orbitWidth = depthNodeConfig[0].orbitWidth;

  private skillNodeElements: SkillNodeElements = new SkillNodeElements();

  constructor(skillNodeData: ISkillNode) {
    this.id = skillNodeData.id;
    this.parentNodeId = skillNodeData.parentNodeId;
    this.nodeTitle = skillNodeData.nodeTitle;
    this.sameLevelSkillNodesQuantity = skillNodeData.sameLevelSkillNodesQuantity;

    this.createSkillNode();
  }

  private createSkillNode() {
    this.skillNodeElements.createNodeStructure(this);
    this.skillNodeElements.addNodeToSchema(this.parentNodeId);
    this.setNodeParamsDependedOnDepth();
  }

  private setNodeParamsDependedOnDepth(): void {
    const currentDepthLevel = this.getCurrentDepthLevel();
    const {nodeWidth, orbitWidth, rotationPeriod} = depthNodeConfig[currentDepthLevel];
    this.skillNodeElements.nodeWidth = nodeWidth;
    this.skillNodeElements.orbitWidth = this.orbitWidth = orbitWidth;
    this.skillNodeElements.rotationPeriod = rotationPeriod;
    this.skillNodeElements.rotationRadius = depthNodeConfig[currentDepthLevel - 1].orbitWidth; // parent node orbit width
    this.setNodeStartPositionUsingDelay(this.getCurrentOrderPosition(), rotationPeriod);
  }

  private setNodeStartPositionUsingDelay(currentOrderPosition: number, rotationPeriod: number): void {
    const delayBetweenNodes = rotationPeriod / this.sameLevelSkillNodesQuantity;
    this.skillNodeElements.animationDelay = -delayBetweenNodes * currentOrderPosition;
  }

  private getCurrentOrderPosition(): number {
    const parentNodeChildren = Array.from(document.getElementById(String(this.parentNodeId)).children);
    const sameLevelSkillNodes = parentNodeChildren.filter((htmlElement: HTMLElement) => htmlElement.classList.contains('skill-node'));
    return sameLevelSkillNodes.length;
  }

  private getCurrentDepthLevel(): number {
    let depthLevel = 1;
    let parentSkillNode: ISkillNodeStartData = this.getParentSkillNode(this.parentNodeId);

    while (parentSkillNode) {
      parentSkillNode = this.getParentSkillNode(parentSkillNode.parentNodeId);
      depthLevel += 1;
    }

    return depthLevel;
  }

  private getParentSkillNode(nodeId: number): ISkillNodeStartData | null {
    if (nodeId === 0) { return null; }
    return startData.find(skillNode => skillNode.id == nodeId);
  }
}