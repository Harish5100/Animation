const header = document.querySelector('.header');
const description = document.querySelector('.description');
const box = document.querySelector('.box');
const circle = document.querySelector('.circle');
const pill = document.querySelector('.pill');
const shapes = [box, circle, pill];

gsap.from(header, {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "bounce.out"
});

gsap.from(description, {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: "power2.out"
});

gsap.from(shapes, {
    scale: 0,       
    rotation: -180,  
    opacity: 0,     
    duration: 1,
    delay: 1,       
    stagger: 0.2,   
    ease: "back.out(1.7)",
    onComplete: startFloating
});

function startFloating() {
    shapes.forEach((shape, index) => {
        gsap.to(shape, {
            y: "-=15",
            duration: 1.5 + index * 0.2,
            yoyo: true,
            ease: "sine.inOut" 
        });
    });
}

function setupClickAnimation(element, color1, color2, moveX, moveY) {
    let isToggled = false;
    
    element.addEventListener('click', () => {

        gsap.killTweensOf(element, "y"); 

        if (isToggled) {
            // Revert state
            gsap.to(element, {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                backgroundColor: color1,
                duration: 0.8,
                ease: "elastic.out(1, 0.5)",
                onComplete: () => {
        
                    gsap.to(element, { y: "-=15", duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
                }
            });
        } else {

            gsap.to(element, {
                x: moveX,
                y: moveY,
                rotation: "+=360", 
                scale: 1.2,
                backgroundColor: color2,
                duration: 0.6,
                ease: "back.out(2)"
            });
        }
        isToggled = !isToggled;
    });
}


setupClickAnimation(box, "#3b82f6", "#10b981", 80, -60);
setupClickAnimation(circle, "#ef4444", "#f59e0b", 0, -100);
setupClickAnimation(pill, "#8b5cf6", "#ec4899", -80, -60);
