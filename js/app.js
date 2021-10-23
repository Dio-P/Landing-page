let linkIdBox= [];
let getLInkByIdBox= [];
let sectionBox = [];
let sectName = [];
let secLinkCorrs = {};

/*
 *Funtion that counts sections and creates nav menu elements equal to the section numbers
 *this functions gives the id as populating them that is stored in an array that will be used latter
 to create connection with the id of the link button.
 */

function selectElementById(idName) {
    return document.getElementById(idName);
}

function count_sections() {
    //this function is counting the sections we have on the HTML. 
    // Acording to the result of this the menu bars will be populated.
    console.log("count_sections running");/////////////////////////////////////////////////////////////////
    let sections = document.getElementsByTagName("section");
    // creating a document fragment to help with the speed and make it lighter. 
    // The whole structure is first goint to be appeded here.
    const MyDocFrag = document.createDocumentFragment();
    //getting the navdar_list
    const navbar_list = document.getElementById("navbar__list");
    let r = 0;

    for (let element of sections){
        // r Is beinh used as a counter, to add numbers next to the new li elements
        r += 1;
        //it's time the function runs (number of sections) a new LI element is being created
        let li= document.createElement("LI");
        // this is given an id 
        li.setAttribute("id", "li_" + r);
        //it is also given an <a> element on which moste of the rest is going to happen. 
        let link = document.createElement("a");
        // the SecName is gong to be used to link it with the section
        let SecName = "section" + r;
        // using the r to create another correlation price the linkID
        let linkId= "a" + r;
        // giving the link an id
        link.id= linkId;
        // selectElementById(SecName) is pushed as single element, for each different section, in sectionBox to be linked latter on with the link id
        // so to create the condition `if section on view port the correlating link is getting selected by id`.
        sectionBox.push(selectElementById(SecName));
        // SecName is being pushed to the sectName array to be used latter
        sectName.push(SecName);
        // creating the link text
        link.innerText = "Project " + r;
        // giving the link a class
        link.setAttribute("class", "menu__link")
        // link Id is pushed in linkIdBox to be used later on, with the observer and getLinkId()
        linkIdBox.push(linkId);
        /*I found it easier to add the even listener here and leave the rest of the code (observer) as it was. Hope it's alright*/
        link.addEventListener("click", function(event) {
            document.getElementById(SecName).scrollIntoView ({behavior: "smooth", block: "end", inline: "nearest"});
            event.preventDefault();
        }, false);
        // appending the link to the li
        li.appendChild(link);
        // appeding the li to the created Doc Frag
        MyDocFrag.appendChild(li);

    }
    // appending all the li, which are on the doc Frag, on the navbar_list element to create the menu
    navbar_list.appendChild(MyDocFrag);

    console.log("sectionBox=>", sectionBox); /////////////////////
    console.log("linkIdBox=>", linkIdBox); ////////////////

}

function getLinkId(callback) {
    let a = -1
    // this is a similar function to the one found on the one above. For each link id in linkIdBox 
    // we get instead an element of document.getElementById(link) which is later pushed in a new array
    function selectLink(link) {
    return document.getElementById(link);
    }
    for (let link in linkIdBox) {
        a += 1;
        // one by one the elements within testLink array (a1, a2, a3) are chosen and ...
        let aLink = selectLink(linkIdBox[a])
        // ...pushed in getLInkByIdBox array as document.getElementById(link);
        getLInkByIdBox.push(aLink);
        console.log("a=>", a);//////////////////
        // Here is where the magic happens and we get on a different array the name(ID) of the section
        // correlated with the document.getElementById(link) element, so, if the sections is going to be
        // in the view port, the link id is going to be chosen.
        secLinkCorrs[sectName[a]] = aLink; 
    }

    console.log("secLinkCorrs in sec func =>", secLinkCorrs);
    console.log("sectionBox in sec func =>", sectionBox);
    console.log("getLInkByIdBox in sec func =>", getLInkByIdBox);
   
}

// Observer's options 
const observOpt = {
    root: null,
    rootMargin: "0px",
    threshold: 0.6,
};

// the final function where the observer is built initiated
function observCallback(entries, observer) {
    // for each one of the dom etries
    (entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // the id of the intersecting entry's link correlation is found in secLinkCorrs and named
            const secLinkCorr = secLinkCorrs[entry.target.id];
            console.log("entry.target.id =>", entry.target.id);///////////////////////
            let viewSection = document.getElementById(entry.target.id)
            console.log("secLinkCorr =>", secLinkCorr);/////////////////////////
            // then is being added an active scss class
            secLinkCorr.classList.add("active");
            viewSection.classList.add("activeSection");
            // If the other entries of secLinkCorrs are not the target, they are deprived of the same class
            Object.values(secLinkCorrs).forEach((item)=>{
                if (item != secLinkCorr) {
                    item.classList.remove("active");
                }
            });
            
            Object.values(sectionBox).forEach((item)=>{
                if (item != viewSection) {
                    item.classList.remove("activeSection");
                }
            });
        }
    }));
}

// our functions are called
function run(){
    count_sections();
    setTimeout(getLinkId(count_sections),0);
    // the observer is initiated
    const observer = new IntersectionObserver (observCallback, observOpt);
    sectionBox.forEach((sec) => observer.observe(sec));
}

run()