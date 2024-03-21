const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const isUser = async (request, h) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return h.response({
      error: true,
      mensagem: 'Need token'
    }).code(400).takeover();
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    return h.response({
      error: true,
      mensagem: 'Problem with the token'
    }).code(400).takeover();
  }

  try {
    const decoded = await promisify(jwt.verify)(token, "wHp61kz8n5Dasdfaijkad5FoNwqCyU1ngqWRP99EbGaGy");
    request.auth.credentials = { userId: decoded.id };
    return h.continue;
  } catch (err) {
    return h.response({
      error: true,
      mensagem: 'Invalid token'
    }).code(400).takeover();
  }
};

module.exports = { isUser };
