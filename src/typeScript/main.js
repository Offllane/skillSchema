import { startData } from "./data.js";
import { config } from "./config.js";
import { SkillNode } from "./models/skillNode.js";
console.log(startData);
setMainOrbitStartWidth(config.startOrbitWidth);
startData.forEach((skillNode) => {
    const sameLevelSkillNodes = startData.filter(_skillNode => _skillNode.parentNodeId === skillNode.parentNodeId);
    skillNode.sameLevelSkillNodesQuantity = sameLevelSkillNodes.length;
    new SkillNode(skillNode);
});
function setMainOrbitStartWidth(width) {
    document.getElementById('zero-orbit').style.width = `${width}px`;
}
//# sourceMappingURL=main.js.map