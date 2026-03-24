interface NotifyVideoCompletedParams {
  model: string;
  prompt: string;
  taskId: string;
  topicId?: string;
  userId: string;
}

// eslint-disable-next-line unused-imports/no-unused-vars
export async function notifyVideoCompleted(params: NotifyVideoCompletedParams): Promise<void> {}
