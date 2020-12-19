import { newE2EPage } from '@stencil/core/testing';
import { pactWith } from 'jest-pact';
import { Todo } from '../../model/todo';

pactWith({ consumer: 'frontend', provider: 'backend' }, provider => {
  describe('todo-list', () => {
    let existingTodos: Todo[];

    beforeAll(() => {
      existingTodos = [{ description: 'Buy groceries' }, { description: 'Do laundry' }];

      provider.addInteraction({
        state: 'Todo list is set',
        uponReceiving: 'A request for todos',
        willRespondWith: {
          status: 200,
          body: existingTodos,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        },
        withRequest: {
          method: 'GET',
          path: '/todos',
        },
      });
    });

    it('renders a list of todos', async () => {
      const page = await newE2EPage();

      await page.setContent(`<todo-list from="${provider.mockService.baseUrl}"></todo-list>`);
      const element = await page.find('todo-list >>> div');
      existingTodos.forEach(({ description }) => expect(element.innerText).toContain(description));
    });

    afterAll(() => {
      provider.verify();
    })
  });
});
