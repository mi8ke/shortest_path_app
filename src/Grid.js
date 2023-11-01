import React from 'react';

const Grid = () => {
    const rows = Array.from(Array(10).keys());
    const cols = Array.from(Array(10).keys());

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {rows.map((row) => (
                <div key={row} style={{ display: 'flex' }}>
                    {cols.map((col) => (
                        <div key={col} style={{ width: 20, height: 20, border: '1px solid black' }} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Grid;