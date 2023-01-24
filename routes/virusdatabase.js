const express = require('express');
const readHTML = require('../readHTML.js');
const router = express.Router();
const pug = require('pug');

router.use(express.json());
router.use(express.static('./public'));

var htmlHead = readHTML('./masterframe/head.html');
var htmlHeader = readHTML('./masterframe/header.html');
var htmlMenu = readHTML('./masterframe/menu.html');
var htmlInfoStart = readHTML('./masterframe/infoStart.html');
var htmlInfoStop = readHTML('./masterframe/infoStop.html');
var htmlFooter = readHTML('./masterframe/footer.html');
var htmlBottom = readHTML('./masterframe/bottom.html');

var button = readHTML('./public/text/button.html');
var panicButton = readHTML('./public/text/panicButton.html');

var htmlLoggedinMenuCSS = readHTML('./masterframe/loggedinmenu_css.html');
var htmlLoggedinMenuJS = readHTML('./masterframe/loggedinmenu_js.html');
const pug_loggedinmenu = pug.compileFile('./masterframe/loggedinmenu.html');


router.get('/', function(request, response)
{
    response.setHeader('Content-type','text/html');
    response.write(htmlHead);
    response.write(htmlHeader);
    response.write(htmlMenu);
    response.write(htmlInfoStart);
    
    if(!request.session.loggedin)
    {
        response.write("Not logged in!");
    }
    else if(request.session.securityAccessLevel != "C"){
        response.write("Wrong Security Access Level!");
    }
    else if(!request.session.connection){
        response.write("Not connected to Kijuju!");
    }
    else{
        response.write(button);
        response.write(panicButton);

        response.write(htmlLoggedinMenuCSS);
        response.write(htmlLoggedinMenuJS);
        response.write(pug_loggedinmenu({
            employeecode: request.cookies.employeecode,
            name: request.cookies.name,
            logintimes: request.cookies.logintimes,
            lastlogin: request.cookies.lastlogin,
        }));
    }
    
    response.write(htmlInfoStop);
    response.write(htmlFooter);
    response.write(htmlBottom);
        
    response.end();
});

module.exports = router;