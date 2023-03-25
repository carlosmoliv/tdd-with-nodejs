import app from './app';
import sequelize from './config/database';

sequelize.sync();
console.log('env: ' + process.env.NODE_ENV);

app.listen(4000, () => console.log('Listening on port 4000'));
