import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, TextField, Button, Typography, Alert } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh",bgcolor:"#f5f5f5"}}>
      <Card sx={{maxWidth:400,width:"100%",p:2}}>
        <CardContent>
          <Typography variant="h5" gutterBottom>🔐 CreatorVerse Login</Typography>
          {error && <Alert severity="error" sx={{mb:2}}>{error}</Alert>}
          <form onSubmit={handleLogin}>
            <TextField fullWidth label="Email" value={email} onChange={e=>setEmail(e.target.value)} sx={{mb:2}} required/>
            <TextField fullWidth type="password" label="Password" value={password} onChange={e=>setPassword(e.target.value)} sx={{mb:2}} required/>
            <Button fullWidth type="submit" variant="contained" size="large">Sign In</Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
