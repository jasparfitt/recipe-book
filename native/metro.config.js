const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.startsWith('my-custom-resolver:')) {
    // Logic to resolve the module name to a file path...
    // NOTE: Throw an error if there is no resolution.
    return {
      filePath: 'path/to/file',
      type: 'sourceFile',
    };
  }

  // Ensure you call the default resolver.
  var a = context.resolveRequest(context, moduleName, platform);
  if (a.filePath?.endsWith('fast-png\\lib\\helpers\\text.js')) {
    a.filePath = __dirname+'\\overrides\\text.js'
  }
  return a;
};

module.exports = config;