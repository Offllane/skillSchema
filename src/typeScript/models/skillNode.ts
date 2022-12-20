export class SkillNode {
  public id!: number;
  public parentNodeId!: number;
  public title!: string

  private nodeElement: HTMLElement;


  constructor(skillNodeData: ISkillNodeData) {
    this.id = skillNodeData.id;
    this.parentNodeId = skillNodeData.parentId;
    this.title = skillNodeData.nodeTitle;

    this.createSkillNode().then();
  }

  private async createSkillNode() {
    this.nodeElement = await this.createNodeStructure();
    await this.addNodeToParentNode(this.parentNodeId);
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
  private async createNodeStructure(): Promise<HTMLElement> {
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
  }

  private addNodeToParentNode(parentNodeId: number): void {
    const parentNode: HTMLElement = document.getElementById(String(parentNodeId));
    if (!parentNode) {
      console.error(`Element with given id = ${parentNodeId} is not found!`);
      return;
    }
    parentNode.appendChild(this.nodeElement);
  }
}