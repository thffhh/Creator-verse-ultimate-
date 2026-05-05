import { useEffect, useState } from "react";
import { Box, Typography, Paper, Button, TextField, CircularProgress } from "@mui/material";
import api from "../../config/api";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const loadFeed = async () => {
    try {
      const res = await api.get("/feed");
      setPosts(res.data.posts || []);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { loadFeed(); }, []);

  const handlePost = async () => {
    setLoading(true);
    try {
      await api.post("/feed", { content });
      setContent(""); loadFeed();
    } catch (e) { alert(e.response?.data?.error); }
    finally { setLoading(false); }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>📰 Unified Feed</Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField fullWidth multiline rows={2} placeholder="What's on your mind?" value={content} onChange={e => setContent(e.target.value)} />
        <Button variant="contained" sx={{ mt: 1 }} onClick={handlePost} disabled={loading}>
          {loading ? <CircularProgress size={20} /> : "Post"}
        </Button>
      </Paper>
      {posts.map(p => (
        <Paper key={p._id} sx={{ p: 2, mb: 1 }}>
          <Typography variant="subtitle2">{p.author?.displayName || "User"}</Typography>
          <Typography sx={{ my: 1 }}>{p.content}</Typography>
          <Button size="small" onClick={async () => {
            await api.post(`/feed/${p._id}/like`); loadFeed();
          }}>👍 {p.likesCount} Likes</Button>
        </Paper>
      ))}
    </Box>
  );
}
