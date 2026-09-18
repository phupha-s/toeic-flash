const questions = [
    // --- LISTENING PARTS ---
    {
        id: 1,
        part: "Part 1: Photographs",
        type: "listening",
        text: "Look at the picture. Choose the statement that best describes what you see in the picture.",
        audioSrc: "audio/q01.mp3",
        options: [
            "A. He is typing on a laptop.",
            "B. He is pouring a cup of coffee.",
            "C. He is filing some documents.",
            "D. He is talking on the telephone."
        ],
        correct: 0 // A
    },
    {
        id: 2,
        part: "Part 2: Question-Response",
        type: "listening",
        text: "Where is the annual performance review meeting being held?",
        audioSrc: "audio/q02.mp3",
        options: [
            "A. Yes, it was very thorough.",
            "B. In Conference Room B on the second floor.",
            "C. At 2:30 PM tomorrow."
        ],
        correct: 1 // B
    },
    {
        id: 3,
        part: "Part 3: Conversations",
        type: "listening",
        text: "What problem are the speakers discussing?",
        audioSrc: "audio/q03.mp3",
        options: [
            "A. A delayed shipment of supplies",
            "B. A budget shortage for the project",
            "C. A technical failure in the server room",
            "D. An incorrect invoice amount"
        ],
        correct: 0 // A
    },
    {
        id: 4,
        part: "Part 4: Talks",
        type: "listening",
        text: "According to the speaker, what will happen at 3:00 PM?",
        audioSrc: "audio/q04.mp3",
        options: [
            "A. The main gate will be closed.",
            "B. A keynote speech will begin.",
            "C. Free coffee will be served in the lobby.",
            "D. Guided factory tours will start."
        ],
        correct: 3 // D
    },

    // --- READING PARTS ---
    {
        id: 5,
        part: "Part 5: Incomplete Sentences",
        type: "reading",
        text: "All staff members are reminded that safety equipment must be worn at all times ________ entering the manufacturing area.",
        audioSrc: null,
        options: [
            "A. when",
            "B. during",
            "C. while",
            "D. upon"
        ],
        correct: 3 // D (upon entering)
    },
    {
        id: 6,
        part: "Part 5: Incomplete Sentences",
        type: "reading",
        text: "Ms. Tanaka requested an ________ version of the quarterly financial statement before the board meeting.",
        audioSrc: null,
        options: [
            "A. update",
            "B. updated",
            "C. updating",
            "D. updates"
        ],
        correct: 1 // B (updated)
    },
    {
        id: 7,
        part: "Part 6: Text Completion",
        type: "reading",
        text: "Thank you for subscribing to Business Monthly. Your first issue ________ within two business days.",
        audioSrc: null,
        options: [
            "A. delivered",
            "B. will be delivered",
            "C. deliver",
            "D. has delivered"
        ],
        correct: 1 // B (will be delivered)
    },
    {
        id: 8,
        part: "Part 6: Text Completion",
        type: "reading",
        text: "Please review the attached contract carefully. ________ you have any questions, feel free to contact our legal team.",
        audioSrc: null,
        options: [
            "A. Should",
            "B. Unless",
            "C. Although",
            "D. Despite"
        ],
        correct: 0 // A (Should you have = If you have)
    },
    {
        id: 9,
        part: "Part 7: Reading Comprehension",
        type: "reading",
        text: "[Notice] The main elevator in Building A will be out of service on Saturday for routine maintenance. What is the purpose of the notice?",
        audioSrc: null,
        options: [
            "A. To announce an elevator closure",
            "B. To advertise a construction service",
            "C. To hire new maintenance staff",
            "D. To inform about office relocation"
        ],
        correct: 0 // A
    },
    {
        id: 10,
        part: "Part 7: Reading Comprehension",
        type: "reading",
        text: "According to the email, why is the product launch delayed until next month?",
        audioSrc: null,
        options: [
            "A. Marketing materials are incomplete.",
            "B. Additional quality testing is required.",
            "C. Key staff members are on leave.",
            "D. Raw materials are out of stock."
        ],
        correct: 1 // B
    }
];
