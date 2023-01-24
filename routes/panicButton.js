const express = require('express');
const router = express.Router();

router.use(express.static('./public'));

// --------------------- Läs in Masterframen --------------------------------
const readHTML = require('../readHTML.js');
const fs = require('fs');

var prompt = readHTML('./public/text/prompt.html');

router.get('/', (request, response) =>
{
    var password = request.query.panicPass;
    var securityCode = request.query.panicCode;
    var employeeid = request.cookies.employeecode;

    const ADODB = require('node-adodb');
    const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=./data/mdb/personnelregistry.mdb;');

    async function deleteFile(){
        const result = await connection.query("SELECT passwd FROM users WHERE employeeCode='"+employeeid+"'");

        var strPass = result[0]['passwd'];

        console.log(password);
        console.log(securityCode);
        console.log(strPass);

        if(strPass != password && securityCode != 1234){
            response.send("Wrong password or security code!");
        }
        else{
            filePath = './kijuju/mdb/KijujuResearchData.mdb';
            filePath2 = './kijuju/objectFiles'
            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, function (err) {
                if (err) throw err;
                console.log('File deleted!');
                });
            } else {
                console.log('File not found');
            }

            if (fs.existsSync(filePath2)) {
                fs.rm(filePath2, { recursive:true, force:true }, function (err) {
                if (err) throw err;
                console.log('Folder deleted!');
                });
            } else {
                console.log('Folder not found');
            }
            response.redirect("/api/virusdatabase");
        }
    }
    deleteFile();
});

module.exports = router;