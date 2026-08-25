import { Link } from '@/i18n/routing';
import { BookOpenIcon, ChartBarIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import DynamicTitle from '@/components/DynamicTitle';
import UptimeDisplay from '@/components/UptimeDisplay';
import { getTranslations } from 'next-intl/server';
import { generateMetadata as generateMetadataUtil, defaultMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const config = defaultMetadata.home[locale as 'en' | 'zh'] || defaultMetadata.home.en;
  
  return generateMetadataUtil({
    title: config.title,
    description: config.description,
    path: locale === 'zh' ? '/zh' : '',
    locale,
  });
}

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'home'});
  const tCommon = await getTranslations({locale, namespace: 'common'});

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Section */}
      <div className="hero-gradient relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-32">
          <div className="max-w-5xl">
            <DynamicTitle />
            
            <p className="text-xl text-hero-2 mb-12 max-w-3xl leading-relaxed font-light">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link
                href="/principles"
                locale={locale}
                className="btn-primary btn-hero-primary"
              >
                {t('hero.cta')}
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
              
              <Link
                href="/flashcards"
                locale={locale}
                className="btn-secondary btn-on-hero"
              >
                {t('hero.ctaSecondary')}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Stats Overlay */}
        <div className="absolute top-24 right-12 hidden lg:block">
          <div className="bg-hero-glass backdrop-blur-sm rounded-3xl p-6 border border-hero-line">
            <div className="stat-number text-hero">{t('hero.statsNumber')}</div>
            <div className="text-hero-2 font-medium">{t('hero.statsCore')}</div>
            <div className="text-xs text-hero-2 mt-1">{t('hero.statsMethodology')}</div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-32 bg-bg">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-20">
            <h2 className="text-6xl md:text-7xl font-light text-t1 mb-8 leading-tight">
              {t('benefits.title')}
            </h2>
            <p className="text-lg text-t2 max-w-2xl font-light leading-relaxed">
              {t('benefits.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="mb-6">
                <div className="w-12 h-12 bg-t1 rounded-lg flex items-center justify-center mb-4">
                  <BookOpenIcon className="h-6 w-6 text-bg" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-t1 mb-4">
                {t('benefits.aiCollaboration.title')}
              </h3>
              <p className="text-t2 leading-relaxed text-sm">
                {t('benefits.aiCollaboration.description')}
              </p>
            </div>

            <div>
              <div className="mb-6">
                <div className="w-12 h-12 bg-t1 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 rounded-full border-2 border-hero"></div>
                </div>
              </div>
              <h3 className="text-xl font-medium text-t1 mb-4">
                {t('benefits.developmentFlow.title')}
              </h3>
              <p className="text-t2 leading-relaxed text-sm">
                {t('benefits.developmentFlow.description')}
              </p>
            </div>

            <div>
              <div className="mb-6">
                <div className="w-12 h-12 bg-t1 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <div className="w-4 h-1 bg-surface-1 rounded"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-medium text-t1 mb-4">
                {t('benefits.communication.title')}
              </h3>
              <p className="text-t2 leading-relaxed text-sm">
                {t('benefits.communication.description')}
              </p>
            </div>

            <div>
              <div className="mb-6">
                <div className="w-12 h-12 bg-t1 rounded-lg flex items-center justify-center mb-4">
                  <ChartBarIcon className="h-6 w-6 text-bg" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-t1 mb-4">
                {t('benefits.progress.title')}
              </h3>
              <p className="text-t2 leading-relaxed text-sm">
                {t('benefits.progress.description')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Big Picture Section */}
      <div className="py-32 bg-surface-2">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-light text-t1 mb-12 leading-tight">
              {t('bigPicture.title')}
            </h2>
            <p className="text-lg text-t2 mb-16 leading-relaxed font-light">
              {t('bigPicture.subtitle')}
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-surface-3 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-t2 font-medium text-sm">01</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-t1 mb-2">{t('bigPicture.step1.title')}</h3>
                  <p className="text-t2 text-sm">{t('bigPicture.step1.description')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-surface-3 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-t2 font-medium text-sm">02</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-t1 mb-2">{t('bigPicture.step2.title')}</h3>
                  <p className="text-t2 text-sm">{t('bigPicture.step2.description')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-surface-3 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-t2 font-medium text-sm">03</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-t1 mb-2">{t('bigPicture.step3.title')}</h3>
                  <p className="text-t2 text-sm">{t('bigPicture.step3.description')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-surface-3 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-t2 font-medium text-sm">04</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-t1 mb-2">{t('bigPicture.step4.title')}</h3>
                  <p className="text-t2 text-sm">{t('bigPicture.step4.description')}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-16">
              <Link
                href="/principles"
                locale={locale}
                className="inline-flex items-center px-8 py-3 bg-accent-wash hover:bg-accent-solid hover:text-accent-on text-accent font-medium rounded-full transition-all duration-200 text-sm"
              >
                {t('bigPicture.cta')}
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-surface-2 rounded-3xl flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 p-12">
                <div className="bg-surface-1/80 backdrop-blur rounded-2xl p-6 aspect-square flex items-center justify-center">
                  <div className="w-full h-16 bg-surface-3 rounded-lg"></div>
                </div>
                <div className="bg-surface-1/60 backdrop-blur rounded-2xl p-6 aspect-square flex items-center justify-center">
                  <div className="w-full h-12 bg-surface-3 rounded-lg"></div>
                </div>
                <div className="bg-surface-1/60 backdrop-blur rounded-2xl p-6 aspect-square flex items-center justify-center">
                  <div className="w-full h-20 bg-surface-3 rounded-lg"></div>
                </div>
                <div className="bg-surface-1/80 backdrop-blur rounded-2xl p-6 aspect-square flex items-center justify-center">
                  <div className="w-full h-8 bg-surface-3 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Four Stages Learning Path */}
      <div className="py-32 bg-bg">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-light text-t1 mb-8 leading-tight">
              {t('learningPath.title')}
            </h2>
            <p className="text-lg text-t2 max-w-3xl mx-auto font-light leading-relaxed">
              {t('learningPath.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent-wash rounded-2xl flex items-center justify-center">
                    <span className="text-accent font-semibold">1</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-t1 mb-3">{t('learningPath.prepare.title')}</h3>
                  <p className="text-t2 text-sm leading-relaxed">
                    {t('learningPath.prepare.description')}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent-wash rounded-2xl flex items-center justify-center">
                    <span className="text-accent font-semibold">2</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-t1 mb-3">{t('learningPath.execute.title')}</h3>
                  <p className="text-t2 text-sm leading-relaxed">
                    {t('learningPath.execute.description')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent-wash rounded-2xl flex items-center justify-center">
                    <span className="text-accent font-semibold">3</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-t1 mb-3">{t('learningPath.collaborate.title')}</h3>
                  <p className="text-t2 text-sm leading-relaxed">
                    {t('learningPath.collaborate.description')}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent-wash rounded-2xl flex items-center justify-center">
                    <span className="text-accent font-semibold">4</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-t1 mb-3">{t('learningPath.iterate.title')}</h3>
                  <p className="text-t2 text-sm leading-relaxed">
                    {t('learningPath.iterate.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Journey Section */}
      <div className="py-32 bg-surface-2">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-6xl md:text-7xl font-light text-t1 mb-8 leading-tight">
            {t('journey.title')}
          </h2>
          <p className="text-lg text-t2 mb-24 max-w-3xl mx-auto font-light leading-relaxed">
            {t('journey.subtitle')}
          </p>
          
          <div className="grid md:grid-cols-3 gap-16">
            <div className="text-center">
              <div className="text-8xl font-light text-t3 mb-8">01</div>
              <h3 className="text-2xl font-medium text-t1 mb-6">{t('journey.step1.title')}</h3>
              <p className="text-t2 leading-relaxed">
                {t('journey.step1.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-8xl font-light text-t3 mb-8">02</div>
              <h3 className="text-2xl font-medium text-t1 mb-6">{t('journey.step2.title')}</h3>
              <p className="text-t2 leading-relaxed">
                {t('journey.step2.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-8xl font-light text-t3 mb-8">03</div>
              <h3 className="text-2xl font-medium text-t1 mb-6">{t('journey.step3.title')}</h3>
              <p className="text-t2 leading-relaxed">
                {t('journey.step3.description')}
              </p>
            </div>
          </div>
          
          <div className="mt-24 flex flex-wrap justify-center gap-6">
            <Link
              href="/principles" 
              locale={locale}
              className="inline-flex items-center px-8 py-4 bg-accent-solid hover:bg-accent-hover text-accent-on font-medium rounded-full transition-all duration-200 text-sm tracking-wide"
            >
              {t('journey.ctaPrimary')}
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Link>
            
            <Link
              href="/flashcards" 
              locale={locale}
              className="inline-flex items-center px-8 py-4 border-2 border-line-control text-t2 hover:border-line-control hover:text-t1 font-medium rounded-full transition-all duration-200 text-sm"
            >
              {t('journey.ctaSecondary')}
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-16 bg-bg border-t border-line">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-t1 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-hero rounded"></div>
              </div>
              <UptimeDisplay />
            </div>
            <div className="text-t3 text-sm">
              <a href="https://twitter.com/wquguru" target="_blank" rel="noopener noreferrer" className="hover:text-t1 transition-colors">
                {tCommon('footer.author')}
              </a>
            </div>
            <div className="text-t3 text-sm">
              <a href="https://opensource.org/license/mit" target="_blank" rel="noopener noreferrer" className="hover:text-t1 transition-colors">
                {tCommon('footer.license')}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}