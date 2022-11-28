import { useState } from 'react';
import { fireEvent } from './API';

export const sources = ['first', 'second'];

function getRandomInt(): number {
    const min = 0;
    const max = 101;
    return Math.floor(Math.random() * (max - min) + min);
}

export function APIControls(props: { changeSource: () => void }) {
    const [firstNumber, setFirstNumber] = useState(-1);
    const [secondNumber, setSecondNumber] = useState(-1);

    function innerFireEvent() {
        const first = getRandomInt();
        const second = getRandomInt();
        fireEvent(sources[0], first);
        fireEvent(sources[1], second);
        setFirstNumber(first);
        setSecondNumber(second);
    }

    return (
        <div>
            <button onClick={props.changeSource}>Change source</button>
            <button onClick={innerFireEvent}>Fire event</button>
            <div>
                <h2>Последние отправленные цифры</h2>
                <div>first: {firstNumber}</div>
                <div>second: {secondNumber}</div>
            </div>
        </div>
    );
}
