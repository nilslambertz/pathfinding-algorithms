import {getPathNeighbours} from "../Utils/Functions";

let steps;
let maze;
let marks;
let path;
let count;
let x;
let y;
let lastX;
let lastY;
let start;
let end;

function neverBeenHere(n, currX, currY) {
    for(let elem of n) {
        if(getMarks(currX, currY, elem.x, elem.y) > 0) {
            return false;
        }
    }
    return true;
}

function getMarks(x1, y1, x2, y2) {
    let curr = marks[x1][y1];
    if(x2 < x1) {
        return curr.top;
    } else {
        if(x1 < x2) {
            return curr.bottom;
        } else {
            if(y2 < y1) {
                return curr.left;
            } else {
                return curr.right;
            }
        }
    }
}

function mark(x1, y1, x2, y2) {
    let curr = marks[x1][y1];
    let from = marks[x2][y2];
    if(x2 < x1) {
        curr.top++;
        from.bottom++;
    } else {
        if(x1 < x2) {
            curr.bottom++;
            from.top++;
        } else {
            if(y2 < y1) {
                curr.left++;
                from.right++;
            } else {
                curr.right++;
                from.left++;
            }
        }
    }
}


function tremaux() {
    let found = false;
    while(!found) {
        let n = getPathNeighbours(maze, x, y);

        if(lastX === null && lastY === null) {
            let rand = Math.floor(Math.random() * n.length);
            let next = n[rand];
            steps[count] = [];
            if(n.length > 2) {
                mark(next.x, next.y, x, y);
                steps[count].push({
                    junctionX: x,
                    junctionY: y
                });
                count++;
                steps[count] = [];
                steps[count].push({
                    markedX: next.x,
                    markedY: next.y,
                    markCount: Object.assign({},marks[next.x][next.y])
                });
            } else {
                steps[count].push(null);
                steps[count].push({
                    x: x,
                    y: y
                });
            }
            lastX = x;
            lastY = y;
            x = next.x;
            y = next.y;
        } else if(n.length > 2) {
            if(neverBeenHere(n, x, y)) {
                let removeIndex = -1;
                for(let i = 0; i < n.length; i++) {
                    if(n[i].x === lastX && n[i].y === lastY) removeIndex = i;
                }
                n.splice(removeIndex, 1);
                mark(lastX, lastY, x, y);

                steps[count].push({
                    markedX: lastX,
                    markedY: lastY,
                    markCount: Object.assign({},marks[lastX][lastY])
                });
                count++;
                steps[count] = {
                    junctionX: x,
                    junctionY: y
                };
                count++;
                steps[count] = [];
                // console.log("marked " + lastX + ":" + lastY);
                let rand = Math.floor(Math.random() * n.length);
                let next = n[rand];
                //  marks[next.x][next.y]++;
                mark(next.x, next.y, x, y);
                //  console.log("marked " + next.x + ":" + next.y);
                lastX = x;
                lastY = y;
                x = next.x;
                y = next.y;

                steps[count].push({
                    markedX: next.x,
                    markedY: next.y,
                    markCount: Object.assign({},marks[next.x][next.y])
                });
            } else {
                // marks[lastX][lastY]++;
                mark(lastX, lastY, x, y);
                steps[count].push({
                    markedX: lastX,
                    markedY: lastY,
                    markCount: Object.assign({},marks[lastX][lastY])
                });
                count++;
                steps[count] = {
                    junctionX: x,
                    junctionY: y
                };
                count++;
                steps[count] = [];
                //  console.log("marked " + lastX + ":" + lastY);
                if(getMarks(x, y, lastX, lastY) === 1) {
                    //  marks[lastX][lastY]++;
                    mark(lastX, lastY, x, y);
                    //    console.log("marked " + lastX + ":" + lastY);
                    let tempX = lastX;
                    lastX = x;
                    x = tempX;

                    let tempY = lastY;
                    lastY = y;
                    y = tempY;

                    steps[count].push({
                        markedX: lastX,
                        markedY: lastY,
                        markCount: Object.assign({},marks[lastX][lastY])
                    });
                } else {
                    let minMarks = 2;
                    let minElem = null;
                    //   console.log(n);
                    let temp = null;
                    for(let i = 0; i < n.length; i++) {
                        if((temp = getMarks(n[i].x, n[i].y, x, y)) < minMarks) {
                            minElem = n[i];
                            minMarks = temp;
                        }
                    }
                    if(minMarks > 1) {
                        console.log("Error");
                        return false;
                    }
                    // marks[minElem.x][minElem.y]++;
                    mark(minElem.x, minElem.y, x, y);
                    //  console.log("marked " + minElem.x + ":" + minElem.y);
                    lastX = x;
                    lastY = y;
                    x = minElem.x;
                    y = minElem.y;

                    steps[count].push({
                        markedX: minElem.x,
                        markedY: minElem.y,
                        markCount: Object.assign({},marks[minElem.x][minElem.y])
                    });
                }
            }
        } else if(n.length === 2) {
            steps[count].push({
                x: x,
                y: y
            });
            for(let elem of n) {
                if(elem.x !== lastX || elem.y !== lastY) {
                    lastX = x;
                    lastY = y;
                    x = elem.x;
                    y = elem.y;
                    break;
                }
            }
        } else if(n.length === 1) {
            steps[count].push({
                x: x,
                y: y
            });

            lastX = x;
            lastY = y;
            x = n[0].x;
            y = n[0].y;
        }

        if(x === end[0] && y === end[1]) {
            found = true;
            steps[count].push(null);
            count++;
            steps[count] = {
                end: true
            }
        }
    }
    return true;
}

function getTremaux(m, s, e) {
    maze = m;
    steps = [];
    end = e;
    start = s;
    path = [];
    marks = [];
    count = 0;
    for(let i = 0; i < maze.length; i++) {
        marks[i] = [];
        for (let j = 0; j < maze[i].length; j++) {
            marks[i][j] = {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            };
        }
    }

    x = start[0];
    y = start[1];
    lastX = null;
    lastY = null;
    let success = tremaux();

    if(!success) {
        alert("error!");
        return null;
    }

    x = lastX;
    y = lastY;

    let visited = [];
    for (let i = 0; i < maze.length; i++) {
        visited[i] = [];
        for (let j = 0; j < maze[i].length; j++) {
            visited[i][j] = false;
        }
    }
    visited[end[0]][end[1]] = true;

    lastX = end[0];
    lastY = end[1];

    while(x !== start[0] || y !== start[1]) {
        if(x === lastX && y === lastY) {
            break;
        }

        path.push({
            x: x,
            y: y
        });
        visited[x][y] = true;
        let n = getPathNeighbours(maze, x, y);
        if(n.length === 2) {
            for(let elem of n) {
                if(visited[elem.x][elem.y] === false) {
                    lastX = x;
                    lastY = y;
                    x = elem.x;
                    y = elem.y;
                    break;
                }
            }
        } else {
            for(let elem of n) {
                let marks = getMarks(x, y, elem.x, elem.y);
                if(marks === 1 && visited[elem.x][elem.y] === false) {
                    lastX = x;
                    lastY = y;
                    x = elem.x;
                    y = elem.y;
                    break;
                }
            }
        }
    }

    return {
        steps: steps,
        path: path
    };
}

export { getTremaux };