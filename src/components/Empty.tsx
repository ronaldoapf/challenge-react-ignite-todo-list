import { Clipboard } from "phosphor-react";

import styles from './Empty.module.css'

export function Empty() {
  return (
    <section className={styles.container}>
      <Clipboard size={56} className={styles.clipboard} />
      <strong className={styles.titleTodo}>Você ainda não tem tarefas cadastradas</strong>
      <p className={styles.todoText}>Crie tarefas e organize seus itens a fazer</p>
    </section>
  )
}