import { useState } from 'react';
import { Input } from './components/Input'
import { Header } from './components/Header'
import { Button } from './components/Button'
import { CheckTodo } from './components/CheckTodo';
import { PlusCircle } from 'phosphor-react' 

import styles from './App.module.css';
import './global.css'
import { Empty } from './components/Empty';

export interface Todo {
  id: number;
  text: string;
  isChecked: boolean;
}

export function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [todoText, setTodoText] = useState<string>('');
  
  function handleCreateNewTodo() {
    setTodos(prevState => ([...prevState, {
      id: prevState.length + 1, 
      text: todoText,
      isChecked: false
    }]))

    setTodoText('')
  }

  function handleDeleteTodo(todoToDelete: number) {
    const newTodos = todos.filter(todo => todo.id !== todoToDelete)
    setTodos(newTodos)
  }

  function handleToggleTodo(id: number) {
    const updatedTasks = todos.map((task) => {
      if (task.id === id) {
        return { ...task, isChecked: !task.isChecked }
      }

      return { ...task }
    })

    setTodos(updatedTasks)
  }

  const checkedTasksCounter = todos.reduce((prevValue, currentTask) => {
    if (currentTask.isChecked) {
      return prevValue + 1
    }

    return prevValue
  }, 0)

  const isNewTodoButtonDisabled = todoText.length === 0

  return (
    <>
      <Header />
      <main className={styles.mainContainer}>
        <div>
          <Input 
            value={todoText} 
            placeholder='Adicione uma nova tarefa' 
            onChange={(e) => setTodoText(e.target.value)} 
          />
          <Button 
            type="button" 
            onClick={handleCreateNewTodo} 
            disabled={isNewTodoButtonDisabled}
          >
            Criar
            <PlusCircle size={16} spacing={8}/>
          </Button> 
        </div>

        <div className={styles.todosInfo}>
          <div>
            <p>Tarefas criadas</p>
            <span>{todos.length}</span>
          </div>

          <div> 
            <p>Concluídas</p>
            {todos.length === 0 ? (
              <span>0</span>
            ) : (
              <span>{checkedTasksCounter} de {todos.length}</span>
            )}
          </div>
        </div>
        
        {todos.length === 0 ? (
          <Empty />
        ) : (
          <div className={styles.todoListContainer}>
            {todos.map(item => {
              return (
                <CheckTodo 
                  key={item.id} 
                  data={item} 
                  onToggleTodo={handleToggleTodo}
                  onDeleteTodo={handleDeleteTodo}
                />
              )
            })}
          </div>
        )}
      </main>
    </>
  )
}