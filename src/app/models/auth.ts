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
 * Representa la solicitud de inicio de sesión de un usuario.
 *
 * @property email - Correo electrónico del usuario.
 * @property password - Contraseña del usuario.
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Representa la respuesta de autenticación de un usuario.
 *
 * @property {string | Date} createdAt - Fecha de creación del usuario.
 * @property {string} displayName - Nombre visible del usuario.
 * @property {string} email - Correo electrónico del usuario.
 * @property {string | Date} updatedAt - Fecha de última actualización del usuario.
 * @property {string} username - Nombre de usuario único.
 * @property {string} [img] - URL de la imagen de perfil del usuario (opcional).
 * @property {string} _id - Identificador único del usuario.
 * @property {number} __v - Versión del documento (usado por MongoDB).
 */
export interface AuthResponse {
  createdAt: string | Date;
  displayName: string;
  email: string;
  updatedAt: string | Date;
  username: string;
  img?: string;
  _id: string;
  __v: number;
}

/**
 * Representa la respuesta del perfil de un usuario.
 *
 * @property {_id} string - Identificador único del usuario.
 * @property {displayName} string - Nombre visible del usuario.
 * @property {username} string - Nombre de usuario.
 * @property {email} string - Correo electrónico del usuario.
 * @property {createdAt} Date | string - Fecha de creación del usuario.
 * @property {updatedAt} Date | string - Fecha de última actualización del usuario.
 * @property {followerCount} number - Cantidad de seguidores del usuario.
 * @property {followingCount} number - Cantidad de usuarios a los que sigue.
 * @property {isFollowing} boolean - Indica si el usuario actual sigue a este usuario.
 * @property {__v} number - Versión del documento (usado por MongoDB).
 */
export interface ProfileUserResponse {
  _id: string;
  displayName: string;
  username: string;
  email: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  followerCount: number;
  followingCount: number;
  isFollowing: boolean;
  __v: number;
}
