import { HttpErrorResponse } from '@angular/common/http';

export function isInvalidCredentialsException(
  error: HttpErrorResponse,
): boolean {
  return error.status === 401;
}

interface ValidationRuleException {
  field: string;
  message: string;
  rule: string;
}

interface InvalidFieldException {
  errors: ValidationRuleException[];
}

export function isInvalidFieldException(
  error: unknown,
): error is InvalidFieldException {
  return !!error && typeof error === 'object' && 'errors' in error;
}
