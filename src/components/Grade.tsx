import React, { useState } from 'react';
import '../App.css'; 

// Define the type for course data
interface Course {
  name: string;
  grade: string;
}

// Define the GPA points for each grade
const gradePoints: { [key: string]: number } = {
  'A': 4.0,
  'B+': 3.5,
  'B': 3.0,
  'C+': 2.5,
  'C': 2.0,
  'D+': 1.5,
  'D': 1.0,
  'F': 0.0,
  'W': 0.0,
};

// Course list from the image
const courseList: string[] = [
  "คณิตศาสตร์สำหรับวิทยาการคอมพิวเตอร์",
  "โครงสร้างข้อมูลและอัลกอริทึม",
  "ฐานข้อมูลโครงสร้างเชิงสัมพันธ์",
  "วิศวกรรมซอฟต์แวร์",
  "เว็บเทคโนโลยี",
  "ภาษาอังกฤษเชิงวิทยาศาสตร์และนวัตกรรม",
];

const GradeCalculator: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [grade, setGrade] = useState<string>('A');
  const [gpa, setGpa] = useState<number>(0);

  const handleAddCourse = () => {
    if (selectedCourse && grade) {
      if (!courses.some(course => course.name === selectedCourse)) {
        const newCourse: Course = { name: selectedCourse, grade: grade };
        setCourses([...courses, newCourse]);
        setSelectedCourse('');
        setGpa(0);
      } else {
        alert("วิชานี้ถูกเพิ่มไปแล้ว!");
      }
    }
  };

  const handleRemoveCourse = (indexToRemove: number) => {
    setCourses(courses.filter((_, index) => index !== indexToRemove));
    setGpa(0);
  };

  const handleCalculateGPA = () => {
    if (courses.length === 0) {
      setGpa(0);
      return;
    }

    let totalPoints = 0;
    let totalCredits = 0;

    const coursesForGPA = courses.filter(course => course.grade !== 'W');

    coursesForGPA.forEach(course => {
      const point = gradePoints[course.grade];
      if (point !== undefined) {
        totalPoints += point;
        totalCredits += 1;
      }
    });

    const calculatedGpa = totalCredits === 0 ? 0 : totalPoints / totalCredits;
    setGpa(parseFloat(calculatedGpa.toFixed(2)));
  };

  return (
    <div className="container">
      <h2 className="header">ระบบคำนวณ GPA 📝</h2>
      
      <div className="input-form">
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          required
          className="select-field"
        >
          <option value="" disabled>- เลือกรายวิชา -</option>
          {courseList.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        
        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="select-field"
        >
          {Object.keys(gradePoints).map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        
        <button onClick={handleAddCourse} className="button-add">
          เพิ่มรายวิชา
        </button>
      </div>
      
      <div className="course-list">
        <h3 className="subheader">รายชื่อวิชาทั้งหมด 📋</h3>
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div key={index} className={`course-item ${course.grade === 'F' ? 'red-text' : ''}`}>
              <span>
                {course.name} - เกรด: {course.grade}
              </span>
              <button onClick={() => handleRemoveCourse(index)} className="button-remove">
                ลบ
              </button>
            </div>
          ))
        ) : (
          <p className="empty-list">ยังไม่มีรายวิชาที่เพิ่ม 😔</p>
        )}
      </div>
      
      <div className="gpa-display">
        <button onClick={handleCalculateGPA} className="button-calculate">
          คำนวณ GPA
        </button>
        {gpa > 0 && <h3 className="gpa-result">GPA ของคุณ: <span>{gpa.toFixed(2)}</span> ✨</h3>}
      </div>
    </div>
  );
};

export default GradeCalculator;