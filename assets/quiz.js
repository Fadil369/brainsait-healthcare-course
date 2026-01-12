// BrainSait Quiz System
class BrainSaitQuiz {
    constructor() {
        this.quizScores = JSON.parse(localStorage.getItem('brainSaitQuizScores') || '{}');
        this.currentModule = null;
        this.initialize();
    }

    initialize() {
        // Check if we're on a module page
        const moduleMatch = window.location.pathname.match(/module(\d+)\.html$/);
        if (moduleMatch) {
            this.currentModule = parseInt(moduleMatch[1]);
            this.setupModuleQuiz();
        }
        
        // Check if we're on the final assessment page
        if (window.location.pathname.includes('final-assessment.html')) {
            this.setupFinalAssessment();
        }
    }

    setupModuleQuiz() {
        const quizContainer = document.getElementById('module-quiz');
        if (!quizContainer) return;

        // Get quiz questions for this module
        const questions = this.getModuleQuestions(this.currentModule);
        
        // Generate quiz HTML
        quizContainer.innerHTML = this.generateQuizHTML(questions, `module${this.currentModule}`);
        
        // Setup event listeners
        this.setupQuizEventListeners(`module${this.currentModule}`);
    }

    setupFinalAssessment() {
        const quizContainer = document.getElementById('final-assessment');
        if (!quizContainer) return;

        const questions = this.getFinalAssessmentQuestions();
        quizContainer.innerHTML = this.generateQuizHTML(questions, 'final');
        
        this.setupQuizEventListeners('final');
        
        // Add submit button for final assessment
        const submitBtn = document.createElement('button');
        submitBtn.className = 'bs-btn bs-btn-primary mt-6';
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i><span data-en="Submit Final Assessment" data-ar="تقديم التقييم النهائي">Submit Final Assessment</span>';
        submitBtn.addEventListener('click', () => this.submitFinalAssessment());
        quizContainer.appendChild(submitBtn);
    }

    getModuleQuestions(moduleNumber) {
        // Module-specific questions
        const questions = {
            1: [
                {
                    question: { en: "What is the annual growth rate of healthcare data?", ar: "ما هو معدل النمو السنوي للبيانات الصحية؟" },
                    options: [
                        { text: { en: "15% annually", ar: "15٪ سنويًا" }, correct: false },
                        { text: { en: "36% annually", ar: "36٪ سنويًا" }, correct: true },
                        { text: { en: "50% annually", ar: "50٪ سنويًا" }, correct: false }
                    ]
                },
                {
                    question: { en: "Which of these is NOT a type of healthcare data?", ar: "أي من هذه ليس نوعًا من البيانات الصحية؟" },
                    options: [
                        { text: { en: "Clinical data", ar: "البيانات السريرية" }, correct: false },
                        { text: { en: "Imaging data", ar: "بيانات التصوير" }, correct: false },
                        { text: { en: "Social media posts", ar: "منشورات وسائل التواصل الاجتماعي" }, correct: true }
                    ]
                }
            ],
            2: [
                {
                    question: { en: "What is the annual global cost of healthcare data silos?", ar: "ما هي التكلفة العالمية السنوية لصوامع البيانات الصحية؟" },
                    options: [
                        { text: { en: "7.5 trillion SAR", ar: "7.5 تريليون ريال" }, correct: false },
                        { text: { en: "11.6 trillion SAR ($3.1T USD)", ar: "11.6 تريليون ريال (3.1 تريليون دولار)" }, correct: true },
                        { text: { en: "18 trillion SAR", ar: "18 تريليون ريال" }, correct: false }
                    ]
                }
            ],
            3: [
                {
                    question: { en: "Which FHIR version does Saudi NPHIES use?", ar: "أي إصدار من FHIR تستخدمه نفيس السعودية؟" },
                    options: [
                        { text: { en: "FHIR R3", ar: "FHIR R3" }, correct: false },
                        { text: { en: "FHIR R4", ar: "FHIR R4" }, correct: true },
                        { text: { en: "FHIR R5", ar: "FHIR R5" }, correct: false }
                    ]
                }
            ],
            4: [
                {
                    question: { en: "Which organization helps enforce data residency regulations in Saudi Arabia?", ar: "أي منظمة تساعد في فرض لوائح إقامة البيانات في المملكة العربية السعودية؟" },
                    options: [
                        { text: { en: "FDA", ar: "FDA" }, correct: false },
                        { text: { en: "NDMO / NCA", ar: "NDMO / NCA" }, correct: true },
                        { text: { en: "WHO", ar: "WHO" }, correct: false }
                    ]
                }
            ],
            5: [
                {
                    question: { en: "What does NPHIES stand for?", ar: "ماذا تعني نفيس؟" },
                    options: [
                        { text: { en: "National Platform for Health Insurance Exchange Services", ar: "المنصة الوطنية لخدمات التأمين الصحي" }, correct: true },
                        { text: { en: "National Program for Healthcare Information Exchange System", ar: "البرنامج الوطني لنظام تبادل معلومات الرعاية الصحية" }, correct: false },
                        { text: { en: "National Platform for Healthcare Information Exchange Standards", ar: "المنصة الوطنية لمعايير تبادل معلومات الرعاية الصحية" }, correct: false }
                    ]
                }
            ],
            6: [
                {
                    question: { en: "Which technology is NOT typically part of future healthcare interoperability?", ar: "أي تقنية ليست عادة جزءًا من التشغيل البيني المستقبلي للرعاية الصحية؟" },
                    options: [
                        { text: { en: "Artificial Intelligence", ar: "الذكاء الاصطناعي" }, correct: false },
                        { text: { en: "Internet of Medical Things", ar: "إنترنت الأشياء الطبي" }, correct: false },
                        { text: { en: "Paper-based records", ar: "السجلات الورقية" }, correct: true }
                    ]
                }
            ]
        };

        return questions[moduleNumber] || [];
    }

    getFinalAssessmentQuestions() {
        // Comprehensive questions from all modules
        return [
            {
                question: { en: "What is the primary challenge addressed by healthcare interoperability?", ar: "ما هو التحدي الأساسي الذي يعالجه التشغيل البيني للرعاية الصحية؟" },
                options: [
                    { text: { en: "Data silos and fragmentation", ar: "صوامع البيانات والتجزئة" }, correct: true },
                    { text: { en: "Lack of medical devices", ar: "نقص الأجهزة الطبية" }, correct: false },
                    { text: { en: "High cost of medications", ar: "ارتفاع تكلفة الأدوية" }, correct: false }
                ]
            },
            {
                question: { en: "Which standard is considered the modern solution for healthcare data exchange?", ar: "أي معيار يعتبر الحل الحديث لتبادل البيانات الصحية؟" },
                options: [
                    { text: { en: "HL7 v2", ar: "HL7 v2" }, correct: false },
                    { text: { en: "FHIR", ar: "FHIR" }, correct: true },
                    { text: { en: "DICOM", ar: "DICOM" }, correct: false }
                ]
            },
            {
                question: { en: "What is the main advantage of cloud-based FHIR services?", ar: "ما هي الميزة الرئيسية لخدمات FHIR السحابية؟" },
                options: [
                    { text: { en: "Scalability and managed infrastructure", ar: "قابلية التوسع والبنية التحتية المدارة" }, correct: true },
                    { text: { en: "Lower internet speed requirements", ar: "متطلبات سرعة إنترنت أقل" }, correct: false },
                    { text: { en: "No need for security measures", ar: "لا حاجة لإجراءات الأمان" }, correct: false }
                ]
            },
            {
                question: { en: "Which Saudi Arabian platform uses FHIR R4 for insurance transactions?", ar: "أي منصة سعودية تستخدم FHIR R4 للمعاملات التأمينية؟" },
                options: [
                    { text: { en: "NPHIES", ar: "نفيس" }, correct: true },
                    { text: { en: "Absher", ar: "أبشر" }, correct: false },
                    { text: { en: "Mawid", ar: "موعد" }, correct: false }
                ]
            },
            {
                question: { en: "What percentage of healthcare spending is wasted globally due to data fragmentation?", ar: "ما هي نسبة الإنفاق على الرعاية الصحية التي تهدر عالميًا بسبب تجزئة البيانات؟" },
                options: [
                    { text: { en: "10%", ar: "10٪" }, correct: false },
                    { text: { en: "30%", ar: "30٪" }, correct: true },
                    { text: { en: "50%", ar: "50٪" }, correct: false }
                ]
            }
        ];
    }

    generateQuizHTML(questions, quizId) {
        const currentLang = window.getCourseLang ? window.getCourseLang() : 'en';
        
        let html = `
            <div class="space-y-6" id="${quizId}-questions">
        `;
        
        questions.forEach((q, index) => {
            const questionText = q.question[currentLang] || q.question.en;
            
            html += `
                <div class="bs-card-inner p-6" data-question-index="${index}">
                    <h3 class="text-lg font-bold mb-4">${questionText}</h3>
                    <div class="space-y-3">
            `;
            
            q.options.forEach((option, optIndex) => {
                const optionText = option.text[currentLang] || option.text.en;
                const letter = String.fromCharCode(65 + optIndex);
                
                html += `
                    <button class="w-full text-left p-4 bs-card-inner hover:bg-white/5 transition quiz-option" 
                            data-quiz="${quizId}" 
                            data-question="${index}" 
                            data-option="${optIndex}" 
                            data-correct="${option.correct}">
                        <span>${letter}) ${optionText}</span>
                    </button>
                `;
            });
            
            html += `
                    </div>
                    <div class="mt-3 text-sm hidden" id="feedback-${quizId}-${index}"></div>
                </div>
            `;
        });
        
        html += `</div>`;
        
        // Add score display for final assessment
        if (quizId === 'final') {
            html += `
                <div class="mt-6 bs-card-inner p-6">
                    <div class="flex justify-between items-center">
                        <div>
                            <h3 class="text-lg font-bold" data-en="Your Score" data-ar="درجتك">Your Score</h3>
                            <p class="bs-muted" data-en="Score 80% or higher to earn your certificate" data-ar="احصل على 80٪ أو أكثر للحصول على شهادتك">Score 80% or higher to earn your certificate</p>
                        </div>
                        <div class="text-3xl font-bold" id="final-score">0%</div>
                    </div>
                    <div class="mt-4 bs-card-inner p-2">
                        <div id="final-score-bar" class="h-3 rounded-full" style="width: 0%; background: linear-gradient(120deg, rgba(108, 99, 255, 0.75), rgba(0, 212, 255, 0.70));"></div>
                    </div>
                </div>
            `;
        }
        
        return html;
    }

    setupQuizEventListeners(quizId) {
        const options = document.querySelectorAll(`.quiz-option[data-quiz="${quizId}"]`);
        
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                const questionIndex = e.target.dataset.question;
                const optionIndex = e.target.dataset.option;
                const isCorrect = e.target.dataset.correct === 'true';
                
                this.handleAnswer(quizId, parseInt(questionIndex), parseInt(optionIndex), isCorrect);
            });
        });
    }

    handleAnswer(quizId, questionIndex, optionIndex, isCorrect) {
        // Update UI
        const questionElement = document.querySelector(`[data-quiz="${quizId}"][data-question="${questionIndex}"]`);
        const feedbackElement = document.getElementById(`feedback-${quizId}-${questionIndex}`);
        const allOptions = document.querySelectorAll(`[data-quiz="${quizId}"][data-question="${questionIndex}"]`);
        
        // Reset styles
        allOptions.forEach(opt => {
            opt.classList.remove('border', 'bg-green-500/10', 'border-green-500/60', 'bg-red-500/10', 'border-red-500/60');
            opt.classList.add('bs-card-inner');
        });
        
        // Style selected option
        if (isCorrect) {
            questionElement.classList.add('border', 'bg-green-500/10', 'border-green-500/60');
        } else {
            questionElement.classList.add('border', 'bg-red-500/10', 'border-red-500/60');
            
            // Highlight correct answer
            const correctOption = document.querySelector(`[data-quiz="${quizId}"][data-question="${questionIndex}"][data-correct="true"]`);
            if (correctOption) {
                correctOption.classList.add('border', 'bg-green-500/10', 'border-green-500/60');
            }
        }
        
        // Show feedback
        if (feedbackElement) {
            feedbackElement.classList.remove('hidden');
            const currentLang = window.getCourseLang ? window.getCourseLang() : 'en';
            
            if (isCorrect) {
                feedbackElement.className = 'mt-3 text-sm text-green-400';
                feedbackElement.textContent = currentLang === 'ar' ? 'إجابة صحيحة! ✓' : 'Correct answer! ✓';
            } else {
                feedbackElement.className = 'mt-3 text-sm text-red-400';
                feedbackElement.textContent = currentLang === 'ar' ? 'إجابة غير صحيحة. حاول مرة أخرى.' : 'Incorrect answer. Try again.';
            }
        }
        
        // Save score for module quizzes
        if (quizId.startsWith('module')) {
            const moduleNum = parseInt(quizId.replace('module', ''));
            this.saveModuleScore(moduleNum, questionIndex, isCorrect);
        }
        
        // Update final assessment score
        if (quizId === 'final') {
            this.updateFinalScore();
        }
    }

    saveModuleScore(moduleNum, questionIndex, isCorrect) {
        if (!this.quizScores[`module${moduleNum}`]) {
            this.quizScores[`module${moduleNum}`] = {};
        }
        
        this.quizScores[`module${moduleNum}`][`q${questionIndex}`] = isCorrect;
        localStorage.setItem('brainSaitQuizScores', JSON.stringify(this.quizScores));
    }

    updateFinalScore() {
        const questions = document.querySelectorAll('[data-quiz="final"][data-question]');
        let correctCount = 0;
        let totalAnswered = 0;
        
        questions.forEach(q => {
            const isCorrect = q.dataset.correct === 'true';
            if (q.classList.contains('border')) { // Answered
                totalAnswered++;
                if (isCorrect) correctCount++;
            }
        });
        
        const score = totalAnswered > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
        
        const scoreElement = document.getElementById('final-score');
        const scoreBar = document.getElementById('final-score-bar');
        
        if (scoreElement) scoreElement.textContent = `${score}%`;
        if (scoreBar) scoreBar.style.width = `${score}%`;
        
        return score;
    }

    submitFinalAssessment() {
        const score = this.updateFinalScore();
        const currentLang = window.getCourseLang ? window.getCourseLang() : 'en';
        
        // Save final score
        this.quizScores.final = score;
        localStorage.setItem('brainSaitQuizScores', JSON.stringify(this.quizScores));
        
        // Show result
        alert(currentLang === 'ar' 
            ? `تم تقديم تقييمك النهائي! درجتك: ${score}%${score >= 80 ? ' - تهانينا! يمكنك الآن الحصول على شهادتك.' : ' - تحتاج إلى 80٪ على الأقل للحصول على الشهادة.'}`
            : `Final assessment submitted! Your score: ${score}%${score >= 80 ? ' - Congratulations! You can now get your certificate.' : ' - You need at least 80% to earn the certificate.'}`
        );
        
        // If score is sufficient, show certificate button
        if (score >= 80) {
            this.showCertificateButton();
        }
    }

    showCertificateButton() {
        const container = document.getElementById('final-assessment');
        if (!container) return;
        
        const button = document.createElement('button');
        button.className = 'bs-btn bs-btn-primary mt-6';
        button.innerHTML = '<i class="fas fa-award"></i><span data-en="Get Your Certificate" data-ar="احصل على شهادتك">Get Your Certificate</span>';
        button.addEventListener('click', () => this.generateCertificate());
        container.appendChild(button);
    }

    generateCertificate() {
        // Redirect to certificate page
        window.location.href = 'certificate.html';
    }

    getOverallQuizScore() {
        let totalCorrect = 0;
        let totalQuestions = 0;
        
        Object.keys(this.quizScores).forEach(quizId => {
            if (quizId.startsWith('module')) {
                const moduleScores = this.quizScores[quizId];
                Object.keys(moduleScores).forEach(qKey => {
                    totalQuestions++;
                    if (moduleScores[qKey]) totalCorrect++;
                });
            }
        });
        
        return totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    }
}

// Initialize quiz system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.brainSaitQuiz = new BrainSaitQuiz();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BrainSaitQuiz;
}
