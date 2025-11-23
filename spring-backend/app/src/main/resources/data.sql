INSERT INTO labels (id, label_key, value)
VALUES (1, 'math_basic', 'Math'),
       (2, 'sci_intro', 'Science'),
       (3, 'eng_grammar', 'English'),
       (4, 'hist_world', 'History'),
       (5, 'prog_java', 'Java'),
       (6, 'prog_js', 'JavaScript'),
       (7, 'prog_py', 'Python'),
       (8, 'art_draw', 'Drawing'),
       (9, 'music_theory', 'Music'),
       (10, 'bio_intro', 'Biology'),
       (11, 'chem_basic', 'Chemistry'),
       (12, 'phys_fund', 'Physics'),
       (13, 'geo_world', 'Geography'),
       (14, 'lit_classic', 'Literature'),
       (15, 'lang_span', 'Spanish'),
       (16, 'lang_french', 'French'),
       (17, 'lang_germ', 'German'),
       (18, 'lang_china', 'Chinese'),
       (19, 'lang_japan', 'Japanese'),
       (20, 'lang_italy', 'Italian'),
       (21, 'comp_basic', 'Computers'),
       (22, 'web_html', 'HTML'),
       (23, 'web_css', 'CSS'),
       (24, 'web_react', 'React'),
       (25, 'web_node', 'NodeJS'),
       (26, 'db_sql', 'SQL'),
       (27, 'db_mongo', 'MongoDB'),
       (28, 'soft_skill', 'SoftSkill'),
       (29, 'leadership', 'Leader'),
       (30, 'teamwork', 'Teamwork'),
       (31, 'comm_skill', 'Comm'),
       (32, 'prob_solve', 'ProblemSolv'),
       (33, 'crit_think', 'CritThink'),
       (34, 'creativity', 'Creative'),
       (35, 'time_mgmt', 'TimeMgmt'),
       (36, 'study_skill', 'Study'),
       (37, 'exam_prep', 'ExamPrep'),
       (38, 'test_mcq', 'MCQ'),
       (39, 'test_essay', 'Essay'),
       (40, 'quiz_short', 'Quiz'),
       (41, 'project', 'Project'),
       (42, 'assign', 'Assign'),
       (43, 'homework', 'Homework'),
       (44, 'lab_work', 'LabWork'),
       (45, 'seminar', 'Seminar'),
       (46, 'workshop', 'Workshop'),
       (47, 'course_plan', 'Plan'),
       (48, 'syllabus', 'Syllabus'),
       (49, 'module', 'Module'),
       (50, 'unit', 'Unit');

INSERT INTO users (id, first_name, last_name, email, picture)
VALUES (1, 'Your first name', 'Your last name', 'user_email@gmail.com.com', 'https://photo.url/here.jpg'),
       (2, 'Alice', 'Smith', 'alice.smith@example.com', 'https://picsum.photos/seed/alice/100'),
       (3, 'Bob', 'Johnson', 'bob.johnson@example.com', 'https://picsum.photos/seed/bob/100'),
       (4, 'Carol', 'Williams', 'carol.williams@example.com', 'https://picsum.photos/seed/carol/100'),
       (5, 'David', 'Brown', 'david.brown@example.com', 'https://picsum.photos/seed/david/100'),
       (6, 'Eve', 'Jones', 'eve.jones@example.com', 'https://picsum.photos/seed/eve/100'),
       (7, 'Frank', 'Garcia', 'frank.garcia@example.com', 'https://picsum.photos/seed/frank/100'),
       (8, 'Grace', 'Martinez', 'grace.martinez@example.com', 'https://picsum.photos/seed/grace/100'),
       (9, 'Hank', 'Rodriguez', 'hank.rodriguez@example.com', 'https://picsum.photos/seed/hank/100'),
       (10, 'Ivy', 'Lee', 'ivy.lee@example.com', 'https://picsum.photos/seed/ivy/100'),
       (11, 'Jack', 'Walker', 'jack.walker@example.com', 'https://picsum.photos/seed/jack/100'),
       (12, 'Kathy', 'Hall', 'kathy.hall@example.com', 'https://picsum.photos/seed/kathy/100'),
       (13, 'Leo', 'Allen', 'leo.allen@example.com', 'https://picsum.photos/seed/leo/100'),
       (14, 'Mona', 'Young', 'mona.young@example.com', 'https://picsum.photos/seed/mona/100'),
       (15, 'Nate', 'King', 'nate.king@example.com', 'https://picsum.photos/seed/nate/100'),
       (16, 'Olga', 'Wright', 'olga.wright@example.com', 'https://picsum.photos/seed/olga/100'),
       (17, 'Paul', 'Scott', 'paul.scott@example.com', 'https://picsum.photos/seed/paul/100'),
       (18, 'Quinn', 'Green', 'quinn.green@example.com', 'https://picsum.photos/seed/quinn/100'),
       (19, 'Rita', 'Baker', 'rita.baker@example.com', 'https://picsum.photos/seed/rita/100'),
       (20, 'Sam', 'Adams', 'sam.adams@example.com', 'https://picsum.photos/seed/sam/100'),
       (21, 'Tina', 'Nelson', 'tina.nelson@example.com', 'https://picsum.photos/seed/tina/100');

-- Insert 20 trees
INSERT INTO tree (id, created_by, title, description, created_date)
VALUES
    (1, 'user_email@gmail.com.com', 'Algebra Foundations', 'Explore core algebraic principles and problem-solving techniques.', NOW()),
    (2, 'user_email@gmail.com.com', 'World War II Events', 'Chronological overview of major WWII events and their impact.', NOW()),
    (3, 'user_email@gmail.com.com', 'Java OOP Concepts', 'Understand object-oriented programming in Java.', NOW()),
    (4, 'user_email@gmail.com.com', 'English Tenses Mastery', 'Comprehensive guide to English verb tenses.', NOW()),
    (5, 'user_email@gmail.com.com', 'Cell Biology Basics', 'Introduction to cell structure and function.', NOW()),
    (6, 'user_email@gmail.com.com', 'Landscape Drawing', 'Techniques for drawing realistic landscapes.', NOW()),
    (7, 'user_email@gmail.com.com', 'Music Composition', 'Fundamentals of composing original music.', NOW()),
    (8, 'user_email@gmail.com.com', 'Organic Chemistry', 'Key concepts in organic chemical reactions.', NOW()),
    (9, 'user_email@gmail.com.com', 'European Capitals', 'Learn the capitals of all European countries.', NOW()),
    (10, 'user_email@gmail.com.com', 'Python Data Structures', 'Lists, dictionaries, and sets in Python.', NOW()),
    (11, 'user_email@gmail.com.com', 'Short Story Writing', 'Crafting engaging short stories.', NOW()),
    (12, 'user_email@gmail.com.com', 'Newtonian Physics', 'Laws of motion and classical mechanics.', NOW()),
    (13, 'user_email@gmail.com.com', 'Conversational Spanish', 'Essential Spanish for everyday conversation.', NOW()),
    (14, 'user_email@gmail.com.com', 'Responsive Web Design', 'Building mobile-friendly web pages with HTML & CSS.', NOW()),
    (15, 'user_email@gmail.com.com', 'Critical Reasoning', 'Sharpen your logical and analytical thinking.', NOW()),
    (16, 'user_email@gmail.com.com', 'SQL Query Practice', 'Hands-on SQL queries for beginners.', NOW()),
    (17, 'user_email@gmail.com.com', 'Effective Teamwork', 'Strategies for successful team collaboration.', NOW()),
    (18, 'user_email@gmail.com.com', 'Exam Success Toolkit', 'Tips and tools for acing your exams.', NOW()),
    (19, 'user_email@gmail.com.com', 'Agile Project Management', 'Principles and practices of Agile methodology.', NOW()),
    (20, 'user_email@gmail.com.com', 'French for Beginners', 'Start speaking French with basic phrases.', NOW());


INSERT INTO tree_labels (tree_id, labels_id)
VALUES (1, 1),   -- Math
       (1, 31),  -- Comm
       (1, 32),  -- ProblemSolv
       (2, 4),   -- History
       (2, 12),  -- Physics
       (2, 13),  -- Geography
       (3, 5),   -- Java
       (3, 31),  -- Comm
       (3, 27),  -- MongoDB
       (4, 3),   -- English
       (4, 14),  -- Literature
       (4, 32),  -- ProblemSolv
       (5, 10),  -- Biology
       (5, 11),  -- Chemistry
       (5, 2),   -- Science
       (6, 8),   -- Drawing
       (6, 33),  -- CritThink
       (6, 34),  -- Creative
       (7, 9),   -- Music
       (7, 35),  -- TimeMgmt
       (7, 36),  -- Study
       (8, 11),  -- Chemistry
       (8, 2),   -- Science
       (8, 42),  -- Assign
       (9, 13),  -- Geography
       (9, 17),  -- German
       (9, 19),  -- Japanese
       (10, 7),  -- Python
       (10, 26), -- SQL
       (10, 27), -- MongoDB
       (11, 33), -- CritThink
       (11, 14), -- Literature
       (12, 12), -- Physics
       (12, 31), -- Comm
       (12, 38), -- MCQ
       (13, 15), -- Spanish
       (13, 27), -- MongoDB
       (13, 32), -- ProblemSolv
       (14, 21), -- Computers
       (14, 22), -- HTML
       (14, 23), -- CSS
       (15, 31), -- Comm
       (15, 32), -- ProblemSolv
       (15, 33), -- CritThink
       (16, 25), -- NodeJS
       (16, 26), -- SQL
       (16, 27), -- MongoDB
       (17, 29), -- Leader
       (17, 30), -- Teamwork
       (17, 27), -- MongoDB
       (18, 36), -- Study
       (18, 37), -- ExamPrep
       (18, 38), -- MCQ
       (19, 39), -- Essay
       (19, 40), -- Quiz
       (19, 41), -- Project
       (20, 16), -- French
       (20, 17), -- German
       (20, 18); -- Chinese

INSERT INTO tree_owners (tree_id, owner_id)
VALUES
    (1, 1),   (1, 2),
    (2, 1),   (2, 3),
    (3, 1),   (3, 4),
    (4, 1),   (4, 5),
    (5, 1),   (5, 6),
    (6, 1),   (6, 7),
    (7, 1),   (7, 8),
    (8, 1),   (8, 9),
    (9, 1),   (9, 10),
    (10, 1),  (10, 11),
    (11, 1),  (11, 12),
    (12, 1),  (12, 13),
    (13, 1),  (13, 14),
    (14, 1),  (14, 15),
    (15, 1),  (15, 16),
    (16, 1),  (16, 17),
    (17, 1),  (17, 18),
    (18, 1),  (18, 19),
    (19, 1),  (19, 20),
    (20, 1);