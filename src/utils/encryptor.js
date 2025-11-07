// encryptor.js (client-side)
import forge from 'node-forge';

export function encryptRequest(data, publicKeyPem) {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const encrypted = publicKey.encrypt(JSON.stringify(data), 'RSA-OAEP', {
    md: forge.md.sha256.create(),
  });
  return forge.util.encode64(encrypted);
}
