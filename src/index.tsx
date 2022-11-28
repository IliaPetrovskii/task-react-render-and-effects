import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { APIControls } from './resources/APIControls';
import { Effects } from './Effects';

const sources = ['first', 'second'];

function App() {
    const [currentSource, setCurrentSource] = useState(sources[0]);

    function changeSource() {
        setCurrentSource(
            currentSource === sources[0] ? sources[1] : sources[0],
        );
    }

    return (
        <React.StrictMode>
            <Effects sourceId={currentSource} />
            <APIControls changeSource={changeSource} />
        </React.StrictMode>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
