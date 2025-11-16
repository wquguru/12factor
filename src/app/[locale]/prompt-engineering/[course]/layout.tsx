import { generateMetadata as generateMetadataUtil, defaultMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; course: string }>;
}): Promise<Metadata> {
  const { locale, course } = await params;
  
  // Map course parameter to metadata config
  const getMetadataConfig = (courseId: string) => {
    switch (courseId) {
      case 'fundamentals':
        return defaultMetadata.promptEngineeringFundamentals[locale as 'en' | 'zh'] || 
               defaultMetadata.promptEngineeringFundamentals.en;
      case 'intermediate':
        return defaultMetadata.promptEngineering[locale as 'en' | 'zh'] || 
               defaultMetadata.promptEngineering.en;
      case 'advanced':
        return defaultMetadata.promptEngineeringAdvanced[locale as 'en' | 'zh'] || 
               defaultMetadata.promptEngineeringAdvanced.en;
      case 'best-practice':
        return defaultMetadata.promptEngineeringBestPractice[locale as 'en' | 'zh'] || 
               defaultMetadata.promptEngineeringBestPractice.en;
      default:
        return defaultMetadata.promptEngineering[locale as 'en' | 'zh'] || 
               defaultMetadata.promptEngineering.en;
    }
  };
  
  const config = getMetadataConfig(course);
  
  return generateMetadataUtil({
    title: config.title,
    description: config.description,
    path: locale === 'zh' ? `/zh/prompt-engineering/${course}` : `/prompt-engineering/${course}`,
    locale,
  });
}

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
