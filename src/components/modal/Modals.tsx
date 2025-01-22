import { PropsWithChildren } from 'react';
import { ModalManager } from './ModalManager';
import { LocationModal } from './LocationModal';
import {SelectModal, SelectModalProps} from "./SelectModal.tsx";
import {SelectModalMultiple, SelectModalMultipleProps} from "./SelectModalMultiple.tsx";

export const showBottomModal = ({ dismissable = true, children }: PropsWithChildren & { dismissable?: boolean }) => {
  ModalManager.show({
    children,
    dismissable,
    bottomSheetModalProps: {
      enableDynamicSizing: true,
      index: 0,
    },
  });
};

export const showLocationModal = ({ ...showLocationModalProps }) => {
  ModalManager.show({
    children: <LocationModal {...showLocationModalProps} />,
    dismissable: true,
    bottomSheetModalProps: {
      enableDynamicSizing: true,
      index: 0,
    },
  });
};

export const showSelectModal = ({ ...showSelectModalProps }: SelectModalProps) => {
  ModalManager.show({
    children: <SelectModal {...showSelectModalProps} />,
    dismissable: true,
    bottomSheetModalProps: {
      enableContentPanningGesture: false,
      enableDynamicSizing: true,
      index: 0,
    },
  });
};

export const showSelectModalMultiple = ({ ...showSelectModalMultipleProps }: SelectModalMultipleProps) => {
  ModalManager.show({
    children: <SelectModalMultiple {...showSelectModalMultipleProps} />,
    dismissable: true,
    bottomSheetModalProps: {
      enableDynamicSizing: true,
      enableContentPanningGesture: false,
      index: 0,
    },
  });
};

export const showModal = {};
