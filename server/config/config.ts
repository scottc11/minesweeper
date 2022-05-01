
const databaseName: string = process.env.DB_NAME || "minesweeper-dev";

const databasePassword = process.env.DB_PASSWORD || "Qz6C60QQ7a5H268s";

export const mongoURI = `mongodb+srv://admin:${databasePassword}@cluster0.fr8n7.mongodb.net/${databaseName}?retryWrites=true&w=majority`;