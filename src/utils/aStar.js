import ChildNode from "./ChildNode";

export default function aStar(maze, start, end) {
  let openList = [];
  let closedList = [];
  let startNode = new ChildNode(null, start);
  startNode.g = startNode.h = startNode.f = 0;
  let endNode = new ChildNode(null, end);
  startNode.g = startNode.h = startNode.f = 0;

  openList.push(startNode);

  while (openList.length > 0) {
    let currentNode = openList[0];
    let currentIndex = 0;

    for (let i = 0; i < openList.length; i++) {
      if (openList[i].f < currentNode.f) {
        currentNode = openList[i];
        currentIndex = i;
      }
    }
    openList = [
      ...openList.slice(0, currentIndex),
      ...openList.slice(currentIndex + 1),
    ];
    closedList.push(currentNode);

    if (currentNode.checkEquality(endNode)) {
      let path = [];
      let current = currentNode;
      while (current) {
        path.push(current.position);
        current = current.parent;
      }
      return path.reverse();
    }
    let children = [];
    let childPosition = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [-1, -1],
      [-1, 1],
      [1, 1],
      [1, -1],
    ];
    for (let k = 0; k < childPosition.length; k++) {
      let newNodePosition = [
        currentNode.position[0] + childPosition[k][0],
        currentNode.position[1] + childPosition[k][1],
      ];
      if (
        newNodePosition[0] >= maze.length ||
        newNodePosition[1] >= maze[0].length ||
        newNodePosition[0] < 0 ||
        newNodePosition[1] < 0
      ) {
        continue;
      }
      if (maze[newNodePosition[0]][newNodePosition[1]] !== 0) {
        continue;
      }
      let newNode = new ChildNode(currentNode, newNodePosition);
      children.push(newNode);
    }

    for (let z = 0; z < children.length; z++) {
      const child = children[z];
      const nodeInClosedList = closedList.filter((item) => {
        if (item.checkEquality(child)) {
          return true;
        }
        return false;
      });

      if (nodeInClosedList.length > 0) {
        continue;
      }
      child.g = currentNode.g + 1;
      child.h =
        (Math.pow(child.position[0] - endNode.position[0]), 2) +
        (Math.pow(child.position[1] - endNode.position[1]), 2);
      child.f = child.g + child.h;

      const nodeIsOpenList = openList.filter((item) => {
        if (item.checkEquality(child)) {
          return true;
        }
        return false;
      });
      if (nodeIsOpenList.length > 0) {
        continue;
      }
      openList.push(child);
    }
  }
  return closedList;
}
