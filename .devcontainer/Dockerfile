FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bullseye

ARG OBSIDIAN_VERSION=1.7.7

# Download and install Obsidian
RUN wget -O obsidian.deb "https://github.com/obsidianmd/obsidian-releases/releases/download/v${OBSIDIAN_VERSION}/obsidian_${OBSIDIAN_VERSION}_amd64.deb" && \
    dpkg -i obsidian.deb
