import { Button, Card, Container, TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import userData from "../json/user.json";
import { UserGetRequest } from "../model/UserGetRequest";
import secureLocalStorage from "react-secure-storage";

function LoginPage() {
  const emailRef = useRef<HTMLInputElement>();
  const passRef = useRef<HTMLInputElement>();
  const nav = useNavigate();

  useEffect(() => {
    console.log(secureLocalStorage.getItem("loggedInUser"));
    if (secureLocalStorage.getItem("loggedInUser") != undefined) {
      nav("/");
      console.log(1);
    } else {
      console.log(2);

      nav("/login");
    }
  }, [nav]);

  // ฟังก์ชันคลิกเมื่อผู้ใช้กดปุ่ม Login
  function logclick() {
    const users: UserGetRequest[] = userData;
    const user = users.find(
      (u) =>
        u.username === emailRef.current?.value &&
        u.password === passRef.current?.value
    );
    if (user) {
      if (user) {
        secureLocalStorage.setItem("loggedInUser", JSON.stringify(user));
        nav("/");
      } else {
        // เข้าสู่ระบบไม่สำเร็จ
        console.log("เข้าสู่ระบบไม่สำเร็จ");
      }
    } else {
      console.log("กรุณาใส่ข้อมูลให้ครบ");
    }
  }

  function getLocal() {
    try {
        const loggedInUserString = secureLocalStorage.getItem("loggedInUser");
        if (loggedInUserString) {
            const loggedInUser = JSON.parse(loggedInUserString.toString());
            console.log(loggedInUser);
        } else {
            console.log("No logged in user data found.");
        }
    } catch (error) {
        console.error("Error parsing JSON:", error);
    }
}


  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        style={{
          width: "500px",
          height: "500px",
          justifyContent: "center",
          borderRadius: "10px",
          boxShadow: "0 5px 10px rgba(0, 0, 0, 0.12)",
          /* Added styles for centering */
          margin: "0 auto",
        }}
      >
        <div style={{ padding: "20px" }}>
          <h4>Login</h4>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              inputRef={emailRef}
              id="outlined-basic"
              label="Username"
              variant="outlined"
              style={{ marginBottom: "15px" }}
            />
            <TextField
              inputRef={passRef}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              style={{ marginBottom: "15px" }}
            />
            <Button
              onClick={logclick}
              style={{
                backgroundColor: "#0073b7",
                color: "white",
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                fontSize: "16px",
              }}
            >
              Login
            </Button>
          </div>
          <Button onClick={getLocal}>GetLocal</Button>
        </div>
      </Card>
    </Container>
  );
}

export default LoginPage;





// //แบบ login ใน local storage ที่มีการป้องกันการเข้ารหัสข้อมูลไว้ 



