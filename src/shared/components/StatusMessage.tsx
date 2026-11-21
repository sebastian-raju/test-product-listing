import { type JSX, type ReactNode } from 'react';

interface StatusMessageProps {
  readonly title: string;
  readonly description?: string | undefined;
  readonly role?: 'status' | 'alert';
  readonly action?: ReactNode;
}

/** Centered panel used for loading, empty and error states. */
function StatusMessage({
  title,
  description,
  role = 'status',
  action,
}: StatusMessageProps): JSX.Element {
  return (
    <div
      role={role}
      className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900"
    >
      <p className="text-sm font-semibold text-slate-900 dark:text-white">{title}</p>
      {description !== undefined && (
        <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p>
      )}
      {action}
    </div>
  );
}

export function LoadingState({ label = 'Loading…' }: { readonly label?: string }): JSX.Element {
  return <StatusMessage title={label} />;
}

interface EmptyStateProps {
  readonly title: string;
  readonly description?: string | undefined;
}

export function EmptyState({ title, description }: EmptyStateProps): JSX.Element {
  return <StatusMessage title={title} description={description} />;
}

interface ErrorStateProps {
  readonly message: string;
  readonly onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps): JSX.Element {
  return (
    <StatusMessage
      role="alert"
      title="Couldn't load data"
      description={message}
      action={
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Try again
        </button>
      }
    />
  );
}
