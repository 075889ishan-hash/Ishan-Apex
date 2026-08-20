/* =========================================================
  Delta_ApeX  — EMERGENCY MOBILE WIDTH REPAIR
   ========================================================= */

(function Delta_ApeX MobileRepair() {

    function repair() {

        const mobile = window.innerWidth <= 900;

        if (!mobile) return;

        const selectors = [
            "main",
            "#main",
            ".main",
            ".content",
            ".main-content",
            ".page-content",
            ".page-wrapper",
            ".content-wrapper",
            ".main-wrapper",
            ".dashboard",
            ".dashboard-content",
            ".container",
            ".container-fluid"
        ];

        selectors.forEach(selector => {

            document.querySelectorAll(selector)
                .forEach(el => {

                    el.style.setProperty(
                        "width",
                        "100%",
                        "important"
                    );

                    el.style.setProperty(
                        "max-width",
                        "100%",
                        "important"
                    );

                    el.style.setProperty(
                        "margin-left",
                        "0",
                        "important"
                    );

                    el.style.setProperty(
                        "margin-right",
                        "0",
                        "important"
                    );

                    el.style.setProperty(
                        "left",
                        "0",
                        "important"
                    );

                    el.style.setProperty(
                        "right",
                        "0",
                        "important"
                    );

                    el.style.setProperty(
                        "transform",
                        "none",
                        "important"
                    );

                    el.style.setProperty(
                        "box-sizing",
                        "border-box",
                        "important"
                    );
                });
        });


        /* Fix every major section */

        document.querySelectorAll(
            "section, article, header, footer, .panel, " +
            ".hero-section, .market-grid, .signal-grid, " +
            ".stats-grid, .terminal-grid"
        ).forEach(el => {

            el.style.setProperty(
                "max-width",
                "100%",
                "important"
            );

            el.style.setProperty(
                "box-sizing",
                "border-box",
                "important"
            );
        });


        /* Prevent horizontal overflow */

        document.documentElement.style.setProperty(
            "width",
            "100%",
            "important"
        );

        document.body.style.setProperty(
            "width",
            "100%",
            "important"
        );

        document.documentElement.style.setProperty(
            "max-width",
            "100%",
            "important"
        );

        document.body.style.setProperty(
            "max-width",
            "100%",
            "important"
        );

        document.documentElement.style.setProperty(
            "overflow-x",
            "hidden",
            "important"
        );

        document.body.style.setProperty(
            "overflow-x",
            "hidden",
            "important"
        );


        /* TradingView */

        document.querySelectorAll(
            ".tradingview-widget-container, " +
            ".tradingview-widget-container__widget, " +
            ".chart-container"
        ).forEach(el => {

            el.style.setProperty(
                "width",
                "100%",
                "important"
            );

            el.style.setProperty(
                "max-width",
                "100%",
                "important"
            );

            el.style.setProperty(
                "box-sizing",
                "border-box",
                "important"
            );

        });
    }


    /* Run immediately */

    repair();


    /* Run again after everything loads */

    window.addEventListener(
        "load",
        repair
    );


    /* Run after resize */

    window.addEventListener(
        "resize",
        repair
    );


    /* Run repeatedly for dynamically loaded content */

    let count = 0;

    const timer = setInterval(() => {

        repair();

        count++;

        if (count >= 20) {
            clearInterval(timer);
        }

    }, 500);

})();
/* =========================================================
   GOLD X — MOBILE LAYOUT FIX
   ========================================================= */

(function () {

    const style = document.createElement("style");

    style.id = "goldx-mobile-fix";

    style.textContent = `

        html,
        body {
            width: 100% !important;
            max-width: 100% !important;
            overflow-x: hidden !important;
        }

        @media (max-width: 1100px) {

            .sidebar {
                transform: translateX(-100%) !important;
                width: 245px !important;
            }

            .content {
                width: 100% !important;
                max-width: 100% !important;
                margin-left: 0 !important;
                padding: 20px 16px 50px !important;
            }

            .site-footer {
                width: 100% !important;
                margin-left: 0 !important;
            }

            .mobile-menu-button {
                display: grid !important;
                place-items: center !important;
            }

            .hero-section {
                width: 100% !important;
                max-width: 100% !important;
            }

            .hero-content {
                width: 100% !important;
                max-width: 100% !important;
            }

            .hero-visual {
                display: none !important;
            }

            .market-grid {
                grid-template-columns:
                    repeat(2, minmax(0, 1fr)) !important;
            }

            .signal-grid {
                grid-template-columns:
                    repeat(2, minmax(0, 1fr)) !important;
            }

            .stats-grid {
                grid-template-columns:
                    repeat(2, minmax(0, 1fr)) !important;
            }

            .indicator-grid {
                grid-template-columns:
                    repeat(2, minmax(0, 1fr)) !important;
            }

            .terminal-grid {
                grid-template-columns: 1fr !important;
            }

            .chart-container {
                width: 100% !important;
                max-width: 100% !important;
            }

            .tradingview-widget-container {
                width: 100% !important;
                max-width: 100% !important;
            }
        }

        @media (max-width: 600px) {

            .topbar {
                padding: 0 10px !important;
            }

            .brand-name {
                font-size: 13px !important;
            }

            .brand-subtitle {
                display: none !important;
            }

            .user-info {
                display: none !important;
            }

            .content {
                padding:
                    14px 10px 40px !important;
            }

            .hero-section {
                min-height: 260px !important;
                padding: 25px 18px !important;
            }

            .hero-content h1 {
                font-size: 48px !important;
            }

            .market-grid,
            .signal-grid,
            .stats-grid,
            .indicator-grid {
                grid-template-columns: 1fr !important;
            }

            .terminal-grid {
                display: block !important;
            }

            .chart-container {
                height: 500px !important;
                margin-bottom: 12px !important;
            }

            .tradingview-widget-container {
                height: 500px !important;
            }

            .terminal-sidebar {
                width: 100% !important;
            }

            .panel {
                width: 100% !important;
            }

            .form-grid {
                grid-template-columns: 1fr !important;
            }
        }

    `;

    document.head.appendChild(style);

})();
/* ============================================================
   GOLD X — PREMIUM TRADING TERMINAL
   Clean replacement script
   ============================================================ */

"use strict";

/* ============================================================
   GLOBAL STATE
   ============================================================ */

const GOLDX = {
    ready: false,
    selectedSymbol: "XAUUSD",
    notifications: [],
    watchlist: ["XAUUSD", "BTCUSD", "EURUSD"]
};


/* ============================================================
   SAFE HELPERS
   ============================================================ */

function $(selector, parent = document) {
    return parent.querySelector(selector);
}

function $$(selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector));
}

function on(element, event, handler) {
    if (element) {
        element.addEventListener(event, handler);
    }
}

function number(value, fallback = 0) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
}

function money(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number(value));
}

function round(value, decimals = 2) {
    const factor = 10 ** decimals;
    return Math.round(value * factor) / factor;
}


/* ============================================================
   TERMINAL INITIALIZATION
   ============================================================ */

function initializeTerminal() {
    try {
        setupClock();
        setupNavigation();
        setupMobileMenu();
        setupRiskCalculator();
        setupTradePlanner();
        setupNotifications();
        setupWatchlist();
        setupSettings();
        setupRevealAnimations();
        setupButtons();
        updateOnlineStatus();

        GOLDX.ready = true;

        document.documentElement.classList.add("goldx-ready");

        console.log("GOLD X terminal initialized successfully.");

    } catch (error) {
        console.error("GOLD X initialization error:", error);

        /*
         * Important:
         * Never leave the website stuck on
         * "Initializing terminal..."
         */
        GOLDX.ready = true;
        document.documentElement.classList.add("goldx-ready");
    }
}


/* ============================================================
   CLOCK
   ============================================================ */

function setupClock() {
    const clock = $("[data-clock]");

    if (!clock) {
        return;
    }

    function updateClock() {
        const now = new Date();

        clock.textContent = now.toLocaleTimeString(
            "en-GB",
            {
                hour12: false,
                timeZone: "Asia/Colombo"
            }
        );
    }

    updateClock();

    setInterval(updateClock, 1000);
}


/* ============================================================
   ONLINE STATUS
   ============================================================ */

function updateOnlineStatus() {
    const status = $("[data-online-status]");

    if (!status) {
        return;
    }

    status.textContent =
        navigator.onLine ? "ONLINE" : "OFFLINE";

    window.addEventListener("online", () => {
        status.textContent = "ONLINE";
    });

    window.addEventListener("offline", () => {
        status.textContent = "OFFLINE";
    });
}


/* ============================================================
   NAVIGATION
   ============================================================ */

function setupNavigation() {
    const links = $$(".nav-link[href]");

    links.forEach(link => {
        on(link, "click", event => {

            const href = link.getAttribute("href");

            if (!href || !href.startsWith("#")) {
                return;
            }

            const target = $(href);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            links.forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");
        });
    });


    /*
     * Automatically update sidebar selection
     * while scrolling.
     */

    const sections = [
        "dashboard",
        "markets",
        "signals",
        "terminal",
        "calculator",
        "watchlist",
        "settings"
    ]
        .map(id => document.getElementById(id))
        .filter(Boolean);


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const id = entry.target.id;

                    links.forEach(link => {

                        const active =
                            link.getAttribute("href") === `#${id}`;

                        link.classList.toggle(
                            "active",
                            active
                        );
                    });

                });

            },
            {
                threshold: 0.25,
                rootMargin: "-80px 0px -50% 0px"
            }
        );

        sections.forEach(section => {
            observer.observe(section);
        });
    }
}


/* ============================================================
   MOBILE MENU
   ============================================================ */

function setupMobileMenu() {

    const button =
        $(".mobile-menu-button");

    const sidebar =
        $(".sidebar");

    const overlay =
        $(".sidebar-overlay");

    if (!button || !sidebar) {
        return;
    }


    function toggleMenu() {

        sidebar.classList.toggle("mobile-open");

        if (overlay) {
            overlay.classList.toggle(
                "mobile-visible"
            );
        }
    }


    on(button, "click", toggleMenu);

    on(overlay, "click", toggleMenu);


    $$(".sidebar .nav-link").forEach(link => {

        on(link, "click", () => {

            sidebar.classList.remove(
                "mobile-open"
            );

            if (overlay) {
                overlay.classList.remove(
                    "mobile-visible"
                );
            }
        });

    });
}


/* ============================================================
   RISK CALCULATOR
   ============================================================ */

function setupRiskCalculator() {

    const calculator =
        $("[data-calculator]");

    if (!calculator) {
        return;
    }


    const balance =
        $("[data-balance]", calculator);

    const risk =
        $("[data-risk]", calculator);

    const stopLoss =
        $("[data-stop-loss]", calculator);

    const result =
        $("[data-risk-result]", calculator);


    function calculate() {

        const account =
            number(balance?.value);

        const riskPercent =
            number(risk?.value);

        const sl =
            number(stopLoss?.value);


        const riskAmount =
            account * (riskPercent / 100);


        /*
         * Risk amount is the maximum dollar loss.
         * Stop-loss distance is displayed for reference.
         */

        if (result) {

            result.value =
                money(riskAmount);
        }


        calculator.dataset.riskAmount =
            String(round(riskAmount, 2));

        calculator.dataset.stopLoss =
            String(round(sl, 2));
    }


    [balance, risk, stopLoss].forEach(input => {

        on(input, "input", calculate);

    });


    calculate();
}


/* ============================================================
   TRADE PLANNER
   ============================================================ */

function setupTradePlanner() {

    const calculateButton =
        $("[data-calculate-trade]");

    const clearButton =
        $("[data-clear-trade]");

    const entry =
        $("[data-entry]");

    const sl =
        $("[data-sl]");

    const tp =
        $("[data-tp]");

    const rr =
        $("[data-rr]");


    if (!calculateButton) {
        return;
    }


    function calculateTrade() {

        const entryPrice =
            number(entry?.value);

        const stopPrice =
            number(sl?.value);

        const targetPrice =
            number(tp?.value);


        if (
            entryPrice <= 0 ||
            stopPrice <= 0 ||
            targetPrice <= 0
        ) {

            if (rr) {
                rr.value = "Enter valid prices";
            }

            return;
        }


        const direction =
            $("[data-trade-direction]")?.value ||
            "BUY";


        let riskDistance;
        let rewardDistance;


        if (direction === "SELL") {

            riskDistance =
                stopPrice - entryPrice;

            rewardDistance =
                entryPrice - targetPrice;

        } else {

            riskDistance =
                entryPrice - stopPrice;

            rewardDistance =
                targetPrice - entryPrice;
        }


        if (
            riskDistance <= 0 ||
            rewardDistance <= 0
        ) {

            if (rr) {
                rr.value = "Check BUY / SELL prices";
            }

            return;
        }


        const ratio =
            rewardDistance / riskDistance;


        if (rr) {
            rr.value =
                `1 : ${round(ratio, 2)}`;
        }
    }


    on(
        calculateButton,
        "click",
        calculateTrade
    );


    on(clearButton, "click", () => {

        if (entry) entry.value = "";
        if (sl) sl.value = "";
        if (tp) tp.value = "";

        if (rr) {
            rr.value = "—";
        }
    });


    [entry, sl, tp].forEach(input => {

        on(input, "input", calculateTrade);

    });
}


/* ============================================================
   SYMBOL SELECTION
   ============================================================ */

function selectSymbol(symbol) {

    GOLDX.selectedSymbol = symbol;


    const currentSymbol =
        $("[data-current-symbol]");

    if (currentSymbol) {
        currentSymbol.textContent =
            symbol;
    }


    /*
     * Update active quick-symbol button.
     */

    $$("[data-symbol]").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.symbol === symbol
        );

    });


    /*
     * Update visible live price from
     * the existing market card.
     */

    const source =
        $(`[data-price="${symbol}"]`);

    const livePrice =
        $("[data-live-price]");


    if (source && livePrice) {
        livePrice.textContent =
            source.textContent;
    }
}


/* ============================================================
   QUICK SYMBOL BUTTONS
   ============================================================ */

function setupButtons() {

    $$("[data-symbol]").forEach(button => {

        on(button, "click", () => {

            const symbol =
                button.dataset.symbol;

            if (symbol) {
                selectSymbol(symbol);
            }

        });

    });


    /*
     * Default symbol.
     */

    selectSymbol("XAUUSD");
}


/* ============================================================
   NOTIFICATIONS
   ============================================================ */

function setupNotifications() {

    const button =
        $("[data-notifications]");

    if (!button) {
        return;
    }


    on(button, "click", () => {

        showNotification(
            "GOLD X",
            "Terminal is running normally."
        );

    });
}


function showNotification(title, message) {

    GOLDX.notifications.push({
        title,
        message,
        time: new Date()
    });


    const toast =
        document.createElement("div");

    toast.className =
        "goldx-toast";


    toast.innerHTML = `
        <div class="goldx-toast-title">
            ${escapeHTML(title)}
        </div>

        <div class="goldx-toast-message">
            ${escapeHTML(message)}
        </div>
    `;


    Object.assign(toast.style, {

        position: "fixed",
        right: "20px",
        bottom: "20px",
        zIndex: "99999",
        minWidth: "250px",
        maxWidth: "340px",
        padding: "14px 16px",
        border: "1px solid rgba(214,168,79,.25)",
        borderRadius: "12px",
        background: "rgba(10,14,21,.96)",
        color: "#e7ebf2",
        boxShadow: "0 15px 45px rgba(0,0,0,.45)",
        backdropFilter: "blur(18px)",
        opacity: "0",
        transform: "translateY(10px)",
        transition: "all .25s ease"
    });


    document.body.appendChild(toast);


    requestAnimationFrame(() => {

        toast.style.opacity = "1";
        toast.style.transform =
            "translateY(0)";

    });


    setTimeout(() => {

        toast.style.opacity = "0";
        toast.style.transform =
            "translateY(10px)";

        setTimeout(() => {
            toast.remove();
        }, 300);

    }, 3000);
}


/* ============================================================
   WATCHLIST
   ============================================================ */

function setupWatchlist() {

    const addButton =
        $("[data-add-watchlist]");

    if (!addButton) {
        return;
    }


    on(addButton, "click", () => {

        const symbol =
            prompt(
                "Enter symbol:",
                "XAUUSD"
            );


        if (!symbol) {
            return;
        }


        const clean =
            symbol.trim().toUpperCase();


        if (!clean) {
            return;
        }


        if (GOLDX.watchlist.includes(clean)) {

            showNotification(
                "Watchlist",
                `${clean} is already in your watchlist.`
            );

            return;
        }


        GOLDX.watchlist.push(clean);


        showNotification(
            "Watchlist",
            `${clean} added successfully.`
        );
    });
}


/* ============================================================
   SETTINGS
   ============================================================ */

function setupSettings() {

    const theme =
        $("[data-theme]");

    const defaultSymbol =
        $("[data-default-symbol]");


    on(theme, "change", () => {

        const value =
            theme.value;

        localStorage.setItem(
            "goldx-theme",
            value
        );


        if (value === "light") {

            document.body.classList.add(
                "goldx-light"
            );

        } else {

            document.body.classList.remove(
                "goldx-light"
            );
        }

    });


    on(defaultSymbol, "change", () => {

        selectSymbol(
            defaultSymbol.value
        );

        localStorage.setItem(
            "goldx-symbol",
            defaultSymbol.value
        );

    });


    /*
     * Restore preferences.
     */

    const savedSymbol =
        localStorage.getItem(
            "goldx-symbol"
        );


    if (
        savedSymbol &&
        defaultSymbol
    ) {

        defaultSymbol.value =
            savedSymbol;

        selectSymbol(savedSymbol);

    }


    const savedTheme =
        localStorage.getItem(
            "goldx-theme"
        );


    if (
        savedTheme &&
        theme
    ) {

        theme.value =
            savedTheme;

        if (savedTheme === "light") {
            document.body.classList.add(
                "goldx-light"
            );
        }
    }
}


/* ============================================================
   SCROLL REVEAL
   ============================================================ */

function setupRevealAnimations() {

    const elements =
        $(
            ".market-card, " +
            ".signal-card, " +
            ".stat-card, " +
            ".indicator-card, " +
            ".panel"
        );


    if (!elements.length) {
        return;
    }


    elements.forEach(element => {
        element.classList.add("reveal");
    });


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(element => {
            element.classList.add("visible");
        });

        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.08
            }
        );


    elements.forEach(element => {
        observer.observe(element);
    });
}


/* ============================================================
   ESCAPE HTML
   ============================================================ */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* ============================================================
   PREMIUM CSS PATCH
   ============================================================ */

function injectPremiumStyles() {

    if ($("#goldx-runtime-styles")) {
        return;
    }


    const style =
        document.createElement("style");

    style.id =
        "goldx-runtime-styles";


    style.textContent = `

        .goldx-ready {
            opacity: 1 !important;
        }

        .text-green {
            color: #39d98a !important;
        }

        .text-red {
            color: #ff5d6c !important;
        }

        .text-muted {
            color: #7c8798 !important;
        }

        .goldx-toast-title {
            color: #f0ca73;
            font-size: 11px;
            font-weight: 900;
            margin-bottom: 5px;
        }

        .goldx-toast-message {
            color: #aeb8c7;
            font-size: 9px;
            line-height: 1.5;
        }

        .mobile-open {
            transform: translateX(0) !important;
        }

        .mobile-visible {
            display: block !important;
            position: fixed;
            inset: 64px 0 0 0;
            background: rgba(0,0,0,.55);
            z-index: 700;
        }

        .goldx-light {
            background: #f4f6fa !important;
            color: #151922 !important;
        }

        .goldx-light .panel,
        .goldx-light .market-card,
        .goldx-light .signal-card,
        .goldx-light .stat-card {
            background: #ffffff !important;
            color: #151922 !important;
        }

        .goldx-light .sidebar,
        .goldx-light .topbar {
            background: #ffffff !important;
        }

        @media (max-width: 900px) {

            .sidebar {
                transform: translateX(-100%);
                transition: transform .25s ease;
            }

            .content {
                width: 100%;
                margin-left: 0;
                padding: 20px 16px 45px;
            }

            .site-footer {
                margin-left: 0;
            }

            .mobile-menu-button {
                display: grid;
                place-items: center;
                width: 34px;
                height: 34px;
            }

            .top-center {
                display: none;
            }

            .hero-section {
                padding: 30px;
            }

            .hero-visual {
                display: none;
            }

            .market-grid,
            .signal-grid,
            .stats-grid,
            .indicator-grid {
                grid-template-columns:
                    repeat(2, minmax(0, 1fr));
            }

            .terminal-grid,
            .two-column-grid,
            .dashboard-grid {
                grid-template-columns: 1fr;
            }

            .terminal-sidebar {
                grid-row: auto;
            }
        }

        @media (max-width: 600px) {

            .brand-subtitle {
                display: none;
            }

            .user-info {
                display: none;
            }

            .content {
                padding: 14px 11px 35px;
            }

            .hero-section {
                min-height: 290px;
                padding: 25px 20px;
            }

            .hero-content h1 {
                font-size: 52px;
            }

            .market-grid,
            .signal-grid,
            .stats-grid,
            .indicator-grid,
            .form-grid {
                grid-template-columns: 1fr;
            }

            .chart-container {
                height: 480px;
            }

            .tradingview-widget-container {
                height: 480px;
            }

            .hero-buttons {
                flex-wrap: wrap;
            }
        }
    `;


    document.head.appendChild(style);
}


/* ============================================================
   STARTUP
   ============================================================ */

function startGoldX() {

    injectPremiumStyles();

    initializeTerminal();
}


/*
 * DOMContentLoaded is the main startup point.
 */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        startGoldX,
        {
            once: true
        }
    );

} else {

    startGoldX();

}


/* ============================================================
   ERROR PROTECTION
   ============================================================ */

window.addEventListener(
    "error",
    event => {

        console.error(
            "GOLD X runtime error:",
            event.error || event.message
        );

        /*
         * Never allow a JS error to make the
         * terminal permanently appear frozen.
         */

        GOLDX.ready = true;
    }
);


/* ============================================================
   FINAL
   ============================================================ */

console.log(
    "%c GOLD X ",
    "background:#d6a84f;color:#080b10;font-weight:900;padding:6px 10px;border-radius:6px;"
);

console.log(
    "Premium trading terminal loaded."
);
