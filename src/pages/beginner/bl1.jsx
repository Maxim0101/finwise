import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './bl1.module.css';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import exampleImage from '../../assets/l1-ex-image.jpeg';
import confetti from 'canvas-confetti';

const Lesson1 = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [quizStarted, setQuizStarted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (showResult && score >= 3) {
      // Fire multiple bursts for a better effect
      const duration = 2 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };
  
      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
  
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
  
        const particleCount = 50 * (timeLeft / duration);
        // Since particles fall down, start a bit higher
        confetti({
          ...defaults,
          particleCount,
          origin: {
            x: Math.random(),
            y: Math.random() * 0.6
          }
        });
      }, 250);
    }
  }, [showResult, score]);
  

  useEffect(() => {
    document.body.classList.toggle('modal-open', quizStarted || showResult);
  }, [quizStarted, showResult]);

  const questions = [
    {
      question: 'Which of the following best describes money?',
      options: [
        'A medium of exchange that people accept for goods and services',
        'Any object that has a lot of physical value by itself (like only gold and silver)',
        'An item with no value that people randomly decided to use',
        'A service provided by banks only'
      ],
      correctAnswer: 0
    },
    {
      question: 'Which of these is a common source of income for individuals?',
      options: [
        'Earnings from a job or work',
        'Money that magically appears each month',
        'Items you own that increase in value without reason',
        'Paying bills and taxes'
      ],
      correctAnswer: 0
    },
    {
      question: 'True or False: If you earn a salary, you are paid a fixed amount regardless of the hours you work.',
      options: ['True', 'False'],
      correctAnswer: 0
    },
    {
      question: 'When you look at a paycheck, “net income” (take-home pay) is typically:',
      options: [
        'Larger than gross income, because taxes add extra money',
        'Smaller than gross income, because deductions (like taxes) are taken out',
        'Exactly the same as gross income',
        'Only the amount you get from tips and bonuses'
      ],
      correctAnswer: 1
    },
    {
      question: 'Select all that apply: Which of the following are types of currency (money) used in different countries?',
      options: ['Dollar', 'Euro', 'Yen', 'Facebook “Likes”'],
      correctAnswer: [0, 1, 2] // Multiple correct
    }
  ];

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerChange = (e, questionIndex) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = parseInt(e.target.value);
    setQuizAnswers(newAnswers);
  };

  const submitQuiz = () => {
    let calculatedScore = 0;

    questions.forEach((question, index) => {
      const userAnswer = quizAnswers[index];
      const correct = question.correctAnswer;

      if (Array.isArray(correct)) {
        if (
          Array.isArray(userAnswer) &&
          userAnswer.length === correct.length &&
          userAnswer.every((val) => correct.includes(val))
        ) {
          calculatedScore++;
        }
      } else if (userAnswer === correct) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
    setShowResult(true);
  };

  const handleRetry = () => {
    setQuizStarted(false);
    setQuizAnswers([]);
    setShowResult(false);
    setScore(0);
  };

  const handleGoToNextLesson = () => {
    navigate('/lessons/beginner/lesson2');
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h2 className={styles.title}>Lesson: Money and Income Basics</h2>

        <div className={styles.lessonContent}>
          <div className={styles.lessonText}>
            <p>Money makes the world go round – but what exactly is money? Simply put, money is anything widely accepted as payment for goods and services. It acts as a medium of exchange, a store of value, and a unit of account (standard measure of value) in an economy. Around the world, money takes the form of different currencies (like U.S. dollars, Euros, or Japanese yen), but all perform these same functions.</p>

            <p>In earlier times, people bartered or used commodities like grain or cattle as money, but today most countries use paper money or digital currency issued by governments.</p>

            <p>Equally important is understanding income – the money you earn or receive. For most people, income comes from working at a job. You might earn a wage (an hourly rate for each hour worked) or a salary (a fixed amount per year, paid in regular portions). For example, an hourly wage might pay $15 per hour, whereas a salary might pay $50,000 per year regardless of hours worked.</p>

            <img
              src={exampleImage}
              alt="Illustration of money and income"
              className={styles.lessonImage}
            />

            <p>Income can also come from allowances, gifts, or later in life from investments and interest. Whenever you earn money, it’s wise to remember that gross income (the total amount you earn) is not the same as net income (what you take home after deductions).</p>

            <p>Employers often deduct taxes and other items straight from your paycheck. In the U.S., for instance, a portion of your earnings is withheld for income taxes and contributions to Social Security and Medicare (programs that support older adults). This means your take-home pay (net income) will be less than what you earned, with the difference going to government programs and services that benefit everyone.</p>

            <p>It may not feel exciting to lose a chunk of your paycheck, but those tax dollars fund things like schools, roads, and public safety that we rely on every day.</p>

            <p>In summary, money is the tool we use to exchange value, and income is how money flows into our lives. Knowing how money works and where your income goes (for example, understanding that some is automatically set aside for taxes) is the first step toward smart financial management.</p>

            <p>No matter your age, recognizing the value of money and earning it responsibly (say, through a part-time job or chores) can help build good habits. As we move forward, we’ll learn how to best use that hard-earned income – from budgeting wisely to saving for the future.</p>
          </div>

          <button onClick={startQuiz} className={styles.startQuizBtn}>
            Start Quiz
          </button>
        </div>

        {/* Quiz Modal */}
        {quizStarted && !showResult && (
          <div className={styles.quizOverlay}>
            <div className={styles.quizModal}>
              <h3 className={styles.quizTitle}>Quiz</h3>
              {questions.map((question, index) => (
                <div key={index} className={styles.question}>
                  <p>{index + 1}. {question.question}</p>
                  <div className={styles.optionGroup}>
                    {Array.isArray(question.correctAnswer) ? (
                      question.options.map((option, optionIndex) => (
                        <label key={optionIndex}>
                          <input
                            type="checkbox"
                            value={optionIndex}
                            checked={quizAnswers[index]?.includes(optionIndex) || false}
                            onChange={(e) => {
                              const newAnswers = [...quizAnswers];
                              if (!newAnswers[index]) newAnswers[index] = [];
                              if (e.target.checked) {
                                newAnswers[index].push(optionIndex);
                              } else {
                                newAnswers[index] = newAnswers[index].filter(i => i !== optionIndex);
                              }
                              setQuizAnswers(newAnswers);
                            }}
                          />
                          {option}
                        </label>
                      ))
                    ) : (
                      question.options.map((option, optionIndex) => (
                        <label key={optionIndex}>
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={optionIndex}
                            checked={quizAnswers[index] === optionIndex}
                            onChange={(e) => handleAnswerChange(e, index)}
                          />
                          {option}
                        </label>
                      ))
                    )}
                  </div>
                </div>
              ))}

              <div className={styles.resultButtonGroup}>
                <button onClick={submitQuiz} className={styles.submitQuizBtn}>
                  Submit Quiz
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Result Modal */}
        {showResult && (
          <div className={styles.quizOverlay}>
            <div className={styles.quizModal}>
              <h3 className={styles.quizTitle}>Your Score: {score} / 5</h3>
              {score >= 3 ? (
                <div className={styles.confetti}>🎉 Great job!</div>
              ) : (
                <div className={styles.tryAgainMsg}>You can do better! Try again!</div>
              )}
              <div className={styles.resultButtonGroup}>
                <button onClick={handleRetry} className={styles.retryBtn}>Try Again</button>
                {score >= 3 && (
                  <button onClick={handleGoToNextLesson} className={styles.nextLessonBtn}>Next Lesson</button>
                )}
                <Link to="/lessons" className={styles.homeBtn}>Back to Learn Page</Link>
                <Link to="/" className={styles.homeBtn}>Home</Link>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Lesson1;
