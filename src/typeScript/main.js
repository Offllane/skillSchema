import { startData } from "./data.js";
import { depthNodeConfig } from "./configs.js";
import { SkillNode } from "./models/skillNode.js";
const wrapperElement = document.getElementById('wrapper');
const skillNodesArray = [];
setMainNode();
setMainNodeStartValues();
startData.forEach((skillNode) => {
    const sameLevelSkillNodes = startData.filter(_skillNode => _skillNode.parentNodeId === skillNode.parentNodeId);
    skillNode.sameLevelSkillNodesQuantity = sameLevelSkillNodes.length;
    skillNodesArray.push(new SkillNode(skillNode));
});
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
function setMainNodeStartValues() {
    const { nodeWidth, orbitWidth } = depthNodeConfig[0];
    document.getElementById('zero-orbit').style.width = `${orbitWidth}px`;
    document.getElementById('zero-node-title').style.width = `${nodeWidth}px`;
}
function redrawSchema(mainNodeId) {
    wrapperElement.innerHTML = '';
    const mainSkillNode = getMainSkillNode();
    mainSkillNode.main = false;
    const newMainSkillNode = getNodeById(mainNodeId);
    newMainSkillNode.main = true;
    setMainNode();
    setMainNodeStartValues();
    addSkillNodesToSchema();
}
function addSkillNodesToSchema() {
    skillNodesArray.forEach((skillNode) => skillNode.createSkillNode());
}
function getMainSkillNode() {
    return startData.find((skillNode) => skillNode.main);
}
function getNodeById(nodeId) {
    return startData.find((skillNode) => String(skillNode.id) === nodeId);
}
document.addEventListener('click', (event) => {
    if (!event.target.classList.contains('orbit')) {
        return;
    }
    if (event.target.id === 'zero-orbit') {
        return;
    }
    console.log(event.target.id);
    redrawSchema(event.target.id);
});
//# sourceMappingURL=main.js.map