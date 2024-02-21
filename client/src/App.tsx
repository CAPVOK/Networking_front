import { ToastContainer } from "react-toastify";
import { ChatPage } from "./pages/ChatPage/ChatPage";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        draggable={false}
        theme={"colored"}
      />
      <ChatPage />
    </>
  );
}

export default App;
