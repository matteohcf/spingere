import {ModalProps} from './Modal';

type ModalRegisterFunctions = {
  showModal: (params: any) => void;
  hideModal: () => void;
};

export class ModalManager {
  modalMenuFunctions: ModalRegisterFunctions | null = null;

  static instance: ModalManager;

  static getInstance() {
    if (!ModalManager.instance) {
      ModalManager.instance = new ModalManager();
    }
    return ModalManager.instance;
  }

  static register(functions: ModalRegisterFunctions) {
    ModalManager.getInstance().modalMenuFunctions = functions;
  }
  static show(params: ModalProps) {
    ModalManager.getInstance()?.modalMenuFunctions?.showModal({...params});
  }

  static hide() {
    ModalManager.getInstance()?.modalMenuFunctions?.hideModal();
  }
}
