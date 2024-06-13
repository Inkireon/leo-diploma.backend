const express = require("express")
const db = require("../db")
const PORT = process.env.PORT || 8080
const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(PORT, () => console.log('Server ready on port %d', PORT));
 app.get( "/getClubs",async (req,res) => {
    try {
        const data = await db.query('SELECT * FROM locations');
        res.json(data.rows);
      } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).send('Internal Server Error');
      }
    
});
app.get("/getSlides",async (req, res) => {
  try {
    const data1 = await db.query('SELECT * FROM slides');
    res.json(data1.rows);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).send('Internal Server Error');
  }
}) 
module.exports = app;

