import { useState, useEffect } from "react";
import "./App.css";
// ===== COMPONENTS: Importing child components =====
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import ThreeBackground from "./components/ThreeBackground";

// ===== COMPONENT: Main App Component =====
function App() {
  // ===== STATE: Managing application data =====
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");
    return savedStudents ? JSON.parse(savedStudents) : [];
  });
  const [searchTerm, setSearchTerm] = useState(""); // STATE: Search input
  const [editingIndex, setEditingIndex] = useState(null); // STATE: Currently editing student
  const [editName, setEditName] = useState(""); // STATE: Edit form - name input
  const [editAge, setEditAge] = useState(""); // STATE: Edit form - age input
  const [sortBy, setSortBy] = useState("name"); // STATE: Sort option
  const [filterCategory, setFilterCategory] = useState("all"); // STATE: Category filter
  const [darkMode, setDarkMode] = useState(false); // STATE: Dark mode toggle

  // ===== SIDE EFFECT: Save to localStorage when students state changes =====
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // ===== EVENT HANDLER: Add new student =====
  const addStudent = (student) => {
    if (!student.name.trim() || !student.age) {
      alert("Please fill in both name and age");
      return;
    }
    const newStudent = {
      ...student,
      id: Date.now(),
      category: student.category || "General",
      dateAdded: new Date().toISOString()
    };
    setStudents([...students, newStudent]); // Update state
  };

  // ===== EVENT HANDLER: Delete specific student =====
  const deleteStudent = (index) => {
    const updated = students.filter((_, i) => i !== index);
    setStudents(updated); // Update state
  };

  // ===== EVENT HANDLER: Initiate edit mode =====
  const editStudent = (index) => {
    setEditingIndex(index);
    setEditName(students[index].name);
    setEditAge(students[index].age);
  };

  // ===== EVENT HANDLER: Save edited student =====
  const saveEdit = () => {
    if (!editName.trim() || !editAge) {
      alert("Please fill in both name and age");
      return;
    }
    if (editingIndex !== null) {
      const updated = [...students];
      updated[editingIndex] = { ...updated[editingIndex], name: editName, age: editAge };
      setStudents(updated); // Update state
      setEditingIndex(null);
      setEditName("");
      setEditAge("");
    }
  };

  // ===== EVENT HANDLER: Cancel edit mode =====
  const cancelEdit = () => {
    setEditingIndex(null);
    setEditName("");
    setEditAge("");
  };

  // ===== EVENT HANDLER: Clear all students =====
  const clearAll = () => {
    if (window.confirm("Are you sure you want to delete all students?")) {
      setStudents([]); // Update state
    }
  };

  // ===== FUNCTION: Sort students based on selected option =====
  const sortStudents = (students) => {
    return [...students].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "age") {
        return a.age - b.age;
      } else if (sortBy === "date") {
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      }
      return 0;
    });
  };

  // ===== FUNCTION: Filter students by search term and category =====
  const filterStudents = (students) => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "all" || student.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  };

  // ===== DERIVED STATE: Process students through filters and sort =====
  const processedStudents = sortStudents(filterStudents(students));

  // ===== STATISTICS: Calculate from state =====
  const totalStudents = students.length;
  const averageAge = totalStudents > 0 ? Math.round(students.reduce((sum, s) => sum + parseInt(s.age), 0) / totalStudents) : 0;
  const categories = [...new Set(students.map(s => s.category))];

  // ===== EVENT HANDLER: Smooth scroll to section =====
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  // ===== RENDER =====
  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <ThreeBackground />
      
      {/* ===== NAVIGATION COMPONENT ===== */}
      <nav className="nav">
        <div className="nav-content">
          <h2>Student Manager</h2>
          <div className="nav-links">
            {/* EVENT: onclick handlers for navigation */}
            <button onClick={() => scrollToSection('hero')}>Home</button>
            <button onClick={() => scrollToSection('add')}>Add Student</button>
            <button onClick={() => scrollToSection('list')}>Student List</button>
            <button onClick={() => scrollToSection('stats')}>Statistics</button>
            {/* EVENT: Dark mode toggle */}
            <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section id="hero" className="section hero">
        <div className="hero-content">
          <h1>Welcome to Student Manager</h1>
          <p>Manage your students with style and efficiency</p>
          <div className="hero-stats">
            {/* DISPLAYING STATE VALUES */}
            <div className="stat-card">
              <h3>{totalStudents}</h3>
              <p>Total Students</p>
            </div>
            <div className="stat-card">
              <h3>{averageAge}</h3>
              <p>Average Age</p>
            </div>
            <div className="stat-card">
              <h3>{categories.length}</h3>
              <p>Categories</p>
            </div>
          </div>
          {/* EVENT: onclick handler */}
          <button className="cta-btn" onClick={() => scrollToSection('add')}>
            Get Started
          </button>
        </div>
      </section>

      {/* ===== ADD STUDENT SECTION ===== */}
      <section id="add" className="section add-section">
        <div className="card">
          <h2>Add New Student</h2>
          {/* COMPONENT & PROPS: Passing addStudent function as prop */}
          <StudentForm addStudent={addStudent} />
        </div>
      </section>

      {/* ===== STUDENT LIST SECTION ===== */}
      <section id="list" className="section list-section">
        <div className="card">
          <h2>Student List</h2>
          <div className="controls">
            {/* FORM: Search input - EVENT: onChange handler */}
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {/* FORM: Sort dropdown - EVENT: onChange handler */}
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
              <option value="name">Sort by Name</option>
              <option value="age">Sort by Age</option>
              <option value="date">Sort by Date Added</option>
            </select>
            {/* FORM: Filter dropdown - EVENT: onChange handler */}
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="filter-select">
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {/* EVENT: onclick handler */}
            <button onClick={clearAll} className="clear-btn">Clear All</button>
          </div>

          {/* CONDITIONAL RENDERING: Show edit form when editingIndex is set */}
          {editingIndex !== null && (
            <div className="edit-form">
              <h3>Edit Student</h3>
              {/* FORM: Edit name input - EVENT: onChange handler */}
              <input
                type="text"
                placeholder="Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="edit-input"
              />
              {/* FORM: Edit age input - EVENT: onChange handler */}
              <input
                type="number"
                placeholder="Age"
                value={editAge}
                onChange={(e) => setEditAge(e.target.value)}
                className="edit-input"
              />
              {/* EVENT: onclick handlers for save/cancel */}
              <button onClick={saveEdit} className="save-btn">Save</button>
              <button onClick={cancelEdit} className="cancel-btn">Cancel</button>
            </div>
          )}

          {/* COMPONENT & PROPS: Passing state and event handlers as props */}
          <StudentList
            students={processedStudents}
            deleteStudent={deleteStudent}
            editStudent={editStudent}
          />
        </div>
      </section>

      {/* ===== STATISTICS SECTION ===== */}
      <section id="stats" className="section stats-section">
        <div className="card">
          <h2>Student Statistics</h2>
          <div className="stats-grid">
            {/* DISPLAYING STATE VALUES */}
            <div className="stat-card detailed">
              <h3>{totalStudents}</h3>
              <p>Total Students</p>
            </div>
            <div className="stat-card detailed">
              <h3>{averageAge}</h3>
              <p>Average Age</p>
            </div>
            <div className="stat-card detailed">
              <h3>{totalStudents > 0 ? Math.min(...students.map(s => parseInt(s.age))) : 0}</h3>
              <p>Youngest Age</p>
            </div>
            <div className="stat-card detailed">
              <h3>{totalStudents > 0 ? Math.max(...students.map(s => parseInt(s.age))) : 0}</h3>
              <p>Oldest Age</p>
            </div>
            <div className="stat-card detailed">
              <h3>{categories.length}</h3>
              <p>Categories</p>
            </div>
            <div className="stat-card detailed">
              <h3>{students.filter(s => s.category === "General").length}</h3>
              <p>General Category</p>
            </div>
          </div>

          <div className="category-breakdown">
            <h3>Category Breakdown</h3>
            {/* MAPPING: Rendering components based on state */}
            {categories.map(category => {
              const count = students.filter(s => s.category === category).length;
              const percentage = totalStudents > 0 ? Math.round((count / totalStudents) * 100) : 0;
              return (
                <div key={category} className="category-item">
                  <span>{category}: {count} students ({percentage}%)</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <p>&copy; 2026 Student Manager. Built with React & Three.js</p>
      </footer>
    </div>
  );
}

export default App;
