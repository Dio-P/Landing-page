/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define arrays and the object that will be used to make the connection between the sections and the nav links
 * 
 */

 let helpLink = [];
 let linkMain = [];
 let sectionBoxMain = [];
 let helpSect = [];
 let secLinkConnect = {};

/*I was experimenting to see how I could populate sections dynamicaly. This is in addition to the allready existing sections. 
If one would want to use this for doing it dynamicaly fro the start, would only need to change a bit the numbers.*/
 function addSectionsDynam(numOfSecToAdd){
     const frag= document.createDocumentFragment();
     const addToMain = document.getElementById("main");

    for(let sec= 0; sec < numOfSecToAdd; sec++) {
        let section = document.createElement("section");
        section.id = "section" + (5 + sec);
        section.p = "bla bla bla";
        section.innerHTML = '<div class="landing__container">' + 
        '<h2>Section '+ (5 + sec) +'</h2>' +
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>'

        + '<p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>' +
        '</div>';
        
        frag.appendChild(section);
    }
    addToMain.appendChild(frag);
 }
 
 
 /*
 *Funtion that counts sections and creates nav menu elements equal to the section numbers
 *this functions gives the id as populating them that is stored in an array that will be used latter
 to create connection with the id of the link button.
 */
 
 function selectElementById(idName) {
     return document.getElementById(idName);
 }
 
 
 function count_sections(callback) {
     let sections = document.getElementsByTagName("section");
     const MyDocFrag = document.createDocumentFragment();
     const navbar_list = document.getElementById("navbar__list");
     let r = 0;
 
     for (section of sections) {
         r += 1;
         let li = document.createElement("LI");
         li.setAttribute("id", "li_" + r);
         let link = document.createElement("a");
         let SecName = "section" + r;
         let linkId = "a" + r;
         link.id = linkId;
         sectionBoxMain.push(selectElementById(SecName));
         helpSect.push(SecName);
         link.innerText = "Section " + r;
         link.setAttribute("class", "menu__link");
         helpLink.push(linkId);
        /*I found it easier to add the even listener here and leave the rest of the code (observer) as it was. Hope it's alright*/
         link.addEventListener("click", function(event) {
             document.getElementById(SecName).scrollIntoView ({behavior: "smooth", block: "end", inline: "nearest"});
             event.preventDefault();
         }, false);
 
         /*link.href= '#' + SecName;*/
         li.appendChild(link);
         MyDocFrag.appendChild(li);
 
     }
     navbar_list.appendChild(MyDocFrag);
 
 }
 
 
 /*start function that creates the object for the connection of the nav items with the sections*/
 
 function getLinkId(callback) {
     a = -1;
 
     function selectLink(link) {
         return document.getElementById(link);
     }
     for (link in helpLink) {
         a += 1;
         let aLink = selectLink(helpLink[a])
         linkMain.push(aLink);
         let corrLink = linkMain[a];
         secLinkConnect[helpSect[a]] = aLink;
     }
 
 }
 
 
 /*observer*/
 
 const observOpt = {
     root: null,
     rootMargin: "0px",
     threshold: 0.6,
 };
 
 /*observer function that checks if section in viewport + gives and takes the .active class*/
 
 function observCallback(entries, observer) {
     (entries.forEach((entry) => {
         if (entry.isIntersecting) {
             const secLinkCorr = secLinkConnect[entry.target.id];
             secLinkCorr.classList.add("active");
             Object.values(secLinkConnect).forEach((item) => {
                 if (item != secLinkCorr) {
                     item.classList.remove("active");
                 }
             });
         }
     }));
 }
 
 
 (function () {
    addSectionsDynam(5);
    setTimeout(count_sections(addSectionsDynam), 0);
    setTimeout(getLinkId(count_sections), 0);
    const observer = new IntersectionObserver(observCallback, observOpt);
    sectionBoxMain.forEach((sec) => observer.observe(sec));
 
 })();