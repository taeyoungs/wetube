import passport from 'passport';
import GithubStrategy from 'passport-github';
import PassportStrategy from 'passport-facebook';
import KakaoStrategy from 'passport-kakao';
import User from './models/User';
import {
  githubLoginCallback,
  facebookLoginCallback,
  kakaoLoginCallback,
} from './controllers/userController';
import routes from './routes';

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback,
  ),
);

passport.use(
  new PassportStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `http://localhost:4000${routes.facebookCallback}`,
    },
    facebookLoginCallback,
  ),
);

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_ID,
      callbackURL: 'http://localhost:4000/oauth',
    },
    kakaoLoginCallback,
  ),
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
