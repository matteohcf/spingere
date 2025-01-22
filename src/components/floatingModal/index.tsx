import React from 'react';
import { AlertModal, AlertModalProps } from './AlertModal';
import { FloatingModalManager } from './FloatingModalManager';
import { AlertSiteModal, AlertSiteModalProps } from './AlertSiteModal';

export const showAlertModal = ({
  dismissable = true,
  ...props
}: AlertModalProps & { dismissable?: boolean }) => {
  FloatingModalManager.show({
    children: <AlertModal {...props} />,
    dismissable: dismissable,
  });
};

export const showAlertSiteModal = ({
  dismissable = true,
  ...props
}: AlertSiteModalProps & { dismissable?: boolean }) => {
  FloatingModalManager.show({
    children: <AlertSiteModal {...props} />,
    dismissable: dismissable,
  });
};
