import React from 'react';
import {AlertVariant, Toast} from "react-magma-dom";

interface ToastNotificationProps {
    onDismiss: () => void;
    text: string;
    toastVariant?: AlertVariant;
}

export const ToastNotification = (props: ToastNotificationProps) => {
    const {onDismiss, text, toastVariant} = props;

    return (
        <Toast variant={toastVariant} toastDuration={3000} onDismiss={onDismiss}>{text}</Toast>
    );
};