export type ServiceWorkerLifecycleState =
  | 'installing'
  | 'installed'
  | 'activating'
  | 'activated'
  | 'redundant'
  | string;

export const SKIP_WAITING_MESSAGE = { type: 'SKIP_WAITING' } as const;

export function isPwaUpdateAvailable(input: {
  hasController: boolean;
  waiting: boolean;
  installingState?: ServiceWorkerLifecycleState | null;
}): boolean {
  if (!input.hasController) return false;
  if (input.waiting) return true;
  return (
    input.installingState === 'installed' ||
    input.installingState === 'activating' ||
    input.installingState === 'activated'
  );
}

export function shouldOfferUpdateAfterControllerChange(hadControllerBeforeChange: boolean): boolean {
  return hadControllerBeforeChange;
}
