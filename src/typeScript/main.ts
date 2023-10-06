import {startData} from "./data.js";
import {depthNodeConfig} from "./configs.js";
import {SkillNode} from "./models/skillNode.js";

const wrapperElement = document.getElementById('wrapper');
const skillNodesArray: Array<SkillNode> = [];

setMainNode();
setMainNodeStartValues();

startData.forEach((skillNode: ISkillNode) => {
  const sameLevelSkillNodes = startData.filter(_skillNode => _skillNode.parentNodeId === skillNode.parentNodeId);
  skillNode.sameLevelSkillNodesQuantity = sameLevelSkillNodes.length;

  skillNodesArray.push(new SkillNode(skillNode));
})

function setMainNode() {
  const mainSkillNode = getMainSkillNode();
  const mainNodeElement = document.createElement('div');
  mainNodeElement.classList.add('main-node');
  mainNodeElement.id = String(mainSkillNode.id);
  const zeroOrbitElement = document.createElement('div');
  zeroOrbitElement.classList.add('orbit');
  zeroOrbitElement.id = 'zero-orbit';
  mainNodeElement.appendChild(zeroOrbitElement);
  const nodeTitleElement = document.createElement('div');
  nodeTitleElement.classList.add('node-title');
  nodeTitleElement.id = 'zero-node-title';
  nodeTitleElement.innerText = mainSkillNode.nodeTitle;
  mainNodeElement.appendChild(nodeTitleElement);
  wrapperElement.appendChild(mainNodeElement);
}

function setMainNodeStartValues(): void {
  const {nodeWidth, orbitWidth} = depthNodeConfig[0];
  document.getElementById('zero-orbit').style.width = `${orbitWidth}px`;
  (document.getElementById('zero-node-title').parentNode as HTMLElement).style.width = `${nodeWidth}px`;
}

function redrawSchema(mainNodeId: string) {
  const mainSkillNode = getMainSkillNode();
  mainSkillNode.main = false;
  const newMainSkillNode = getNodeById(mainNodeId);
  newMainSkillNode.main = true;

  animateRedrawing(mainNodeId);

  setTimeout(() => {
    wrapperElement.innerHTML = '';
    setMainNode();
    setMainNodeStartValues();
    addSkillNodesToSchema();
  }, 1500);
}

function animateRedrawing(mainNodeId: string) {
  const animationDuration = 1500;
  const animationParams = {
    duration: animationDuration,
    fill: 'forwards'
  } as KeyframeAnimationOptions;
  const zeroOrbit = document.getElementById('zero-orbit');
  const zeroOrbitChildSkillNodes = zeroOrbit.parentNode.childNodes;
  const newMainSkillNodeContainerElement = document.getElementById(mainNodeId);
  const newMainSkillNodeOrbitElement = newMainSkillNodeContainerElement.getElementsByClassName('orbit')[0] as HTMLElement;
  const newMainSkillNodeElement = newMainSkillNodeContainerElement.parentNode as HTMLElement;
  const childSkillNodes = newMainSkillNodeContainerElement.childNodes;

  zeroOrbit.animate({
    width: '1500px',
  }, animationParams);
  newMainSkillNodeElement.animate({
    width: depthNodeConfig[0].nodeWidth + 'px',
    transform: 'translateX(0)'
  }, animationParams);
  newMainSkillNodeOrbitElement.animate({
    width: depthNodeConfig[0].orbitWidth + 'px',
  }, animationParams);
  increaseChildNodesOrbit(zeroOrbitChildSkillNodes, 500, 1500, 1300);
  increaseChildNodesOrbit(childSkillNodes, 250, 500, 1300);
}

function addSkillNodesToSchema(): void {
  skillNodesArray.forEach((skillNode: SkillNode) => skillNode.createSkillNode());
}

function getMainSkillNode(): ISkillNodeStartData {
  return startData.find((skillNode: ISkillNodeStartData) => skillNode.main);
}

function getNodeById(nodeId: string): ISkillNodeStartData {
  return startData.find((skillNode: ISkillNodeStartData) => String(skillNode.id) === nodeId);
}

function increaseChildNodesOrbit(childNodes, _currentOrbitWidth, orbitWidth, duration) {
  const intervalMS = Math.floor(duration / (orbitWidth - _currentOrbitWidth));
  childNodes.forEach(childNode => {
    const child = childNode as HTMLElement;
    if (!child.classList.contains('skill-node')) { return; }
    let currentOrbitWidth = _currentOrbitWidth;
    setInterval(() => {
      if (currentOrbitWidth < orbitWidth)
        currentOrbitWidth += 3;
      child.style.setProperty('--halfOfOrbitWidth', `${currentOrbitWidth / 2}px`);
    }, intervalMS);
  });
}

document.addEventListener('click', (event: any) => {
  if (!(event.target as HTMLElement).classList.contains('orbit')) { return; }
  if (event.target.id === 'zero-orbit') { return; }
  console.log(event.target.id);
  redrawSchema(event.target.id);
});