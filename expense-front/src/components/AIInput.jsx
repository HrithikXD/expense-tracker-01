import { useState } from "react";
import { Form, Button, Container, InputGroup } from "react-bootstrap";

const AIInput = () => {
  const [input, setInput] = useState(""); // Store user input
  const [loading, setLoading] = useState(false); // Loading state

  // Function to call AI & API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);

    try {
      // Call Gen AI API to process the expense text
      const aiResponse = await fetch("/api/gen-ai-process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      const aiData = await aiResponse.json();

      // Extract structured data (Example: { amount, category, description })
      const { amount, category, description } = aiData;
      console.log(aiData)
    //   // Send the processed expense data to backend API
    //   const expenseResponse = await fetch("/api/expenses", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ amount, category, description }),
    //   });

    //   if (expenseResponse.ok) {
    //     console.log("Expense added successfully!");
    //   } else {
    //     console.error("Failed to add expense");
    //   }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setInput(""); // Clear input field
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-3">
      <Form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: "500px" }}>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="AI input ( Coming Soon..)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <Button variant="primary" type="submit" disabled={true}>
            {loading ? "Processing..." : "Submit"}
          </Button>
        </InputGroup>
      </Form>
    </Container>
  );
};

export default AIInput;
