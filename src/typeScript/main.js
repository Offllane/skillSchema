import { startData } from "./data.js";
import { SkillNode } from "./models/skillNode.js";
console.log(startData);
startData.forEach(skillNode => {
    new SkillNode(skillNode);
});
//# sourceMappingURL=main.js.map