export class SkillNodeElements {
  public skillNodeElement: HTMLElement;
  public containerElement: HTMLElement;
  public nodeTitleElement: HTMLElement;
  public orbitElement: HTMLElement;


  public set animationDelay(animationDelay: number) {
    this.skillNodeElement.style.animationDelay =`${animationDelay}s`;
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
  public createNodeStructure(skillNode: ISkillNodeData): void {
    this.createSkillNodeElement(skillNode.rotationPeriod);
    this.createContainerElement(skillNode.id);
    this.createNodeTitleElement(skillNode.nodeTitle);
    this.createOrbitElement();
  }

  public createSkillNodeElement(rotationPeriod: number): void {
    this.skillNodeElement = document.createElement('div');
    this.skillNodeElement.classList.add('skill-node');
    this.skillNodeElement.style.animation = `rotate ${rotationPeriod}s linear infinite`;
  }

  public createContainerElement(id: number): void {
    this.containerElement = document.createElement('div');
    this.containerElement.classList.add('container');
    this.containerElement.id = String(id);
    this.skillNodeElement.appendChild(this.containerElement);
  }

  public createNodeTitleElement(title: string): void {
    this.nodeTitleElement = document.createElement('div');
    this.nodeTitleElement.innerText = title;
    this.containerElement.appendChild(this.nodeTitleElement);
  }

  public createOrbitElement(): void {
    this.orbitElement = document.createElement('div');
    this.orbitElement.classList.add('orbit');
    this.containerElement.appendChild(this.orbitElement);
  }

  /**
   * append SkillNode to parent skillNode container
   * @param parentNodeId
   */
  public addNodeToSchema(parentNodeId: number): void {
    const parentNode: HTMLElement = document.getElementById(String(parentNodeId));
    if (!parentNode) {
      console.error(`Element with given id = ${parentNodeId} is not found!`);
      return;
    }
    parentNode.appendChild(this.skillNodeElement);
  }
}