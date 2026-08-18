/* =========================================================
   GOLD X — PREMIUM TRADING TERMINAL
   JAVASCRIPT ENGINE
   ========================================================= */

"use strict";

/* =========================================================
   GLOBAL CONFIG
   ========================================================= */

const GOLDX = {
    brand: "GOLD X",
    version: "1.0.0",

    symbols: [
        "XAUUSD",
        "BTCUSD",
        "EURUSD",
        "GBPUSD",
        "USDJPY",
        "ETHUSD"
    ],

    defaultSymbol: "XAUUSD",

    prices: {
        XAUUSD: 3345.20,
        BTCUSD: 118420.00,
        EURUSD: 1.1684,
        GBPUSD: 1.3532,
        USDJPY: 147.42,
        ETHUSD: 4520.80
    },

    previousPrices: {},

    settings: {
        sound: true,
        notifications: true,
        autoRefresh: true
    }
};


/* =========================================================
   DOM HELPERS
   ========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


function createElement(tag, className = "", text = "") {

    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (text) {
        element.textContent = text;
    }

    return element;
}


/* =========================================================
   NUMBER FORMAT
   ========================================================= */

function formatPrice(value, symbol = "XAUUSD") {

    if (!Number.isFinite(value)) {
        return "—";
    }

    if (
        symbol === "EURUSD" ||
        symbol === "GBPUSD"
    ) {
        return value.toFixed(4);
    }

    if (symbol === "USDJPY") {
        return value.toFixed(2);
    }

    if (
        symbol === "BTCUSD" ||
        symbol === "ETHUSD"
    ) {
        return value.toLocaleString(
            "en-US",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );
    }

    return value.toFixed(2);
}


function formatPercent(value) {

    if (!Number.isFinite(value)) {
        return "0.00%";
    }

    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}


/* =========================================================
   PRICE ENGINE
   ========================================================= */

function randomMovement(symbol) {

    const price = GOLDX.prices[symbol];

    if (!Number.isFinite(price)) {
        return;
    }

    let volatility;

    switch (symbol) {

        case "XAUUSD":
            volatility = 1.8;
            break;

        case "BTCUSD":
            volatility = 180;
            break;

        case "ETHUSD":
            volatility = 12;
            break;

        case "EURUSD":
        case "GBPUSD":
            volatility = 0.0007;
            break;

        case "USDJPY":
            volatility = 0.08;
            break;

        default:
            volatility = price * 0.0003;
    }

    const movement =
        (Math.random() - 0.5) *
        volatility;

    GOLDX.previousPrices[symbol] =
        GOLDX.prices[symbol];

    GOLDX.prices[symbol] =
        Math.max(
            0,
            GOLDX.prices[symbol] + movement
        );
}


/* =========================================================
   PRICE UPDATE UI
   ========================================================= */

function updatePriceElements() {

    GOLDX.symbols.forEach(symbol => {

        randomMovement(symbol);

        const current =
            GOLDX.prices[symbol];

        const previous =
            GOLDX.previousPrices[symbol];

        const change =
            previous
                ? ((current - previous) / previous) * 100
                : 0;

        const priceText =
            formatPrice(
                current,
                symbol
            );

        const priceElements =
            $$(
                `[data-price="${symbol}"]`
            );

        priceElements.forEach(element => {

            element.textContent =
                priceText;

            element.classList.remove(
                "price-up",
                "price-down"
            );

            void element.offsetWidth;

            if (current >= previous) {

                element.classList.add(
                    "price-up"
                );

            } else {

                element.classList.add(
                    "price-down"
                );
            }
        });


        const changeElements =
            $$(
                `[data-change="${symbol}"]`
            );

        changeElements.forEach(element => {

            element.textContent =
                formatPercent(change);

            element.classList.remove(
                "text-green",
                "text-red"
            );

            element.classList.add(
                change >= 0
                    ? "text-green"
                    : "text-red"
            );
        });
    });


    updateCurrentSymbol();
}


/* =========================================================
   CURRENT SYMBOL
   ========================================================= */

let currentSymbol =
    GOLDX.defaultSymbol;


function updateCurrentSymbol() {

    const price =
        GOLDX.prices[currentSymbol];

    const priceText =
        formatPrice(
            price,
            currentSymbol
        );


    $$("[data-live-price]")
        .forEach(element => {

            element.textContent =
                priceText;
        });


    $$("[data-current-symbol]")
        .forEach(element => {

            element.textContent =
                currentSymbol;
        });
}


/* =========================================================
   SYMBOL SELECTOR
   ========================================================= */

function setupSymbolSelectors() {

    $$("[data-symbol]").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const symbol =
                    button.dataset.symbol;

                if (!GOLDX.symbols.includes(symbol)) {
                    return;
                }

                currentSymbol =
                    symbol;


                $$("[data-symbol]")
                    .forEach(item => {

                        item.classList.remove(
                            "active"
                        );
                    });


                button.classList.add(
                    "active"
                );


                updateCurrentSymbol();

                showToast(
                    `${symbol} selected`,
                    "success"
                );
            }
        );
    });
}


/* =========================================================
   LIVE CLOCK
   ========================================================= */

function updateClock() {

    const now =
        new Date();


    const time =
        now.toLocaleTimeString(
            "en-GB",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );


    const date =
        now.toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );


    $$("[data-clock]")
        .forEach(element => {

            element.textContent =
                time;
        });


    $$("[data-date]")
        .forEach(element => {

            element.textContent =
                date;
        });
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

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

        sidebar.classList.toggle(
            "mobile-open"
        );

        if (overlay) {

            overlay.classList.toggle(
                "active"
            );
        }
    }


    button.addEventListener(
        "click",
        toggleMenu
    );


    if (overlay) {

        overlay.addEventListener(
            "click",
            toggleMenu
        );
    }


    $$(".nav-link")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    sidebar.classList.remove(
                        "mobile-open"
                    );

                    if (overlay) {

                        overlay.classList.remove(
                            "active"
                        );
                    }
                }
            );
        });
}


/* =========================================================
   NAVIGATION
   ========================================================= */

function setupNavigation() {

    const links =
        $$(".nav-link");


    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const target =
                    link.getAttribute(
                        "href"
                    );


                if (
                    target &&
                    target.startsWith("#")
                ) {

                    const section =
                        $(target);

                    if (section) {

                        event.preventDefault();

                        section.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });
                    }
                }


                links.forEach(item => {

                    item.classList.remove(
                        "active"
                    );
                });


                link.classList.add(
                    "active"
                );
            }
        );
    });
}


/* =========================================================
   SEARCH
   ========================================================= */

function setupSearch() {

    const inputs =
        $$(
            '[data-search]'
        );


    inputs.forEach(input => {

        input.addEventListener(
            "input",
            () => {

                const query =
                    input.value
                        .trim()
                        .toLowerCase();


                const items =
                    $$(
                        "[data-search-item]"
                    );


                items.forEach(item => {

                    const text =
                        item.textContent
                            .toLowerCase();


                    item.style.display =
                        !query ||
                        text.includes(query)
                            ? ""
                            : "none";
                });
            }
        );
    });
}


/* =========================================================
   TABS
   ========================================================= */

function setupTabs() {

    $$("[data-tab-button]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const target =
                        button.dataset.tabButton;


                    $$("[data-tab-button]")
                        .forEach(item => {

                            item.classList.remove(
                                "active"
                            );
                        });


                    button.classList.add(
                        "active"
                    );


                    $$("[data-tab-panel]")
                        .forEach(panel => {

                            panel.style.display =
                                panel.dataset.tabPanel === target
                                    ? ""
                                    : "none";
                        });
                }
            );
        });
}


/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function setupNotifications() {

    const buttons =
        $$("[data-notifications]");


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const panel =
                    $(".notification-panel");

                if (!panel) {
                    return;
                }

                panel.classList.toggle(
                    "active"
                );
            }
        );
    });


    document.addEventListener(
        "click",
        event => {

            const panel =
                $(".notification-panel");

            if (!panel) {
                return;
            }


            const clickedButton =
                event.target.closest(
                    "[data-notifications]"
                );


            if (
                !clickedButton &&
                !panel.contains(
                    event.target
                )
            ) {

                panel.classList.remove(
                    "active"
                );
            }
        }
    );
}


/* =========================================================
   TOAST SYSTEM
   ========================================================= */

function createToastContainer() {

    let container =
        $(".toast-container");


    if (!container) {

        container =
            createElement(
                "div",
                "toast-container"
            );


        container.style.position =
            "fixed";

        container.style.right =
            "18px";

        container.style.bottom =
            "18px";

        container.style.zIndex =
            "9999";

        container.style.display =
            "flex";

        container.style.flexDirection =
            "column";

        container.style.gap =
            "8px";


        document.body.appendChild(
            container
        );
    }


    return container;
}


function showToast(
    message,
    type = "info"
) {

    const container =
        createToastContainer();


    const toast =
        createElement(
            "div",
            "toast"
        );


    toast.textContent =
        message;


    toast.style.padding =
        "11px 15px";

    toast.style.borderRadius =
        "9px";

    toast.style.border =
        "1px solid rgba(255,255,255,0.08)";

    toast.style.background =
        "#0d121c";

    toast.style.color =
        "#d9e0ea";

    toast.style.fontSize =
        "9px";

    toast.style.fontWeight =
        "700";

    toast.style.boxShadow =
        "0 12px 35px rgba(0,0,0,0.35)";


    if (type === "success") {

        toast.style.borderColor =
            "rgba(57,217,138,0.25)";
    }


    if (type === "danger") {

        toast.style.borderColor =
            "rgba(255,93,108,0.25)";
    }


    container.appendChild(
        toast
    );


    setTimeout(
        () => {

            toast.style.opacity =
                "0";

            toast.style.transform =
                "translateY(8px)";


            setTimeout(
                () => toast.remove(),
                250
            );

        },
        2600
    );
}


/* =========================================================
   COPY BUTTONS
   ========================================================= */

function setupCopyButtons() {

    $$("[data-copy]")
        .forEach(button => {

            button.addEventListener(
                "click",
                async () => {

                    const value =
                        button.dataset.copy;


                    if (!value) {
                        return;
                    }


                    try {

                        await navigator.clipboard.writeText(
                            value
                        );

                        showToast(
                            "Copied successfully",
                            "success"
                        );

                    } catch {

                        showToast(
                            "Copy failed",
                            "danger"
                        );
                    }
                }
            );
        });
}


/* =========================================================
   CALCULATOR
   ========================================================= */

function setupCalculator() {

    const calculator =
        $("[data-calculator]");


    if (!calculator) {
        return;
    }


    const balance =
        calculator.querySelector(
            "[data-balance]"
        );


    const risk =
        calculator.querySelector(
            "[data-risk]"
        );


    const stopLoss =
        calculator.querySelector(
            "[data-stop-loss]"
        );


    const result =
        calculator.querySelector(
            "[data-risk-result]"
        );


    function calculate() {

        const accountBalance =
            parseFloat(
                balance?.value
            ) || 0;


        const riskPercent =
            parseFloat(
                risk?.value
            ) || 0;


        const sl =
            parseFloat(
                stopLoss?.value
            ) || 0;


        const riskMoney =
            accountBalance *
            (riskPercent / 100);


        if (result) {

            result.textContent =
                `$${riskMoney.toFixed(2)}`;
        }


        const lotResult =
            calculator.querySelector(
                "[data-lot-result]"
            );


        if (lotResult) {

            const estimatedLot =
                sl > 0
                    ? riskMoney / (sl * 100)
                    : 0;


            lotResult.textContent =
                estimatedLot.toFixed(2);
        }
    }


    [
        balance,
        risk,
        stopLoss
    ]
    .forEach(input => {

        input?.addEventListener(
            "input",
            calculate
        );
    });


    calculate();
}


/* =========================================================
   RISK BAR
   ========================================================= */

function setupRiskMeters() {

    $$("[data-risk-meter]")
        .forEach(meter => {

            const value =
                parseFloat(
                    meter.dataset.riskMeter
                ) || 0;


            const fill =
                meter.querySelector(
                    ".risk-meter-fill"
                );


            if (!fill) {
                return;
            }


            const safeValue =
                Math.min(
                    Math.max(
                        value,
                        0
                    ),
                    100
                );


            fill.style.width =
                `${safeValue}%`;
        });
}


/* =========================================================
   COUNTDOWN
   ========================================================= */

function setupCountdowns() {

    $$("[data-countdown]")
        .forEach(element => {

            const seconds =
                parseInt(
                    element.dataset.countdown,
                    10
                );


            if (!Number.isFinite(seconds)) {
                return;
            }


            let remaining =
                seconds;


            function render() {

                const minutes =
                    Math.floor(
                        remaining / 60
                    );


                const secs =
                    remaining % 60;


                element.textContent =
                    `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
            }


            render();


            const timer =
                setInterval(
                    () => {

                        remaining--;

                        render();


                        if (remaining <= 0) {

                            clearInterval(
                                timer
                            );

                            element.textContent =
                                "00:00";
                        }

                    },
                    1000
                );
        });
}


/* =========================================================
   WATCHLIST
   ========================================================= */

function setupWatchlist() {

    $$("[data-watch-symbol]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const symbol =
                        button.dataset.watchSymbol;


                    if (
                        !GOLDX.symbols.includes(
                            symbol
                        )
                    ) {
                        return;
                    }


                    currentSymbol =
                        symbol;


                    updateCurrentSymbol();


                    showToast(
                        `${symbol} loaded`,
                        "success"
                    );
                }
            );
        });
}


/* =========================================================
   LOCAL STORAGE SETTINGS
   ========================================================= */

function loadSettings() {

    try {

        const saved =
            localStorage.getItem(
                "goldx-settings"
            );


        if (saved) {

            const parsed =
                JSON.parse(saved);


            GOLDX.settings =
                {
                    ...GOLDX.settings,
                    ...parsed
                };
        }

    } catch {
        console.warn(
            "Could not load GOLD X settings."
        );
    }
}


function saveSettings() {

    try {

        localStorage.setItem(
            "goldx-settings",
            JSON.stringify(
                GOLDX.settings
            )
        );

    } catch {
        console.warn(
            "Could not save GOLD X settings."
        );
    }
}


/* =========================================================
   SETTINGS TOGGLES
   ========================================================= */

function setupSettings() {

    $$("[data-setting]")
        .forEach(input => {

            const setting =
                input.dataset.setting;


            if (
                Object.prototype.hasOwnProperty.call(
                    GOLDX.settings,
                    setting
                )
            ) {

                input.checked =
                    Boolean(
                        GOLDX.settings[
                            setting
                        ]
                    );
            }


            input.addEventListener(
                "change",
                () => {

                    GOLDX.settings[
                        setting
                    ] =
                        input.checked;


                    saveSettings();


                    showToast(
                        `${setting} ${input.checked ? "enabled" : "disabled"}`,
                        "success"
                    );
                }
            );
        });
}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function setupRevealAnimations() {

    const elements =
        $$(
            ".reveal, .market-card, .panel, .signal-card"
        );


    if (
        !("IntersectionObserver" in window)
    ) {
        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

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
                    }
                );

            },
            {
                threshold: 0.08
            }
        );


    elements.forEach(
        element => {

            element.classList.add(
                "reveal"
            );

            observer.observe(
                element
            );
        }
    );
}


/* =========================================================
   BACK TO TOP
   ========================================================= */

function setupBackToTop() {

    const button =
        $("[data-back-top]");


    if (!button) {
        return;
    }


    window.addEventListener(
        "scroll",
        () => {

            button.style.opacity =
                window.scrollY > 500
                    ? "1"
                    : "0";

            button.style.pointerEvents =
                window.scrollY > 500
                    ? "auto"
                    : "none";
        }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    );
}


/* =========================================================
   KEYBOARD SHORTCUTS
   ========================================================= */

function setupKeyboardShortcuts() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.ctrlKey &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();


                const search =
                    $(
                        '[data-search]'
                    );


                search?.focus();
            }


            if (
                event.key === "Escape"
            ) {

                $(".notification-panel")
                    ?.classList.remove(
                        "active"
                    );


                $(".sidebar")
                    ?.classList.remove(
                        "mobile-open"
                    );


                $(".sidebar-overlay")
                    ?.classList.remove(
                        "active"
                    );
            }
        }
    );
}


/* =========================================================
   ONLINE STATUS
   ========================================================= */

function setupOnlineStatus() {

    function update() {

        const online =
            navigator.onLine;


        $$("[data-online-status]")
            .forEach(element => {

                element.textContent =
                    online
                        ? "ONLINE"
                        : "OFFLINE";


                element.classList.toggle(
                    "text-green",
                    online
                );


                element.classList.toggle(
                    "text-red",
                    !online
                );
            });


        if (!online) {

            showToast(
                "Internet connection lost",
                "danger"
            );

        }
    }


    window.addEventListener(
        "online",
        update
    );


    window.addEventListener(
        "offline",
        update
    );


    update();
}


/* =========================================================
   PAGE LOADER
   ========================================================= */

function hideLoader() {

    const loader =
        $(".page-loader");


    if (!loader) {
        return;
    }


    loader.classList.add(
        "loaded"
    );


    setTimeout(
        () => loader.remove(),
        700
    );
}


/* =========================================================
   LIVE UPDATE LOOP
   ========================================================= */

function startLiveEngine() {

    updatePriceElements();


    if (
        GOLDX.settings.autoRefresh
    ) {

        setInterval(
            () => {

                updatePriceElements();

            },
            2000
        );
    }
}


/* =========================================================
   INIT
   ========================================================= */

function initGoldX() {

    loadSettings();

    setupSymbolSelectors();

    setupMobileMenu();

    setupNavigation();

    setupSearch();

    setupTabs();

    setupNotifications();

    setupCopyButtons();

    setupCalculator();

    setupRiskMeters();

    setupCountdowns();

    setupWatchlist();

    setupSettings();

    setupRevealAnimations();

    setupBackToTop();

    setupKeyboardShortcuts();

    setupOnlineStatus();

    updateClock();

    setInterval(
        updateClock,
        1000
    );

    startLiveEngine();

    hideLoader();


    console.log(
        `%c GOLD X Trading Terminal %c ${GOLDX.version} `,
        "background:#d6a84f;color:#05070b;font-weight:bold;padding:5px 8px;",
        "background:#111722;color:#d6a84f;padding:5px 8px;"
    );
}


/* =========================================================
   START
   ========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initGoldX
    );

} else {

    initGoldX();
}
