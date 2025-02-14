import { useState } from "react";
import axios from "axios";
import React from "react";
export default function BibleGPT() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchResponse = async () => {
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await axios.get("http://localhost:3000/ai/get-response", {
        params: { prompt: question },
      });

      setResponse(res.data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
<div
  className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat px-4"
  style={{ backgroundImage:"url('./public/cross.jpg')" ,
    backgroundSize: "100%", // Zoom out the image slightly
    backgroundPosition: "60% center", // Shift the image to the right
  }
  } // Replace with actual URL
>

      <div className="max-w-lg w-full bg-white text-gray-900 shadow-2xl rounded-3xl p-6">
        <h1 className="text-3xl font-extrabold text-center text-yellow-600 mb-4">
          ✨ Ask Jesus ✨
        </h1>
        <p className="text-md text-gray-600 text-center mb-6">
          "Ask, and it will be given to you; seek, and you will find."<b> (Matthew 7:7)</b>
        </p>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-800 shadow-sm"
            placeholder="Type your question..."
          />
          <button
            onClick={fetchResponse}
            className="w-full bg-yellow-500 text-white py-3 rounded-xl text-lg font-semibold hover:bg-yellow-600 transition duration-300 ease-in-out shadow-md disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Searching the sacred text..." : "Get Answer"}
          </button>
        </div>

        {error && <p className="text-red-600 mt-3 text-center">{error}</p>}

        {response && (
          <div className="mt-6 bg-gray-100 p-5 rounded-xl border border-gray-300 shadow-inner">
            <p className="text-lg font-semibold text-yellow-700">Jesus says:</p>
            <p className="text-gray-800 mt-2 italic">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
