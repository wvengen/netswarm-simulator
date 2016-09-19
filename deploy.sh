#!/bin/sh
#
# Deploy current website build to Github Pages
#

if [ ! -e build/index.html ]; then
  echo 'Please `npm run build` first!' 1>&2
  exit 1
fi

if [ ! -d build.git ]; then
  echo 'Git repository not found, please run the following commands first:'
  echo '  git clone git@github.com:wvengen/netswarm-simulator.git --branch gh-pages --single-branch build.git'
  exit 1
fi

# Make sure we have a clean remote repository
(cd build.git &&
  git fetch origin gh-pages && \
  git reset --hard && git clean -x -f && \
  git checkout -B gh-pages origin/gh-pages)

# Then update it from build result
(rm -Rf build.git/* && cd build.git && \
  cp -Rp ../build/* . && \
  git add -A && git commit -m 'Update' -a && \
git push origin gh-pages)
