import { useState } from "react";

// ===== COMPONENT: StudentForm functional component =====
function StudentForm({ addStudent }) {
  // ===== PROPS: addStudent function passed from parent (App.jsx) =====
  
  // ===== STATE: Form input fields =====
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [category, setCategory] = useState("General");

  // ===== EVENT HANDLER: Handle form submission =====
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!name.trim() || !age) {
      alert("Please fill in both name and age");
      return;
    }

    // PROPS: Calling function passed from parent
    addStudent({ name: name.trim(), age: parseInt(age), category });

    // Reset STATE after submission
    setName("");
    setAge("");
    setCategory("General");
  };

  return (
    // ===== FORM: HTML form element =====
    <form onSubmit={handleSubmit} className="student-form">
      <div className="form-group">
        {/* FORM INPUT - EVENT: onChange handler updates state */}
        <input
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        {/* FORM INPUT - EVENT: onChange handler updates state */}
        <input
          type="number"
          placeholder="Enter Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          min="1"
          max="100"
          required
        />
      </div>

      <div className="form-group">
        {/* FORM SELECT - EVENT: onChange handler updates state */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="General">General</option>
          <option value="Science">Science</option>
          <option value="Arts">Arts</option>
          <option value="Sports">Sports</option>
          <option value="Technology">Technology</option>
        </select>
      </div>

      {/* FORM SUBMIT - EVENT: onSubmit handler */}
      <button type="submit" className="add-btn">Add Student</button>
    </form>
  );
}

export default StudentForm;