export const depthNodeConfig: INodesConfig = {
  0: { // main node (center of the scheme)
    nodeWidth: 75,
    orbitWidth: 450,
    rotationPeriod: 60
  },
  1: { // first ring of skills
    nodeWidth: 65,
    orbitWidth: 250,
    rotationPeriod: 120
  },
  2: { // second ring of skills
    nodeWidth: 50,
    orbitWidth: 120,
    rotationPeriod: 80
  },
  3: { // second ring of skills
    nodeWidth: 20,
    orbitWidth: 50,
    rotationPeriod: 50
  },
  4: { // second ring of skills
    nodeWidth: 2,
    orbitWidth: 0,
    rotationPeriod: 10
  },
  'default': { // if skill deep level more than we have in this config
    nodeWidth: 0,
    orbitWidth: 0,
    rotationPeriod: 0
  }
}