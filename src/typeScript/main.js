import { startData } from "./data.js";
import { SkillNode } from "./models/skillNode.js";
console.log(startData);
startData.forEach(skillNode => {
    const sameLevelSkillNodes = startData.filter(_skillNode => _skillNode.parentNodeId === skillNode.parentNodeId);
    skillNode.sameLevelSkillNodesQuantity = sameLevelSkillNodes.length;
    new SkillNode(skillNode);
});
//# sourceMappingURL=main.js.map