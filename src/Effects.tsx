import { subscribe, unsubscribe } from './resources/API';
import { useEffect, useState } from 'react';

export function Effects(props: { sourceId: string }) {
    const [data, setData] = useState<number>(-1);
    useEffect(() => {
        const func = (data: number) => setData(data);
        subscribe(props.sourceId, func);
        return () => {
            unsubscribe(props.sourceId, func);
            setData(-1);
        };
    }, [props.sourceId]);
    return <div>{`${props.sourceId}: ${data}`}</div>;
}
