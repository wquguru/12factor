import type { Metadata } from 'next';

export interface MetadataConfig {
  title: string;
  description: string;
  path?: string;
  locale?: string;
  image?: string;
}

export function generateMetadata({
  title,
  description,
  path = '',
  locale = 'en',
  image,
}: MetadataConfig): Metadata {
  const siteName = '12Factor.me';
  const baseUrl = 'https://12factor.me';
  const fullUrl = `${baseUrl}${path}`;
  
  // Locale-specific configurations
  const isZh = locale === 'zh';
  const ogLocale = isZh ? 'zh_CN' : 'en_US';
  
  // Choose image based on locale if not explicitly provided
  const defaultImage = isZh ? '/og-image-zh.png' : '/og-image.png';
  const selectedImage = image || defaultImage;
  
  // Convert relative image path to absolute URL
  const absoluteImageUrl = selectedImage.startsWith('http') ? selectedImage : `https://12factor.me${selectedImage}`;
  
  // Enhanced titles and descriptions for social sharing
  const enhancedTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const socialDescription = isZh 
    ? `${description} | Vibe Coding 编程方法论，10x Engineering 效率提升，AI协作时代的交互式学习平台。`
    : `${description} | Vibe Coding methodology for 10x Engineering efficiency. Interactive AI collaboration platform with gamified learning.`;

  // SEO-optimized keywords based on locale
  const keywords = isZh
    ? ['Vibe Coding', '10x Engineering', 'AI编程', '编程方法论', '开发效率', '提示词工程', 'AI协作', '程序员生产力', '12Factor', 'ChatGPT编程', 'Claude编程', 'Copilot最佳实践']
    : ['Vibe Coding', '10x Engineering', 'AI programming', 'developer productivity', 'programming methodology', 'prompt engineering', 'AI collaboration', 'coding efficiency', '12Factor', 'ChatGPT coding', 'Claude programming', 'Copilot best practices'];

  return {
    title: enhancedTitle,
    description: socialDescription,
    keywords: keywords,
    authors: [{ name: 'wquguru', url: 'https://twitter.com/wquguru' }],
    creator: 'wquguru',
    publisher: '12Factor.me',
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    // Open Graph metadata for Facebook, LinkedIn, etc.
    openGraph: {
      title: enhancedTitle,
      description: socialDescription,
      url: fullUrl,
      siteName,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: enhancedTitle,
        },
      ],
      locale: ogLocale,
      type: 'website',
    },
    // Twitter Card metadata - ensure all required fields
    twitter: {
      card: 'summary_large_image',
      title: enhancedTitle,
      description: socialDescription,
      images: [absoluteImageUrl],
      site: '@wquguru',
      creator: '@wquguru',
    },
    // Additional metadata
    alternates: {
      canonical: fullUrl,
      languages: {
        'en': `${baseUrl}/en${path}`,
        'zh': `${baseUrl}/zh${path}`,
      },
    },
  };
}

// Default metadata configurations for different page types
export const defaultMetadata = {
  home: {
    en: {
      title: "12Factor.me - Vibe Coding for 10x Engineering",
      description: "Master Vibe Coding methodology and achieve 10x Engineering efficiency. Four-stage twelve-principle programming for the AI collaboration era.",
    },
    zh: {
      title: "12Factor.me - Vibe Coding 实现 10x Engineering",
      description: "掌握 Vibe Coding 编程方法论，实现 10x Engineering 效率提升。AI协作时代四阶段十二原则编程体系。",
    },
  },
  principles: {
    en: {
      title: "Vibe Coding Principles - 10x Engineering Guide",
      description: "Discover 12 core Vibe Coding principles for 10x Engineering productivity. Strategic programming methodology for AI collaboration era.",
    },
    zh: {
      title: "Vibe Coding 原则 - 10x Engineering 指南", 
      description: "探索 12 个核心 Vibe Coding 原则，实现 10x Engineering 生产力。AI协作时代的战略编程方法论。",
    },
  },
  flashcards: {
    en: {
      title: "Vibe Coding Flashcards - 10x Engineering Training",
      description: "Master Vibe Coding principles through interactive flashcards. Build your 10x Engineering skills with gamified learning.",
    },
    zh: {
      title: "Vibe Coding 抽认卡 - 10x Engineering 训练",
      description: "通过交互式抽认卡掌握 Vibe Coding 原则。用游戏化学习构建你的 10x Engineering 技能。",
    },
  },
  quiz: {
    en: {
      title: "Vibe Coding Quiz - Test Your 10x Engineering Skills",
      description: "Challenge your Vibe Coding knowledge and validate your 10x Engineering capabilities with comprehensive programming methodology quiz.",
    },
    zh: {
      title: "Vibe Coding 测验 - 测试你的 10x Engineering 技能", 
      description: "挑战你的 Vibe Coding 知识，通过全面的编程方法论测验验证你的 10x Engineering 能力。",
    },
  },
  promptEngineering: {
    en: {
      title: "Prompt Engineering - Master AI Communication for 10x Engineering",
      description: "Learn prompt engineering fundamentals and advanced techniques. Interactive courses for effective AI collaboration and 10x developer productivity.",
    },
    zh: {
      title: "提示词工程 - 掌握AI沟通实现10x Engineering",
      description: "学习提示词工程基础和高级技巧。交互式课程助您实现高效AI协作和10x开发者生产力。",
    },
  },
  promptEngineeringFundamentals: {
    en: {
      title: "Prompt Engineering Fundamentals - AI Communication Basics",
      description: "Master the fundamentals of prompt engineering: basic structure, clear communication, and role prompting for effective AI collaboration.",
    },
    zh: {
      title: "提示词工程基础 - AI沟通基础",
      description: "掌握提示词工程基础：基本结构、清晰沟通和角色提示，实现高效AI协作。",
    },
  },
  promptEngineeringAdvanced: {
    en: {
      title: "Advanced Prompt Engineering - Complex AI Interaction Techniques", 
      description: "Advanced prompt engineering techniques: data separation, output formatting, and chain-of-thought reasoning for sophisticated AI workflows.",
    },
    zh: {
      title: "高级提示词工程 - 复杂AI交互技巧",
      description: "高级提示词工程技巧：数据分离、输出格式化和思维链推理，构建复杂AI工作流程。",
    },
  },
  promptEngineeringBestPractice: {
    en: {
      title: "Prompting Best Practices - Claude 4.5 Field Guide",
      description: "Operational playbook for Claude Sonnet 4.5: explicit instructions, long-horizon context management, agent orchestration, and migration tips.",
    },
    zh: {
      title: "提示词最佳实践 - Claude 4.5 作战手册",
      description: "Claude Sonnet 4.5 的实战指南：明确指令、长程上下文管理、子代理编排以及迁移注意事项。",
    },
  },
} as const;
