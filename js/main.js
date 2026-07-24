/* ============================================================
   シルクフラワーの山久 — 胡蝶蘭 LP  interactions
   ============================================================ */
(function () {
  "use strict";

  /* ----------------------------------------------------------
     カラーパレット定義(6色)
  ---------------------------------------------------------- */
  var PALETTES = {
    white:   { main: "#f9f7f0", edge: "#e9e2d0", lip: "#d8b64a", center: "#b8452e",
               name: "ホワイト", desc: "清楚・格調高く、どんな場面にも" },
    pink:    { main: "#f4bfd2", edge: "#e795b7", lip: "#c2417e", center: "#8e2456",
               name: "ピンク", desc: "やわらかな祝福を伝える優しい色" },
    redlip:  { main: "#f7f3ec", edge: "#e8dccb", lip: "#c53a45", center: "#8e1f2c",
               name: "紅白", desc: "縁起のよい紅白。慶事の王道" },
    purple:  { main: "#c37fc6", edge: "#a355a8", lip: "#7c2f82", center: "#57175c",
               name: "パープル", desc: "気品と風格。就任祝いに人気" },
    yellow:  { main: "#f5d968", edge: "#e8bf3e", lip: "#c8862c", center: "#a05a1a",
               name: "イエロー", desc: "金運を招く華やぎの色" },
    magenta: { main: "#d1519e", edge: "#b03380", lip: "#8e1f66", center: "#661247",
               name: "マゼンタ", desc: "空間の主役になる鮮烈な彩り" }
  };

  var SVG_NS = "http://www.w3.org/2000/svg";

  function el(name, attrs, parent) {
    var node = document.createElementNS(SVG_NS, name);
    for (var k in attrs) node.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(node);
    return node;
  }

  /* ----------------------------------------------------------
     胡蝶蘭 SVG を組み立てる
  ---------------------------------------------------------- */
  function petalPath(len, width) {
    var w = width, l = len;
    return "M0,0" +
      " C" + (-w) + "," + (-l * 0.22) + " " + (-w * 1.05) + "," + (-l * 0.72) + " 0," + (-l) +
      " C" + (w * 1.05) + "," + (-l * 0.72) + " " + w + "," + (-l * 0.22) + " 0,0 Z";
  }

  function makeFlower(size) {
    var g = el("g", { class: "orchid-flower" });
    var s = size;

    // 後方のがく片(3枚)— やや濃い縁色
    [[0, 1], [130, 0.95], [-130, 0.95]].forEach(function (cfg) {
      el("path", {
        d: petalPath(s * 0.52, s * 0.16),
        class: "petal-edge",
        transform: "rotate(" + cfg[0] + ") scale(" + cfg[1] + ")",
        opacity: "0.95"
      }, g);
    });

    // 左右の大きな花弁(2枚)
    [[68, 1], [-68, 1]].forEach(function (cfg) {
      el("path", {
        d: petalPath(s * 0.5, s * 0.3),
        class: "petal-main",
        transform: "rotate(" + cfg[0] + ") scale(" + cfg[1] + ")"
      }, g);
    });

    // 上の花弁
    el("path", {
      d: petalPath(s * 0.46, s * 0.2),
      class: "petal-main",
      transform: "rotate(0)"
    }, g);

    // リップ(唇弁)
    var lip = el("g", { transform: "translate(0," + s * 0.06 + ")" }, g);
    el("path", {
      d: "M0," + (-s * 0.04) +
         " C" + (-s * 0.12) + "," + (-s * 0.02) + " " + (-s * 0.14) + "," + (s * 0.14) + " 0," + (s * 0.2) +
         " C" + (s * 0.14) + "," + (s * 0.14) + " " + (s * 0.12) + "," + (-s * 0.02) + " 0," + (-s * 0.04) + " Z",
      class: "petal-lip"
    }, lip);
    [[-1, ""], [1, ""]].forEach(function (side) {
      el("path", {
        d: "M0,0 C" + (side[0] * s * 0.1) + "," + (-s * 0.08) + " " + (side[0] * s * 0.16) + "," + (-s * 0.04) +
           " " + (side[0] * s * 0.12) + "," + (s * 0.04) + " C" + (side[0] * s * 0.06) + "," + (s * 0.06) + " 0," + (s * 0.03) + " 0,0 Z",
        class: "petal-lip",
        opacity: "0.9"
      }, lip);
    });
    // 花芯
    el("circle", { cx: 0, cy: -s * 0.015, r: s * 0.045, class: "petal-center" }, lip);

    return g;
  }

  function makeBud(size) {
    var g = el("g", {});
    el("ellipse", { cx: 0, cy: 0, rx: size * 0.16, ry: size * 0.24, fill: "#7a9455" }, g);
    el("ellipse", { cx: -size * 0.04, cy: -size * 0.03, rx: size * 0.09, ry: size * 0.16, fill: "#94ab6b", opacity: "0.85" }, g);
    return g;
  }

  // 茎に沿った花の配置定義: [x, y, サイズ倍率, 傾き]
  var STEMS = [
    {
      path: "M250,560 C248,470 234,420 218,360 C200,295 176,250 168,180 C162,128 176,92 205,72",
      flowers: [
        [214, 402, 1.0, -12], [180, 330, 1.04, 8], [196, 262, 0.98, -6],
        [160, 208, 0.94, 10], [178, 148, 0.88, -8], [205, 100, 0.8, 6]
      ],
      buds: [[218, 66, 0.8], [232, 58, 0.6]]
    },
    {
      path: "M262,560 C270,480 290,430 306,368 C324,300 344,258 348,196 C351,150 340,116 316,96",
      flowers: [
        [298, 408, 0.98, 10], [330, 336, 1.02, -8], [318, 270, 0.95, 7],
        [352, 218, 0.9, -10], [336, 158, 0.84, 8]
      ],
      buds: [[318, 92, 0.75], [306, 80, 0.55]]
    },
    {
      path: "M256,560 C258,486 256,440 260,384 C264,320 258,276 262,220 C265,180 260,150 258,132",
      flowers: [
        [258, 348, 0.92, 4], [264, 282, 0.9, -5], [258, 226, 0.86, 6], [262, 172, 0.8, -4]
      ],
      buds: [[258, 126, 0.7]]
    }
  ];

  function buildOrchid(container) {
    if (!container) return;
    var svg = el("svg", { viewBox: "0 0 500 620", "aria-hidden": "true" });

    // 鉢
    var pot = el("g", {}, svg);
    el("path", { d: "M185,548 L315,548 L302,610 L198,610 Z", fill: "#221e19" }, pot);
    el("rect", { x: 176, y: 538, width: 148, height: 16, rx: 4, fill: "#3a332a" }, pot);
    el("rect", { x: 176, y: 538, width: 148, height: 4, rx: 2, fill: "#b39352", opacity: "0.85" }, pot);

    // 葉
    var leaves = el("g", {}, svg);
    [
      "M250,552 C190,548 140,520 118,478 C160,470 226,496 250,540 Z",
      "M250,552 C310,548 362,522 384,482 C340,472 274,498 250,540 Z",
      "M250,552 C210,540 178,504 172,462 C210,468 244,506 252,544 Z",
      "M250,552 C292,540 322,506 330,464 C292,470 258,508 250,544 Z"
    ].forEach(function (d, i) {
      el("path", { d: d, fill: i % 2 ? "#2e4a2c" : "#3b5c37" }, leaves);
    });

    // 茎と花
    STEMS.forEach(function (stem) {
      el("path", {
        d: stem.path, fill: "none", stroke: "#4c6b3f",
        "stroke-width": 5, "stroke-linecap": "round"
      }, svg);
      // 支柱イメージの細いライン
      el("path", {
        d: stem.path, fill: "none", stroke: "#b39352",
        "stroke-width": 1, "stroke-dasharray": "1 10", opacity: "0.5"
      }, svg);

      stem.buds.forEach(function (b) {
        var bud = makeBud(60 * b[2]);
        bud.setAttribute("transform", "translate(" + b[0] + "," + b[1] + ")");
        svg.appendChild(bud);
      });

      stem.flowers.forEach(function (f, idx) {
        // 位置決め用ラッパー(CSSアニメーションのtransformと衝突させない)
        var wrap = el("g", {
          transform: "translate(" + f[0] + "," + f[1] + ") rotate(" + f[3] + ")"
        }, svg);
        var flower = makeFlower(96 * f[2]);
        flower.style.animationDelay = (-idx * 1.7) + "s";
        wrap.appendChild(flower);
      });
    });

    container.appendChild(svg);
  }

  buildOrchid(document.getElementById("colorOrchid"));

  /* ----------------------------------------------------------
     カラー切替
  ---------------------------------------------------------- */
  var root = document.documentElement;
  var colorName = document.getElementById("colorName");
  var picker = document.getElementById("colorPicker");

  function applyPalette(key) {
    var p = PALETTES[key];
    if (!p) return;
    root.style.setProperty("--petal-main", p.main);
    root.style.setProperty("--petal-edge", p.edge);
    root.style.setProperty("--petal-lip", p.lip);
    root.style.setProperty("--petal-center", p.center);

    if (colorName) {
      colorName.classList.add("is-fading");
      setTimeout(function () {
        colorName.innerHTML = p.name + "<small>— " + p.desc + "</small>";
        colorName.classList.remove("is-fading");
      }, 280);
    }

    // 舞う花びらの色も追従
    document.querySelectorAll(".petal").forEach(function (petal) {
      petal.style.setProperty("--pcol", p.main);
    });
  }

  if (picker) {
    picker.addEventListener("click", function (e) {
      var btn = e.target.closest(".color-chip");
      if (!btn) return;
      picker.querySelectorAll(".color-chip").forEach(function (c) {
        c.classList.remove("is-active");
      });
      btn.classList.add("is-active");
      applyPalette(btn.dataset.color);
    });
  }

  /* ----------------------------------------------------------
     ヒーローの舞う花びら
  ---------------------------------------------------------- */
  var petalField = document.getElementById("petals");
  if (petalField && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    for (var i = 0; i < 18; i++) {
      var petal = document.createElement("span");
      petal.className = "petal";
      petal.style.left = (Math.random() * 100) + "%";
      petal.style.setProperty("--dur", (9 + Math.random() * 10).toFixed(1) + "s");
      petal.style.setProperty("--delay", (Math.random() * 12).toFixed(1) + "s");
      petal.style.setProperty("--drift", ((Math.random() - 0.5) * 220).toFixed(0) + "px");
      petal.style.setProperty("--spin", (360 + Math.random() * 540).toFixed(0) + "deg");
      petal.style.setProperty("--pscale", (0.6 + Math.random() * 0.9).toFixed(2));
      petalField.appendChild(petal);
    }
  }

  /* ----------------------------------------------------------
     ローダー & ヘッダー
  ---------------------------------------------------------- */
  var loader = document.getElementById("loader");
  var header = document.getElementById("header");

  window.addEventListener("load", function () {
    setTimeout(function () {
      if (loader) loader.classList.add("is-done");
      if (header) header.classList.add("is-visible");
    }, 900);
  });
  // フォールバック(load が遅延しても必ず開く)
  setTimeout(function () {
    if (loader) loader.classList.add("is-done");
    if (header) header.classList.add("is-visible");
  }, 2600);

  var lastY = 0;
  window.addEventListener("scroll", function () {
    var y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 60);
    lastY = y;
  }, { passive: true });

  /* ----------------------------------------------------------
     モバイルメニュー
  ---------------------------------------------------------- */
  var burger = document.getElementById("burger");
  var nav = document.querySelector(".header__nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      burger.classList.toggle("is-open");
      nav.classList.toggle("is-open");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        burger.classList.remove("is-open");
        nav.classList.remove("is-open");
      }
    });
  }

  /* ----------------------------------------------------------
     スクロールリビール & カウントアップ
  ---------------------------------------------------------- */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-inview");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll(".reveal").forEach(function (node, i) {
    node.style.transitionDelay = (i % 4) * 0.08 + "s";
    revealObserver.observe(node);
  });

  function countUp(node) {
    var target = parseInt(node.dataset.count, 10);
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / 1200, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var statObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      countUp(entry.target);
      statObserver.unobserve(entry.target);
    });
  }, { threshold: 0.6 });

  document.querySelectorAll(".stat__num[data-count]").forEach(function (node) {
    statObserver.observe(node);
  });

  /* 初期カラー適用 */
  applyPalette("white");
})();
