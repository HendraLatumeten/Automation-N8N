FROM n8nio/n8n:latest

USER root

COPY package.json /home/node/.n8n/
RUN cd /home/node/.n8n && npm install

USER node
