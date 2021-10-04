
let testLink= [];
let testLink2= [];
let sectionBox = [];
let sectName = [];
let secLinkCorrs = {};
let As = document.querySelectorAll("a");

function selectElementById(idName) {
    return document.getElementById(idName);
}

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
        sectionBox.push(selectElementById(SecName));
        sectName.push(SecName);
        link.innerText = "Section " + r;
        link.setAttribute("class", "menu__link")
        testLink.push(linkId);
        link.href= '#' + SecName;
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
        let corrLink= testLink2[a];
        secLinkCorrs[sectName[a]] = aLink; 
    }

    console.log(secLinkCorrs);
    console.log(sectionBox);
    console.log(testLink2);
   
} 
setTimeout(getLinkId(count_sections),0);

const observOpt = {
    root: null,
    rootMargin: "0px",
    threshold: 0.7,
};

function observCallback(entries, observer) {
    (entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const secLinkCorr = secLinkCorrs[entry.target.id];
            secLinkCorr.classList.add("active");
            Object.values(secLinkCorrs).forEach((item)=>{
                if (item != secLinkCorr) {
                    item.classList.remove("active");
                }
            });         
        }
    }));
}
const observer = new IntersectionObserver (observCallback, observOpt);
sectionBox.forEach((sec) => observer.observe(sec));


