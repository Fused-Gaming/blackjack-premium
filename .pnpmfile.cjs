function readPackage(pkg, context) {
  // Force ip-address to use non-vulnerable version
  if (pkg.name === 'express-rate-limit') {
    if (!pkg.dependencies) {
      pkg.dependencies = {};
    }
    // Override to a patched version that's compatible
    pkg.dependencies['ip-address'] = '>=10.1.1';
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
}
