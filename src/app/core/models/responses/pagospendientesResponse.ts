/* eslint-disable @typescript-eslint/naming-convention */
export interface PagosPendientesResponse {
  idPersona: string;
  numeroMigrado: string;
  nombre: string;
  domicilio: string;
  telefono: string;
  geoReferencia: string;
  idPrestamo: string;
  saldoCapital: string;
  interesNormal: string;
  interesMoratorio: string;
  iva: string;
  saldoCapitalTotal: string;
  observaciones;
}
