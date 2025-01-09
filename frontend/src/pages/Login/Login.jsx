import "./Login.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState("Login");
  const { login, backendUrl } = useContext(ProductContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  console.log("Kullanılan Backend URL:", backendUrl);
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("Backend URL:", backendUrl); // Backend URL kontrolü

    try {
      if (currentState === "Sign Up") {
        // Register işlemi
        console.log("Register için gönderilen veriler:", {
          email,
          password,
          name,
        });

        const registerResponse = await axios.post(
          backendUrl + "/api/user/register",
          {
            name,
            email,
            password,
          }
        );

        console.log("Register yanıtı:", registerResponse.data);

        if (registerResponse.data.success) {
          console.log("Kayıt başarılı, otomatik login deneniyor...");

          // Register başarılı olduktan sonra otomatik login yap
          const loginResponse = await axios.post(
            backendUrl + "/api/user/login",
            {
              email,
              password,
            }
          );

          console.log("Otomatik login yanıtı:", loginResponse.data);

          if (loginResponse.data.success) {
            console.log(
              "Otomatik login başarılı, token:",
              loginResponse.data.token
            );
            login(loginResponse.data.token);
            toast.success("Kayıt ve giriş başarılı!");
            navigate("/products");
          } else {
            console.log(
              "Otomatik login başarısız:",
              loginResponse.data.message
            );
            toast.error(
              "Kayıt başarılı fakat giriş yapılamadı. Lütfen giriş yapmayı deneyin."
            );
          }
        } else {
          console.log("Kayıt başarısız:", registerResponse.data.message);
          toast.error(registerResponse.data.message);
        }
      } else {
        // Normal login işlemi
        console.log("Login için gönderilen veriler:", {
          email,
          password,
        });

        const loginResponse = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        console.log("Login yanıtı:", loginResponse.data);

        if (loginResponse.data.success) {
          console.log("Login başarılı, token:", loginResponse.data.token);
          login(loginResponse.data.token);
          toast.success("Giriş başarılı!");
          navigate("/products");
        } else {
          console.log("Login başarısız:", loginResponse.data.message);
          toast.error(loginResponse.data.message || "Giriş yapılamadı");
        }
      }
    } catch (error) {
      console.log("Hata detayları:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: backendUrl, // Hata durumunda URL'i de kontrol et
      });

      // Daha açıklayıcı hata mesajları
      // if (error.response?.status === 404) {
      //   toast.error("Sunucu bulunamadı. Backend URL'i kontrol edin.");
      // } else if (error.response?.status === 400) {
      //   toast.error(error.response.data.message || "Geçersiz bilgiler");
      // } else if (!error.response) {
      //   toast.error(
      //     "Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin."
      //   );
      // } else {
      //   toast.error(error.response?.data?.message || error.message);
      // }
    }
  };
  return (
    <div className="login-container">
      <form onSubmit={onSubmitHandler}>
        <div>
          <p>{currentState}</p>
          <hr />
        </div>
        {currentState === "Login" ? (
          ""
        ) : (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Name"
            required
          />
        )}
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          required
        />
        <div>
          <p>Forgot your password?</p>
          {currentState === "Login" ? (
            <button
              type="button"
              onClick={() => setCurrentState("Sign Up")}
              className="link-button"
            >
              Create account
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentState("Login")}
              className="link-button"
            >
              Login Here
            </button>
          )}
        </div>
        <button>{currentState === "Login" ? "Sign In" : "Sign Up"}</button>
      </form>
    </div>
  );
};

export default Login;
