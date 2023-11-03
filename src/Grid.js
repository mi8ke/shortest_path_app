import React, { useState } from 'react';

function calculateDistance(point1, point2) {
    const [x1, y1] = point1;
    const [x2, y2] = point2;

    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}
function dijkstra(start, goal, obstacles) {
    const visited = new Set(); // 重複を許容せず、要素の順序を保存するコンストラクタ
    const queue = [[start, 0, [start]]]; // [current, distance, path]の形式

    while (queue && queue.length > 0) { // queueが存在し、要素数が0より大きい場合。queueが0になるまで続行。
        queue.sort((a, b) => a[1] - b[1]); // 

        const [current, distance, path] = queue.shift();

        if (current[0] === goal[0] && current[1] === goal[1]) { // x座標とy座標を比較
            return path;
        }

        if (!visited.has(current.toString())) {
            visited.add(current.toString());
            const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];// 上下左右
            for (let [i, j] of directions) {
                const next = [current[0] + i, current[1] + j];

                if (
                    next[0] >= 0 &&
                    next[0] < 10 &&
                    next[1] >= 0 &&
                    next[1] < 10 &&
                    !visited.has(next.toString()) && // 訪れていない
                    !obstacles.has(next.toString()) // 障害物でない
                ) {
                    queue.push([next, distance + calculateDistance(current, next), [...path, next]]); // 新たな経路情報を登録 
                }
            }
        }
    }

    return null;
}





const Grid = () => {
    const rows = Array.from(Array(10).keys());
    const cols = Array.from(Array(10).keys());

    const [start, setStart] = useState(null); //startは座標情報の状態変数、setStartはstartの値を変更するための関数
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
        <div style={{ display: 'flex', flexDirection: 'column', 
        alignItems: 'center', // グリッドとボタンを中央に配置
        justifyContent: 'center', // グリッドとボタンを中央に配置
        height: '50vh'}}>
            {rows.map((row) => (
                <div key={row} style={{ display: 'flex' }}>
                    {cols.map((col) => (
                        <div
                            key={col}
                            style={{ width: 30, height: 30, border: '1px solid black', textAlign: 'center' }}
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
            <button onClick={handleCreatePathClick}>最短経路を作成</button>
        </div>
    );
};

export default Grid;
