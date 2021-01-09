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

// Returns, if we already visisted this junction
function neverBeenHere(n, currX, currY) {
    // For all neighbours
    for(let elem of n) {
        // If marks at entry of neighbour-path are not 0, return false
        if(getMarks(currX, currY, elem.x, elem.y) > 0) {
            return false;
        }
    }
    // We didn't visit this junction before, return true
    return true;
}

// Gets marks between two nodes
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

// Sets mark between two nodes
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

// Marks exit node before junction and updates steps
function markJunctionEnter(lastX, lastY, x, y) {
    mark(lastX, lastY, x, y); // Mark exit of last path

    // Push mark to steps
    steps[count].push({
        markedX: lastX,
        markedY: lastY,
        markCount: Object.assign({},marks[lastX][lastY])
    });

    count++; // Update count because one "step"/path has ended
    // Add current junction to steps
    steps[count] = {
        junctionX: x,
        junctionY: y
    };

    // Update count for next path and create array in steps
    count++;
    steps[count] = [];
}

// Tremaux-algorithm
function tremaux() {
    let found = false; // If we found the exit

    // While not found
    while(!found) {
        let n = getPathNeighbours(maze, x, y); // Get neighbours

        // If at the starting-node
        if(lastX === null && lastY === null) {
            // Get random neighbour
            let rand = Math.floor(Math.random() * n.length);
            let next = n[rand];

            steps[count] = []; // Initialize first step-array

            // If we are at a junction
            if(n.length > 2) {
                mark(next.x, next.y, x, y); // Mark entry

                // Push junction to steps
                steps[count].push({
                    junctionX: x,
                    junctionY: y
                });

                // Increase count
                count++;
                steps[count] = [];

                // Push marked-coordiantes and markCount to steps
                steps[count].push({
                    markedX: next.x,
                    markedY: next.y,
                    markCount: Object.assign({},marks[next.x][next.y])
                });
            } else {
                // If not at junction, push current element (and null as previous)
                steps[count].push(null);
                steps[count].push({
                    x: x,
                    y: y
                });
            }

            // Set current coordinates to last and next to current
            lastX = x;
            lastY = y;
            x = next.x;
            y = next.y;
        } else if(n.length > 2) {
            // If not at starting node and at junction (more than 2 neighbours)

            // If never been here
            if(neverBeenHere(n, x, y)) {
                // Find node where we were in the step before
                let removeIndex = -1;
                for(let i = 0; i < n.length; i++) {
                    if(n[i].x === lastX && n[i].y === lastY) removeIndex = i;
                }
                n.splice(removeIndex, 1); // Remove the node from neighbours

                // Mark exit node before junction
                markJunctionEnter(lastX, lastY, x, y);

                // Choose random neighbour as next node and mark entry
                let rand = Math.floor(Math.random() * n.length);
                let next = n[rand];
                mark(next.x, next.y, x, y);

                // Set last and next node
                lastX = x;
                lastY = y;
                x = next.x;
                y = next.y;

                // Push marked entry to steps
                steps[count].push({
                    markedX: next.x,
                    markedY: next.y,
                    markCount: Object.assign({},marks[next.x][next.y])
                });
            } else {
                // If we have been at this junction before

                // Mark exit node before junction
                markJunctionEnter(lastX, lastY, x, y);

                // If last node currently has one mark, enter it
                if(getMarks(x, y, lastX, lastY) === 1) {
                    mark(lastX, lastY, x, y); // Mark node again

                    // Set last and next node
                    let tempX = lastX;
                    lastX = x;
                    x = tempX;

                    let tempY = lastY;
                    lastY = y;
                    y = tempY;

                    // Push marked entry to steps
                    steps[count].push({
                        markedX: lastX,
                        markedY: lastY,
                        markCount: Object.assign({},marks[lastX][lastY])
                    });
                } else {
                    // If last node already has two marks

                    // Find node with lowest number of marks
                    let minMarks = 2;
                    let minElem = undefined;
                    let temp = null;
                    for(let i = 0; i < n.length; i++) {
                        if((temp = getMarks(n[i].x, n[i].y, x, y)) < minMarks) {
                            minElem = n[i];
                            minMarks = temp;
                        }
                    }

                    // If every node has 2 marks, an error has occurred
                    if(minMarks > 1 || minElem === undefined) {
                        console.log("Error, all nodes at junction " + x + ":" + y + " are already marked twice!");
                        return false;
                    }

                    mark(minElem.x, minElem.y, x, y); // Mark entry to next path

                    // Set last and next node
                    lastX = x;
                    lastY = y;
                    x = minElem.x;
                    y = minElem.y;

                    // Push marked entry to steps
                    steps[count].push({
                        markedX: minElem.x,
                        markedY: minElem.y,
                        markCount: Object.assign({},marks[minElem.x][minElem.y])
                    });
                }
            }
        } else if(n.length === 2) {
            // If inside a path (exactly two neighbours)

            // Push current position to steps
            steps[count].push({
                x: x,
                y: y
            });

            // Chose next neighbour (the one we didn't come from)
            for(let elem of n) {
                if(elem.x !== lastX || elem.y !== lastY) {
                    // Set last and next node
                    lastX = x;
                    lastY = y;
                    x = elem.x;
                    y = elem.y;
                    break;
                }
            }
        } else if(n.length === 1) {
            // If at the end of one path (exactly one neighbour)

            // Push current position to steps
            steps[count].push({
                x: x,
                y: y
            });

            // Set last and next node (the one we came from)
            lastX = x;
            lastY = y;
            x = n[0].x;
            y = n[0].y;
        } else {
            // If number of neighbours is lower than 1, shouldn't happen
            console.log("Error, no neighbours found");
            return false;
        }

        // If we found our destination
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

    // Initialize marks with 0 in all directions
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

    // Set starting node and last to null
    x = start[0];
    y = start[1];
    lastX = null;
    lastY = null;

    let success = tremaux(); // Start search

    // If an error occured
    if(!success) {
        alert("Error while running algorithm");
        return null;
    }

    // Set current node to last before destination and last to destination
    x = lastX;
    y = lastY;
    lastX = end[0];
    lastY = end[1];

    // While we are not at our starting node
    while(x !== start[0] || y !== start[1]) {
        if(x === lastX && y === lastY) {
            break;
        }

        // Push current node to path
        path.push({
            x: x,
            y: y
        });

        let n = getPathNeighbours(maze, x, y); // Get neighbours

        // If inside path (exactly two neighbours)
        if(n.length === 2) {
            // Choose the neighbour where we haven't been in the last step
            for(let elem of n) {
                if(elem.x !== lastX || elem.y !== lastY) {
                    lastX = x;
                    lastY = y;
                    x = elem.x;
                    y = elem.y;
                    break;
                }
            }
        } else {
            if(n.length === 1) {
                console.log("Error while getting path");
                return null;
            }

            // If at junction

            for(let elem of n) {
                let marks = getMarks(x, y, elem.x, elem.y); // Get marks

                // Choose the neighbour with exactly one mark and where we haven't been in last step
                if(marks === 1 && (elem.x !== lastX || elem.y !== lastY)) {
                    lastX = x;
                    lastY = y;
                    x = elem.x;
                    y = elem.y;
                    break;
                }
            }
        }
    }

    // Return values
    return {
        steps: steps,
        path: path
    };
}

export { getTremaux };