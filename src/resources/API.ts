type StatusChangeCallback = (payload: number) => void;

const handlers: Map<string, StatusChangeCallback> = new Map();

export function subscribe(id: string, callback: StatusChangeCallback): void {
    const existingHandler = handlers.get(id);
    if (existingHandler) {
        throw new Error(
            'Нельзя подписаться на изменение одного и того же источника несколько раз.' +
                ' Сначала уберите предыдущий обработчик с помощью функции unsubscribe(id, callback).',
        );
    }
    handlers.set(id, callback);
}

export function unsubscribe(id: string, callback: StatusChangeCallback): void {
    const existingHandler = handlers.get(id);
    if (existingHandler) {
        if (existingHandler !== callback) {
            throw new Error(
                'При отписке передан не тот callback, с которым осуществлялась подписка.',
            );
        }
        handlers.delete(id);
    } else {
        throw new Error(
            `Невозможно отписаться от изменения источника ${id}, т.к. для него не существует подписок.`,
        );
    }
}

export function fireEvent(id: string, payload: number) {
    const existingHandler = handlers.get(id);
    if (existingHandler) {
        existingHandler(payload);
    }
}
