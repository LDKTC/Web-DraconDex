/* The official DraconDex plugins published under github.com/LDKTC.
   The baked-in values below mirror each repo's dracondex-plugin.json so the
   page is correct with JavaScript off or GitHub unreachable; on load we
   re-read the live manifests from raw.githubusercontent.com and refresh the
   version, panels, permissions and table counts in place. */
(function () {
  "use strict";

  var OWNER = "LDKTC";

  var PLUGINS = [
    {
      repo: "DraconDex-Plugin-Claude",
      icon: "message-circle",
      tagline:
        "Chat with Anthropic's Claude models inside DraconDex — as a full window or as a panel docked next to the module you are writing.",
      taglineTh:
        "คุยกับโมเดล Claude ของ Anthropic ในแอป เปิดเป็นหน้าต่างเต็มหรือ panel ข้างโมดูลที่กำลังเขียนอยู่",
      manifest: {
        id: "claude_chat",
        name: "Claude Chat",
        version: "0.1.0",
        entry: "index.html",
        files: 9,
        panels: [{ title: "Claude", icon: "💬" }],
        permissions: { net: ["https://api.anthropic.com"], context: ["module"] },
        tables: ["session", "message", "config"]
      },
      needs: "Your own Anthropic API key"
    },
    {
      repo: "DraconDex-Plugin-Codex",
      icon: "terminal",
      tagline:
        "The same chat surface wired to OpenAI — Codex/GPT models, with the OAuth sign-in flow the app's plugin runtime provides.",
      taglineTh:
        "หน้าแชทแบบเดียวกันแต่ต่อกับ OpenAI — โมเดล Codex/GPT พร้อมการล็อกอินแบบ OAuth ที่ runtime ของปลั๊กอินเตรียมไว้ให้",
      manifest: {
        id: "codex_chat",
        name: "Codex Chat",
        version: "0.1.0",
        entry: "index.html",
        files: 9,
        panels: [{ title: "Codex", icon: "🤖" }],
        permissions: {
          net: [
            "https://api.openai.com",
            "https://auth.openai.com",
            "https://chatgpt.com"
          ],
          context: ["module"]
        },
        tables: ["session", "message", "config"]
      },
      needs: "An OpenAI account or API key"
    },
    {
      repo: "DraconDex-Plugin-Ollama",
      icon: "server",
      tagline:
        "Talk to models running on your own machine through Ollama. Nothing leaves the computer — the only network permission it asks for is localhost:11434.",
      taglineTh:
        "คุยกับโมเดลที่รันในเครื่องตัวเองผ่าน Ollama ข้อมูลไม่ออกจากเครื่องเลย — ขอสิทธิ์เน็ตแค่ localhost:11434 เท่านั้น",
      manifest: {
        id: "ollama_chat",
        name: "Ollama Chat",
        version: "0.1.0",
        entry: "index.html",
        files: 9,
        panels: [{ title: "Ollama", icon: "🦙" }],
        permissions: {
          net: ["http://localhost:11434", "http://127.0.0.1:11434"],
          context: ["module"]
        },
        tables: ["session", "message", "config"]
      },
      needs: "Ollama running locally"
    },
    {
      repo: "DraconDex-Plugin-Template",
      icon: "puzzle",
      tagline:
        "A minimal, working plugin to copy when you want to build your own — one HTML entry point, one table, no permissions requested.",
      taglineTh:
        "ปลั๊กอินตัวอย่างขนาดเล็กที่ใช้งานได้จริง สำหรับก๊อปไปทำของตัวเอง — มี entry เดียว ตารางเดียว ไม่ขอสิทธิ์อะไรเลย",
      manifest: {
        id: "example_plugin",
        name: "Example Plugin",
        version: "0.1.0",
        entry: "index.html",
        files: 3,
        panels: [],
        permissions: {},
        tables: ["notes"]
      },
      starter: true
    }
  ];

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function repoUrl(p) {
    return "https://github.com/" + OWNER + "/" + p.repo;
  }

  function gitUrl(p) {
    return repoUrl(p) + ".git";
  }

  function netSummary(m) {
    var net = (m.permissions && m.permissions.net) || [];
    if (!net.length) return "none requested";
    return net
      .map(function (u) {
        return u.replace(/^https?:\/\//, "");
      })
      .join(", ");
  }

  function panelSummary(m) {
    if (!m.panels || !m.panels.length) return "separate window only";
    return m.panels
      .map(function (p) {
        return (p.icon ? p.icon + " " : "") + p.title;
      })
      .join(", ");
  }

  /* --- card ---------------------------------------------------------------
     `compact` drops the detail list — used for the teaser row on the home
     page, where the full manifest breakdown would be noise. */
  function card(p, compact) {
    var m = p.manifest;
    var box = el("article", "card plugin");
    box.dataset.plugin = p.repo;

    var head = el("div", "plugin__head");
    var emoji = el("div", "plugin__emoji");
    emoji.innerHTML = window.DDIcon ? window.DDIcon(p.icon) : "";
    head.appendChild(emoji);

    var titles = el("div");
    var h = el("h3", "plugin__title", m.name);
    titles.appendChild(h);
    var idLine = el("div", "plugin__id");
    idLine.appendChild(el("span", null, m.id));
    idLine.appendChild(document.createTextNode(" · v"));
    var ver = el("span", null, m.version);
    ver.dataset.version = "";
    idLine.appendChild(ver);
    titles.appendChild(idLine);
    head.appendChild(titles);
    box.appendChild(head);

    box.appendChild(el("p", "muted small", p.tagline));

    if (!compact) {
      if (p.taglineTh) box.appendChild(el("p", "th small", p.taglineTh));

      var dl = el("dl");
      function row(term, value, attr) {
        dl.appendChild(el("dt", null, term));
        var dd = el("dd", null, value);
        if (attr) dd.dataset[attr] = "";
        dl.appendChild(dd);
      }
      row("Panel", panelSummary(m), "panels");
      row("Network", netSummary(m), "net");
      row(
        "Own tables",
        m.tables.join(", ") + " (" + m.tables.length + ")",
        "tables"
      );
      row("Files", String(m.files) + " fetched on install", "files");
      if (p.needs) row("Needs", p.needs);
      box.appendChild(dl);

      var field = el("div", "copy-field");
      var input = el("input");
      input.type = "text";
      input.readOnly = true;
      input.value = gitUrl(p);
      input.setAttribute("aria-label", "Install link for " + m.name);
      input.addEventListener("focus", function () {
        input.select();
      });
      var copy = el("button", "btn btn--sm", "Copy");
      copy.type = "button";
      copy.addEventListener("click", function () {
        var done = function () {
          copy.textContent = "Copied";
          setTimeout(function () {
            copy.textContent = "Copy";
          }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(input.value).then(done, function () {
            input.select();
          });
        } else {
          input.select();
          document.execCommand("copy");
          done();
        }
      });
      field.appendChild(input);
      field.appendChild(copy);
      box.appendChild(field);
    }

    var foot = el("div", "plugin__foot");
    var repo = el("a", "btn btn--sm", "Source");
    repo.href = repoUrl(p);
    foot.appendChild(repo);
    if (p.starter) {
      var badge = el("span", "pill pill--accent", "starting point");
      foot.appendChild(badge);
    }
    box.appendChild(foot);

    return box;
  }

  /* --- live manifest refresh ---------------------------------------------
     raw.githubusercontent.com serves CORS-open static files and is not part
     of the API rate limit, so this is cheap. A failure is a no-op: the card
     keeps the values baked in above. */
  function refresh(p, node) {
    var url =
      "https://raw.githubusercontent.com/" +
      OWNER +
      "/" +
      p.repo +
      "/main/dracondex-plugin.json";

    fetch(url, { cache: "no-cache" })
      .then(function (res) {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then(function (live) {
        if (!live || typeof live !== "object") return;
        var m = {
          panels: live.panels || [],
          permissions: live.permissions || {},
          tables: (live.tables || []).map(function (t) {
            return t.name;
          }),
          files: (live.files || []).length
        };
        var set = function (key, value) {
          var target = node.querySelector("[data-" + key + "]");
          if (target && value) target.textContent = value;
        };
        set("version", live.version);
        set("panels", panelSummary(m));
        set("net", netSummary(m));
        if (m.tables.length) {
          set("tables", m.tables.join(", ") + " (" + m.tables.length + ")");
        }
        if (m.files) set("files", m.files + " fetched on install");
      })
      .catch(function () {
        /* keep the baked-in manifest values */
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var full = document.querySelector("[data-plugin-grid]");
    var teaser = document.querySelector("[data-plugin-teaser]");

    if (full) {
      full.textContent = "";
      PLUGINS.forEach(function (p) {
        var node = card(p, false);
        full.appendChild(node);
        refresh(p, node);
      });
    }

    if (teaser) {
      teaser.textContent = "";
      PLUGINS.forEach(function (p) {
        teaser.appendChild(card(p, true));
      });
    }

    document.querySelectorAll("[data-plugin-count]").forEach(function (node) {
      node.textContent = String(PLUGINS.length);
    });
  });
})();
