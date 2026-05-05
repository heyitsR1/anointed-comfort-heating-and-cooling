import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- 1. Sticky Header ---
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});

// --- 2. Mobile Menu ---
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileNav.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile nav on link click
mobileNav.querySelectorAll('a:not(.mobile-cta-bar a)').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  });
});

// --- 3. FAQ Accordion ---
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    faqItems.forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// --- 4. Smooth Scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// --- 5. Populate Marquee Reviews Dynamically ---
const reviews = [
  { name: 'Renee Pool', text: "Dejuan Brown / Anointed Comfort did an excellent and AFFORDABLE job... Dejuan was able to squeeze us in the next day & stayed until late fixing the dehumidifier." },
  { name: 'Bran', text: "DeJuan was extremely professional and personable! He gave honest, trustworthy opinions on the status of our system. He then worked nonstop to install our new system without a hitch!" },
  { name: 'andrew kee', text: "He was great!!! My air conditioning wasn't working and he came out right away to fix the problem. I would definitely recommend him if you need help." },
  { name: 'Taher Shakir', text: "DeJuan is very responsive, professional and courteous. He diagnosed the issue with our AC / Thermostat unit promptly and corrected the problem. He knows what he's talking about." },
  { name: 'Jessica Ahmed', text: "Dejuan quickly came out to my home and did not leave until he had diagnosed and repaired our AC unit in our attic. He was friendly, professional and did everything for a great cost." },
  { name: 'Tangela Davenport', text: "I contact Dejauan Brown... he came out within 30 minutes of me texting him. He was prompt... extremely knowledgeable and thorough. He diagnosed the problem and was extremely affordable." },
  { name: 'Ganka Douglas', text: "Dejuan helped us out a while ago when we were having problems with our HVAC damper. Great personable service and honest advice. Would strongly recommend to anyone." },
  { name: 'VenuMitzi Kubwimana', text: "Just like the business name suggest, we received anointed service! Mr. Brown helped us to install a mini-split unit, and everything was perfect, from consultation to actual install." },
  { name: 'Mina Bard', text: "We saved $1000 by hiring DeJuan instead of following the recommendation from our home warranty. Professional, knowledgeable and trustworthy." },
  { name: 'Jaison Thottumkal', text: "Quoted me a price on the phone came out and fixed something he saw in attic didn’t even change price on me RARE find I will definitely be using him for all my AC needs" }
];

const createReviewCard = (review) => `
  <div class="review-card">
    <div class="stars">
      ${'<svg width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'.repeat(5)}
    </div>
    <blockquote>"${review.text}"</blockquote>
    <div class="reviewer-row">
      <span class="reviewer-name">— ${review.name}</span>
      <span class="google-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      </span>
    </div>
  </div>
`;

// Populate rows with duplicated arrays to ensure infinite scroll doesn't show a gap
const row1Html = [...reviews.slice(0,5), ...reviews.slice(0,5), ...reviews.slice(0,5)].map(createReviewCard).join('');
const row2Html = [...reviews.slice(5), ...reviews.slice(5), ...reviews.slice(5)].map(createReviewCard).join('');

const row1 = document.querySelector('.marquee-row-1');
const row2 = document.querySelector('.marquee-row-2');
if (row1) row1.innerHTML = row1Html;
if (row2) row2.innerHTML = row2Html;

// --- 6. Form Submission (Formspree) ---
const form = document.getElementById('hero-estimate-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        // Show success state
        form.style.display = 'none';
        const card = form.closest('.hero-form-card');
        if (card) {
          const h3 = card.querySelector('h3');
          const p = card.querySelector('p');
          if (h3) h3.style.display = 'none';
          if (p) p.style.display = 'none';
        }
        
        const successState = document.getElementById('form-success-state');
        if (successState) {
          successState.style.display = 'block';
          // Optional: Add a small pop animation
          gsap.fromTo(successState, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" });
        }
      } else {
        throw new Error('Failed');
      }
    } catch (err) {
      btn.textContent = 'Error — Try Calling';
      btn.style.background = '#DC2626';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }
  });
}

// --- 7. GSAP Animations ---
// Initial states to avoid flashes before JS runs
gsap.set('.gsap-stagger-card, .gsap-stagger-price', { y: 40, opacity: 0 });

// Hero Animations
gsap.from('.gsap-hero-text', {
  y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2
});
gsap.from('.gsap-hero-form', {
  x: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.4
});

// Fade Up Elements
gsap.utils.toArray('.gsap-fade-up').forEach(el => {
  gsap.fromTo(el, 
    { y: 40, opacity: 0 },
    {
      scrollTrigger: { trigger: el, start: 'top 90%' },
      y: 0, opacity: 1, duration: 0.8, ease: 'power3.out'
    }
  );
});

// Slide Directions
gsap.utils.toArray('.gsap-slide-right').forEach(el => {
  gsap.fromTo(el, 
    { x: -50, opacity: 0 },
    {
      scrollTrigger: { trigger: el, start: 'top 90%' },
      x: 0, opacity: 1, duration: 0.8, ease: 'power3.out'
    }
  );
});
gsap.utils.toArray('.gsap-slide-left').forEach(el => {
  gsap.fromTo(el, 
    { x: 50, opacity: 0 },
    {
      scrollTrigger: { trigger: el, start: 'top 90%' },
      x: 0, opacity: 1, duration: 0.8, ease: 'power3.out'
    }
  );
});

// Staggered Cards (Services)
ScrollTrigger.batch('.gsap-stagger-card', {
  start: 'top 90%',
  onEnter: batch => gsap.to(batch, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', overwrite: true })
});

// Staggered Pricing
ScrollTrigger.batch('.gsap-stagger-price', {
  start: 'top 90%',
  onEnter: batch => gsap.to(batch, { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out', overwrite: true })
});

// Scale Up
gsap.utils.toArray('.gsap-scale-up').forEach(el => {
  gsap.fromTo(el, 
    { scale: 0.95, opacity: 0 },
    {
      scrollTrigger: { trigger: el, start: 'top 90%' },
      scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out'
    }
  );
});

// Number Counters
gsap.utils.toArray('.counter').forEach(counter => {
  const target = parseInt(counter.getAttribute('data-target'), 10);
  ScrollTrigger.create({
    trigger: counter,
    start: 'top 90%',
    once: true,
    onEnter: () => {
      gsap.to(counter, {
        innerHTML: target,
        duration: 2,
        snap: { innerHTML: 1 },
        ease: 'power2.out'
      });
    }
  });
});
