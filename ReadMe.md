# API development

Based on MVC (model, view, controller) architecture
for mern project

## Hello World in Express

```js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

## Basic Routings

- **Get Method**

```js
app.get('/api/v1/all', (req, res) => {
  res.send('Hello World!');
});
```

- **Post Method**

```js
app.post('/api/v1/all', (req, res) => {
  res.send('Got a POST request');
});
```

- **Patch Method**

```js
app.put('/api/v1/all/:id', (req, res) => {
  res.send('Got a PUT request at ', req.params.id);
});
```

- **Delete Method**

```js
app.delete('/api/v1/all/:id', (req, res) => {
  res.send('Got a DELETE request at ', req.params.id);
});
```
