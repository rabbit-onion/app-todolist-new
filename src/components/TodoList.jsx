import React, { useCallback, useMemo, useState } from 'react';
import TodoItem from './TodoItem';
import { useTodo } from '@/contexts/TodoContext';

const TodoList = () => {
  const [search, setSearch] = useState('');
  const { onUpdate, onDelete, todos } = useTodo();

  const filteredTodos = useMemo(() => {
    return todos.filter((item) => item.task.toLowerCase().includes(search.toLowerCase()));
  }, [todos, search]);

  const lookBack = useMemo(() => {
    console.log('lookback');
    const total = todos.length;
    const done = todos.filter((todo) => todo.isDone).length;
    const left = total - done;
    return { total, done, left };
  }, [todos]);

  // useCallBack을 사용
  const handleUpdate = useCallback(
    (id) => {
      return onUpdate(id);
    },
    [onUpdate]
  );
  const handleDelete = useCallback(
    (id) => {
      return onDelete(id);
    },
    [onDelete]
  );

  return (
    <div>
      <h2>할 일 목록</h2>
      <input
        type='search'
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder='검색어를 입력하세요.'
        className='p-3 text-black w-full'
      />
      <div>
        {lookBack.total}개 중에 {lookBack.done}개 완료, {lookBack.left}개 남음
      </div>
      <ul className='mt-5 flex flex-col gap-2 divide-y'>{filteredTodos.map((item) => (console.log(item), (<TodoItem key={item.id} {...item} onUpdate={() => handleUpdate(item.id)} onDelete={() => handleDelete(item.id)} />)))}</ul>
    </div>
  );
};

export default TodoList;
