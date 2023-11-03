import React from 'react';
import Grid from './Grid';
import Astar from './Astar';
import ShortestPathApp from './CreatePath';

const App = () => {
    return (
        <div>
            <h1>Shortest Path Creator</h1>
            {/* <ShortestPathApp /> */}
            <Grid />
            {/* <Astar /> */}
        </div>
    );
};

export default App;