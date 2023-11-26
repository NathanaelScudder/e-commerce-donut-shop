# e-commerce-donut-shop

<p>Posted for the purpose of showcasing previous coursework using React and Express. This project was completed alone.</p>

## Functionality

<ul>
    <li>Allows users to add donuts to their cart and "purchase" them through an e-commerse type interface.</li>
    <li>Previously purchased items can be rated.</li>
</ul>

## Instructions

<p>There may be additional ways to launch the application correctly, but these steps are an ensured way of running the project.</p>

<p>Firstly, ensure the MySQL80 service is running, and set "db.config.js" in back_end to match a valid user for your MySQL instance. This defaults to user: root, password: root1234</p>

<p>Run database_init.sql in back_end\mysql from within MySQL Workbench 8.0 CE.</p>

<p>In a terminal, seek to back_end, then run:</p>

```bash
npm install
# then
npx nodemon index.js
```

<p>In a seperate terminal, seek to front_end, then run:</p>

```bash
npm install
# then
npm run dev
```

<p>Then go to <a href="http://localhost:3000/">localhost:3000</a> in your browser.</p>

<p>If any of these instructions are unclear, I have provided a video walkthrough titled "instructions_walkthrough.mp4" in the submission.</p>

<p>If still you cannot get the submission to run, I've provided a video showcase of the submission titled "submission_showcase.mp4" in the submission.</p>
