function readPackage(pkg, context) {
  // Override ip-address to use patched version
  if (pkg.name === 'express-rate-limit' && pkg.version === '8.4.1') {
    pkg.dependencies['ip-address'] = '10.1.1';
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
}
