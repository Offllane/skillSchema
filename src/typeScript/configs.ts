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
    orbitWidth: 350,
    rotationPeriod: 50
  },
  4: { // second ring of skills
    nodeWidth: 50,
    orbitWidth: 350,
    rotationPeriod: 40
  },
  'default': { // if skill deep level more than we have in this config
    nodeWidth: 50,
    orbitWidth: 350,
    rotationPeriod: 40
  }
}