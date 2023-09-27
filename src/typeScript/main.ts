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
  document.getElementById('zero-node-title').style.width = `${nodeWidth}px`;
}

function redrawSchema(mainNodeId: string) {
  wrapperElement.innerHTML = '';
  const mainSkillNode = getMainSkillNode();
  mainSkillNode.main = false;
  const newMainSkillNode = getNodeById(mainNodeId);
  newMainSkillNode.main = true;
  setMainNode();
  setMainNodeStartValues();
  addSkillNodesToSchema();
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

document.addEventListener('click', (event: any) => {
  if (!(event.target as HTMLElement).classList.contains('orbit')) { return; }
  if (event.target.id === 'zero-orbit') { return; }
  console.log(event.target.id);
  redrawSchema(event.target.id);
});