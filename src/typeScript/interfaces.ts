interface ISkillNodeStartData {
  id: number;
  parentNodeId: number;
  nodeTitle: string;
}

interface ISkillNode extends ISkillNodeStartData {
  sameLevelSkillNodesQuantity: number;
  rotationPeriod: number;
  orbitWidth: number;
}