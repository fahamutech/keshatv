const mainPackage = require('./package.json');
const desktopPackage = require('./desktop/package.json');
const {writeFileSync} = require('fs');
const {join} = require('path');
desktopPackage.version = mainPackage.version;
writeFileSync(join(__dirname, './desktop/package.json'), JSON.stringify(desktopPackage, null, 2));