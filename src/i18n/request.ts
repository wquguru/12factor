import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !routing.locales.includes(locale as typeof routing.locales[number])) {
    locale = routing.defaultLocale;
  }

  try {
    // Try loading modular structure
    const [
      commonMessages,
      homeMessages,
      flashcardsMessages,
      coreMessages,
      promptEngineeringMessages
    ] = await Promise.all([
      import(`../messages/${locale}/common.json`).then(m => m.default).catch(() => ({})),
      import(`../messages/${locale}/home.json`).then(m => m.default).catch(() => ({})),
      import(`../messages/${locale}/flashcards.json`).then(m => m.default).catch(() => ({})),
      import(`../messages/${locale}/core.json`).then(m => m.default).catch(() => ({})),
      import(`../messages/${locale}/prompt-engineering.json`).then(m => m.default).catch(() => ({}))
    ]);

    // Merge all message modules
    const messages = {
      ...commonMessages,
      ...homeMessages,
      ...flashcardsMessages,
      ...coreMessages,
      ...promptEngineeringMessages
    };

    // Check if we got any messages
    if (Object.keys(messages).length === 0) {
      throw new Error('No messages loaded from modular structure');
    }

    return {
      locale,
      messages
    };
  } catch {
    // Fallback to old single-file structure
    console.log(`Loading fallback single-file structure for locale: ${locale}`);
    return {
      locale,
      messages: (await import(`../messages/${locale}.json`)).default
    };
  }
});