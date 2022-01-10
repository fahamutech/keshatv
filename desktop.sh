#rm -r desktop/smartstock
#rm -r desktop/dist
#cp -r dist/smartstock desktop
node desktop-version.js
cd desktop || return
npm install
npm run build:snap
snapcraft upload --release=stable,edge,beta dist/smartstock_${PACKAGE_VERSION}_amd64.snap