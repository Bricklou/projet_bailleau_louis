interface HttpException {
  name: string;
  message: string;
  status: number;
}

export function isInvalidCredentialsException(
  error: unknown,
): error is HttpException {
  return (
    !!error &&
    typeof error === 'object' &&
    'name' in error &&
    error.name === 'InvalidCredentialsException'
  );
}
