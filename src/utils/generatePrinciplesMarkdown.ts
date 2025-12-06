import type { IntlMessages } from 'next-intl';

interface PrincipleData {
  name: string;
  concept: string;
  practices: string[];
  antiPatterns: string[];
}

interface StageData {
  name: string;
  description: string;
}

/**
 * Generates a formatted Markdown document of all 12 principles
 * organized by the 4 stages
 */
export function generatePrinciplesMarkdown(
  messages: IntlMessages,
  locale: string
): string {
  const isZh = locale === 'zh';

  // Extract principles and stages from messages
  const principles = messages.principles as Record<string, unknown>;
  const quiz = messages.quiz as Record<string, unknown>;
  const stages = quiz.stages as Record<string, StageData>;

  // Build markdown content
  let markdown = '';

  // Title
  markdown += `# 12Factor.me - ${isZh ? '四阶段×十二原则方法论' : 'Four Stages × Twelve Principles Methodology'}\n\n`;
  markdown += `> ${isZh ? 'AI 协作时代的 10x 工程效率提升方法论' : 'A methodology for 10x engineering efficiency in the AI collaboration era'}\n\n`;
  markdown += `---\n\n`;

  // Iterate through 4 stages
  for (let stageNum = 1; stageNum <= 4; stageNum++) {
    const stageKey = `stage${stageNum}` as const;
    const stageData = stages[stageKey];

    // Stage header
    markdown += `## ${isZh ? '阶段' : 'Stage'} ${stageNum}: ${stageData.name}\n\n`;
    markdown += `*${stageData.description}*\n\n`;

    // Get principles for this stage (3 principles per stage)
    const startPrincipleId = (stageNum - 1) * 3 + 1;

    for (let i = 0; i < 3; i++) {
      const principleId = startPrincipleId + i;
      const principleKey = `principle${principleId}`;
      const principleData = (quiz[principleKey] as PrincipleData) || (principles[principleKey] as PrincipleData);

      if (principleData) {
        markdown += `### ${principleId}. ${principleData.name}\n\n`;

        // Concept
        markdown += `**${isZh ? '核心概念' : 'Concept'}**: ${principleData.concept}\n\n`;

        // Practices
        if (principleData.practices && principleData.practices.length > 0) {
          markdown += `**${isZh ? '推荐实践' : 'Best Practices'}**:\n`;
          principleData.practices.forEach((practice) => {
            markdown += `- ${practice}\n`;
          });
          markdown += '\n';
        }

        // Anti-patterns
        if (principleData.antiPatterns && principleData.antiPatterns.length > 0) {
          markdown += `**${isZh ? '反面模式' : 'Anti-patterns'}**:\n`;
          principleData.antiPatterns.forEach((antiPattern) => {
            markdown += `- ${antiPattern}\n`;
          });
          markdown += '\n';
        }
      }
    }

    markdown += `---\n\n`;
  }

  // Footer
  markdown += `\n*${isZh ? '生成自' : 'Generated from'} [12Factor.me](https://12factor.me)*\n`;
  markdown += `*${isZh ? '许可证' : 'License'}: MIT*\n`;

  return markdown;
}
