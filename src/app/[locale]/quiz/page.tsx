'use client';

import { useState, useEffect } from 'react';
import { CheckIcon, CrossIcon } from '@/components/icons';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { principles } from '@/data/principles';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeftIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface Question {
  id: number;
  text: string;
  type: 'single-choice' | 'true-false' | 'scenario' | 'drag-drop' | 'fill-blank';
  options?: string[];
  correct: number | string | string[];
  principleId: number;
  stage?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  scenario?: string;
  blanks?: string[];
  dragItems?: string[];
  dropZones?: string[];
}

interface FillBlankQuestionProps {
  question: Question;
  onAnswer: (answer: string[]) => void;
}

function FillBlankQuestion({ question, onAnswer }: FillBlankQuestionProps) {
  const [blanks, setBlanks] = useState<string[]>(['', '']);
  
  useEffect(() => {
    onAnswer(blanks);
  }, [blanks, onAnswer]);
  
  const updateBlank = (index: number, value: string) => {
    const newBlanks = [...blanks];
    newBlanks[index] = value;
    setBlanks(newBlanks);
  };
  
  return (
    <div className="space-y-4">
      <div className="text-lg text-t2">
        {question.text.split('___').map((part, index) => (
          <span key={index}>
            {part}
            {index < question.text.split('___').length - 1 && (
              <input
                type="text"
                value={blanks[index] || ''}
                onChange={(e) => updateBlank(index, e.target.value)}
                className="inline-block mx-2 px-3 py-1 border-b-2 border-accent bg-transparent text-t1 min-w-[100px] text-center"
                placeholder="..."
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function QuizPage() {
  // Declared before first use: it is called from callbacks defined above
  // its old position, which is a temporal-dead-zone hazard for a const.
  const checkAnswer = (userAnswer: number | string | string[], correctAnswer: number | string | string[], type: string): boolean => {
    if (type === 'fill-blank') {
      if (Array.isArray(userAnswer) && Array.isArray(correctAnswer)) {
        return userAnswer.every((answer, index) => 
          answer.toLowerCase().trim() === correctAnswer[index].toLowerCase().trim()
        );
      }
    }
    return userAnswer === correctAnswer;
  };

  const t = useTranslations();
  const tQuiz = useTranslations('quiz');
  const locale = useLocale() as 'en' | 'zh';
  const shouldReduceMotion = useReducedMotion();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | string | string[])[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | string[] | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [quizMode, setQuizMode] = useState<'normal' | 'timed' | 'challenge' | 'adaptive'>('normal');
  const [timeLeft, setTimeLeft] = useState(30);
  const [streak, setStreak] = useState(0);
  const [showQuizModeSelect, setShowQuizModeSelect] = useState(true);
  
  // Always declare all hooks at the top level
  const [questions] = useState<Question[]>(() => {
    // Helper function to remove trailing periods from text
    const removePeriods = (text: string): string => {
      return text.replace(/[。.]$/, '');
    };
    
    // Fisher-Yates shuffle algorithm for better randomization
    const shuffle = <T,>(array: T[]): T[] => {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };
    
    const generateQuestions = (): Question[] => {
      const questionTypes: Question[] = [];
      
      // Single choice questions with principle-specific wrong answers
      const principleWrongAnswers: Record<number, string[]> = {
        1: locale === 'zh' ? [
          '在多个来源分散存储上下文以提高灵活性',
          '让每个团队成员维护自己的项目文档版本',
          '同时使用多个代码仓库来管理同一项目'
        ] : [
          'Store context across multiple sources for flexibility',
          'Let each team member maintain their own version of docs',
          'Use multiple code repositories for the same project'
        ],
        2: locale === 'zh' ? [
          '先编写代码，然后让AI生成文档',
          '完成所有功能后再考虑提示工程',
          '直接从实现细节开始，逐步推导需求'
        ] : [
          'Write code first, then let AI generate documentation',
          'Complete all features before considering prompt engineering',
          'Start with implementation details and derive requirements'
        ],
        3: locale === 'zh' ? [
          '保留所有历史对话以获得完整上下文',
          '在每次对话中包含整个代码库',
          '混合多个任务的上下文以提高效率'
        ] : [
          'Keep all historical conversations for complete context',
          'Include entire codebase in every conversation',
          'Mix contexts from multiple tasks for efficiency'
        ],
        6: locale === 'zh' ? [
          '按顺序逐个完成任务以确保质量',
          '等待一个任务完成后再开始下一个',
          '避免同时处理多个任务以减少错误'
        ] : [
          'Complete tasks sequentially to ensure quality',
          'Wait for one task to finish before starting another',
          'Avoid handling multiple tasks simultaneously to reduce errors'
        ],
        7: locale === 'zh' ? [
          '最大化信息输入以提高决策质量',
          '尽可能多地处理任务以提高效率',
          '增加认知负荷以锻炼大脑能力'
        ] : [
          'Maximize information input to improve decision quality',
          'Process as many tasks as possible to increase efficiency',
          'Increase cognitive load to exercise brain capacity'
        ],
        8: locale === 'zh' ? [
          '随时接受中断以保持灵活性',
          '多任务处理以提高生产力',
          '保持持续可用以响应紧急需求'
        ] : [
          'Accept interruptions anytime to maintain flexibility',
          'Multitask to increase productivity',
          'Stay continuously available for urgent needs'
        ],
        9: locale === 'zh' ? [
          '只记录成功的结果，忽略过程细节',
          '依赖记忆而不是文档记录',
          '每次使用不同的方法以保持创新'
        ] : [
          'Only record successful results, ignore process details',
          'Rely on memory rather than documentation',
          'Use different methods each time to maintain innovation'
        ],
        10: locale === 'zh' ? [
          '通过延长工作时间提高产出',
          '消除所有休息以最大化效率',
          '保持高强度工作以快速完成项目'
        ] : [
          'Increase output by extending work hours',
          'Eliminate all breaks to maximize efficiency',
          'Maintain high-intensity work to complete projects quickly'
        ],
        11: locale === 'zh' ? [
          '让专家处理所有AI相关任务',
          '保持技能差异以明确分工',
          '只培训部分核心成员使用AI'
        ] : [
          'Let experts handle all AI-related tasks',
          'Maintain skill gaps for clear division of labor',
          'Only train core members to use AI'
        ],
        12: locale === 'zh' ? [
          '坚持使用已熟悉的工具，避免频繁更换',
          '等待技术成熟后再学习，降低学习成本',
          '专注于单一技术栈，成为领域专家'
        ] : [
          'Stick to familiar tools and avoid frequent changes',
          'Wait for technology to mature before learning to reduce costs',
          'Focus on a single tech stack to become a domain expert'
        ]
      };
      
      // Select more principles for single choice questions
      const singleChoicePrinciples = [1, 2, 3, 6, 11, 12].map(id => principles.find(p => p.id === id)!);
      singleChoicePrinciples.forEach((principle, index) => {
        const principleTranslation = {
          name: tQuiz(`principle${principle.id}.name`),
          concept: tQuiz(`principle${principle.id}.concept`)
        };
        
        const wrongAnswers = principleWrongAnswers[principle.id] || [
          tQuiz('wrongAnswers.0'),
          tQuiz('wrongAnswers.1'), 
          tQuiz('wrongAnswers.2')
        ];
        
        // Remove trailing periods from all options
        const cleanedConcept = removePeriods(principleTranslation.concept);
        const cleanedWrongAnswers = wrongAnswers.map(answer => removePeriods(answer));
        
        const options = shuffle([
          cleanedConcept,
          ...cleanedWrongAnswers
        ]);
        
        const correctIndex = options.findIndex(opt => opt === cleanedConcept);
        
        questionTypes.push({
          id: index,
          text: locale === 'zh' 
            ? `什么是"${principleTranslation.name}"的核心理念？`
            : `What is the core concept of "${principleTranslation.name}"?`,
          type: 'single-choice',
          options,
          correct: correctIndex,
          principleId: principle.id,
          stage: principle.stage,
          difficulty: 'medium'
        });
      });
      
      // True/False questions with both true and false statements
      const trueFalseStatements = [
        {
          principleId: 4,
          statement: locale === 'zh' 
            ? '人类在环 (Human-in-the-Loop) 原则要求人类验证所有AI生成的输出'
            : 'Human-in-the-Loop principle requires human validation of all AI outputs',
          isTrue: true
        },
        {
          principleId: 5,
          statement: locale === 'zh'
            ? '任务块化 (Chunked Work) 建议将所有任务合并在一个大型会话中完成'
            : 'Chunked Work suggests completing all tasks in one large session',
          isTrue: false
        },
        {
          principleId: 7,
          statement: locale === 'zh'
            ? '负载预算 (Cognitive Load Budget) 原则建议同时处理尽可能多的信息'
            : 'Cognitive Load Budget principle suggests processing as much information as possible simultaneously',
          isTrue: false
        },
        {
          principleId: 9,
          statement: locale === 'zh'
            ? '可复现性 (Reproducible Sessions) 确保AI协作可以被重现和验证'
            : 'Reproducible Sessions ensures AI collaboration can be reproduced and verified',
          isTrue: true
        },
        {
          principleId: 10,
          statement: locale === 'zh'
            ? '休息反思 (Rest & Reflection) 原则认为持续工作才能保持高效率'
            : 'Rest & Reflection principle believes continuous work maintains high efficiency',
          isTrue: false
        }
      ];
      
      trueFalseStatements.forEach((stmt, index) => {
        const principle = principles.find(p => p.id === stmt.principleId)!;
        questionTypes.push({
          id: index + singleChoicePrinciples.length,
          text: stmt.statement,
          type: 'true-false',
          options: [locale === 'zh' ? '正确' : 'True', locale === 'zh' ? '错误' : 'False'],
          correct: stmt.isTrue ? 0 : 1,
          principleId: principle.id,
          stage: principle.stage,
          difficulty: 'easy'
        });
      });
      
      // Scenario-based questions - covering more principles
      const scenarios = [
        {
          text: locale === 'zh'
            ? '你正在与AI合作开发一个复杂功能，但发现AI生成的代码有很多问题需要修复。'
            : 'You are collaborating with AI to develop a complex feature, but find many issues in the AI-generated code that need fixing.',
          correctPrinciple: 'humanInLoop',
          principleId: 4
        },
        {
          text: locale === 'zh'
            ? '你发现自己在处理多个复杂任务时感到压力很大，难以集中注意力。'
            : 'You find yourself stressed handling multiple complex tasks and struggling to focus.',
          correctPrinciple: 'cognitiveLoadBudget',
          principleId: 7
        },
        {
          text: locale === 'zh'
            ? '团队成员经常被各种会议和消息打断，导致编程效率低下。'
            : 'Team members are frequently interrupted by meetings and messages, leading to low programming efficiency.',
          correctPrinciple: 'flowProtection',
          principleId: 8
        },
        {
          text: locale === 'zh'
            ? '团队中有些人熟悉AI工具，有些人不熟悉，导致协作困难。'
            : 'Some team members are familiar with AI tools while others are not, causing collaboration difficulties.',
          correctPrinciple: 'skillParity',
          principleId: 11
        },
        {
          text: locale === 'zh'
            ? '你成功使用AI解决了一个难题，但不确定如何让团队其他人也能重现这个成功。'
            : 'You successfully used AI to solve a difficult problem, but unsure how to help others reproduce this success.',
          correctPrinciple: 'reproducibleSessions',
          principleId: 9
        },
        {
          text: locale === 'zh'
            ? '你的项目文档分散在多个地方：README、Wiki、评论、Slack，团队经常找不到需要的信息。'
            : 'Your project documentation is scattered across README, Wiki, comments, and Slack, team often can\'t find needed information.',
          correctPrinciple: 'singleSource',
          principleId: 1
        }
      ];
      
      // Generate 3 scenario questions from different scenarios
      const shuffledScenarios = shuffle(scenarios);
      shuffledScenarios.slice(0, 3).forEach((scenario, index) => {
        const correctAnswer = removePeriods(tQuiz(`principleOptions.${scenario.correctPrinciple}`));
        const allOptions = [
          tQuiz('principleOptions.humanInLoop'),
          tQuiz('principleOptions.chunkedWork'),
          tQuiz('principleOptions.parallelFlow'),
          tQuiz('principleOptions.contextHygiene'),
          tQuiz('principleOptions.singleSource'),
          tQuiz('principleOptions.cognitiveLoadBudget'),
          tQuiz('principleOptions.flowProtection'),
          tQuiz('principleOptions.reproducibleSessions'),
          tQuiz('principleOptions.restReflection'),
          tQuiz('principleOptions.skillParity'),
          tQuiz('principleOptions.cultureOfCuriosity')
        ].map(opt => removePeriods(opt)).filter(opt => opt !== correctAnswer); // Remove correct answer from pool
        
        // Select 3 random wrong answers and add the correct one
        const wrongOptions = shuffle(allOptions).slice(0, 3);
        const options = shuffle([correctAnswer, ...wrongOptions]);
        
        const correctIndex = options.indexOf(correctAnswer);
        
        questionTypes.push({
          id: 11 + index,
          text: locale === 'zh'
            ? '在AI协作过程中遇到以下场景时，应该采用哪个原则？'
            : 'When facing the following scenario in AI collaboration, which principle should you apply?',
          type: 'scenario',
          scenario: scenario.text,
          options,
          correct: correctIndex,
          principleId: scenario.principleId,
          stage: Math.ceil(scenario.principleId / 3),
          difficulty: 'hard'
        });
      });
      
      // Fill in the blank questions
      questionTypes.push({
        id: 14,
        text: locale === 'zh'
          ? '完成以下句子：AI 协作时代的编程方法论包含 ___ 个阶段和 ___ 个原则。'
          : 'Complete the sentence: The AI collaboration era programming methodology includes ___ stages and ___ principles.',
        type: 'fill-blank',
        blanks: locale === 'zh' ? ['4', '12'] : ['4', '12'],
        correct: locale === 'zh' ? ['4', '12'] : ['4', '12'],
        principleId: 1,
        difficulty: 'easy'
      });
      
      // Add more fill-blank questions
      questionTypes.push({
        id: 15,
        text: locale === 'zh'
          ? '并行流动 (Parallel Flow) 原则建议___处理多个任务，而不是___完成。'
          : 'Parallel Flow principle suggests ___ handling multiple tasks, rather than ___ completion.',
        type: 'fill-blank',
        blanks: locale === 'zh' ? ['并行', '顺序'] : ['parallel', 'sequential'],
        correct: locale === 'zh' ? ['并行', '顺序'] : ['parallel', 'sequential'],
        principleId: 6,
        difficulty: 'easy'
      });
      
      // Restore Culture of Curiosity single-choice question
      const curiosityOptions = locale === 'zh' ? [
        '持续学习和探索新的AI工具和方法，保持开放心态',
        '坚持使用已熟悉的工具，避免频繁更换',
        '等待技术成熟后再学习，降低学习成本',
        '专注于单一技术栈，成为领域专家'
      ] : [
        'Continuously learn and explore new AI tools and methods with an open mindset',
        'Stick to familiar tools and avoid frequent changes',
        'Wait for technology to mature before learning to reduce costs',
        'Focus on a single tech stack to become a domain expert'
      ];
      
      const cleanedCuriosityOptions = curiosityOptions.map(opt => removePeriods(opt));
      const shuffledCuriosityOptions = shuffle(cleanedCuriosityOptions);
      const correctCuriosityAnswer = removePeriods(
        locale === 'zh' 
          ? '持续学习和探索新的AI工具和方法，保持开放心态'
          : 'Continuously learn and explore new AI tools and methods with an open mindset'
      );
      const correctCuriosityIndex = shuffledCuriosityOptions.indexOf(correctCuriosityAnswer);
      
      questionTypes.push({
        id: 16,
        text: locale === 'zh'
          ? '好奇文化 (Culture of Curiosity) 原则的核心理念是什么？'
          : 'What is the core concept of the Culture of Curiosity principle?',
        type: 'single-choice',
        options: shuffledCuriosityOptions,
        correct: correctCuriosityIndex,
        principleId: 12,
        stage: 4,
        difficulty: 'medium'
      });
      
      // Add single-choice question for Chunked Work (principle 5)
      const chunkedWorkOptions = locale === 'zh' ? [
        '将大任务分解成小块，逐步完成并验证',
        '一次性完成所有工作以保持连贯性',
        '尽可能延长单次工作时间以提高效率',
        '避免任务切换，专注完成一个大任务'
      ] : [
        'Break large tasks into small chunks, complete and verify incrementally',
        'Complete all work at once to maintain coherence',
        'Extend single work sessions as long as possible for efficiency',
        'Avoid task switching, focus on completing one large task'
      ];
      
      const cleanedChunkedOptions = chunkedWorkOptions.map(opt => removePeriods(opt));
      const shuffledChunkedOptions = shuffle(cleanedChunkedOptions);
      const correctChunkedAnswer = removePeriods(
        locale === 'zh'
          ? '将大任务分解成小块，逐步完成并验证'
          : 'Break large tasks into small chunks, complete and verify incrementally'
      );
      const correctChunkedIndex = shuffledChunkedOptions.indexOf(correctChunkedAnswer);
      
      questionTypes.push({
        id: 17,
        text: locale === 'zh'
          ? '任务块化 (Chunked Work) 原则建议如何处理复杂任务？'
          : 'How does the Chunked Work principle suggest handling complex tasks?',
        type: 'single-choice',
        options: shuffledChunkedOptions,
        correct: correctChunkedIndex,
        principleId: 5,
        stage: 2,
        difficulty: 'medium'
      });
      
      // Add True/False question for Flow Protection (principle 8)
      questionTypes.push({
        id: 18,
        text: locale === 'zh'
          ? '流保护罩 (Flow Protection) 原则鼓励随时接受打断以保持团队协作'
          : 'Flow Protection principle encourages accepting interruptions anytime to maintain team collaboration',
        type: 'true-false',
        options: [locale === 'zh' ? '正确' : 'True', locale === 'zh' ? '错误' : 'False'],
        correct: 1, // False
        principleId: 8,
        stage: 3,
        difficulty: 'easy'
      });
      
      // Add scenario question for Rest & Reflection (principle 10)
      questionTypes.push({
        id: 19,
        text: locale === 'zh'
          ? '在AI协作过程中遇到以下场景时，应该采用哪个原则？'
          : 'When facing the following scenario in AI collaboration, which principle should you apply?',
        type: 'scenario',
        scenario: locale === 'zh'
          ? '连续工作数小时后，你发现自己的判断力下降，频繁出错，创造力也明显减退。'
          : 'After working continuously for hours, you notice declining judgment, frequent errors, and reduced creativity.',
        options: shuffle([
          tQuiz('principleOptions.restReflection'),
          tQuiz('principleOptions.cognitiveLoadBudget'),
          tQuiz('principleOptions.flowProtection'),
          tQuiz('principleOptions.skillParity')
        ].map(opt => removePeriods(opt))),
        correct: -1, // Will be recalculated after shuffle
        principleId: 10,
        stage: 4,
        difficulty: 'medium'
      });
      
      // Fix the correct answer index for the Rest & Reflection scenario
      const lastQuestion = questionTypes[questionTypes.length - 1];
      lastQuestion.correct = lastQuestion.options!.indexOf(removePeriods(tQuiz('principleOptions.restReflection')));
      
      // Shuffle questions to add variety while keeping a good mix
      const shuffled = shuffle(questionTypes);
      
      // Ensure we have a good mix of different types and difficulties
      // Return 12 questions from the pool of 20
      return shuffled.slice(0, 12);
    };
    return generateQuestions();
  });

  // Timer effect for timed mode - moved to top level
  useEffect(() => {
    if (quizMode === 'timed' && timeLeft > 0 && !showResults && !showQuizModeSelect) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      
      if (timeLeft === 1) {
        // Auto-submit when time runs out
        setTimeout(() => {
          if (selectedAnswer !== null) {
            const newAnswers = [...answers, selectedAnswer];
            setAnswers(newAnswers);
            
            // Check if answer is correct for streak tracking
            const question = questions[currentQuestion];
            const isCorrect = checkAnswer(selectedAnswer, question.correct, question.type);
            setStreak(isCorrect ? streak + 1 : 0);

            if (currentQuestion < questions.length - 1) {
              setCurrentQuestion(currentQuestion + 1);
              setSelectedAnswer(null);
              setTimeLeft(30); // Reset timer for next question
              // Scroll to top when auto-submitting in timed mode
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              setShowResults(true);
            }
          }
        }, 100);
      }
      
      return () => clearTimeout(timer);
    }
  }, [timeLeft, quizMode, showResults, showQuizModeSelect, selectedAnswer, answers, currentQuestion, questions, streak]);

  const handleAnswerSelect = (answer: number | string | string[]) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      
      // Check if answer is correct for streak tracking
      const question = questions[currentQuestion];
      const isCorrect = checkAnswer(selectedAnswer, question.correct, question.type);
      setStreak(isCorrect ? streak + 1 : 0);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        if (quizMode === 'timed') {
          setTimeLeft(30); // Reset timer for next question
        }
        // Scroll to top when moving to next question
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setShowResults(true);
      }
    }
  };
  

  const calculateScore = () => {
    return answers.reduce((score: number, answer, index) => {
      const question = questions[index];
      const isCorrect = checkAnswer(answer, question.correct, question.type);
      return score + (isCorrect ? 1 : 0);
    }, 0);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowResults(false);
    setStreak(0);
    setShowQuizModeSelect(true);
    setTimeLeft(30);
  };
  
  const startQuiz = (mode: 'normal' | 'timed' | 'challenge' | 'adaptive') => {
    setQuizMode(mode);
    setShowQuizModeSelect(false);
    if (mode === 'timed') {
      setTimeLeft(30);
    }
    // Scroll to top when starting quiz to ensure content is visible
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quiz mode selection screen
  if (showQuizModeSelect) {
    return (
      <div className="min-h-screen bg-bg">
        {/* Hero Section */}
        <div className="hero-gradient relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-32 sm:pb-24">
            <div className="max-w-5xl">
              <h1 className="hero-text text-hero mb-8">
                {tQuiz('chooseChallenge')}
              </h1>
              
              <p className="text-xl text-hero-2 mb-12 max-w-3xl leading-relaxed font-light">
                {tQuiz('selectModeDescription')}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/principles"
                  locale={locale}
                  className="btn-secondary btn-on-hero"
                >
                  {t('flashcards.studyPrinciples')}
                </Link>
                
                <Link
                  href="/flashcards"
                  locale={locale}
                  className="btn-secondary btn-on-hero"
                >
                  {t('principles.practiceWithFlashcards')}
                </Link>
              </div>
            </div>
          </div>
          
          {/* Scroll Down Arrow */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => {
                document.getElementById('quiz-modes')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex flex-col items-center text-hero-2 hover:text-hero transition-all duration-300 hover:scale-110"
              aria-label="Scroll to quiz modes"
            >
              <div className="text-xs sm:text-sm font-medium mb-2 opacity-80 group-hover:opacity-100 whitespace-nowrap px-2">
                {tQuiz('chooseMode')}
              </div>
              <div className="w-10 h-10 rounded-full border border-hero-line bg-hero-glass backdrop-blur-sm flex items-center justify-center group-hover:bg-hero-glass group-hover:border-hero-line transition-all duration-300">
                <ChevronDownIcon className="h-5 w-5 animate-bounce" />
              </div>
            </button>
          </div>
        </div>

        {/* Quiz Modes Section */}
        <div id="quiz-modes" className="py-32 bg-bg">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-6xl md:text-7xl font-light text-t1 mb-8 leading-tight">
                {tQuiz('quizModes')}
              </h2>
              <p className="text-lg text-t2 max-w-3xl font-light leading-relaxed">
                {tQuiz('chooseChallengeLevel')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="modern-card cursor-pointer group hover:shadow-2xl transition-all duration-300"
                onClick={() => startQuiz('normal')}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-accent-wash rounded-2xl flex items-center justify-center">
                    <div className="w-8 h-8 bg-accent-solid rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 bg-surface-1 rounded-sm opacity-80"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-t1 mb-1">{tQuiz('normalMode')}</h3>
                    <div className="text-sm text-accent font-medium">{tQuiz('normalModeSubtitle')}</div>
                  </div>
                </div>
                <p className="text-t2 text-sm leading-relaxed">
                  {tQuiz('normalModeDescription')}
                </p>
              </motion.div>
              
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="modern-card cursor-pointer group hover:shadow-2xl transition-all duration-300"
                onClick={() => startQuiz('timed')}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-warn-wash rounded-2xl flex items-center justify-center">
                    <div className="w-8 h-8 bg-warn rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-hero rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-t1 mb-1">{tQuiz('timedMode')}</h3>
                    <div className="text-sm text-warn font-medium">{tQuiz('timedModeSubtitle')}</div>
                  </div>
                </div>
                <p className="text-t2 text-sm leading-relaxed">
                  {tQuiz('timedModeDescription')}
                </p>
              </motion.div>
              
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="modern-card cursor-pointer group hover:shadow-2xl transition-all duration-300"
                onClick={() => startQuiz('challenge')}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-danger-wash rounded-2xl flex items-center justify-center">
                    <div className="w-8 h-8 bg-danger rounded-lg flex items-center justify-center">
                      <div className="w-3 h-4 bg-surface-1 rounded-sm"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-t1 mb-1">{tQuiz('challengeMode')}</h3>
                    <div className="text-sm text-danger font-medium">{tQuiz('challengeModeSubtitle')}</div>
                  </div>
                </div>
                <p className="text-t2 text-sm leading-relaxed">
                  {tQuiz('challengeModeDescription')}
                </p>
              </motion.div>
              
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="modern-card cursor-pointer group hover:shadow-2xl transition-all duration-300"
                onClick={() => startQuiz('adaptive')}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-stage1-wash rounded-2xl flex items-center justify-center">
                    <div className="w-8 h-8 bg-stage1 rounded-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-surface-1 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-t1 mb-1">{tQuiz('adaptiveMode')}</h3>
                    <div className="text-sm text-stage1 font-medium">{tQuiz('adaptiveModeSubtitle')}</div>
                  </div>
                </div>
                <p className="text-t2 text-sm leading-relaxed">
                  {tQuiz('adaptiveModeDescription')}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="min-h-screen bg-bg">
        {/* Hero Section for Results */}
        <div className="hero-gradient relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-40 sm:pb-32">
            <div className="max-w-5xl mx-auto text-center">
              <h1 className="hero-text text-hero mb-8">
                {tQuiz('quizComplete')}
              </h1>
              
              <p className="text-xl text-hero-2 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                {tQuiz('modeResults', { mode: quizMode.charAt(0).toUpperCase() + quizMode.slice(1) })}
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center mb-16">
                <Link
                  href="/principles"
                  locale={locale}
                  className="btn-secondary btn-on-hero"
                >
                  {t('flashcards.studyPrinciples')}
                </Link>
                
                <Link
                  href="/flashcards"
                  locale={locale}
                  className="btn-secondary btn-on-hero"
                >
                  {t('principles.practiceWithFlashcards')}
                </Link>
              </div>
            </div>
          </div>
          
          {/* Scroll Down Arrow */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <button
              onClick={() => {
                document.getElementById('results-content')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex flex-col items-center text-hero-2 hover:text-hero transition-all duration-300 hover:scale-110"
              aria-label="Scroll to results"
            >
              <div className="text-xs sm:text-sm font-medium mb-2 opacity-80 group-hover:opacity-100 whitespace-nowrap px-2">
                {tQuiz('viewResults')}
              </div>
              <div className="w-10 h-10 rounded-full border border-hero-line bg-hero-glass backdrop-blur-sm flex items-center justify-center group-hover:bg-hero-glass group-hover:border-hero-line transition-all duration-300">
                <ChevronDownIcon className="h-5 w-5 animate-bounce" />
              </div>
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div id="results-content" className="py-32 bg-bg">
          <div className="max-w-2xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }}
              className="modern-card text-center"
            >
            <div className="mb-8">
              <div className="text-lg text-t2 mb-6">
                {tQuiz('performanceSummary')}
              </div>
            </div>
            
            <div className="mb-6">
              <div className="text-6xl font-bold text-accent mb-2">
                {percentage}%
              </div>
              <div className="text-lg text-t2">
                {t('quiz.score')}: {score} / {questions.length}
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {percentage >= 80 && (
                <div className="text-accent font-semibold text-lg">{tQuiz('excellent')}</div>
              )}
              {percentage >= 60 && percentage < 80 && (
                <div className="text-warn font-semibold text-lg">{tQuiz('goodJob')}</div>
              )}
              {percentage < 60 && (
                <div className="text-danger font-semibold text-lg">{tQuiz('keepLearning')}</div>
              )}
              
              {streak > 0 && (
                <div className="bg-accent-wash rounded-lg p-4">
                  <div className="text-accent font-semibold">
                    {tQuiz('maxStreak', { streak })}
                  </div>
                </div>
              )}
              
              {quizMode === 'challenge' && (
                <div className="bg-danger-wash rounded-lg p-4">
                  <div className="text-danger font-semibold">
                    {tQuiz('challengeBonus', { points: Math.floor(percentage * 0.1) })}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={resetQuiz}
              className="btn-primary btn-hero-primary"
            >
              {t('quiz.retry')}
            </button>
          </motion.div>
            </div>
          </div>
        </div>
    );
  }

  const question = questions[currentQuestion];

  // Render different question types
  const renderQuestion = () => {
    switch (question.type) {
      case 'single-choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
 selectedAnswer === index
 ? 'border-accent bg-accent-wash '
 : 'border-line hover:border-accent'
 }`}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
 selectedAnswer === index
 ? 'border-accent bg-accent-solid'
 : 'border-line-control '
 }`}>
                    {selectedAnswer === index && (
                      <div className="w-2 h-2 bg-surface-1 rounded-full mx-auto mt-0.5" />
                    )}
                  </div>
                  <span className="text-t2">{option}</span>
                </div>
              </button>
            ))}
          </div>
        );
      
      case 'true-false':
        return (
          <div className="grid grid-cols-2 gap-4">
            {question.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`p-6 text-center rounded-xl border-2 transition-all duration-200 ${
 selectedAnswer === index
 ? 'border-accent bg-accent-wash '
 : 'border-line hover:border-accent'
 }`}
              >
                <div className="mb-2 flex justify-center">{index === 0 ? <CheckIcon className="w-6 h-6" /> : <CrossIcon className="w-6 h-6" />}</div>
                <div className="font-semibold text-t2">{option}</div>
              </button>
            ))}
          </div>
        );
      
      case 'scenario':
        return (
          <div>
            {question.scenario && (
              <div className="bg-accent-wash rounded-lg p-4 mb-6">
                <div className="text-accent font-medium mb-2">{tQuiz('scenario')}:</div>
                <div className="text-accent">{question.scenario}</div>
              </div>
            )}
            <div className="space-y-3">
              {question.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
 selectedAnswer === index
 ? 'border-accent bg-accent-wash '
 : 'border-line hover:border-accent'
 }`}
                >
                  <span className="text-t2 font-medium">{option}</span>
                </button>
              ))}
            </div>
          </div>
        );
      
      case 'fill-blank':
        return (
          <FillBlankQuestion question={question} onAnswer={handleAnswerSelect} />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Quiz Header */}
      <div className="bg-surface-2 border-b border-line">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={resetQuiz}
                className="inline-flex items-center text-t2 hover:text-t1 text-sm font-medium"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-1" />
{tQuiz('backToModes')}
              </button>
              <div className="text-sm font-medium text-t3">
{tQuiz('modeLabel', { mode: quizMode.charAt(0).toUpperCase() + quizMode.slice(1) })}
              </div>
            </div>
            <div className="flex items-center gap-4">
              {quizMode === 'timed' && (
                <div className={`text-lg font-bold px-4 py-2 rounded-full ${
 timeLeft <= 5 
 ? 'text-danger bg-danger-wash' 
 : 'text-warn bg-warn-wash'
 }`}>
                  {timeLeft}s
                </div>
              )}
              {streak > 1 && (
                <div className="text-lg font-bold text-accent bg-accent-wash px-4 py-2 rounded-full">
                  {streak} streak
                </div>
              )}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light text-t1 mb-4 leading-tight">
{tQuiz('interactiveQuiz')}
          </h1>
          <div className="text-lg text-t2">
{tQuiz('questionCount', { current: currentQuestion + 1, total: questions.length })}
          </div>
        </div>
      </div>

      {/* Main Quiz Content */}
      <div className="py-8">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">

          {/* Progress bar */}
          <div className="mb-6">
            <div className="w-full bg-surface-3 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-300 shadow-sm ${
 quizMode === 'timed' ? 'bg-warn' : 
 quizMode === 'challenge' ? 'bg-danger' :
 'bg-accent-solid'
 }`}
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
            {quizMode === 'timed' && timeLeft <= 10 && (
              <div className="w-full bg-danger-wash rounded-full h-2 mt-2">
                <div 
                  className="bg-danger h-2 rounded-full transition-all duration-100"
                  style={{ width: `${(timeLeft / 30) * 100}%` }}
                />
              </div>
            )}
          </div>

          {/* Question */}
          <motion.div
            key={currentQuestion}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
            className="modern-card"
            style={{ transform: 'translateZ(0)', willChange: 'opacity' }}
          >
            <div className="flex justify-between items-start mb-8">
              <h2 className="text-xl font-medium text-t1 leading-relaxed">
                {question.text}
              </h2>
              {question.difficulty && (
                <div className={`px-3 py-1 rounded-full text-xs font-medium ml-4 flex-shrink-0 ${
 question.difficulty === 'easy' ? 'bg-accent-wash text-accent' :
 question.difficulty === 'medium' ? 'bg-warn-wash text-warn' :
 'bg-danger-wash text-danger'
 }`}>
                  {tQuiz(`difficulty.${question.difficulty}`)}
                </div>
              )}
            </div>

          {renderQuestion()}

            <div className="flex justify-between items-center mt-12">
              <div className="text-sm text-t3">
                {tQuiz('questionType', { type: question.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) })}
              </div>
              <button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className={`px-8 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedAnswer !== null
                    ? `${quizMode === 'timed' ? 'bg-warn hover:opacity-90' : 
                        quizMode === 'challenge' ? 'bg-danger hover:opacity-90' :
                        'bg-accent-solid hover:bg-accent-hover'} text-accent-on shadow-lg hover:shadow-xl hover:scale-105`
 : 'bg-surface-3 text-t3 cursor-not-allowed'
 }`}
              >
{currentQuestion < questions.length - 1 ? tQuiz('nextQuestion') : tQuiz('submitQuiz')}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
