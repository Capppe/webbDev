const express = require('express');
const router = express.Router();
const logEvent = require('../modules/logEvent');

router.get('/', (request, response) =>
{
    async function archive()
    {
        const ADODB = require('node-adodb');
        const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=./kijuju/mdb/KijujuResearchData.mdb;');

        const isArchived = await connection.execute("SELECT objectStatus FROM researchobjects");

        if(isArchived[0] == "archived"){
            connection.execute("UPDATE researchobjects SET objectStatus = 'open'");
            logEvent("Unarchived research objects", "ResearchObject", request.session.employeeid);
        }
        else{
            // Skriv in i databasen
            await connection.execute("UPDATE researchobjects SET objectStatus = 'archived'");
            logEvent("Archived database", "ResearchObject", request.session.employeeid);
        }

        response.redirect("/api/virusdatabase");
        
    }
    archive();
});

module.exports = router;