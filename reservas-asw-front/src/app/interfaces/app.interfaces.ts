export interface ToastProperty {
    summary: string;
    detail: string;
}

export enum ToastSeverity {
    success = 'success',
    info = 'info',
    warn = 'warn',
    error = 'error',
}

export interface ConfirmDialogProperty {
    message: string;
    header: string;
}