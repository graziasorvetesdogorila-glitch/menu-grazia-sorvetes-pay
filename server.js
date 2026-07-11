const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Rota de teste para ver se o servidor está online
app.get('/', (req, res) => {
    res.send('Servidor Grazia Sorvetes Online!');
});

// Rota que recebe o pedido do seu site
app.post('/pagar', async (req, res) => {
    console.log("Pedido recebido:", req.body);
    
    // Por enquanto, retorna um link fixo para teste
    // Quando tiver a API da InfinityPay, vamos alterar esta parte
    res.json({ checkoutUrl: "https://checkout.infinypay.com.br/exemplo" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
