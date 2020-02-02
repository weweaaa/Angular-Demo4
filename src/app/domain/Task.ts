export interface Task {
  id: number;
  title: string;
  isDone: boolean;
}

/**
 * Task 狀態
 */
export enum TaskStatus {
  /** 全部狀態 */
  ALL,
  /** 待進行中 */
  Active,
  /** 已完成 */
  Complete,
}
