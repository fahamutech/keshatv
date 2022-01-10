node desktop-version.js
cd desktop || return
npm install
npm run build:snap
snapcraft upload --release=stable,edge,beta dist/keshatv_"${PACKAGE_VERSION}"_amd64.snap