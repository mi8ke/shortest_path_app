import React, { useState } from 'react';

const Grid = () => {
    const rows = Array.from(Array(10).keys());
    const cols = Array.from(Array(10).keys());

    const [start, setStart] = useState(null);
    const [goal, setGoal] = useState(null);

    const handleClick = (row, col) => {
        if (!start) {
            setStart([row, col]);
        } else if (!goal) {
            setGoal([row, col]);
        } else {
            setStart([row, col]);
            setGoal(null);
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
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Grid;
