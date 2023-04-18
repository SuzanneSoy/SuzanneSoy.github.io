#!/usr/bin/env bash

set -euET -o pipefail

echo "Hashing repository contents with IPFS..."

h="$(ipfs cid base32 "$(ipfs add --recursive --progress --hidden --ignore-rules-path=.ipfsignore --quieter .)")"

echo "After pinning, the new homepage URL will be: https://$h.ipfs.dweb.link/"

# Wait for IPFS daemon to be ready
echo 'Starting IPFS daemon...'
tail -F /tmp/ipfs-daemon.logs -n +1 & pid=$!
ipfs daemon >/tmp/ipfs-daemon.logs 2>&1 &
while ! grep 'Daemon is ready' /tmp/ipfs-daemon.logs; do sleep 1; date; done
echo 'IPFS daemon started, killing log tail...'
kill "$pid"
echo 'log tail killed'

# Pin this hash
echo "Adding remote pinning service..."
(
  ipfs pin remote service add my-remote-pin "$IPFS_REMOTE_API_ENDPOINT" "$IPFS_REMOTE_TOKEN"
) > /dev/null 2>&1

echo "Connecting to some IPFS node..."
(
  ipfs swarm connect "$IPFS_SWARM_CONNECT_TO"
) > /dev/null 2>&1

echo "Pinning $h on the remote service..."
(
  ipfs pin remote add --service=my-remote-pin --name='site-suzanne.soy-'"$GITHUB_SHA" "$h"
) > /dev/null 2>&1
echo "Finished pinning $h on the remote service"

# Update Homepage URL on GitHub
curl -L \
  -X PATCH \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $API_TOKEN_FOR_UPDATE_HOMEPAGE"\
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/SuzanneSoy/SuzanneSoy.github.io \
  -d '{"name":"SuzanneSoy.github.io", "homepage":"https://dweb.link/ipfs/'"$h"'"}' > /dev/null
