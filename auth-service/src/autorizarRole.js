
function autorizarRole(rolesPermitidos) {
  return (req, res, next) => {
    if (!req.usuario || !rolesPermitidos.includes(req.usuario.role)) {
      return res.status(403).json({ erro: 'Permissão negada' });
    }
    next();
  };
}
module.exports = autorizarRole;
