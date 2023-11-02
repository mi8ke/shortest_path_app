import React, { useState } from 'react';

function calculateDistance(point1, point2) {
    const [x1, y1] = point1;
    const [x2, y2] = point2;

    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}
function dijkstra(start, goal, obstacles) {
    const visited = new Set();
    const queue = [[start, 0, [start]]];

    while (queue && queue.length > 0) {
        queue.sort((a, b) => a[1] - b[1]);

        const [current, distance, path] = queue.shift();

        if (current[0] === goal[0] && current[1] === goal[1]) {
            return path;
        }

        if (!visited.has(current.toString())) {
            visited.add(current.toString());
            // 周囲のセルの見ている。上下左右だけにするには
            const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
            for (let [i, j] of directions) {
                for (let [i, j] of directions) {

            // for (let i = -1; i <= 1; i++) {
            //     for (let j = -1; j <= 1; j++) {
                    const next = [current[0] + i, current[1] + j];

                    if (
                        next[0] >= 0 &&
                        next[0] < 10 &&
                        next[1] >= 0 &&
                        next[1] < 10 &&
                        !visited.has(next.toString()) &&
                        !obstacles.has(next.toString())
                    ) {
                        queue.push([next, distance + calculateDistance(current, next), [...path, next]]);
                    }
                }
            }
        }
    }

    return null;
}





const Grid = () => {
    const rows = Array.from(Array(10).keys());
    const cols = Array.from(Array(10).keys());

    const [start, setStart] = useState(null);
    const [goal, setGoal] = useState(null);
    const [path, setPath] = useState([]);
    const [obstacles, setObstacles] = useState(new Set());


    const handleClick = (row, col) => {
        if (!start) {
            setStart([row, col]);
        } else if (!goal) {
            setGoal([row, col]);
        } else {
            if (obstacles.has(`${row},${col}`)) {
                obstacles.delete(`${row},${col}`);
            } else {
                obstacles.add(`${row},${col}`);
            }
            setObstacles(new Set(obstacles));
        }
    };

    const handleCreatePathClick = () => {
        if (start && goal) {
            const shortestPath = dijkstra(start, goal, obstacles);
            setPath(shortestPath);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {rows.map((row) => (
                <div key={row} style={{ display: 'flex' }}>
                    {cols.map((col) => (
                        <div
                            key={col}
                            style={{ width: 20, height: 20, border: '1px solid black', textAlign: 'center' }}
                            onClick={() => handleClick(row, col)}
                        >
                            {start && start[0] === row && start[1] === col && 'S'}
                            {goal && goal[0] === row && goal[1] === col && 'G'}
                            {path && path.find(point => point[0] === row && point[1] === col) && '*'}
                            {obstacles.has(`${row},${col}`) && 'O'}
                        </div>
                    ))}
                </div>
            ))}
            <button onClick={handleCreatePathClick}>最短経路を作成</button>
        </div>
    );
};

export default Grid;
