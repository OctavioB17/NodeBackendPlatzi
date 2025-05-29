import cors from 'cors';

const corsOption = {
  origin: 'http://maria-pinina-front.s3-website-us-east-1.amazonaws.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: false,
}

export const corsConfig = cors(corsOption)