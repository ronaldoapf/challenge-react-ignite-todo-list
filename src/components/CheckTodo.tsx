import { Check, Trash } from 'phosphor-react';
import styles from './CheckTodo.module.css'
import { Todo } from '../App';

interface CheckTodoProps {
  data: Todo
  onDeleteTodo: (id: number) => void
  onToggleTodo: (id: number) => void
}

export function CheckTodo({ data, onDeleteTodo, onToggleTodo }: CheckTodoProps) {

  function handleToggleTodo() {
    onToggleTodo(data.id) 
  }

  function handleDeleteTodo() {
    onDeleteTodo(data.id)
  }

  const checkboxCheckedClassname = data.isChecked
    ? styles['checkbox-checked']
    : styles['checkbox-unchecked']
  const paragraphCheckedClassname = data.isChecked
    ? styles['paragraph-checked']
    : ''

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="checkbox" onClick={handleToggleTodo}>
          <input readOnly type="checkbox" checked={data.isChecked} />
          <span className={`${styles.checkbox} ${checkboxCheckedClassname}`}>
            {data.isChecked && <Check size={12} />}
          </span>

          <p className={`${styles.paragraph} ${paragraphCheckedClassname}`}>
            {data.text}
          </p>
        </label>
      </div>

      <button type="button" className={styles.removeTodo} onClick={handleDeleteTodo}>
        <Trash size={16} />
      </button>
    </div>
  )
}
