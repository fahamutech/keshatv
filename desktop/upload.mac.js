const bfast = require('bfast');
const pkg = require('./package.json');
const {createReadStream} = require("fs");
const {join} = require("path");

bfast.init({
  applicationId: 'keshatv',
  projectId: 'keshatv'
});
bfast.storage().save({
  filename: `keshatv-${pkg.version}.dmg`,
  pn: true,
  data: createReadStream(join(__dirname, 'dist', `keshatv-${pkg.version}.dmg`))
}, progress => {
  console.log(progress);
}).then(console.log).catch(reason => {
  console.error(reason);
  process.exit(-1)
});
