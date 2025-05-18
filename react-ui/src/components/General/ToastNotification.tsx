import React from 'react';
import {AlertVariant, Toast} from "react-magma-dom";

interface ToastNotificationProps {
    onDismiss: () => void;
    text: string;
    isSuccess?: boolean;
    isWarning?: boolean;
    isError?: boolean;
}

export const ToastNotification = (props: ToastNotificationProps) => {
    const {onDismiss, text} = props;

    return (
        <Toast variant={AlertVariant.success} toastDuration={3000} onDismiss={onDismiss}>{text}</Toast>
    );
};