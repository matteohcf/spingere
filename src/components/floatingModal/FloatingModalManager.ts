type ModalRegisterFunctions = {
  showModal: (params: any) => void;
};

export class FloatingModalManager {
  modalMenuFunctions: ModalRegisterFunctions | null = null;

  static instance: FloatingModalManager;

  static getInstance() {
    if (!FloatingModalManager.instance) {
      FloatingModalManager.instance = new FloatingModalManager();
    }
    return FloatingModalManager.instance;
  }

  static register(functions: ModalRegisterFunctions) {
    FloatingModalManager.getInstance().modalMenuFunctions = functions;
  }
  static async show(params: any) {
    FloatingModalManager.getInstance()?.modalMenuFunctions?.showModal({ ...params });
  }
}
