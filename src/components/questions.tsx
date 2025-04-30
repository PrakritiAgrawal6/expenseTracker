import React, { useEffect, useState } from 'react';
import { Question } from '../interfaces/question';

const QuestionAnswerPage: React.FC = () => {
  const [data, setData] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newAnswer, setNewAnswer] = useState<string>('');
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [newQuestion, setNewQuestion] = useState<string>('');
  const [askedBy, setAskedBy] = useState<string>('680a144ee99aa38d880cba70');

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/questions', {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuestionId || !newAnswer) return;

    fetch(`http://localhost:8080/api/v1/questions/${selectedQuestionId}/answers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 'currentUserId', // Replace with actual user ID
        answer: newAnswer,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(prevData =>
          prevData.map(question =>
            question._id === selectedQuestionId
              ? { ...question, answers: [...question.answers, data] }
              : question
          )
        );
        setNewAnswer('');
        setSelectedQuestionId(null);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch('http://localhost:8080/api/v1/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: newQuestion,
        askedBy: askedBy,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(prevData => [...prevData, data]);
        setNewQuestion('');
      })
      .catch(error => {
        setError(error.message);
      });
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleQuestionSubmit} className="mb-8 p-4 border rounded-lg shadow-sm">
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Ask a new question..."
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
          Submit Question
        </button>
      </form>
      {data.map((item) => (
        <div key={item._id} className="mb-8 p-4 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">{item.question}</h2>
          <p className="text-gray-600 mb-4">Asked by: {item.askedBy} on {new Date(item.createdAt).toLocaleString()}</p>
          <div className="answers">
            {item.answers.length > 0 ? (
              item.answers.map((answer) => (
                <div key={answer._id} className="border-t pt-4 mt-4">
                  <p><strong>Answer:</strong> {answer.answer}</p>
                  <p className="text-gray-500">Answered by: {answer.userId} on {new Date(answer.createdAt).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No answers yet.</p>
            )}
          </div>
          <form onSubmit={handleAnswerSubmit} className="mt-4">
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Write your answer..."
              value={newAnswer}
              onChange={(e) => {
                setNewAnswer(e.target.value);
                setSelectedQuestionId(item._id);
              }}
            />
            <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
              Submit Answer
            </button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default QuestionAnswerPage;
