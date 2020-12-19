import { newSpecPage } from '@stencil/core/testing';
import { TodoList } from './todo-list';

describe('todo-list', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [TodoList],
      html: '<todo-list></todo-list>',
    });
    expect(root).toEqualHtml(`
      <todo-list>
        <mock:shadow-root>
            <div></div>
        </mock:shadow-root>
      </todo-list>
    `);
  });
});
