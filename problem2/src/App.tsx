import CurrenCy from "@/components/CurrenCy";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="px-10 py-8 border rounded-lg border-cyan-500 shadow-lg shadow-cyan-500/50">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <CurrenCy />
    </div>
  );
}

export default App;
