import { ToastOptions } from '@ionic/angular';

export const loginErrorOption: ToastOptions = {
  animated: true,
  duration: 4000,
  color: 'danger',
  message: 'Credenciales no validas, intente de nuevo',
};

export const transactionErrorOption: ToastOptions = {
  animated: true,
  duration: 5000,
  color: 'danger',
  message: 'Error al aplicar operacion, intente más tarde por favor',
};

export const steperSelectCustomerToTransfer: ToastOptions = {
  duration: 2000,
  color: 'warning',
  animated: true,
  message: 'Selecciona cuenta de destino',
  buttons: ['Ok']
};

export const steperSelectCustomerToTransferCustomer: ToastOptions = {
  duration: 2000,
  color: 'warning',
  animated: true,
  message: 'Selecciona un socio o crea uno nuevo',
  buttons: ['Ok']
};

export const transactionOkOption = (folio) => {
  const value: ToastOptions = {
    animated: true,
    duration: 5000,
    color: 'success',
    message: `Correcto, su folio es ${folio}`,
  };
  return value;
};
