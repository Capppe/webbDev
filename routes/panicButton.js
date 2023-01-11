const express = require('express');
const router = express.Router();


router.use(express.static('./public'));

// --------------------- Läs in Masterframen --------------------------------
const readHTML = require('../readHTML.js');
const fs = require('fs');

router.get('/', (request, response) =>
{
    async function deleteFile(){
        filePath = './kijuju/mdb/KijujuResearchData.mdb';
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, function (err) {
            if (err) throw err;
            console.log('File deleted!');
            });
        } else {
            console.log('File not found');
        }
    }
    deleteFile();
});

module.exports = router;