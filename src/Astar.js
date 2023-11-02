import React, { useState } from 'react';

function calculateDistance(point1, point2) {
    const [x1, y1] = point1;
    const [x2, y2] = point2;

    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function astar(start, goal, obstacles) {
    const openSet = new Set();
    const cameFrom = new Map();
    const gScore = new Map();
    const fScore = new Map();

    const heuristic = (point) => {
        const [x1, y1] = point;
        const [x2, y2] = goal;
        return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    };

    gScore.set(start.toString(), 0);
    fScore.set(start.toString(), heuristic(start));

    openSet.add(start.toString());

    while (openSet.size > 0) {
        const current = Array.from(openSet).reduce((min, point) => {
            if (fScore.get(point) < fScore.get(min)) return point;
            return min;
        }, Array.from(openSet)[0]);

        if (current === goal.toString()) {
            return reconstructPath(cameFrom, current);
        }

        openSet.delete(current);
        const [x, y] = current.split(',').map(Number);

        for (let [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
            const neighbor = [x + dx, y + dy];
            const neighborStr = neighbor.toString();

            if (neighbor[0] < 0 || neighbor[0] >= 10 || neighbor[1] < 0 || neighbor[1] >= 10 || obstacles.has(neighborStr)) {
                continue;
            }

            const tentativeGScore = gScore.get(current) + 1; // Assuming a constant cost of 1 for each move.

            if (!gScore.has(neighborStr) || tentativeGScore < gScore.get(neighborStr)) {
                cameFrom.set(neighborStr, current);
                gScore.set(neighborStr, tentativeGScore);
                fScore.set(neighborStr, tentativeGScore + heuristic(neighbor));
                openSet.add(neighborStr);
            }
        }
    }

    return null;
}

function reconstructPath(cameFrom, current) {
    const path = [current];
    while (cameFrom.has(current)) {
        current = cameFrom.get(current);
        path.push(current);
    }
    return path.map((str) => str.split(',').map(Number));
}



const Astar = () => {
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
            const shortestPath = astar(start, goal, obstacles);
            setPath(shortestPath);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // グリッドとボタンを中央に配置
            justifyContent: 'center', // グリッドとボタンを中央に配置
            height: '50vh', // 画面の高さいっぱいに表示
        }}>
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
                            {obstacles.has(`${row},${col}`) && 'X'}
                        </div>
                    ))}
                </div>
            ))}
            <button onClick={handleCreatePathClick}
            style={{ fontSize: '12px', padding: '4px 8px', maxWidth: '200px', // ボタンの最大幅を設定
            whiteSpace: 'nowrap' }}
            >最短経路を作成</button>
        </div>
    );
};

export default Astar;
