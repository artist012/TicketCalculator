const express = require("express");
const fetch = require("cross-fetch");
const bodyParser = require('body-parser');
const path = require("path")

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

console.log("Made By Hughes#1844")

app.get('/dolphin', async (req, res) => {
    res.render('ticket', {
        traffic: require("./public/json/law.json").traffic,
        felony: require("./public/json/law.json").felony,
        official: require("./public/json/law.json").official
    });
});

app.post('/finish', async (req, res) => {
    let fine = req.body.fine;
    let point = req.body.point;
    let deten = req.body.deten;
    let num = req.body.num;
    let bail = req.body.bail;

    if(num != "X") { // 돌핀때 뉴비 경고 횟수 조회하려 만든기능 
        fetch(`https://discord.com/api/v9/guilds/뉴비경고적어두는채널이있는길드아이디/messages/search?channel_id=채널아이디&content=${num}`, {
            headers: {
                "authorization": "" // 해당 섭에 들가있는 토큰(채널권한 있어야해요)
            }
        }).then((response) => response.json()).then((data) => {
            res.render('result', {
                fine: fine,
                point: point,
                deten: deten,
                num: num,
                bail: bail,
                data: data
            });
        });
    } else {
        res.render('result', {
            fine: fine,
            point: point,
            deten: deten,
            num: num,
            bail: bail,
            data: 'X'
        });
    }

});

app.listen(3000, () => console.log(`SERVER: http://localhost:3000/dolphin`));