# Usa imagem base do Node
FROM node:18

# Define diretório de trabalho
WORKDIR /app

# Copia arquivos
COPY package*.json ./
RUN npm install
COPY . .

# Expõe porta
EXPOSE 3002

# Comando padrão
CMD ["npm", "start"]

