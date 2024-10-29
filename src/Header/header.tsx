import { AppBar, Toolbar, IconButton, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";

function Header() {
  const nav = useNavigate();
  const [search] = useSearchParams();
  const uid = search.get("UID");
  console.log("HearderPage UID = ", uid);
  function Homeclick() {
    nav("/?UID=" + uid);
  }
  function Rankclick() {
    nav("/Rank/?UID=" + uid);
  }
  function Grahclick() {
    nav("/Graph/?UID=" + uid);
  }
  function Imageclick() {
    nav("/Uploadimage/?UID=" + uid);
  }
  function LogOutclick() {
    localStorage.removeItem("UID");
    nav("/");
    console.log(localStorage.getItem("UID"));
  }
  function LogInclick() {
    localStorage.removeItem("data");
    nav("/Login");
    console.log(localStorage.getItem("UID"));
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <h2>Admin</h2>
            </Typography>
            {localStorage.getItem("UID") && (
              <div style={{display : "flex", justifyContent : "center"}}>
                <Button color="inherit" onClick={Homeclick}>
                  HOME
                </Button>
                <Button color="inherit" onClick={Rankclick}>
                  RANK
                </Button>
                <Button color="inherit" onClick={Grahclick}>
                  GRAPH
                </Button>
                <Button color="inherit" onClick={Imageclick}>
                  IMAGE
                </Button>
                <Link to={"/Profile/?UID=" + uid}>
                  <img
                    style={{ width: 50, borderRadius: "50%" }}
                    src="data:image/png;base64,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"
                    alt=""
                  />
                </Link>
                <Button color="inherit" onClick={LogOutclick}>
                  LogOut
                </Button>
              </div>
            )}
            {localStorage.getItem("UID") == null && (
              <div>
                <Button color="inherit" onClick={Homeclick}>
                  Landmark
                </Button>
                <Button color="inherit" onClick={Rankclick}>
                  User
                </Button>
                <Button color="inherit" onClick={LogInclick}>
                  LogIn
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
}

export default Header;
