# Realtime Feedback System for Assignments 
##Porject Built at TechFiesta International Hackathon 

## Features
- Fetch assignments and topics from **Classroom API**.
- Analyze student responses using a **vector database trained on 400k+ assignments**.
- Generate **AI-powered feedback** tailored to student submissions.
- **Pre-Submission Evaluation**:
  - Students can upload their **PDF/DOC** before final submission.
  - AI evaluates the document and provides **suggestions for improvement**.
  - Students can make changes based on feedback before submitting.
- **Adaptive Quiz Generator**:
  - Generates quizzes based on topics selected by students for practice.
  - Provides **feedback on quiz performance**.
  - Recommends **YouTube videos** for additional learning and practice.
- Supports **PDF/DOC** processing with OCR for text extraction.
- Uses **Supabase (pgvector)** for advanced text similarity analysis.

## How It Works
1. Assignments and topics are fetched from **Classroom API**.
2. Students can **evaluate their submission** before finalizing it.
3. Student submissions are processed (PDF/DOC -> OCR -> text extraction).
4. Extracted text is embedded and compared against a **trained vector database**.
5. **Feedback & score** are generated based on prior 400k+ analyzed assignments.
6. **Students can generate quizzes** on selected topics for practice.
7. AI provides **quiz feedback and video recommendations** for better understanding.

## Future Enhancements
- Improve the **vector database training** for even more accurate feedback.
- Implement a **real-time interactive learning assistant**.
- Enhance the **dashboard for better student and teacher insights**.

## Contributing
Feel free to contribute! Open an issue or submit a pull request.

## License
[MIT](LICENSE)

