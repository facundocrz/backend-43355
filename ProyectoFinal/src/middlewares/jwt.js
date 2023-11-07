import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;
const secretKey = 'a_very_secret_key';


function generateToken(payload) {
  return sign(payload, secretKey, { expiresIn: '1h' });
}


function verifyToken(token) {
  try {
    const decoded = verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
}

export { generateToken, verifyToken };