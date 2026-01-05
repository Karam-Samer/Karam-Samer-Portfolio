/* =========================================
   MAIN.JS - Core Logic, Navigation, Modals
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Prevent background scrolling when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close mobile menu when a link is clicked
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scroll
        }));
    }

    // --- Active Nav Link on Scroll (IntersectionObserver) ---
    const sectionObserverOptions = {
        threshold: 0.3,
        rootMargin: "-10% 0px -10% 0px"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, sectionObserverOptions);

    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Random Quote Generator ---
    const quotes = [
        "First, solve the problem. Then, write the code.",
        "Simplicity is the soul of efficiency.",
        "Make it work, make it right, make it fast.",
        "Code is like humor. When you have to explain it, it’s bad."
    ];

    const quoteElement = document.getElementById('random-quote');
    if (quoteElement) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteElement.textContent = `"${randomQuote}"`;
    }

    // --- Skills Accordion (Mobile) ---
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(acc => {
        acc.addEventListener('click', function () {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            accordions.forEach(item => {
                item.setAttribute('aria-expanded', 'false');
            });
            if (!isExpanded) {
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });



});

// --- Modal Logic (Global Scope) ---
// Using functionality from previous script.js, cleaned up directly here or attached to window if needed by HTML onclicks
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-btn');

/* Hardcoded Data for Static Projects (Manual entries) */
const projectData = {
    2: {
        title: "BookStore System – UML Analysis",
        desc: "Designed full UML behavioral models including 7 Sequence Diagrams with detailed use-case documentation, aligning system logic with a frontend prototype using HTML, CSS, and JavaScript.",
        contributions: [
            "Designed 7 detailed Sequence Diagrams",
            "Created comprehensive Use-Case Documentation",
            "Aligned system logic with HTML/CSS/JS Frontend"
        ],
        tech: ["UML", "<i class='fa-brands fa-html5'></i> HTML5", "<i class='fa-brands fa-css3-alt'></i> CSS3", "<i class='fa-brands fa-js'></i> JavaScript"],
    },

    4: {
        title: "Student Grade Analysis System",
        desc: "A console-based Python application designed to streamline the analysis of student exam results. It supports data processing from Excel files, automated grade assignment based on customizable criteria, and performance prediction using machine learning.",
        contributions: [
            "Developed a data processing pipeline using Pandas and NumPy",
            "Implemented grade prediction using Logistic Regression (Scikit-learn)",
            "Created data visualizations with Matplotlib for grade distributions",
            "Built a search feature to find students by name or seat number"
        ],
        tech: ["<i class='fa-brands fa-python'></i> Python", "Pandas", "Matplotlib", "Scikit-learn", "NumPy"],
    }
};

const certData = {
    youth: {
        title: "Python & AI",
        org: "Youth Initiative (Programming Track)",
        desc: "Learned the basics of Python programming and how AI concepts work.",
        image: "assets/images/certificates/python-ai.webp"
    },
    rs: {
        title: "Fundamentals of Remote Sensing",
        org: "National Authority for Remote Sensing & Space Sciences",
        desc: "Studied the basics of analyzing satellite images.",
        image: "assets/images/certificates/remote-sensing.webp"
    },
    geopython: {
        title: "GeoPython",
        org: "National Authority for Remote Sensing & Space Sciences (NARSS)",
        desc: "Used Python to analyze geographic data.",
        image: "assets/images/certificates/geopython.webp"
    }
};

// Exposed to window for onclick (can be refactored to event listeners later if desired)
window.openModal = function (id) {
    if (!modal) return;
    const data = projectData[id];
    if (!data) return;

    modalBody.innerHTML = `
        <h2 style="color:var(--accent-cyan); margin-bottom:15px;">${data.title}</h2>
        <p style="margin-bottom:20px; color:var(--text-secondary);">${data.desc}</p>
        
        <h4 style="color:var(--text-primary); margin-bottom:10px;">Key Contributions:</h4>
        <ul style="list-style:disc; padding-left:20px; margin-bottom:20px; color:var(--text-secondary);">
            ${data.contributions.map(c => `<li>${c}</li>`).join('')}
        </ul>

        <p style="font-family:var(--font-mono); font-size:0.9rem; color:var(--text-secondary); margin-bottom:20px;">
            <strong style="color:var(--text-primary);">Tech Stack:</strong> ${data.tech.join(" · ")}
        </p>
    `;
    modal.style.display = "flex";
}

window.openCertModal = function (id) {
    if (!modal) return;
    const data = certData[id];
    if (!data) return;

    // Special Layout for Python & AI (id: 'youth')
    if (id === 'youth') {
        modalBody.innerHTML = `
            <div class="cert-split-layout">
                ${data.image ?
                `<img src="${data.image}" alt="${data.title}" style="max-width:100%; border-radius:8px; border:1px solid var(--accent-cyan);">`
                : ''}
                
                <div class="cert-content-side">
                    <h2 style="color:var(--text-primary); margin-bottom:10px;">${data.title}</h2>
                    <p style="color:var(--accent-cyan); margin-bottom:15px; font-weight:600;">${data.org}</p>
                    <p style="color:var(--text-secondary); margin-bottom:25px; line-height:1.6;">${data.desc}</p>

                </div>
            </div>
        `;
    }
    // Default Centered Layout for others
    else {
        modalBody.innerHTML = `
            <div class="cert-centered-layout">
                <div style="margin-bottom:20px;">
                    ${data.image ?
                `<img src="${data.image}" alt="${data.title}" style="max-width:100%; max-height:300px; border-radius:8px; border:1px solid var(--accent-cyan);">`
                :
                `<i class="fa-solid fa-award" style="font-size:3rem; color:var(--accent-cyan);"></i>`
            }
                </div>
                <h2 style="color:var(--text-primary); margin-bottom:5px;">${data.title}</h2>
                <p style="color:var(--accent-cyan); margin-bottom:20px;">${data.org}</p>
                <p style="color:var(--text-secondary); margin-bottom:30px; max-width:80%;">${data.desc}</p>

            </div>
        `;
    }
    modal.style.display = "flex";
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
