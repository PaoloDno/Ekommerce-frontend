import { useNavigate } from "react-router-dom"

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center w-full bg-skin-colorContent
      text-skin-colorContent gap-2 p-4">
      <h1>
        OPPS. SOMETHING WENT WRONG! <span className="text-red-500 font-extrabold">ERROR 404</span>
      </h1>
      <p>the page you are looking for doesnt exist or theres an error</p>
      <button onClick={() => navigate("/")} className="p-4 bg-green-400">
        <span className="text-styleh2"> Go Back Home </span>
      </button>
    </div>
  )
}

export default ErrorPage;