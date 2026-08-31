/* Release data for the download buttons and the download page.
   Reads a static JSON file committed straight into THIS repo — no live call
   to api.github.com from the visitor's browser, and so no rate limit either.
   The anonymous GitHub API is capped at 60 requests/hour PER IP; fine for one
   visitor, but a shared office/campus NAT or a traffic spike can exhaust it
   for everyone behind that IP at once, and every entry point below would
   fall back to a plain link to the Releases page.

   The app's source repository (LDKTC/App-DraconDex) is private, so it has
   nothing this site could read directly anyway. Its build workflows mirror
   every release — notes and assets alike — onto THIS repo
   (LDKTC/Web-DraconDex) as a normal GitHub Release, then snapshot that
   release list into assets/data/releases.json via the Contents API (see
   .github/scripts/update-web-releases-json.sh in the app repo). The file's
   shape is the raw GitHub API response, unmodified, so nothing below that
   parses it needed to change when the source moved from a live fetch to a
   static one. A separate public mirror, LDKTC/Release-DraconDex, still
   exists — the in-app update check on both the desktop and the Android
   build reads that one, unrelated to this page. */
(function () {
  "use strict";

  var RELEASE_REPO = "LDKTC/Web-DraconDex";
  var STATIC_DATA_URL = "assets/data/releases.json";
  var RELEASES_URL = "https://github.com/" + RELEASE_REPO + "/releases";
  var CACHE_KEY = "dracondex-releases";
  var CACHE_MS = 10 * 60 * 1000;

  /* --- release streams ---------------------------------------------------
     The app repository publishes two independent release lines from the same
     tag list: the Electron desktop app on `v<x.y.z>` tags (build-electron.yml)
     and the Flutter Android app on `flutter-v<x.y.z>` tags (build-apk.yml).
     Their version numbers are unrelated and the newest release overall may be
     either one, so every consumer here filters by stream first — otherwise an
     APK release shipping an hour after a desktop one turns the Windows
     download button into a list of .apk files. */
  function streamOf(release) {
    return /^flutter-v/i.test(release.tag_name || "") ? "android" : "desktop";
  }

  function inStream(releases, stream) {
    return releases.filter(function (r) {
      return streamOf(r) === stream;
    });
  }

  /* --- ordering ----------------------------------------------------------
     GET /releases is ordered by each release's created_at, and created_at is
     the date of the COMMIT the tag points at — not the date the release was
     published. Tag a fix that sits on an older commit and its release sorts
     BELOW releases published days earlier: flutter-v2.10.0 and flutter-v2.10.1
     both landed underneath flutter-v2.9.0 in the real feed. Taking releases[0]
     therefore offered 2.9.0 as the newest Android build while 2.10.1 was out,
     and the same trap is one badly-timed tag away on the desktop stream.
     Compare version numbers instead, which has no such failure mode. */
  function versionOf(release) {
    return String(release.tag_name || "").replace(/^flutter-/i, "").replace(/^v/i, "");
  }

  function compareVersions(a, b) {
    var pa = a.split(".");
    var pb = b.split(".");
    var len = Math.max(pa.length, pb.length);
    for (var i = 0; i < len; i++) {
      var d = (parseInt(pa[i], 10) || 0) - (parseInt(pb[i], 10) || 0);
      if (d) return d;
    }
    return 0;
  }

  /* Newest version first. Sorting a copy keeps the cached array — which is
     shared by the desktop and Android passes — in the order GitHub sent it. */
  function byVersionDesc(releases) {
    return releases.slice().sort(function (a, b) {
      return compareVersions(versionOf(b), versionOf(a));
    });
  }

  function newestStable(releases) {
    var ranked = byVersionDesc(releases);
    return (
      ranked.filter(function (r) {
        return !r.prerelease;
      })[0] || ranked[0] || null
    );
  }

  /* --- asset classification ---------------------------------------------
     Desktop asset names come from .github/workflows/build-electron.yml in the
     app repo: DraconDex-Setup-<v>.exe, DraconDex-Portable-<v>.exe,
     DraconDex-<v>-win-x64.zip, checksums-sha256.txt. Android names come from
     build-apk.yml: DraconDex-<v>-<abi>-release.apk for each split ABI, plus an
     unqualified DraconDex-<v>-release.apk carrying all three. Order matters —
     kindOf() returns the first match, so the ABI tests have to run before the
     catch-all .apk one. */
  var KINDS = {
    installer: {
      icon: "wand-sparkles",
      label: "Windows installer",
      note: "Normal install/uninstall, shortcuts, data in %APPDATA%/DraconDex",
      test: function (n) {
        return /-setup-.*\.exe$/i.test(n);
      }
    },
    portable: {
      icon: "footprints",
      label: "Portable .exe",
      note: "Single file, nothing installed — data sits next to the exe",
      test: function (n) {
        return /-portable-.*\.exe$/i.test(n);
      }
    },
    zip: {
      icon: "archive",
      label: "Portable folder (zip)",
      note: "Unzip and run DraconDex.exe — the whole folder travels on a USB stick",
      test: function (n) {
        return /win-x64\.zip$/i.test(n);
      }
    },
    apkArm64: {
      icon: "smartphone",
      label: "Android APK · arm64-v8a",
      note: "Nearly every phone and tablet made since 2017 — start here",
      test: function (n) {
        return /-arm64-v8a-release\.apk$/i.test(n);
      }
    },
    apkArm32: {
      icon: "smartphone",
      label: "Android APK · armeabi-v7a",
      note: "Older 32-bit ARM devices",
      test: function (n) {
        return /-armeabi-v7a-release\.apk$/i.test(n);
      }
    },
    apkX64: {
      icon: "smartphone",
      label: "Android APK · x86_64",
      note: "Emulators and the handful of Intel/AMD Android devices",
      test: function (n) {
        return /-x86_64-release\.apk$/i.test(n);
      }
    },
    apkUniversal: {
      icon: "package",
      label: "Android APK · universal",
      note: "All three ABIs in one file — larger, but always the right one",
      test: function (n) {
        return /\.apk$/i.test(n);
      }
    },
    checksums: {
      icon: "lock",
      label: "SHA-256 checksums",
      note: "Verify a download before running it",
      test: function (n) {
        return /^checksums/i.test(n);
      }
    },
    other: { icon: "package", label: "Asset", note: "", test: function () {
      return true;
    } }
  };

  var KIND_ORDER = [
    "installer",
    "portable",
    "zip",
    "apkArm64",
    "apkArm32",
    "apkX64",
    "apkUniversal",
    "checksums",
    "other"
  ];

  function kindOf(name) {
    for (var i = 0; i < KIND_ORDER.length; i++) {
      var k = KIND_ORDER[i];
      if (KINDS[k].test(name)) return k;
    }
    return "other";
  }

  function formatSize(bytes) {
    if (!bytes && bytes !== 0) return "";
    var mb = bytes / (1024 * 1024);
    if (mb >= 1) return mb.toFixed(1) + " MB";
    return Math.max(1, Math.round(bytes / 1024)) + " KB";
  }

  function formatDate(iso) {
    if (!iso) return "";
    var d = new Date(iso);
    if (isNaN(d)) return "";
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  function isWindows() {
    var p = (navigator.userAgentData && navigator.userAgentData.platform) || "";
    return /win/i.test(p || navigator.platform || navigator.userAgent);
  }

  function isAndroid() {
    var p = (navigator.userAgentData && navigator.userAgentData.platform) || "";
    return /android/i.test(p || navigator.userAgent);
  }

  /* --- fetching ---------------------------------------------------------- */
  function readCache() {
    try {
      var raw = sessionStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      var box = JSON.parse(raw);
      if (!box || Date.now() - box.at > CACHE_MS) return null;
      return box.data;
    } catch (e) {
      return null;
    }
  }

  function writeCache(data) {
    try {
      sessionStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ at: Date.now(), data: data })
      );
    } catch (e) {
      /* storage full or blocked — the request just isn't cached */
    }
  }

  var pending = null;

  function load() {
    if (pending) return pending;
    var cached = readCache();
    if (cached) {
      pending = Promise.resolve(cached);
      return pending;
    }
    pending = fetch(STATIC_DATA_URL)
      .then(function (res) {
        if (!res.ok) throw new Error("Release data responded " + res.status);
        return res.json();
      })
      .then(function (list) {
        if (!Array.isArray(list)) throw new Error("Unexpected API response");
        var published = list.filter(function (r) {
          return !r.draft;
        });
        writeCache(published);
        return published;
      });
    return pending;
  }

  /* --- hero / nav download button ----------------------------------------
     Always the desktop stream: these buttons offer a Windows build. */
  function fillPrimaryButtons(latest) {
    if (!latest) return;

    var assets = latest.assets || [];
    var preferred = null;
    for (var i = 0; i < assets.length && !preferred; i++) {
      if (kindOf(assets[i].name) === "installer") preferred = assets[i];
    }

    document.querySelectorAll("[data-latest-download]").forEach(function (el) {
      // Windows visitors get the installer itself. Android visitors are sent
      // to the APK section rather than a Windows .exe. Everyone else keeps the
      // Releases page link the markup ships with.
      if (preferred && isWindows()) {
        el.href = preferred.browser_download_url;
        var label = el.querySelector("[data-download-label]");
        if (label) label.textContent = "Download for Windows";
      } else if (isAndroid()) {
        el.href = "download.html#android";
        var androidLabel = el.querySelector("[data-download-label]");
        if (androidLabel) androidLabel.textContent = "Get the Android APK";
      }
      var sub = el.querySelector("[data-download-sub]");
      // The desktop version and size say nothing about the APK, so the
      // Android button carries no sub-label.
      if (sub && !isAndroid()) {
        sub.textContent =
          latest.tag_name +
          (preferred ? " · " + formatSize(preferred.size) : "");
      }
    });

    document.querySelectorAll("[data-latest-version]").forEach(function (el) {
      el.textContent = latest.tag_name;
    });
    document.querySelectorAll("[data-latest-date]").forEach(function (el) {
      el.textContent = formatDate(latest.published_at);
    });
    document.querySelectorAll("[data-latest-notes]").forEach(function (el) {
      el.href = latest.html_url;
    });
    document.querySelectorAll("[data-latest-meta]").forEach(function (el) {
      el.hidden = false;
    });
  }

  /* --- download page ------------------------------------------------------ */
  function assetRow(asset, featured) {
    var kind = kindOf(asset.name);
    var meta = KINDS[kind];

    var row = document.createElement("div");
    row.className = "asset" + (featured ? " asset--featured" : "");

    var icon = document.createElement("div");
    icon.className = "asset__icon";
    icon.innerHTML = window.DDIcon ? window.DDIcon(meta.icon) : "";

    var body = document.createElement("div");
    body.className = "asset__body";

    var title = document.createElement("div");
    title.className = "asset__name";
    title.textContent = meta.label;

    var sub = document.createElement("div");
    sub.className = "asset__meta";
    sub.textContent =
      asset.name +
      " · " +
      formatSize(asset.size) +
      (meta.note ? " · " + meta.note : "");

    body.appendChild(title);
    body.appendChild(sub);

    var link = document.createElement("a");
    link.className = "btn" + (featured ? " btn--primary" : "");
    link.href = asset.browser_download_url;
    link.textContent = "Download";
    link.setAttribute("aria-label", "Download " + asset.name);

    row.appendChild(icon);
    row.appendChild(body);
    row.appendChild(link);
    return row;
  }

  function sortAssets(assets) {
    return assets.slice().sort(function (a, b) {
      return KIND_ORDER.indexOf(kindOf(a.name)) -
        KIND_ORDER.indexOf(kindOf(b.name));
    });
  }

  function renderLatest(host, release, featuredKind) {
    host.textContent = "";
    if (!release.assets || !release.assets.length) {
      var empty = document.createElement("p");
      empty.className = "muted";
      empty.textContent =
        "This release has no attached files. Open it on GitHub to see what it contains.";
      host.appendChild(empty);
      return;
    }
    sortAssets(release.assets).forEach(function (asset) {
      host.appendChild(assetRow(asset, kindOf(asset.name) === featuredKind));
    });
  }

  function renderHistory(host, releases) {
    host.textContent = "";
    if (!releases.length) {
      host.innerHTML =
        '<p class="muted">No earlier releases yet.</p>';
      return;
    }
    releases.forEach(function (release) {
      var box = document.createElement("details");
      box.className = "release";

      var summary = document.createElement("summary");
      var name = document.createElement("span");
      name.textContent = release.tag_name;
      summary.appendChild(name);

      if (release.prerelease) {
        var pre = document.createElement("span");
        pre.className = "pill pill--warn";
        pre.textContent = "pre-release";
        summary.appendChild(pre);
      }

      var when = document.createElement("span");
      when.className = "muted small";
      when.textContent = formatDate(release.published_at);
      summary.appendChild(when);
      box.appendChild(summary);

      var list = document.createElement("div");
      list.className = "release__assets";
      sortAssets(release.assets || []).forEach(function (asset) {
        var a = document.createElement("a");
        a.href = asset.browser_download_url;
        a.textContent = asset.name + " (" + formatSize(asset.size) + ")";
        list.appendChild(a);
      });

      var notes = document.createElement("a");
      notes.href = release.html_url;
      notes.textContent = "Release notes on GitHub →";
      list.appendChild(notes);

      box.appendChild(list);
      host.appendChild(box);
    });
  }

  function failure(host, err) {
    if (!host) return;
    host.innerHTML = "";
    var p = document.createElement("p");
    p.className = "is-error";
    p.textContent =
      "Could not load the release list (" +
      err.message +
      "). The downloads are always available directly:";
    var a = document.createElement("a");
    a.className = "btn btn--primary";
    a.href = RELEASES_URL;
    a.textContent = "Open Releases on GitHub";
    host.appendChild(p);
    host.appendChild(a);
  }

  /* --- android downloads --------------------------------------------------
     The APK section on download.html, fed from the flutter-v* stream. Its
     version number is independent of the desktop app's, so it carries its own
     meta line rather than reusing [data-latest-*]. */
  function fillAndroidMeta(release) {
    document.querySelectorAll("[data-apk-version]").forEach(function (el) {
      el.textContent = release.tag_name.replace(/^flutter-/i, "");
    });
    document.querySelectorAll("[data-apk-date]").forEach(function (el) {
      el.textContent = formatDate(release.published_at);
    });
    document.querySelectorAll("[data-apk-notes]").forEach(function (el) {
      el.href = release.html_url;
    });
    document.querySelectorAll("[data-apk-meta]").forEach(function (el) {
      el.hidden = false;
    });
  }

  function renderAndroid(host, releases) {
    var latest = newestStable(releases);
    if (!latest) {
      host.innerHTML =
        '<p class="muted">No APK release has been published yet. The section below builds one from source.</p>';
      return;
    }
    fillAndroidMeta(latest);
    renderLatest(host, latest, "apkArm64");
  }

  /* --- boot -------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    var latestHost = document.querySelector("[data-latest-assets]");
    var historyHost = document.querySelector("[data-release-history]");
    var androidHost = document.querySelector("[data-apk-assets]");
    var needsButtons = document.querySelector("[data-latest-download]");

    if (!latestHost && !historyHost && !androidHost && !needsButtons) return;

    load()
      .then(function (releases) {
        var desktop = inStream(releases, "desktop");
        var android = inStream(releases, "android");

        fillPrimaryButtons(newestStable(desktop));

        if (androidHost) renderAndroid(androidHost, android);

        if (!desktop.length) {
          if (latestHost) {
            latestHost.innerHTML =
              '<p class="muted">No releases have been published yet. Builds can be produced from source — see the app repository.</p>';
          }
          if (historyHost) historyHost.innerHTML = "";
          return;
        }

        var latest = newestStable(desktop);

        if (latestHost) renderLatest(latestHost, latest, "installer");
        if (historyHost) {
          renderHistory(
            historyHost,
            byVersionDesc(desktop).filter(function (r) {
              return r.id !== latest.id;
            })
          );
        }
      })
      .catch(function (err) {
        failure(latestHost, err);
        failure(androidHost, err);
        if (historyHost) {
          historyHost.innerHTML =
            '<p class="muted">Earlier releases are listed on <a href="' +
            RELEASES_URL +
            '">GitHub</a>.</p>';
        }
      });
  });
})();
