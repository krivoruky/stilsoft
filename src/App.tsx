import ModuleTable from "./ModuleTable/ModuleTable";
import StudentTable from "./StudentsTable/Students";
import { modules } from "./utils/modules";
import { students } from "./utils/students";

const App = () => {
  return (
    <div className="container">
      <ModuleTable modules={modules} />
      <StudentTable students={students} />
    </div>
  );
};

export default App;