import "./styles.css";
import googleReviewsLogo from "./img/novas/gr.png";

import { createElement } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Brain,
  CalendarCheck,
  CaretDown,
  CaretLeft,
  CaretRight,
  CheckCircle,
  DeviceMobile,
  Ear,
  ForkKnife,
  Lightning,
  Play,
  PlayCircle,
  ShieldCheck,
  SlidersHorizontal,
  Sparkle,
  Star,
  Television,
  UserCircle,
  UsersThree,
  Waveform,
  X,
} from "@phosphor-icons/react";

const phosphorIconMap = {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Brain,
  CalendarCheck,
  CaretDown,
  CaretLeft,
  CaretRight,
  CheckCircle,
  DeviceMobile,
  Ear,
  ForkKnife,
  Lightning,
  Play,
  PlayCircle,
  ShieldCheck,
  SlidersHorizontal,
  Sparkle,
  Star,
  Television,
  UserCircle,
  UsersThree,
  Waveform,
  X,
};

const renderPhosphorIcon = (target) => {
  const Icon = phosphorIconMap[target.dataset.phosphor];
  if (!Icon || target.dataset.phosphorMounted) return;

  const className = ["phosphor-icon", "text-current", target.className, target.dataset.phosphorClass]
    .filter(Boolean)
    .join(" ");

  target.dataset.phosphorMounted = "true";
  createRoot(target).render(
    createElement(Icon, {
      "aria-hidden": "true",
      className,
      size: Number(target.dataset.phosphorSize) || 20,
      weight: target.dataset.phosphorWeight || "regular",
    }),
  );
};

const mountPhosphorIcons = (root = document) => {
  root.querySelectorAll("[data-phosphor]:not([data-phosphor-mounted])").forEach(renderPhosphorIcon);
};

mountPhosphorIcons();

const body = document.body;
const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");

const setPageLock = () => {
  const anyModalOpen =
    document.querySelector(".video-modal.is-open, .schedule-modal.is-open") ||
    mobileMenu?.classList.contains("is-open");
  body.classList.toggle("is-locked", Boolean(anyModalOpen));
};

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 28);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  mobileMenu?.classList.toggle("is-open", !isOpen);
  header?.classList.toggle("menu-open", !isOpen);
  setPageLock();
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("is-open");
    header?.classList.remove("menu-open");
    setPageLock();
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px" },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const storyRail = document.querySelector("[data-story-rail]");
const scrollStories = (direction) => {
  const card = storyRail?.querySelector(".story-card");
  if (!storyRail || !card) return;
  storyRail.scrollBy({ left: direction * (card.offsetWidth + 18), behavior: "smooth" });
};

document.querySelector("[data-story-prev]")?.addEventListener("click", () => scrollStories(-1));
document.querySelector("[data-story-next]")?.addEventListener("click", () => scrollStories(1));

const fallbackReviewsData = {
  averageRating: "4,9",
  totalReviews: "Mais de 220 avalia\u00e7\u00f5es reais",
  totalReviewsInline: "220 pessoas",
  badge: "4,9 no Google",
  profileUrl: "https://www.google.com/maps/search/?api=1&query=Centro+Auditivo+Maca%C3%A9",
  footnote:
    "220 pessoas avaliaram espontaneamente o Centro Auditivo Maca\u00e9 com nota m\u00e9dia de 4,9/5 no Google.",
  reviews: [
    {
      author: "Meire Mendon\u00e7a",
      source: "Google Reviews",
      timeAgo: "h\u00e1 2 meses",
      text: "Com certeza recomendaria para as pessoas que precisam desse tipo de servi\u00e7o. Um excelente atendimento, come\u00e7ando pela secret\u00e1ria que me explicou tudo com detalhes. O atendimento com a Dra. Missiene foi realizado com aten\u00e7\u00e3o aos m\u00ednimos detalhes.",
    },
    {
      author: "Wilson dos Santos Souza",
      source: "Google Reviews",
      timeAgo: "h\u00e1 3 meses",
      text: "Fui muito bem atendido desde o primeiro dia, recebendo orienta\u00e7\u00f5es muito abrangentes e detalhadas sobre o tratamento com CEPAP e seu uso, al\u00e9m do acolhimento gentil. Gratid\u00e3o!",
    },
    {
      author: "Evandro Tostes",
      source: "Google Reviews",
      timeAgo: "h\u00e1 1 m\u00eas",
      text: "Seria injusto dar somente nota 10. Para mim teria que ser nota 1000. No atendimento, desde a recep\u00e7\u00e3o at\u00e9 a parte cl\u00ednica e t\u00e9cnica. O aparelho auditivo \u00e9 da melhor qualidade.",
    },
    {
      author: "Frederico Pessanha",
      source: "Google Reviews",
      timeAgo: "h\u00e1 4 meses",
      text: "Muito bem atendido. Tiraram todas as d\u00favidas. O p\u00f3s-venda est\u00e1 sendo impec\u00e1vel. Mesmo depois de meses da compra, continuam prestando assist\u00eancia.",
    },
    {
      author: "Alessandro Vieira",
      source: "Google Reviews",
      timeAgo: "h\u00e1 2 meses",
      text: "A pessoa que me ligou teve uma abordagem perfeita ao cliente. Parab\u00e9ns a toda a cl\u00ednica. Espero continuar realizando consultas e exames com voc\u00eas.",
    },
    {
      author: "Josiane Cordeiro",
      source: "Google Reviews",
      timeAgo: "h\u00e1 5 meses",
      text: "Minha m\u00e3e \u00e9 paciente do Dr. Leonardo h\u00e1 anos. Sempre fomos extremamente bem atendidas. Recomendo a todos.",
    },
    {
      author: "Inset Costa Verde",
      source: "Google Reviews",
      timeAgo: "h\u00e1 3 meses",
      text: "Obrigado pela aten\u00e7\u00e3o em abrir meus olhos para um risco grav\u00edssimo relacionado \u00e0 apneia do sono. Hoje come\u00e7o uma nova fase da minha vida.",
    },
    {
      author: "Andr\u00e9 Braga",
      source: "Google Reviews",
      timeAgo: "h\u00e1 1 m\u00eas",
      text: "Excelente atendimento! A atendente Larissa foi super atenciosa e passou todos os detalhes sobre a consulta, adapta\u00e7\u00e3o e uso do aparelho.",
    },
    {
      author: "Paulo Junior",
      source: "Google Reviews",
      timeAgo: "h\u00e1 2 meses",
      text: "Desde a recep\u00e7\u00e3o fui sempre muito bem atendido. Profissionais atenciosos e preocupados com o bem-estar dos pacientes.",
    },
    {
      author: "Carlos Henrique F. Gon\u00e7alves",
      source: "Google Reviews",
      timeAgo: "h\u00e1 4 meses",
      text: "Fui atendido no Centro Auditivo Maca\u00e9 e tive uma excelente experi\u00eancia. A equipe \u00e9 muito atenciosa e o p\u00f3s-atendimento me surpreendeu positivamente. Eles realmente se preocupam com o cliente.",
    },
  ],
};

const getReviewInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");

const createReviewCard = (review, index) => {
  const card = document.createElement("article");
  card.className = "reviews-premium-card reveal";
  card.style.setProperty("--review-delay", `${index * 80}ms`);

  const avatar = document.createElement("span");
  avatar.className = "reviews-premium-card-avatar";
  avatar.textContent = getReviewInitials(review.author);
  avatar.setAttribute("aria-hidden", "true");

  const head = document.createElement("div");
  head.className = "reviews-premium-card-head";

  const source = document.createElement("div");
  source.className = "reviews-premium-card-source";

  const grImg = document.createElement("img");
  grImg.src = googleReviewsLogo;
  grImg.alt = "";
  grImg.className = "reviews-premium-gr-badge";

  const time = document.createElement("span");
  time.className = "reviews-premium-card-time";
  time.textContent = review.timeAgo || "há alguns meses";

  source.append(grImg);

  const meta = document.createElement("div");
  meta.className = "reviews-premium-card-meta";

  const name = document.createElement("strong");
  name.className = "reviews-premium-author-name";
  name.textContent = review.author;

  const stars = document.createElement("div");
  stars.className = "reviews-premium-stars";
  stars.setAttribute("aria-label", "5 estrelas");
  stars.innerHTML = "";
  for (let starIndex = 0; starIndex < 5; starIndex += 1) {
    const star = document.createElement("span");
    star.dataset.phosphor = "Star";
    star.dataset.phosphorSize = "20";
    star.dataset.phosphorWeight = "fill";
    star.setAttribute("aria-hidden", "true");
    stars.append(star);
  }
  mountPhosphorIcons(stars);

  meta.append(name, stars, time);

  const quote = document.createElement("p");
  quote.className = "reviews-premium-quote";
  quote.textContent = review.text;

  const footer = document.createElement("footer");
  footer.className = "reviews-premium-card-footer";
  footer.append(name.cloneNode(true));

  head.append(source);
  card.append(avatar, head, meta, quote, footer);
  return card;
};

const loadReviewsData = async () => {
  try {
    const response = await fetch("/reviews/google-business.json", { cache: "no-store" });
    if (!response.ok) throw new Error("reviews fetch failed");
    const data = await response.json();
    return { ...fallbackReviewsData, ...data, reviews: data.reviews?.length ? data.reviews : fallbackReviewsData.reviews };
  } catch {
    return fallbackReviewsData;
  }
};

const initReviewsSection = async () => {
  const section = document.querySelector(".reviews-premium-section");
  const track = section?.querySelector("[data-reviews-track]");
  const carousel = section?.querySelector("[data-reviews-carousel]");
  const prevButton = section?.querySelector("[data-reviews-prev]");
  const nextButton = section?.querySelector("[data-reviews-next]");

  if (!section || !track || !carousel) return;

  const data = await loadReviewsData();
  const rating = section.querySelector("[data-reviews-rating]");
  const total = section.querySelector("[data-reviews-total]");
  const totalInline = section.querySelector("[data-reviews-total-inline]");
  const badge = section.querySelector("[data-reviews-badge]");
  const link = section.querySelector("[data-reviews-link]");
  const footnote = section.querySelector("[data-reviews-footnote]");

  if (rating) rating.textContent = data.averageRating;
  if (total) total.textContent = data.totalReviews;
  if (totalInline) totalInline.textContent = data.totalReviewsInline || "220 pessoas";
  if (badge) badge.textContent = data.badge;
  if (link && data.profileUrl) link.href = data.profileUrl;
  if (footnote && data.footnote) footnote.textContent = data.footnote;

  track.innerHTML = "";
  data.reviews.forEach((review, index) => {
    const card = createReviewCard(review, index);
    track.appendChild(card);
    revealObserver.observe(card);
  });

  const getStepSize = () => {
    const card = track.querySelector(".reviews-premium-card");
    if (!card) return 0;
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");
    return card.getBoundingClientRect().width + gap;
  };

  const updateButtons = () => {
    const maxScroll = track.scrollWidth - track.clientWidth - 2;
    if (!prevButton || !nextButton) return;
    prevButton.disabled = track.scrollLeft <= 2;
    nextButton.disabled = track.scrollLeft >= maxScroll;
  };

  const scrollTrack = (direction) => {
    const step = getStepSize();
    if (!step) return;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  prevButton?.addEventListener("click", () => scrollTrack(-1));
  nextButton?.addEventListener("click", () => scrollTrack(1));
  track.addEventListener("scroll", updateButtons, { passive: true });
  window.addEventListener("resize", updateButtons);

  let reviewsAutoplay = 0;
  const startReviewsAutoplay = () => {
    window.clearInterval(reviewsAutoplay);
    reviewsAutoplay = window.setInterval(() => {
      const maxScroll = track.scrollWidth - track.clientWidth - 2;
      const atEnd = track.scrollLeft >= maxScroll;
      if (atEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }
      scrollTrack(1);
    }, 4200);
  };

  const stopReviewsAutoplay = () => {
    window.clearInterval(reviewsAutoplay);
  };

  let pointerDown = false;
  let startX = 0;
  let startScroll = 0;

  track.addEventListener("pointerdown", (event) => {
    pointerDown = true;
    startX = event.clientX;
    startScroll = track.scrollLeft;
    track.classList.add("is-dragging");
    track.setPointerCapture(event.pointerId);
  });

  track.addEventListener("pointermove", (event) => {
    if (!pointerDown) return;
    const distance = event.clientX - startX;
    track.scrollLeft = startScroll - distance;
  });

  const releasePointer = (event) => {
    if (!pointerDown) return;
    pointerDown = false;
    track.classList.remove("is-dragging");
    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }
  };

  track.addEventListener("pointerup", releasePointer);
  track.addEventListener("pointercancel", releasePointer);
  track.addEventListener("pointerleave", (event) => {
    if (!pointerDown) return;
    releasePointer(event);
  });

  carousel.addEventListener("mouseenter", stopReviewsAutoplay);
  carousel.addEventListener("mouseleave", startReviewsAutoplay);
  carousel.addEventListener("focusin", stopReviewsAutoplay);
  carousel.addEventListener("focusout", startReviewsAutoplay);

  updateButtons();
  startReviewsAutoplay();
};

initReviewsSection();

const videoModal = document.querySelector("[data-video-modal]");
const videoFrame = document.querySelector("[data-video-frame]");
const closeVideo = () => {
  videoModal?.classList.remove("is-open");
  if (videoFrame) videoFrame.innerHTML = "";
  setPageLock();
};

document.querySelectorAll("[data-video-id]").forEach((card) => {
  card.addEventListener("click", () => {
    const id = card.dataset.videoId;
    if (!videoModal || !videoFrame || !id) return;
    videoFrame.innerHTML = `
      <iframe
        src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0"
        title="${card.getAttribute("aria-label") || "Depoimento em vídeo"}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    `;
    videoModal.classList.add("is-open");
    setPageLock();
  });
});

document.querySelector("[data-close-video]")?.addEventListener("click", closeVideo);
videoModal?.addEventListener("click", (event) => {
  if (event.target === videoModal) closeVideo();
});

const productSlides = [...document.querySelectorAll("[data-product-slide]")];
const productProgress = document.querySelector("[data-product-progress]");
const productStage = document.querySelector("[data-product-stage]");
let activeProduct = 0;
let productAutoplay;

const showProduct = (nextIndex) => {
  if (!productSlides.length) return;
  activeProduct = (nextIndex + productSlides.length) % productSlides.length;
  productSlides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === activeProduct);
  });
  if (productProgress) {
    productProgress.style.transform = `translateX(${activeProduct * 100}%)`;
  }
};

const startProductAutoplay = () => {
  window.clearInterval(productAutoplay);
  productAutoplay = window.setInterval(() => showProduct(activeProduct + 1), 5000);
};

document.querySelector("[data-product-prev]")?.addEventListener("click", () => {
  showProduct(activeProduct - 1);
  startProductAutoplay();
});
document.querySelector("[data-product-next]")?.addEventListener("click", () => {
  showProduct(activeProduct + 1);
  startProductAutoplay();
});

let touchStartX = 0;
productStage?.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.changedTouches[0].clientX;
  },
  { passive: true },
);
productStage?.addEventListener(
  "touchend",
  (event) => {
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 55) {
      showProduct(activeProduct + (distance < 0 ? 1 : -1));
      startProductAutoplay();
    }
  },
  { passive: true },
);
productStage?.addEventListener("mouseenter", () => window.clearInterval(productAutoplay));
productStage?.addEventListener("mouseleave", startProductAutoplay);
productStage?.addEventListener("focusin", () => window.clearInterval(productAutoplay));
productStage?.addEventListener("focusout", startProductAutoplay);
startProductAutoplay();

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const wasOpen = item?.classList.contains("is-open");
    document.querySelectorAll(".faq-item").forEach((faqItem) => {
      faqItem.classList.remove("is-open");
      faqItem.querySelector("button")?.setAttribute("aria-expanded", "false");
    });
    if (item && !wasOpen) {
      item.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

const scheduleModal = document.querySelector("[data-schedule-modal]");
const openSchedule = (event) => {
  event?.preventDefault();
  scheduleModal?.classList.add("is-open");
  window.setTimeout(() => scheduleModal?.querySelector("input")?.focus(), 250);
  setPageLock();
};
const closeSchedule = () => {
  scheduleModal?.classList.remove("is-open");
  setPageLock();
};

document.querySelectorAll("[data-open-schedule]").forEach((button) => {
  button.addEventListener("click", openSchedule);
});
document.querySelector("[data-close-schedule]")?.addEventListener("click", closeSchedule);
scheduleModal?.addEventListener("click", (event) => {
  if (event.target === scheduleModal) closeSchedule();
});

const whatsappNumber = body.dataset.whatsappNumber?.replace(/\D/g, "") || "5522992458704";
const whatsappBase = whatsappNumber
  ? `https://wa.me/${whatsappNumber}`
  : "https://wa.me/5522992458704";

const openWhatsApp = (message) => {
  const url = `${whatsappBase}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openWhatsApp(
      "Olá! Vim pelo site do Centro Auditivo Macaé e gostaria de conversar sobre o teste auditivo gratuito.",
    );
  });
});

document.querySelector("[data-schedule-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get("name");
  const phone = form.get("phone");
  const period = form.get("period");
  const message = [
    "Olá! Gostaria de agendar meu teste auditivo gratuito.",
    "",
    `Nome: ${name}`,
    `Telefone: ${phone}`,
    `Melhor período: ${period}`,
  ].join("\n");
  openWhatsApp(message);
  closeSchedule();
});

const bookingForm = document.querySelector("[data-booking-form]");
const bookingNextButton = document.querySelector("[data-booking-next]");
const bookingStepLabel = document.querySelector("[data-booking-step-label]");
const bookingStepValue = document.querySelector("[data-booking-step-value]");
const bookingStepTwoFocus = document.querySelector("[data-booking-step-two-focus]");

const openBookingStepTwo = () => {
  if (!bookingForm || bookingForm.classList.contains("is-step-two")) return;
  bookingForm.classList.add("is-step-two");
  bookingForm.querySelector('[data-booking-step="2"]')?.setAttribute("aria-hidden", "false");
  if (bookingStepLabel) bookingStepLabel.textContent = "Etapa 2 de 2";
  if (bookingStepValue) bookingStepValue.textContent = "100%";
  window.setTimeout(() => {
    bookingStepTwoFocus?.focus();
    bookingStepTwoFocus?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 300);
};

bookingNextButton?.addEventListener("click", () => {
  if (!bookingForm) return;
  const visibleRequiredFields = [
    ...bookingForm.querySelectorAll('[data-booking-step="1"] [required]'),
  ];
  const hasInvalidField = visibleRequiredFields.some((field) => !field.reportValidity());
  if (hasInvalidField) return;
  openBookingStepTwo();
});

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get("booking_name") || "";
  const phone = form.get("booking_phone") || "";
  const email = form.get("booking_email") || "";
  const city = form.get("booking_city") || "";
  const presence = form.get("booking_presence") || "";
  const audiometry = form.get("booking_audiometry") || "";
  const devices = form.get("booking_devices") || "";
  const symptom = form.get("booking_symptom") || "";

  const message = [
    "Olá! Gostaria de agendar minha avaliação gratuita.",
    "",
    `Nome: ${name}`,
    `Telefone: ${phone}`,
    `E-mail: ${email || "Não informado"}`,
    `Cidade: ${city || "Não informada"}`,
    `Consegue vir presencialmente: ${presence || "Não informado"}`,
    `Audiometria: ${audiometry || "Não informado"}`,
    `Já usa aparelhos auditivos: ${devices || "Não informado"}`,
    `Sintoma: ${symptom || "Não informado"}`,
  ].join("\n");

  openWhatsApp(message);
});

// Mosaic lightbox
const mosaicLightbox = document.querySelector("[data-mosaic-lightbox]");
const mosaicLbImg = document.querySelector("[data-mosaic-lightbox-img]");
const mosaicLbLabel = document.querySelector("[data-mosaic-lightbox-label]");

const openMosaicLightbox = (src, label) => {
  if (!mosaicLightbox || !mosaicLbImg) return;
  mosaicLbImg.src = src;
  mosaicLbImg.alt = label;
  if (mosaicLbLabel) mosaicLbLabel.textContent = label;
  mosaicLightbox.classList.add("is-open");
  body.classList.add("is-locked");
};

const closeMosaicLightbox = () => {
  mosaicLightbox?.classList.remove("is-open");
  body.classList.remove("is-locked");
};

document.querySelectorAll("[data-lightbox-src]").forEach((card) => {
  card.addEventListener("click", () => {
    openMosaicLightbox(card.dataset.lightboxSrc, card.dataset.lightboxLabel || "");
  });
});

document.querySelector("[data-mosaic-close]")?.addEventListener("click", closeMosaicLightbox);
mosaicLightbox?.addEventListener("click", (e) => {
  if (e.target === mosaicLightbox) closeMosaicLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (mosaicLightbox?.classList.contains("is-open")) closeMosaicLightbox();
  if (videoModal?.classList.contains("is-open")) closeVideo();
  if (scheduleModal?.classList.contains("is-open")) closeSchedule();
  if (mobileMenu?.classList.contains("is-open")) {
    menuButton?.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("is-open");
    header?.classList.remove("menu-open");
    setPageLock();
  }
});

const year = document.querySelector("[data-current-year]");
if (year) year.textContent = new Date().getFullYear();

/* ================================================================
   Signia Showcase — Tab switching + Arrows + Auto-advance + Accordion
   ================================================================ */
(function () {
  var stage    = document.querySelector("[data-ss-stage]");
  if (!stage) return;

  var section  = stage.closest(".signia-showcase");
  var tabs     = Array.from(document.querySelectorAll(".ss-tab"));
  var panels   = Array.from(stage.querySelectorAll(".ss-panel"));
  var btnPrev  = document.querySelector("[data-ss-prev]");
  var btnNext  = document.querySelector("[data-ss-next]");
  var mobDots  = Array.from(document.querySelectorAll("[data-mob-dot]"));

  var current     = 0;
  var isAnimating = false;
  var AUTO_MS     = 5500;
  var timer       = null;

  /* ── Core: activate a tab ──────────────────────────────────────── */
  function activateTab(idx, wrap) {
    var target = wrap ? ((idx + tabs.length) % tabs.length) : idx;
    if (target === current || isAnimating) return;
    isAnimating = true;

    var outDetails = panels[current].querySelector(".ss-details.is-open");
    if (outDetails) closeAccordion(panels[current].querySelector("[data-ss-details]"), outDetails);

    panels[current].classList.remove("is-active");
    panels[current].setAttribute("aria-hidden", "true");
    tabs[current].classList.remove("is-active");
    tabs[current].setAttribute("aria-selected", "false");
    tabs[current].setAttribute("tabindex", "-1");

    current = target;
    if (section) section.dataset.ssTheme = String(target);

    setTimeout(function () {
      panels[current].classList.add("is-active");
      panels[current].removeAttribute("aria-hidden");
      tabs[current].classList.add("is-active");
      tabs[current].setAttribute("aria-selected", "true");
      tabs[current].removeAttribute("tabindex");
      mobDots.forEach(function(d) { d.classList.toggle("is-active", +d.dataset.mobDot === current); });
      isAnimating = false;
    }, 120);
  }

  /* ── Auto-advance ──────────────────────────────────────────────── */
  function startTimer() {
    clearInterval(timer);
    timer = setInterval(function () {
      activateTab(current + 1, true);
    }, AUTO_MS);
  }

  function stopTimer() { clearInterval(timer); timer = null; }

  function userInteract(idx) {
    stopTimer();
    if (idx !== undefined) activateTab(idx);
    startTimer();
  }

  startTimer();

  if (section) {
    section.addEventListener("mouseenter", stopTimer);
    section.addEventListener("mouseleave", startTimer);
    section.addEventListener("focusin",    stopTimer);
    section.addEventListener("focusout",   startTimer);
  }

  /* ── Tab clicks & keyboard ─────────────────────────────────────── */
  tabs.forEach(function (tab, idx) {
    tab.addEventListener("click", function () { userInteract(idx); });

    tab.addEventListener("keydown", function (e) {
      var next = current;
      if      (e.key === "ArrowRight") next = (current + 1) % tabs.length;
      else if (e.key === "ArrowLeft")  next = (current - 1 + tabs.length) % tabs.length;
      else if (e.key === "Home")       next = 0;
      else if (e.key === "End")        next = tabs.length - 1;
      else return;
      e.preventDefault();
      tabs[next].focus();
      userInteract(next);
    });
  });

  /* ── Arrow buttons ─────────────────────────────────────────────── */
  if (btnPrev) btnPrev.addEventListener("click", function () { userInteract(current - 1 < 0 ? tabs.length - 1 : current - 1); });
  if (btnNext) btnNext.addEventListener("click", function () { userInteract((current + 1) % tabs.length); });

  document.querySelectorAll("[data-mob-prev]").forEach(function (btn) {
    btn.addEventListener("click", function () { userInteract(current - 1 < 0 ? tabs.length - 1 : current - 1); });
  });
  document.querySelectorAll("[data-mob-next]").forEach(function (btn) {
    btn.addEventListener("click", function () { userInteract((current + 1) % tabs.length); });
  });

  /* ── Accordion ─────────────────────────────────────────────────── */
  function openAccordion(btn, details) {
    btn.setAttribute("aria-expanded", "true");
    details.classList.add("is-open");
  }

  function closeAccordion(btn, details) {
    btn.setAttribute("aria-expanded", "false");
    details.classList.remove("is-open");
  }

  stage.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-ss-details]");
    if (!btn) return;
    var details = document.getElementById(btn.getAttribute("aria-controls"));
    if (!details) return;
    if (btn.getAttribute("aria-expanded") === "true") closeAccordion(btn, details);
    else openAccordion(btn, details);
  });

  /* ── WhatsApp CTAs ─────────────────────────────────────────────── */
  stage.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-ss-whatsapp]");
    if (!btn) return;
    openWhatsApp("Olá, gostaria de saber mais sobre o " + btn.getAttribute("data-ss-whatsapp") + " e agendar uma avaliação.");
  });
}());



/* ================================================================
   Signia Showcase — Lightbox de vídeo + botão Play no círculo
   ================================================================ */
(function () {
  var lb       = document.getElementById('ss-lightbox');
  var lbVideo  = lb && lb.querySelector('[data-ss-lb-video]');
  var lbTitle  = lb && lb.querySelector('[data-ss-lb-title]');
  var lbCloses = lb && lb.querySelectorAll('[data-ss-lb-close]');
  var panels   = document.querySelectorAll('.ss-panel');

  if (!lb || !lbVideo) return;

  var lastFocus = null;

  /* ── Injetar botão Play FORA do ss-circle (overflow:hidden) ───── */
  panels.forEach(function (panel) {
    var trigger = panel.querySelector('[data-ss-lb-id]');
    var circle  = panel.querySelector('.ss-circle');
    if (!trigger || !circle) return;

    /* Wrapper relativo ao redor do círculo */
    var wrap = document.createElement('div');
    wrap.className = 'ss-circle-wrap';
    circle.parentNode.insertBefore(wrap, circle);
    wrap.appendChild(circle);

    /* Botão posicionado fora do overflow:hidden */
    var btn = document.createElement('button');
    btn.className = 'ss-circle-play';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Ver vídeo — ' + (trigger.getAttribute('data-ss-lb-name') || ''));
    btn.setAttribute('data-ss-lb-id',    trigger.getAttribute('data-ss-lb-id'));
    btn.setAttribute('data-ss-lb-start', trigger.getAttribute('data-ss-lb-start'));
    btn.setAttribute('data-ss-lb-name',  trigger.getAttribute('data-ss-lb-name'));
    btn.innerHTML =
      '<span class="ss-circle-play-icon" aria-hidden="true">' +
      '<span data-phosphor="Play" data-phosphor-size="32" data-phosphor-weight="bold"></span>' +
      '</span>' +
      '<span class="ss-circle-play-text">VER VÍDEO</span>';
    mountPhosphorIcons(btn);
    wrap.appendChild(btn);

    btn.addEventListener('click', function () { openLB(btn); });
  });

  /* ── Abrir lightbox ──────────────────────────────────────────── */
  function openLB(btn) {
    var id    = btn.getAttribute('data-ss-lb-id');
    var start = btn.getAttribute('data-ss-lb-start') || '0';
    var name  = btn.getAttribute('data-ss-lb-name')  || '';

    lastFocus = btn;

    var src =
      'https://www.youtube.com/embed/' + id +
      '?autoplay=1&start=' + start +
      '&rel=0&playsinline=1&modestbranding=1&iv_load_policy=3';

    lbVideo.innerHTML =
      '<iframe src="' + src + '"' +
      ' title="Signia ' + name + '"' +
      ' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"' +
      ' allowfullscreen></iframe>';

    lbTitle.textContent = 'Video oficial Signia — ' + name;
    lb.setAttribute('aria-label', 'Video ' + name);
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');

    setTimeout(function () {
      var closeBtn = lb.querySelector('.ss-lb-close');
      if (closeBtn) closeBtn.focus();
    }, 260);
  }

  /* ── Fechar lightbox ─────────────────────────────────────────── */
  function closeLB() {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
    setTimeout(function () { lbVideo.innerHTML = ''; lbTitle.textContent = ''; }, 260);
    if (lastFocus) { lastFocus.focus(); lastFocus = null; }
  }

  /* ── Triggers do botão "Ver em acao" ─────────────────────────── */
  document.querySelectorAll('[data-ss-lb-id]').forEach(function (btn) {
    if (!btn.classList.contains('ss-circle-play')) {
      btn.addEventListener('click', function () { openLB(btn); });
    }
  });

  /* ── Fechar via overlay e botão X ───────────────────────────── */
  if (lbCloses) lbCloses.forEach(function (el) { el.addEventListener('click', closeLB); });

  /* ── ESC ─────────────────────────────────────────────────────── */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lb.classList.contains('is-open')) { e.preventDefault(); closeLB(); }
  });

  /* ── Focus trap ──────────────────────────────────────────────── */
  lb.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var els = Array.from(lb.querySelectorAll('button,[href],[tabindex]:not([tabindex="-1"])')).filter(function(el){ return !el.disabled; });
    if (!els.length) return;
    if (e.shiftKey && document.activeElement === els[0])               { e.preventDefault(); els[els.length-1].focus(); }
    else if (!e.shiftKey && document.activeElement === els[els.length-1]) { e.preventDefault(); els[0].focus(); }
  });

  /* ── Fechar ao trocar de produto ─────────────────────────────── */
  panels.forEach(function (p) {
    new MutationObserver(function (muts) {
      muts.forEach(function (m) {
        if (!m.target.classList.contains('is-active') && lb.classList.contains('is-open')) closeLB();
      });
    }).observe(p, { attributes: true, attributeFilter: ['class'] });
  });

}());
