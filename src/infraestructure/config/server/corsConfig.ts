import cors from 'cors';

const corsOption = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: false,
}

export const corsConfig = cors(corsOption)