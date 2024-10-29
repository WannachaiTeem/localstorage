import {
  Button,
  Card,
  CircularProgress,
  Container,
  CardMedia,
  Box,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserGetRequest } from "../model/UserGetRequest";
import Landmark from "../json/landmark.json";
import User from "../json/user.json";
import secureLocalStorage from "react-secure-storage";

function HomePage() {
  const [showLandmark, setShowLandmark] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const handleShowLandmark = () => {
    setShowLandmark(!showLandmark);
  };

  const handleShowUser = () => {
    setShowUser(!showUser);
  };

  const user = useRef<UserGetRequest>();
  const nav = useNavigate();
  const [loadingData, setLoadingData] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      try {
        const loggedInUserString = secureLocalStorage.getItem("loggedInUser");
        if (loggedInUserString != undefined) {
          nav("/");
          user.current = JSON.parse(loggedInUserString.toString()!);
          console.log(1);
        } else {
          console.log(2);
          nav("/login");
        }
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoadingData(false);
      }
    };
    loadData();
    console.log(secureLocalStorage.getItem("loggedInUser"));
  }, [nav]);
  function getLocal() {
    const loggedInUser = JSON.parse(
      localStorage.getItem("loggedInUser") || "{}"
    );
    console.log(loggedInUser);
  }
  function Outclick() {
    secureLocalStorage.clear();
    nav("/login");
  }
  return (
    <>
      {loadingData ? (
        <CircularProgress />
      ) : user.current!.type == "0" ? (
        <>
          <Container
            style={{
              // display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "120vh",
            }}
          >
            
            <div style={{display : "flex",justifyContent : "end"}}>
                {/* <h2 style={{ marginRight : "800px" }}>Home Admin</h2> */}
                <Button
                  onClick={Outclick}
                  style={{ width: "50px", height: "40px", marginRight: "10px",marginTop : "20px" ,backgroundColor : "red",color : "white"}}
                >
                  LogOut
                </Button>
                <Button
                  onClick={getLocal}
                  style={{ width: "90px", height: "40px" ,backgroundColor : "green" ,marginTop : "20px" ,color : "white"}}
                >
                  GetLocal
                </Button>
            </div>
              
            <Card
              style={{
                width: "500px",
                height: "700px",
                justifyContent: "center",
                borderRadius: "10px",
                boxShadow: "0 5px 10px rgba(0, 0, 0, 0.12)",
                marginTop: "80px",
                /* Added styles for centering */
                margin: "0 auto",
              }}
            >
              <div style={{ padding: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {user.current && user.current.image && (
                    <CardMedia
                      component="img"
                      title="User Image"
                      image={user.current.image}
                      style={{
                        width: "100%",
                        maxHeight: "200px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <h4>{user.current?.name}</h4>
                  <h2>{user.current?.country}</h2>
                  {Landmark.filter(
                    (item2) =>
                      item2.country.toLowerCase() ===
                      user.current?.country.toLowerCase()
                  ).map((item2) => (
                    <div key={item2.idx}>
                      <h3>{item2.name}</h3>
                      <p>{item2.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Container>
        </>
      ) : (
        <>
          <Container>
            {/* ส่วนของ admin */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* <Header></Header> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  marginTop : "20px",
                  marginLeft : "200px"
                }}
              >
                {/* <h2 style={{ marginRight : "800px" }}>Home Admin</h2> */}
                <Button
                  onClick={Outclick}
                  style={{ width: "50px", height: "40px", marginRight: "10px" ,backgroundColor : "red",color : "white"}}
                >
                  LogOut
                </Button>
                <Button
                  onClick={getLocal}
                  style={{ width: "90px", height: "40px" ,backgroundColor : "green" ,color : "white"}}
                >
                  GetLocal
                </Button>
              </div>

              {/* ตรวจสอบว่า showLandmark เป็น true หรือ false เพื่อแสดงหรือซ่อนข้อมูล */}
              {showLandmark && (
                <Container
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Box display={"flex"} flexDirection={"row"} sx={{ gap: 2 }}>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-around",
                        margin: "0 auto",
                        marginTop: "30px",
                      }}
                    >
                      {Landmark.map((item) => (
                        <Card
                          key={item.idx}
                          sx={{
                            width: 400,
                            height: 400,
                            borderRadius: 10,
                            marginRight: 2,
                            marginBottom: 2,
                            boxShadow: "0 5px 10px rgba(0, 0, 0, 0.12)",
                            padding: "50px",
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="200"
                            image={item.coverimage}
                            alt="green iguana"
                          ></CardMedia>
                          {/* <h3>{item.name}</h3> */}
                          <h3 style={{ textAlign: "center" }}>
                            {item.country}
                          </h3>
                          <p>{item.detail}</p>
                        </Card>
                      ))}
                    </div>
                  </Box>
                </Container>
              )}
              {showUser && (
                <Container
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Box display={"flex"} flexDirection={"row"} sx={{ gap: 2 }}>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-around",
                        margin: "0 auto",
                        marginTop: "30px",
                      }}
                    >
                      {User.map((item) => (
                        <Card
                          key={item.id}
                          sx={{
                            width: 400,
                            height: 600,
                            borderRadius: 10,
                            marginRight: 2,
                            marginBottom: 2,
                            boxShadow: "0 5px 10px rgba(0, 0, 0, 0.12)",
                            padding: "50px",
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="200"
                            image={item.image}
                            alt="green iguana"
                          ></CardMedia>
                          <h3 style={{ textAlign: "center" }}>{item.name}</h3>
                          <h4>{item.country}</h4>
                          {Landmark.map((item2) => {
                            if (item.country === item2.country) {
                              return <p key={item2.idx}>{item2.detail}</p>;
                            }
                            return null;
                          })}
                        </Card>
                      ))}
                    </div>
                  </Box>
                </Container>
              )}
              <div className="Button" style={{marginBottom : "20px"}}>
                {/* ปุ่มเพื่อเปิด-ปิดการแสดงข้อมูล */}
                <Button onClick={handleShowLandmark} style={{backgroundColor : "white",marginRight : "20px"}}>Show all Landmark</Button>
                {/* ปุ่มเพื่อเปิด-ปิดการแสดงข้อมูล */}
                <Button onClick={handleShowUser} style={{backgroundColor : "white"}}>Show all User</Button>
              </div>
            </div>
          </Container>
        </>
      )}
    </>
  );
}

export default HomePage;
