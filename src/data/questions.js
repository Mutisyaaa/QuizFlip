export const quizTopics = [
  "All Topics",
  "Topic 1: Management",
  "Topic 2: Approaches to Management",
  "Topic 3: Theories of Management",
  "Topic 4: Planning",
  "Topic 5: Organizing",
  "Topic 6: Controlling",
  "Topic 7: Leadership",
  "Topic 8: Group Formation",
  "Topic 9: Organizational Culture & Dev",
  "Topic 10: HR Planning & MBO",
  "Topic 11: Staff Motivation",
  "Topic 12: Supervision & Coordination",
  "Topic 13: Staffing",
  "Topic 14: Decision Making"
];

export const quizQuestions = [
  // ==========================================
  // TOPIC 1: MANAGEMENT (8 Questions)
  // ==========================================
  {
    id: 1,
    topic: "Topic 1: Management",
    concept: "M.P. Follett's Definition of Management",
    question: "How does M.P. Follett define management, and how do managers achieve it?",
    answer: "M.P. Follett defines management as 'the art of getting things done through other people.' Managers achieve goals by enabling others to perform via delegation, communication, and empowerment.",
    options: [
      "The art of getting things done through other people via delegation, communication, and empowerment",
      "The process of performing all technical tasks personally without delegating",
      "The science of replacing human labor with automated machinery",
      "The legal right to punish workers who fail to meet targets"
    ],
    correctIndex: 0
  },
  {
    id: 2,
    topic: "Topic 1: Management",
    concept: "Five Core Management Functions",
    question: "According to your notes, how are the 5 functions of management (Planning, Organizing, Staffing, Leading, Controlling) briefly defined?",
    answer: "Planning: defining future state; Organizing: putting similar tasks together to form a department; Staffing: identifying who should do the tasks; Leading: showing them how to do it; Controlling: setting targets/objectives to be pursued.",
    options: [
      "Planning defines the future state; Organizing groups similar tasks into a department; Staffing identifies who does the tasks; Leading shows how to do them; Controlling sets targets",
      "Planning hires staff; Organizing fires staff; Staffing writes budgets; Leading audits accounts; Controlling designs logos",
      "All five functions mean the exact same thing and are only performed by supervisors",
      "Planning looks backward; Controlling only happens before a company opens"
    ],
    correctIndex: 0
  },
  {
    id: 3,
    topic: "Topic 1: Management",
    concept: "Effectiveness vs. Efficiency",
    question: "In management, what is the distinction between being 'effective' and being 'efficient'?",
    answer: "To be effective is to do the right things, whereas to be efficient is to do things correctly.",
    options: [
      "Effectiveness is cutting salaries; efficiency is hiring more casual workers",
      "To be effective is to do the right things; to be efficient is to do things correctly",
      "Effectiveness applies only to supervisors; efficiency applies only to CEOs",
      "Effectiveness means following rules blindly; efficiency means ignoring budgets"
    ],
    correctIndex: 1
  },
  {
    id: 4,
    topic: "Topic 1: Management",
    concept: "Management Levels & Decision Types",
    question: "Which organizational levels correspond to Strategic, Tactical, and Operational decisions?",
    answer: "Strategic decisions are made by top management (CEOs, etc.), Tactical decisions by Departmental Heads, and Operational decisions by Supervisors.",
    options: [
      "Strategic = Supervisors; Tactical = CEOs; Operational = Departmental Heads",
      "Strategic = CEOs/Top Management; Tactical = Departmental Heads; Operational = Supervisors",
      "Strategic = Trade Unions; Tactical = Casual Workers; Operational = Shareholders",
      "All three decision types are made exclusively by the Human Resource department"
    ],
    correctIndex: 1
  },
  {
    id: 5,
    topic: "Topic 1: Management",
    concept: "J.F. Stoner's Definition of Management",
    question: "What does J.F. Stoner's definition of management suggest about the nature of management?",
    answer: "Stoner defines management as planning, organizing, staffing, leading, and controlling worker efforts and organizational resources. It suggests management is a continuous process using both physical and human resources effectively at all levels.",
    options: [
      "Management is a one-time event that only uses physical machines",
      "Management is a continuous process where interrelated activities use both physical and human resources effectively",
      "Management only applies to profit-making factories and never to service organizations",
      "Managers should avoid using human resources to achieve company goals"
    ],
    correctIndex: 1
  },
  {
    id: 6,
    topic: "Topic 1: Management",
    concept: "History of Management",
    question: "Why is management described as the 'oldest of the Arts and youngest of the Sciences'?",
    answer: "The practice of management is as old as human civilization (seen in the Egyptian pyramids, Taj Mahal, Mesopotamia, Greece, Rome, and Indus Valley), but its systematic study as a distinct body of knowledge is of recent origin.",
    options: [
      "Because ancient civilizations had universities that taught art before science",
      "Because its practice is as old as human civilization, but its systematic study as a distinct body of knowledge is recent",
      "Because only young people study management as a science",
      "Because ancient monuments like the Egyptian pyramids were built without any management"
    ],
    correctIndex: 1
  },
  {
    id: 7,
    topic: "Topic 1: Management",
    concept: "Management as an Inexact Science (CAT & Exam Question)",
    question: "Which of the following explains why management is considered an INEXACT science rather than an exact science?",
    answer: "Management involves unique human beings whose behavior cannot be predicted accurately, and management plans are affected by a complex, unpredictable future and external environment (technological, economic, and socio-cultural changes).",
    options: [
      "Management lacks any systematic body of knowledge or independent principles",
      "Human behavior cannot be predicted accurately, and plans are affected by a complex, unpredictable external environment",
      "Management does not borrow concepts from psychology, sociology, or economics",
      "Management principles can never help a practicing manager achieve goals"
    ],
    correctIndex: 1
  },
  {
    id: 8,
    topic: "Topic 1: Management",
    concept: "Management as an Art",
    question: "What does viewing 'Management as an Art' emphasize?",
    answer: "Art refers to the 'know-how' or ways of doing things to accomplish results. It focuses on skill, creativity, and constant practice—meaning even a management graduate from the best institute requires practice and creativity to be effective.",
    options: [
      "That a university degree alone guarantees a manager will be 100% effective without practice",
      "Know-how, skill in performing activities, creativity, and constant practice of theoretical concepts",
      "Painting and decorating the office environment to boost morale",
      "Memorizing scientific formulas without ever applying them to people"
    ],
    correctIndex: 1
  },

  // ==========================================
  // TOPIC 2: APPROACHES TO MANAGEMENT (6 Questions)
  // ==========================================
  {
    id: 9,
    topic: "Topic 2: Approaches to Management",
    concept: "Classical Approach to Management",
    question: "What were the two primary concerns of the Classical Approach to management?",
    answer: "Seeking to increase efficiency and productivity, the Classical Approach focused on: (1) Work in terms of tools and equipment, and (2) The organization (providing guidelines, procedures, policies, plans, and methods)—not the workers.",
    options: [
      "Employee emotions and informal social clubs",
      "Work (tools and equipment) and the organization (procedures, policies, plans, and methods)",
      "External political lobbying and international expansion",
      "Allowing workers to set their own working hours and salaries"
    ],
    correctIndex: 1
  },
  {
    id: 10,
    topic: "Topic 2: Approaches to Management",
    concept: "Behavioural Approach Recommendations",
    question: "What three recommendations did the Behavioural Approach make to achieve workplace harmony?",
    answer: "It recommended: (a) Motivation (performance increases when workers are motivated), (b) Open channels of communication vertically and horizontally, and (c) Allowing workers to form social groups and reaching out to their perceived leaders.",
    options: [
      "Condemning informal groups, restricting communication, and using threats",
      "Motivation, open vertical and horizontal communication, and allowing social groups while reaching out to their leaders",
      "Replacing human workers with machines and centralizing all decisions",
      "Eliminating non-financial incentives and banning trade unions"
    ],
    correctIndex: 1
  },
  {
    id: 11,
    topic: "Topic 2: Approaches to Management",
    concept: "Mintzberg's Interpersonal / Figurehead Roles (CAT Question)",
    question: "In Prof. Henry Mintzberg's Managerial Roles Approach, what are the three roles under the Figurehead/Interpersonal category?",
    answer: "After studying 5 CEOs, Mintzberg identified: (1) Figurehead role (manager's presence makes everything okay), (2) Leader role (influences others into action), and (3) Liaison role (negotiates on behalf of workers and the department).",
    options: [
      "Figurehead, Leader, and Liaison roles",
      "Recipient, Disseminator, and Spokesperson roles",
      "Entrepreneur, Disturbance Handler, and Resource Allocator roles",
      "Auditor, Accountant, and Inspector roles"
    ],
    correctIndex: 0
  },
  {
    id: 12,
    topic: "Topic 2: Approaches to Management",
    concept: "Mintzberg's Information Roles",
    question: "Which three roles make up the 'Information Roles' in Mintzberg's Managerial Roles Approach?",
    answer: "Mintzberg's Information Roles are: (1) Recipient role (receives information), (2) Dissemination role (passes received information to others), and (3) Spokesperson role (speaks on behalf of the department/organization).",
    options: [
      "Educator, Counselor, and Judge",
      "Recipient, Dissemination, and Spokesperson roles",
      "Entrepreneur, Negotiator, and Disturbance Handler",
      "Strategic, Tactical, and Operational"
    ],
    correctIndex: 1
  },
  {
    id: 13,
    topic: "Topic 2: Approaches to Management",
    concept: "Mintzberg's Decision Roles",
    question: "Which four roles make up the 'Decision Roles' in Prof. Henry Mintzberg's framework?",
    answer: "The four Decision Roles are: (1) Entrepreneur role (seeks opportunities), (2) Disturbance handling role (settles disputes and dispenses justice), (3) Negotiator role (negotiates on behalf of the firm), and (4) Resource allocator role (decides on use of company resources).",
    options: [
      "Planning, Organizing, Staffing, and Controlling",
      "Entrepreneur, Disturbance handling, Negotiator, and Resource allocator roles",
      "Coercive, Reward, Legitimate, and Expert roles",
      "Forming, Storming, Norming, and Performing"
    ],
    correctIndex: 1
  },
  {
    id: 14,
    topic: "Topic 2: Approaches to Management",
    concept: "Systems Approach to Management",
    question: "Why does the Systems Approach insist that managers deal with the entire organization rather than isolated departments?",
    answer: "Because one part or department influences the others in a dynamic organization, so managers must look at the whole system and anticipate both the intended and unintended impacts of their decisions.",
    options: [
      "Because individual departments do not have departmental heads",
      "Because one department influences another, requiring managers to anticipate both intended and unintended impacts across the whole organization",
      "Because the Systems Approach only applies to small one-person businesses",
      "Because departmental budgets are illegal under the Systems Approach"
    ],
    correctIndex: 1
  },

  // ==========================================
  // TOPIC 3: THEORIES OF MANAGEMENT (9 Questions)
  // ==========================================
  {
    id: 15,
    topic: "Topic 3: Theories of Management",
    concept: "Frederick Taylor's Scientific Theory — Objectives (Sample Exam Question)",
    question: "Which of the following is an objective of Frederick Taylor's Scientific Theory of Management?",
    answer: "Objectives include: using skills/knowledge in production, having professionals in charge of production/marketing, standardizing plans/tools/materials/conditions, reducing slackness from accidents, guiding workers, and increasing wages, profits, and customer service.",
    options: [
      "To allow workers to use any random tools they prefer without supervision",
      "To standardize plans, tools, materials, and working conditions, put professionals in charge, and increase wages, profits, and customer service",
      "To reduce production output so machines last longer",
      "To transfer all management authority to informal employee groups"
    ],
    correctIndex: 1
  },
  {
    id: 16,
    topic: "Topic 3: Theories of Management",
    concept: "Principles of Scientific Management (Sample Exam Question)",
    question: "In Frederick Taylor's Scientific Theory, what does the 'Principle of Task Idea' state?",
    answer: "The Principle of Task Idea states that favorable conditions at work will make workers perform miracles and increase productivity. (Other principles include Standardization, Selection & Training, Division of Work, Proper Use of Plant, Planning, Healthy Working Environment, and Incentives).",
    options: [
      "Workers should be given the hardest possible conditions to test their endurance",
      "Favorable conditions at work will make workers perform miracles and increase productivity",
      "Only managers should perform physical tasks while workers watch",
      "Tasks should never be divided or specialized among employees"
    ],
    correctIndex: 1
  },
  {
    id: 17,
    topic: "Topic 3: Theories of Management",
    concept: "Advantages & Disadvantages of Scientific Management",
    question: "While Scientific Management reduced wastage and increased uniformity, what are its main disadvantages?",
    answer: "It dehumanizes workers into mindless machines, overlooks job satisfaction and social needs (forming trade unions/welfare societies), rules out wage bargaining, gives too much power to managers, and emphasizes incentives over accident compensation.",
    options: [
      "It gives too much wage-bargaining power to trade unions and ignores standardization",
      "It dehumanizes workers like mindless machines, overlooks social needs/job satisfaction, rules out wage bargaining, and gives less emphasis to accident compensation",
      "It lowers customer service quality and increases production waste",
      "It prevents specialization and division of labor"
    ],
    correctIndex: 1
  },
  {
    id: 18,
    topic: "Topic 3: Theories of Management",
    concept: "Henri Fayol's Administrative Theory — Unity Principles",
    question: "In Henri Fayol's 14 Principles of Management, how does 'Unity of Command' differ from 'Unity of Management'?",
    answer: "Unity of Command states a subordinate should not take instructions from more than one boss (to avoid confusion/frustration). Unity of Management states that similar tasks should be placed under one manager for easy control.",
    options: [
      "Unity of Command means one boss per subordinate; Unity of Management means placing similar tasks under one manager",
      "Unity of Command means paying market salaries; Unity of Management means centralizing power",
      "Unity of Command applies to external suppliers; Unity of Management applies to customers",
      "There is no difference between the two principles"
    ],
    correctIndex: 0
  },
  {
    id: 19,
    topic: "Topic 3: Theories of Management",
    concept: "Henri Fayol's Principles — Authority, Discipline & Centralization",
    question: "What does Henri Fayol's Principle of Authority and Responsibility state?",
    answer: "For a manager to get work done in their department, they must be adequately authorized to control activities, and the manager is equally held responsible and answerable for the proper use of that authority.",
    options: [
      "A manager should have unlimited authority without ever being held answerable",
      "A manager must be adequately authorized to control departmental activities and is equally held responsible for proper use of that authority",
      "Responsibility belongs only to junior workers while authority belongs only to shareholders",
      "Authority should never be paired with discipline"
    ],
    correctIndex: 1
  },
  {
    id: 20,
    topic: "Topic 3: Theories of Management",
    concept: "Henri Fayol's Principles — Initiative & Esprit de Corps",
    question: "In Fayol's 14 Principles, what are 'Initiative' and 'Esprit de Corps'?",
    answer: "Initiative is the freedom to think, plan, and execute (giving subordinates limited autonomy to be creative under a watchful eye to build confidence). Esprit de Corps means teamwork ('unity is strength'), doing away with divide-and-rule policies.",
    options: [
      "Initiative is firing workers without notice; Esprit de Corps is using divide-and-rule",
      "Initiative is limited autonomy to think, plan, and execute; Esprit de Corps is teamwork ('unity is strength') rather than divide-and-rule",
      "Initiative means sacrificing organizational goals for personal gain; Esprit de Corps means strict dress codes",
      "Initiative is top-down orders only; Esprit de Corps is individual competition"
    ],
    correctIndex: 1
  },
  {
    id: 21,
    topic: "Topic 3: Theories of Management",
    concept: "Fayol's Four Managerial Qualities",
    question: "Henri Fayol outlined four categories of qualities a manager needs to practice his principles. What are they?",
    answer: "(1) Physical Qualities (good physique, health, smart dressing), (2) Mental Qualities (intelligent, wise, avoids emotional decisions, quick to act), (3) Moral Qualities (respectful, honest, self-determination, communication), and (4) General Knowledge & Experience.",
    options: [
      "Physical, Mental, Moral, and General Knowledge & Experience",
      "Coercive, Reward, Legitimate, and Referent",
      "Financial, Legal, Political, and Military",
      "Autocratic, Democratic, Paternalistic, and Laissez-faire"
    ],
    correctIndex: 0
  },
  {
    id: 22,
    topic: "Topic 3: Theories of Management",
    concept: "Max Weber's Bureaucratic Theory — Principles",
    question: "Why did Max Weber formulate the Bureaucratic Theory of Management, and what does its 'Principle of Legal Power and Authority' state?",
    answer: "Weber was reacting to abuses of power by those in managerial positions. His Principle of Legal Power and Authority states that bureaucracy recognizes only legal powers attached to each office/position—authority belongs to the office, not the individual.",
    options: [
      "He wanted managers to have personal, unchecked power; authority belongs to the richest individual",
      "He reacted to managerial abuses of power; authority belongs to the office and position, not to the individual",
      "He wanted to abolish all rules and hierarchies in organizations",
      "He believed promotions should be based on family ties rather than technical competence"
    ],
    correctIndex: 1
  },
  {
    id: 23,
    topic: "Topic 3: Theories of Management",
    concept: "Disadvantages of Bureaucratic Theory",
    question: "Which of the following is a major disadvantage of Max Weber's Bureaucratic Theory of Management?",
    answer: "Disadvantages include: making managers dictators with too much power, excessive paperwork/resource wastage, employees thinking less and working like robots, high resistance to change (workers excluded from decisions), no room for participative managers, and many rules hampering goal attainment.",
    options: [
      "Conflicting job duties due to lack of defined responsibilities",
      "Too much paperwork, employees working like robots, high resistance to change, and many rules hampering overall goal attainment",
      "Complete absence of hierarchy or standardized methods",
      "Over-involvement of junior workers in every strategic decision"
    ],
    correctIndex: 1
  },

  // ==========================================
  // TOPIC 4: PLANNING (10 Questions)
  // ==========================================
  {
    id: 24,
    topic: "Topic 4: Planning",
    concept: "Elements / Characteristics of Planning",
    question: "What are the 5 Elements (Characteristics) of Planning?",
    answer: "(1) Objectives (future conditions to achieve), (2) Actions (specific activities planned), (3) Forecast (considering future events/factors), (4) Resources (constraints, sources, and allocations), and (5) Implementation (assigning and directing workers).",
    options: [
      "Objectives, Actions, Forecast, Resources, and Implementation",
      "Job Analysis, Recruitment, Selection, Induction, and Retention",
      "Problem Recognition, Diagnosis, Feedback, Strategy, and Evaluation",
      "Standards, Measurement, Comparison, Deviations, and Correction"
    ],
    correctIndex: 0
  },
  {
    id: 25,
    topic: "Topic 4: Planning",
    concept: "Importance of Planning (Sample Exam Question)",
    question: "How does Planning serve as a 'source of funding' and aid in 'developing managers'?",
    answer: "Donors and financiers examine an organization's plans to determine which projects to finance (better plans attract funding). Planning develops managers by engaging them in high-level intellectual activity dealing with abstract future ideas, enhancing their analytical ability.",
    options: [
      "Plans force banks to give free loans without review, and let managers avoid thinking about the future",
      "Donors/financiers use plans to decide which projects to finance, and dealing with abstract/future ideas sharpens managers' analytical abilities",
      "Planning eliminates the need for departmental budgets or performance standards",
      "Planning prevents any organizational change from ever occurring"
    ],
    correctIndex: 1
  },
  {
    id: 26,
    topic: "Topic 4: Planning",
    concept: "Principles of Planning (Sample Exam Question)",
    question: "Which of the following accurately lists the 5 Principles of Planning?",
    answer: "(1) Take time to plan (don't hurry; do accurate situation analysis), (2) Planning can be top-down or bottom-up, (3) Communicate early to implementers and those affected, (4) Flexibility to adapt to environmental changes, and (5) Evaluation (decide how/when to evaluate and revise if needed).",
    options: [
      "Hurry up, keep plans secret, make plans rigid, only plan top-down, and never evaluate",
      "Take time to plan, top-down or bottom-up approach, early communication, flexibility, and evaluation",
      "Unity of command, scalar chain, span of control, delegation, and simplicity",
      "Coercion, reward, legitimate, expert, and referent planning"
    ],
    correctIndex: 1
  },
  {
    id: 27,
    topic: "Topic 4: Planning",
    concept: "Types of Plans — Policies vs. Procedures vs. Budgets",
    question: "How do 'Policies' differ from 'Procedures' and 'Budgets' as types of plans?",
    answer: "Policies are general statements that guide thinking in decision-making for uniformity. Procedures establish a chronological sequence of required actions for handling future activities. A Budget is a plan statement for a future period expressed in financial terms (revenue and expenditure).",
    options: [
      "Policies are financial statements; Procedures are made only by CEOs; Budgets are general understandings",
      "Policies guide thinking in decision-making; Procedures set a chronological sequence of required actions; Budgets express future plans in financial terms",
      "Procedures can be violated anytime, whereas Operational plans are the supreme long-range plans",
      "Strategic plans are daily routine plans made by supervisors"
    ],
    correctIndex: 1
  },
  {
    id: 28,
    topic: "Topic 4: Planning",
    concept: "Steps in the Planning Process (Sample Exam Question)",
    question: "What is the correct order of steps in the Planning Process?",
    answer: "1. Environmental analysis (strengths/weaknesses) → 2. Setting objectives → 3. Consider the planning premise (prepare environment/space/equipment) → 4. Evaluate alternative courses → 5. Select a course of action → 6. Formulate supporting plans → 7. Preparation of budgets.",
    options: [
      "Preparation of budgets → Formulate supporting plans → Environmental analysis → Set objectives",
      "Environmental analysis → Setting objectives → Consider planning premise → Evaluate alternatives → Select course of action → Formulate supporting plans → Preparation of budgets",
      "Select course of action → Fire staff → Write policies → Ignore environment",
      "Setting objectives → Retrenchment → Leverage buy-out → Merger"
    ],
    correctIndex: 1
  },
  {
    id: 29,
    topic: "Topic 4: Planning",
    concept: "Limitations of Planning & Overcoming Them",
    question: "Which of the following is an INTERNAL limitation of planning, and how can planning problems be overcome?",
    answer: "Internal inflexibility (rigid policies, procedures, and limited resources) makes planning rigid and delays decisions. It is overcome by setting realistic goals, communicating assumptions, encouraging stakeholder participation/creativity, reconciling short- and long-term plans, and reducing internal inflexibility.",
    options: [
      "Government legislation is an internal factor; overcome it by relying solely on past experience",
      "Internal inflexibility (rigid policies/procedures); overcome by setting realistic goals, encouraging stakeholder participation, and reducing internal rigidity",
      "Planning is free and instant; overcome it by excluding departmental managers",
      "Trade union pressure is an internal policy; overcome it by making plans completely unchangeable"
    ],
    correctIndex: 1
  },
  {
    id: 30,
    topic: "Topic 4: Planning",
    concept: "Concentration vs. Stability Strategy",
    question: "In organizational strategies, what is the difference between a 'Concentration Strategy' and a 'Stability Strategy'?",
    answer: "Concentration Strategy focuses on one line of business to gain a competitive advantage through efficiency and specialization. Stability Strategy maintains one line of business for a long time because growth or expansion would incur extra cost.",
    options: [
      "Concentration lays off workers; Stability buys back shares from shareholders",
      "Concentration focuses on one line of business for efficiency/specialization; Stability maintains one line of business to avoid the extra cost of expansion",
      "Concentration means merging with a competitor; Stability means diversifying into 10 new industries",
      "Both strategies involve dissolving the company immediately"
    ],
    correctIndex: 1
  },
  {
    id: 31,
    topic: "Topic 4: Planning",
    concept: "Forward vs. Backward Vertical & Horizontal Integration",
    question: "Distinguish between Forward Vertical Integration, Backward Vertical Integration, and Horizontal Integration using the examples from your notes.",
    answer: "Forward Vertical Integration: buying a firm ahead in production/nearer the consumer (e.g., Kenya Breweries buying restaurants). Backward Vertical Integration: buying a supplier behind in the production process. Horizontal Integration: buying a competitor in the same industry and level of production (e.g., Mumias Sugar buying Sony Sugar).",
    options: [
      "Mumias Sugar buying Sony Sugar is Forward Vertical; Kenya Breweries buying restaurants is Horizontal",
      "Kenya Breweries buying restaurants is Forward Vertical (nearer consumer); buying a supplier behind is Backward Vertical; Mumias Sugar buying Sony Sugar is Horizontal Integration",
      "All three mean starting a brand-new unrelated product line from scratch",
      "Horizontal integration means laying off workers when survival is threatened"
    ],
    correctIndex: 1
  },
  {
    id: 32,
    topic: "Topic 4: Planning",
    concept: "Diversification, Mergers, and Joint Ventures",
    question: "How do Diversification, Mergers, and Joint Ventures differ as growth strategies?",
    answer: "Diversification: starting to produce other products to minimize chances of loss. Merger: two or more companies dissolve and come together under a new name/identity. Joint Venture: two or more firms continue their initial businesses but come together to start a new common business under a new name.",
    options: [
      "In a Merger, firms keep their old businesses separate; in a Joint Venture, they dissolve completely",
      "Diversification produces other products to minimize loss; a Merger dissolves firms into one new identity; a Joint Venture keeps initial businesses while starting a new common business",
      "Diversification means focusing on only one single product forever",
      "Joint Ventures are only used to lay off redundant employees"
    ],
    correctIndex: 1
  },
  {
    id: 33,
    topic: "Topic 4: Planning",
    concept: "Leverage Buy-Out vs. Retrenchment Strategy",
    question: "What are the 'Leverage Buy-Out' and 'Retrenchment' strategies?",
    answer: "In a Leverage Buy-Out, shareholders are paid money for their shares at a higher rate by the company, which later resells those shares at a very high price to raise capital. Retrenchment is the last-resort strategy when survival is threatened and the firm lays off some workers.",
    options: [
      "Leverage Buy-Out lays off workers; Retrenchment buys restaurants",
      "Leverage Buy-Out buys back shareholder shares at a higher rate to resell later for capital; Retrenchment is a last-resort layoff of workers when survival is threatened",
      "Both strategies are used only when a company has excess profits and wants to hire more staff",
      "Retrenchment is when two companies form a joint venture"
    ],
    correctIndex: 1
  },

  // ==========================================
  // TOPIC 5: ORGANIZING (9 Questions)
  // ==========================================
  {
    id: 34,
    topic: "Topic 5: Organizing",
    concept: "Principles of Organizing (Sample Exam Question)",
    question: "Which of the following pairs of Principles of Organizing is accurately defined?",
    answer: "The 8 principles are: Unity of objectives, Continuity (departments exist long-term), Flexibility (allow restructuring/merging), Simplicity (minimum levels), Delegation (top to bottom), Unity of command, Scalar principle (one manager has ultimate authority to overrule and solve interdepartmental conflicts), and Span of control.",
    options: [
      "Simplicity means having as many hierarchy levels as possible; Delegation flows from bottom to top",
      "Scalar principle states at least one manager has ultimate authority to overrule decisions and solve interdepartmental conflicts; Flexibility allows restructuring/merging departments",
      "Unity of command means taking orders from five bosses; Continuity means dissolving departments weekly",
      "Span of control means every manager must supervise at least 500 employees"
    ],
    correctIndex: 1
  },
  {
    id: 35,
    topic: "Topic 5: Organizing",
    concept: "Factors Influencing Span of Control",
    question: "How do 'Non-supervisory activities', 'Similarity of activities', and 'Location' affect a manager's Span of Control?",
    answer: "More time spent on non-supervisory activities (long-range planning, outside assignments) or widely dispersed locations require a NARROWER span. Routine/similar activities, high capability, and high fatigue tolerance allow a WIDER span.",
    options: [
      "Widely dispersed workers and heavy non-supervisory duties allow a wider span of control",
      "Heavy non-supervisory duties and dispersed locations require a narrower span, while routine/similar tasks allow a wider span",
      "Inexperienced subordinates and low manager capability allow a wider span of control",
      "Span of control is fixed by law and never influenced by manager personality or location"
    ],
    correctIndex: 1
  },
  {
    id: 36,
    topic: "Topic 5: Organizing",
    concept: "Functional Organisational Structure (Sample Exam Question)",
    question: "What is a Functional Structure, and what are its main advantages and disadvantages?",
    answer: "Departments are named after the function they execute (e.g., Marketing, HR, Purchasing, Examination). Advantages: specialization, career paths, better resource use, less client confusion. Disadvantages: departments may deviate from company goals, slow decisions, lack of coordination, and conflict over scarce resources.",
    options: [
      "Departments are named after cities; it has zero specialization",
      "Departments are named after functions (e.g., Marketing, HR); it promotes specialization and career paths but can suffer from inter-departmental conflicts and slow decisions",
      "Workers are relocated to temporary project sites until completion",
      "Each product brand (like Fanta and Sprite) has its own separate company"
    ],
    correctIndex: 1
  },
  {
    id: 37,
    topic: "Topic 5: Organizing",
    concept: "Product-Line Organisational Structure",
    question: "In a Product-Line Structure (e.g., Coca-Cola having Fanta, Coke, Krest, and Sprite departments), what is a major disadvantage?",
    answer: "Disadvantages include: if one product lets down a consumer, all other products may be rejected; high wastage due to duplication of resources (e.g., each product department having its own marketing manager and advertising separately); and conflict over scarce resources.",
    options: [
      "It prevents innovation or specialization on specific products",
      "If one product lets down a consumer, all other products may be rejected, and resource wastage is high due to duplication across product divisions",
      "It can only be used by companies that produce a single product",
      "It completely eliminates competition between divisions"
    ],
    correctIndex: 1
  },
  {
    id: 38,
    topic: "Topic 5: Organizing",
    concept: "Geographical-Based & Customer-Based Structures",
    question: "How do Geographical-Based and Customer-Based organizational structures differ?",
    answer: "Geographical-Based opens branches across wide regions (low operating cost, caters to local conditions, good training ground for managers, though hard to coordinate and maintain head-office culture). Customer-Based is designed around specific clients in service industries (hospitals, hotels, automobile firms) for personalized service and easy feedback.",
    options: [
      "Geographical-based is only for single-room shops; Customer-based ignores client feedback",
      "Geographical-based opens branches across regions to suit local markets; Customer-based organizes around specific clients (common in hospitals, hotels, automobile firms)",
      "Customer-based structures require zero skilled workers and are the cheapest to implement",
      "Geographical-based structures guarantee every branch keeps the exact same head-office culture effortlessly"
    ],
    correctIndex: 1
  },
  {
    id: 39,
    topic: "Topic 5: Organizing",
    concept: "Matrix (Organic) Structure — Roles & Pros/Cons",
    question: "In a Matrix (Organic) Structure, how does reporting work, and why can staff morale drop when a project ends?",
    answer: "Departments contribute workers to a project site. The Project Manager coordinates the project, provides technical expertise, is the accounting officer, and reports to the CEO, while workers also report to their functional heads. Morale drops after completion because staff are socially rearranged and separated from newly acquired friends.",
    options: [
      "The Project Manager reports to junior workers, and staff stay on the same project forever",
      "Workers face dual-allegiance conflict between the Project Manager and functional heads, and morale is affected after project completion due to social rearrangement away from new friends",
      "Matrix structure increases rigid bureaucracy and prevents job rotation",
      "Top management must micromanage every daily task on the project site"
    ],
    correctIndex: 1
  },
  {
    id: 40,
    topic: "Topic 5: Organizing",
    concept: "Centralization vs. Decentralization",
    question: "What are the advantages and disadvantages of Decentralization?",
    answer: "Decentralization transfers authority from top management to middle/low-level managers. Advantages: speeds up decisions, frees top echelons to plan/strategize, develops professional managers and multi-skilled junior staff. Disadvantages: lack of consistency, unequal customer treatment, resource misallocation if controls lack, and heavy coordination needed.",
    options: [
      "Decentralization concentrates all power in one person and slows down decision-making",
      "Decentralization speeds up decisions and frees top management to strategize, but can cause inconsistency and unequal customer treatment",
      "Decentralization prevents junior staff from ever learning management skills",
      "Centralization means dispersing power to every frontline employee"
    ],
    correctIndex: 1
  },
  {
    id: 41,
    topic: "Topic 5: Organizing",
    concept: "Authority vs. Power",
    question: "How do the notes distinguish between 'Authority' and 'Power'?",
    answer: "Authority is legal, bestowed on an individual by virtue of their position, and is the right to give orders and expect obedience. Power is the ability to influence the behavior of others—it is not given, but rather acquired.",
    options: [
      "Authority is acquired through threats, whereas Power is a legal right written in a contract",
      "Authority is legal and comes with a position (the right to give orders); Power is the ability to influence others' behavior and is acquired rather than given",
      "Authority and Power mean the exact same thing in management",
      "Only informal group members have legal authority"
    ],
    correctIndex: 1
  },
  {
    id: 42,
    topic: "Topic 5: Organizing",
    concept: "Five Forms / Bases of Power",
    question: "Match the 5 forms of power (Coercive, Reward, Legitimate, Expert, Referent) to their correct descriptions.",
    answer: "Coercive: causing fear/threatening (e.g., a thug with a gun); Reward: influencing via incentives; Legitimate: comes from position (e.g., DOs, Managers); Expert: knowledge/skills (e.g., doctors, engineers); Referent: identifying with someone who has desirable traits/resources.",
    options: [
      "Coercive = knowledge/skills; Expert = causing fear; Legitimate = personal charisma",
      "Coercive = fear/threats; Reward = incentives; Legitimate = official position; Expert = knowledge/skills (doctors/engineers); Referent = desirable traits/resources",
      "Referent power comes only from holding a gun; Legitimate power comes only from medical degrees",
      "Reward power is illegal in formal organizations"
    ],
    correctIndex: 1
  },

  // ==========================================
  // TOPIC 6: CONTROLLING (5 Questions)
  // ==========================================
  {
    id: 43,
    topic: "Topic 6: Controlling",
    concept: "Objectives & Importance of Controlling",
    question: "What are the main objectives and importance of the Controlling function?",
    answer: "Objectives: keep checks on direct/indirect expenses, see if objectives are achievable, move the company to the highest level, know what/why/by whom things happen, and ensure activities follow the plan. Importance: basis for future action, facilitates coordination, reduces non-conforming results, simplifies supervision, and aids delegation.",
    options: [
      "To increase indirect expenses and eliminate supervision",
      "To check direct/indirect expenses, ensure activities follow the plan, simplify supervision, and provide a basis for future action",
      "To replace planning so that no standards are ever needed",
      "To punish positive deviations whenever targets are surpassed"
    ],
    correctIndex: 1
  },
  {
    id: 44,
    topic: "Topic 6: Controlling",
    concept: "Characteristics of Controlling",
    question: "Why is Controlling described as 'backward-looking', 'continuous', and 'only carried out by managers'?",
    answer: "It is backward-looking because it uses past/current experience to establish corrective action for future actions. It is continuous because systems/targets are continually evaluated. Only managers carry it out because corrective actions (mobilizing resources, hiring staff, changing operations) cannot be delegated.",
    options: [
      "Because junior workers carry out controlling once every ten years",
      "Because it draws on past experience to guide future corrective action, evaluates targets continually, and requires non-delegable managerial corrective actions",
      "Because only top-level CEOs control, while supervisors never control",
      "Because controlling stops as soon as a budget is written"
    ],
    correctIndex: 1
  },
  {
    id: 45,
    topic: "Topic 6: Controlling",
    concept: "Five Types of Standards in Controlling",
    question: "In Step 1 of Controlling (Establishment of Standards), what are the 5 types of standards?",
    answer: "(1) Cost standards (anticipated costs not surpassed), (2) Revenue standards (expected revenue realized), (3) Physical standards (countables like working hours, units per machine), (4) Capital standards (rate of return on invested capital), and (5) Intangible standards (worker competency, customer care success).",
    options: [
      "Cost, Revenue, Physical, Capital, and Intangible standards",
      "Forming, Storming, Norming, Performing, and Adjourning standards",
      "Power, Role, Support, Achievement, and Task standards",
      "Internal, External, Head-hunting, Benchmarking, and Retention standards"
    ],
    correctIndex: 0
  },
  {
    id: 46,
    topic: "Topic 6: Controlling",
    concept: "Measurement & Comparison in Controlling",
    question: "How is actual performance measured in Step 2 of the Controlling process, and why is it done early?",
    answer: "Performance is measured through observation of workers' performance as well as reports, charts, and management summaries. Its purpose is to find out if anything is amiss at the earliest time possible before comparing actual results with the standard.",
    options: [
      "By waiting five years until the company closes down",
      "Through observation of worker performance, reports, charts, and management summaries to spot anything amiss as early as possible",
      "By guessing without looking at any reports or observing workers",
      "By asking competitors to grade the company's employees"
    ],
    correctIndex: 1
  },
  {
    id: 47,
    topic: "Topic 6: Controlling",
    concept: "Positive vs. Negative Deviations",
    question: "In Step 4 of Controlling (Finding Deviations), how should management respond to a Positive Deviation versus a Negative Deviation?",
    answer: "A Positive Deviation means targets were surpassed—management should identify the contributing factors so everything can be maintained. A Negative Deviation means targets were not realized—corrective action must be taken (e.g., transferring workers, redoing plans, or increasing project funding).",
    options: [
      "Positive deviation means targets failed; Negative deviation means targets were surpassed",
      "For a Positive Deviation, identify contributing factors to maintain them; for a Negative Deviation, take corrective action (transfers, redoing plans, increasing funding)",
      "Both positive and negative deviations require firing the entire department",
      "Deviations should be ignored once standards are written"
    ],
    correctIndex: 1
  },

  // ==========================================
  // TOPIC 7: LEADERSHIP (8 Questions)
  // ==========================================
  {
    id: 48,
    topic: "Topic 7: Leadership",
    concept: "Four Leadership Roles",
    question: "What are the 4 Leadership Roles described in Topic 7, and what does the 'Counselor' role involve?",
    answer: "The 4 roles are Educator (teaches job skills/values, role model, formal training), Counselor (listening, giving advice, preventing/helping employees solve problems, showing concern), Judge (appraising performance, enforcing policies, settling disputes), and Spokesperson (speaking on behalf of subordinates/department).",
    options: [
      "Counselor role involves punishing workers and cutting their salaries",
      "The 4 roles are Educator, Counselor, Judge, and Spokesperson; Counselor involves listening, giving advice, and helping employees develop solutions to problems",
      "Judge role involves only teaching new software skills",
      "Educator role means refusing to train subordinates"
    ],
    correctIndex: 1
  },
  {
    id: 49,
    topic: "Topic 7: Leadership",
    concept: "Five Attributes of a Leader",
    question: "Which of the following correctly lists the 5 Attributes of a Leader from your notes?",
    answer: "(1) Emotional appeal (rational decision-maker with a great vision that alters followers' mood), (2) Meeting needs of followers (secures voluntary compliance), (3) Personal traits (positive attitude, self-motivated, self-confidence, trustworthy), (4) Leadership matches (matching traits to situational demands), and (5) Leadership effectiveness.",
    options: [
      "Coercion, Secrecy, Nepotism, Rigidity, and Isolation",
      "Emotional appeal, Needs of followers, Personal traits, Leadership matches, and Leadership effectiveness",
      "Height, Wealth, Age, Seniority, and Office size",
      "Budgeting, Auditing, Retrenchment, Mergers, and Acquisition"
    ],
    correctIndex: 1
  },
  {
    id: 50,
    topic: "Topic 7: Leadership",
    concept: "Characteristics of Successful Leaders (CAT Question)",
    question: "According to the BBM 122 notes (and CAT Question 4), which behaviors characterize a successful leader?",
    answer: "Strong desire for task accomplishment, persistent pursuit of goals, creativity/intelligence, willingness to accept behavioral consequences (accepting mistakes), high tolerance, structuring social interactions, devoting more time to supervisory activities than doing the work itself, permitting employee participation, and recognizing good work.",
    options: [
      "Spending all their time doing technical tasks themselves and refusing to admit mistakes",
      "Accepting mistakes, devoting more time to supervision than doing the work itself, permitting participation in decisions, and recognizing good work",
      "Excluding employees from all decisions and intolerant behavior toward subordinates",
      "Avoiding task accomplishment to focus purely on personal hobbies"
    ],
    correctIndex: 1
  },
  {
    id: 51,
    topic: "Topic 7: Leadership",
    concept: "Trait Theory of Leadership",
    question: "What does the 'Trait Theory' of leadership assert, and what is its main limitation?",
    answer: "Trait Theory asserts that the ability to lead depends on innate (inborn) characteristics—leadership is natural and cannot be learnt (e.g., personal initiative, decisiveness, assertiveness, compassionate, intelligent, tall, good-looking/well-groomed, melodious voice, wise). Its limitation is that there are too many traits and it is unknown how many one needs to qualify as a leader.",
    options: [
      "It asserts anyone can learn leadership in a 2-day seminar regardless of traits",
      "It asserts leadership is inborn/natural and cannot be learnt (including traits like initiative, intelligence, tallness, melodious voice), but fails to specify how many traits are needed",
      "It states leadership depends solely on the maturity of subordinates",
      "It was formulated by Max Weber to promote bureaucracy"
    ],
    correctIndex: 1
  },
  {
    id: 52,
    topic: "Topic 7: Leadership",
    concept: "Theory X and Theory Y",
    question: "Contrast Theory X and Theory Y in terms of worker assumptions and the leadership style required for each.",
    answer: "Theory X assumes workers dislike work, avoid responsibility, prefer clearly defined tasks, and resist change—requiring dictatorial tendencies/coercion. Theory Y assumes workers work hard without coercion, exercise self-direction, seek responsibility, and have creative potential—requiring democratic or laissez-faire (free-reign) leadership.",
    options: [
      "Theory X workers love responsibility and need laissez-faire leadership; Theory Y workers hate work and need dictatorial leadership",
      "Theory X assumes workers dislike work and resist change (requiring dictatorial style); Theory Y assumes workers are self-directed and creative (requiring democratic/laissez-faire style)",
      "Both Theory X and Theory Y require strict dictatorial supervision",
      "Theory X and Y only apply to external recruitment agencies"
    ],
    correctIndex: 1
  },
  {
    id: 53,
    topic: "Topic 7: Leadership",
    concept: "Contingency Theory of Leadership",
    question: "What does the Contingency Theory of leadership stipulate, and what is a key disadvantage of it?",
    answer: "It stipulates that leaders must adapt and change their behavior as specific situations change. Advantage: logical analysis of situations. Disadvantage: a leader may appear inconsistent and insincere to subordinates due to frequent changes, or may lack sufficient skill to switch styles.",
    options: [
      "A leader must never change their style under any circumstance",
      "Leaders adapt behavior to changing situations, but may appear inconsistent and insincere to subordinates due to frequent changes",
      "Contingency theory guarantees subordinates will never notice changes in leadership style",
      "It states that only tall leaders with melodious voices can succeed"
    ],
    correctIndex: 1
  },
  {
    id: 54,
    topic: "Topic 7: Leadership",
    concept: "Path-Goal Theory of Leadership",
    question: "According to the Path-Goal Theory, what four factors influence a leader's style, and what are the 4 styles identified?",
    answer: "A leader clarifies the path to goals/rewards and adapts style based on: (a) Characteristics of subordinates, (b) Clarity of formal authority system, (c) Physical work environment, and (d) Maturity of subordinates. The 4 styles are: Telling only, Telling and setting, Participating, and Delegating.",
    options: [
      "Factors: age, height, voice, wealth; Styles: coercive, reward, legitimate, expert",
      "Factors: subordinate characteristics, authority clarity, physical environment, and subordinate maturity; Styles: Telling only, Telling and setting, Participating, and Delegating",
      "Styles: Forming, Storming, Norming, and Performing",
      "Path-Goal theory states that leaders should hide goals from subordinates"
    ],
    correctIndex: 1
  },
  {
    id: 55,
    topic: "Topic 7: Leadership",
    concept: "Leadership Styles — Authoritarian, Autocratic & Free Reign",
    question: "How do Dictatorial Autocratic, Paternalistic Autocratic, and Free Reign (Laissez-faire) leadership styles differ?",
    answer: "Dictatorial: zero dissent tolerated, no respect shown, strict penalties. Paternalistic: close supervision and structured relationship, but seeks respect/allegiance, tolerates limited dissent, and rewards compliance. Free Reign (Laissez-faire): workers structure their own activities with minimum interference, and communication flows horizontally.",
    options: [
      "In Free Reign, communication flows strictly top-down and dissent is punished",
      "Dictatorial tolerates no dissent; Paternalistic seeks allegiance and tolerates limited dissent; Free Reign gives minimum interference with horizontal communication",
      "Autocracy fully utilizes employee initiative and never causes resentment",
      "Paternalistic leadership means the leader abandons the company completely"
    ],
    correctIndex: 1
  },

  // ==========================================
  // TOPIC 8: GROUP FORMATION (6 Questions)
  // ==========================================
  {
    id: 56,
    topic: "Topic 8: Group Formation",
    concept: "Informal vs. Formal Groups",
    question: "How do Informal Groups differ from Formal Groups, and what are the advantages of Informal Groups?",
    answer: "Informal groups start by accident, unconsciously, or for social purpose without initial guidelines. Advantages: strengthen member values, give social status/security, help solve personal problems, act as reference points, and assist management in disciplining workers. Formal groups are created by management (e.g., training or disciplinary committees).",
    options: [
      "Informal groups are created by the CEO in the mission statement; Formal groups start by accident",
      "Informal groups form naturally without initial guidelines and provide social status, security, personal problem help, and peer discipline; Formal groups are created by management",
      "Informal groups never cause conformity or resistance problems",
      "Formal groups take zero time or money to maintain"
    ],
    correctIndex: 1
  },
  {
    id: 57,
    topic: "Topic 8: Group Formation",
    concept: "Disadvantages of Formal Groups",
    question: "While Formal Groups (like training or disciplinary committees) ease management's work and implement policies, what are their disadvantages?",
    answer: "Disadvantages of formal groups: (1) Expensive to maintain, (2) Cause bias if constituted unfairly, (3) Cause fighting and division among members wishing to be elected, (4) Time-consuming (slow decision-making), and (5) Competition for scarce resources.",
    options: [
      "They make decisions too fast and cost nothing",
      "They are expensive, can cause bias if constituted unfairly, spark election divisions, take long to make decisions, and compete for scarce resources",
      "They have no guidelines or organizational objectives",
      "They cannot help alleviate conflicts between departments"
    ],
    correctIndex: 1
  },
  {
    id: 58,
    topic: "Topic 8: Group Formation",
    concept: "Factors Influencing Group Formation",
    question: "Which factors naturally influence people to form groups in an organization?",
    answer: "Factors include: (a) Physical proximity, (b) Common values/interests (e.g., smokers), (c) Institutional backgrounds (same college), (d) Age/peers, (e) Similar jobs/professions (forming merry-go-rounds, co-operative societies), (f) Psychological reasons (social, esteem, self-actualization), and (g) Common threats.",
    options: [
      "Being far apart in age, location, and profession with no shared threats",
      "Physical proximity, common values/interests, shared college background, same age/peers, similar professions (merry-go-rounds/co-ops), psychological needs, and common threats",
      "Management forbidding employees from speaking to one another",
      "Strict isolation of every worker in different cities"
    ],
    correctIndex: 1
  },
  {
    id: 59,
    topic: "Topic 8: Group Formation",
    concept: "Five Stages of Group Development",
    question: "What happens at each of the 5 Stages of Group Development (Formation, Storming, Norming, Performance, Adjournment)?",
    answer: "1. Formation: orientation/testing acceptable behavior. 2. Storming: conflicts/interpersonal differences as members vie for leadership. 3. Norming: values accepted, high solidarity/cohesiveness/team spirit. 4. Performance: performance increases and objectives are realized. 5. Adjournment: tasks completed, group ceases to exist.",
    options: [
      "Storming is when the group dissolves; Adjournment is when members first meet",
      "Formation (orientation/testing) → Storming (leadership conflicts) → Norming (solidarity & accepted values) → Performance (objectives realized) → Adjournment (tasks completed, group ends)",
      "Norming is marked by fierce fighting and zero team spirit",
      "Groups start at Performance and end at Formation"
    ],
    correctIndex: 1
  },
  {
    id: 60,
    topic: "Topic 8: Group Formation",
    concept: "Group Cohesiveness — Factors, Pros & Cons",
    question: "What factors promote Group Cohesiveness, and what is a potential disadvantage of high cohesiveness?",
    answer: "Promoted by: friendly atmosphere, member similarity, interdependence, attractive goal, small group size, and common threat. Advantages: better interaction, fewer inter-member conflicts, greater coordination, achieving more together, social satisfaction. Disadvantages: poor image if involved in illegal activities, unhealthy competition, and increased resistance to change.",
    options: [
      "Large group size and hostile atmosphere promote cohesiveness",
      "Friendly atmosphere, small size, similarity, interdependence, and common threats promote cohesiveness; however, it can increase resistance to change or hurt image if doing illegal activities",
      "Group cohesiveness always eliminates all resistance to organizational change",
      "Interdependence among members destroys group cohesiveness"
    ],
    correctIndex: 1
  },
  {
    id: 61,
    topic: "Topic 8: Group Formation",
    concept: "Group Decision Making — Advantages & Disadvantages",
    question: "What are the key advantages and disadvantages of Group Decision Making?",
    answer: "Advantages: easier coordination, high communication, more alternatives presented, more information processed, distributes authority, serves as a training ground, boosts morale. Disadvantages: time-consuming, domination by some members, expensive, risky decisions taken because nobody is held individually responsible, and premature decisions.",
    options: [
      "Group decision making is instant, free, and holds one person 100% accountable",
      "It generates more alternatives, serves as a training ground, and boosts morale, but is time-consuming, can be dominated by a few, and can lead to risky decisions since no single person is held responsible",
      "It processes less information than a single isolated individual",
      "It reduces employee morale and prevents authority distribution"
    ],
    correctIndex: 1
  },

  // ==========================================
  // TOPIC 9: ORGANIZATIONAL CULTURE & DEVELOPMENT (5 Questions)
  // ==========================================
  {
    id: 62,
    topic: "Topic 9: Organizational Culture & Dev",
    concept: "Elements of Organizational Culture",
    question: "Which of the following is one of the 6 Elements of Organizational Culture described in the notes?",
    answer: "The 6 elements are: (1) Perception of the organization and its environment, (2) Accepted manner of reacting to new situations/competition, (3) Accepted dressing pattern/uniform, (4) Projected image (winner/loser, profit maker, notable employee developer, frustrator of labor turnover), (5) Recognized identity (product quality/customer care), and (6) The do's and don'ts (rules/norms).",
    options: [
      "Encouraging high labor turnover so nobody stays at the company",
      "Perception of the organization, reaction to challenges, dressing code/uniform, projected image (frustrator of labor turnover), recognized product/service identity, and do's & don'ts",
      "Having no rules, norms, or recognizable product quality",
      "Changing the company's identity every afternoon"
    ],
    correctIndex: 1
  },
  {
    id: 63,
    topic: "Topic 9: Organizational Culture & Dev",
    concept: "Five Types of Organizational Culture",
    question: "Distinguish between Power Culture, Role Culture, Support Culture, Achievement Culture, and Task Culture.",
    answer: "Power: small number of senior executives hold decision power. Role: bureaucratic process with clearly specified roles. Support: management buys right tools to support workers and workers support management. Achievement: recognizes/rewards positive contributions and encourages independence. Task: matches activities with required skills.",
    options: [
      "Power Culture gives all power to interns; Role Culture bans job descriptions",
      "Power = few senior executives decide; Role = clearly specified bureaucratic roles; Support = mutual support & right tools; Achievement = rewards positive contributions; Task = matches activities with skills",
      "Task Culture ignores skills; Support Culture refuses to buy equipment for workers",
      "Achievement Culture punishes self-expression and independence"
    ],
    correctIndex: 1
  },
  {
    id: 64,
    topic: "Topic 9: Organizational Culture & Dev",
    concept: "Characteristics of Organizational Development (OD)",
    question: "What is Organizational Development (OD), and what are its 5 characteristics?",
    answer: "OD is a long-range effort to improve an organization's problem-solving capacities and ability to cope with external changes. Characteristics: (1) Educational strategy for planned change, (2) Relates to real daily problems (not hypothetical), (3) External change agent reconciling with external commitment, (4) Emphasizes group/committee processes, and (5) Uses action research.",
    options: [
      "A short-term hypothetical exercise that avoids groups and ignores real daily problems",
      "A long-range educational strategy for planned change that tackles real daily problems, reconciles external commitments, uses group committees, and applies action research",
      "A strategy for laying off employees without diagnosing problems",
      "An individual exercise that prohibits committees or research"
    ],
    correctIndex: 1
  },
  {
    id: 65,
    topic: "Topic 9: Organizational Culture & Dev",
    concept: "Goals of Organizational Development (OD)",
    question: "Which of the following is a primary goal of Organizational Development (OD)?",
    answer: "Goals of OD: (1) Develop a self-renewing viable system, (2) Create an environment where authority-assigned roles are performed, (3) Increase openness and communication, (4) Create conditions where conflicts are effectively managed, (5) Build teamwork through collaboration (no coercion), and (6) Increase trust and support.",
    options: [
      "To build teamwork through collaboration (without coercion), increase openness/communication, and develop a self-renewing viable system",
      "To suppress communication and manage through fear and coercion",
      "To increase interpersonal conflict and eliminate teamwork",
      "To ensure authority-assigned roles are never performed"
    ],
    correctIndex: 0
  },
  {
    id: 66,
    topic: "Topic 9: Organizational Culture & Dev",
    concept: "5-Step Process of an Organizational Development (OD) Program",
    question: "What is the exact 5-step sequence of an Organizational Development (OD) program?",
    answer: "1. Problem Recognition (CEO/manager spots low morale, customer complaints) → 2. Organization and Diagnosis (finding facts/actual problem) → 3. Feedback (analyzed data given to authority managers) → 4. Development of Change Strategy (resolutions implemented) → 5. Measurement & Evaluation (selected group evaluates OD effectiveness after a set period).",
    options: [
      "Problem Recognition → Organization & Diagnosis → Feedback → Development of Change Strategy → Measurement & Evaluation",
      "Feedback → Retrenchment → Problem Recognition → Firing → Diagnosis",
      "Measurement & Evaluation → Development of Change Strategy → Problem Recognition",
      "Job Analysis → Recruitment → Selection → Placement → Retention"
    ],
    correctIndex: 0
  },

  // ==========================================
  // TOPIC 10: HR PLANNING & MBO (6 Questions)
  // ==========================================
  {
    id: 67,
    topic: "Topic 10: HR Planning & MBO",
    concept: "Importance of Human Resource Planning (HRP)",
    question: "What is Human Resource Planning (HRP), and what are its 5 key benefits?",
    answer: "HRP forecasts future demand for and supply of the right type and number of workers. Benefits: (1) Identifies future personnel needs, (2) Helps cope with change (market, technology, regulations), (3) Creates highly talented personnel via constant training/replacement, (4) Protects weaker sections (handicapped/oppressed), and (5) Supports international expansion strategies.",
    options: [
      "HRP only counts office furniture and ignores future staffing needs",
      "It forecasts future workforce demand/supply, helps cope with change, maintains talented personnel, protects weaker sections in recruitment, and supports international strategies",
      "It prevents handicapped or oppressed groups from being considered in recruitment",
      "It eliminates the need for training when technology changes"
    ],
    correctIndex: 1
  },
  {
    id: 68,
    topic: "Topic 10: HR Planning & MBO",
    concept: "Barriers to Human Resource Planning",
    question: "Why does Human Resource Planning (HRP) sometimes fail or face barriers in organizations?",
    answer: "Barriers: (1) People don't see the need for future HR planning and fail to cooperate, (2) HR practitioners may not be business experts so recommendations don't fit business strategy, (3) Conflicts between short-term and long-term HR needs, (4) Defective/outdated records, and (5) Excluding departmental managers makes implementation difficult.",
    options: [
      "Because records are always 100% accurate and everyone cooperates eagerly",
      "Lack of cooperation, HR recommendations not fitting business strategy, short- vs. long-term HR conflicts, defective/outdated records, and excluding departmental managers",
      "Because departmental managers are too involved in HR planning",
      "Because HR planning is required by law to fail every two years"
    ],
    correctIndex: 1
  },
  {
    id: 69,
    topic: "Topic 10: HR Planning & MBO",
    concept: "Four Principles of Human Resource Management (HRM)",
    question: "What are the 4 Principles of Human Resource Management (HRM)?",
    answer: "(1) Workers as an asset (care for them because without them money, materials, machines, and plans achieve nothing), (2) Principle of integration (work harmoniously toward goals), (3) Principle of involvement (involve workers in decision-making for total support), and (4) Principle of cooperation culture (provide right supportive environment).",
    options: [
      "Workers as liabilities, Isolation, Exclusion from decisions, and Hostile culture",
      "Workers as an asset, Principle of integration, Principle of involvement, and Principle of cooperation culture",
      "Unity of command, Scalar chain, Centralization, and Esprit de corps",
      "Standardization, Piece-rate pay, Coercion, and Retrenchment"
    ],
    correctIndex: 1
  },
  {
    id: 70,
    topic: "Topic 10: HR Planning & MBO",
    concept: "Three Concerns of Human Resource Management",
    question: "What are the 3 main Concerns of HRM, and what falls under 'A Concern for People'?",
    answer: "The 3 concerns are: (1) Concern for People — includes Respect for individuals (allowing trade unions), Mutual respect (formal/informal committees to sort out differences), and Transparency (explaining proposals/decisions in time); (2) Concern for Performance of Workers (motivating via better conditions); and (3) Concern for Performance of Management's Procedures (evaluating plans/equipment).",
    options: [
      "Concern for People (respect/trade unions, mutual respect via committees, transparency), Concern for Worker Performance, and Concern for Management's Procedures",
      "Concern for Shareholders only, Concern for Competitors, and Concern for Tax Auditors",
      "Banning trade unions, hiding management proposals, and ignoring faulty equipment",
      "Only evaluating workers while never evaluating management's plans or equipment"
    ],
    correctIndex: 0
  },
  {
    id: 71,
    topic: "Topic 10: HR Planning & MBO",
    concept: "Management By Objectives (MBO) — Assumptions & Process",
    question: "What are the two assumptions of Management By Objectives (MBO), and what happens at the end of the MBO period?",
    answer: "Assumptions: (1) Goals start at the top and flow downwards, and (2) Collaboration makes subordinates more committed without resistance. Process: Top management sets overall goals → communicated via supervisors → subordinates & supervisors meet to set individual goals & allocate resources → periodic review meetings → final assessment where achievers are rewarded and non-achievers receive remedial action.",
    options: [
      "Goals start at the bottom only, and workers who miss goals are immediately fired without review",
      "Goals flow from the top down and collaborative goal-setting builds commitment; at period end, goal achievers are rewarded and non-achievers receive remedial action",
      "MBO means managers set secret goals and never meet with subordinates",
      "Subordinates pursue goals without being given any organizational resources"
    ],
    correctIndex: 1
  },
  {
    id: 72,
    topic: "Topic 10: HR Planning & MBO",
    concept: "Advantages & Disadvantages of MBO",
    question: "What are the main advantages and disadvantages of Management By Objectives (MBO)?",
    answer: "Advantages: high motivation, high performance/efficiency, basis for training, reduces staff turnover and resistance to change, improves communication, aids self-evaluation. Disadvantages: time-consuming, costly paperwork, resistance from lazy workers, individual goals hard to set, overemphasizes short-term goals over long-term ones, rigidity, weakened by environmental/tech changes, and can make top managers lazy.",
    options: [
      "MBO has zero paperwork and focuses exclusively on 50-year long-term goals",
      "It boosts motivation, efficiency, communication, and lowers turnover, but is time-consuming, involves costly paperwork, overemphasizes short-term goals, and reduces divergent thinking",
      "MBO increases staff turnover and destroys communication between supervisors and staff",
      "Individual goals are effortless to set and immune to technological change"
    ],
    correctIndex: 1
  },

  // ==========================================
  // TOPIC 11: STAFF MOTIVATION (4 Questions)
  // ==========================================
  {
    id: 73,
    topic: "Topic 11: Staff Motivation",
    concept: "Definition & Reasons for Staff Motivation",
    question: "What is Staff Motivation, and what are the main reasons organizations motivate their workers?",
    answer: "Motivation is the psychological process that causes a drive in an individual to give their best performance (giving behavior purpose and direction). Reasons: improve performance, increase morale, enhance commitment, change acceptance, build confidence/trust, team building, and communication.",
    options: [
      "A legal penalty used to reduce employee morale and block change",
      "The psychological process causing a drive to give the best performance—used to improve performance, morale, commitment, change acceptance, trust, and teamwork",
      "A process used only when laying off workers during retrenchment",
      "A method for restricting communication between management and staff"
    ],
    correctIndex: 1
  },
  {
    id: 74,
    topic: "Topic 11: Staff Motivation",
    concept: "Methods of Motivating Staff (Job Enlargement & Status)",
    question: "How do 'Challenging tasks', 'Status', and 'Economic security' motivate employees?",
    answer: "Challenging tasks (including job enlargement) reduce boredom and monotony. Status symbols (cars, big titles, corner offices, club membership, reserved parking, carpeting) satisfy the natural desire for recognition. Economic security frees workers from fear of job loss, demotion, or loss of income.",
    options: [
      "Job enlargement increases boredom; status symbols mean taking away office chairs",
      "Challenging tasks (like job enlargement) reduce monotony; status symbols (cars, titles, corner offices, reserved parking) recognize status; security frees workers from fear of job/income loss",
      "Threatening workers with demotion every day is the best way to provide security",
      "Delegation communicates distrust in the skills possessed by subordinates"
    ],
    correctIndex: 1
  },
  {
    id: 75,
    topic: "Topic 11: Staff Motivation",
    concept: "Role of Non-Financial Incentives — Praises & Suggestion Schemes",
    question: "What are the 6 Non-Financial Incentives in Topic 11, and what rule applies to 'Praises' and 'Suggestion Schemes'?",
    answer: "The 6 are: Opportunity for growth, Praises, Feedback, Workers' participation in management, Competition, and Suggestion schemes. Praises work on one's ego and should ONLY apply to competent employees in order to encourage incompetent ones. Suggestion schemes appreciate good performers by publishing their names in company newsletters/magazines.",
    options: [
      "Praises should be given only to incompetent employees; Suggestion schemes should hide workers' names",
      "Praises should only apply to competent employees to encourage incompetent ones; Suggestion schemes publish performers' names in company newsletters/magazines to boost morale",
      "Feedback on performance should be kept secret from workers",
      "Competition among individuals and groups is strictly a financial cash bonus"
    ],
    correctIndex: 1
  },
  {
    id: 76,
    topic: "Topic 11: Staff Motivation",
    concept: "Non-Financial Incentives — Feedback & Participation",
    question: "Why are 'Feedback' and 'Workers' Participation in Management' powerful non-financial incentives?",
    answer: "Feedback gives workers knowledge of their results, which naturally leads to satisfaction. Workers' participation in management assures them that their voice is heard and considered, building trust and satisfaction.",
    options: [
      "Workers dislike knowing how they performed and hate being consulted",
      "Knowledge of results (feedback) brings satisfaction, and participation in management shows workers their voice is heard, building trust",
      "Participation in management means workers stop doing their jobs",
      "Feedback is only given when an employee is being dismissed"
    ],
    correctIndex: 1
  },

  // ==========================================
  // TOPIC 12: SUPERVISION & COORDINATION (5 Questions)
  // ==========================================
  {
    id: 77,
    topic: "Topic 12: Supervision & Coordination",
    concept: "Qualities & Roles of a Supervisor",
    question: "Who is a Supervisor, and which of the following are key qualities and roles of a supervisor?",
    answer: "A supervisor is the link between management and workers. Qualities: understand branch organization/duties/powers/limits, working knowledge of staff duties, responsible for training, plan ahead, self-disciplined first, loyal, analytical judgment, cost-conscious, lead by example. Roles: training/coaching, communication, motivating, holding briefings, custodian of rules, managing time, setting standards, appraisals, induction/orientation.",
    options: [
      "An external consultant who has no contact with workers or management",
      "The link between management and workers who leads by example, is cost-conscious, conducts appraisals, carries out induction/orientation, and coaches staff",
      "Someone who demands worker discipline while refusing to be disciplined themselves",
      "A shareholder who only attends annual general meetings"
    ],
    correctIndex: 1
  },
  {
    id: 78,
    topic: "Topic 12: Supervision & Coordination",
    concept: "Three Types of Supervisors",
    question: "Compare the three types of supervisors: 'Job-oriented', 'Work-oriented', and 'Job and Work supervisor'.",
    answer: "1. Job-oriented supervisor: concerned with application of methods and procedures (any violation is punishable). 2. Work-oriented supervisor: concerned with workers' performance and emphasizes quality performance. 3. Job and Work supervisor: concerned with BOTH methods/procedures and quality of worker performance.",
    options: [
      "Job-oriented ignores procedures; Work-oriented ignores quality",
      "Job-oriented focuses strictly on methods/procedures; Work-oriented focuses on quality performance; Job and Work supervisor focuses on both methods/procedures and quality performance",
      "All three types punish workers for following company procedures",
      "Work-oriented supervisors care only about punishing rule violations regardless of output quality"
    ],
    correctIndex: 1
  },
  {
    id: 79,
    topic: "Topic 12: Supervision & Coordination",
    concept: "Definition & Characteristics of Coordination",
    question: "How is 'Coordination' defined, and what are its main characteristics?",
    answer: "Coordination is developing an integrated and orderly pattern of group efforts to realize a common goal. Characteristics: continuous process, orderly pattern responding to organizational policies/objectives, balanced approach, based on personal contact/mutual cooperation, and aims at morale boosting.",
    options: [
      "A one-time event that divides workers to create confusion",
      "Developing an integrated and orderly pattern of group efforts to realize a common goal—continuous, balanced, based on personal contact/cooperation, and morale-boosting",
      "Replacing personal contact with anonymous penalties",
      "Working contrary to organizational policies and objectives"
    ],
    correctIndex: 1
  },
  {
    id: 80,
    topic: "Topic 12: Supervision & Coordination",
    concept: "Four Principles & Advantages of Coordination",
    question: "What are the 4 Principles of Coordination, and how does coordination benefit a firm?",
    answer: "Principles: (1) Early beginning (start when activities begin, not near completion), (2) Direct contact (personal contact to answer questions/iron out fears), (3) Feedback (identify strong points, weaknesses, improvements), and (4) Continuity. Advantages: increases productivity, economies of scale, cost reduction, high profitability, motivates staff, reduces labor turnover, survives stiff competition.",
    options: [
      "Start coordination only when the project is 99% finished and avoid direct contact",
      "Early beginning, Direct contact, Feedback, and Continuity—leading to higher productivity, economies of scale, cost reduction, and lower labor turnover",
      "Coordination increases costs and causes high labor turnover",
      "Direct contact is forbidden in coordination"
    ],
    correctIndex: 1
  },
  {
    id: 81,
    topic: "Topic 12: Supervision & Coordination",
    concept: "Five Techniques / Methods of Coordination",
    question: "What are the 5 Techniques (Methods) of Coordination used in organizations?",
    answer: "(1) Use of commands (giving orders with follow-up to identify disobedience), (2) Use of personal leadership (influencing subordinates to willingly perform tasks), (3) Communication (giving instructions), (4) Use of committees (coordinating activities in their areas), and (5) Use of special appointees (representing management to check if objectives are realized).",
    options: [
      "Use of commands, Personal leadership, Communication, Use of committees, and Use of special appointees",
      "Retrenchment, Leverage buy-out, Mergers, Joint ventures, and Diversification",
      "Benchmarking, Reference checking, Tests, Interviews, and Assessment centers",
      "Storming, Norming, Forming, Performing, and Adjourning"
    ],
    correctIndex: 0
  },

  // ==========================================
  // TOPIC 13: STAFFING (5 Questions)
  // ==========================================
  {
    id: 82,
    topic: "Topic 13: Staffing",
    concept: "Job Analysis — Definition, 6 Uses & 4 Limitations",
    question: "In the Staffing process, what are the 6 uses of Job Analysis and its 4 limitations?",
    answer: "Job Analysis identifies overall tasks, activities, and responsibilities. 6 Uses: employment, fixing salaries, identifying training needs, identifying promotions, identifying workers who disrespect policies/methods, and basis for merging departments. 4 Limitations: conflicting worker info forces guesswork, lacks time to cover all jobs, new management may reject results, and uncooperative workers render results ineffective.",
    options: [
      "Job Analysis is only used to fire retired workers and takes 5 minutes to complete",
      "Uses: employment, fixing salaries, training, promotion, spotting policy violators, and merging departments; Limitations: conflicting worker info causing guesswork, time-consuming, rejection by new management, and worker non-cooperation",
      "Job Analysis is never used for fixing salaries or merging departments",
      "Workers always give 100% identical information during Job Analysis"
    ],
    correctIndex: 1
  },
  {
    id: 83,
    topic: "Topic 13: Staffing",
    concept: "Internal Recruitment Methods (Factory Gate)",
    question: "What are the 5 methods of Internal Recruitment (recruitment at the factory gate), and why do companies prefer it?",
    answer: "5 Internal Methods: (1) Permanent workers (for top-level jobs), (2) Casual/temporal workers (for lower-level jobs), (3) Retrenched workers, (4) Retired workers (on contractual basis), and (5) Deceased dependants. Preferred because: it motivates workers, follows company policy, pleases trade unions, reduces recruitment/advertising costs, and maintains organizational culture.",
    options: [
      "Head-hunting, Private agencies, Public agencies, Data banks, and Colleges",
      "Permanent workers (top jobs), Casual workers (lower jobs), Retrenched workers, Retired workers (on contract), and Deceased dependants—preferred to motivate staff, please unions, cut ad costs, and maintain culture",
      "Internal recruitment is used when a company wants to completely change its organizational culture",
      "Casual workers are only considered for CEO positions in internal recruitment"
    ],
    correctIndex: 1
  },
  {
    id: 84,
    topic: "Topic 13: Staffing",
    concept: "External Recruitment Methods & Advantages",
    question: "What are the 5 methods of External Recruitment, including the difference between Public and Private Agencies and Data Banks?",
    answer: "(1) Educational institutions (colleges), (2) Head-hunting (going for a specific person for top-level positions), (3) Public agency (state-financed, free to the organization), (4) Private agency (charges a fee, e.g., Manpower, PwC), and (5) Data banks (kept info on unsuccessful applicants reverted to when vacancies arise). External recruitment is preferred to change culture, earn societal goodwill, access a large pool, or get competitor secrets.",
    options: [
      "Public agencies charge high fees while Private agencies like PwC are state-financed and free",
      "Educational institutions, Head-hunting (top positions), Public agency (state-funded/free), Private agency (fee-based e.g. Manpower/PwC), and Data banks (unsuccessful applicants' records)",
      "Data banks store only retired employees' pension cheques",
      "Head-hunting is only used to hire casual factory-gate workers"
    ],
    correctIndex: 1
  },
  {
    id: 85,
    topic: "Topic 13: Staffing",
    concept: "Seven Employee Selection Methods",
    question: "What is Selection in staffing, and what are the 7 Selection Methods listed in your notes?",
    answer: "Selection is choosing the right person to be offered a job. The 7 methods are: (1) Interviewing (face-to-face first-hand info), (2) Benchmarking (comparing applicant's qualifications with a performing worker's), (3) Reference checking, (4) Tests, (5) Filling the application blank, (6) Use of consultants, and (7) Assessment centers.",
    options: [
      "Interviewing, Benchmarking (comparing with a performing worker), Reference checking, Tests, Application blank, Consultants, and Assessment centers",
      "Coercion, Reward, Legitimate, Expert, and Referent selection",
      "Benchmarking means calling the applicant's family members for a loan",
      "Selection happens before Job Analysis and Recruitment"
    ],
    correctIndex: 0
  },
  {
    id: 86,
    topic: "Topic 13: Staffing",
    concept: "Employee Retention Factors",
    question: "What is Retention, and which 8 factors contribute to retaining workers in a firm?",
    answer: "Retention ensures workers are highly motivated to stay with the firm long-term without wishing to leave. The 8 factors: (1) Training & development opportunities, (2) Competitive rewards/salary, (3) Job security, (4) Filling vacancies internally, (5) Worker-friendly rules/policies, (6) Worker-friendly management practices, (7) Better working conditions, and (8) Welfare services (house, medical, transport allowances).",
    options: [
      "Denying training, cutting allowances, and filling all vacancies externally",
      "Training/development, competitive salary, job security, internal vacancy filling, worker-friendly policies & management practices, good working conditions, and welfare services (house/medical/transport allowances)",
      "Withholding job security so employees stay out of fear",
      "Eliminating house, medical, and transport allowances"
    ],
    correctIndex: 1
  },

  // ==========================================
  // TOPIC 14: THE DECISION MAKING PROCESS (4 Questions)
  // ==========================================
  {
    id: 87,
    topic: "Topic 14: Decision Making",
    concept: "Characteristics of Decision Making",
    question: "What is Decision Making, and what are its 5 key characteristics?",
    answer: "Decision making is the selection of a course of action from among many alternatives. Characteristics: (1) Always purposed to realize a particular goal, (2) Continuous process, (3) Comes into picture only when there are many alternatives, (4) Intellectual process guided by reasoning and analytical thinking, and (5) Carried out by all managers irrespective of level.",
    options: [
      "A one-time emotional guess made only when there is a single option available",
      "Goal-purposed, continuous, requires multiple alternatives, is an intellectual/analytical process, and is carried out by managers at all levels",
      "Carried out only by top-level CEOs and never by departmental heads or supervisors",
      "Unrelated to planning or resource allocation"
    ],
    correctIndex: 1
  },
  {
    id: 88,
    topic: "Topic 14: Decision Making",
    concept: "Four Pairs of Decision Types",
    question: "Distinguish between the 4 pairs of decision types: Operational vs. Strategic, Programmed vs. Non-programmed, Individual vs. Group, and Minor vs. Major.",
    answer: "Operational (departmental heads, daily running) vs. Strategic (top-level, entire organization/rules); Programmed (repetitive, made in consultation with rules/policies) vs. Non-programmed; Individual (single manager, e.g., departmental) vs. Group (many top managers); Minor (no far-reaching implications, little resource commitment) vs. Major (costly, e.g., starting up projects).",
    options: [
      "Minor decisions cost the organization dearly (like starting projects), while Major decisions commit no resources",
      "Operational = dept heads/daily running vs. Strategic = top level/whole firm; Programmed = repetitive/rule-guided; Individual vs. Group; Minor (low cost) vs. Major (costly projects)",
      "Programmed decisions violate company rules and policies every time",
      "Strategic decisions are made by casual workers on a daily basis"
    ],
    correctIndex: 1
  },
  {
    id: 89,
    topic: "Topic 14: Decision Making",
    concept: "5 Steps in the Decision Making Process (Sample Exam Question)",
    question: "What are the 5 Steps in the Decision Making Process, and why must you avoid jumping to conclusions based on symptoms in Step 1?",
    answer: "1. Defining the problem (identify true causes rather than jumping to conclusions based on symptoms) → 2. Analyse the problem (sort contributing factors, avoid personal prejudices/biases) → 3. Develop alternatives (via creativity/imagination) → 4. Evaluate alternatives (rank from most to least favored based on achievability/risk) → 5. Select and implement the decision.",
    options: [
      "Jump to conclusions based on symptoms → Implement decision → Develop alternatives",
      "1. Define problem (true causes, not symptoms) → 2. Analyse problem (avoid bias) → 3. Develop alternatives → 4. Evaluate/rank alternatives → 5. Select & implement decision",
      "Evaluate alternatives first before defining what the problem is",
      "Use personal prejudices and biases in Step 2 to speed up analysis"
    ],
    correctIndex: 1
  },
  {
    id: 90,
    topic: "Topic 14: Decision Making",
    concept: "Barriers to Effective Decision Making & How to Avoid Them",
    question: "What are the 5 barriers to effective decision making, and how can an organization overcome them?",
    answer: "Barriers: (1) Evaluating problems from a stereotype/preconceived position, (2) Avoiding creativity and new ideas, (3) Responding without proper information/knowledge, (4) Fights/conflicts between departmental managers, and (5) Lack of right skills/experience. Overcome by: avoiding premature evaluations, encouraging creativity/analytical thinking, teamwork comparison for learning, eliminating bias, and free flow of information.",
    options: [
      "Encourage premature evaluations, stereotypes, and departmental fights",
      "Barriers include stereotypes, avoiding creativity, lacking info/skills, and inter-departmental fights; overcome them by avoiding premature evaluations, encouraging creativity/teamwork, removing bias, and ensuring free flow of information",
      "Restrict information flow so managers decide purely on guesswork",
      "Keep all evaluators biased toward their own preconceived notions"
    ],
    correctIndex: 1
  }
];
