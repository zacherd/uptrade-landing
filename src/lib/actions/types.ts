export type ActionState<T = unknown> = {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
  fieldErrors?: Record<string, string[]>;
  showToast?: boolean;
  redirect?: string;
} | null;
