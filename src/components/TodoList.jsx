import React, { useState } from 'react';
import TodoItem from './TodoItem';
import { useTodo } from '@/contexts/TodoContext';

const TodoList = () => {
  const [search, setSearch] = useState('');
  const { onUpdate, onDelete, todos } = useTodo();

  const filteredTodos = () => {
    return todos.filter((item) => item.task.toLowerCase().includes(search.toLowerCase()));
  };

  const lookBack = () => {
    console.log('lookback');
    const total = todos.length;
    const done = todos.filter((todo) => todo.isDone).length;
    const left = total - done;
    return { total, done, left };
  };

  return (
    <div>
      <h2>할 일 목록</h2>
      <div>배열의 길이 : {lookBack().total}</div>
      <input
        type='search'
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder='검색어를 입력하세요.'
        className='p-3 text-black w-full'
      />
      <ul className='mt-5 flex flex-col gap-2 divide-y'>{filteredTodos().map((item) => (console.log(item), (<TodoItem key={item.id} {...item} onUpdate={onUpdate} onDelete={onDelete} />)))}</ul>
    </div>
  );
};

export default TodoList;
