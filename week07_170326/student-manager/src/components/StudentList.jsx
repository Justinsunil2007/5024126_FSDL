import StudentItem from "./StudentItem";

// ===== COMPONENT: StudentList functional component =====
function StudentList({ students, deleteStudent, editStudent }) {
  // ===== PROPS: Receiving data and functions from parent (App.jsx) =====
  // - students: array of student objects
  // - deleteStudent: function to delete a student
  // - editStudent: function to edit a student

  return (
    <div className="student-list">
      {/* CONDITIONAL RENDERING: Show message if no students */}
      {students.length > 0 ? (
        // MAPPING: Render StudentItem component for each student
        students.map((student, index) => (
          <StudentItem
            key={index}
            student={student}           // PROPS: Pass student data down
            index={index}                 // PROPS: Pass index for identification
            deleteStudent={deleteStudent} // PROPS: Pass delete function down
            editStudent={editStudent}     // PROPS: Pass edit function down
          />
        ))
      ) : (
        // No students message
        <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', margin: '20px 0' }}>
          No students found. Add some students to get started!
        </p>
      )}
    </div>
  );
}

export default StudentList;