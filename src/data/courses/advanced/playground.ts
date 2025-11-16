import { PlaygroundScenario } from '../types';

export const advancedPlayground: PlaygroundScenario[] = [
  {
    id: 'hallucination-guardrails',
    title: 'playground.advanced.hallucinationGuardrails.title',
    examples: [
      {
        name: 'playground.advanced.hallucinationGuardrails.examples.allowUnknown.name',
        prompt: 'If the answer is unknown, reply with "I do not know". Question: {{QUESTION}}',
        systemPrompt: '',
        description: 'playground.advanced.hallucinationGuardrails.examples.allowUnknown.description',
        variations: [
          {
            name: 'playground.advanced.hallucinationGuardrails.examples.allowUnknown.variations.temperature.name',
            prompt: 'temperature=0.1\nIf uncertain, say "I do not know" before answering. Question: {{QUESTION}}',
            systemPrompt: '',
            explanation: 'playground.advanced.hallucinationGuardrails.examples.allowUnknown.variations.temperature.explanation'
          },
          {
            name: 'playground.advanced.hallucinationGuardrails.examples.allowUnknown.variations.quoteFirst.name',
            prompt: 'Use <evidence> tags to quote the document, then answer: {{DOCUMENT}}\nQuestion: {{QUESTION}}',
            systemPrompt: '',
            explanation: 'playground.advanced.hallucinationGuardrails.examples.allowUnknown.variations.quoteFirst.explanation'
          }
        ]
      }
    ],
    hints: [
      'playground.advanced.hallucinationGuardrails.hints.0',
      'playground.advanced.hallucinationGuardrails.hints.1',
      'playground.advanced.hallucinationGuardrails.hints.2'
    ]
  },
  {
    id: 'complex-blueprints',
    title: 'playground.advanced.complexBlueprints.title',
    examples: [
      {
        name: 'playground.advanced.complexBlueprints.examples.careerCoach.name',
        prompt: '<role>You are a friendly career coach.</role>\n<context>{{CONTEXT}}</context>\n<workflow>1) Clarify the goal. 2) Explore constraints. 3) Provide three tailored next steps.</workflow>\n<format>Answer in markdown with headings.</format>',
        systemPrompt: '',
        description: 'playground.advanced.complexBlueprints.examples.careerCoach.description',
        variations: [
          {
            name: 'playground.advanced.complexBlueprints.examples.careerCoach.variations.brief.name',
            prompt: 'Act as a career coach and help the user.',
            systemPrompt: '',
            explanation: 'playground.advanced.complexBlueprints.examples.careerCoach.variations.brief.explanation'
          },
          {
            name: 'playground.advanced.complexBlueprints.examples.careerCoach.variations.blueprint.name',
            prompt: '<role>{{ROLE}}</role>\n<guardrails>{{GUARDRAILS}}</guardrails>\n<workflow>{{WORKFLOW}}</workflow>\n<format>{{FORMAT}}</format>\nQuestion: {{QUESTION}}',
            systemPrompt: '',
            explanation: 'playground.advanced.complexBlueprints.examples.careerCoach.variations.blueprint.explanation'
          }
        ]
      },
      {
        name: 'playground.advanced.complexBlueprints.examples.auditBot.name',
        prompt: '<role>You are a compliance auditor.</role>\n<checks>{{CHECKLIST}}</checks>\n<steps>1) Parse the document. 2) Compare against checklist. 3) Report violations.</steps>\n<format>Return JSON with fields findings, severity, remediation.</format>',
        systemPrompt: '',
        description: 'playground.advanced.complexBlueprints.examples.auditBot.description',
        variations: [
          {
            name: 'playground.advanced.complexBlueprints.examples.auditBot.variations.linear.name',
            prompt: 'You are a compliance auditor. Read the policy and summarize any issues.',
            systemPrompt: '',
            explanation: 'playground.advanced.complexBlueprints.examples.auditBot.variations.linear.explanation'
          },
          {
            name: 'playground.advanced.complexBlueprints.examples.auditBot.variations.sectioned.name',
            prompt: '<role>Audit bot</role><steps>{{STEPS}}</steps><format>{{FORMAT}}</format>Document: {{DOCUMENT}}',
            systemPrompt: '',
            explanation: 'playground.advanced.complexBlueprints.examples.auditBot.variations.sectioned.explanation'
          }
        ]
      }
    ],
    hints: [
      'playground.advanced.complexBlueprints.hints.0',
      'playground.advanced.complexBlueprints.hints.1',
      'playground.advanced.complexBlueprints.hints.2'
    ]
  },
  {
    id: 'workflow-orchestration',
    title: 'playground.advanced.workflowOrchestration.title',
    examples: [
      {
        name: 'playground.advanced.workflowOrchestration.examples.promptChaining.name',
        prompt: '<analysis>Brainstorm possible answers.</analysis>\n<verify>Check the answer using {{TOOL}}.</verify>\n<final>Return the verified answer.</final>',
        systemPrompt: '',
        description: 'playground.advanced.workflowOrchestration.examples.promptChaining.description',
        variations: [
          {
            name: 'playground.advanced.workflowOrchestration.examples.promptChaining.variations.singleStep.name',
            prompt: 'Answer the user question directly.',
            systemPrompt: '',
            explanation: 'playground.advanced.workflowOrchestration.examples.promptChaining.variations.singleStep.explanation'
          },
          {
            name: 'playground.advanced.workflowOrchestration.examples.promptChaining.variations.multiTool.name',
            prompt: '<analysis>{{ANALYSIS}}</analysis><tool_request>{{TOOL_REQUEST}}</tool_request><final>{{FORMAT}}</final>',
            systemPrompt: '',
            explanation: 'playground.advanced.workflowOrchestration.examples.promptChaining.variations.multiTool.explanation'
          }
        ]
      },
      {
        name: 'playground.advanced.workflowOrchestration.examples.searchRetrieval.name',
        prompt: 'Step 1: Generate {{K}} search queries for the topic.\nStep 2: Summarize each document in <note> tags.\nStep 3: Synthesize an answer grounded in the notes.',
        systemPrompt: '',
        description: 'playground.advanced.workflowOrchestration.examples.searchRetrieval.description',
        variations: [
          {
            name: 'playground.advanced.workflowOrchestration.examples.searchRetrieval.variations.noGrounding.name',
            prompt: 'Answer the question about {{TOPIC}}.',
            systemPrompt: '',
            explanation: 'playground.advanced.workflowOrchestration.examples.searchRetrieval.variations.noGrounding.explanation'
          },
          {
            name: 'playground.advanced.workflowOrchestration.examples.searchRetrieval.variations.withCitations.name',
            prompt: 'For each cited snippet, wrap it in <cite> tags before writing the final answer.',
            systemPrompt: '',
            explanation: 'playground.advanced.workflowOrchestration.examples.searchRetrieval.variations.withCitations.explanation'
          }
        ]
      }
    ],
    hints: [
      'playground.advanced.workflowOrchestration.hints.0',
      'playground.advanced.workflowOrchestration.hints.1',
      'playground.advanced.workflowOrchestration.hints.2'
    ]
  }
];
