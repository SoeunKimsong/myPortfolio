let loadpage = document.getElementById('loading');
window.addEventListener('load', () => {
    loadpage.style.display = "none"
})



// greeting with time accurately
let greet = document.querySelector('#home .greet');
let time = new Date().getHours();
let greetText = [
    "Good Morning",
    "Good Afternoon",
    "Good Evening",
]
if (time > 5 && time < 12) greet.innerHTML = greetText[0]
else if (time >= 12 && time < 18) greet.innerHTML = greetText[1]
else greet.innerHTML = greetText[2]


// logo click to spin
let logoImage = document.querySelector('.logo .logo-image')
logoImage.addEventListener('click', () => {
    if (getComputedStyle(logoImage).animationPlayState == "paused") {
        logoImage.style.animationPlayState = "running"
    } else {
        logoImage.style.animationPlayState = "paused";
    }
})


// change cursor

let cursorPlace = document.querySelector('#home .content .cursor')
let cursor = document.querySelector('#home .coffee')

let hoverCursor = () => {
    cursor.style.display = "block";
    window.addEventListener('mousemove', (e) => {
        let mouseY = e.clientY - cursorPlace.getBoundingClientRect().bottom;
        let mouseX = e.clientX - cursorPlace.getBoundingClientRect().left;
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
    })

}
cursorPlace.addEventListener('mouseover', hoverCursor)
cursorPlace.addEventListener('mouseout', () => {
    cursor.style.display = "none";
})


// name hover
let name = document.querySelectorAll('#home .name');
var spanName = '';
name.forEach((n) => {
    let spanName = '';
    n.innerHTML.split('').map((l) => {
        spanName += `<span>${l}</span>`;
    })
    n.innerHTML = spanName;
})

// job typing
let job = [
    "Java Developer", "Software Engineer"
]
let myjob = document.querySelector('#home .myjob')

function type() {
    let deleting = false;
    let id = 0
    let i = 0;
    let timeout = 300;
    function typing() {
        if (!deleting) myjob.innerHTML = job[id].substring(0, i++)
        if (deleting) myjob.innerHTML = job[id].substring(0, i--)

        if (!deleting && i > job[id].length) {
            setTimeout(() => {
                deleting = true;
                timeout = 200;
            }, 1000);
        }
        if (deleting && i < 0) {
            deleting = false;
            timeout = 300;
            id++;
            if (id == job.length) id = 0;
        }

        setTimeout(typing, timeout);
    }
    typing();
}
type()


// change theme
let themeContainer = document.querySelector('.theme-container')
let themeSetting = document.querySelector('.theme-setting')
themeContainer.addEventListener('click', () => {
    themeSetting.classList.add('show')
})

document.addEventListener('click', (e) => {
    if (!themeSetting.contains(e.target) && !themeContainer.contains(e.target)) {
        themeSetting.classList.remove('show');
    }
})

let lightmode = document.querySelector('.theme-setting .light-theme')
let darkmode = document.querySelector('.theme-setting .dark-theme')

lightmode.addEventListener('click', () => {
    document.body.classList.add('light')
    lightmode.classList.add('active')
    darkmode.classList.remove('active')
    themeSetting.classList.remove('show')
})
darkmode.addEventListener('click', () => {
    document.body.classList.remove('light')
    lightmode.classList.remove('active')
    darkmode.classList.add('active')
    themeSetting.classList.remove('show')
})


// copy contact to clipboard
let clipboard = document.querySelectorAll('.clipboard')
clipboard.forEach((c) => {
    let text = c.querySelector('input');
    let copyBtn = c.querySelector('button');
    copyBtn.addEventListener('click', () => {
        text.select();
        text.setSelectionRange(0, 999);
        navigator.clipboard.writeText(text.value);
        
        // other method when we didn't create the copy text in the input element
        // let textarea = document.createElement('textarea')
        // textarea.value = text;
        // document.body.appendChild(textarea);
        // textarea.select();
        // document.execCommand('copy')
        // textarea.remove();
        alert('Successfully Copied')
    })
})


// click to shoot star
let roomImage = document.querySelector('#contact .image')
roomImage.addEventListener('click', () => {
    let star = document.createElement('div');
    if(document.body.classList.contains('light')){
        star.innerHTML = `<img src="images/plane.png" alt="plane">`
    }else{
        star.innerHTML = `<img src="images/shooting-star.png" alt="shooting star">`
    }
    star.classList.add('star');
    let topPosi = randTop();
    star.style.top = `${topPosi}%`;
    star.style.setProperty('--top', `${topPosi + 30}%`)
    document.body.appendChild(star);
    setTimeout(() => {
        document.body.removeChild(star);
    }, 5000);
})

function randTop(){
    return Math.floor(Math.random() * 50 + 10)
}


// nav active
let section = document.querySelectorAll('section')
window.addEventListener('scroll', () => {
    let topScreen = window.pageYOffset + (window.innerHeight / 4);
    section.forEach((s) => {
        let id = s.id;
        let e = document.querySelector(`.nav-link .${id}`)

        let sectionTop = s.offsetTop;
        let sectionHeight = sectionTop + s.offsetHeight ;
        if(topScreen>=sectionTop){
            s.classList.remove('active')
            e.classList.add('active')

            if(topScreen>sectionHeight) e.classList.remove('active')
        }else{
            e.classList.remove('active')
        }
    })
})

// mouse indicate
let mouse = document.querySelector('.nav-link .mouse')
let locaMouse = mouse.getBoundingClientRect().left;
window.addEventListener('scroll', () => {
    let activeNav = document.querySelector('.nav-link .active')
    let navLeft = activeNav.getBoundingClientRect().left + (activeNav.clientWidth / 2);
    mouse.style.transform = `translateX(${navLeft - locaMouse -10}px)`
})
document.addEventListener('DOMContentLoaded', () => {
    let activeNav = document.querySelector('.nav-link .active')
    let navLeft = activeNav.getBoundingClientRect().left + (activeNav.clientWidth / 2);
    mouse.style.transform = `translateX(${navLeft - locaMouse -10}px)`
})


// nav toggle
let navToggle = document.querySelector('nav .nav-toggle')
let navLinks = document.querySelector('nav .nav-link')

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show')
})

let navLink = document.querySelectorAll('.nav-link li a')
navLink.forEach((n) => {
    n.addEventListener('click', () => {
        navLinks.classList.remove('show')
    })
})