let express = require('express');
let app = express();
let port = 9801;
let fs = require('fs');

app.set('view engine', 'ejs');
app.set('views',(__dirname, 'views'));
// Serve static files
app.use(express.static((__dirname, 'public')));


// File where we store the filenames
let filenamesFile = 'filenames.txt';
let filenames = [];

app.get('/', (req, res) => {
    let message = '';
    
    if (req.query.filename) {
      const filename = req.query.filename;
  
      // Check if the file already exists
      if (fs.existsSync(filename)) {
        message = 'File already exists. Please choose a different filename.';
      } else {
        // Create the new file
        fs.writeFileSync(filename, 'You are awesome');
        filenames.push(filename);
        fs.appendFileSync(filenamesFile, filename + '\n');
        message = `File "${filename}" created successfully!`;
      }
    }
  
    // Render the page with the filenames and message
    res.render('index', { filenames, message });
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });