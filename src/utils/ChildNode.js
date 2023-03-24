export default class ChildNode {
  constructor(parent = null, position = null) {
    this.parent = parent;
    this.position = position;
    this.g = 0;
    this.h = 0;
    this.f = 0;
  }

  checkEquality(otherNode) {
    const { position = [] } = otherNode;
    for (let i = 0; i < position.length; i++) {
      if (this.position[i] !== position[i]) {
        return false;
      }
    }
    return true;
  }
}
