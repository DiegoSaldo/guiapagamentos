const express = require("express");
const MercadoPago = require("mercadopago");
const app = express();

MercadoPago.configure({
    sandbox: true, //true está em desenvolvimento, false em produção
    access_token: "TEST-6880637471008050-050813-a8b8dec015c5a875d4524e8b6c92547e-189403757"
})

app.get("/", (req, res) => {
    res.send("Olá mundo!");
})

app.get("/pagar", async (req, res) => {  
    
    var id = "" + Date.now();
    var emailDoPagador = "maradona@argentin.ar"

    var dados = {
        items: [
            item = {
                id: id,
                title: " 2x video games; 3x camisas",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(150)
            }
        ],
        payer: {
            email: emailDoPagador,
        },
        external_reference: id
    }

    try {

        var pagamento = await MercadoPago.preferences.create(dados);
        console.log(pagamento);
        return res.redirect(pagamento.body.init_point);

    }catch(err) {
        return res.send(err.message);
    }   
});

app.listen(3000,(req, res) => {

    console.log("Servidor rodando!");
})


