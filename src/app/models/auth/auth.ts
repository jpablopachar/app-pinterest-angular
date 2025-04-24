/**
 * Representa la solicitud de registro de un nuevo usuario.
 *
 * @property displayName - Nombre visible del usuario.
 * @property email - Correo electrónico del usuario.
 * @property password - Contraseña elegida por el usuario.
 * @property username - Nombre de usuario único.
 */
export interface RegisterRequest {
  displayName: string;
  email: string;
  password: string;
  username: string;
}

/**
 * Representa la respuesta de autenticación de un usuario.
 *
 * @property {string | Date} createdAt - Fecha de creación del usuario.
 * @property {string} displayName - Nombre visible del usuario.
 * @property {string} email - Correo electrónico del usuario.
 * @property {string | Date} updatedAt - Fecha de última actualización del usuario.
 * @property {string} username - Nombre de usuario único.
 * @property {string} _id - Identificador único del usuario.
 * @property {number} __v - Versión del documento (usado por MongoDB).
 */
export interface AuthResponse {
  createdAt: string | Date;
  displayName: string;
  email: string;
  updatedAt: string | Date;
  username: string;
  _id: string;
  __v: number;
}
