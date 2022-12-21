import {SkillNodeElements} from "./SkillNodeElements.js";

export class SkillNode implements ISkillNodeData {
  public id!: number;
  public parentNodeId!: number;
  public nodeTitle!: string;
  public sameLevelSkillNodesQuantity: number; // how many nodes with same orbit we have
  public rotationPeriod = 40; // animation time

  private skillNodeElements: SkillNodeElements = new SkillNodeElements();

  constructor(skillNodeData: ISkillNodeData) {
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
}