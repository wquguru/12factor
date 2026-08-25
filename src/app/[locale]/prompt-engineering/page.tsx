import { getTranslations } from 'next-intl/server';
import { getAllCourses } from '@/data/courses';
import { Link } from '@/i18n/routing';
import { generateMetadata as generateMetadataUtil, defaultMetadata } from '@/lib/metadata';
import ScrollDownButton from '@/components/ScrollDownButton';
import type { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const config = defaultMetadata.promptEngineering[locale as 'en' | 'zh'] || defaultMetadata.promptEngineering.en;
  
  return generateMetadataUtil({
    title: config.title,
    description: config.description,
    path: locale === 'zh' ? '/zh/prompt-engineering' : '/prompt-engineering',
    locale,
  });
}

export default async function PromptEngineeringPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'promptEngineering'});

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Section */}
      <div className="hero-gradient relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-32 sm:pb-24">
          <div className="max-w-5xl">
            <h1 className="hero-text text-hero mb-8">
              {t('title')}
            </h1>
            
            <p className="text-xl text-hero-2 mb-12 max-w-3xl leading-relaxed font-light">
              {t('description')}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link
                href={{
                  pathname: '/prompt-engineering/[course]',
                  params: { course: 'fundamentals' }
                }}
                locale={locale}
                className="btn-primary btn-hero-primary"
              >
                {t('startLearning')}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll Down Arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <ScrollDownButton targetId="lessons-content" label={t('viewLessons')} />
        </div>
        
        {/* Stats Overlay */}
        <div className="absolute top-24 right-12 hidden lg:block">
          <div className="bg-hero-glass backdrop-blur-sm rounded-3xl p-6 border border-hero-line">
            <div className="stat-number text-hero">{getAllCourses().length}</div>
            <div className="text-hero-2 font-medium">
              {t('lessonsLabel')}
            </div>
            <div className="text-xs text-hero-2 mt-1">{t('interactiveLearning')}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div id="lessons-content" className="py-20 bg-bg">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {getAllCourses().map((course, index) => {
              const getCourseTitle = (id: string) => {
                switch (id) {
                  case 'fundamentals':
                    return t('course.fundamentals.title');
                  case 'intermediate':
                    return t('course.intermediate.title');
                  case 'advanced':
                    return t('course.advanced.title');
                  case 'best-practice':
                    return t('course.bestPractice.title');
                  default:
                    return 'Course';
                }
              };

              const getCourseSummary = (id: string) => {
                switch (id) {
                  case 'fundamentals':
                    return t('course.fundamentals.summary');
                  case 'intermediate':
                    return t('course.intermediate.summary');
                  case 'advanced':
                    return t('course.advanced.summary');
                  case 'best-practice':
                    return t('course.bestPractice.summary');
                  default:
                    return '';
                }
              };

              const getSectionCount = () => {
                return course.content.sections?.length || 0;
              };
              
              return (
                <Link
                  key={course.content.id}
                  href={{
                    pathname: '/prompt-engineering/[course]',
                    params: { course: course.content.id.toString() }
                  }}
                  locale={locale}
                  className="modern-card group hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-accent-wash border border-accent rounded-2xl flex items-center justify-center">
                        <span className="text-accent font-bold text-lg">{index + 1}</span>
                      </div>
                      <div className="text-sm text-accent font-medium uppercase tracking-wide">
                        {t('integratedCourse')}
                      </div>
                    </div>
                  </div>

                  <h4 className="text-xl font-medium text-t1 mb-4 leading-tight">
                    {getCourseTitle(course.content.id)}
                  </h4>

                  <p className="text-t2 text-sm leading-relaxed mb-4">
                    {getCourseSummary(course.content.id)}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs text-accent">
                    <div className="w-2 h-2 bg-accent-solid rounded-full"></div>
                    {getSectionCount()} {t('sections')}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
