
import { TaskStatus } from 'src/domain/entities/task.entity';
import { Result } from 'src/shared/results/result';

export class TaskStatusHelper {
  /**
   * Convierte un índice numérico a su correspondiente valor en el enum TaskStatus.
   * @param statusIndex - Índice del estado en el enum TaskStatus
   * @returns Result con el TaskStatus correspondiente o un error si el índice es inválido
   */
  public static convertStatus(statusIndex: number): Result<TaskStatus> {
    const statusValues = Object.values(TaskStatus);

    if (statusIndex < 0 || statusIndex >= statusValues.length) {
      return Result.fail('Estado inválido para la tarea.');
    }

    return Result.ok(statusValues[statusIndex] as TaskStatus);
  }
}
