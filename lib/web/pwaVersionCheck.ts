export function isRemoteVersionNewer(runningVersion: string, remoteVersion: string | null): boolean {
  if (!remoteVersion) return false;
  return remoteVersion !== runningVersion;
}

export function shouldReportUpdateAvailable(input: {
  runningVersion: string;
  remoteVersion: string | null;
  swUpdateDetected: boolean;
}): boolean {
  if (input.swUpdateDetected) return true;
  return isRemoteVersionNewer(input.runningVersion, input.remoteVersion);
}
