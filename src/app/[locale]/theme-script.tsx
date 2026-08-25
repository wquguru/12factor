export default function ThemeScript() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var theme = localStorage.getItem('theme') || 'system';
                var root = document.documentElement;
                var isDark = theme === 'dark' ||
                  (theme === 'system' &&
                   window.matchMedia('(prefers-color-scheme: dark)').matches);
                root.classList.toggle('dark', isDark);
              } catch (e) {
                // Fall through: the page renders in the light theme.
              } finally {
                // Always release the anti-FOUC mask, on every path.
                document.documentElement.setAttribute('data-theme-ready', 'true');
              }
            })();
          `,
        }}
      />
      {/* Without JS the script above never runs, so the mask would hide the
          page forever. This override keeps the content visible. */}
      <noscript>
        <style>{`html:not([data-theme-ready]) body{visibility:visible!important;opacity:1!important}`}</style>
      </noscript>
    </>
  );
}
