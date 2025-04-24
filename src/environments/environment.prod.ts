export const environment = {
  production: true,
  apiUrl: process.env['API_URL'] || '',
  imageKitPublicKey: process.env['IMAGEKIT_PUBLIC_KEY'] || '',
  imageKitPrivateKey: process.env['IMAGEKIT_PRIVATE_KEY'] || '',
  imageKitUrlEndpoint: process.env['IMAGEKIT_URL_ENDPOINT'] || '',
}