OBSIDIAN_VERSION="1.7.7"
wget -O obsidian.deb "https://github.com/obsidianmd/obsidian-releases/releases/download/v${OBSIDIAN_VERSION}/obsidian_${OBSIDIAN_VERSION}_amd64.deb"
dpkg -i obsidian.deb
rm obsidian.deb
chown -R node ~/TestVault
npm ci

