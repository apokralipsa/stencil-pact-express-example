import { Component, h, Prop, State } from '@stencil/core';
import { Todo } from 'model';

@Component({
  tag: 'todo-list',
  styleUrl: 'todo-list.css',
  shadow: true,
})
export class TodoList {
  @Prop() from: string;
  @State() todos: Todo[];

  componentWillLoad() {
    return fetch(`${this.from}/todos`)
      .then(response => response.json())
      .then(fetchedTodos => (this.todos = fetchedTodos));
  }

  render() {
    return (
      <div>
        {this.todos.map(({ description }) => (
          <p>{description}</p>
        ))}
      </div>
    );
  }
}
