// ===== COMPONENT: StudentItem functional component =====
function StudentItem({ student, index, deleteStudent, editStudent }) {
  // ===== PROPS: Receiving data and functions from parent (StudentList.jsx) =====
  // - student: individual student object with name, age, category, dateAdded
  // - index: position in the students array
  // - deleteStudent: function to delete this student
  // - editStudent: function to edit this student

  // ===== FUNCTION: Format the date display =====
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="student-item">
      {/* Display student information */}
      <div className="student-info">
        <p>{student.name} - Age: {student.age}</p>
        <div className="student-category">
          Category: {student.category || 'General'} • Added: {student.dateAdded ? formatDate(student.dateAdded) : 'N/A'}
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="student-actions">
        {/* BUTTON - EVENT: onclick handler calls editStudent function with index */}
        <button className="edit-btn" onClick={() => editStudent(index)}>
          Edit
        </button>
        {/* BUTTON - EVENT: onclick handler calls deleteStudent function with index */}
        <button className="delete-btn" onClick={() => deleteStudent(index)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default StudentItem;