import { startData } from "./data.js";
import  {config} from "./config.js";
import { SkillNode} from "./models/skillNode.js";

console.log(startData);

setMainOrbitStartWidth(config.startOrbitWidth);

startData.forEach((skillNode: ISkillNode) => {
  const sameLevelSkillNodes = startData.filter(_skillNode => _skillNode.parentNodeId === skillNode.parentNodeId);
  skillNode.sameLevelSkillNodesQuantity = sameLevelSkillNodes.length;

  new SkillNode(skillNode);
})

function setMainOrbitStartWidth(width: number): void {
  document.getElementById('zero-orbit').style.width = `${width}px`;
}