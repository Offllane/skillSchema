import {SkillNodeElements} from "./skillNodeElements.js";
import {startData} from "../data.js";

export class SkillNode implements ISkillNodeStartData {
  public id!: number;
  public parentNodeId!: number;
  public nodeTitle!: string;
  public sameLevelSkillNodesQuantity: number; // how many nodes with same orbit we have
  public rotationPeriod = 40; // animation time
  public orbitWidth = 400;

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
    this.setNodeStartPositionUsingDelay(this.getCurrentOrderPosition());

    const currentDepthLevel = this.getCurrentDepthLevel();
    this.setOrbitWidth(currentDepthLevel);
    this.setRotationRadius(currentDepthLevel);
  }

  private setNodeStartPositionUsingDelay(currentOrderPosition: number): void {
    const delayBetweenNodes = this.rotationPeriod / this.sameLevelSkillNodesQuantity;
    this.skillNodeElements.animationDelay = -delayBetweenNodes * currentOrderPosition;
  }

  private getCurrentOrderPosition(): number {
    const parentNodeChildren = Array.from(document.getElementById(String(this.parentNodeId)).children);
    const sameLevelSkillNodes = parentNodeChildren.filter((htmlElement: HTMLElement) => htmlElement.classList.contains('skill-node'));
    return sameLevelSkillNodes.length;
  }

  private setOrbitWidth(currentNodeDepthLevel: number): void {
    this.skillNodeElements.orbitWidth = SkillNode.calculateOrbitWidth(currentNodeDepthLevel);
  }

  private setRotationRadius(currentNodeDepthLevel: number): void {
    // should be half of parent node orbit width
    this.skillNodeElements.rotationRadius = SkillNode.calculateOrbitWidth(currentNodeDepthLevel - 1);
  }

  private static calculateOrbitWidth(currentNodeDepthLevel: number) {
    return 400 - currentNodeDepthLevel * 100;
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