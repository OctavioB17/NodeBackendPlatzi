import cors from 'cors';

const corsOption = {
  origin: false,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: false,
}

export const corsConfig = cors(corsOption)