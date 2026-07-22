/**
 * Shared image library client (Supabase REST).
 * Source of truth is the remote database — survives site/function redeploys.
 * LocalStorage is only a cache for faster loads.
 */
(function (global) {
  const CACHE_KEY = 'chinese-shared-image-library-cache-v1';
  const PAGE_SIZE = 1000;

  const SharedImageLibrary = {
    enabled: false,
    ready: false,
    loading: null,
    /** @type {Record<string, { url: string|null, pinyin?: string, updated_at?: string }>} */
    cache: {},
    supabaseUrl: '',
    supabaseAnonKey: '',
    table: 'chinese_word_images',

    init() {
      const cfg = global.IMAGE_LIBRARY_CONFIG || {};
      this.supabaseUrl = String(cfg.supabaseUrl || '').replace(/\/$/, '');
      this.supabaseAnonKey = String(cfg.supabaseAnonKey || '');
      this.table = String(cfg.table || 'chinese_word_images');
      this.enabled = !!(this.supabaseUrl && this.supabaseAnonKey && !this.supabaseUrl.includes('YOUR_PROJECT'));

      // Hydrate from local cache immediately (stale-while-revalidate)
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === 'object') this.cache = parsed;
        }
      } catch { /* ignore */ }

      return this.enabled;
    },

    _headers(extra) {
      return Object.assign(
        {
          apikey: this.supabaseAnonKey,
          Authorization: `Bearer ${this.supabaseAnonKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        extra || {}
      );
    },

    _restBase() {
      return `${this.supabaseUrl}/rest/v1/${encodeURIComponent(this.table)}`;
    },

    _persistCache() {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(this.cache));
      } catch { /* quota */ }
    },

    /**
     * Load all shared rows into memory (paginated).
     * Safe to call multiple times; concurrent calls share one promise.
     */
    async loadAll() {
      if (!this.enabled) {
        this.ready = true;
        return this.cache;
      }
      if (this.loading) return this.loading;

      this.loading = (async () => {
        const next = {};
        let from = 0;
        try {
          for (;;) {
            const to = from + PAGE_SIZE - 1;
            const res = await fetch(
              `${this._restBase()}?select=hanzi,url,pinyin,updated_at&order=hanzi.asc`,
              {
                headers: this._headers({
                  Range: `${from}-${to}`,
                }),
              }
            );
            if (!res.ok) {
              const text = await res.text().catch(() => '');
              throw new Error(`Shared library load failed (${res.status}): ${text.slice(0, 160)}`);
            }
            const rows = await res.json();
            if (!Array.isArray(rows) || rows.length === 0) break;
            for (const row of rows) {
              if (!row || !row.hanzi) continue;
              next[row.hanzi] = {
                url: row.url === undefined ? null : row.url,
                pinyin: row.pinyin || '',
                updated_at: row.updated_at || '',
              };
            }
            if (rows.length < PAGE_SIZE) break;
            from += PAGE_SIZE;
          }
          this.cache = next;
          this._persistCache();
          this.ready = true;
        } catch (err) {
          console.warn('[SharedImageLibrary]', err.message || err);
          // Keep any previous cache; still mark ready so UI can proceed
          this.ready = true;
        } finally {
          this.loading = null;
        }
        return this.cache;
      })();

      return this.loading;
    },

    /** @returns {boolean} true if shared has an explicit entry for hanzi (including null url) */
    has(hanzi) {
      return Object.prototype.hasOwnProperty.call(this.cache, hanzi);
    },

    /**
     * @returns {{ url: string|null }|undefined} undefined = not in shared library
     */
    get(hanzi) {
      if (!this.has(hanzi)) return undefined;
      return this.cache[hanzi];
    },

    /**
     * Upsert shared image.
     * @param {string} hanzi
     * @param {string|null} url  https URL, or null for forced no-image
     * @param {{ pinyin?: string, meaning?: string, updated_by?: string }} [meta]
     */
    async set(hanzi, url, meta = {}) {
      const key = (hanzi || '').trim();
      if (!key) throw new Error('Missing Chinese word.');

      let normalized = url;
      if (normalized !== null && normalized !== undefined) {
        normalized = String(normalized).trim();
        if (!/^https:\/\//i.test(normalized)) {
          throw new Error('Image URL must start with https://');
        }
      } else {
        normalized = null;
      }

      // Optimistic local update
      this.cache[key] = {
        url: normalized,
        pinyin: meta.pinyin || (this.cache[key] && this.cache[key].pinyin) || '',
        updated_at: new Date().toISOString(),
      };
      this._persistCache();

      if (!this.enabled) {
        throw new Error('Shared library is not configured. Add Supabase keys to config.js.');
      }

      const body = {
        hanzi: key,
        url: normalized,
        pinyin: meta.pinyin || '',
        meaning: meta.meaning || '',
        updated_by: meta.updated_by || 'anon',
      };

      const res = await fetch(
        `${this._restBase()}?on_conflict=hanzi`,
        {
          method: 'POST',
          headers: this._headers({
            Prefer: 'resolution=merge-duplicates,return=representation',
          }),
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Save failed (${res.status}): ${text.slice(0, 200)}`);
      }

      const rows = await res.json().catch(() => []);
      if (Array.isArray(rows) && rows[0]) {
        this.cache[key] = {
          url: rows[0].url === undefined ? normalized : rows[0].url,
          pinyin: rows[0].pinyin || '',
          updated_at: rows[0].updated_at || '',
        };
        this._persistCache();
      }
      return this.cache[key];
    },

    /** Remove shared entry so built-in images.js (or live search) is used again. */
    async remove(hanzi) {
      const key = (hanzi || '').trim();
      if (!key) return;
      delete this.cache[key];
      this._persistCache();

      if (!this.enabled) {
        throw new Error('Shared library is not configured. Add Supabase keys to config.js.');
      }

      const res = await fetch(
        `${this._restBase()}?hanzi=eq.${encodeURIComponent(key)}`,
        {
          method: 'DELETE',
          headers: this._headers({ Prefer: 'return=minimal' }),
        }
      );
      if (!res.ok && res.status !== 404) {
        const text = await res.text().catch(() => '');
        throw new Error(`Delete failed (${res.status}): ${text.slice(0, 200)}`);
      }
    },

    statusLabel() {
      if (!this.enabled) return 'Shared library off (local/built-in only)';
      const n = Object.keys(this.cache).length;
      return `Shared library: ${n} word image(s)`;
    },
  };

  SharedImageLibrary.init();
  global.SharedImageLibrary = SharedImageLibrary;
})(typeof window !== 'undefined' ? window : globalThis);
