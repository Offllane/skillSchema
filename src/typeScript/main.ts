import { startData } from "./data.js";
import {depthNodeConfig} from "./configs.js";
import { SkillNode} from "./models/skillNode.js";

console.log(startData);

setMainNodeStartValues();

startData.forEach((skillNode: ISkillNode) => {
  const sameLevelSkillNodes = startData.filter(_skillNode => _skillNode.parentNodeId === skillNode.parentNodeId);
  skillNode.sameLevelSkillNodesQuantity = sameLevelSkillNodes.length;

  new SkillNode(skillNode);
})

function setMainNodeStartValues(): void {
  const {nodeWidth, orbitWidth} = depthNodeConfig[0];
  document.getElementById('zero-orbit').style.width = `${orbitWidth}px`;
  document.getElementById('zero-node-title').style.width = `${nodeWidth}px`;
}