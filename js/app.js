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
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/*This works, if you want you can add up class as well. give it content (is this going to be a or link?)*/



/*function findClassCorrel(idName ) {
    return document.querySelector(`#${idName}`);
}*/

/*This works, now you need to create the secod list and correlate*/
let testLink= [];
let testLink2= [];
let sectionBox = [];
let sectName = [];
let secLinkCorrs = {};
let As = document.querySelectorAll("a");
/*let selectElementById = function selectElementById(SecName) {
    return document.getElementById(SecName)
}

let selectLink = function selectLink(linkId) {
    return document.getElementById(linkId)
}*/
function selectElementById(idName) {
    return document.getElementById(idName);
}

/*function selectLink(linkId) {
    return document.getElementById(linkId);
}*/


function count_sections() {
    let sections = document.getElementsByTagName("section");
    const MyDocFrag = document.createDocumentFragment();
    const navbar_list = document.getElementById("navbar__list");
    let r = 0;

    for (section of sections){
        r += 1;
        let li= document.createElement("LI");
        li.setAttribute("id", "li_" + r);
        let link = document.createElement("a");
        let SecName = "section" + r;
        let linkId= "a" + r;
        link.id= linkId;
        /*sectionsList.append("section" + r)*/
        sectionBox.push(selectElementById(SecName));
        sectName.push(SecName);
        /*let in_link = href= '#' + name;
        link.innerHTML = in_link
        link.textContent = */
        /*The link is write well but it is not working*/
        link.innerText = "Section " + r;
        link.setAttribute("class", "menu__link")
        testLink.push(linkId);
        link.href= '#' + SecName;
        /*the thing is that it goes in as null
        secLinkCorrs[SecName] = selectLink(linkId); 
        secLinkCorrs[SecName] = selectLink;*/
        /*secLinkCorrs[SecName] = selectLink(linkId);*/
       /*[sectionBox]=[testLink];
        /*test.push(secLinkCorrs);*/
        li.appendChild(link);
        MyDocFrag.appendChild(li);

    }
    navbar_list.appendChild(MyDocFrag);

    console.log(sectionBox);
    console.log(testLink);

}
count_sections()



function getLinkId(callback) {
    a = -1
    function selectLink(link) {
    return document.getElementById(link);
}
    for (link in testLink) {
        a += 1;
        let aLink = selectLink(testLink[a])
        testLink2.push(aLink);
        console.log(a);
        /*let corr= sectionBox[a];*/
        let corrLink= testLink2[a];
        /*secLinkCorrs={sectionBox[a]:corrLink};*/
        secLinkCorrs[sectName[a]] = aLink; 
    }

    console.log(secLinkCorrs);
    console.log(sectionBox);
    console.log(testLink2);
   
} 
setTimeout(getLinkId(count_sections),0);

const observOpt = {
    root: null, /*document.querySelector('#scrollArea')*/
    rootMargin: "0px",
    threshold: 0.7,
};

function observCallback(entries, observer) {
    /*for (entry of entries)*/
    (entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const secLinkCorr = secLinkCorrs[entry.target.id];
            secLinkCorr.classList.add("active");
            /*with O (cap) nothing works*/
            Object.values(secLinkCorrs).forEach((item)=>{
                if (item != secLinkCorr) {
                    item.classList.remove("active");
                }
            });
            
            /*object.values(secLinkCorrs).forEach((secLinkCorr)=>{
                if (secLinkCorr != secLinkCorrs) {
                    secLinkCorr.classList.remove("active");
                }
            });*/
        }
    }));
}
const observer = new IntersectionObserver (observCallback, observOpt);
sectionBox.forEach((sec) => observer.observe(sec));

/*const section = {
    findClassCorrel()
    findClassCorrel()
    findClassCorrel()
}


...*/

/*let As = document.querySelectorAll("a");

As.forEach(a => {
    a.addEventListener("click", function () {
        As.forEach(a => a.classList.remove("active"));
        this.classList.add("active");    
    });
});



let section_container1 = document.getElementById("section1");
let section_container2 = document.getElementById("section2");
let section_container3 = document.getElementById("section3");

/*function isInViewPort() {
    
    let sect_box1 = section_container1.getBoundingClientRect();
    let sect_box2 = section_container2.getBoundingClientRect();
    let sect_box3 = section_container3.getBoundingClientRect();
    
    if (
        sect_box1.top >= 0 &&
        sect_box1.left >= 0 &&
        sect_box1.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        sect_box1.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    ) {
        console.log('Section 1 In the viewport! :)');
        return true;
    } /*else {
        console.log('Not in the viewport. :(');
        return false;
    }*/

    /*if (
        sect_box2.top >= 0 &&
        sect_box2.left >= 0 &&
        sect_box2.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        sect_box2.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    ) {
        console.log('Section 2 In the viewport! :)');
        return true;
    } /*else {
        console.log('Not in the viewport. :(');
        return false;
    }*/

    /*if (
        sect_box3.top >= 0 &&
        sect_box3.left >= 0 &&
        sect_box3.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        sect_box3.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    ) {
        console.log('section 3 In the viewport! :)');
        /*return true;*/
    /*} /*else {
        console.log('Not in the viewport. :(');
        return false;
    }*/


/*};*/



/*window.addEventListener('scroll', function() {
    let sect_box1 = section_container1.getBoundingClientRect();
    let sect_box2 = section_container2.getBoundingClientRect();
    let sect_box3 = section_container3.getBoundingClientRect();

    /*let a_1 = document.getElementById("a1")
    let a_2 = document.getElementById("a2")
    let a_3 = document.getElementById("a3")*/

    /*let a_1 = document.getElementById("a1")
    let a_2 = document.getElementById("a2")
    let a_3 = document.getElementById("a3")

    if (
        sect_box1.top >= 0 &&
        sect_box1.left >= 0 &&
        sect_box1.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        sect_box1.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    ) {
        As.forEach(a => a.classList.remove("active"));
        a_1.classList.add("active");    

    } /*else {
        console.log('Not in the viewport. :(');
        return false;
    }*/

    /*if (
        sect_box2.top >= 0 &&
        sect_box2.left >= 0 &&
        sect_box2.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        sect_box2.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    ) {
        As.forEach(a => a.classList.remove("active"));
        a_2.classList.add("active");
    } /*else {
        console.log('Not in the viewport. :(');
        return false;
    }*/

    /*if (
        sect_box3.top >= 0 &&
        sect_box3.left >= 0 &&
        sect_box3.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        sect_box3.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    ) {
        As.forEach(a => a.classList.remove("active"));
        a_3.classList.add("active");
    } /*else {
        console.log('Not in the viewport. :(');
        return false;
    }*/

/*}, false);*/




/* let As = document.querySelectorAll("a");

function isInViewPort() {
    let section_container = document.querySelector(".landing__container");
    let sect_box = section_container.getBoundingClientRect();
    
    if (
        sect_box.top >= 0 &&
        sect_box.left >= 0 &&
        sect_box.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        sect_box.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    ) {
        console.log('In the viewport! :)');
        return true;
    } else {
        console.log('Not in the viewport. :(');
        return false;
    }
};

isInViewPort()

/*window.addEventListener('scroll', function (event) {
    if (isInViewport(sect_box)) {
        let As = document.querySelectorAll("a");
        As.forEach(a => a.classList.remove("active"));
        this.classList.add("active");    
    };

}, false);

/*two things remaining add three more sections, 
add event listener for the view port again with active and add a not inherit letter color for the active class*/

/* for event listener and view port*/

/*const element = document.querySelector('.box');
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


// Get the an HTML element
var element = document.querySelector('<a selector>');

// Get its bounding client rectangle
var bounding = element.getBoundingClientRect();
Use it to build a function which checks if the element is in the viewport client by retrieving the bounding box (okay, the code could be improved, it's just a demo):

function isInViewPort(element) {
    // Get the bounding client rectangle position in the viewport
    var bounding = element.getBoundingClientRect();

    // Checking part. Here the code checks if it's *fully* visible
    // Edit this part if you just want a partial visibility
    if (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    ) {
        console.log('In the viewport! :)');
        return true;
    } else {
        console.log('Not in the viewport. :(');
        return false;
    }
}
Finally, add an event listener on scroll event which call the above function:

window.addEventListener('scroll', function (event) {
    if (isInViewport(theElementToWatch)) {
      // update the element display
    }
}, false);
/* add something similar inside the li that are produced above  <li><a href="#" data-nav-section="home">Home</a></li> //// 
this must not be working properly:  <li><a href="index.html" class="transition" data-nav-section="home">Home</a></li>*/

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


