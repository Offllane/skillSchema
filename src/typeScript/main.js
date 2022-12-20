import { startData } from "./data.js";
import { SkillNode } from "./models/skillNode.js";
console.log(startData);
const node = new SkillNode(startData[0].id, startData[0].parentId, startData[0].nodeTitle);
startData.forEach(skillNode => {
    new SkillNode(skillNode.id, skillNode.parentId, skillNode.nodeTitle);
});
//# sourceMappingURL=main.js.map