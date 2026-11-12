/* Coastal Peak Elite Services — Digital Business Card
   Renders everything from window.CARD (config.js). No edits needed here. */
(function () {
  "use strict";

  var C = window.CARD || {};

  /* ---------------- Icons (thin line, 24px grid) ---------------- */
  var ICON = {
    phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 6 9 7 9-7"/>',
    insta: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    pin: '<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    save: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/>',
    share: '<path d="M12 3v13M7 8l5-5 5 5"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="1"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',
    download: '<path d="M12 3v13M7 11l5 5 5-5M5 21h14"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>'
  };
  function icon(name, cls) {
    return '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON[name] + "</svg>";
  }

  /* ---------------- Helpers ---------------- */
  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function digits(p) { return String(p || "").replace(/[^\d+]/g, ""); }
  function telHref() {
    var d = digits(C.phone);
    if (d.charAt(0) !== "+") d = (d.length === 10 ? "+1" : "+") + d;
    return "tel:" + d;
  }
  function mailHref() {
    return "mailto:" + C.email + (C.emailSubject ? "?subject=" + encodeURIComponent(C.emailSubject) : "");
  }
  function igHandle() { return String(C.instagram || "").replace(/^@/, ""); }
  function igHref() { return "https://www.instagram.com/" + encodeURIComponent(igHandle()) + "/"; }
  function webHref() {
    var w = String(C.website || "").trim();
    if (!w) return "";
    return /^https?:\/\//i.test(w) ? w : "https://" + w;
  }
  function prettyUrl(u) { return u.replace(/^https?:\/\//, "").replace(/\/$/, ""); }
  function cardUrl() {
    if (C.cardUrl) return C.cardUrl;
    var u = location.href.split("#")[0].replace(/[?&]edit(=[^&]*)?/, "").replace(/\?$/, "");
    return /^https?:/.test(u) ? u : (webHref() || u);
  }
  function fullName() { return [C.companyName, C.companySuffix].filter(Boolean).join(" "); }

  var toastTimer;
  function toast(msg) {
    var t = $("toast");
    t.textContent = msg;
    t.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("is-visible"); }, 2400);
  }

  /* ---------------- Logo ---------------- */
  var logoDataUrl = null; // used to embed the logo in the .vcf contact photo

  function monogram() {
    var initials = String(C.companyName || "CP").split(/\s+/).map(function (w) { return w.charAt(0); }).join("").slice(0, 2).toUpperCase();
    return '<div class="monogram" aria-hidden="true">' + esc(initials) + "</div>";
  }

  function renderLogo() {
    var box = $("logo");
    box.className = "logo";
    loadContactPhoto();
    if (!C.logo) { box.innerHTML = monogram(); setNameVisible(); return; }
    var img = new Image();
    img.alt = (C.legalName || fullName()) + " logo";
    img.onload = function () {
      box.innerHTML = "";
      if (C.logoPlate === "ivory") box.classList.add("logo--plate");
      var hide = !!C.hideNameWhenLogo;
      box.classList.toggle("logo--full", hide);
      $("name").classList.toggle("sr-only", hide);
      $("front").classList.toggle("hero--logo", hide);
      box.appendChild(img);
      if (!C.contactPhoto) captureLogo(img);
    };
    img.onerror = function () { box.innerHTML = monogram(); setNameVisible(); };
    img.src = C.logo;
  }

  function setNameVisible() {
    $("name").classList.remove("sr-only");
    $("front").classList.remove("hero--logo");
  }

  function loadContactPhoto() {
    logoDataUrl = null;
    if (!C.contactPhoto) return;
    var p = new Image();
    p.onload = function () { captureLogo(p); };
    p.src = C.contactPhoto;
  }

  function captureLogo(img) {
    try {
      var max = 400, s = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
      var cv = document.createElement("canvas");
      cv.width = Math.round(img.naturalWidth * s);
      cv.height = Math.round(img.naturalHeight * s);
      var ctx = cv.getContext("2d");
      ctx.fillStyle = "#0D1B2A";
      ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.drawImage(img, 0, 0, cv.width, cv.height);
      logoDataUrl = cv.toDataURL("image/jpeg", 0.88);
    } catch (e) { logoDataUrl = null; }
  }

  /* ---------------- Text bindings ---------------- */
  function renderText() {
    var derived = { metaLead: C.hideNameWhenLogo && C.logo ? (C.legalName || C.industry) : C.industry, industryShort: "HVAC · " + (C.city || "Charleston"), state: C.state === "SC" ? "South Carolina" : C.state };
    document.querySelectorAll("[data-bind]").forEach(function (el) {
      var k = el.getAttribute("data-bind");
      el.textContent = k in derived ? derived[k] : (C[k] || "");
    });
    $("year").textContent = new Date().getFullYear();
    document.title = fullName() + " — " + (C.industry || "HVAC") + ", " + (C.city || "") + " " + (C.state || "");
  }

  /* ---------------- Buttons ---------------- */
  function btn(opts) {
    var tag = opts.href ? "a" : "button";
    var attrs = opts.href
      ? ' href="' + esc(opts.href) + '"' + (opts.external ? ' target="_blank" rel="noopener"' : "")
      : ' type="button" data-action="' + opts.action + '"';
    return "<" + tag + ' class="btn ' + opts.cls + '"' + attrs + ">" + icon(opts.icon) + "<span>" + esc(opts.label) + "</span></" + tag + ">";
  }

  function renderActions() {
    $("heroActions").innerHTML =
      btn({ href: telHref(), cls: "btn--gold", icon: "phone", label: "Call" }) +
      btn({ href: mailHref(), cls: "btn--line", icon: "mail", label: "Email" }) +
      btn({ action: "save", cls: "btn--line btn--wide", icon: "save", label: "Save Contact" });

    $("saveRow").innerHTML =
      btn({ action: "save", cls: "btn--ink", icon: "save", label: "Save Contact" }) +
      btn({ action: "share", cls: "btn--ink-line", icon: "share", label: "Share" });

    $("shareActions").innerHTML =
      btn({ action: "share", cls: "btn--gold", icon: "share", label: "Share Card" }) +
      btn({ action: "copy", cls: "btn--line", icon: "copy", label: "Copy Link" }) +
      btn({ action: "qr", cls: "btn--line", icon: "download", label: "Download QR" });

    $("quickbar").innerHTML =
      '<a href="' + esc(telHref()) + '">' + icon("phone") + "Call</a>" +
      '<a href="' + esc(mailHref()) + '">' + icon("mail") + "Email</a>" +
      '<button type="button" data-action="save">' + icon("save") + "Save</button>" +
      '<button type="button" data-action="share">' + icon("share") + "Share</button>";
  }

  /* ---------------- Contact rows ---------------- */
  function row(label, value, href, external, sub, muted) {
    var inner =
      '<span class="row__label">' + esc(label) + "</span>" +
      '<span class="row__value">' + esc(value) + (sub ? "<small>" + esc(sub) + "</small>" : "") + "</span>" +
      (href ? icon("arrow", "row__go") : "<span></span>");
    var body = href
      ? '<a href="' + esc(href) + '"' + (external ? ' target="_blank" rel="noopener"' : "") + ">" + inner + "</a>"
      : "<div>" + inner + "</div>";
    return '<li class="row' + (muted ? " row--muted" : "") + '">' + body + "</li>";
  }

  function renderContact() {
    var html = "";
    if (C.phone) html += row("Phone", C.phone, telHref());
    if (C.email) html += row("Email", C.email, mailHref());
    if (C.instagram) html += row("Instagram", "@" + igHandle(), igHref(), true);
    var w = webHref();
    if (w) html += row("Website", prettyUrl(w), w, true);
    else if (C.websitePlaceholder) html += row("Website", C.websitePlaceholder, null, false, null, true);
    var areas = (C.serviceArea || []).slice(0, 3).join(", ");
    html += row("Service Area", (C.city || "Charleston") + ", " + (C.state || "SC"), "#area", false, areas ? areas + " & more" : "");
    $("contactRows").innerHTML = html;
  }

  /* ---------------- About / services / area ---------------- */
  function renderAbout() {
    $("about").hidden = !C.showAbout;
    $("clients").innerHTML = (C.clients || []).map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("");
  }

  function renderServices() {
    $("serviceList").innerHTML = (C.services || []).map(function (s, i) {
      return '<li class="service"><span class="service__num">' + String(i + 1).padStart(2, "0") + "</span>" +
        '<h3 class="service__title">' + esc(s.title) + "</h3>" +
        (s.description ? '<p class="service__desc">' + esc(s.description) + "</p>" : "") + "</li>";
    }).join("");
  }

  function renderArea() {
    var list = C.serviceArea || [];
    $("areaList").innerHTML = list.map(function (a) { return "<li>" + esc(a) + "</li>"; }).join("") +
      (list.length % 2 ? "<li aria-hidden=\"true\"></li>" : "");
  }

  /* ---------------- QR code ---------------- */
  function qrSvg(text, fg, bg) {
    var q = window.QRGen(text), n = q.getModuleCount(), m = 2, size = n + m * 2, d = "";
    for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) if (q.isDark(r, c)) d += "M" + (c + m) + " " + (r + m) + "h1v1h-1z";
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + size + " " + size + '" shape-rendering="crispEdges">' +
      '<rect width="100%" height="100%" fill="' + bg + '"/><path fill="' + fg + '" d="' + d + '"/></svg>';
  }

  function renderQR() {
    var url = cardUrl();
    try { $("qr").innerHTML = qrSvg(url, "#0D1B2A", "#F5F5F5"); } catch (e) { $("qr").textContent = "QR unavailable"; }
    $("shareUrl").textContent = prettyUrl(url);
  }

  function downloadQR() {
    var svg = qrSvg(cardUrl(), "#0D1B2A", "#FFFFFF");
    var img = new Image();
    img.onload = function () {
      var px = 1200, cv = document.createElement("canvas");
      cv.width = cv.height = px;
      var ctx = cv.getContext("2d");
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, px, px);
      cv.toBlob(function (b) { saveBlob(b, "Coastal-Peak-QR.png"); toast("QR code downloaded"); }, "image/png");
    };
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  /* ---------------- vCard ---------------- */
  function vEsc(s) { return String(s || "").replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/([,;])/g, "\\$1"); }
  function fold(line) { // RFC 6350: lines max 75 octets
    var out = [], s = line;
    while (s.length > 74) { out.push(s.slice(0, 74)); s = " " + s.slice(74); }
    out.push(s);
    return out.join("\r\n");
  }

  function buildVCard() {
    var org = C.legalName || fullName();
    var services = (C.services || []).map(function (s) { return s.title; }).join(", ");
    var areas = (C.serviceArea || []).join(", ");
    var note = (C.tagline || "") + "\nServices: " + services + "\nService area: " + areas + (C.serviceAreaNote ? " " + C.serviceAreaNote : "");
    var L = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:;;;;",
      "FN:" + vEsc(fullName()),
      "ORG:" + vEsc(org),
      "TITLE:" + vEsc(C.industry || "HVAC"),
      "TEL;TYPE=WORK,VOICE:" + telHref().replace("tel:", ""),
      "EMAIL;TYPE=INTERNET,WORK:" + C.email,
      "ADR;TYPE=WORK:;;;" + vEsc(C.city) + ";" + vEsc(C.state) + ";;" + vEsc(C.country),
    ];
    if (/^https?:/.test(cardUrl())) L.push("URL;TYPE=Card:" + cardUrl());
    if (webHref()) L.push("URL;TYPE=Website:" + webHref());
    if (C.instagram) {
      L.push("X-SOCIALPROFILE;TYPE=instagram:" + igHref());
      L.push("item1.URL:" + igHref());
      L.push("item1.X-ABLabel:Instagram");
    }
    L.push("NOTE:" + vEsc(note));
    if (logoDataUrl) {
      var m = logoDataUrl.match(/^data:image\/(png|jpe?g);base64,(.+)$/i);
      if (m) L.push("PHOTO;ENCODING=b;TYPE=" + (m[1].toLowerCase() === "png" ? "PNG" : "JPEG") + ":" + m[2]);
    }
    L.push("X-ABShowAs:COMPANY");
    L.push("END:VCARD");
    return L.map(fold).join("\r\n") + "\r\n";
  }

  function saveBlob(blob, name) {
    var url = URL.createObjectURL(blob), a = document.createElement("a");
    a.href = url; a.download = name; a.rel = "noopener";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  function saveContact() {
    var vcf = buildVCard(), name = C.vcardFileName || "contact.vcf";
    var blob = new Blob([vcf], { type: "text/vcard;charset=utf-8" });
    var ua = navigator.userAgent;
    var inApp = /Instagram|FBAN|FBAV|Line\/|LinkedInApp/i.test(ua);
    // In-app browsers (Instagram, Facebook) block downloads: offer the file via the share sheet instead.
    if (inApp && navigator.canShare) {
      try {
        var file = new File([blob], name, { type: "text/vcard" });
        if (navigator.canShare({ files: [file] })) { navigator.share({ files: [file], title: fullName() }).catch(function () {}); return; }
      } catch (e) {}
    }
    saveBlob(blob, name);
    toast("Contact card downloaded");
  }

  /* ---------------- Share ---------------- */
  function copyLink() {
    var url = cardUrl();
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = url; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); toast("Link copied"); } catch (e) { toast(url); }
      ta.remove();
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(url).then(function () { toast("Link copied"); }, fallback);
    else fallback();
  }

  function share() {
    var data = { title: fullName(), text: fullName() + " — " + (C.tagline || ""), url: cardUrl() };
    if (navigator.share) navigator.share(data).catch(function (e) { if (e && e.name !== "AbortError") copyLink(); });
    else copyLink();
  }

  /* ---------------- Events ---------------- */
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-action]");
    if (!el) return;
    var a = el.getAttribute("data-action");
    if (a === "save") saveContact();
    else if (a === "share") share();
    else if (a === "copy") copyLink();
    else if (a === "qr") downloadQR();
  });

  function setupQuickbar() {
    var bar = $("quickbar"), front = $("front");
    if (!("IntersectionObserver" in window)) { bar.classList.add("is-visible"); return; }
    new IntersectionObserver(function (entries) {
      bar.classList.toggle("is-visible", !entries[0].isIntersecting);
    }, { threshold: 0.15 }).observe(front);
  }

  /* ---------------- Render ---------------- */
  function render() {
    renderText(); renderLogo(); renderActions(); renderContact();
    renderAbout(); renderServices(); renderArea(); renderQR();
  }
  window.renderCard = render;

  render();
  setupQuickbar();

  /* ---------------- Visual editor (?edit) ---------------- */
  if (/[?&]edit\b/.test(location.search)) loadEditor();

  function loadEditor() {
    var FIELDS = [
      ["Identity"],
      ["companyName", "Company name"], ["companySuffix", "Second line"], ["legalName", "Legal name"],
      ["tagline", "Tagline"], ["industry", "Industry"], ["location", "Location line"],
      ["Logo"],
      ["logo", "Logo path or upload", "logo"],
      ["logoPlate", "Logo background", "select", ["none", "ivory"]],
      ["hideNameWhenLogo", "Hide text name when logo is shown", "check"],
      ["contactPhoto", "Contact photo (square image path)"],
      ["Contact"],
      ["phone", "Phone"], ["email", "Email"], ["emailSubject", "Email subject"],
      ["instagram", "Instagram handle (no @)"],
      ["website", "Website (leave blank until live)"], ["websitePlaceholder", "Website placeholder text"],
      ["cardUrl", "Card address for QR (blank = automatic)"],
      ["Introduction"],
      ["showAbout", "Show introduction section", "check"],
      ["aboutTitle", "Introduction heading"], ["about", "Introduction text", "area"],
      ["clients", "Who you serve (one per line)", "list"],
      ["Services"],
      ["services", "One per line:  Title | Description", "services"],
      ["Service area"],
      ["serviceAreaIntro", "Heading"], ["serviceArea", "Cities (one per line)", "list"], ["serviceAreaNote", "Note under list"],
      ["Contact file"],
      ["city", "City"], ["state", "State"], ["country", "Country"], ["vcardFileName", "File name"]
    ];

    var html = '<aside class="editor" aria-label="Card editor"><div class="editor__head"><strong>Edit card</strong>' +
      '<button type="button" class="btn btn--ink-line" id="edClose" style="min-height:40px">Close</button></div><div class="editor__body">';
    FIELDS.forEach(function (f) {
      if (f.length === 1) { html += "<h4>" + esc(f[0]) + "</h4>"; return; }
      var k = f[0], label = f[1], type = f[2], v = C[k];
      if (type === "check") html += '<label class="field field--check"><input type="checkbox" data-k="' + k + '"' + (v ? " checked" : "") + "><span>" + esc(label) + "</span></label>";
      else if (type === "select") html += '<label class="field"><span>' + esc(label) + '</span><select data-k="' + k + '">' + f[3].map(function (o) { return "<option" + (o === v ? " selected" : "") + ">" + o + "</option>"; }).join("") + "</select></label>";
      else if (type === "area") html += '<label class="field"><span>' + esc(label) + '</span><textarea data-k="' + k + '">' + esc(v) + "</textarea></label>";
      else if (type === "list") html += '<label class="field"><span>' + esc(label) + '</span><textarea data-k="' + k + '" data-t="list">' + esc((v || []).join("\n")) + "</textarea></label>";
      else if (type === "services") html += '<label class="field"><span>' + esc(label) + '</span><textarea data-k="' + k + '" data-t="services" style="min-height:180px">' + esc((v || []).map(function (s) { return s.title + " | " + (s.description || ""); }).join("\n")) + "</textarea></label>";
      else if (type === "logo") html += '<label class="field"><span>' + esc(label) + '</span><input data-k="logo" value="' + esc(String(v).indexOf("data:") === 0 ? "" : v) + '" placeholder="assets/logo.png"></label>' +
        '<label class="field"><span>Preview a logo file</span><input type="file" accept="image/*" id="edLogo"></label>';
      else html += '<label class="field"><span>' + esc(label) + '</span><input data-k="' + k + '" value="' + esc(v) + '"></label>';
    });
    html += '<p class="editor__hint">Changes preview instantly. When you\'re happy, tap <b>Download config.js</b> and replace the file of the same name in your project folder, then re-upload. If you previewed a new logo, also save that image as <b>assets/logo.png</b>.</p>';
    html += '</div><div class="editor__foot"><button type="button" class="btn btn--ink-line" id="edVcf">Test .vcf</button><button type="button" class="btn btn--ink" id="edSave">Download config.js</button></div></aside>';

    document.body.insertAdjacentHTML("beforeend", html);
    document.body.classList.add("editor-open");

    var ed = document.querySelector(".editor");
    ed.addEventListener("input", function (e) {
      var el = e.target, k = el.getAttribute("data-k");
      if (!k) return;
      var t = el.getAttribute("data-t");
      if (el.type === "checkbox") C[k] = el.checked;
      else if (t === "list") C[k] = el.value.split("\n").map(function (s) { return s.trim(); }).filter(Boolean);
      else if (t === "services") C[k] = el.value.split("\n").filter(function (s) { return s.trim(); }).map(function (line) {
        var p = line.split("|"); return { title: p[0].trim(), description: (p.slice(1).join("|") || "").trim() };
      });
      else C[k] = el.value;
      render();
    });
    $("edLogo").addEventListener("change", function (e) {
      var f = e.target.files[0]; if (!f) return;
      var r = new FileReader();
      r.onload = function () { C.logo = r.result; render(); toast("Logo previewed — save it as assets/logo.png"); };
      r.readAsDataURL(f);
    });
    $("edClose").addEventListener("click", function () { ed.remove(); document.body.classList.remove("editor-open"); });
    $("edVcf").addEventListener("click", saveContact);
    $("edSave").addEventListener("click", function () {
      var out = JSON.parse(JSON.stringify(C));
      if (String(out.logo).indexOf("data:") === 0) out.logo = "assets/logo.png";
      var js = "/* Coastal Peak digital business card — settings. Edit text between quotes, or open the card with ?edit */\n\nwindow.CARD = " + JSON.stringify(out, null, 2) + ";\n";
      saveBlob(new Blob([js], { type: "text/javascript" }), "config.js");
      toast("config.js downloaded");
    });
  }
})();
