// ==UserScript==
// @name         EZTHEME v2 Pro (No Auth)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Easily make a custom shell shockers theme
// @author       Jayvan
// @match        https://shellshock.io/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shellshock.io
// @grant        none
// ==/UserScript==

function EZTheme () {
    //EZDefault
    let stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'https://ThemeAddons.jayvanv.repl.co/ez.css';
    document.head.appendChild(stylesheet);

    let ssbg = document.getElementById('ss_background');

    //Create Menu
    let menu = document.createElement("div");
    menu.id = "menu";
    let menu2 = document.createElement("div");
    menu2.id = "menu2";
    menu.classList.add("menu");
    menu2.classList.add("menu");
    let closeMenu = document.createElement("div");
    let closeMenu2 = document.createElement("div");
    closeMenu.id = 'closeMenu';
    closeMenu2.id = 'closeMenu2';
    menu.innerHTML = "<h1>EZTheme 2.0 Pro</h1><p>Enter values in the text boxes to make an EZ Theme!</p>";
    menu2.innerHTML = "<h1>EZTheme 2.0 Pro Panel</h1><p>Control Panel for EZTheme Pro</p><h3>Progress</h3><table><tr><td><button id='saveTheme'>Save Progress</button></td><td><button id='loadTheme'>Load Progress</button></td></tr></table><h3>Import Theme</h3><textarea id='importThemeText' style='width:100%; height: 100px;'>Paste Tampermonkey Script</textarea><table><tbody><tr><td><select id='importThemeSelect'><option value='1'>Slot 1</option><option value='2'>Slot 2</option><option value='3'>Slot 3</option><option value='4'>Slot 4</option><option value='5'>Slot 5</option></select></td><td><button id='import'>Import</button></td><td><button id='load'>Load</button></td></tr></tbody></table>";
    ssbg.appendChild(menu);
    ssbg.appendChild(menu2);
    ssbg.appendChild(closeMenu);
    ssbg.appendChild(closeMenu2);
    let menucss =".menu select {background: #7e7e7ec2;color: white;border: 2px solid black;border-radius: 5px;padding: 5px;width: 80%;} .menu button {background: #87878794;border: 2px solid black;border-radius: 5px;padding: 5px;color: white;width: 80%;} .menu {overflow-x: hidden;}.menu table {width: 300px;text-align: center;}.menu table td {border-bottom: 1px solid white;}.menu table:nth-of-type(1) {border-top: 1px solid white;}.menu table td:nth-of-type(odd) {width: 70px !important;}.menu table td:nth-of-type(even) {width: 20px}.menu input {width: 200px !important;float: left;}#closeMenu2 { z-index: 2147483647; position: absolute; top: 0; left: 320px; width: 15px; height: 15px; border: 3px solid rgba(34,34,34,0.5); background: rgba(0, 0, 0, 0.95);} #closeMenu { z-index: 2147483647; position: absolute; top: 0; left: 0; width: 15px; height: 15px; border: 3px solid rgba(34,34,34,0.5); background: rgba(0, 0, 0, 0.95);} .menu p {color: white !important;} .menu h3, .menu h1 { color: white !important; } #menu {top: 0px; left: 0px;} #menu2 {top: 0px; left: 320px;} .menu {border: 2px solid black; background: rgba(34, 34, 34, 0.9); width: 300px; height: 500px; z-index: 10000000; position: absolute; overflow-y:scroll; text-align: center; margin: 0; color: white; } .menu h1 { color: white; } input::placeholder {color:black;} .menu input {border: 1px solid black; margin: 2px;}.menu input {width: 150px;border-radius: 5px;padding: 5px;background: #8080808f;color: white;}::webkit-scrollbar-track {background: transparent !important;}::-webkit-scrollbar-track {border-radius: 10px;background-color: rgba(0, 0, 0, 0);}::-webkit-scrollbar {width: 12px;background-color: rgba(0, 0, 0, 0);}::-webkit-scrollbar-thumb {border-radius: 10px;background-color: rgba(33, 37, 41, 0);}";
    document.head.insertAdjacentHTML("beforeend", `<style>${menucss}</style>`);

    //Hide/Show Menu
    let key = "ShiftRight";
    let menuHidden = false, menuHidden2 = false;
    function hideMenu() {
        menu.style.display = "none";
        menuHidden = true;
        console.log('Menu Hidden');
    }
    function showMenu() {
        menu.style.display = "initial";
        menuHidden = false;
        console.log('Menu Shown');
    }
    function hideMenu2() {
        menu2.style.display = "none";
        menuHidden2 = true;
        console.log('Menu Hidden');
    }
    function showMenu2() {
        menu2.style.display = "initial";
        menuHidden2 = false;
        console.log('Menu Shown');
    }
    document.addEventListener('keydown', function(event) {
        if (event.code == key) {
            menuHidden ? showMenu() : hideMenu();
            menuHidden2 ? showMenu2() : hideMenu2();
        }
    });
    closeMenu.addEventListener('click', function() {
        menuHidden ? showMenu() : hideMenu();
    });
    closeMenu2.addEventListener('click', function() {
        menuHidden2 ? showMenu2() : hideMenu2();
    });

    let info = {
        totalElements: 0
    }
    let choice = {
        hex: [],
        noBg: []
    }

    function appendTitle (title) {
        let element = document.createElement("h3");
        element.innerHTML = title;
        menu.appendChild(element);
    }

    function appendOption (title, inputs, preSet) {
        if (preSet == null) {
            preSet = "";
        }
        let element = document.createElement("p");
        element.innerHTML = title;
        menu.appendChild(element);

        inputs.forEach(function(input) {
            let c1 = document.createElement('table');
            c1.innerHTML = `<table><tr><td><p>${input}</p></td><td><input id="${'select'+info.totalElements}"></td></tr></table>`;
            menu.appendChild(c1);
            document.getElementById('select'+info.totalElements).value = preSet;

            info.totalElements++;
        });
    }

    function getInputs (num) {
        for (let i = 0; i < num; i++) {
            let value = document.getElementById("select" + i).value;
            if (value.includes("http")) {
                choice.hex[i] = `url("${value}") center center no-repeat;background-size:cover`;
            }
            else {
                choice.hex[i] = value;
            }
            choice.noBg[i] = value;
        }
    }

    function setInputs () {
        if (document.getElementById("themeStyle")) {
            document.getElementById("themeStyle").remove();
        }
        let style = `
    h1, h2, h3, h4, h5, h6, .text_blue3, .text_blue5, .text_blue6 {
    color: ${choice.hex[0]} !important;
    }
    .text_blue8, .text_blue, .text_blue1 {
    color: ${choice.hex[1]} !important;
    }
    p {
    color: ${choice.hex[2]} !important;
    }
    .ss_button_as_text {
	color: ${choice.hex[2]} !important;
    }
    #ss_background, #gameDescription {
    background: ${choice.hex[15]} center center no-repeat;
    background-size: cover;
    }
    .media-tab-container {
    background: ${choice.hex[17]};
    }
    .media-tab-container .text_white {
    color: ${choice.hex[19]} !important;
    }
    .tab-content .media-item:nth-child(odd) {
    background: ${choice.hex[30]};
    }
    .tab-content .media-item:nth-child(even) {
    background: ${choice.hex[21]};
    }
    .media-item {
	border-color: ${choice.hex[23]} !important;
    }
    .tab-content {
    background: ${choice.hex[22]};
    }
    .secondary-aside-wrap .media-tabs-wrapper, #joinPrivateGamePopup {
    background: ${choice.hex[22]};
    border-color: ${choice.hex[18]} !important;
    }
    .inner-wrapper {
	background: ${choice.hex[22]} !important;
    }
    .btn_green, .btn_red, .btn_yolk, .ico_itemtype {
	background: ${choice.hex[3]};
	color: ${choice.hex[5]};
	border-color: ${choice.hex[4]};
    box-shadow: 4px 4px ${choice.hex[64]} !important;
    text-shadow: 2px 2px ${choice.hex[65]} !important;
    }
    .btn_green:hover, .btn_red:hover, .btn_yolk:hover, .ico_itemtype:hover {
	background: ${choice.hex[6]} !important;
	color: ${choice.hex[8]} !important;
	border-color: ${choice.hex[7]} !important;
    }
    .btn_blue, .btn_blue_light, .btn_game_mode , .bevel_twitch, #joinPrivateGamePopup .ss_button, .option-box {
	background: ${choice.hex[9]};
	color: ${choice.hex[11]};
	border-color: ${choice.hex[10]};
    box-shadow: 4px 4px ${choice.hex[66]} !important;
    text-shadow: 2px 2px ${choice.hex[67]} !important;
    }
    .btn_blue:hover, .btn_blue_light:hover, .btn_game_mode:hover , .bevel_twitch:hover, #joinPrivateGamePopup:hover .ss_button:hover, .option-box:hover {
	background: ${choice.hex[12]};
	color: ${choice.hex[14]};
	border-color: ${choice.hex[13]};
    }
    .ss_field, .ss_select {
	border-color: ${choice.hex[25]};
	background: ${choice.hex[24]};
	color: ${choice.hex[26]};
    }
    .main-nav-item-bg {
	fill: ${choice.hex[27]} !important;
	stroke: ${choice.hex[28]};
    }
    .main-menu-button, .menu-icon {
	color: ${choice.hex[29]} !important;
	fill: ${choice.hex[29]} !important;
    }
    .weapon_img {
	background: ${choice.hex[30]};
	border-color: ${choice.hex[31]};
    }
    :root {
    --ss-lightoverlay: ${choice.hex[15]};
    }
    .profile-page-content .bg_blue3 {
	background: ${choice.hex[33]};
    }
    #joinPrivateGamePopup {
	background: ${choice.hex[33]};
    }
    .profile-page-content {
	background: ${choice.hex[34]};
	border-color: ${choice.hex[35]};
    }
    .bg_blue2 {
	background: ${choice.hex[36]};
    }
    .stat-wrapper .stat:nth-child(even) > div {
	background: ${choice.hex[38]} !important;
    }
    .stat-wrapper .stat:nth-child(odd) > div {
	background: ${choice.hex[37]} !important;
    }
    .stat-grid-main-header {
	border-color: ${choice.hex[39]};
    }
    .egg-color-select {
	background: ${choice.hex[40]};
	border-color: ${choice.hex[41]};
    }
    #equip_panel_right #equip_grid .grid-item, #limited-un-vaulted .grid-item {
	background: ${choice.hex[42]} !important;
	border-color: ${choice.hex[43]} !important;
    }
    .egg_count {
	color: ${choice.hex[44]};
    }
    .ss_bigtab  {
	background: ${choice.hex[45]} !important;
	border-color: ${choice.hex[46]};
	color: ${choice.hex[47]} !important;
    }
    .pause-bg, .popup_lg, .popup_sm {
	background: ${choice.hex[48]};
	border-color: ${choice.hex[49]};
    }
    .pause-ui-element, #inGameUI {
	background:  ${choice.hex[50]} !important;
	border-color:  ${choice.hex[51]} !important;
    }
    .gameCanvas {
	border-color: ${choice.hex[52]} !important;
    }
    #maskMiddle {
    background: ${choice.hex[53]} center center no-repeat !important;
    }
    /*.crosshair.normal {
    background: ${choice.hex[54]} !important;
    border-color: ${choice.hex[55]} !important;
    }*/
    #crosshair2.normal {
	background: ${choice.hex[54]} !important;
    border-color: ${choice.hex[55]} !important;
    }
    #crosshair1.normal {
	background: ${choice.hex[56]} !important;
    border-color: ${choice.hex[57]} !important;
    }
    #crosshair0.normal {
	background: ${choice.hex[58]} !important;
    border-color: ${choice.hex[59]} !important;
    }
    #crosshair3.normal {
	background: ${choice.hex[60]} !important;
    border-color: ${choice.hex[61]} !important;
    }
    .crosshair.powerful {
    background: ${choice.hex[62]} !important;
    border-color: ${choice.hex[63]} !important;
    }
    #logo {
	height: 100px;
	background: ${choice.hex[16]} center center no-repeat;
	background-size: contain;
    }
    .home-screen-logo {
	display: none;
    }
    .egg_icon {
	visibility: hidden;
    }
    #account_top .account_eggs .box_relative:nth-of-type(1) {
	background: ${choice.hex[32]} center center no-repeat;
	background-size: contain;
	margin-right: 5px;
    }
    #best_streak_container h1 {
    background: ${choice.hex[68]} center center no-repeat !important;
    background-size: contain;
    padding-left: 1.75em;
    }
    #ammo {
    background: ${choice.hex[69]} center center no-repeat !important;
    background-size: contain;
    }
    #healthContainer {
	background: ${choice.hex[70]};
    }
    .healthBar {
	stroke: ${choice.hex[71]};
    }
    .healthYolk {
	fill: ${choice.hex[72]};
    }
    #healthHp {
	color: ${choice.hex[73]};
    }
    .playerSlot-player-is-me {
	background: ${choice.hex[74]} !important;
	color: ${choice.hex[75]} !important;
    }
    .playerSlot-them {
	background: ${choice.hex[76]};
	color: ${choice.hex[77]};
    }
    .playerSlot-them-blue {
	background: ${choice.hex[78]};
	color: ${choice.hex[79]};
    }
    .playerSlot-them-red {
	background: ${choice.hex[80]};
	color: ${choice.hex[81]};
    }
    `;
        document.head.insertAdjacentHTML("beforeend", `<style id="themeStyle">${style}</style>`);

        return style;
    }

    function generateScript() {
        let CSS = setInputs();
        let themeReturn =
            `// ==UserScript==
// @name         My Theme
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  My Custom Shell Shockers Theme
// @author       You, EZTheme by Jayvan
// @match        https://shellshock.io/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shellshock.io
// @grant        none
// ==/UserScript==

//EZDefault
let stylesheet = document.createElement('link');
stylesheet.rel = 'stylesheet';
stylesheet.href = 'https://ThemeAddons.jayvanv.repl.co/ez.css';
document.head.appendChild(stylesheet);

document.head.insertAdjacentHTML("beforeend", \`<style>${CSS}</style>\`);
`;
        return themeReturn;
    }

    //Generic Content

    appendTitle("All Pages Content");

    //ID: 0
    appendOption("Titles", ["Color"]);
    appendOption("Titles 2", ["Color"]);
    appendOption("Text", ["Color"]);
    appendOption("Button Group 1", ["Background", "Border", "Text"]);
    appendOption("Button Group 1 Hover", ["Background", "Border", "Text"]);
    appendOption("Button Group 2", ["Background", "Border", "Text"]);
    appendOption("Button Group 2 Hover", ["Background", "Border", "Text"]);

    //Home Screen (15)

    appendTitle("Home Screen");

    appendOption("Background", ["Background"]);
    appendOption("Logo", ["Background"], "https://shellshock.io/img/logo.svg");
    appendOption("Media Tab", ["Background", "Border", "Title", "Odd Element Background", "Even Element Background", "Lower Background", "Even/Odd Element Border"]);
    appendOption("Name", ["Background", "Border", "Text"]);
    appendOption("Menu Buttons", ["Background", "Border", "Text"]);
    appendOption("Weapon Select", ["Background", "Border"]);
    appendOption("Egg Icon", ["Background"], "https://shellshock.io/img/ico_goldenEgg.png");

    appendTitle("Profile Screen");
    appendOption("Stats Box", ["Background Upper", "Background Lower", "Border", "Inner Background", "Stat Odd", "Stat Even", "Lines"]);

    appendTitle("Inventory Screen");
    appendOption("Egg Color Select", ["Background", "Border"]);
    appendOption("Weapons", ["Background", "Border"]);
    appendOption("Egg Count", ["Text"]);

    appendTitle("Shop Screen");
    appendOption("Shop Buttons", ["Background", "Border", "Text"]);

    appendTitle("Game Screen");
    appendOption("Game Menu", ["Background", "Border"]);
    appendOption("Chat & Ping Box", ["Background", "Border"]);
    appendOption("Game Border", ["Border"]);

    appendTitle("In Game");
    appendOption("Scope", ["URL"], "https://shellshock.io/img/scope.png");
    appendOption("Crosshair Top", ["Background", "Border"]);
    appendOption("Crosshair Left", ["Background", "Border"]);
    appendOption("Crosshair Bottom", ["Background", "Border"]);
    appendOption("Crosshair Right", ["Background", "Border"]);
    appendOption("Crosshair 10KS", ["Background", "Border"]);

    appendOption("Button Group 1 Shadow", ["Box Background", "Text Background"]);
    appendOption("Button Group 2 Shadow", ["Box Background", "Text Background"]);

    appendOption("Killstreak Icon", ["Background-Image (URL)"], "https://shellshock.io/img/ico_streak.png");
    appendOption("Ammo Icon", ["Background-Image (URL)"], "https://shellshock.io/img/ico_streak.png");
    appendOption("Health Circle", ["Background", "Health", "Inner Circle", "Number Color"]);

    appendOption("Player Name (You)", ["Background", "Color"]);
    appendOption("Player Name (Not You, FFA)", ["Background", "Color"]);
    appendOption("Player Name (Not You, Blue)", ["Background", "Color"]);
    appendOption("Player Name (Not You, Red)", ["Background", "Color"]);

    appendTitle("Tampermonkey Script");

    let copyscript = document.createElement('textarea');
    copyscript.style.height = "150px";
    copyscript.style.width = "250px";
    menu.appendChild(copyscript);

    document.getElementById("saveTheme").addEventListener("click", saveLocalTheme);
    document.getElementById("loadTheme").addEventListener("click", loadLocalTheme);
    function saveLocalTheme() {
        localStorage.setItem("localSave", JSON.stringify(choice.noBg));
    }

    function loadLocalTheme() {
        if (document.getElementById("themeStyle")) {
            document.getElementById("themeStyle").remove();
        }
        let hexArr = JSON.parse(localStorage.getItem("localSave"));
        choice.noBg = hexArr;
        setInputs();
        for (let i = 0; i < hexArr.length; i++) {
            document.getElementById("select" + i).value = hexArr[i];
        }
        onInput();
    }

    document.getElementById("import").addEventListener("click", importTheme);
    function importTheme() {
        let slotNum = document.getElementById("importThemeSelect").value;
        localStorage.setItem("themeSlot" + slotNum, document.getElementById("importThemeText").value);
    }

    document.getElementById("load").addEventListener("click", loadTheme);
    function loadTheme() {
        //Will NOT unload themes with external stylesheets
        if (document.getElementById("themeStyle")) {
            document.getElementById("themeStyle").remove();
        }
        if (document.getElementById("loadThemeStyle")) {
            document.getElementById("loadThemeStyle").remove();
        }
        let loadedScript = document.createElement("script");
        loadedScript.id = "loadThemeStyle";
        let inlineScript = document.createTextNode(`setTimeout(localStorage.getItem("themeSlot" + document.getElementById("importThemeSelect").value), 1);`);
        loadedScript.appendChild(inlineScript);
        document.body.appendChild(loadedScript);
    }

    function onInput() {
        getInputs(info.totalElements);
        setInputs();
        copyscript.innerHTML = generateScript();
    }

    for (let i = 0; i < info.totalElements; i++) {
        document.getElementById("select" + i).addEventListener("input", onInput);
    }
}

EZTheme();