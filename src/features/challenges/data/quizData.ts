import type { ChallengeDefinition } from '../../../types'

export interface QuizOption {
  text: string
  textEn: string
  isCorrect: boolean
}

export interface QuizConfig {
  question: string
  questionEn: string
  options: QuizOption[]
  explanation?: string
  explanationEn?: string
}

export const quizChallenges: ChallengeDefinition[] = [
  {
    id: 'quiz-love-date',
    category: 'quiz',
    difficulty: 'easy',
    titleKey: 'Câu hỏi tình yêu',
    descriptionKey: 'Trả lời đúng để tiếp tục!',
    timeLimitSeconds: 15,
    config: {
      question: 'Ngày Valentine là ngày bao nhiêu?',
      questionEn: 'When is Valentine\'s Day?',
      options: [
        { text: '14 tháng 1', textEn: 'January 14', isCorrect: false },
        { text: '14 tháng 2', textEn: 'February 14', isCorrect: true },
        { text: '14 tháng 3', textEn: 'March 14', isCorrect: false },
        { text: '20 tháng 10', textEn: 'October 20', isCorrect: false },
      ],
      explanation: 'Valentine là ngày 14/2 nha! 💕',
      explanationEn: 'Valentine\'s Day is February 14! 💕',
    } satisfies QuizConfig,
  },
  {
    id: 'quiz-heart-emoji',
    category: 'quiz',
    difficulty: 'easy',
    titleKey: 'Đoán nghĩa emoji',
    descriptionKey: 'Emoji nào nói "yêu" nhiều nhất?',
    timeLimitSeconds: 12,
    config: {
      question: 'Emoji nào biểu thị trái tim đang đập?',
      questionEn: 'Which emoji represents a beating heart?',
      options: [
        { text: '💔', textEn: '💔', isCorrect: false },
        { text: '💓', textEn: '💓', isCorrect: true },
        { text: '💜', textEn: '💜', isCorrect: false },
        { text: '🖤', textEn: '🖤', isCorrect: false },
      ],
      explanation: '💓 là trái tim đang đập vì yêu đó! 😍',
      explanationEn: '💓 is the beating heart emoji! 😍',
    } satisfies QuizConfig,
  },
  {
    id: 'quiz-love-song',
    category: 'quiz',
    difficulty: 'medium',
    titleKey: 'Ca khúc tình yêu',
    descriptionKey: 'Kiến thức âm nhạc của bạn thế nào?',
    timeLimitSeconds: 15,
    config: {
      question: 'Bài hát "Perfect" nổi tiếng là của ai?',
      questionEn: 'Who sang the famous song "Perfect"?',
      options: [
        { text: 'Bruno Mars', textEn: 'Bruno Mars', isCorrect: false },
        { text: 'Ed Sheeran', textEn: 'Ed Sheeran', isCorrect: true },
        { text: 'Adele', textEn: 'Adele', isCorrect: false },
        { text: 'Taylor Swift', textEn: 'Taylor Swift', isCorrect: false },
      ],
      explanation: 'Ed Sheeran hát "Perfect" cho vợ anh ấy đó! 🎵',
      explanationEn: 'Ed Sheeran wrote "Perfect" for his wife! 🎵',
    } satisfies QuizConfig,
  },
  {
    id: 'quiz-love-phrase',
    category: 'quiz',
    difficulty: 'medium',
    titleKey: 'Hoàn thành câu',
    descriptionKey: 'Câu nào đúng nhất?',
    timeLimitSeconds: 12,
    config: {
      question: '"Yêu là..." — Hoàn thành câu này!',
      questionEn: '"Love is..." — Complete this phrase!',
      options: [
        { text: '...khi nào cũng đúng', textEn: '...always being right', isCorrect: false },
        { text: '...cho đi không cần nhận lại', textEn: '...giving without expecting', isCorrect: true },
        { text: '...ăn sạch tủ lạnh', textEn: '...eating all the snacks', isCorrect: false },
        { text: '...wifi miễn phí', textEn: '...free wifi', isCorrect: false },
      ],
      explanation: 'Yêu là cho đi... nhưng wifi miễn phí cũng ngon 😂',
      explanationEn: 'Love is giving... but free wifi is nice too 😂',
    } satisfies QuizConfig,
  },
  {
    id: 'quiz-love-language',
    category: 'quiz',
    difficulty: 'medium',
    titleKey: '5 ngôn ngữ tình yêu',
    descriptionKey: 'Bạn biết bao nhiêu về "Love Languages"?',
    timeLimitSeconds: 15,
    config: {
      question: 'Đâu KHÔNG phải là một trong "5 Ngôn ngữ Tình yêu"?',
      questionEn: 'Which is NOT one of the "5 Love Languages"?',
      options: [
        { text: 'Cử chỉ âu yếm', textEn: 'Physical Touch', isCorrect: false },
        { text: 'Lời khen ngợi', textEn: 'Words of Affirmation', isCorrect: false },
        { text: 'Mua sắm online', textEn: 'Online Shopping', isCorrect: true },
        { text: 'Thời gian bên nhau', textEn: 'Quality Time', isCorrect: false },
      ],
      explanation: 'Mua sắm online KHÔNG phải ngôn ngữ tình yêu (dù nó rất vui) 😅',
      explanationEn: 'Online Shopping is NOT a love language (though it\'s fun) 😅',
    } satisfies QuizConfig,
  },
]
