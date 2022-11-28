import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Effects } from './Effects';
import { fireEvent } from './resources/API';

describe('Эффекты', () => {
    let container: HTMLDivElement;
    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container);
        container.remove();
    });

    it('Компонент отображает последнее сообщение', () => {
        act(() => {
            render(<Effects sourceId="test1" />, container);
        });

        expect(container.textContent).toBe('test1: -1');

        act(() => {
            fireEvent('test1', 1234);
        });

        expect(container.textContent).toBe('test1: 1234');
    });

    it('Компонент сбрасывает последнее сообщение после изменения источника', () => {
        act(() => {
            render(<Effects sourceId="test1" />, container);
        });
        act(() => {
            fireEvent('test1', 1234);
        });

        act(() => {
            render(<Effects sourceId="test2" />, container);
        });

        expect(container.textContent).toBe('test2: -1');
    });

    it('Компонент реагирует на события после изменения источника', () => {
        act(() => {
            render(<Effects sourceId="test1" />, container);
        });
        act(() => {
            fireEvent('test1', 1234);
        });
        act(() => {
            render(<Effects sourceId="test2" />, container);
        });

        act(() => {
            fireEvent('test2', 4331);
        });

        expect(container.textContent).toBe('test2: 4331');
    });

    it('Компонент не реагирует на события другого источника', () => {
        act(() => {
            render(<Effects sourceId="test1" />, container);
        });
        act(() => {
            fireEvent('test1', 1234);
        });
        act(() => {
            render(<Effects sourceId="test2" />, container);
        });
        act(() => {
            fireEvent('test2', 4331);
        });

        act(() => {
            fireEvent('test1', 1234);
        });

        expect(container.textContent).toBe('test2: 4331');
    });

    it('Компонент не подписывается 2 раза на один и тот же источник', () => {
        act(() => {
            render(<Effects sourceId="test1" />, container);
        });
        act(() => {
            render(<Effects sourceId="test2" />, container);
        });

        act(() => {
            render(<Effects sourceId="test1" />, container);
        });

        // там свалится ошибка, если не отписаться
        expect(container.textContent).toBe('test1: -1');
    });
});
