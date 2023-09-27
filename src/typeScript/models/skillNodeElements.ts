export class SkillNodeElements {
  public skillNodeElement: HTMLElement;
  public containerElement: HTMLElement;
  public nodeTitleElement: HTMLElement;
  public orbitElement: HTMLElement;

  public set nodeWidth(width: number) {
    this.nodeTitleElement.style.width = `${width}px`;
  }

  public set animationDelay(animationDelay: number) {
    this.skillNodeElement.style.animationDelay =`${animationDelay}s`;
  }

  public set orbitWidth(orbitWidth: number) {
    this.orbitElement.style.width = `${orbitWidth}px`;
  }

  public set rotationRadius(parentOrbitWidthRadius: number) {
    // this property is used in rotate animation
    this.skillNodeElement.style.setProperty('--halfOfOrbitWidth', `${parentOrbitWidthRadius / 2}px`);
  }

  public set rotationPeriod(rotationPeriod: number) {
    this.skillNodeElement.style.animation = `rotate ${rotationPeriod}s linear infinite`;
  }

  public set nodeTitle(title: string) {
    this.nodeTitleElement.innerText = title;
  }

  public set skillNodeBackgroundColor(color: string) {
    this.skillNodeElement.style.border = `1px solid ${color}`;
  }

  /**
   * create structure like this
   * <div class="skill-node">
   *   <div class="container" id="{{this.id}}">
   *     <div class="node-title">{{this.title}}</div>
   *     <div class="orbit"></div>
   *   </div>
   * </div>
   */
  public createNodeStructure(skillNode: ISkillNode): void {
    this.createSkillNodeElement();
    this.createContainerElement(skillNode.id);
    this.createNodeTitleElement(skillNode.nodeTitle);
    this.createOrbitElement(skillNode.orbitWidth);
  }

  public createSkillNodeElement(): void {
    this.skillNodeElement = document.createElement('div');
    this.skillNodeElement.classList.add('skill-node');
  }

  public createContainerElement(id: number): void {
    this.containerElement = document.createElement('div');
    this.containerElement.classList.add('container');
    this.containerElement.id = String(id);
    this.skillNodeElement.appendChild(this.containerElement);
  }

  public createNodeTitleElement(title: string): void {
    this.nodeTitleElement = document.createElement('div');
    this.nodeTitleElement.classList.add('node-title');
    this.nodeTitleElement.innerText = title;
    this.containerElement.appendChild(this.nodeTitleElement);
  }

  public createOrbitElement(orbitWidth: number): void {
    this.orbitElement = document.createElement('div');
    this.orbitElement.classList.add('orbit');
    this.orbitElement.id = String(this.containerElement.id);
    this.orbitElement.style.width = `${orbitWidth}px`;
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

  public reverseRotation(): void {
    this.skillNodeElement.style.animationDirection = 'reverse';
  }
}