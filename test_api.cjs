const github = require('./src/api/routes/githubConnection.cjs'); // ajuste o caminho
require('dotenv').config();

async function test() {
    try {
        console.log("Chamando GitHub...");
        const res = await github.get(`/repos/${process.env.GITHUB_USERNAME}/Wefood/contributors`);
        console.log("SUCESSO! Contribuidores encontrados:", res.data.length);
    } catch (e) {
        console.error("ERRO:", e.message);
    }
}
test();