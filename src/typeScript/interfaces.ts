interface ISkillNodeStartData {
  id: number;
  parentNodeId: number;
  nodeTitle: string;
  main?: boolean;
}

interface ISkillNode extends ISkillNodeStartData {
  sameLevelSkillNodesQuantity: number;
  orbitWidth: number;
}

interface IDepthSkillNodeConfig {
  nodeWidth: number;
  orbitWidth: number;
  rotationPeriod: number;
}

type INodesConfig = Record<number | 'default', IDepthSkillNodeConfig>